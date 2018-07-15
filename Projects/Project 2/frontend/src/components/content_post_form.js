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

// form validator constants (https://redux-form.com/6.6.2/examples/fieldlevelvalidation/)
// not sure if they are truly working!
const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const maxLength15 = maxLength(15);
const maxLength30 = maxLength(30);
const minValue18 = minValue(18);

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
      reset,
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
                        history.goBack();
                      } else {
                        createPost(data);
                        history.push('/');
                      }
                    })}
                  >
                    <Grid container spacing={24}>
                      <Grid item xs={6}>
                        <Field
                          name="title"
                          label="Title"
                          validate={[required, maxLength30]}
                          component={TextField}
                          placeholder="Give me a cool title no more than 30 characters!"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="author"
                          label="Author"
                          validate={[required, maxLength15]}
                          component={TextField}
                          placeholder="Cool Guy Name"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Field
                          name="category"
                          label="Category"
                          validate={[required]}
                          component={Select}
                          fullWidth
                          placeholder="Select a category"
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
                          validate={[required, minValue18]}
                          component={TextField}
                          placeholder="Cool story brah (minimum of 18 chacters bRAAh)!"
                          multiline
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button type="button" onClick={() => history.goBack()}>
                          Back
                        </Button>
                        <Button type="submit" disabled={pristine || submitting}>
                          Submit
                        </Button>
                      </Grid>
                      <Grid item xs={8} align="right">
                        <Button
                          type="button"
                          disabled={pristine || submitting}
                          onClick={reset}
                        >
                          Clear Values
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
  form: "PostValidation" // a unique identifier for this form
})(
  withRouter(
    connect(
      mapStateToProps,
      { createPost, editPost }
    )(withStyles(styles)(ContentPostForm))
  )
);
