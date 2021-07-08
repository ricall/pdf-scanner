import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Badge, Divider, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Add, AppsOutlined, BookOutlined, InsertDriveFileOutlined, MenuOutlined, Save } from "@material-ui/icons";

export interface ApplicationAppBarProps {
    title?: string;
    pages?: number;
    onMenu?: () => void;
    onNewDocument?: () => void;
    onSaveDocument?: () => void;
    onEditMetadata?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        inputRoot: {
            color: 'inherit',
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
    }),
);

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({
    title,
    pages,
    onMenu,
    onNewDocument,
    onSaveDocument,
    onEditMetadata,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton}
                                edge="start"
                                color="inherit"

                                onClick={onMenu}>
                        <MenuOutlined/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>{title} - pdf-scanner</Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" onClick={onNewDocument}>
                            <Add/>
                        </IconButton>
                    </div>
                    <Divider orientation="vertical" light={false} flexItem/>
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" disableRipple>
                            <Badge badgeContent={pages} color="secondary">
                                <InsertDriveFileOutlined/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={onSaveDocument}>
                            <Badge color="secondary">
                                <Save/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={onSaveDocument}>
                            <Badge color="secondary">
                                <AppsOutlined/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={onEditMetadata}>
                            <Badge color="secondary">
                                <BookOutlined/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
