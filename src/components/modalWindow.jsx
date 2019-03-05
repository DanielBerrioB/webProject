import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TableElement from "./tableElement";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme. shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
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
  handleClose = event => {
    this.handleClose(event);
  };

  render() {
    const { classes } = this.props;
    var hola = findById(this.props.text);
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.allowOpen}
          onClose={() => this.props.cambio()}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <h1>{hola.id}</h1>
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
    const [ first ] = data
    return first
  }
  return data.find(product => product.id == id)
  
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
