import React from "react";
import TableElement from "./tableElement";
import ButtonAppBar from "./searcher";
import ModalWindow from "./modalWindow";
import Data from "../auxData";

const simpleStyle = {
  width: "100%",
  marginTop: "50px"
};

const imagenStyle = {
  borderRadius: "50px"
};

if (!localStorage.arrayElement)
  localStorage.setItem("arrayElement", JSON.stringify(Data));

var data = JSON.parse(window.localStorage.getItem("arrayElement"));
var values = toConvert(data);

//This class represents
class ImageSet extends React.Component {
  state = {
    arrayElement: values,
    openModal: false,
    valueKey: "",
  };

  onAlert = (event, array) => {
    if (array.length !== 0) this.setState({ arrayElement: toConvert(array) });
  };

  show = (event, text) => {
    if (text !== "") this.setState({ arrayElement: fromCategory(text) });
  };

  promotion = event => {
    this.setState({ arrayElement: byPromotion() });
  };

  imageClick = event => {
    this.setState({ openModal: true });
    this.setState({ valueKey: event.target.id });
  };

  imageClickClose = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <div>
        <ButtonAppBar
          handleChange={this.onAlert}
          putting={this.show}
          handleClick={this.promotion}
        />
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
                    id={element.id}
                    handleImageClick={this.imageClick.bind(this)}
                  />
                ))}
              </tr>
            ))}
          </table>
          <ModalWindow
            allowOpen={this.state.openModal}
            cambio={this.imageClickClose}
            text={this.state.valueKey}
          />
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

function byPromotion() {
  var arrayToReturn = [];
  data.forEach(i => {
    if (i.promocion) arrayToReturn.push(i);
  });
  return toConvert(arrayToReturn);
}

function fromCategory(text) {
  var arrayToReturn = [];
  data.forEach(i => {
    if (text.includes(i.categoria)) arrayToReturn.push(i);
  });
  return toConvert(arrayToReturn);
}

export default ImageSet;
