import React from "react";
import InputType from "../routesElements/inputType";
import Button from "@material-ui/core/Button";
import DataUser from "../APIMethod/apiMethods";
import { createSocket } from "dgram";

const style1 = {
  height: "400px",
  width: "400px",
  border: "1px solid black",
  float: "none",
  margin: "0 auto",
  marginTop: "200px",
  borderRadios: "20px"
};

/**
 * This function return all the users called from apiMethods
 */
async function getAllUsers() {
  var users = await DataUser.getUsers();
  return users;
}

async function findUser(user) {
  var response = await DataUser.postUserToFind(user);
  return response;
}

//Just to put at the center
const botonBackground = {
  background: "#FFAB88",
  borderRadios: "20px",
  marginTop: "30%",
  width: "90px",
  height: "45px"
};
//This class represents the form for the userRegistration
class UserLoggin extends React.Component {
  //This function redirects the users to the registration component
  //where the user can create a new account
  hadleNewAccount = () => {
    this.props.history.push("/log/newAccount/");
  };
  //This method allows to log in the account
  handleLogIn = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    findUser({ email: email, password: password }).then(res => {
      res.json().then(value => {
        if (value.status) {
          localStorage.setItem("user", email);
          alert(`Bienvenido ${email}`);
          this.props.history.push("/");
        } else {
          alert(`No se encontró ${email}`);
        }
      });
    });
  };

  render() {
    return (
      <div>
        <div id="userForm" style={style1}>
          <h1 style={{ textAlign: "center" }}>Inicia sesión</h1>
          <InputType showOrHideStatus={true} />
          <Button style={botonBackground} onClick={this.handleLogIn}>
            Ingresar
          </Button>
          <Button
            style={{ marginTop: "55%", alignItems: "center" }}
            onClick={this.hadleNewAccount}
          >
            ¿No tienes cuenta?/Crea una aquí
          </Button>
        </div>
      </div>
    );
  }
}

export default UserLoggin;
