import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import calenderIcon from "./images/calender.png";
import googleIcon from "./images/google.png";
import keepIcon from "./images/keep.png";

const useStyles = makeStyles(() => ({
  root: {
    borderLeft: "1px solid lightgray",
    maxWidth: "3.5rem",
    //border: '1px solid red'
  },
  icons: {
    height: 40,
    width: 40,
    marginTop: "1rem",
  },
  divider: {
    borderTop: "1px solid lightgray",
    width: "60%",
    marginTop: "2rem",
    marginBottom: "1rem",
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={`${classes.root} hidden`}
    >
      <Tooltip title="Calender">
        <IconButton className={classes.icons}>
          <Icon style={{ textAlign: "center" }}>
            <img src={calenderIcon} alt="" style={{ height: "110%" }} />
          </Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Keep">
        <IconButton className={classes.icons}>
          <Icon style={{ textAlign: "center" }}>
            <img src={googleIcon} alt="" style={{ height: "80%" }} />
          </Icon>
        </IconButton>
      </Tooltip>
      <Tooltip title="Tasks">
        <IconButton className={classes.icons}>
          <Icon style={{ textAlign: "center" }}>
            <img src={keepIcon} alt="" style={{ height: "90%" }} />
          </Icon>
        </IconButton>
      </Tooltip>
      <div className={classes.divider} />
      <Tooltip title="Get add-ons">
        <IconButton className={classes.icons}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default Sidebar;
