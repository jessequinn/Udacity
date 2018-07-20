import React, { Component } from "react";
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
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// components
import SideBar from "./side_bar.js";

// actions
import { postCreatePost, getCategories } from "../actions";

import styles from "../styles";

// used the following example https://medium.com/@benawad/redux-form-and-material-ui-example-f5073086cf9d for form shape
// https://material-ui.com/demos/text-fields/ for textfield examples
// https://material-ui.com/demos/selects/ for select example
// https://github.com/erikras/redux-form-material-ui/issues/208 example use of Boolean operation
// https://stackoverflow.com/questions/37539601/redux-form-handlesubmit-how-to-access-store-state

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

class ContentPostForm extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
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

  componentDidMount() {
    const { getCategories } = this.props;

    getCategories();
  }

  render() {
    const {
      classes,
      theme,
      categories,
      pristine,
      submitting,
      reset,
      history,
      handleSubmit,
      postCreatePost
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Readable App - Jesse Quinn
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <SideBar {...this.props} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
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
        </main>
      </div>
    );
  }
}

ContentPostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = { postCreatePost, getCategories };

export default reduxForm({
  form: "NewPostValidation",
  validate
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(ContentPostForm))
);
