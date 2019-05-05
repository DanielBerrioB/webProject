import React from "react";
import InputType from "../routesElements/inputType";
import Button from "@material-ui/core/Button";
import DataUser from "../APIMethod/apiMethods";

const style1 = {
  height: "400px",
  width: "400px",
  border: "1px solid black",
  float: "none",
  margin: "0 auto",
  marginTop: "10%",
  borderRadios: "20px"
};

//Just to put at the center
const botonBackground = {
  background: "#FFAB88",
  borderRadios: "20px",
  marginTop: "37%",
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

    DataUser.postUserToFind({ email: email, password: password })
      .then(res => {
        return res.json();
      })
      .then(value => {
        if (value.status) {
          var userData = {
            email: email,
            role: value.user.role,
            token: value.token
          };
          DataUser.currentToken = value.user.token;
          localStorage.setItem("user", JSON.stringify(userData));
          alert(`Bienvenido ${email}`);
          this.props.history.push("/");
        } else {
          alert(`No se encontró ${email}`);
        }
      });
  };

  render() {
    return (
      <div>
        <div id="userForm" style={style1}>
          <h1 style={{ textAlign: "center" }}>Inicia sesión</h1>
          <center>
          <InputType showOrHideStatus={true} />
                      </center>
          <center>
            <Button style={botonBackground} onClick={this.handleLogIn}>
              Ingresar
            </Button>
            </center>
            <center>
            <Button
            style={{ marginTop: "10%", alignItems: "center" }}
            onClick={this.hadleNewAccount}
          >
            ¿No tienes cuenta?/Crea una aquí
          </Button>
          </center>
        </div>
      </div>
    );
  }
}

export default UserLoggin;
