import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import ModalWindow from "../listComment";
import DataComment from "../APIMethod/apiMethods";

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

async function postComment(comment) {
  var response = await DataComment.postComment(comment);
  return response;
}

async function getComment() {
  var response = await DataComment.getComment();
  return response;
}

//This class represents the modal window that shows all the comments and allows to add comments to the local Storage
class CommendModal extends React.Component {
  componentDidMount() {
    getComment().then(res => {
      console.log(res);
      this.setState({ arrayComment: res });
    });
  }

  state = {
    sizeClothe: "",
    text: "",
    arrayComment: []
  };

  /**
   * Create a comment and add it to the localStorage
   */
  createComment = () => {
    this.setState({ text: document.getElementById("txt1").value });
    if (document.getElementById("txt1").value) {
      postComment({ comment: document.getElementById("txt1").value }).then(
        res => {
          res.json().then(value => {
            this.setState({
              arrayComment: value
            });
            this.props.cambio();
          });
        }
      );
    }
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
