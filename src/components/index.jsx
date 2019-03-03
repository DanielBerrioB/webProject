import React from "react";
import ImageSet from "./imageSet";
import InfoBar from "./infoBar";

class Main extends React.Component {
  render() {
    return (
      <div>
        <ImageSet />
        <InfoBar />
      </div>
    );
  }
}

export default Main;
