import React, { Component } from "react";

import ResearchHeader from "../../hoc/research_header";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import {
  Hidden,
  Grid,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  IconButton,
  Typography,
  Button,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { like, unlike, clearLike } from "../../actions/user_actions";

import {
  getResearchForCard,
  clearResearchCard,
  addLike,
  removeLike,
  clearLikeResearch,
  addCountToResearch,
  removeResearch,
  removeAuthor,
  updateResearch
} from "../../actions/research_actions";

import { CloseOutlined } from "@material-ui/icons";
import { LOCALHOST } from "../utils/misc";
import UpdateResearch from "../utils/Dialogs/edit_research";
import AddResearchButton from "../utils/Button/add_research_button";

import AbstractCard from "../Research/Card/abstract";
import FileViwerCard from "../Research/Card/file_viewer";

import { ObjectID } from "bson";

let shareUrl;

class Research extends Component {
  state = {
    isAuthor: false,
    isUploader: false,
    isAuth: false,
    isAdmin: false,
    tabIndex: 0,
    anchorUploader: null,
    anchorCoAuthor: null,
    openDeleteResearchDialog: false,
    openRemoveAuthorDialog: false,
    openEditResearchDialog: false
  };

  handleDeleteResearchDialogClose = () => {
    this.setState({
      openDeleteResearchDialog: false
    })
  }

  handleDeleteResearchDialogOpen = () => {
    this.setState({
      openDeleteResearchDialog: true
    })
  }

  handleUploaderMenuClick = (event, id) => {
    this.setState({ anchorUploader: event.currentTarget });

  //   let educations = this.props.user.userDetail.education
  //   let obj = educations.find(o => o._id === id);
  //  this.setState({
  //   selectedEducation: obj
  //  })
  };

  handleRemoveResearch = () => {
    this.props.dispatch((removeResearch(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id
      : ""))).then(response=>{
        this.props.history.push(`/profile/${this.props.user.userData._id}`)
      })
  }

  handleRemoveAuthor = () => {
    this.props.dispatch((removeAuthor(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id
      : "", this.props && this.props.user && this.props.user.userData ?this.props.user.userData._id : "")))
  }

  handleRemoveAuthor = () => {
    this.props.dispatch((removeAuthor(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id
      : "", this.props && this.props.user && this.props.user.userData ?this.props.user.userData._id : "")))
  }

  handleUploaderMenuClose = () => {
    this.setState({ anchorUploader: null });
  };

  handleCoAuthorMenuClick = (event, id) => {
    this.setState({ anchorCoAuthor: event.currentTarget });
  };

  handleCoAuthorMenuClose = () => {
    this.setState({ anchorCoAuthor: null });
  };

  like = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(like(id)).then(() => {});
      this.props.dispatch(addLike(id)).then(() => {
        this.props.dispatch(getResearchForCard(id));
      });
    } else {
      console.log("You need to login");
    }
  };

  unlike = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unlike(id)).then(() => {});
      this.props.dispatch(removeLike(id)).then(() => {
        this.props.dispatch(getResearchForCard(id));
      });
    } else {
      console.log("You need to login");
    }
  };

  componentWillMount() {
    const id = this.props.match.params.id;
    const _id = new ObjectID();

    this.props.dispatch(getResearchForCard(id)).then(response => {
      shareUrl = `${LOCALHOST}/research/${response.payload[0]._id}`;
      document.title = `${response.payload[0].title} - FNS Researcher Profiles`;

      this.props.dispatch(addCountToResearch(response.payload[0]._id, this.props && this.props.user && this.props.user.userData && this.props.user.userData._id ? this.props.user.userData._id : _id.toHexString()))

      const author = response.payload[0].author.find(
        array => array._id === this.props.user.userData._id
      );
      const uploader =
        response.payload[0].uploader._id === this.props.user.userData._id;
      const auth = this.props.user.userData.isAuth;
      const admin = this.props.user.userData.isAdmin;

      if (author) {
        this.setState({
          isAuthor: true
        });
      }

      if (uploader) {
        this.setState({
          isUploader: true
        });
      }

      if (auth) {
        this.setState({
          isAuth: true
        });
      }

      if (admin) {
        this.setState({
          isAdmin: true
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearLikeResearch());
    this.props.dispatch(clearResearchCard());
  }

  render() {
    return (
      <ResearchHeader
        props={this.props}
        children={this.props.children}
        userData={this.props.user.userData}
        research={
          this.props.research && this.props.research.userResearch
            ? this.props.research.userResearch[0]
            : ""
        }
        openShareDialog={() => {
          this.handleShareDialogOpen();
        }}
        tabIndex ={this.state.tabIndex}
        runLike={id => this.like(id)}
        runUnLike={id => this.unlike(id)}


        anchorUploader={this.state.anchorUploader}
            anchorCoAuthor={this.state.anchorCoAuthor}
            handleUploaderMenuClick={(event, id) => {
              this.handleUploaderMenuClick(event, id);
            }}
            handleUploaderMenuClose={event => {
              this.handleUploaderMenuClose(event);
            }}
            handleCoAuthorMenuClick={(event) => {
              this.handleCoAuthorMenuClick(event);
            }}
            handleCoAuthorMenuClose={event => {
              this.handleCoAuthorMenuClose(event);
            }}

            openDeleteResearchDialog = {
              () => {
                this.handleDeleteResearchDialogOpen()
              }
            }
      >
        <Grid
          container
          spacing={0}
          style={{ paddingTop: "24px", paddingBottom: "24px" }}
        >
          <Grid item xs sm={1} lg={2} md={1} />

          <Grid item xs={11} sm={10} lg={8} md={10}>
            <AbstractCard
              user={this.props.user.userData}
              research={
                this.props.research && this.props.research.userResearch
                  ? this.props.research.userResearch[0]
                  : ""
              }
            />
            <FileViwerCard
              user={this.props.user.userData}
              research={
                this.props.research && this.props.research.userResearch
                  ? this.props.research.userResearch[0]
                  : ""
              }
            />
          </Grid>

          <Grid item xs sm={1} lg={2} md={1} />
        </Grid>

        <AddResearchButton />
        {
          // <UpdateResearch />
        }

        <Dialog
          open={this.state.openDeleteResearchDialog}
          maxWidth="xs"
        >
          <DialogTitle style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}>
            ຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ບໍ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
            >
              ທ່ານກໍາລັງຈະລຶບຂໍ້ມູນນັກຄົ້ນຄວ້ານີ້.
              ທ່ານແນ່ໃຈຫລືບໍ່ວ່າຈະລຶບຂໍ້ມູນດັ່ງກ່າວ?
              ການກະທໍາຕໍ່ໄປນີ້ບໍ່ສາມາດແກ້ໄຂໄດ້
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleDeleteResearchDialogClose()}
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={this.handleRemoveResearch}
              style={{ color: "#f44336" }}
              autoFocus
            >
              ຢືນຢັນ
            </Button>
          </DialogActions>
        </Dialog>

      </ResearchHeader>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

export default connect(mapStateToProps)(Research);
