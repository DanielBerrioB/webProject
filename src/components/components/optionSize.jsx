import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

//This class represents the radio buttons that allow to select a size from the clothe
class RadioButtons extends React.Component {
  state = {
    selectedValue: "XS",
    isSelected: false
  };
  //Catch the selectedValue from the size
  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.handleChange(event.target.value, this.state.selectedValue);
  };

  render() {
    var element = this.props.talla;
    return (
      <div>
        {element.map(size => (
          <FormControl component="fieldset">
            <FormLabel component="legend">{size}</FormLabel>
            <Radio
              checked={this.state.selectedValue === size}
              onChange={this.handleChange}
              color="default"
              value={size}
              name={size}
              aria-label="A"
            >
              <FormControlLabel value="top" label="Top" labelPlacement="top" />
            </Radio>
          </FormControl>
        ))}
      </div>
    );
  }
}
export default RadioButtons;
