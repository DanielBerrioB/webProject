import React from "react";
import IconButton from "@material-ui/core/IconButton";

const simpleStyle = {
  height: "30px",
  width: "100%",
  background:
    "#636060",
  position: "absolute",
};

const height = {
  height: "20px",
  color: "black",
  fontSize: "15px",
  marginBottom: "20px"
};

//Here you can add some styles for the elements
class searcher2 extends React.Component {
    handleClickUser = event => {
        this.props.handleClickUser();
      };

  render() {



    return (
      <div style={simpleStyle}>
      <center>
        <IconButton id="btnSesion" onClick={this.handleClickUser} style={height}>
              Iniciar Sesión
        </IconButton>
        </center>
      </div>
    );
  }
}

export default searcher2;