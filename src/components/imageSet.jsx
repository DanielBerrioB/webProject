<<<<<<< HEAD
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
=======
import React from "react";

const simpleStyle = {
  width: "100%",
  marginTop: "50px"
};

const imagenStyle = {
  borderRadius: "50px"
};

//This class represents
class ImageSet extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <center>
          <div>
            <table style={simpleStyle} cellSpacing="10px">
              <tr>
                <th>
                  <img
                    style={imagenStyle}
                    src={Data[0].source}
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>{Data[0].name}</p>
                  <p>Precio: {Data[0].precio}</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src={Data[1].source}
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>{Data[1].name}</p>
                  <p>Precio: {Data[1].precio}</p>
                </th>

                <th onClick={alert("Se hixo click")}>
                  <img
                    style={imagenStyle}
                    src={Data[2].source}
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>{Data[2].name}</p>
                  <p>Precio: {Data[2].precio}</p>
                </th>

                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Here goes the description's image</p>
                </th>
              </tr>
              <br />
              <tr>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Here goes the description's image</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
              </tr>

              <tr>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Here goes the description's image</p>
                </th>
                <th>
                  <img
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
              </tr>

              <tr>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Here goes the description's image</p>
                </th>
                <th>
                  <img
                    style={imagenStyle}
                    src="https://tennis.vteximg.com.br/arquivos/ids/717344-275-420/Tshirt-fondo-entero.jpg?v=636867032336570000"
                    width="250"
                    height="430"
                    alt=""
                  />
                  <p>Text1</p>
                </th>
              </tr>
            </table>
          </div>
        </center>
      </div>
    );
  }
}

export default ImageSet;
>>>>>>> 564a14dc02bde10a352a53e31c31bdcd8c290fd3
