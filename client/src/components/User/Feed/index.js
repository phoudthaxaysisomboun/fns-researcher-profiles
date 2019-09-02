import React, { Component } from "react";
import { Fab, Grid, Hidden, CircularProgress, Paper } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

import { connect } from "react-redux";


import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import AddResearch from "../../../components/utils/Dialogs/add_research";

import compose from "recompose/compose";
import PropTypes from "prop-types";


import {
  getFeed,
  // clearFeed,
  addLike,
  removeLike,
  getSuggestionsInFeed
} from "../../../actions/research_actions";
import {
  like,
  unlike,
  // clearLike,
  follow,
  addFollower,
  unfollow,
  removeFollower,
  getFollower,
  getFollowing
} from "../../../actions/user_actions";

import SuggestionsCard from "../Feed/Card/suggestions";

import FeedCard from "../Feed/Card/post";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  fontWeight: "500"
};

const styles = theme => ({
  mainContainer: {
    [theme.breakpoints.up("xl")]: {
      marginLeft: 0
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: 60
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  },
})

class Feed extends Component {
  state = {
    openAddResearchDialog: false,
    loadingFollower: false
  };

  componentWillMount() {
    
  }

  componentDidMount() {
    this.props.dispatch(getFeed()).then(response => {
      this.props.dispatch(getSuggestionsInFeed());
    });
    document.title = "Feed - FNS Researcher Profiles";
  }

  componentWillUnmount() {
    // this.props.dispatch(clearFeed());
  }

  handleAddResearchClose = () => {
    this.setState({
      openAddResearchDialog: false
    });
  };

  handleAddResearchOpen = () => {
    this.setState({
      openAddResearchDialog: true
    });
  };

  comment = id => {
    this.props.history.push(`/research/${id}/comments`);
  };

  like = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(like(id)).then(() => {});
      this.props.dispatch(addLike(id)).then(() => {
        this.props.dispatch(getFeed());
      });
    } else {
      console.log("You need to login");
    }
  };

  unlike = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unlike(id)).then(() => {});
      this.props.dispatch(removeLike(id)).then(() => {
        this.props.dispatch(getFeed());
      });
    } else {
      console.log("You need to login");
    }
  };

  followUser = id => {
    if (this.props.user.userData.isAuth) {
      this.setState({
        followLoading: true
      });
      this.props.dispatch(follow(id)).then(() => {
        this.props.dispatch(addFollower(id)).then(() => {
          this.props.dispatch(getFeed()).then(response => {
            var following = [];
            var followingId = [];
            var followerId = [];
            following = response.payload.following;
            followerId = response.payload.follower;
            for (var key in following) {
              followingId.push(following[key]._id);
            }
            this.props.dispatch(getFollowing(followingId));
            this.props.dispatch(getFollower(followerId));

            this.setState({
              followLoading: false
            });

            // this.props.dispatch(getFollowingInLoadMore(followingId, 6, 0));

            // this.props
            //   .dispatch(getFollowerInLoadMore(followerId, 6, 0))
            //   .then(() => {
            //     this.setState({
            //       followLoading: false
            //     });
            //   });
          });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  unfollowUser = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unfollow(id)).then(() => {
        this.props.dispatch(removeFollower(id)).then(() => {
          this.props.dispatch(getFeed()).then(response => {
            var following = [];
            var followingId = [];
            var followerId = [];
            following = response.payload.following;
            followerId = response.payload.follower;
            for (var key in following) {
              followingId.push(following[key]._id);
            }
            this.props.dispatch(getFollowing(followingId));
            this.props.dispatch(getFollower(followerId));
            // this.props.dispatch(getFollowingInLoadMore(followingId, 6, 0));

            // this.props.dispatch(getFollowerInLoadMore(followerId, 6, 0));
          });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Grid container>
          <Grid item xs sm lg md />
          <Grid item xs={11} sm={11} lg={8} md={11}>
          {this.props.user && this.props.research.feed ?
            <Grid container spacing={24}>
              <Grid item xs={12} lg={7} sm={12} md={10}>
                <FeedCard
                  userResearch={
                    this.props.user && this.props.research.feed
                      ? this.props.research.feed
                      : null
                  }
                  userData={
                    this.props.user && this.props.user.userData
                      ? this.props.user.userData
                      : null
                  }
                  runLike={id => this.like(id)}
                  runUnLike={id => this.unlike(id)}
                  comment={id => this.comment(id)}
                />
              </Grid>
              <Hidden mdDown>
              <Grid item xs lg sm md className="right-section-feed">
                <SuggestionsCard
                  userData={this.props.user.userData}
                  userFollower={this.props.research.followSuggestions}
                  runFollow={id => this.followUser(id)}
                  runUnfollow={id => this.unfollowUser(id)}
                  runSeeAllFollower={id => this.seeAllFollower(id)}
                  loading={this.state.loadingFollower}
                />
              </Grid>
              </Hidden>
            </Grid>

            :

            <>
            
            <Grid container justify="center">
            <Grid item xs={12} align="center">
            <Paper
              style={{
                boxShadow: "none",
                border: "1px solid #d8d8d8",
                marginTop: "24px",
         
              }}
            >
            <CircularProgress style={{color: "#909090", margin: "20px"}} thickness={5}  size={30} variant="indeterminate"/>
            </Paper>
            </Grid>
            </Grid>
            </>}
          </Grid>
          <Grid item xs sm lg md />
        </Grid>

        <Fab size="large" variant="extended" color="primary" style={fabStyle}>
          <AddOutlined
            fontSize="large"
            style={{ marginRight: "8px" }}
            onClick={() => {
              this.handleAddResearchOpen();
            }}
          />
          ເພີ່ມ
        </Fab>

        <AddResearch
          open={this.state.openAddResearchDialog}
          close={() => this.handleAddResearchClose()}
          authorSuggestions={
            this.props && this.props.user && this.props.user.authorSuggestions
              ? this.props.user.authorSuggestions
              : []
          }
          user={
            this.props && this.props.user && this.props.user.userData
              ? this.props.user.userData
              : {}
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withRouter,
  withStyles(styles),
  // withWidth(),
  connect(
    mapStateToProps,
    null
  )
);

export default enhance(Feed);

// export default withRouter(connect(mapStateToProps)(Feed));
