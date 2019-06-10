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

import {
  getResearchForCard,
  clearResearchCard
} from "../../actions/research_actions";

import { CloseOutlined } from "@material-ui/icons";
import { LOCALHOST } from "../utils/misc";

let shareUrl;


class Research extends Component {
    state = {
        isAuthor:  false,
        isUploader: false,
        isAuth: false,
        isAdmin: false
    }
  componentWillMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getResearchForCard(id)).then(response => {
      shareUrl = `${LOCALHOST}/research/${response.payload[0]._id}`;
      document.title = `${response.payload[0].title} - FNS Researcher Profiles`;
      console.log(this.props)

      const author = response.payload[0].author.find( array => array._id === this.props.user.userData._id );
      const uploader = response.payload[0].uploader._id === this.props.user.userData._id
      const auth = this.props.user.userData.isAuth
      const admin = this.props.user.userData.isAdmin

      if (author) {
          this.setState({
              isAuthor: true
          })
      }

      if (uploader) {
        this.setState({
            isUploader: true
        })
      }

      if (auth) {
          this.setState({
              isAuth: true
          })
      }

      if (admin) {
          this.setState({
              isAdmin: true
          })
      }
console.log(this.state)
    });
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
    return {
      user: state.user,
      research: state.research
    };
  };

export default connect(mapStateToProps)(Research);
