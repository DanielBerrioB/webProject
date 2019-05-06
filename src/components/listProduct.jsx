import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 1900
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

class ListProduct extends React.Component {
  state = {
    dense: false,
    secondary: false
  };

  transformData = array => {
    var result = "";
    array.map(value => (result += `${value.size}-${value.name} \n`));
    return result;
  };

  render() {
    const { classes } = this.props;
    const { dense } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={10} md={8}>
            <Typography variant="h6" className={classes.title}>
              Lista
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {this.props.arrayProduct.map(value => (
                  <ListItem>
                    <ListItemText
                      key={value.total}
                      primary={`Usuario: ${value.email} \n Total: ${
                        value.total
                      }`}
                      secondary={this.transformData(value.shop)}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ListProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListProduct);
