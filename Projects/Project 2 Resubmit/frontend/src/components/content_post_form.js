import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// material-ui
import MenuItem from "@material-ui/core/MenuItem";

// redux-form-material-ui
import { Select, TextField } from "redux-form-material-ui";

import styles from "../styles";

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

const ContentPostForm = ({
  classes,
  categories,
  pristine,
  submitting,
  reset,
  history,
  match
}) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="subheading" gutterBottom align="center">
                  "Create a new Post."
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <form>
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
                      <Typography
                        variant="subheading"
                        gutterBottom
                        align="center"
                      >
                        Category
                      </Typography>
                      {/* Select Field not working correctly. I have submitted a bug report to respective creator */}
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
};

ContentPostForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default reduxForm({
  form: "NewPostValidation"
})(withRouter(withStyles(styles, { withTheme: true })(ContentPostForm)));
