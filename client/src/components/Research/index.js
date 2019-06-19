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
  Button
} from "@material-ui/core";

import { like, unlike, clearLike } from "../../actions/user_actions";

import {
  getResearchForCard,
  clearResearchCard,
  addLike,
  removeLike,
  clearLikeResearch
} from "../../actions/research_actions";

import { CloseOutlined } from "@material-ui/icons";
import { LOCALHOST } from "../utils/misc";
import AddResearchButton from "../utils/Button/add_research_button";

import AbstractCard from "../Research/Card/abstract";
import FileViwerCard from "../Research/Card/file_viewer";

let shareUrl;

class Research extends Component {
  state = {
    isAuthor: false,
    isUploader: false,
    isAuth: false,
    isAdmin: false
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

    this.props.dispatch(getResearchForCard(id)).then(response => {
      shareUrl = `${LOCALHOST}/research/${response.payload[0]._id}`;
      document.title = `${response.payload[0].title} - FNS Researcher Profiles`;

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
        runLike={id => this.like(id)}
        runUnLike={id => this.unlike(id)}
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
