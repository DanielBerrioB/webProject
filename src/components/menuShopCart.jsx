import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

if (localStorage.carrito) {
  var data = JSON.parse(localStorage.carrito);
}

function toArray() {
  var array = [];
  if (data) {
    for (let i = 1; i < data.length; i++) {
      data[i].forEach(element => {
        array.push(element);
      });
    }
    array.push(data[0]);
  } else {
    array.push({ id: 0, name: "", precio: 0, size: 0 });
  }
  console.log(array);
  return array;
}

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
    arrayElement: [{ id: 0, name: "", precio: 0, size: 0 }]
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ arrayElement: toArray() });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
    if (toArray().length > 0) {
      localStorage.setItem("carrito", JSON.stringify(toDelete()));
      this.setState({ arrayElement: toArray() });
    }
  };

  handleShopCar = () => {
    this.setState({ arrayElement: toArray() });
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
          onClose={this.handleClose}
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
  return data.filter(function(ele) {
    return ele.id !== id;
  });
}

export default SimpleMenu;
