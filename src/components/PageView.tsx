import React, { SyntheticEvent, useState } from 'react';
import { Paper } from "@material-ui/core";
import { CloseReason, OpenReason, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { ArrowBack, ArrowForward, Delete, Rotate90DegreesCcw } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Page } from "react-pdf";
import { PdfPage } from "../types";

const useStyles = makeStyles((theme: Theme) => createStyles({
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

export interface PageProps {
    index: number,
    page: PdfPage,
    selected?: boolean,
    onClick: (page: number) => void,
    onRotatePage: (page: number) => void,
    onMovePageRight: (page: number) => void,
    onMovePageLeft: (page: number) => void,
    onDeletePage: (page: number) => void,
}

export const PageView = ({
    index,
    page,
    selected,
    onClick,
    onRotatePage,
    onMovePageRight,
    onMovePageLeft,
    onDeletePage
}: PageProps) => {
    const classes = useStyles();

    const [ open, setOpen ] = useState(false);

    const handleOpen = (e: SyntheticEvent<any>, _: OpenReason) => {
        e.stopPropagation();
        setOpen(true);
    }
    const handleClose = (e: SyntheticEvent<any>, _: CloseReason) => {
        e.stopPropagation();
        setOpen(false);
    }
    const handleAction = (action: (page: number) => void) => (e: SyntheticEvent<any>) => {
        e.stopPropagation();
        action(index);
    }

    return (
        <Paper elevation={selected ? 5 : 1} className={classes.paper}>
            <Page
                width={270}
                height={380}
                pageNumber={page.page + 1}
                rotate={page.angle}
                onClick={handleAction(onClick)}>
                {selected && <SpeedDial
                  ariaLabel="Actions"
                  className={classes.speedDial}
                  open={open}
                  icon={<SpeedDialIcon/>}
                  direction="left"
                  onOpen={handleOpen}
                  onClose={handleClose}>
                  <SpeedDialAction
                    icon={<Rotate90DegreesCcw/>}
                    tooltipTitle="Rotate page"
                    onClick={handleAction(onRotatePage)}/>
                  <SpeedDialAction
                    icon={<ArrowForward/>}
                    tooltipTitle="Move page right"
                    onClick={handleAction(onMovePageRight)}/>
                  <SpeedDialAction
                    icon={<ArrowBack/>}
                    tooltipTitle="Move page left"
                    onClick={handleAction(onMovePageLeft)}/>
                  <SpeedDialAction
                    icon={<Delete/>}
                    tooltipTitle="Delete page"
                    onClick={handleAction(onDeletePage)}/>
                </SpeedDial>
                }
            </Page>
        </Paper>
    );
}