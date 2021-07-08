import React from 'react';
import { Button, Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        width: 270,
        height: 380,
        overflow: 'hidden',
        border: '3px dashed rgba(0, 0, 0, 0.80)',
    },
    upload: {
        width: '100%',
        height: '100%',
    },
}));

export interface PageDropProps {
    label: string,
    onAddDocument: (name: string, document: ArrayBuffer) => void,
}

export const PageAppendPdf: React.FC<PageDropProps> = ({ label, onAddDocument }) => {
    const classes = useStyles();
    const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (!fileList) {
            return;
        }
        const file = fileList[0]
        onAddDocument(file.name, await file.arrayBuffer());
    };
    return (
        <Paper className={classes.paper} elevation={0}>
            <input accept="application/pdf"
                   style={{ display: 'none ' }}
                   id="file-upload"
                   type="file"
                   onChange={onFileChange}/>

            <label htmlFor="file-upload">
                <Button className={classes.upload} component="span">
                    {label}
                </Button>
            </label>
        </Paper>
    );
}