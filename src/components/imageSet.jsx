import React from "react";
import TableElement from "./tableElement";
import ButtonAppBar from "./searcher";
import ModalWindow from "./modalWindows/modalWindow";
import ModalGestion from "./modalWindows/modalGestion";
import TextField from "@material-ui/core/TextField";
import DataProduct from "./APIMethod/apiMethods";

//Styles
const simpleStyle = {
  width: "100%",
  marginTop: "50px"
};

const imagenStyle = {
  borderRadius: "50px"
};

var arrayAPI = [];
/**
 * This function returns all the elemtns from the api
 */
async function getAllProducts() {
  var users = await DataProduct.getProducts();
  arrayAPI = users;
  return users;
}

/**
 * This class represents the entire skeleton of the web. First of all, we put
 * the app bar property with the given methods and parameters, then the set of images
 * was putted in a set of rows each one with 4 images, finally the modal windows
 * appears when they are called from its childs.
 */
class ImageSet extends React.Component {
  constructor(props) {
    super(props);
    this.buttonAppBar = React.createRef();
  }

  //Get all the elements from the API
  componentDidMount() {
    getAllProducts().then(value => {
      this.setState({ arrayElement: toConvert(value) });
    });
  }
  //Create a set with some particualar values
  state = {
    arrayElement: [], //Here, the array element takes all the values from localStorage
    openModal: false,
    valueKey: "",
    openModalGestion: false,
    titleModalGestion: "",
    body: <div /> //(WILL BE DELETE)
  };

  onAlert = (event, array) => {
    if (array.length !== 0) this.setState({ arrayElement: toConvert(array) });
  };

  show = (event, text) => {
    if (text !== "")
      fromCategory(text).then(value => this.setState({ arrayElement: value }));
  };

  promotion = event => {
    byPromotion().then(value => this.setState({ arrayElement: value }));
  };

  imageClick = event => {
    this.setState({ openModal: true });
    this.setState({ valueKey: event.target.id });
  };

  imageClickClose = () => {
    this.setState({ openModal: false });
  };

  //Here you add the body's elements from modal class (WILL BE DELETE)
  handleModalGestion = text => {
    if (text.includes("Agregar producto")) {
      this.setState({
        body: (
          <div>
            <h1>Agrega un producto</h1>
            <TextField id="txtId" label="Id" margin="normal" />
            <br />
            <TextField id="txtName" label="Nombre" margin="normal" />
            <br />
            <TextField id="txtUrl" label="URL" margin="normal" />
            <br />
            <TextField id="txtPrecio" label="Precio" margin="normal" />
            <br />
            <TextField id="txtCategoria" label="Categoria" margin="normal" />
            <br />
            <TextField
              id="txtPromocion"
              label="¿Esta en promoción?"
              margin="normal"
            />
            <br />
            <TextField
              id="txtTalla"
              label="Tallas (separadas por,)"
              margin="normal"
            />
            <br />
          </div>
        )
      });
    } else {
      if (text.includes("Eliminar producto")) {
        this.setState({
          body: (
            <div>
              <h1>Eliminar producto</h1>
              <TextField
                id="txtEliminarId"
                label="Ingrese el Id de la imagen"
                margin="normal"
              />
              <br />
            </div>
          )
        });
      } else {
        this.setState({
          body: (
            <div>
              <h1>Editar un producto</h1>
              <TextField
                id="txtIdEditar"
                label="Id imagen a editar"
                margin="normal"
              />
              <br />
              <TextField id="txtNameEditar" label="Nombre" margin="normal" />
              <br />
              <TextField id="txtUrlEditar" label="URL" margin="normal" />
              <br />
              <TextField id="txtPrecioEditar" label="Precio" margin="normal" />
              <br />
              <TextField
                id="txtCategoriaEditar"
                label="Categoria"
                margin="normal"
              />
              <br />
              <TextField
                id="txtPromocionEditar"
                label="¿Promoción?(S o N)"
                margin="normal"
              />
              <br />
              <TextField
                id="txtTallaEditar"
                label="Tallas (separadas por,)"
                margin="normal"
              />
              <br />
            </div>
          )
        });
      }
    }
    this.setState({ titleModalGestion: text });
    this.setState({ openModalGestion: true });
  };

  closeHandleModalGestion = () => {
    this.setState({ titleModalGestion: "" });
    this.setState({ openModalGestion: false });
  };

  //Updating the values to reload the page with new changes made from modalGestion component
  handleReload = (event, array) => {
    array.then(arrayUpdated => {
      var values = toConvert(arrayUpdated);
      this.setState({ arrayElement: values });
      this.setState({ openModalGestion: false });
    });
  };

  //This button is called from its child (searcher, ButtonAppBar) to change the route
  handleUserButton = () => {
    this.props.history.push("/log/");
  };

  render() {
    return (
      <div>
        <ButtonAppBar
          handleChange={this.onAlert}
          putting={this.show}
          handleClick={this.promotion}
          handleMenuGestion={this.handleModalGestion}
          handleClickUser={this.handleUserButton} //To call userButton ("Inicia sesion")
        />
        <center>
          <table style={simpleStyle} cellSpacing="20px" key="table1">
            {this.state.arrayElement.map(option => (
              <tbody>
                {option.map(element => (
                  <TableElement
                    name={element.name}
                    precio={element.precio}
                    src={element.source}
                    style={imagenStyle}
                    identify={element.id}
                    id={element.id}
                    key={element.id}
                    handleImageClick={this.imageClick.bind(this)}
                  />
                ))}
              </tbody>
            ))}
          </table>
          <ModalWindow
            allowOpen={this.state.openModal}
            cambio={this.imageClickClose}
            text={this.state.valueKey}
          />
          <ModalGestion
            allowOpen={this.state.openModalGestion}
            actionName={this.state.titleModalGestion}
            cambio={this.closeHandleModalGestion}
            bodyElement={this.state.body}
            handleActionButton={this.handleReload}
          />
        </center>
      </div>
    );
  }
}

/**
 * This method change a bunch of images into a set of rows with 4 images
 * @param {Array from local storage with all images} arrayParse
 */
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

/**
 * This method returns the products which have a promotion
 */
async function byPromotion() {
  var arrayToReturn = [];
  arrayAPI.forEach(i => {
    if (i.promocion) arrayToReturn.push(i);
  });
  return toConvert(arrayToReturn);
}

/**
 * It return the category with a given key
 * @param {It's the given category key to find the category} text
 */
async function fromCategory(text) {
  var arrayToReturn = [];
  arrayAPI.forEach(i => {
    if (text.includes(i.categoria)) arrayToReturn.push(i);
  });
  return toConvert(arrayToReturn);
}

export default ImageSet;
