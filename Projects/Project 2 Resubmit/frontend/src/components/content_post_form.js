import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Field, reduxForm } from "redux-form";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styles from "../styles";

import { postCreatePost } from "../actions";

// used the following example https://medium.com/@benawad/redux-form-and-material-ui-example-f5073086cf9d for form shape
// https://material-ui.com/demos/text-fields/ for textfield examples
// https://material-ui.com/demos/selects/ for select example
// https://github.com/erikras/redux-form-material-ui/issues/208 example use of Boolean operation
const validate = values => {
  const errors = {};
  const requiredFields = ["title", "author", "body", "category"];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    error={Boolean(touched && error)}
    label={label}
    id="margin-none"
    helperText={touched && error ? "Required" : null}
    fullWidth
    {...input}
    {...custom}
  />
);

const renderTextFieldMultiline = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    error={Boolean(touched && error)}
    helperText={touched && error ? "Required" : null}
    label={label}
    id="margin-none"
    fullWidth
    multiline
    {...input}
    {...custom}
  />
);

const renderSelectField = ({
  categories,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl>
    <InputLabel
      htmlFor={`${label}-native-simple`}
      error={Boolean(touched && error)}
    >
      {label}
    </InputLabel>
    <Select native children={children} {...input} {...custom}>
      <option value="" />
      {categories.map(category => (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      ))}
    </Select>
  </FormControl>
);

// https://stackoverflow.com/questions/37539601/redux-form-handlesubmit-how-to-access-store-state

const ContentPostForm = ({
  classes,
  categories,
  pristine,
  submitting,
  reset,
  history,
  handleSubmit,
  postCreatePost
}) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="subheading" gutterBottom align="center">
                  Create a new Post.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <form
                  onSubmit={handleSubmit(pdata => {
                    const {
                      title,
                      author,
                      category = categories[0].name,
                      body
                    } = pdata;
                    pdata = { title, body, author, category };
                    postCreatePost(pdata);
                    history.push("/");
                  })}
                >
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <Field
                        name="title"
                        component={renderTextField}
                        label="Title"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        name="author"
                        component={renderTextField}
                        label="Author"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        name="category"
                        component={renderSelectField}
                        label="Category"
                        categories={categories}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="body"
                        component={renderTextFieldMultiline}
                        label="Body"
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

const mapDispatchToProps = { postCreatePost };

export default reduxForm({
  form: "NewPostValidation",
  validate
})(
  withRouter(
    connect(
      undefined,
      mapDispatchToProps
    )(withStyles(styles, { withTheme: true })(ContentPostForm))
  )
);
