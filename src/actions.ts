import { degrees, PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { initialState, PdfAction, PdfDocument, PdfMetadata, PdfPage } from "./types";
import { Settings } from "./components/SettingsDrawer";

const pagesFrom = (settings: Settings, document: PDFDocument) => {
    const shouldRotate = settings.autoRotate && (document.getCreator() || '') === '';
    if (shouldRotate) {
        document.setCreator("scanner");
    }

    const pages: PdfPage[] = new Array(document?.getPageCount())
    for (let i = 0; i < document?.getPageCount(); i++) {
        const p = document.getPage(i);
        pages[i] = {
            page: i,
            angle: p.getRotation().angle,
        } as PdfPage;
        if (shouldRotate && i % 2 === 1) {
            pages[i].angle = (pages[i].angle + 180) % 360;
        }
    }
    return pages;
}

const getDateWithDefault = (supplier: () => Date | undefined) => {
    try {
        return supplier() || new Date();
    } catch (err) {
        console.error('failed to parse date', err);
        return new Date();
    }
}

const metadataFrom = (settings: Settings, document: PDFDocument) => ({
    title: document?.getTitle(),
    author: document?.getAuthor() || settings.defaultAuthor,
    subject: document?.getSubject(),
    creator: document?.getCreator(),
    keywords: document?.getKeywords(),
    producer: document?.getProducer(),
    creationDate: getDateWithDefault(() => document?.getCreationDate()),
    modificationDate: getDateWithDefault(() => document.getModificationDate()),
}) as PdfMetadata;

export const loadDocument = async (settings: Settings, name: string, document: ArrayBuffer): Promise<PdfAction> => {
    if (document.byteLength === 0) {
        return ({
            type: 'LOAD',
            name,
            document,
            pages: initialState.pages,
            currentPage: 0,
            metadata: initialState.metadata,
        });
    }
    const pdfDoc = await PDFDocument.load(document, { throwOnInvalidObject: true, updateMetadata: false });
    return ({
        type: 'LOAD',
        name,
        document,
        pages: pagesFrom(settings, pdfDoc),
        currentPage: 1,
        metadata: metadataFrom(settings, pdfDoc),
    }) as PdfAction;
};

export const saveDocument = async (settings: Settings, document: PdfDocument) => {
    const originalDocument = await PDFDocument.load(document.bytes, { updateMetadata: false });
    const newDocument = await PDFDocument.create();
    for (let i = 0; i < document.pages.length; i++) {
        const pageConfiguration = document.pages[i];
        const page = (await newDocument.copyPages(originalDocument, [ pageConfiguration.page ]))[0];
        page.setRotation(degrees(pageConfiguration.angle))
        newDocument.addPage(page);
    }

    const { title, author, subject, keywords, creator, producer, creationDate, modificationDate } = document.metadata;

    newDocument.setTitle(title || '');
    newDocument.setAuthor(author || '');
    newDocument.setSubject(subject || '')
    newDocument.setKeywords((keywords || '').split(';'))
    newDocument.setCreator(creator || '')
    newDocument.setProducer(producer || '')
    newDocument.setCreationDate(creationDate || new Date())
    newDocument.setModificationDate(modificationDate || new Date())
    const bytes = await newDocument.save();

    const name = `${author} - ${title}`
    const object = new Blob([ bytes ], { type: 'application/pdf' });
    saveAs(object, name);

    return loadDocument({
        defaultAuthor: settings.defaultAuthor,
        autoRotate: false,
    }, name, bytes);
}

export const newDocument = () => ({ type: 'NEW' }) as PdfAction;
export const setCurrentPage = (page: number) => ({ type: 'SET_CURRENT_PAGE', page }) as PdfAction
export const rotatePage = (page: number) => ({ type: 'ROTATE', page }) as PdfAction;
export const movePageLeft = (page: number) => ({ type: 'MOVE_PAGE_LEFT', page }) as PdfAction;
export const movePageRight = (page: number) => ({ type: 'MOVE_PAGE_RIGHT', page }) as PdfAction;
export const deletePage = (page: number) => ({ type: 'DELETE', page }) as PdfAction;
export const updateMetadata = (metadata: PdfMetadata) => ({ type: 'UPDATE_METADATA', metadata }) as PdfAction;
