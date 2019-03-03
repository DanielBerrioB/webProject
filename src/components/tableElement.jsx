<<<<<<< HEAD
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
=======
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
>>>>>>> 0bdf93e2adf399c71f74badcc5f6142af5b3f906
