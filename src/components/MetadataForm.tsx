import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Controller, useForm } from "react-hook-form";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { PdfMetadata } from "../types";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
        '& .MuiTextField-root': {
            margin: theme.spacing(0.5),
        },
    },
}));

export interface MetadataFormProps {
    metadata: PdfMetadata,
    onChange: (metadata: PdfMetadata, accept: boolean) => void,
}

export const MetadataForm = ({ metadata, onChange }: MetadataFormProps) => {
    const classes = useStyles();
    const { handleSubmit, control } = useForm({ mode: "onTouched" });

    const onSubmit = (data: any) => onChange(data as PdfMetadata, true);
    const onCancel = () => onChange(metadata, false);

    return (
        <Dialog onClose={onCancel} open={true}>
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle id="form-dialog-title">Document Metadata</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This meta-data is saved along with the PDF document and is used to provide information about
                        the person and the software that was used to edit the pdf document.
                    </DialogContentText>
                    <Controller name="title"
                                control={control}
                                defaultValue={metadata.title}
                                rules={{ required: 'Title is required' }}
                                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Title"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!error}
                                        helperText={error ? error.message : null}/>
                                )}/>

                    <Controller name="author"
                                control={control}
                                defaultValue={metadata.author}
                                rules={{ required: 'Author is required' }}
                                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Author"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!error}
                                        helperText={error ? error.message : null}/>
                                )}/>

                    <Controller name="subject"
                                control={control}
                                defaultValue={metadata.subject}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Subject"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}/>
                                )}/>

                    <Controller name="creator"
                                control={control}
                                defaultValue={metadata.creator}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Creator"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}/>
                                )}/>

                    <Controller name="keywords"
                                control={control}
                                defaultValue={metadata.keywords}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Keywords"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}/>
                                )}/>

                    <Controller name="producer"
                                control={control}
                                defaultValue={metadata.producer}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Producer"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}/>
                                )}/>
                    <Grid container justifyContent="flex-start">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Controller name="creationDate"
                                        control={control}
                                        defaultValue={metadata.creationDate}
                                        rules={{ required: 'Date is required' }}
                                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                            <KeyboardDateTimePicker
                                                margin="normal"
                                                label="Creation date"
                                                format="dd/MM/yyyy HH:mm:ss"
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        )}/>

                            <Controller name="modificationDate"
                                        control={control}
                                        defaultValue={metadata.modificationDate}
                                        rules={{ required: 'Date is required' }}
                                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                                            <KeyboardDateTimePicker

                                                margin="normal"
                                                label="Modification date"
                                                format="dd/MM/yyyy HH:mm:ss"
                                                value={value}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        )}/>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Apply Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}