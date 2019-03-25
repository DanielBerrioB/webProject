import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TableElement from "./tableElement";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import OptionButton from "./optionSize";
import Button from "@material-ui/core/Button";

//CSS styles
const botonBackground = {
  background: "#FFAB88"
};

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

/**
 * This function allows to put the modal window in the center of the screen
 */
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

/**
 * This class shows the image's descriptions when it has been tapped
 */
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

  /**
   * When the button has been clicked the information about the clothe will be added to the
   * JSON at the local storage
   */
  handleAddCar = () => {
    if (this.state.sizeClothe != "") {
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
      this.props.cambio(); //It close the window
      this.setState({ sizeClothe: "" });
    }
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
                color="black"
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

/**
 * Find an element with the id
 * @param {Given key for a particular element} id
 */
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
