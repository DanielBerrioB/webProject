import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ModalWindow from "../listComment";
import DataComment from "../APIMethod/apiMethods";
import SnackBar from "../snackBar";

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
class CommendModal extends React.Component {
  componentDidMount() {
    DataComment.getComment()
      .then(res => {
        return res.json();
      })
      .then(value => {
        this.setState({ arrayComment: value });
      });
  }

  state = {
    sizeClothe: "",
    text: "",
    arrayComment: [],
    openSnack: false,
    snackMessage: ""
  };

  /**
   * Create a comment and add it to the localStorage
   */
  createComment = () => {
    if (this.state.text) {
      DataComment.postComment({
        comment: this.state.text
      })
        .then(res => {
          return res.json();
        })
        .then(value => {
          if (value.message) {
            this.setState({ openSnack: true });
            this.setState({ snackMessage: "No has ingresado como usuario" });
          } else {
            this.setState({
              arrayComment: value
            });
            this.props.cambio();
            this.setState({ text: "" });
          }
        });
    }
  };

  handleCloseSnackBar = () => this.setState({ openSnack: false });

  handleClose = event => {
    this.setState({ text: "" });
    this.handleClose(event);
  };

  handleButton = size => this.setState({ sizeClothe: size });

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.allowOpen === undefined ? false : this.props.allowOpen}
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
                  value={this.state.text}
                  onChange={e => {
                    this.setState({ text: e.target.value });
                  }}
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
