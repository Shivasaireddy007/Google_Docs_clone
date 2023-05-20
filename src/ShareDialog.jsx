import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    textTransform: "none",
    fontWeight: 600,
    marginBottom: 10,
    color: "#1b7fde",
  },
}));

const ShareDialog = ({ open, setOpen, setSnackbar }) => {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbar(true);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent style={{ display: "flex", alignItems: "center" }}>
        <Avatar style={{ height: 40, width: 40, background: "gray" }}>
          <LinkIcon />
        </Avatar>
        <Typography style={{ marginLeft: "1rem" }} variant="h5">
          Get link
        </Typography>
      </DialogContent>
      <DialogContent className={classes.content}>
        <DialogContentText>
          <strong>Anyone</strong> on the Internet with this link can edit
        </DialogContentText>
        <Button
          size="small"
          color="primary"
          className={classes.btn}
          onClick={handleClick}
        >
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
