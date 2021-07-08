import * as fs from "fs";
import { pdfReducer } from '../reducers';
import {
    deletePage,
    loadDocument,
    movePageLeft,
    movePageRight,
    newDocument,
    rotatePage,
    updateMetadata
} from "../actions";
import { defaultSettings } from "../components/SettingsDrawer";
import { initialState, PdfDocument } from "../types";

describe('reducer', () => {

    const originalState = {
        name: 'test',
        bytes: new ArrayBuffer(0),
        pages: [
            { page: 0, angle: 0 },
            { page: 1, angle: 180 },
            { page: 2, angle: 0 },
        ],
        currentPage: 1,
        metadata: initialState.metadata,
    } as PdfDocument;

    it('should fail to load a empty document', async () => {
        const state = pdfReducer(initialState, await loadDocument(defaultSettings(), "test", new ArrayBuffer(0)));

        expect(state.bytes.byteLength).toBe(0);
        expect(state.pages).toHaveLength(0);
        expect(state.name).toBe('test');
        expect(state.metadata).toBe(initialState.metadata);
    });

    it('should load a valid pdf document', async () => {
        const contents = fs.readFileSync('./test-document.pdf');
        const state = pdfReducer(initialState, await loadDocument(defaultSettings(), './test-document.pdf', contents.buffer));

        expect(state.bytes).toBe(contents.buffer);
        expect(state.pages).toHaveLength(10);
        expect(state.pages[0]).toEqual({
            page: 0,
            angle: 0,
        });
        expect(state.name).toBe('./test-document.pdf');
        expect(state.metadata).toEqual({
            title: 'Test Document',
            author: 'Richard Allwood',
            subject: 'Document for testing pdf-scanner',
            creator: 'pdf-lib',
            keywords: 'test pdf-scanner',
            producer: 'pdf-scanner test',
            creationDate: new Date('2021-07-02T01:03:00.000Z'),
            modificationDate: state.metadata.modificationDate,
        });
    });

    it('should be able to create a new pdf document', () => {
        const state = pdfReducer(originalState, newDocument());

        expect(state.bytes.byteLength).toBe(0);
        expect(state.pages).toHaveLength(0)
        expect(state.metadata.author).toEqual('');
        expect(state.metadata.creator).toEqual('');
        expect(state.metadata.keywords).toEqual('');
        expect(state.metadata.producer).toEqual('');
        expect(state.metadata.subject).toEqual('');
        expect(state.metadata.title).toEqual('');
    });

    it('should be able to rotate a pge in the document', () => {
        const state = pdfReducer(originalState, rotatePage(2));

        expect(state.pages[0].angle).toBe(0);
        expect(state.pages[1].angle).toBe(0);
        expect(state.pages[2].angle).toBe(0);
    });

    describe('should be able to move the page left', () => {

        it('should handle moving the first index', () => {
            const state = pdfReducer(originalState, movePageLeft(1));

            expect(state.pages.map(p => p.page)).toEqual([ 0, 1, 2 ]);
        });

        it('should handle moving the second index', () => {
            const state = pdfReducer(originalState, movePageLeft(2));

            expect(state.pages.map(p => p.page)).toEqual([ 1, 0, 2 ]);
        });

        it('should handle moving the third index', () => {
            const state = pdfReducer(originalState, movePageLeft(3));

            expect(state.pages.map(p => p.page)).toEqual([ 0, 2, 1 ]);
        });

    });

    describe('should be able to move the page right', () => {

        it('should handle moving the first index', () => {
            const state = pdfReducer(originalState, movePageRight(1));

            expect(state.pages.map(p => p.page)).toEqual([ 1, 0, 2 ]);
        });

        it('should handle moving the second index', () => {
            const state = pdfReducer(originalState, movePageRight(2));

            expect(state.pages.map(p => p.page)).toEqual([ 0, 2, 1 ]);
        });

        it('should handle moving the third index', () => {
            const state = pdfReducer(originalState, movePageRight(3));

            expect(state.pages.map(p => p.page)).toEqual([ 0, 1, 2 ]);
        });

    });

    describe('delete actions', () => {

        it('should be able to delete page 1', () => {
            const state = pdfReducer(originalState, deletePage(1));

            expect(state.pages).toHaveLength(2);
            expect(state.pages[0].page).toBe(1);
            expect(state.pages[1].page).toBe(2);
        });

        it('should be able to delete page 2', () => {
            const state = pdfReducer(originalState, deletePage(2));

            expect(state.pages).toHaveLength(2);
            expect(state.pages[0].page).toBe(0);
            expect(state.pages[1].page).toBe(2);
        });

        it('should be able to delete page 3', () => {
            const state = pdfReducer(originalState, deletePage(3));

            expect(state.pages).toHaveLength(2);
            expect(state.pages[0].page).toBe(0);
            expect(state.pages[1].page).toBe(1);
        });

    });

    it('should be able to update metadata', () => {
        const state = pdfReducer(originalState, updateMetadata({
            title: 'title',
            author: 'author',
            subject: 'subject',
            producer: 'producer',
            creator: 'creator',
            keywords: 'keywords',
            creationDate: new Date('2021-01-30T12:00:01.0000'),
            modificationDate: new Date('2021-01-30T12:01:02.0000'),
        }));
        expect(state.pages.length).toBe(3);
        expect(state.metadata.title).toEqual('title');
        expect(state.metadata.author).toEqual('author');
        expect(state.metadata.subject).toEqual('subject');
        expect(state.metadata.producer).toEqual('producer');
        expect(state.metadata.creator).toEqual('creator');
        expect(state.metadata.keywords).toEqual('keywords');
        expect(state.metadata.creationDate).toEqual(new Date('2021-01-30T02:00:01.000Z'));
        expect(state.metadata.modificationDate).toEqual(new Date('2021-01-30T02:01:02.000Z'));
    });

    it('should be able to handle unknown commands', () => {
        // @ts-ignore
        const state = pdfReducer(originalState, { type: 'DUMMY' });

        expect(state).toBe(originalState);
    });

});
