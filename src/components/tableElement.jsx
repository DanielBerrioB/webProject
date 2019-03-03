import React from "react";

class TableElement extends React.Component {
  render() {
    return (
      <th>
        <img
          style={this.props.style}
          src={this.props.src}
          width="250"
          height="430"
          alt=""
        />
        <p>{this.props.name}</p>
        <p>Precio: {this.props.precio}</p>
      </th>
    );
  }
}

export default TableElement;
