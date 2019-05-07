import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import SnackBar from "../snackBar";
import DataProduct from "../APIMethod/apiMethods";

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
  state = {
    openSnack: false,
    snackMessage: "",
    dataEdit: []
  };

  handleActionButton = event => {
    //Deleting
    if (event.currentTarget.id === "Eliminar producto") {
      if (document.getElementById("txtEliminarId").value) {
        DataProduct.getProduct(
          document.getElementById("txtEliminarId").value
        ).then(res => {
          if (res.message) {
            this.setState({ openSnack: true }); //The SnackBar is open putting true on openSnack
            this.setState({ snackMessage: "El elemento no se encuentra" });
          } else {
            DataProduct.deleteProduct(
              document.getElementById("txtEliminarId").value
            ).then(res => {
              this.props.handleActionButton(event, res.json(), true);
            });
            document.getElementById("txtEliminarId").value = "";
            this.setState({ openSnack: true }); //The SnackBar is open putting true on openSnack
            this.setState({ snackMessage: "Se eliminó correctamente" });
          }
        });
      } else {
        //Verify if the value if empty
        this.setState({ openSnack: true });
        this.setState({ snackMessage: "No has ingresado los campos válidos" });
      }
    } else {
      //Editing
      if (event.currentTarget.id === "Editar producto") {
        if (this.props.openEditar) {
          if (document.getElementById("txtIdEditar").value) {
            DataProduct.getProduct(
              document.getElementById("txtIdEditar").value
            ).then(res => {
              if (res.message) {
                this.setState({ openSnack: true }); //The SnackBar is open putting true on openSnack
                this.setState({ snackMessage: "El id no se encuentra" });
              } else {
                this.setState({ dataEdit: res });
                this.props.handleActionButton(
                  event,
                  res,
                  !this.props.openEditar
                );
              }
            });
          } else {
            this.setState({ openSnack: true }); //The SnackBar is open putting true on openSnack
            this.setState({ snackMessage: "No has ingresado el id" });
          }
        } else {
          var id, name, source, precio, categoria, promocion, talla;
          id = parseInt(document.getElementById("txtIdEditar").value);
          name = document.getElementById("txtNameEditar").value;
          source = document.getElementById("txtUrlEditar").value;
          precio = parseInt(document.getElementById("txtPrecioEditar").value);
          categoria = document.getElementById("txtCategoriaEditar").value;
          promocion =
            document.getElementById("txtPromocionEditar").value === "S"
              ? true
              : false;
          talla = document.getElementById("txtTallaEditar").value;
          var datosEditar = {
            id: id ? id : this.state.dataEdit.id,
            name: name ? name : this.state.dataEdit.name,
            source: source ? source : this.state.dataEdit.source,
            precio: precio ? precio : this.state.dataEdit.precio,
            categoria: categoria ? categoria : this.state.dataEdit.categoria,
            promocion: promocion,
            talla: talla ? talla.trim().split(",") : this.state.dataEdit.talla
          };
          DataProduct.putProduct(
            datosEditar,
            id ? id : this.state.dataEdit.id
          ).then(res => this.props.handleActionButton(event, res.json(), true));

          this.setState({ openSnack: true }); //The SnackBar is open putting true on openSnack
          this.setState({ snackMessage: "Se editó correctamente" }); //The message to snackBar
          this.setState({ dataEdit: [] });
        }
      } else {
        // Adding
        var str = document.getElementById("txtTalla").value.split(",");
        var x =
          document.getElementById("txtPromocion").value !== "true"
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

        DataProduct.addProduct(datosAgregar).then(res => {
          this.props.handleActionButton(event, res.json(), true);
        });
      }
    }
  };

  //Here the openSnack is changed by false in order to close the SnackBar.
  handleCloseSnackBar = () => {
    this.setState({ openSnack: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={
            this.props.allowOpen === undefined ? false : this.props.allowOpen
          }
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
        <SnackBar
          openSnackBar={this.state.openSnack}
          handleCloseSnack={this.handleCloseSnackBar}
          textMessage={this.state.snackMessage}
        />
      </div>
    );
  }
}

ModalGestion.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ModalGestion);

export default SimpleModalWrapped;
