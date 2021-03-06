import React, { Component } from "react";
import ProfileHeader from "../../hoc/profile_header";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
// import classNames from "classnames";
import PropTypes from "prop-types";

import AffiliationCard from "../User/Card/affiliation";
// import MiniStatsCard from "../User/Card/mini_stats";
import IntroductionCard from "../User/Card/introduction";
import ResearchaAreaCard from "../User/Card/research_area";
import FollowingCard from "../User/Card/following";
import FollowerCard from "../User/Card/follower";
import LoadMoreFollowerCard from "./Card/load_more_follower";
import LoadMoreFollowingCard from "../User/Card/load_more_following";
import ResearchCard from "../User/Card/research";
import ShareDialog from "../User/Dialog/share";
import IntorductionDialog from "../User/Dialog/add_introduction";
import UpdateResearchArea from "../User/Dialog/update_research_area";
import UpdateNameDialog from "../User/Dialog/edit_name";
import UpdateDegreeDialog from "../User/Dialog/update_degree";
import UpdateAffiliationDialog from "../User/Dialog/update_affiliation";

import withWidth from '@material-ui/core/withWidth';
import compose from 'recompose/compose';


import {
  // Hidden,
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  IconButton,
  Typography,
  // Button
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
  getFollowingInLoadMore,
  auth
} from "../../actions/user_actions";

import {
  getResearchForCard,
  clearResearchCard
} from "../../actions/research_actions";

import { CloseOutlined } from "@material-ui/icons";
import { LOCALHOST } from "../utils/misc";
import AddResearch from "../utils/Dialogs/add_research";
import ProfileImageEditor from "../utils/Dialogs/profile_image_editor";

let shareUrl;

const styles = theme => ({
  tableWrapper: {
    overflowX: "auto"
  },
  mainContainer: {
    [theme.breakpoints.up("xl")]: {
      // marginLeft: -12,
      // marginRight: 20,
      marginLeft: 0
    },
    [theme.breakpoints.down("lg")]: {
      // marginLeft: -12,
      // marginRight: 20,
      marginLeft: 60
    },
    [theme.breakpoints.down("md")]: {
      // marginLeft: -12,
      // marginRight: 20,
      marginLeft: 0
    },
  }
});
class ProfileOverview extends Component {
  state = {
    loadingMoreFollower: false,
    loadingMoreFollowing: false,
    followLoading: false,
    unfollowLoading: false,
    openFollowerDialog: false,
    openFollowingDialog: false,
    fullWidth: true,
    maxWidth: "sm",
    followerLimit: 6,
    followerSkip: 0,
    followingLimit: 6,
    followingSkip: 0,
    loadingResearchCard: true,
    loadingFollower: true,
    loadingFollowing: true,
    tabNumber: 0,
    openShareDialog: false,
    openIntroductionDialog: false,
    openUpdateResearchAreaDialog: false,
    openAddResearchDialog: false,

    openEditnameDialog: false,
    openUpdateDegreeDialog: false,
    openUpdateAffiliationDialog: false,

    openProfileImageEditor: false

  };

  handleProfileImageEditorClose = () => {
    this.setState({
      openProfileImageEditor: false
    });
  };

  handleProfileImageEditorOpen = () => {
    this.setState({
      openProfileImageEditor: true
    });
  };


  handleUpdateAffiliationClose = () => {
    this.setState({
      openUpdateAffiliationDialog: false
    });
  };

  handleUpdateAffiliationOpen = () => {
    this.setState({
      openUpdateAffiliationDialog: true
    });
  };

  handleUpdateDegreeClose = () => {
    this.setState({
      openUpdateDegreeDialog: false
    });
  };

  handleUpdateDegreeOpen = () => {
    this.setState({
      openUpdateDegreeDialog: true
    });
  };


handleEditnameDialogClose = () => {
    this.setState({
      openEditnameDialog: false
    });
  };

  handleEditNameDialogOpen = () => {
    this.setState({
      openEditnameDialog: true
    });
  };

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

