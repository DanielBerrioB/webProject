import React from "react";
import PropTypes, { element } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from '@material-ui/core/Button';

const botonBackground = {
  background: "#FF956C",
  borderRadios: "20px",
  marginLeft: "10px"
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

class CommendModal extends React.Component {
  state = {
    sizeClothe: "",
    text: ""
  };

  createComment = () => {
    this.setState({text: document.getElementById("txt1").value});
    var last = localStorage.getItem("comentario") +"\n";
    localStorage.setItem("comentario", last + document.getElementById("txt1").value);
  }

  handleClose = event => {
    this.handleClose(event);
  };

  handleButton = size => {
    this.setState({ sizeClothe: size });
  };


  render() {
    const { classes } = this.props;
    //var element = findById(this.props.text);
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
              <p>Deja tu comentario!</p>
              <input id="txt1" style={{ width: "300px", height: "300px", textAlign: "start" }} type="text" ></input>

              <Button onClick={this.createComment} style={botonBackground}>Enviar</Button>
            </center>

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
