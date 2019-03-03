import React from "react";
import ImageSet from "./imageSet";
import ButtonAppBar from "./searcher";
import InfoBar from "./infoBar";

class Main extends React.Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <InfoBar />
        <ImageSet />
      </div>
    );
  }
}

export default Main;
