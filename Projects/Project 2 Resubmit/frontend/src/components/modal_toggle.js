import React, { Component } from "react";
import PropTypes from "prop-types";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import { TooltipEdit } from "mdi-material-ui";

import styles from "../styles";

class ModalToggle extends Component {
  state = {
    visible: false
  };

  toggleModal = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  };

  render() {
    const { classes } = this.props;
    const Modal = this.props.modal;

    return (
      <div>
        <IconButton onClick={this.toggleModal} className={classes.button}>
          <TooltipEdit className={classes.spacing} />
        </IconButton>
        <Modal
          {...this.props}
          visible={this.state.visible}
          toggleVisibility={this.toggleModal}
        />
      </div>
    );
  }
}

ModalToggle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ModalToggle);
