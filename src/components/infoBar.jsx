import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const simpleStyle = {
    height: "70px",
    width: "100%",
    background: " -webkit-linear-gradient(left, rgba(88,189,204,1) 0%, rgba(88,189,204,1) 1%, rgba(209,232,240,1) 100%)"
  };


const letra={
    marginLeft: "35px",
    color: "black"

}

//Here you can add some styles for the elements
class infoBar extends React.Component {
    state = {};
  
    render() {
      return (
        <div style={simpleStyle}>
            <br></br>
        

            <h6 style={letra}>Telefono 318 221 35 96     |   Ubicación Remedios    </h6>
        </div>
    );
  }
}

export default infoBar;
