import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { initialState, PdfDocument } from "../../types";
import { pdfReducer } from "../../reducers";
import { deletePage, loadDocument, movePageLeft, movePageRight, rotatePage, setCurrentPage } from "../../actions";
import { PageGrid } from '../PageGrid';
import { defaultSettings } from "../SettingsDrawer";

export default {
    title: 'Example/Page Grid',
    component: PageGrid,
    argTypes: {},
} as Meta;

const loadDefaultDocument = async () => {
    const contents = await fetch('document.pdf');
    let document = await contents.arrayBuffer();
    return pdfReducer(initialState, await loadDocument(defaultSettings(), 'document.pdf', document));
}

const Container = () => {
    const [ state, setState ] = useState<PdfDocument>(initialState);

    const onSetCurrentPage = (page: number) => setState(pdfReducer(state, setCurrentPage(page)));
    const onRotate = (page: number) => setState(pdfReducer(state, rotatePage(page)));
    const onMoveLeft = (page: number) => setState(pdfReducer(state, movePageLeft(page)));
    const onMoveRight = (page: number) => setState(pdfReducer(state, movePageRight(page)));
    const onDelete = (page: number) => setState(pdfReducer(state, deletePage(page)));
    const addDocument = async (name: string, document: ArrayBuffer) => pdfReducer(state, await loadDocument(defaultSettings(), name, document));
    const onAddDocument = (name: string, document: ArrayBuffer) => addDocument(name, document).then(setState);

    if (state === initialState) {
        loadDefaultDocument().then(setState);
    }

    return (
        <PageGrid
            document={state}
            setCurrentPage={onSetCurrentPage}
            onRotate={onRotate}
            onMoveLeft={onMoveLeft}
            onMoveRight={onMoveRight}
            onDelete={onDelete}
            onAddDocument={onAddDocument}
        />
    );
}

const Template: Story = (args) => <Container {...args} />;

export const Default = Template.bind({});
Default.args = {};

