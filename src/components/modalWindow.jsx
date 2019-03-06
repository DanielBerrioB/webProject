import React from "react";
import PropTypes, { element } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TableElement from "./tableElement";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import OptionButton from "./optionSize";
import Button from "@material-ui/core/Button";

const botonBackground = {
  background:
    "-webkit-linear-gradient(left, rgba(179,220,237,1) 0%, rgba(41,184,229,1) 50%, rgba(188,224,238,1) 100%)"
};
//New element
const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    borderRadius: "20px"
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class SimpleModal extends React.Component {
  state = {
    sizeClothe: ""
  };

  handleClose = event => {
    this.handleClose(event);
  };

  handleButton = size => {
    this.setState({ sizeClothe: size });
  };

  handleAddCar = () => {
    var information = findById(this.props.text);
    var jsonVar1 = [
      {
        id: information.id,
        name: information.name,
        precio: information.precio,
        size: this.state.sizeClothe
      }
    ];

    if (!localStorage.carrito) {
      localStorage.setItem("carrito", JSON.stringify(jsonVar1));
    } else {
      var dataCar = JSON.parse(localStorage.getItem("carrito"));
      dataCar.push({
        id: information.id,
        name: information.name,
        precio: information.precio,
        size: this.state.sizeClothe
      });
      localStorage.setItem("carrito", JSON.stringify(dataCar));
    }
    this.props.cambio();
  };

  render() {
    const { classes } = this.props;
    var element = findById(this.props.text);
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.allowOpen}
          onClose={() => this.props.cambio()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <center>
              <TableElement
                name={element.name}
                precio={element.precio}
                src={element.source}
                id={element.id}
              />
              <OptionButton
                handleChange={this.handleButton}
                talla={element.talla}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                style={botonBackground}
                onClick={this.handleAddCar}
              >
                <p style={{ marginRight: "20px" }}>Comprar</p>
                <AddShoppingCartIcon className={classes.rightIcon}>
                  send
                </AddShoppingCartIcon>
              </Button>
            </center>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

function findById(id) {
  var data = JSON.parse(localStorage.getItem("arrayElement"));
  if (!id) {
    const [first] = data;
    return first;
  }
  return data.find(product => product.id == id);
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
