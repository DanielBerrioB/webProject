import React from "react";
import PropTypes, { element } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ModalWindow from "./listComment";

const botonBackground = {
  background: "#FFAB88",
  borderRadios: "20px",
  marginTop: "10px"
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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
var data = [];

if (localStorage.getItem("comentario")) {
  data = JSON.parse(localStorage.getItem("comentario"));
} else {
  data.push({ comment: "" });
}

class CommendModal extends React.Component {
  state = {
    sizeClothe: "",
    text: "",
    arrayComment: data
  };

  createComment = () => {
    this.setState({ text: document.getElementById("txt1").value });
    if (localStorage.comentario) {
      var last = JSON.parse(localStorage.getItem("comentario"));
      last.push({ comment: document.getElementById("txt1").value });
      localStorage.setItem("comentario", JSON.stringify(last));
    } else {
      var json = [{ comment: document.getElementById("txt1").value }];
      localStorage.setItem("comentario", JSON.stringify(json));
    }
    this.setState({
      arrayComment: JSON.parse(localStorage.getItem("comentario"))
    });
    this.props.cambio();
  };

  handleClose = event => {
    this.handleClose(event);
  };

  handleButton = size => {
    this.setState({ sizeClothe: size });
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
            <h5>Deja tu comentario!</h5>
            <center>
              <div>
                <textarea
                  id="txt1"
                  style={{
                    width: "300px",
                    height: "100px",
                    textAlign: "start",
                    fontStyle: "arial"
                  }}
                />
              </div>
              <Button onClick={this.createComment} style={botonBackground}>
                Enviar
              </Button>
            </center>
            <ModalWindow array={this.state.arrayComment} />
            <commendModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

CommendModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const commendModalWrapped = withStyles(styles)(CommendModal);

export default commendModalWrapped;
