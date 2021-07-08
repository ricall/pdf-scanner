import React from "react";
import {
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Switch,
    TextField
} from "@material-ui/core";
import { Person, Rotate90DegreesCcw } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    buttons: {
        flex: 1,
    },
}));

export type Settings = {
    defaultAuthor: string,
    autoRotate: boolean,
}

export const defaultSettings = () => ({
    defaultAuthor: '',
    autoRotate: false,
}) as Settings;

export interface SettingsDrawerProps {
    settings: Settings;
    onChange: (settings: Settings) => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({ settings, onChange }) => {
    const classes = useStyles();
    const { control, handleSubmit } = useForm();

    const onSubmit = (data: any) => onChange(data as Settings);
    const onCancel = () => onChange(settings);

    return (
        <Drawer open onClose={onCancel}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
                    <ListItem>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <Controller name="defaultAuthor"
                                    control={control}
                                    defaultValue={settings.defaultAuthor}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            label="Default author"
                                            fullWidth
                                            value={value}
                                            onChange={onChange}/>
                                    )}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Rotate90DegreesCcw/>
                        </ListItemIcon>
                        <ListItemText primary="Auto-rotate" secondary="rotate second page"/>
                        <ListItemSecondaryAction>
                            <Controller name="autoRotate"
                                        control={control}
                                        defaultValue={settings.autoRotate}
                                        render={({ field: { onChange, value } }) => (
                                            <Switch
                                                checked={value}
                                                value={value}
                                                onChange={onChange}/>
                                        )}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <Divider/>
                    </ListItem>
                    <ListItem className={classes.buttons}>
                        <ListItemSecondaryAction>
                            <Button onClick={onCancel} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Apply Changes
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </form>
        </Drawer>
    );
}
