import _ from "lodash";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// material-ui
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import {
  CommentRemove,
  ThumbDown,
  ThumbUp,
  TooltipEdit
} from "mdi-material-ui";

// helper contains formatting tools
import { formatDate } from "../utils/helper";

// call actions
import { upvoteComment, downvoteComment } from "../actions/comments";
import { deleteComment } from "../actions/comments";
import ContentPostDetailCommentForm from "./content_post_detail_comment_form";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  spacing: {
    width: 18,
    height: 18
  },
  leftBorderHighlight: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    paddingLeft: 0,
    marginLeft: 0
  },
  button: {
    margin: theme.spacing.unit
  }
});

class ContentPostDetailComments extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      displayForm: false,
      commentToEdit: {}
    };
    this.showCommentForm = this.showCommentForm.bind(this);
    this.hideCommentForm = this.hideCommentForm.bind(this);
  }

  filterCommentById(comments, id) {
    return comments.filter(comment => comment.id === id);
  }

  showCommentForm(comment) {
    this.setState({ displayForm: true, commentToEdit: comment });
  }

  hideCommentForm() {
    this.setState({ displayForm: false, commentToEdit: {} });
  }

  render() {
    const {
      postId,
      onUpvoteComment,
      onDownvoteComment,
      onDeleteComment,
      classes,
      comments = []
    } = this.props;

    const { displayForm, commentToEdit } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Grid container spacing={24}>
                <Grid item xs={10}>
                  <Button
                    size="small"
                    variant="outlined"
                    component={Link}
                    to="/"
                    onClick={event => {
                      event.preventDefault();
                      this.showCommentForm();
                    }}
                  >
                    New Comment
                  </Button>
                </Grid>
                <Grid item xs={2} className={classes.leftBorderHighlight}>
                  <Typography variant="caption">
                    {`Numer of Comments: ${_.size(comments)}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {displayForm && (
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <ContentPostDetailCommentForm
                  initialValues={commentToEdit}
                  hideForm={this.hideCommentForm}
                  id={commentToEdit && commentToEdit.id}
                  postId={postId}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
        {_.map(comments, comment => {
          return (
            <Grid item xs={12} key={comment.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    {formatDate(comment.timestamp)}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {comment.author}
                  </Typography>
                  <Typography component="p">{comment.body}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => {
                      onUpvoteComment(comment.id);
                    }}
                    className={classes.button}
                  >
                    <ThumbUp className={classes.spacing} />
                  </IconButton>
                  <Typography color="textSecondary">
                    {comment.voteScore}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      onDownvoteComment(comment.id);
                    }}
                    className={classes.button}
                  >
                    <ThumbDown className={classes.spacing} />
                  </IconButton>
                  <IconButton
                    className={classes.button}
                    onClick={event => {
                      event.preventDefault();
                      this.showCommentForm(comment);
                    }}
                  >
                    <TooltipEdit className={classes.spacing} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      onDeleteComment(comment.id);
                    }}
                    className={classes.button}
                  >
                    <CommentRemove className={classes.spacing} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default withRouter(
  connect(
    undefined,
    {
      onUpvoteComment: upvoteComment,
      onDownvoteComment: downvoteComment,
      onDeleteComment: deleteComment
    }
  )(withStyles(styles)(ContentPostDetailComments))
);
