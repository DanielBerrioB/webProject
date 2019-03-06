import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

if (localStorage.carrito) {
  var data = JSON.parse(localStorage.getItem("carrito"));
  data.forEach(i => {
    console.log("Mal " + i.name);
  });
}

/*
function toArray() {
  var array = [];
  try {
    console.log("Tamaño " + data.length);
    for (let i = 1; i < data.length; i++) {
      data[i].forEach(element => {
        array.push(element);
        console.log("Sale" + element);
      });
    }
    array.push(data[0]);
    console.log("Primer dato " + data[0]);
    return array;
  } catch (error) {
    console.log(error);
    array.push({ id: 0, name: "", precio: 0, size: 0 });
    return array;
  }
}
*/

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    arrayElement: [{ id: 0, name: "", precio: 0, size: 0 }],
    estaActivado: false
  };

  //Cambiar
  handleClick = event => {
    if (localStorage.carrito) {
      this.setState({ arrayElement: data });
      console.log(data.length + " Tamano ");
      if (data.length > 0) this.setState({ anchorEl: event.currentTarget });
    }
  };
  //Cambiar
  handleClose = event => {
    this.setState({ anchorEl: null });
    if (localStorage.carrito) {
      localStorage.setItem(
        "carrito",
        JSON.stringify(toDelete(event.target.value))
      );
      data = localStorage.getItem("carrito");
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
              <MenuItem onClick={this.handleClose} style={{ width: "99%" }}>
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

function toDelete(id) {
  var toReturn = [];
  if (data.length === 1) return toReturn;
  for (let i = 0; i < data.length; i++) {
    if (id !== data.id) toReturn.push(data);
  }
  return toReturn;
}

export default SimpleMenu;
