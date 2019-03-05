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
import logo from "./logo.png";
import promocion from "./promocion.png"
import nuevo from "./nuevo.png"

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
    marginLeft:"14%"
};

const styles3 = {
  color: "black",
  marginLeft: "30%",
  fontSize: "18px"
};

const stylesToolbar = {
  background: "#ED8C72",
  height: "50px"
};


var data = JSON.parse(localStorage.getItem("arrayElement"));

function categoryArray() {
  var arrayToReturn = [];
  data.forEach(i => {
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
              name={<img src = {nuevo}></img>}
              handleClickOption={this.putting}
            />
            <IconButton
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}
            >
              <img src={promocion}></img>
            </IconButton>
            
            <img style={styles2} src={logo}></img>


            <div style={{marginLeft:"20%"}}></div>
            <FormControl className={this.props.margin}>
              <Input
                
                id="input-with-icon-adornment"
                style={styles3}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                
                startAdornment={
                    <SearchIcon />
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
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].name
          .toLowerCase()
          .trim()
          .includes(text) ||
        data[i].categoria
          .toLowerCase()
          .trim()
          .includes(text)
      ) {
        arrayElement.push(data[i]);
      }
    }
  }
  return arrayElement;
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles1)(ButtonAppBar);