  refreshProfileImage = () => {
    const id = this.props.match.params.id;

    this.props.dispatch(getProfileDetail(id))
    this.props.dispatch(auth())
    
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    var following = [];
    var followingId = [];
    var followerId = [];
    var researchId = [];

    this.props.dispatch(getProfileDetail(id)).then(response => {
      if (response.payload) {
        following =
          response.payload && response.payload.following
            ? response.payload.following
            : [];
        followerId =
          response.payload && response.payload.follower
            ? response.payload.follower
            : [];
        researchId =
          response.payload && response.payload.research
            ? response.payload.research
            : [];
        for (var key in following) {
          followingId.push(following[key]._id);
        }
        shareUrl = `${LOCALHOST}/profile/${response.payload._id}`;

        if (following.length > 0) {
          this.props.dispatch(getFollowing(followingId)).then(() => {
            this.setState({
              loadingFollowing: false
            });
          });

          this.props.dispatch(
            getFollowingInLoadMore(
              followingId,
              this.state.followingLimit,
              this.state.followingSkip
            )
          );
        } else {
          this.setState({
            loadingFollowing: false
          });
        }

        if (response.payload.follower.length > 0) {
          this.props.dispatch(getFollower(followerId)).then(() => {
            this.setState({
              loadingFollower: false
            });
          });

          this.props.dispatch(
            getFollowerInLoadMore(
              followerId,
              this.state.followerLimit,
              this.state.followerSkip
            )
          );
        } else {
          this.setState({
            loadingFollower: false
          });
        }

        if (response.payload.research.length > 0) {
          this.props.dispatch(getResearchForCard(researchId)).then(response => {
            this.setState({
              loadingResearchCard: false
            });
          });
        } else {
          this.setState({
            loadingResearchCard: false
          });
        }
      } else {
        // TO DO: Do something when there's no user
        this.props.history.push("/")
      }
    });
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    if (prevProps.newResearch !== this.props.newResearch) {
      
    this.props.dispatch(getProfileDetail(id))
    }

    if (prevProps.user.updatedDegree !== this.props.user.updatedDegree) {
      this.props.dispatch(getProfileDetail(id))
    }
    if (prevProps.user.updatedAffiliation !== this.props.user.updatedAffiliation) {
      this.props.dispatch(getProfileDetail(id))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileDetail());
    this.props.dispatch(clearFollower());
    this.props.dispatch(clearFollowing());
    this.props.dispatch(clearResearchCard());

    this.setState({
      loadingResearchCard: true,
      loadingFollower: true,
      loadingFollowing: true
    });
  }

