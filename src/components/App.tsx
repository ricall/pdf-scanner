import React, { useState } from 'react';
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { usePersistState } from 'persist-state';
import { initialState, PdfDocument, PdfMetadata } from "../types";
import { pdfReducer, useAsyncReducer } from "../reducers";
import {
    deletePage,
    loadDocument,
    movePageLeft,
    movePageRight,
    newDocument,
    rotatePage,
    saveDocument,
    setCurrentPage,
    updateMetadata
} from "../actions";
import { ApplicationAppBar } from "./ApplicationAppBar";
import { defaultSettings, Settings, SettingsDrawer } from "./SettingsDrawer";
import { MetadataForm } from "./MetadataForm";
import { ConfirmDialog } from "./ConfirmDialog";
import { PageGrid } from "./PageGrid";

const useStyles = makeStyles((theme: Theme) => createStyles({
    mainBody: {
        minHeight: `80vh`,
    }
}));

const isDocumentValid = ({ metadata: { title, author } }: PdfDocument): boolean => !!title && !!author;

export const App = () => {
    const classes = useStyles();
    const [ settings, setSettings ] = usePersistState(defaultSettings(), {
        key: 'settings',
        persistAcrosSession: true,
        persistOnUnmount: true,
    });
    const [ state, dispatch ] = useAsyncReducer(pdfReducer, initialState);
    const [ editSettings, setEditSettings ] = useState(false);
    const [ confirmNewDocument, setConfirmNewDocument ] = useState(false);
    const [ editMetadata, setEditMetadata ] = useState(false);
    const { name, pages, metadata } = state;

    const onAddDocument = (name: string, document: ArrayBuffer) => dispatch(loadDocument(settings, name, document));
    const onSetCurrentPage = (page: number) => dispatch(setCurrentPage(page));
    const onRotatePage = (page: number) => dispatch(rotatePage(page));
    const onMoveLeft = (page: number) => dispatch(movePageLeft(page));
    const onMoveRight = (page: number) => dispatch(movePageRight(page));
    const onDelete = (page: number) => dispatch(deletePage(page));
    const onSaveDocument = () => {
        if (isDocumentValid(state)) {
            dispatch(saveDocument(settings, state));
        } else {
            setEditMetadata(true);
        }
    }

    // Menu Settings
    const onMenu = () => setEditSettings(true);
    const onSettingsChange = (settings: Settings) => {
        setEditSettings(false);
        setSettings(settings);
    };

    // Confirm New Document
    const onConfirmNewDocument = () => {
        setConfirmNewDocument(false);
        dispatch(newDocument());
    }
    const onRejectNewDocument = () => setConfirmNewDocument(false);
    const onNewDocument = () => {
        if (pages.length > 0) {
            setConfirmNewDocument(true);
        } else {
            onConfirmNewDocument();
        }
    }

    // Document Metadata
    const onEditMetadata = () => setEditMetadata(true);
    const onMetadataChange = async (metadata: PdfMetadata, accept: boolean) => {
        setEditMetadata(false);
        if (accept) {
            dispatch(updateMetadata(metadata));
        }
    }

    return (
        <div className="App">
            <ApplicationAppBar
                title={name}
                pages={pages.length}
                onMenu={onMenu}
                onNewDocument={onNewDocument}
                onSaveDocument={onSaveDocument}
                onEditMetadata={onEditMetadata}
            />
            <Box className={classes.mainBody} display="flex" justifyContent="center" alignItems="center">
                <PageGrid
                    document={state}
                    setCurrentPage={onSetCurrentPage}
                    onRotate={onRotatePage}
                    onMoveLeft={onMoveLeft}
                    onMoveRight={onMoveRight}
                    onDelete={onDelete}
                    onAddDocument={onAddDocument}
                />
            </Box>
            {editSettings && <SettingsDrawer settings={settings} onChange={onSettingsChange}/>}
            {editMetadata && <MetadataForm metadata={metadata} onChange={onMetadataChange}/>}
            <ConfirmDialog display={confirmNewDocument} onAccept={onConfirmNewDocument} onReject={onRejectNewDocument}/>
        </div>
    );
}