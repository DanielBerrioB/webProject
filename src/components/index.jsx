import React from "react";
import ImageSet from "./imageSet";
import InfoBar from "./infoBar";
import Moda from "./modalWindow";
import Data from "../auxData";

class Main extends React.Component {
  constructor(...props) {
    super(...props)
    localStorage.setItem("arrayElement", JSON.stringify(Data));
  }
  //if(JSON.parse(localStorage.getItem("arrayElement"))){}
  
  componentDidMount(){
    if(JSON.parse(localStorage.getItem("arrayElement"))){
      localStorage.setItem("arrayElement", JSON.stringify(Data));
    }
  }
  
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
