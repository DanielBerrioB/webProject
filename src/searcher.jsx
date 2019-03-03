import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LongMenu from "./menu";
import LongMenu2 from "./menu2";
import LongMenu3 from "./menu3";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";

//Here you can add some styles for the elements
const styles1 = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const styles2 = {
  color: "#fff",
  marginLeft: "240px",
  fontSize: "20px",
  fontStyle: "italic",

};


const stylesToolbar = {
  background: "#00BFFF",
  height: "50px",

}

//AppBar Component
function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar style={stylesToolbar}>
          <LongMenu />
          <LongMenu2 />
          <LongMenu3 />
          <Typography style={styles2} className={classes.grow}>
            Boutique Paula Montes
          </Typography>

          <FormControl className={classes.margin}>
            <Input
              id="input-with-icon-adornment"
              style={styles2}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Toolbar>
      </AppBar>
      <br />
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles1)(ButtonAppBar);
