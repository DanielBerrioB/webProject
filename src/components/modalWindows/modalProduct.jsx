import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import SnackBar from "../snackBar";
import ListProduct from "../listProduct";

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

//This class represents the modal window that shows all the comments and allows to add comments to the local Storage
class ModalProduct extends React.Component {
  state = {
    arrayProduct: [],
    openSnack: false,
    snackMessage: ""
  };

  handleCloseSnackBar = () => this.setState({ openSnack: false });

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
            <h1>Pedidos</h1>
            <ListProduct arrayProduct={this.props.arrayProduct} />
            <SnackBar
              openSnackBar={this.state.openSnack}
              handleCloseSnack={this.handleCloseSnackBar}
              textMessage={this.state.snackMessage}
            />
            <ModalProductWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

ModalProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const ModalProductWrapped = withStyles(styles)(ModalProduct);

export default ModalProductWrapped;
