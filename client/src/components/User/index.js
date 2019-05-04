import React, { Component } from "react";
import ProfileHeader from "../../hoc/profile_header";
import { connect } from "react-redux";

import AffiliationCard from "../User/Card/affiliation";
import MiniStatsCard from "../User/Card/mini_stats";
import IntroductionCard from "../User/Card/introduction";
import ResearchaAreaCard from "../User/Card/research_area";
import FollowingCard from "../User/Card/following";

import {
  FormControl,
  Hidden,
  FormLabel,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  RadioGroup,
  Grid,
  Fab,
  Radio,
  FormControlLabel,
  Paper,
  Avatar,
  Button,
  FormHelperText,
  Tabs,
  Tab,
  Link,
  Typography,
  withWidth
} from "@material-ui/core";

import {
  getProfileDetail,
  clearProfileDetail,
  getFollowing
} from "../../actions/user_actions";

class ProfileOverview extends Component {


  componentDidMount() {
    const id = this.props.match.params.id;
    var follower = []
    var followerId = []


    console.log(id);
    this.props.dispatch(getProfileDetail(id)).then(response => {
      follower = response.payload.following
      for (var key in follower) {
        followerId.push(follower[key]._id)
      }
      this.props.dispatch(getFollowing(followerId)).then(response => {
        
      })
    })

  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileDetail());
  }

  render() {

    if (this.props.user.userDetail) {
      document.title = `${this.props.user.userDetail.name} ${this.props.user.userDetail.lastname} - FNS Researcher Profiles`
    }
    return (
      <ProfileHeader {...this.props}>
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
                <FollowingCard userData = {this.props.user.userData} userDetail = {this.props.user.userDetail} userFollowing = {this.props.user.following} />
              </Grid>
            </Grid>
          </Grid>
          <Hidden only="sm">
            <Grid item xs md={1} lg />
          </Hidden>
        </Grid>
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
