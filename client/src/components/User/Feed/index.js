import React, { Component } from "react";
import { Fab, Grid } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import AddResearch from "../../../components/utils/Dialogs/add_research";

import {getFeed, clearFeed} from "../../../actions/research_actions"

import FeedCard from "../Feed/Card/post"

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

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs sm={2} lg={4} md={3} />
          <Grid item xs={10} sm={8} lg={4} md={6}>
            <Grid container justify="center">
            <FeedCard
            userResearch={
              this.props.user &&
              this.props.research.feed
                ? this.props.research.feed
                : null
            }
            userData={
              this.props.user && this.props.user.userData
                ? this.props.user.userData
                : null
            }
          />
            </Grid>
          </Grid>
          <Grid item xs sm={2} lg={4} md={3} />
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
