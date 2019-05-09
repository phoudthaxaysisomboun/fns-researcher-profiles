import React, { Component } from "react";
import ProfileHeader from "../../hoc/profile_header";
import { connect } from "react-redux";

import AffiliationCard from "../User/Card/affiliation";
import MiniStatsCard from "../User/Card/mini_stats";
import IntroductionCard from "../User/Card/introduction";
import ResearchaAreaCard from "../User/Card/research_area";
import FollowingCard from "../User/Card/following";
import FollowerCard from "../User/Card/follower";
import LoadMoreFollowerCard from "./Card/load_more_follower";
import LoadMoreFollowingCard from "../User/Card/load_more_following";

import {
  Hidden,
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent
} from "@material-ui/core";

import {
  getProfileDetail,
  clearProfileDetail,
  getFollowing,
  getFollower,
  follow,
  addFollower,
  unfollow,
  removeFollower,
  clearFollowing,
  clearFollower,
  getFollowerInLoadMore,
  getFollowingInLoadMore
} from "../../actions/user_actions";

class ProfileOverview extends Component {
  state = {
    openFollowerDialog: false,
    openFollowingDialog: false,
    fullWidth: true,
    maxWidth: "sm",
    followerLimit: 6,
    followerSkip: 0,
    followingLimit: 6,
    followingSkip: 0
  };

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
      this.props.dispatch(getFollowing(followingId))

      this.props.dispatch(getFollower(followerId))

      this.props
        .dispatch(
          getFollowingInLoadMore(
            followingId,
            this.state.followingLimit,
            this.state.followingSkip
          )
        )

