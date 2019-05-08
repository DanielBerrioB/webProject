import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

//Styles
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
});

//This represents the list with the comments
class PinnedSubheaderList extends React.Component {
  render() {
    const { classes } = this.props;
    var cont = 0;
    return (
      <List className={classes.root} subheader={<li />}>
        {[0].map(sectionId => (
          <li key={`section-${sectionId}`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>{`Comentarios`}</ListSubheader>
              {this.props.array.reverse().map(item => (
                <ListItem key={cont++}>
                  <ListItemText primary={`${item.comment}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    );
  }
}

PinnedSubheaderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PinnedSubheaderList);
