import React, { Component } from "react";
import { Fab, Grid } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import AddResearch from "../../../components/utils/Dialogs/add_research";

import {
  getFeed,
  clearFeed,
  addLike,
  removeLike,
} from "../../../actions/research_actions";
import { like, unlike, clearLike } from "../../../actions/user_actions";

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

class Feed extends Component {
  state = {
    openAddResearchDialog: false
  };

  componentWillMount() {
    this.props.dispatch(getFeed());
    document.title = "Feed - FNS Researcher Profiles";
  }

  componentWillUnmount() {
    this.props.dispatch(clearFeed());
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

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs sm lg md />
          <Grid item xs={11} sm={11} lg={5} md={8}>
            <Grid container justify="center">
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
              />
            </Grid>
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

export default withRouter(connect(mapStateToProps)(Feed));
