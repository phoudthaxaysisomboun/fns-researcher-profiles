import React, { Component } from "react";
import ProfileHeader from "../../hoc/profile_header";
import { connect } from "react-redux";

import AffiliationCard from "../User/Card/affiliation";
import IntroductionCard from "../User/Card/introduction";
import ResearchaAreaCard from "../User/Card/research_area";
import FollowingCard from "../User/Card/following";
import FollowerCard from "../User/Card/follower";
import LoadMoreFollowerCard from "./Card/load_more_follower";
import LoadMoreFollowingCard from "../User/Card/load_more_following";
import PersonalInfoCard from "../User/Card/personal_info";
import EducationCard from "../User/Card/education";

import UpdateNameDialog from "../User/Dialog/edit_name";
import UpdateMobilePhoneNumber from "./Dialog/update_mobile_number";
import UpdatePhoneNumber from "./Dialog/update_phone";
import UpdateFax from "./Dialog/update_fax";
import UpdateWebite from "./Dialog/update_website";
import UpdateDateOfBirthDialogue from "./Dialog/update_date_of_birth";
import UpdateFacebookDialogue from "./Dialog/update_facebook";
import UpdateGenderDialogue from "./Dialog/update_gender";
import UpdateMinorEthnicityDialogue from "./Dialog/update_minor_ethnicity";
import UpdateNationalityDialogue from "./Dialog/update_nationality";
import UpdateAddressDialogue from "./Dialog/update_address";
import UpdatePlaceOfBirthDialogue from "./Dialog/update_place_of_birth";
import AddEducationDialogue from "./Dialog/add_education";
import UpdateEducationDialogue from "./Dialog/update_education";
import ShareDialog from "../User/Dialog/share";
import IntorductionDialog from "../User/Dialog/add_introduction";
import UpdateResearchArea from "../User/Dialog/update_research_area";
import UpdateDegreeDialog from "../User/Dialog/update_degree";

import UpdateAffiliationDialog from "../User/Dialog/update_affiliation";

import {
  // Hidden,
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  IconButton,
  Typography,
  // Menu,
  // MenuItem,
  DialogContentText,
  DialogActions,
  Button
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
  getDistrict,
  removeEducation
} from "../../actions/user_actions";

import { CloseOutlined } from "@material-ui/icons";

import { LOCALHOST } from "../utils/misc";

import AddResearch from "../utils/Dialogs/add_research";

let shareUrl;

class ProfileInfo extends Component {
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
    loadingFollower: true,
    loadingFollowing: true,
    tabNumber: 1,
    openEditMobileDialog: false,
    openEditPhoneDialog: false,
    openEditFaxDialog: false,
    openEditWebsiteDialog: false,

    openEditGenderDialog: false,
    openEditAddressDialog: false,
    openEditFacebookDialog: false,
    openEditDateOfBirthDialog: false,
    openEditPlaceOfBirthDialog: false,
    openEditNationalityDialog: false,
    openEditMinorEthnicityDialog: false,

    openAddEducationDialog: false,
    openEditEducationDialog: false,

    anchorElEducation: null,

    educationId: "",

    selectedEducation: {},

    openRemoveEducationConformationDialog: false,
    openShareDialog: false,

    openIntroductionDialog: false,
    openUpdateResearchAreaDialog: false,
    openAddResearchDialog: false,

    openEditnameDialog: false,
    openUpdateDegreeDialog: false,
    openUpdateAffiliationDialog: false
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

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;

    if (prevProps.user.updatedDegree !== this.props.user.updatedDegree) {
      this.props.dispatch(getProfileDetail(id));
    }
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    var following = [];
    var followingId = [];
    var followerId = [];

