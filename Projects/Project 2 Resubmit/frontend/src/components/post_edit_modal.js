import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import { TooltipEdit } from "mdi-material-ui";

// actions
import { putEditPost } from "../actions";

// styles
import styles from "../styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

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

class PostEditModal extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
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

  renderTextFieldMultiline = ({
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

  renderSelectField = ({
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

  render() {
    const {
      classes,
      categories,
      pristine,
      submitting,
      reset,
      handleSubmit,
      match,
      putEditPost
    } = this.props;

    console.log(match)

    return (
      <div>
        <IconButton onClick={this.handleOpen} className={classes.button}>
          <TooltipEdit className={classes.spacing} />
        </IconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <form
              onSubmit={handleSubmit(pdata => {
                const {
                  title,
                  author,
                  category = categories[0].name,
                  body
                } = pdata;
                pdata = { title, body, author, category };
                putEditPost(match.params.post_id, pdata);
                this.handleClose;
              })}
            >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Field
                    name="title"
                    component={this.renderTextField}
                    label="Title"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="author"
                    component={this.renderTextField}
                    label="Author"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    name="category"
                    component={this.renderSelectField}
                    label="Category"
                    categories={categories}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="body"
                    component={this.renderTextFieldMultiline}
                    label="Body"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button type="button" onClick={this.handleClose}>
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
          </div>
        </Modal>
      </div>
    );
  }
}

PostEditModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// https://stackoverflow.com/questions/38881324/redux-form-initialvalues-not-updating-with-state
export default reduxForm({
  form: "PostEditModal",
  validate,
  enableReinitialize: true
})(
  connect(
    undefined,
    { putEditPost }
  )(withStyles(styles, { withTheme: true })(PostEditModal))
);
