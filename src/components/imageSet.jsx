import React from "react";
import Data from "../auxData.js";
import TableElement from "./tableElement";

const simpleStyle = {
  width: "100%",
  marginTop: "50px"
};

const imagenStyle = {
  borderRadius: "50px"
};
var cont = 0;
var values = [],
  aux = [];
for (let i = 0; i < Data.length; i++) {
  if (cont === 3) {
    aux.push(Data[i]);
    values.push(aux);
    aux = [];
    cont = 0;
  } else {
    aux.push(Data[i]);
    cont++;
  }
}
values.push(aux);

//This class represents
class ImageSet extends React.Component {
  state = {
    arrayElement: values
  };

  render() {
    return (
      <div>
        <center>
          <div>
            <table style={simpleStyle} cellSpacing="20px">
              <tr>
                {this.state.arrayElement[0].map(option => (
                  <TableElement
                    name={option.name}
                    precio={option.precio}
                    src={option.source}
                    style={imagenStyle}
                  />
                ))}
              </tr>
              <br />
              <tr>
                {this.state.arrayElement[1].map(option => (
                  <TableElement
                    name={option.name}
                    precio={option.precio}
                    src={option.source}
                    style={imagenStyle}
                  />
                ))}
              </tr>
            </table>
          </div>
        </center>
      </div>
    );
  }
}

export default ImageSet;
