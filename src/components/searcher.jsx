import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LongMenu from "./menu";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import logo from "../images/logo.png";
import promocion from "../images/promocion.png";
import nuevo from "../images/nuevo.png";
import Data from "../auxData";
import SimpleMenu from "./menuShopCart";
import Comentarios from "../images/comentarios.png";
import ModalComment from "./modalComment";

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
  marginLeft: "3%"
};

const styles3 = {
  color: "black",
  marginLeft: "30%",
  fontSize: "18px"
};

const stylesToolbar = {
  background: "#FF7F50",
  height: "50px"
};

if (!localStorage.arrayElement)
  localStorage.setItem("arrayElement", JSON.stringify(Data));

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
    openComment: false,
    text: ""
  };

  handleClickComment = event => {
    this.setState({ openComment: true });
    //this.props.handleClickComment(event);
  };

  closeComment = event => {
    this.setState({ openComment: false });
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

  handleMenuGestion = (event, text) => {
    this.props.handleMenuGestion(text);
  };

  render() {
    return (
      <div className={this.props.root}>
        <AppBar position="fixed">
          <Toolbar style={stylesToolbar}>
            <LongMenu
              array={categoryArray()}
              name={<img src={nuevo} alt="" />}
              handleClickOption={this.putting}
            />
            <IconButton
              aria-haspopup="true"
              onClick={this.handleClick.bind(this)}
            >
              <img src={promocion} alt="" />
            </IconButton>

            <IconButton aria-haspopup="true" onClick={this.handleClickComment}>
              <img src={Comentarios} alt="" />
            </IconButton>

            <img style={styles2} src={logo} alt="" />

            <div style={{ marginLeft: "5%" }} />

            <FormControl className={this.props.margin}>
              <Input
                id="input-with-icon-adornment"
                style={styles3}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                startAdornment={<SearchIcon />}
              />
            </FormControl>
            <SimpleMenu />
            <LongMenu
              array={[
                "Agregar producto",
                "Eliminar producto",
                "Editar producto"
              ]}
              name={"Gestionar producto"}
              handleClickOption={this.handleMenuGestion}
            />
          </Toolbar>
        </AppBar>
        <ModalComment
          allowOpen={this.state.openComment}
          cambio={this.closeComment}
        />
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
