import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  }
});

class NoMatch extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="subheading" gutterBottom align="center">
                (404) Post does not exist!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NoMatch);
