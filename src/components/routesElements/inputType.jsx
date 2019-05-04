import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const styles = theme => ({
  root: {
    display: "flex"
  },
  margin: {
    margin: "20px"
  }
});

class CustomizedInputs extends React.Component {
  state = {
    showPassword: false,
    password: "",
    textEmail: "",
    verifyPassword: "",
    showPasswordVerify: false
  };

  //If the password button has been pressed it changes the state
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  //Changes the state of the password
  handleChangePassword = prop => event => {
    this.setState({ password: event.target.value });
  };
  //Changes the state of the textEmail
  handleChangeEmail = prop => event => {
    this.setState({ textEmail: event.target.value });
  };
  //Changes the state of the password
  handleClickVerifyPassword = () => {
    this.setState(state => ({ showPasswordVerify: !state.showPasswordVerify }));
  };
  //Changes the state of the password when the user verifies it
  handleClickChangePasswordVerfiy = prop => event => {
    this.setState({ verifyPassword: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <TextField
            id="email"
            label="Correo electrónico"
            value={this.props.textEmail}
            onChange={this.handleChangeEmail}
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            style={{ position: "fixed", width: "350px" }}
          />
        </div>
        <br />
        <br />
        <div>

          <TextField
            id="password"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            type={this.state.showPassword ? "text" : "password"}
            label="Contraseña"
            style={{ position: "fixed", marginTop: "6%", width: "350px" }}
            value={this.state.password}
            onChange={this.handleChangePassword("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>

        <div hidden={this.props.showOrHideStatus}>
        <br />

          <TextField //Hidden password only aviable for userRegistration
            id="password_verify"
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            type={this.state.showPasswordVerify ? "text" : "password"}
            label="Confirmar contraseña"
            style={{ position: "fixed", marginTop: "9%", width: "350px" }}
            value={this.state.verifyPassword}
            onChange={this.handleClickChangePasswordVerfiy("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickVerifyPassword}
                  >
                    {this.state.showPasswordVerify ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
      </div>
    );
  }
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
