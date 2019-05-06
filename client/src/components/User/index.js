import React, { Component } from "react";
import ProfileHeader from "../../hoc/profile_header";
import { connect } from "react-redux";

import AffiliationCard from "../User/Card/affiliation";
import MiniStatsCard from "../User/Card/mini_stats";
import IntroductionCard from "../User/Card/introduction";
import ResearchaAreaCard from "../User/Card/research_area";
import FollowingCard from "../User/Card/following";
import FollowerCard from "../User/Card/follower";

import { Hidden, Grid } from "@material-ui/core";

import {
  getProfileDetail,
  clearProfileDetail,
  getFollowing,
  getFollower,
  follow,
  addFollower,
  unfollow,
  removeFollower
} from "../../actions/user_actions";

class ProfileOverview extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    var following = [];
    var followingId = [];
    var followerId = [];

    this.props.dispatch(getProfileDetail(id)).then(response => {
      following = response.payload.following;
      followerId = response.payload.follower;
      for (var key in following) {
        followingId.push(following[key]._id);
      }
      this.props.dispatch(getFollowing(followingId)).then(response => {});

      this.props.dispatch(getFollower(followerId)).then(response => {});
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileDetail());
  }

  followUser = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(follow(id)).then(response => {
        this.props.dispatch(addFollower(id)).then(response => {
          this.props
            .dispatch(getProfileDetail(this.props.user.userDetail._id))
            .then(response => {
              var following = [];
              var followingId = [];
              var followerId = [];
              following = response.payload.following;
              followerId = response.payload.follower;
              for (var key in following) {
                followingId.push(following[key]._id);
              }
              this.props.dispatch(getFollowing(followingId));
              this.props.dispatch(getFollower(followerId)).then(response => {});
            });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  unfollowUser = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unfollow(id)).then(response => {
        this.props.dispatch(removeFollower(id)).then(response => {
          this.props
            .dispatch(getProfileDetail(this.props.user.userDetail._id))
            .then(response => {
              var following = [];
              var followingId = [];
              var followerId = [];
              following = response.payload.following;
              followerId = response.payload.follower;
              for (var key in following) {
                followingId.push(following[key]._id);
              }
              this.props.dispatch(getFollowing(followingId));
              this.props.dispatch(getFollower(followerId)).then(response => {});
            });
        });
      });
    } else {
      console.log("You need to login");
    }
  }

  render() {
    if (this.props.user.userDetail) {
      document.title = `${this.props.user.userDetail.name} ${
        this.props.user.userDetail.lastname
      } - FNS Researcher Profiles`;
    }
    return (
      <ProfileHeader {...this.props}>
        <Grid container spacing={24} style={{ margin: "8px" }}>
          <Hidden only="sm">
            <Grid item md={1} lg />
          </Hidden>
          <Grid item xs={12} lg={4} sm={6} md={5}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <IntroductionCard {...this.props} />
              </Grid>

              <Grid item xs={12}>
                <ResearchaAreaCard {...this.props} />
              </Grid>
              <Grid item xs={12}>
                <MiniStatsCard />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={3} sm={6} md={5}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <AffiliationCard {...this.props} />
              </Grid>
              <Grid item xs={12}>
                <FollowingCard
                  userData={this.props.user.userData}
                  userDetail={this.props.user.userDetail}
                  userFollowing={this.props.user.following}
                  runFollow={id => this.followUser(id)}
                  runUnfollow={id => this.unfollowUser(id)}
                />
              </Grid>
              <Grid item xs={12}>
                <FollowerCard
                  userData={this.props.user.userData}
                  userDetail={this.props.user.userDetail}
                  userFollower={this.props.user.follower}
                  runFollow={id => this.followUser(id)}
                  runUnfollow={id => this.unfollowUser(id)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Hidden only="sm">
            <Grid item xs md={1} lg />
          </Hidden>
        </Grid>
      </ProfileHeader>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetail: state.user
  };
};

export default connect(mapStateToProps)(ProfileOverview);
