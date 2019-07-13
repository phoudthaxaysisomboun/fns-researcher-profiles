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
import { getComments } from "../../actions/research_actions";

import {
  getResearchForCard,
  clearResearchCard,
  addLike,
  removeLike,
  clearLikeResearch,
  addComment,
  removeComment,
  addReply,
  removeReply
} from "../../actions/research_actions";

import { CloseOutlined } from "@material-ui/icons";
import { LOCALHOST } from "../utils/misc";
import AddResearchButton from "../utils/Button/add_research_button";

import AbstractCard from "../Research/Card/abstract";
import FileViwerCard from "../Research/Card/file_viewer";
import CommentsCard from "../Research/Card/comments";

let shareUrl;
let commentId

class ResearchComments extends Component {
  state = {
    isAuthor: false,
    isUploader: false,
    isAuth: false,
    isAdmin: false,
    tabIndex: 2,
    anchorElComments: null,
    anchorElReplies: null,
    commentValue: "",
    replyValue: "",
    showReplyTextField: false,
    commentId: "",
    replyId: null
  };

  handleCommentTextChange = (event) => {
    this.setState({
      commentValue: event.target.value
    })
  }

  clearComment = () => {
    this.setState({
      commentValue: ""
    })
  }

  deleleComment = () => {
    this.props.dispatch(removeComment(this.props.research.userResearch[0]._id, this.state.commentId)).then(()=>{
      this.setState({ anchorElComments: null });
    })
  }

  deleleReply = () => {
    this.props.dispatch(removeReply(this.props.research.userResearch[0]._id,this.state.commentId, this.state.replyId)).then(()=>{
      this.setState({ anchorElReplies: null });
    })
  }

  cancelReply = () => {
    this.setState({
      replyValue: "",
      showReplyTextField: false
    })
  }


  handleReplyTextChange = event => {
    this.setState({
      replyValue: event.target.value,
    })
  }

  openReplyTextField = (event, id) => {
    commentId = id
    
    this.setState({
      commentId: id,
      showReplyTextField: true,
    })
    console.log(this.state.commentId)
  }

  submitComment = (event) => {
    event.preventDefault();
    console.log('hgey')
    this.props.dispatch(addComment(this.props.research.userResearch[0]._id, this.props.user.userData._id, this.state.commentValue)).then((response)=>{
      this.setState({
        commentValue: ""
      })
    })
    
  }

  submitReply = (event) => {
    event.preventDefault();
    
    this.props.dispatch(addReply(this.props.research.userResearch[0]._id, this.props.user.userData._id, this.state.replyValue, this.state.commentId)).then((response)=>{
      this.setState({
        replyValue: "",
        showReplyTextField: false,
      })
    })
    
  }


  handleCommentMenuClick = (event, id) => {
    console.log(id)
    this.setState({ anchorElComments: event.currentTarget });
    this.setState({
      commentId: id
    });

  //   let educations = this.props.user.userDetail.education
  //   let obj = educations.find(o => o._id === id);
  //  this.setState({
  //   selectedEducation: obj
  //  })
  };

  handleEducationMenuClose = () => {
    this.setState({ anchorElComments: null });
  };

  handleReplyMenuClick = (event, id, commentId) => {
    console.log(commentId)
    this.setState({ anchorElReplies: event.currentTarget });
    this.setState({
      replyId: id,
      commentId
    });

  //   let educations = this.props.user.userDetail.education
  //   let obj = educations.find(o => o._id === id);
  //  this.setState({
  //   selectedEducation: obj
  //  })
  };

  handleReplyMenuClose = () => {
    this.setState({ anchorElReplies: null });
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

      this.props.dispatch(getComments(id))
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
        tabIndex ={this.state.tabIndex}
      >
        <Grid
          container
          spacing={0}
          style={{ paddingTop: "24px", paddingBottom: "24px" }}
        >
          <Grid item xs sm={1} lg={2} md={1} />

          <Grid item xs={11} sm={10} lg={8} md={10}>
            <CommentsCard user={
                this.props && this.props.user && this.props.user.userData ? this.props.user.userData : {}
            }

            research={
              this.props.research && this.props.research.userResearch
            ? this.props.research.userResearch[0]
            : ""
            }

            cancelReply = {
              ()=>{this.cancelReply()}
            }

            replyValue = {this.state.replyValue}

            showReplyTextField = {this.state.showReplyTextField}

            openReplyTextField = {
              (event, id) => {this.openReplyTextField(event, id)}
            }
            handleReplyTextChange = {
              (event) => {this.handleReplyTextChange(event)}
            }
            
            submitComment = {(event)=>{this.submitComment(event)}}
            commentId = {this.state.commentId}
            comments = {
                this.props && this.props.research && this.props.research.userResearch && this.props.research.userResearch.researchComments ? this.props.research.userResearch.researchComments : null
            }
            anchorElComment={this.state.anchorElComments}
            anchorElReply={this.state.anchorElReplies}
            handleCommentMenuClick={(event, id) => {
              this.handleCommentMenuClick(event, id);
            }}
            handleCommentMenuClose={event => {
              this.handleEducationMenuClose(event);
            }}
            handleReplyMenuClick={(event, id,commentId) => {
              this.handleReplyMenuClick(event, id, commentId);
            }}
            handleReplyMenuClose={event => {
              this.handleReplyMenuClose(event);
            }}
            deleleComment = {()=>{this.deleleComment()}}
            deleleReply = {()=>{this.deleleReply()}}
            submitReply = {(event)=>{this.submitReply(event)}}
            commentText = {this.state.commentValue}
            clearComment = {()=>{this.clearComment()}}

            handleCommentTextChange={event=>{
              this.handleCommentTextChange(event)
            }}
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

export default connect(mapStateToProps)(ResearchComments);