    this.props.dispatch(getProfileDetail(id)).then(response => {
      if (response.payload) {
        following = response.payload.following;
        followerId = response.payload.follower;
        for (var key in following) {
          followingId.push(following[key]._id);
        }

        shareUrl = `${LOCALHOST}/profile/${response.payload._id}/info`;

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

        if (
          response.payload.address &&
          response.payload.address.province &&
          response.payload.address.province._id
        ) {
          this.props.dispatch(
            getDistrict(response.payload.address.province._id)
          );
        }
      } else {
        // TO DO: Do something when there's no user
        this.props.history.push("/");
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileDetail());
    this.props.dispatch(clearFollower());
    this.props.dispatch(clearFollowing());

    this.setState({
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

  handleUpdateMobileClose = () => {
    this.setState({
      openEditMobileDialog: false
    });
  };

  handleUpdatePhoneClose = () => {
    this.setState({
      openEditPhoneDialog: false
    });
  };

  handleUpdateFaxClose = () => {
    this.setState({
      openEditFaxDialog: false
    });
  };

  handleOpenUpdateMobileDialog = () => {
    this.setState({
      openEditMobileDialog: true
    });
  };

  handleOpenUpdateFaxDialog = () => {
    this.setState({
      openEditFaxDialog: true
    });
  };

  handleOpenUpdatePhoneDialog = () => {
    this.setState({
      openEditPhoneDialog: true
    });
  };

  /*  Website edit dialogue actions */

  handleOpenUpdateWebsiteDialog = () => {
    this.setState({
      openEditWebsiteDialog: true
    });
  };

  handleUpdateWebsiteClose = () => {
    this.setState({
      openEditWebsiteDialog: false
    });
  };

  /*  Gender edit dialogue actions */

  handleOpenUpdateGenderDialog = () => {
    this.setState({
      openEditGenderDialog: true
    });
  };

  handleUpdateGenderClose = () => {
    this.setState({
      openEditGenderDialog: false
    });
  };

  /*  Address edit dialogue actions */
  handleOpenUpdateAddressDialog = () => {
    this.setState({
      openEditAddressDialog: true
    });
  };

  handleUpdateAddressClose = () => {
    this.setState({
      openEditAddressDialog: false
    });
  };

  /*  Facebook edit dialogue actions */
  handleOpenUpdateFacebookDialog = () => {
    this.setState({
      openEditFacebookDialog: true
    });
  };

  handleUpdateFacebookClose = () => {
    this.setState({
      openEditFacebookDialog: false
    });
  };

  /*  Date of birth edit dialogue actions */
  handleOpenUpdateDateOfBirthDialog = () => {
    this.setState({
      openEditDateOfBirthDialog: true
    });
  };

  handleUpdateDateOfBirthClose = () => {
    this.setState({
      openEditDateOfBirthDialog: false
    });
  };

  /*  Place of birth edit dialogue actions */
  handleOpenUpdatePlaceOfBirthDialog = () => {
    this.setState({
      openEditPlaceOfBirthDialog: true
    });
  };

  handleUpdatePlaceOfBirthClose = () => {
    this.setState({
      openEditPlaceOfBirthDialog: false
    });
  };

  /*  Nationality edit dialogue actions */
  handleOpenUpdateNationalityDialog = () => {
    this.setState({
      openEditNationalityDialog: true
    });
  };

  handleUpdateNationalityClose = () => {
    this.setState({
      openEditNationalityDialog: false
    });
  };

  /*  Minor-ethinicity edit dialogue actions */
  handleOpenUpdateMinorEthinicityDialog = () => {
    this.setState({
      openEditMinorEthnicityDialog: true
    });
  };

  handleUpdateMinorEthnicityClose = () => {
    this.setState({
      openEditMinorEthnicityDialog: false
    });
  };

  /*  add education dialogue actions */
  handleOpenAddEducationDialog = () => {
    this.setState({
      openAddEducationDialog: true
    });
  };

  handleAddEducationClose = () => {
    this.setState({
      openAddEducationDialog: false
    });
  };

  /*  edit education dialogue actions */
  handleOpenEditEducationDialog = () => {
    this.setState({
      openEditEducationDialog: true
    });
  };

  handleEditEducationClose = () => {
    this.setState({
      openEditEducationDialog: false
    });
  };

  handleEducationMenuClick = (event, id) => {
    this.setState({ anchorElEducation: event.currentTarget });
    this.setState({
      educationId: id
    });

    let educations = this.props.user.userDetail.education;
    let obj = educations.find(o => o._id === id);
    this.setState({
      selectedEducation: obj
    });
  };

  handleEducationMenuClose = () => {
    this.setState({ anchorElEducation: null });
  };

  /*  edit education dialogue actions */
  handleOpenDeleteEducationConfirmationDialogue = () => {
    this.setState({
      openRemoveEducationConformationDialog: true
    });
  };

  handleDeleteEducationConfirmationClose = () => {
    this.setState({
      openRemoveEducationConformationDialog: false
      // anchorElEducation: null
    });
  };

  handleEducationDeletion = () => {
    console.log(this.state.educationId);
    if (this.state.educationId.trim() !== "") {
      this.props
        .dispatch(
          removeEducation(
            this.props.user.userDetail._id,
            this.state.educationId
          )
        )
        .then(response => {
          this.setState({
            openRemoveEducationConformationDialog: false,
            anchorElEducation: null
          });
          if (response.success) {
          }
        });
    }
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

  render() {
    const { fullScreen } = this.props;

    if (this.props.user.userDetail) {
      document.title = ` ປະຫວັດ: ${this.props.user.userDetail.name} ${this.props.user.userDetail.lastname} - FNS Researcher Profiles`;
    }
    return (
      <ProfileHeader
        props={this.props}
        children={this.props.children}
        userData={this.props.user.userData}
        userDetail={this.props.user.userDetail}
        runFollow={id => this.followUser(id)}
        runUnfollow={id => this.unfollowUser(id)}
        loading={this.state.followLoading}
        tab={this.state.tabNumber}
        openShareDialog={() => {
          this.handleShareDialogOpen();
        }}
        openAddResearchDialog={() => {
          this.handleAddResearchOpen();
        }}
        openEditName={() => {
          this.handleEditNameDialogOpen();
        }}
        openUpdateDegree={() => {
          this.handleUpdateDegreeOpen();
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
                  <ResearchaAreaCard
                    props={this.props}
                    runOpenUpdateDialog={() => {
                      this.handleUpdateResearchAreaDialogOpen();
                    }}
                  />

                  <PersonalInfoCard
                    openUpdateDegree={() => {
                      this.handleUpdateDegreeOpen();
                    }}
                    props={this.props}
                    runEditMobile={() => this.handleOpenUpdateMobileDialog()}
                    runEditPhone={() => this.handleOpenUpdatePhoneDialog()}
                    runEditFax={() => this.handleOpenUpdateFaxDialog()}
                    runEditWebsite={() => this.handleOpenUpdateWebsiteDialog()}
                    runEditDateOfBirth={() =>
                      this.handleOpenUpdateDateOfBirthDialog()
                    }
                    runEditFacebook={() =>
                      this.handleOpenUpdateFacebookDialog()
                    }
                    runEditGender={() => this.handleOpenUpdateGenderDialog()}
                    runEditMinorEthnicity={() =>
                      this.handleOpenUpdateMinorEthinicityDialog()
                    }
                    runEditNationality={() =>
                      this.handleOpenUpdateNationalityDialog()
                    }
                    runEditAddress={() => this.handleOpenUpdateAddressDialog()}
                    runEditPlaceOfBirth={() =>
                      this.handleOpenUpdatePlaceOfBirthDialog()
                    }
                  />

                  <EducationCard
                    userData={this.props.user.userData}
                    userDetail={this.props.user.userDetail}
                    props={this.props}
                    runAddEducation={() => this.handleOpenAddEducationDialog()}
                    handleClick={(event, id) => {
                      this.handleEducationMenuClick(event, id);
                    }}
                    handleClose={event => {
                      this.handleEducationMenuClose(event);
                    }}
                    anchorEl={this.state.anchorElEducation}
                    runDelete={() => {
                      this.handleOpenDeleteEducationConfirmationDialogue();
                    }}
                    runEdit={() => {
                      this.handleOpenEditEducationDialog();
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} lg sm md>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <AffiliationCard
                      props={this.props}
                      editAffiliation={() => this.handleUpdateAffiliationOpen()}
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
          aria-labelledby="max-width-dialog-title"
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

        <UpdateMobilePhoneNumber
          open={this.state.openEditMobileDialog}
          close={() => this.handleUpdateMobileClose()}
        />

        <UpdatePhoneNumber
          open={this.state.openEditPhoneDialog}
          close={() => this.handleUpdatePhoneClose()}
        />

        <UpdateFax
          open={this.state.openEditFaxDialog}
          close={() => this.handleUpdateFaxClose()}
        />

        <UpdateWebite
          open={this.state.openEditWebsiteDialog}
          close={() => this.handleUpdateWebsiteClose()}
        />

        <UpdateDateOfBirthDialogue
          open={this.state.openEditDateOfBirthDialog}
          close={() => this.handleUpdateDateOfBirthClose()}
        />

        <UpdateFacebookDialogue
          open={this.state.openEditFacebookDialog}
          close={() => this.handleUpdateFacebookClose()}
        />

        <UpdateGenderDialogue
          open={this.state.openEditGenderDialog}
          close={() => this.handleUpdateGenderClose()}
        />

        <UpdateMinorEthnicityDialogue
          open={this.state.openEditMinorEthnicityDialog}
          close={() => this.handleUpdateMinorEthnicityClose()}
        />

        <UpdateNationalityDialogue
          open={this.state.openEditNationalityDialog}
          close={() => this.handleUpdateNationalityClose()}
        />

        <UpdateAddressDialogue
          open={this.state.openEditAddressDialog}
          close={() => this.handleUpdateAddressClose()}
        />

        <UpdatePlaceOfBirthDialogue
          open={this.state.openEditPlaceOfBirthDialog}
          close={() => this.handleUpdatePlaceOfBirthClose()}
        />

        <AddEducationDialogue
          open={this.state.openAddEducationDialog}
          close={() => this.handleAddEducationClose()}
        />

        <UpdateEducationDialogue
          open={this.state.openEditEducationDialog}
          close={() => this.handleEditEducationClose()}
          education={this.state.selectedEducation}
          closeMenu={() => {
            this.handleEducationMenuClose();
          }}
        />

        <Dialog
          open={this.state.openRemoveEducationConformationDialog}
          onClose={this.handleDeleteEducationConfirmationClose}
          maxWidth="xs"
        >
          <DialogTitle style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}>
            ຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ບໍ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
            >
              ທ່ານກໍາລັງຈະລຶບຂໍ້ມູນການສຶກສານີ້.
              ທ່ານແນ່ໃຈຫລືບໍ່ວ່າຈະລຶບຂໍ້ມູນດັ່ງກ່າວ?
              ການກະທໍາຕໍ່ໄປນີ້ບໍ່ສາມາດແກ້ໄຂໄດ້
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteEducationConfirmationClose}>
              ຍົກເລີກ
            </Button>
            <Button
              onClick={this.handleEducationDeletion}
              style={{ color: "#f44336" }}
              autoFocus
            >
              ຢືນຢັນ
            </Button>
          </DialogActions>
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
              ? `ປະຫວັດ${this.props.user.userDetail.prefix} ${this.props.user.userDetail.name} ${this.props.user.userDetail.lastname} - FNS Researcher Profiles`
              : ""
          }
          description={
            this.props &&
            this.props.user &&
            this.props.user.userDetail &&
            this.props.user.userDetail.name
              ? `ປະຫວັດ ແລະ ຂໍ້ມູນນັກຄົ້ນຄວ້າຂອງ${this.props.user.userDetail.prefix} ${this.props.user.userDetail.name} ${this.props.user.userDetail.lastname} - FNS Researcher Profiles`
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
            this.props.user && this.props.user.researchAreas
              ? this.props.user.researchAreas
              : ""
          }
          close={() => this.handleUpdateResearchAreaDialogClose()}
        />

        <UpdateNameDialog
          open={this.state.openEditnameDialog}
          userData={
            this.props.user && this.props.user && this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          close={() => this.handleEditnameDialogClose()}
        />

        <UpdateAffiliationDialog
          open={this.state.openUpdateAffiliationDialog}
          userData={
            this.props.user && this.props.user && this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          departments={
            this.props.user.departments ? this.props.user.departments : []
          }
          close={() => this.handleUpdateAffiliationClose()}
        />

        <UpdateDegreeDialog
          open={this.state.openUpdateDegreeDialog}
          userData={
            this.props.user && this.props.user && this.props.user.userDetail
              ? this.props.user.userDetail
              : {}
          }
          degrees={this.props.user.degrees ? this.props.user.degrees : []}
          close={() => this.handleUpdateDegreeClose()}
        />

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
          other={{
            value:
              this.props &&
              this.props.user &&
              this.props.user.userDetail &&
              this.props.user.userDetail._id
                ? this.props.user.userDetail._id
                : "",
            label:
              this.props &&
              this.props.user &&
              this.props.user.userDetail &&
              this.props.user.userDetail.name
                ? `${this.props.user.userDetail.name} ${this.props.user.userDetail.lastname}`
                : ""
          }}
        />
      </ProfileHeader>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetail: state.user
  };
};

export default connect(mapStateToProps)(ProfileInfo);
