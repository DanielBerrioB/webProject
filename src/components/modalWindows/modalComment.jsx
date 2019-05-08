import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ModalWindow from "../listComment";
import DataComment from "../APIMethod/apiMethods";
import SnackBar from "../snackBar";
import TextField from "@material-ui/core/TextField";

//CSS styles
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
//ATTENTION: THIS CLASS NEEDS TO BE CHANGE IN ORDER TO CONTROL THE ERROR AND AVOID USING document.getElementById
class CommendModal extends React.Component {
  componentDidMount() {
    DataComment.getComment()
      .then(res => res.json())
      .then(value => {
        this.setState({ arrayComment: value, control: true });
      });
  }

  state = {
    sizeClothe: "",
    text: "",
    arrayComment: [],
    openSnack: false,
    snackMessage: "",
    control: false
  };

  /**
   * Create a comment and add it to the localStorage.
   *
   */
  createComment = () => {
    this.setState({ text: document.getElementById("txt1").value });
    if (document.getElementById("txt1").value) {
      if (localStorage.getItem("user")) {
        DataComment.postComment({
          comment: document.getElementById("txt1").value
        })
          .then(res => res.json())
          .then(value => {
            if (value.message) {
              this.setState({ openSnack: true });
              this.setState({ snackMessage: "No has ingresado como usuario" });
            } else {
              this.setState({
                arrayComment: value
              });
              this.props.cambio();
              DataComment.getComment()
                .then(res => res.json())
                .then(value => {
                  this.setState({ arrayComment: value, control: true });
                });
            }
          });
      } else {
        this.setState({ openSnack: true });
        this.setState({
          snackMessage: "No has ingresado como usuario, Intenta de nuevo"
        });
      }
    } else {
      this.setState({ openSnack: true });
      this.setState({ snackMessage: "El campo está vacío" });
    }
  };

  handleCloseSnackBar = () => this.setState({ openSnack: false });

  handleClose = event => {
    this.handleClose(event);
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
            <h5>Deja tu comentario!</h5>
            <center>
              <div>
                <TextField
                  id="txt1"
                  style={{
                    width: "300px",
                    height: "100px",
                    textAlign: "start",
                    fontStyle: "arial"
                  }}
                  rowsMax="5"
                  multiline
                  margin="normal"
                />
              </div>
              <Button onClick={this.createComment} style={botonBackground}>
                Enviar
              </Button>
            </center>
            <ModalWindow array={this.state.arrayComment} />
            <SnackBar
              openSnackBar={this.state.openSnack}
              handleCloseSnack={this.handleCloseSnackBar}
              textMessage={this.state.snackMessage}
            />
            <CommendModalWrapped />
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
const CommendModalWrapped = withStyles(styles)(CommendModal);

export default CommendModalWrapped;
