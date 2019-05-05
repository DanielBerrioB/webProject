import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Done from "@material-ui/icons/Done";
import DataShop from "./APIMethod/apiMethods";
import SnackBar from "./snackBar";

var data;

const style = {
  marginLeft: "80px"
};

/**
 * This class represents a simple menu with all the things that the user has choosen
 */
class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    arrayElement: [{ id: 0, name: "", precio: 0, size: 0 }],
    estaActivado: false,
    openSnack: false,
    snackMessage: ""
  };

  //Get all the elements from local storage and then it saves into data
  handleClick = event => {
    if (localStorage.carrito) {
      data = JSON.parse(localStorage.getItem("carrito"));
      this.setState({ arrayElement: data });
      if (data.length > 0) this.setState({ anchorEl: event.currentTarget });
    }
  };

  //When the cart has been closed the anchorEl state changes and delete the elements with the given id
  handleClose = event => {
    this.setState({ anchorEl: null });
    if (localStorage.carrito) {
      data = JSON.parse(localStorage.getItem("carrito"));
      var seElimino = toDelete(event.target.id, data);
      localStorage.setItem("carrito", JSON.stringify(seElimino));
      data = JSON.parse(localStorage.getItem("carrito"));
      this.setState({ arrayElement: data });
      if (data.length === 0) this.setState({ estaActivado: false });
    }
  };

  handleBuyClothe = () => {
    if (localStorage.getItem("user")) {
      var total = 0;
      data.forEach(i => (total += parseInt(i.precio)));
      var body = {
        email: JSON.parse(localStorage.getItem("user")).email,
        shop: data,
        total: total
      };
      data = [];
      total = 0;
      DataShop.postShopCart(body)
        .then(res => res.json())
        .then(value => {
          if (value.status) {
            this.setState({ anchorEl: null });
            localStorage.removeItem("carrito");
            this.props.handleSnackMessage(
              "Has comprado los productos en las próximas horas recibiras un mensaje con los metodos de pago"
            );
          } else {
            this.props.handleSnackMessage(
              "No se han podido comprar los productos intenta de nuevo"
            );
          }
        });
    } else {
      this.props.handleSnackMessage("No has ingresado a tu cuenta");
    }
  };

  handleExit = () => this.setState({ anchorEl: null });

  handleShopCar = () => this.setState({ arrayElement: data });

  handleCloseSnackBar = () => this.setState({ openSnack: false });

  render() {
    const { anchorEl } = this.state;
    var elements = this.state.arrayElement;
    if (data) elements = data;
    return (
      <div style={style}>
        <IconButton
          style={{ margin: "50px" }}
          color="black"
          aria-label="Add to shopping cart"
          onClick={this.handleClick}
        >
          <AddShoppingCartIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleExit}
        >
          {elements.map(element => (
            <Grid item xs={8} style={{ width: "100%" }}>
              <MenuItem
                onClick={this.handleClose}
                style={{ width: "100%" }}
                id={element.id}
              >
                <DeleteIcon style={{ float: "right" }} />
                {element.name}
              </MenuItem>
            </Grid>
          ))}
          {elements.length > 0 ? (
            <div>
              <Button onClick={this.handleBuyClothe}>Comprar</Button>
              <Done />
            </div>
          ) : (
            ""
          )}
          <SnackBar
            openSnackBar={this.state.openSnack}
            handleCloseSnack={this.handleCloseSnackBar}
            textMessage={this.state.snackMessage}
          />
        </Menu>
      </div>
    );
  }
}

/**
 * This methos allows to delete a tuple given an Id
 * @param {Represents the value to find} id
 * @param {It's the array that contains all the information} arrayData
 */
function toDelete(id, arrayData) {
  var toReturn = [];
  if (arrayData.length === 1) return toReturn;
  for (let i = 0; i < arrayData.length; i++) {
    if (id != arrayData[i].id) toReturn.push(arrayData[i]);
  }
  return toReturn;
}

export default SimpleMenu;
