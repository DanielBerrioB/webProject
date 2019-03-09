import React from "react";
import PropTypes, { element } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

//CSS styles
const botonBackground = {
  background: "#FF956C"
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
 * This class show the different interfaces for the admin that changes dinamilly depending
 * of the parameter that the father provides
 */
class ModalGestion extends React.Component {
  handleActionButton = event => {
    //Deleting
    if (event.currentTarget.id == "Eliminar producto") {
      if (findId(document.getElementById("txtEliminarId").value)) {
        var newArray = deleteItem(
          document.getElementById("txtEliminarId").value
        );
        localStorage.setItem("arrayElement", JSON.stringify(newArray));
        document.getElementById("txtEliminarId").value = "";
      } else {
        alert("No se encontró el elemento");
      }
    } else {
      //Editing
      if (event.currentTarget.id == "Editar producto") {
        if (findId(document.getElementById("txtIdEditar").value)) {
          var newArray2 = deleteItem(
            document.getElementById("txtIdEditar").value
          );
          newArray2.push({
            id: parseInt(document.getElementById("txtIdEditar").value),
            name: document.getElementById("txtNameEditar").value,
            source: document.getElementById("txtUrlEditar").value,
            precio: parseInt(document.getElementById("txtPrecioEditar").value),
            categoria: document.getElementById("txtCategoriaEditar").value,
            promocion:
              document.getElementById("txtPromocionEditar").value === "S"
                ? true
                : false,
            talla: document
              .getElementById("txtTallaEditar")
              .value.trim()
              .split(",")
          });
          localStorage.setItem("arrayElement", JSON.stringify(newArray2));
        } else {
          alert("No se encontró el elemento");
        }
      } else {
        // Adding
        var str = document.getElementById("txtTalla").value.split(",");
        var x =
          document.getElementById("txtPromocion").value != "true"
            ? false
            : true;
        var datosAgregar = {
          id: document.getElementById("txtId").value,
          name: document.getElementById("txtName").value,
          source: document.getElementById("txtUrl").value,
          precio: document.getElementById("txtPrecio").value,
          categoria: document.getElementById("txtCategoria").value,
          promocion: x,
          talla: str
        };
        if (localStorage.arrayElement) {
          var last = JSON.parse(localStorage.getItem("arrayElement"));
          last.push(datosAgregar);
          localStorage.setItem("arrayElement", JSON.stringify(last));
        } else {
          var json = datosAgregar;
          localStorage.setItem("arrayElement", JSON.stringify(json));
        }
      }
    }
    this.props.handleActionButton();
  };

  render() {
    const { classes } = this.props;
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
              {this.props.bodyElement}
              <Button
                variant="contained"
                color="black"
                className={classes.button}
                style={botonBackground}
                id={this.props.actionName}
                onClick={this.handleActionButton}
              >
                <p style={{ marginRight: "20px" }}>{this.props.actionName}</p>
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
 * With the id we can delete the element from the localStorage
 * @param {Given key for a particular element} id
 */
function deleteItem(id) {
  var data = JSON.parse(localStorage.getItem("arrayElement"));
  var newArray = [];
  data.forEach(i => {
    if (i.id != id) newArray.push(i);
  });
  return newArray;
}

/**
 * Find an element with the id
 * @param {Given key for a particular element} id
 */
function findId(id) {
  var data = JSON.parse(localStorage.getItem("arrayElement"));
  return data.find(i => i.id == id);
}

ModalGestion.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ModalGestion);

export default SimpleModalWrapped;
