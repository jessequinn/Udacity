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
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Grid from "@material-ui/core/Grid";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";

// helper contains formatting tools
import { formatDate } from "../utils/helper";

// call actions
import { upvotePost, downvotePost } from "../actions/posts";
import { upvoteComment, downvoteComment } from "../actions/comments";

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
    width: 15,
    height: 15
  },
  leftBorderHighlight: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    paddingLeft: 0,
    marginLeft: 0
  }
});

class ContentPostDetail extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const {
      id,
      title,
      body,
      author,
      timestamp,
      voteScore,
      category,
      onUpVotePost,
      onDownVotePost,
      onUpvoteComment,
      onDownvoteComment,
      classes,
      comments = []
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <Button
                        size="small"
                        variant="outlined"
                        component={Link}
                        to="/posts/new"
                      >
                        New Post
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={24} key={id}>
            <Grid item xs={12}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary">
                    {formatDate(timestamp)}
                    <Button disabled>
                      <Fingerprint /> {category}
                    </Button>
                  </Typography>
                  <Typography variant="headline" component="h2">
                    {title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {author}
                  </Typography>
                  <Typography component="p">{body}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    onClick={() => {
                      onUpVotePost(id);
                    }}
                    className={classes.button}
                  >
                    <ThumbUp className={classes.spacing} />
                  </IconButton>
                  <Typography color="textSecondary">{voteScore}</Typography>
                  <IconButton
                    onClick={() => {
                      onDownVotePost(id);
                    }}
                    className={classes.button}
                  >
                    <ThumbDown className={classes.spacing} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>{" "}
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
                        to="/posts/new"
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
          </Grid>
          {_.map(comments, comment => {
            return (
              <Grid container spacing={24} key={comment.id}>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                      >
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
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(
  connect(
    undefined,
    {
      onUpVotePost: upvotePost,
      onDownVotePost: downvotePost,
      onUpvoteComment: upvoteComment,
      onDownvoteComment: downvoteComment
    }
  )(withStyles(styles)(ContentPostDetail))
);
