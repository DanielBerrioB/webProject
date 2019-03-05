import React from "react";

const simpleStyle = {
  height: "70px",
  width: "100%",
  background:
    "#F4EADE"
};

const letra = {
  marginLeft: "35px",
  color: "black"
};

//Here you can add some styles for the elements
class infoBar extends React.Component {
  render() {
    return (
      <div style={simpleStyle}>
        <br />
        <center>
        <h3 style={letra}>Telefono 318 221 35 96 | Ubicación Remedios </h3>
        </center>
      
      </div>
    );
  }
}

export default infoBar;
