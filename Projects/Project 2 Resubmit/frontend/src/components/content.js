import _ from "lodash";

import React from "react";
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
import Badge from "@material-ui/core/Badge";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

// https://github.com/TeamWertarbyte/mdi-material-ui
// https://materialdesignicons.com
import {
  CommentRemove,
  ThumbDown,
  ThumbUp,
  TooltipEdit
} from "mdi-material-ui";

import styles from "../styles";
import { formatDate } from "../utils";

// call actions
import { postUpVotePost, postDownVotePost } from "../actions";

const Content = props => {
  const { classes, posts, onPostUpVotePost, onPostDownVotePost } = props;
  // console.log(posts);

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        {_.map(posts, post => {
          return (
            <Grid container spacing={24} key={post.id}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                      {formatDate(post.timestamp)}
                      <Button disabled>
                        <Fingerprint /> {post.category}
                      </Button>
                    </Typography>
                    <Button
                      component={Link}
                      to={`/${post.category}/${post.id}`}
                      className={classes.link}
                    >
                      <Typography variant="headline" component="h2">
                        {post.title}
                      </Typography>
                    </Button>
                    <Typography className={classes.pos} color="textSecondary">
                      {post.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      className={classes.button}
                      onClick={() => {
                        onPostUpVotePost(post.id);
                      }}
                    >
                      <ThumbUp className={classes.spacing} />
                    </IconButton>
                    <Typography color="textSecondary">
                      {post.voteScore}
                    </Typography>
                    <IconButton
                      className={classes.button}
                      onClick={() => {
                        onPostDownVotePost(post.id);
                      }}
                    >
                      <ThumbDown className={classes.spacing} />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to={`/${post.category}/${post.id}/edit`}
                      className={classes.button}
                    >
                      <TooltipEdit className={classes.spacing} />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to={"/"}
                      className={classes.button}
                    >
                      <CommentRemove className={classes.spacing} />
                    </IconButton>
                    <Badge
                      color="primary"
                      badgeContent={post.commentCount}
                      className={classes.margin}
                    >
                      <Typography className={classes.padding}>
                        Comments
                      </Typography>
                    </Badge>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      onPostUpVotePost: postUpVotePost,
      onPostDownVotePost: postDownVotePost
    }
  )(withStyles(styles, { withTheme: true })(Content))
);
