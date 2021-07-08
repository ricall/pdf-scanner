export type PdfPage = {
    page: number;
    angle: number;
}

export type PdfMetadata = {
    title?: string,
    author?: string,
    subject?: string,
    creator?: string,
    keywords?: string,
    producer?: string,
    creationDate?: Date,
    modificationDate?: Date,
}

export type PdfDocument = {
    name: string,
    bytes: ArrayBuffer,
    pages: PdfPage[],
    currentPage: number,
    metadata: PdfMetadata,
}

export const initialState: PdfDocument = {
    name: 'untitled',
    bytes: new ArrayBuffer(0),
    pages: [],
    currentPage: 0,
    metadata: {
        title: '',
        author: '',
        subject: '',
        creator: '',
        keywords: '',
        producer: '',
        creationDate: undefined,
        modificationDate: undefined,
    }
}

export type PdfAction =
    | { type: 'LOAD', name: string, document: ArrayBuffer, pages: PdfPage[], currentPage: number, metadata: PdfMetadata }
    | { type: 'NEW' }
    | { type: 'SET_CURRENT_PAGE', page: number }
    | { type: 'ROTATE', page: number }
    | { type: 'MOVE_PAGE_LEFT', page: number }
    | { type: 'MOVE_PAGE_RIGHT', page: number }
    | { type: 'DELETE', page: number }
    | { type: 'UPDATE_METADATA', metadata: PdfMetadata }
