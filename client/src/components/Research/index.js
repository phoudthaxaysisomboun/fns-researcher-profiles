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
import AddResearchButton from "../utils/Button/add_research_button";

import AbstractCard from "../Research/Card/abstract"
import FileViwerCard from "../Research/Card/file_viewer"

import { Document, Page } from 'react-pdf';


let shareUrl;


class Research extends Component {
    state = {
        isAuthor:  false,
        isUploader: false,
        isAuth: false,
        isAdmin: false,
        numPages: null,
    pageNumber: 1,
    }
    
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
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

    return (
      <ResearchHeader
        props={this.props}
        children={this.props.children}
        userData={this.props.user.userData}
        research={this.props.research && this.props.research.userResearch ? this.props.research.userResearch[0]: ""}
        openShareDialog={() => {
          this.handleShareDialogOpen();
        }}
      >
      <Grid container spacing={0} style={{paddingTop: "24px", paddingBottom: "24px"}}>
      <Grid item xs sm={1} lg={2} md={1} />

      <Grid item xs={11} sm={10} lg={8} md={10}>
      <div> 
      {
      //   <Document
      //   file="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      //   onLoadSuccess={this.onDocumentLoadSuccess}
      //   onSourceError={(e)=>{console.log(e)}}
      // >
      //   <Page pageNumber={1} />
      // </Document><p>Page {this.state.pageNumber} of {this.state.numPages}</p>
      }
      
    </div>
      <AbstractCard user={this.props.user.userData} research={this.props.research && this.props.research.userResearch ? this.props.research.userResearch[0]: ""} />
      <FileViwerCard user={this.props.user.userData} research={this.props.research && this.props.research.userResearch ? this.props.research.userResearch[0]: ""} />
      </Grid>

      <Grid item xs sm={1} lg={2} md={1} />
      </Grid>
      
      <AddResearchButton />
      </ResearchHeader>
    )
  }
}

const mapStateToProps = state => {
    return {
      user: state.user,
      research: state.research
    };
  };

export default connect(mapStateToProps)(Research);
