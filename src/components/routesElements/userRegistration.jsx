import React from "react";
import InputType from "../routesElements/inputType";
import Button from "@material-ui/core/Button";
import DataUser from "../APIMethod/apiMethods";
import SnackBar from "../snackBar";

const style1 = {
  height: "500px",
  width: "400px",
  border: "1px solid black",
  float: "none",
  margin: "0 auto",
  marginTop: "5%",
  borderRadios: "20px"
};

const botonBackground = {
  background: "#FFAB88",
  borderRadios: "20px",
  marginTop: "55%",
  width: "90px",
  height: "45px"
};

/**
 * This class represents the window where the user can register
 * into the app
 */
class UserRegistration extends React.Component {
  state = {
    openSnack: false,
    snackMessage: ""
  };

  handleCloseSnackBar = () => {
    this.setState({ openSnack: false });
  };

  //With this method a user can be added to the API
  handleCreateUser = () => {
    var email = document.getElementById("email").value;
    var password_verify = document.getElementById("password_verify").value;
    var password = document.getElementById("password").value;
    //The SnackBar is open putting true on openSnack
    if (email && password && password_verify) {
      if (password === password_verify) {
        DataUser.postUser({
          email: email,
          password: password,
          role: false
        }).then(() => {
          this.setState({ openSnack: true });
          this.setState({ snackMessage: "Se ha agregado correctamente" });
          this.props.history.push("/log/");
        });
      } else {
        this.setState({ openSnack: true });
        this.setState({ snackMessage: "Las contraseñas no coinciden" }); //The message to snackBar
      }
    } else {
      this.setState({ openSnack: true });
      this.setState({ snackMessage: "No has ingresado todos lo campos" }); //The message to snackBar
    }
  };

  render() {
    return (
      <div>
        <div id="userForm" style={style1}>
          <h1 style={{ textAlign: "center" }}>Crea tu cuenta</h1>
          <InputType showOrHideStatus={false} />
          <br/>
          <center>
          <Button style={botonBackground} onClick={this.handleCreateUser}>
            Crear
          </Button>
          </center>
          <SnackBar
            openSnackBar={this.state.openSnack}
            handleCloseSnack={this.handleCloseSnackBar}
            textMessage={this.state.snackMessage}
          />
        </div>
      </div>
    );
  }
}

export default UserRegistration;
