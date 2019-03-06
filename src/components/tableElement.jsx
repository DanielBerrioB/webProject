import React from "react";

const normal = {
  fontWeight: "normal"
};
//Somethind different
class TableElement extends React.Component {
  handleImageClick = event => {
    this.props.handleImageClick(event);
  };

  render() {
    return (
      <th>
        <img
          style={this.props.style}
          src={this.props.src}
          width="250"
          height="430"
          id={this.props.id}
          alt=""
          onClick={this.handleImageClick.bind(this)}
        />
        <p style={normal}>{this.props.identify}</p>
        <p style={normal}>{this.props.name}</p>
        <p style={normal}>Precio: ${this.props.precio}</p>
      </th>
    );
  }
}

export default TableElement;
