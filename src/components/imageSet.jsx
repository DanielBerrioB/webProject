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
              {this.state.arrayElement.map(option => (
                <tr>
                  {option.map(element => (
                    <TableElement
                      name={element.name}
                      precio={element.precio}
                      src={element.source}
                      style={imagenStyle}
                    />
                  ))}
                </tr>
              ))}
            </table>
          </div>
        </center>
      </div>
    );
  }
}

export default ImageSet;
