import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import styles from '../utils/styles';
import Domain from '@material-ui/icons/Domain';
import { IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor : styles.backgroundColorPrimary
  },
  grow: {
    flexGrow: 1,
  },
  appBarShift: {
    width: `calc(100% - 240px)`,
    marginLeft: 240,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={clsx (classes.appBar, {
          [classes.appBarShift]: props.open,
        })}>
        <Toolbar>
        <Typography>This is my first React App with the News API implementation!</Typography> 
          <div className={classes.grow} />
          <IconButton
              color="inherit"
              aria-label="open my page"
              href="http://anelsyjmendozag.com" target="_blank" rel="noopener noreferrer"
            >
            <Typography>Anelsy Mendoza</Typography> <Domain />
            </IconButton> 
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
