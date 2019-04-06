import React from "react";
import ImageSet from "./imageSet";
import InfoBar from "./infoBar";
import Data from "../auxData";
import UserLoggin from "./routesElements/userLoggin";
import UserRegistration from "./routesElements/userRegistration";
import { BrowserRouter as Router } from "react-router-dom";

var Route = require("react-router-dom").Route;

class Main extends React.Component {
  constructor(...props) {
    super(...props);
    localStorage.setItem("arrayElement", JSON.stringify(Data));
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("arrayElement"))) {
      localStorage.setItem("arrayElement", JSON.stringify(Data));
    }
  }

  //Route means the posible routes that can be used
  render() {
    return (
      <div>
        <Router>
          <Route
            path="/"
            exact
            strict
            render={props => {
              return (
                <div>
                  <ImageSet {...props} />
                  <InfoBar />
                </div>
              );
            }}
          />

          <Route
            path="/log/"
            exact
            strict
            render={props => {
              return (
                <div>
                  <UserLoggin {...props} />
                </div>
              );
            }}
          />

          <Route
            path="/log/newAccount/"
            exact
            strict
            render={props => {
              return (
                <div>
                  <UserRegistration {...props} />
                </div>
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

export default Main;
