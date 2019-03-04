import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LongMenu from "./menu";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import Data from "../auxData.js";

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
  fontStyle: "italic"
};

const stylesToolbar = {
  background: "#00BFFF",
  height: "50px"
};

const fontStyle = {
  color: "#fff"
};

function categoryArray() {
  var arrayToReturn = [];
  Data.forEach(i => {
    if (!arrayToReturn.includes(i.categoria)) arrayToReturn.push(i.categoria);
  });
  return arrayToReturn;
}

class ButtonAppBar extends React.Component {
  state = {
    text: ""
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
    this.props.handleChange(event, verifyContent(this.state.text));
  };

  handleClick = event => {
    this.props.handleClick(event);
  };

  putting = (event, text) => {
    this.props.putting(event, text);
  };

  render() {
    return (
      <div className={this.props.root}>
        <AppBar position="fixed">
          <Toolbar style={stylesToolbar}>
            <LongMenu
              array={categoryArray()}
              name={"Nuevo"}
              handleClickOption={this.putting}
            />
            <IconButton
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}
            >
              <p style={fontStyle}>Promoción</p>
            </IconButton>
            <Typography style={styles2} className={this.props.grow}>
              Boutique Paula Carmona
            </Typography>

            <FormControl className={this.props.margin}>
              <Input
                id="input-with-icon-adornment"
                style={styles2}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
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
}

function verifyContent(text) {
  var arrayElement = [];
  if (text !== "") {
    for (let i = 0; i < Data.length; i++) {
      if (
        Data[i].name
          .toLowerCase()
          .trim()
          .includes(text) ||
        Data[i].categoria
          .toLowerCase()
          .trim()
          .includes(text)
      ) {
        arrayElement.push(Data[i]);
      }
    }
  }
  return arrayElement;
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles1)(ButtonAppBar);
