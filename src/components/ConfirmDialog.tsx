import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export interface ConfirmDialogProps {
    display: boolean;
    onAccept: () => void;
    onReject: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ display, onAccept, onReject }) => (
    <Dialog open={display} onClose={onReject} aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm new document?</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Creating a new document will clear any editing done on the current document.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onReject} color="primary" autoFocus>Disagree</Button>
            <Button onClick={onAccept} color="primary">Agree</Button>
        </DialogActions>
    </Dialog>
);
