import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

// redux-form-material-ui
import { Select, TextField } from "redux-form-material-ui";

import { createPost, editPost } from "../actions/posts";

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  }
});

class ContentPostForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      categories,
      createPost,
      editPost,
      history,
      match
    } = this.props;

    const isEdit = match.url.indexOf("edit") !== -1;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="subheading" gutterBottom align="center">
                    {!isEdit ? "Create a new Post." : "Edit Post"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <form
                    onSubmit={handleSubmit(data => {
                      const {
                        title,
                        body,
                        category = categories[0].name,
                        author
                      } = data;
                      data = { title, body, category, author };
                      if (isEdit) {
                        editPost(match.params.id, data);
                      } else {
                        createPost(data);
                      }
                      history.goBack();
                    })}
                  >
                    <Grid container spacing={24}>
                      <Grid item xs={6}>
                        <Field
                          name="title"
                          label="Title"
                          component={TextField}
                          placeholder="Give me a cool title!"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="author"
                          label="Author"
                          component={TextField}
                          placeholder="Cool Guy Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="category"
                          component={Select}
                          fullWidth
                          placeholder="Select a plan"
                        >
                          {categories.map((category, index) => (
                            <MenuItem key={index} value={category.name}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="body"
                          label="Body"
                          component={TextField}
                          placeholder="Cool story brah!"
                          multiline
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="button" onClick={() => history.goBack()}>
                          Back
                        </Button>
                        <Button type="submit" disabled={pristine || submitting}>
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

export default reduxForm({
  form: "post"
})(
  withRouter(
    connect(
      mapStateToProps,
      { createPost, editPost }
    )(withStyles(styles)(ContentPostForm))
  )
);
