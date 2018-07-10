import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
  }
});

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

  render() {
    const { classes, modalClose, modalOpen, categories } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalOpen}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="author"
              label="Author"
              className={classes.textField}
              margin="normal"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={this.state.cat}
                onChange={this.handleChange}
                inputProps={{
                  name: "cat",
                  id: "category"
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {_.map(categories, category => {
                  return (
                    <MenuItem value={category.name} key={category.name}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField id="title" label="Title" fullWidth margin="normal" />
            <TextField
              id="body"
              label="Content"
              multiline
              rowsMax="8"
              fullWidth
              margin="normal"
            />
          </form>
          <Button onClick={this.postCreation} className={classes.button}>
            Post
          </Button>
          <Button onClick={modalClose} className={classes.button}>
            Close
          </Button>
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
  )(withStyles(styles)(PostModal))
);
