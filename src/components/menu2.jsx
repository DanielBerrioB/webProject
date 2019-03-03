import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna"
];

const fontStyle = {
  color: "#ffff"
};

const ITEM_HEIGHT = 88;

class LongMenu2 extends React.Component {
  state = {
    anchorEl: null,
    selectedItem: "None"
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOption = event => {
    //With this line you can get the element of the menu
    this.setState({ selectedItem: event.target.innerText });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="Menu"
          aria-owns={open ? "long-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <p style={fontStyle}>Nuevo</p>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClick={this.handleClickOption}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 500
            }
          }}
        >
          {options.map(option => (
            <MenuItem key={option} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default LongMenu2;