      this.props
        .dispatch(
          getFollowerInLoadMore(
            followerId,
            this.state.followerLimit,
            this.state.followerSkip
          )
        )

    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileDetail());
    this.props.dispatch(clearFollower());
    this.props.dispatch(clearFollowing());
  }

  followUser = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(follow(id)).then(() => {
        this.props.dispatch(addFollower(id)).then(() => {
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
              this.props.dispatch(getFollower(followerId))
              this.props
                .dispatch(
                  getFollowingInLoadMore(
                    followingId,
                    6,
                    0
                  )
                )

              this.props
                .dispatch(
                  getFollowerInLoadMore(
                    followerId,
                    6,
                    0
                  )
                )
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
              this.props.dispatch(getFollower(followerId))
              this.props
                .dispatch(
                  getFollowingInLoadMore(
                    followingId,
                    6,
                    0
                  )
                )

              this.props
                .dispatch(
                  getFollowerInLoadMore(
                    followerId,
                    6,
                    0
                  )
                )
            });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  followUserInLoadMore = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(follow(id)).then(() => {
        this.props.dispatch(addFollower(id)).then(() => {
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
              this.props.dispatch(getFollower(followerId))
              this.props
                .dispatch(
                  getFollowingInLoadMore(
                    followingId,
                    6,
                    0
                  )
                )

              this.props
                .dispatch(
                  getFollowerInLoadMore(
                    followerId,
                    6,
                    0
                  )
                )
            });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  unfollowUserInLoadMore = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unfollow(id)).then(() => {
        this.props.dispatch(removeFollower(id)).then(() => {
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
              this.props
                .dispatch(
                  getFollowingInLoadMore(
                    followingId,
                    6,
                    0
                  )
                )

              this.props
                .dispatch(
                  getFollowerInLoadMore(
                    followerId,
                    6,
                    0
                  )
                )
            });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  loadMoreFollowerCards = () => {
    let followerSkip = this.state.followerSkip + this.state.followerLimit;
    console.log(followerSkip);

    const following = this.props.user.userDetail.following;
    let followerId = this.props.user.userDetail.follower;
    let followingId = [];
    for (var key in following) {
      followingId.push(following[key]._id);
    }

    this.props
      .dispatch(
        getFollowerInLoadMore(
          followerId,
          this.state.followerLimit,
          followerSkip,
          this.props.user.followerInLoadMore
        )
      )
      .then(() => {
        this.setState({
          followerSkip
        });
      });
  };

  loadMoreFollowingCards = () => {

    let followingSkip = this.state.followingSkip + this.state.followingLimit;

    const following = this.props.user.userDetail.following;
    let followingId = [];
    for (var key in following) {
      followingId.push(following[key]._id);
    }

    this.props
      .dispatch(
        getFollowingInLoadMore(
          followingId,
          this.state.followingLimit,
          followingSkip,
          this.props.user.followingInLoadMore
        )
      )
      .then(() => {
        this.setState({
          followingSkip
        });
      });
  };

  seeAllFollower = () => {
    this.setState({
      openFollowerDialog: true
    });
  };

  seeAllFollowing = () => {
    this.setState({
      openFollowingDialog: true
    });
  };

  handleShowMoreFollowerClose = () => {
    this.setState({
      openFollowerDialog: false,
      followerSkip: 0,
      followerLimit: 6
    });
  };

  handleShowMoreFollowingClose = () => {
    this.setState({
      openFollowingDialog: false,
      followingSkip: 0,
      followingLimit: 6
    });
  };

  render() {
    if (this.props.user.userDetail) {
      document.title = `${this.props.user.userDetail.name} ${
        this.props.user.userDetail.lastname
      } - FNS Researcher Profiles`;
    }
    return (
      <ProfileHeader
        props={this.props}
        children={this.props.children}
        userData={this.props.user.userData}
        userDetail={this.props.user.userDetail}
        runFollow={id => this.followUser(id)}
        runUnfollow={id => this.unfollowUser(id)}
      >
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
                  runSeeAllFollowing={id => this.seeAllFollowing(id)}
                />
              </Grid>
              <Grid item xs={12}>
                <FollowerCard
                  userData={this.props.user.userData}
                  userDetail={this.props.user.userDetail}
                  userFollower={this.props.user.follower}
                  runFollow={id => this.followUser(id)}
                  runUnfollow={id => this.unfollowUser(id)}
                  runSeeAllFollower={id => this.seeAllFollower(id)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Hidden only="sm">
            <Grid item xs md={1} lg />
          </Hidden>
        </Grid>

        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.openFollowerDialog}
          onClose={id => this.handleShowMoreFollowerClose(id)}
          scroll="paper"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle>
            ຜູ້ຕິດຕາມ{" "}
            {this.props.user.userDetail && this.props.user.userDetail.follower
              ? `(${this.props.user.userDetail.follower.length})`
              : null}
          </DialogTitle>
          <Divider />
          <DialogContent style={{ paddingTop: "24px" }}>
            <LoadMoreFollowerCard
              followerLimit={this.state.followerLimit}
              userData={this.props.user.userData}
              userDetail={this.props.user.userDetail}
              userFollower={this.props.user.followerInLoadMore}
              runFollow={id => this.followUserInLoadMore(id)}
              runUnfollow={id => this.unfollowUserInLoadMore(id)}
              loadMore={() => this.loadMoreFollowerCards()}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.openFollowingDialog}
          onClose={id => this.handleShowMoreFollowingClose(id)}
          scroll="paper"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle>
            ກໍາລັງຕິດຕາມ{" "}
            {this.props.user.userDetail && this.props.user.userDetail.following
              ? `(${this.props.user.userDetail.following.length})`
              : null}
          </DialogTitle>
          <Divider />
          <DialogContent style={{ paddingTop: "24px" }}>
            <LoadMoreFollowingCard
              followingLimit={this.state.followingLimit}
              userData={this.props.user.userData}
              userDetail={this.props.user.userDetail}
              userFollowing={this.props.user.followingInLoadMore}
              runFollow={id => this.followUserInLoadMore(id)}
              runUnfollow={id => this.unfollowUserInLoadMore(id)}
              loadMore={() => this.loadMoreFollowingCards()}
            />
          </DialogContent>
        </Dialog>
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
