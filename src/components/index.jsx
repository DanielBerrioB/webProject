import React from "react";
import ImageSet from "./imageSet";
import InfoBar from "./infoBar";
import Moda from "./modalWindow";

class Main extends React.Component {
  render() {
    return (
      <div>
        <ImageSet promotion={this.mostar} />
        <InfoBar />
      </div>
    );
  }
}

export default Main;
