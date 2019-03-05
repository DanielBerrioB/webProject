import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({
  radio: {
    '&$checked': {
      color: '#4B8DF8'
    }
  },
  checked: {}
})


var data = JSON.parse(localStorage.getItem("arrayElement"));

class RadioButtons extends React.Component {
  state = {
    selectedValue: 'XS',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
    this.props.handleChange();
  };

  render() {
    const { classes } = this.props;
    var element = this.props.talla;

    return (
      <div>
        {element.map(size => (
          <FormControl component="fieldset">
          <FormLabel component="legend">{size}</FormLabel>
          <Radio

            checked={this.state.selectedValue === size}
            onChange={this.handleChange}
            value={size}
            name={size}
            aria-label="A">

            <FormControlLabel
              value="top"
              control={<Radio color="red" />}
              label="Top"
              labelPlacement="top"
            />
          </Radio>
          </FormControl>
        ))}
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (RadioButtons);