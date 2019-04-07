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
import logo from "../images/logo.png";
import promocion from "../images/promocion.png";
import nuevo from "../images/nuevo.png";
import Data from "../auxData";
import SimpleMenu from "./menuShopCart";
import Comentarios from "../images/comentarios.png";
import ModalComment from "./modalWindows/modalComment";
import Gestionar from "../images/GestionarProducto.png";
import DataProduct from "./APIMethod/apiMethods";

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
  marginLeft: "55%",
  width: "85%",
  fontSize: "18px"
};

const stylesToolbar = {
  background: "#FF7F50",
  height: "50px"
};

async function getAllProducts() {
  var users = await DataProduct.getProducts();
  return users;
}

if (!localStorage.arrayElement)
  localStorage.setItem("arrayElement", JSON.stringify(Data));

var nuevoArray = [];
/**
 * Allows to return the categories from the local storage
 * @param {The array that contains all the information from the API} array
 */
async function categoryArray() {
  nuevoArray = await getAllProducts();
  var arrayToReturn = [];
  nuevoArray.forEach(i => {
    if (!arrayToReturn.includes(i.categoria)) arrayToReturn.push(i.categoria);
  });
  return arrayToReturn;
}

class ButtonAppBar extends React.Component {
  componentDidMount() {
    categoryArray().then(value => this.setState({ arrayCategory: value }));
  }
  state = {
    openComment: false,
    text: "",
    arrayCategory: []
  };

  handleClickComment = event => {
    this.setState({ openComment: true });
  };

  closeComment = event => {
    this.setState({ openComment: false });
  };

  updateElementFromParent() {
    categoryArray().then(value => this.setState({ arrayCategory: value }));
  }

  handleChange = event => {
    this.setState({ text: event.target.value });
    verifyContent(this.state.text).then(value =>
      this.props.handleChange(event, value)
    );
  };

  handleClick = event => {
    this.props.handleClick(event);
  };

  putting = (event, text) => {
    categoryArray().then(value => this.setState({ arrayCategory: value }));
    this.props.putting(event, text);
  };

  handleMenuGestion = (event, text) => {
    this.props.handleMenuGestion(text);
  };

  //This handle event is called when the button "Inicia sesion" has been clicked
  handleClickUser = event => {
    this.props.handleClickUser();
  };

  render() {
    return (
      <div className={this.props.root}>
        <AppBar position="fixed">
          <Toolbar style={stylesToolbar}>
            <LongMenu
              array={this.state.arrayCategory}
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
              name={<img src={Gestionar} alt="" />}
              handleClickOption={this.handleMenuGestion}
            />
            <IconButton id="btnSesion" onClick={this.handleClickUser}>
              Inicia sesión
            </IconButton>
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

/**
 * Return all the data related to the text
 * @param {Text given by the input} text
 */
async function verifyContent(text) {
  var arrayElement = [];
  var newData = nuevoArray;
  if (text !== "") {
    for (let i = 0; i < newData.length; i++) {
      if (
        newData[i].name
          .toLowerCase()
          .trim()
          .includes(text) ||
        newData[i].categoria
          .toLowerCase()
          .trim()
          .includes(text)
      ) {
        arrayElement.push(newData[i]);
      }
    }
  }
  return arrayElement;
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles1)(ButtonAppBar);
