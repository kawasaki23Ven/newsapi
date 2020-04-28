import React , {useImperativeHandle, forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dialog: {
    color : "white",
    backgroundColor: '#051626e8'
  },
}));

function AlertDialog(props, ref) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({

    openDialog() {
      setOpen(true);
    }

  }));

  const handleClose = () => {
    setOpen(false);
  };

  const agreeOption = () => {
    props.closeOption();
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialog}>{props.title}</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialog}>
          <Button onClick={handleClose} color="secondary">
            Disagree
          </Button>
          <Button onClick={agreeOption} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog = forwardRef(AlertDialog);

export default AlertDialog;
