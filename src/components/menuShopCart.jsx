import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

var data;

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    arrayElement: [{ id: 0, name: "", precio: 0, size: 0 }],
    estaActivado: false
  };

  handleClick = event => {
    if (localStorage.carrito) {
      data = JSON.parse(localStorage.getItem("carrito"));
      this.setState({ arrayElement: data });
      if (data.length > 0) this.setState({ anchorEl: event.currentTarget });
    }
  };
  //Cambiar
  handleClose = (event) => {
    this.setState({ anchorEl: null });
    if (localStorage.carrito) {
      data = JSON.parse(localStorage.getItem("carrito"));
      var seElimino = toDelete(event.target.id, data);
      localStorage.setItem(
        "carrito",
        JSON.stringify(seElimino)
      );
      data = JSON.parse(localStorage.getItem("carrito"));
      this.setState({ arrayElement: data });
      if (data.length === 0) this.setState({ estaActivado: false });
    }
  };

  handleExit = event => {
    this.setState({ anchorEl: null });
  };

  handleShopCar = () => {
    this.setState({ arrayElement: data });
  };

  render() {
    const { anchorEl } = this.state;
    var elements = this.state.arrayElement;
    if(data) elements = data;
    return (
      <div>
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
              <MenuItem onClick={this.handleClose} style={{ width: "99%" }} id={element.id}>
                <DeleteIcon style={{ float: "right" }} />
                {element.name}
              </MenuItem>
            </Grid>
          ))}
        </Menu>
      </div>
    );
  }
}

function toDelete(id, arrayData) {
  var toReturn = [];
  if (arrayData.length === 1) return toReturn;
  for (let i = 0; i < arrayData.length; i++) {
    if (id != arrayData[i].id) toReturn.push(arrayData[i]);
  }
  console.log(toReturn);
  return toReturn;
}

export default SimpleMenu;
