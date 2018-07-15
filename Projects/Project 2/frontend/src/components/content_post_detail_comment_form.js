import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// material-ui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// redux-form-material-ui
import { TextField } from "redux-form-material-ui";

// call actions
import { createComment, editComment } from "../actions/comments";

// form validator constants (https://redux-form.com/6.6.2/examples/fieldlevelvalidation/)
// not sure if they are truly working!
const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const maxLength15 = maxLength(15);
const minValue18 = minValue(18);

const ContentPostDetailCommentForm = props => {
  const {
    id,
    postId,
    hideForm,
    handleSubmit,
    pristine,
    submitting,
    createComment,
    editComment,
    reset
  } = props;

  return (
    <form
      onSubmit={handleSubmit(data => {
        const { author, body } = data;
        data = { author, body };
        if (id) {
          editComment(id, data);
        } else {
          createComment(postId, data);
        }
        hideForm();
      })}
    >
      <Grid container spacing={24}>
        <Grid item xs={3} align="left">
          <Field
            name="author"
            label="Author"
            validate={[required, maxLength15]}
            component={TextField}
            placeholder="Cool Guy Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} align="left">
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
          <Button type="button" onClick={hideForm}>
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
  );
};

export default reduxForm({
  form: "CommentValidation", // a unique identifier for this for
  enableReinitialize: true
})(
  connect(
    undefined,
    { createComment, editComment }
  )(ContentPostDetailCommentForm)
);