  followUser = id => {
    if (this.props.user.userData.isAuth) {
      this.setState({
        followLoading: true
      });
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
              this.props.dispatch(getFollower(followerId));
              this.props.dispatch(getFollowingInLoadMore(followingId, 6, 0));

              this.props
                .dispatch(getFollowerInLoadMore(followerId, 6, 0))
                .then(() => {
                  this.setState({
                    followLoading: false
                  });
                });
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
              this.props.dispatch(getFollower(followerId));
              this.props.dispatch(getFollowingInLoadMore(followingId, 6, 0));

              this.props.dispatch(getFollowerInLoadMore(followerId, 6, 0));
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
              this.props.dispatch(getFollower(followerId));
              this.props.dispatch(getFollowingInLoadMore(followingId, 6, 0));

              this.props.dispatch(getFollowerInLoadMore(followerId, 6, 0));
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
              this.props.dispatch(getFollowingInLoadMore(followingId, 6, 0));

              this.props.dispatch(getFollowerInLoadMore(followerId, 6, 0));
            });
        });
      });
    } else {
      console.log("You need to login");
    }
  };

  loadMoreFollowerCards = () => {
    let followerSkip = this.state.followerSkip + this.state.followerLimit;

    const following = this.props.user.userDetail.following;
    let followerId = this.props.user.userDetail.follower;
    let followingId = [];
    for (var key in following) {
      followingId.push(following[key]._id);
    }

    this.setState({
      loadingMoreFollower: true
    });

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
          followerSkip,
          loadingMoreFollower: false
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

    this.setState({
      loadingMoreFollowing: true
    });

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
          followingSkip,
          loadingMoreFollowing: false
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

  handleShareDialogClose = () => {
    this.setState({
      openShareDialog: false
    });
  };

  handleShareDialogOpen = () => {
    this.setState({
      openShareDialog: true
    });
  };

  handleIntroductionDialogClose = () => {
    this.setState({
      openIntroductionDialog: false
    });
  };

  handleIntroductionDialogOpen = () => {
    this.setState({
      openIntroductionDialog: true
    });
  };

  handleUpdateResearchAreaDialogClose = () => {
    this.setState({
      openUpdateResearchAreaDialog: false
    });
  };

  handleUpdateResearchAreaDialogOpen = () => {
    this.setState({
      openUpdateResearchAreaDialog: true
    });
  };

  changeTab = tabNumber => {
    this.setState({
      tabNumber
    });
  };

  render() {
    const { fullScreen } = this.props;
    const { classes } = this.props;


    if (this.props.user.userDetail) {
      document.title = `${this.props.user.userDetail.name} ${
        this.props.user.userDetail.lastname
      } - FNS Researcher Profiles`;
    }
    return (
      <div className={classes.mainContainer}>
      <ProfileHeader
        props={this.props}
        children={this.props.children}
        userData={this.props.user.userData}
        userDetail={this.props.user.userDetail}
        runFollow={id => this.followUser(id)}
        runUnfollow={id => this.unfollowUser(id)}
        loading={this.state.followLoading}
        tab={this.state.tabNumber}
        changeTab={tabNumber => this.changeTab(tabNumber)}
        openShareDialog={() => {
          this.handleShareDialogOpen();
        }}
        openAddResearchDialog={() => {
          this.handleAddResearchOpen();
        }}
        openEditName = {()=>{
          this.handleEditNameDialogOpen()
        }}

        openUpdateDegree = {()=>{
          this.handleUpdateDegreeOpen()
        }}
        openProfileImageEditor = {()=>{
          this.handleProfileImageEditorOpen()

        }}
      >
        <Grid container style={{ paddingTop: "24px" }}>
          <Grid item xs sm lg md />
 
          <Grid item xs={11} sm={10} lg={8} md={11}>
            <Grid container spacing={24}>
              <Grid item xs={12} lg={7} sm={12} md={6}>
                <Grid container spacing={24}>
                  <IntroductionCard
                    props={this.props}
                    openEditDialog={() => this.handleIntroductionDialogOpen()}
                  />

                  <ResearchaAreaCard props={this.props} runOpenUpdateDialog={()=>{this.handleUpdateResearchAreaDialogOpen()}} />
                  {
                  //   <Grid item xs={12}>
                  //   <MiniStatsCard {...this.props} />
                  // </Grid>
                  }

                  <ResearchCard
                    userData={this.props.user.userData}
                    userDetail={this.props.user.userDetail}
                    userResearch={this.props.research.userResearch}
                    props={this.props}
                    loading={this.state.loadingResearchCard}
                    openAddResearchDialog={() => {
                      this.handleAddResearchOpen();
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} lg sm md>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <AffiliationCard props = {this.props} editAffiliation = {()=>this.handleUpdateAffiliationOpen()} />
                  </Grid>

                  <Grid item xs={12}>
                    <FollowerCard
                      userData={this.props.user.userData}
                      userDetail={this.props.user.userDetail}
                      userFollower={this.props.user.follower}
                      runFollow={id => this.followUser(id)}
                      runUnfollow={id => this.unfollowUser(id)}
                      runSeeAllFollower={id => this.seeAllFollower(id)}
                      loading={this.state.loadingFollower}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FollowingCard
                      userData={this.props.user.userData}
                      userDetail={this.props.user.userDetail}
                      userFollowing={this.props.user.following}
                      runFollow={id => this.followUser(id)}
                      runUnfollow={id => this.unfollowUser(id)}
                      runSeeAllFollowing={id => this.seeAllFollowing(id)}
                      loading={this.state.loadingFollowing}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs sm lg md />
        </Grid>

        {
          //   <Grid container spacing={24} style={{ margin: "8px" }}>
          //   <Hidden only="sm">
          //     <Grid item md={1} lg />
          //   </Hidden>
          //   <Grid item xs={12} lg={4} sm={6} md={5}>
          //     <Grid container spacing={24}>
          //       <IntroductionCard {...this.props} />
          //       <ResearchaAreaCard {...this.props} />
          //       <Grid item xs={12}>
          //         <MiniStatsCard {...this.props} />
          //       </Grid>
          //       <ResearchCard
          //         userData={this.props.user.userData}
          //         userDetail={this.props.user.userDetail}
          //         userResearch={this.props.research.userResearch}
          //         props={this.props}
          //         loading={this.state.loadingResearchCard}
          //       />
          //     </Grid>
          //   </Grid>
          //   <Grid item xs={12} lg={3} sm={6} md={5}>
          //     <Grid container spacing={24}>
          //       <Grid item xs={12}>
          //         <AffiliationCard {...this.props} />
          //       </Grid>
          //       <Grid item xs={12}>
          //         <FollowerCard
          //           userData={this.props.user.userData}
          //           userDetail={this.props.user.userDetail}
          //           userFollower={this.props.user.follower}
          //           runFollow={id => this.followUser(id)}
          //           runUnfollow={id => this.unfollowUser(id)}
          //           runSeeAllFollower={id => this.seeAllFollower(id)}
          //           loading={this.state.loadingFollower}
          //         />
          //       </Grid>
          //       <Grid item xs={12}>
          //         <FollowingCard
          //           userData={this.props.user.userData}
          //           userDetail={this.props.user.userDetail}
          //           userFollowing={this.props.user.following}
          //           runFollow={id => this.followUser(id)}
          //           runUnfollow={id => this.unfollowUser(id)}
          //           runSeeAllFollowing={id => this.seeAllFollowing(id)}
          //           loading={this.state.loadingFollowing}
          //         />
          //       </Grid>
          //     </Grid>
          //   </Grid>
          //   <Hidden only="sm">
          //     <Grid item xs md={1} lg />
          //   </Hidden>
          // </Grid>
        }

        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.openFollowerDialog}
          onClose={id => this.handleShowMoreFollowerClose(id)}
          scroll="paper"
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle style={{ padding: 0 }}>
            <Grid container>
              <Grid item xs={6} style={{ padding: "16px", fontWeight: "bold" }}>
                <Typography variant="inherit">
                  ຜູ້ຕິດຕາມ{" "}
                  <span
                    variant="inherit"
                    style={{ fontWeight: "normal", color: "#898989" }}
                  >
                    {this.props.user.userDetail &&
                    this.props.user.userDetail.follower
                      ? `(${this.props.user.userDetail.follower.length})`
                      : null}
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                align="right"
                onClick={id => this.handleShowMoreFollowerClose(id)}
                style={{ padding: "16px" }}
              >
                <IconButton style={{ padding: 0 }}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent style={{ padding: 0 }}>
            <LoadMoreFollowerCard
              followerLimit={this.state.followerLimit}
              userData={this.props.user.userData}
              userDetail={this.props.user.userDetail}
              userFollower={this.props.user.followerInLoadMore}
              runFollow={id => this.followUserInLoadMore(id)}
              runUnfollow={id => this.unfollowUserInLoadMore(id)}
              loadMore={() => this.loadMoreFollowerCards()}
              loading={this.state.loadingMoreFollower}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          fullScreen={fullScreen}
          open={this.state.openFollowingDialog}
          onClose={id => this.handleShowMoreFollowingClose(id)}
          scroll="paper"
        >
          <DialogTitle style={{ padding: 0 }}>
            <Grid container>
              <Grid
                item
                xs={6}
                style={{
                  padding: "16px",
                  fontWeight: "bold",
                  fontFamily: "'Noto Sans Lao UI', sans serif"
                }}
              >
                <Typography variant="inherit">
                  ກໍາລັງຕິດຕາມ{" "}
                  <span
                    variant="inherit"
                    style={{ fontWeight: "normal", color: "#898989" }}
                  >
                    {this.props.user.userDetail &&
                    this.props.user.userDetail.following
                      ? `(${this.props.user.userDetail.following.length})`
                      : null}
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                align="right"
                onClick={id => this.handleShowMoreFollowingClose(id)}
                style={{ padding: "16px" }}
              >
                <IconButton style={{ padding: 0 }}>
                  <CloseOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <Divider />
          <DialogContent style={{ padding: 0 }}>
            <LoadMoreFollowingCard
              followingLimit={this.state.followingLimit}
              userData={this.props.user.userData}
              userDetail={this.props.user.userDetail}
              userFollowing={this.props.user.followingInLoadMore}
              runFollow={id => this.followUserInLoadMore(id)}
              runUnfollow={id => this.unfollowUserInLoadMore(id)}
              loadMore={() => this.loadMoreFollowingCards()}
              loading={this.state.loadingMoreFollowing}
            />
          </DialogContent>
        </Dialog>

        <ShareDialog
          open={this.state.openShareDialog}
          close={() => this.handleShareDialogClose()}
          url={shareUrl}
          profile={
            this.props && this.props.user && this.props.user.userDetail
              ? this.props.user.userDetail
              : null
          }
          user={
            this.props.user.userData ? this.props.user.userData : this.props
          }
          handleShareCount={() => {
            console.log(`shared`);
          }}
          title={
            this.props &&
            this.props.user &&
            this.props.user.userDetail &&
            this.props.user.userDetail.name
              ? `ຂໍ້ມູນ${this.props.user.userDetail.prefix} ${
                  this.props.user.userDetail.name
                } ${
                  this.props.user.userDetail.lastname
                } - FNS Researcher Profiles`
              : ""
          }
          description={
            this.props &&
            this.props.user &&
            this.props.user.userDetail &&
            this.props.user.userDetail.name
              ? `ປະຫວັດ ແລະ ຂໍ້ມູນນັກຄົ້ນຄວ້າຂອງ${
                  this.props.user.userDetail.prefix
                } ${this.props.user.userDetail.name} ${
                  this.props.user.userDetail.lastname
                } - FNS Researcher Profiles`
              : ""
          }
        />
        <IntorductionDialog
          open={this.state.openIntroductionDialog}
          profileDescription={
            this.props.user &&
            this.props.user &&
            this.props.user.userDetail &&
            this.props.user.userDetail.profileDescription
              ? this.props.user.userDetail.profileDescription
              : ""
          }
          close={() => this.handleIntroductionDialogClose()}
        />
        <UpdateNameDialog
          open={this.state.openEditnameDialog}
          userData={
            this.props.user &&
            this.props.user &&
            this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          close={() => this.handleEditnameDialogClose()}
        />

        <UpdateDegreeDialog
          open={this.state.openUpdateDegreeDialog}
          userData={
            this.props.user &&
            this.props.user &&
            this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          degrees = {this.props.user.degrees ? this.props.user.degrees : []}
          close={() => this.handleUpdateDegreeClose()}
        />

        <UpdateAffiliationDialog
          open={this.state.openUpdateAffiliationDialog}
          userData={
            this.props.user &&
            this.props.user &&
            this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          departments = {this.props.user.departments ? this.props.user.departments : []}
          close={() => this.handleUpdateAffiliationClose()}
        />

        <UpdateResearchArea
          open={this.state.openUpdateResearchAreaDialog}
          researchArea={
            this.props.user &&
            this.props.user.userDetail &&
            this.props.user.userDetail.researchArea
              ? this.props.user.userDetail.researchArea
              : ""
          }
          userId={
            this.props.user &&
            this.props.user.userDetail &&
            this.props.user.userDetail._id
              ? this.props.user.userDetail._id
              : ""
          }
          researchAreas={
            this.props.user &&
            this.props.user.researchAreas
              ? this.props.user.researchAreas
              : ""
          }


          close={() => this.handleUpdateResearchAreaDialogClose()}
        />

        <ProfileImageEditor
          open={this.state.openProfileImageEditor}
          close={() => this.handleProfileImageEditorClose()}
          user={
            this.props && this.props.user && this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          userDetail={
            this.props.user &&
            this.props.user &&
            this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          refreshProfileImage = {()=>{this.refreshProfileImage()}}
        />

        <AddResearch
          open={this.state.openAddResearchDialog}
          close={() => this.handleAddResearchClose()}
          authorSuggestions={
            this.props && this.props.user && this.props.user.authorSuggestions ? this.props.user.authorSuggestions : []
          }
          user = {
            this.props && this.props.user && this.props.user.userData ? this.props.user.userData : {}
          }
          other = {
            {value: this.props && this.props.user && this.props.user.userDetail && this.props.user.userDetail._id ? this.props.user.userDetail._id : "",
            label: this.props && this.props.user && this.props.user.userDetail && this.props.user.userDetail.name ? `${this.props.user.userDetail.name} ${this.props.user.userDetail.lastname}` : ""}
          }
        />
      </ProfileHeader>
      </div>
    );
  }
}

ProfileOverview.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,

};

const mapStateToProps = state => {
  return {
    userDetail: state.user,
    research: state.research
  };
};

const enhance = compose(
  withWidth(),
  withStyles(styles),
  connect(mapStateToProps, null),
)

export default enhance(ProfileOverview);


