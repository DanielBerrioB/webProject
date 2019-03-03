import React from "react";
import Data from "../auxData.js";
import TableElement from "./tableElement";
import ButtonAppBar from "./searcher";

const simpleStyle = {
  width: "100%",
  marginTop: "50px"
};

const imagenStyle = {
  borderRadius: "50px"
};

var values = toConvert(Data);

//This class represents
class ImageSet extends React.Component {
  state = {
    arrayElement: values
  };

  onAlert = (event, array) => {
    if (array.length !== 0) this.setState({ arrayElement: toConvert(array) });
  };

  render() {
    return (
      <div>
        <ButtonAppBar handleChange={this.onAlert} />
        <center>
          <table style={simpleStyle} cellSpacing="20px" key="table1">
            {this.state.arrayElement.map(option => (
              <tr>
                {option.map(element => (
                  <TableElement
                    name={element.name}
                    precio={element.precio}
                    src={element.source}
                    style={imagenStyle}
                    key={element.id}
                  />
                ))}
              </tr>
            ))}
          </table>
        </center>
      </div>
    );
  }
}

function toConvert(arrayParse) {
  var cont = 0;
  var values = [],
    aux = [];
  for (let i = 0; i < arrayParse.length; i++) {
    if (cont === 3) {
      aux.push(arrayParse[i]);
      values.push(aux);
      aux = [];
      cont = 0;
    } else {
      aux.push(arrayParse[i]);
      cont++;
    }
  }
  values.push(aux);
  return values;
}

export default ImageSet;
