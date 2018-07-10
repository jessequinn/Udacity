import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// redux-form-material-ui
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { createPost } from "../actions";

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

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["au", "ti", "bo", "cat"];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

class PostModal extends React.Component {
  state = {

    cat: ""
  };

  handleChange = event => {
    this.setState({ cat: event.target.value });
  };

  postCreation = data => {
    this.props.createPost(data);
  };

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      id="required"
      label={label}
      className={this.props.classes.textField}
      helperText={touched && error}
      margin="normal"
      {...input}
      {...custom}
    />
  );

  render() {
    const { classes, modalClose, modalOpen, categories } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <form>
            <Field name="ti" component={this.renderTextField} label="Title" />
            <Field name="au" component={this.renderTextField} label="Author" />
          </form>
        </div>
      </Modal>
    );
  }
}

PostModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  categories: state.categories
});

// const SimpleModalWrapped = withStyles(styles)(Main);
export default withRouter(
  connect(
    mapStateToProps,
    { createPost }
  )(
    reduxForm({
      form: "PostModal", // a unique identifier for this form
      validate
    })(withStyles(styles)(PostModal))
  )
);
