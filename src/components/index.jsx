import React from "react";
import ImageSet from "./imageSet";
import ButtonAppBar from "./searcher";

class Main extends React.Component {
  render() {
    return (
      <div>
        <ButtonAppBar />
        <ImageSet />
      </div>
    );
  }
}

export default Main;
