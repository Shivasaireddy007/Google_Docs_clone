import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useHistory } from "react-router-dom";
import headerLogo from "./images/docsLogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LinkIcon from "@material-ui/icons/Link";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import { makeStyles } from "@material-ui/core/styles";
import PresentToAllRoundedIcon from "@material-ui/icons/PresentToAllRounded";
import StarIcon from "@material-ui/icons/Star";
import ShareDialog from "./ShareDialog";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(() => ({
  root: {
    background: "#fff",
    boxShadow: "none",
    borderBottom: "1px solid lightgray",
  },
  container: {
    display: "flex",
    alignItems: "center",
    padding: "10px 1rem",
  },
  headerLogo: {
    height: 40,
    width: 40,
    cursor: "pointer",
  },
  optionsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  spanContainer: {
    color: "#1a1a1a",
    fontSize: 14,
    marginTop: 3,
  },
  option: {
    cursor: "pointer",
    padding: "2px 8px",
    "&:hover": {
      background: "#EDEFEF",
      borderRadius: 2,
    },
  },
  input: {
    padding: 3,
    fontSize: 18,
    color: "gray",
    outlineWidth: 0,
    border: "none",
    width: "180px",
    "&:hover": {
      border: "1px solid #EDEFEF",
    },
  },
  button: {
    background: "#1b7fde",
    color: "white",
    textTransform: "none",
    fontSize: 14,
    fontWeight: 500,
    padding: "6px 1rem",
    marginLeft: 10,
    marginRight: "1rem",
    "&:hover": {
      background: "#1b7fde",
    },
  },
  presentBtn: {
    border: "1px solid lightgray",
    height: 40,
    width: 55,
    borderRadius: 20,
    marginLeft: 10,
  },
  starIcon: {
    "&:hover": {
      background: "#EDEFEF",
      borderRadius: 2,
    },
  },
}));

const tooltipStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 12,
  },
}));

const Header = () => {
  const [star, setStar] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const tooltipClass = tooltipStyles();

  return (
    <AppBar position="fixed" className={`${classes.root} hidden`}>
      <Toolbar className={classes.container}>
        <Tooltip arrow classes={tooltipClass} title="New Document">
          <img
            src={headerLogo}
            onClick={() => history.push(`/document/${uuidV4()}`)}
            className={classes.headerLogo}
            alt=""
          />
        </Tooltip>
        <div className={classes.optionsContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip arrow title="Rename" classes={tooltipClass}>
              <input
                className={classes.input}
                type="text"
                defaultValue="Untitled document"
              />
            </Tooltip>
            <Tooltip
              arrow
              title={star ? "unstar" : "star"}
              onClick={() => setStar(!star)}
              style={{ marginLeft: 10 }}
              classes={tooltipClass}
            >
              {star ? (
                <StarIcon
                  htmlColor="orange"
                  className={classes.starIcon}
                  fontSize="small"
                />
              ) : (
                <StarBorderIcon
                  htmlColor="#6e6e6e"
                  className={classes.starIcon}
                  fontSize="small"
                />
              )}
            </Tooltip>
          </div>
          <div className={classes.spanContainer}>
            <span className={classes.option}>File</span>
            <span className={classes.option}>Edit</span>
            <span className={classes.option}>View</span>
            <span className={classes.option}>Insert</span>
            <span className={classes.option}>Format</span>
            <span className={classes.option}>Tools</span>
            <span className={classes.option}>Extensions</span>
            <span className={classes.option}>Help</span>
          </div>
        </div>
        <Tooltip
          classes={tooltipClass}
          arrow
          title="Open Comment History (Ctrl+Alt+Shift+A)"
        >
          <IconButton>
            <CommentOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip classes={tooltipClass} arrow title="Present to a meeting">
          <IconButton className={classes.presentBtn}>
            <PresentToAllRoundedIcon htmlColor="#1b7fde" />
          </IconButton>
        </Tooltip>
        <Tooltip
          classes={tooltipClass}
          arrow
          title="Anyone with the link can access"
        >
          <Button
            startIcon={<LinkIcon style={{ height: 15, width: 15 }} />}
            className={classes.button}
            onClick={() => setOpen(true)}
          >
            Share
          </Button>
        </Tooltip>
        <Tooltip classes={tooltipClass} title="Google Account">
          <Avatar style={{ height: 35, width: 35, cursor: "pointer" }} />
        </Tooltip>
      </Toolbar>
      <ShareDialog open={open} setOpen={setOpen} setSnackbar={setSnackbar} />
      <Snackbar
        open={snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setSnackbar(false)}
        autoHideDuration={2000}
        message="Link copied"
      />
    </AppBar>
  );
};

export default Header;
