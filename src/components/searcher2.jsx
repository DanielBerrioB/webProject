import React from "react";
import IconButton from "@material-ui/core/IconButton";
import LongMenu from "./menu";
import DataProduct from "./APIMethod/apiMethods";
import ModalProduct from "./modalWindows/modalProduct";

const simpleStyle = {
  height: "40px",
  width: "100%",
  background: "#636060",
  position: "absolute"
};

const height = {
  height: "25px",
  color: "white",
  fontSize: "15px",
  marginBottom: "20px",
  float: "right"
};

/**
 * This function returns the user saved from the local storage
 */
function getUserFromLocal() {
  var user = JSON.parse(localStorage.getItem("user"));
  return user ? user.email : false;
}

//Here you can add some styles for the elements
class searcher2 extends React.Component {
  componentDidMount() {
    var user = getUserFromLocal();
    if (user) {
      this.setState({ isHidden: false });
      this.setState({ textUser: user });
    } else {
      this.setState({ isHidden: true });
      this.setState({ textUser: "" });
    }
  }

  handleClickUser = () => this.props.handleClickUser();

  handleCloseModalWindow = () => this.setState({ openModalProduct: false });

  handleItem = (event, text) => {
    if (text === "Cerrar sesión") {
      DataProduct.currentToken = "";
      this.setState({ isHidden: true });
      this.setState({ textUser: "" });
      localStorage.removeItem("user");
    } else {
      if (text === "Pedidos") {
        DataProduct.getShopCart()
          .then(res => res.json())
          .then(result => {
            this.setState({ arrayProduct: result });
            this.setState({ openModalProduct: true }); //This modal window is open
          });
      }
    }
  };

  state = {
    isHidden: false,
    textUser: "",
    openModalProduct: false,
    arrayProduct: []
  };

  render() {
    return (
      <div style={simpleStyle}>
        <LongMenu
          id="btnBienvenido"
          array={
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).role
                ? ["Pedidos", "Cerrar sesión"]
                : ["Cerrar sesión"]
              : ["Cerrar sesión"]
          }
          name={this.state.textUser}
          key="btnBienvenido"
          hidden={this.state.isHidden}
          handleClickOption={this.handleItem}
        />
        <center hidden={!this.state.isHidden}>
          <IconButton
            id="btnSesion"
            onClick={this.handleClickUser}
            style={height}
          >
            Iniciar Sesión
          </IconButton>
        </center>
        <ModalProduct
          allowOpen={this.state.openModalProduct}
          cambio={this.handleCloseModalWindow}
          arrayProduct={this.state.arrayProduct}
        />
      </div>
    );
  }
}

export default searcher2;
