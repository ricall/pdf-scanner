import React from 'react';
import { Grid } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Document } from "react-pdf";
import { PdfDocument } from "../types";
import { PageView } from "./PageView";
import { PageAppendPdf } from "./PageAppendPdf";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: 270,
        height: 380,
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        },
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export interface PageGridProps {
    document: PdfDocument;
    setCurrentPage: (page: number) => void;
    onRotate: (page: number) => void;
    onMoveLeft: (page: number) => void;
    onMoveRight: (page: number) => void;
    onDelete: (page: number) => void;
    onAddDocument: (name: string, document: ArrayBuffer) => void;
}

export const PageGrid: React.FC<PageGridProps> = ({
    document,
    setCurrentPage,
    onRotate,
    onMoveLeft,
    onMoveRight,
    onDelete,
    onAddDocument,
    ...props
}) => {
    const classes = useStyles();
    const { bytes, pages, currentPage } = document;

    if (pages.length === 0) {
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={4}>
                        <Grid item>
                            <PageAppendPdf label="Load PDF" onAddDocument={onAddDocument}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    let startPage = Math.max(1, currentPage - 1);
    if (startPage > pages.length - 1) {
        startPage = Math.max(1, pages.length - 1);
    }
    const showDropTarget = startPage >= pages.length - 1;

    return (
        <Document file={bytes}>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={4}>
                        {[ 0, 1, 2 ]
                            .filter(i => i + startPage <= pages.length)
                            .map(i => {
                                const index = i + startPage;
                                const page = pages[i + startPage - 1];
                                return (
                                    <Grid item key={index}>
                                        <PageView
                                            index={index}
                                            page={page}
                                            selected={currentPage === index}
                                            onClick={setCurrentPage}
                                            onRotatePage={onRotate}
                                            onMovePageLeft={onMoveLeft}
                                            onMovePageRight={onMoveRight}
                                            onDeletePage={onDelete}
                                        />
                                    </Grid>
                                )
                            })}
                        {showDropTarget && (
                            <Grid item>
                                <PageAppendPdf label="Append PDF" onAddDocument={onAddDocument}/>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={4}>
                        <Grid item>
                            <Pagination
                                page={currentPage}
                                count={pages.length}
                                showFirstButton
                                showLastButton
                                onChange={(_, p) => setCurrentPage(p)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Document>
    );
}