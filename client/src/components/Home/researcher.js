import React, { Component } from "react";
import SearchHeader from "../../hoc/search_header";

import { connect } from "react-redux";

import queryString from "query-string";

import { Grid, Typography } from "@material-ui/core";

import ProfileCard from "../Home/Card/profile";

import { withRouter } from "react-router-dom";

import {
  getProfileAndResearchCount,
  searchProfiles,
  clearSearchProfiles,
  follow,
  addFollower,
  unfollow,
  removeFollower,
} from "../../actions/user_actions";

let query
class ResearcherSearch extends Component {
  componentDidMount() {
    document.title = "FNS Researcher Profiles";
  }

  state = {
    search: ""
  };

  followUser = id => {
    if (this.props.user.userData.isAuth) {
      this.setState({
        followLoading: true
      });
      this.props.dispatch(follow(id)).then(() => {
        this.props.dispatch(addFollower(id)).then(() => {});
      });
    } else {
      console.log("You need to login");
    }
  };

  unfollowUser = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unfollow(id)).then(() => {
        this.props.dispatch(removeFollower(id)).then(() => {});
      });
    } else {
      console.log("You need to login");
    }
  };

  componentWillMount() {
    query = queryString.parse(this.props.location.search);
    this.setState({
      search: query.q
    });
    const search = query.q;
    this.props.dispatch(searchProfiles(search));
    console.log(query.q);
    this.props.dispatch(getProfileAndResearchCount()).then(response => {
      console.log(response.payload);
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearchProfiles());
  }

  handleTextChange = value => {
    this.setState({
      search: value
    });
    console.log(this.state.search);
  };

  handleSearchButtonClick() {
    if (this.state.search.trim() !== "") {
      this.props.history.push(`/search/researchers?q=${this.state.search}`);
    }
  }

  handleToggleResearchTab() {
    this.props.history.push(`/search/researches?q=${this.state.search}`);
  }

  handleToggleResearcherTab() {
    this.props.history.push(`/search/researchers?q=${this.state.search}`);
  }

  handleClearText = () => {
    this.setState({
      search: ""
    });
    console.log(this.state.search);
  };

  render() {
    return (
      <>
        <SearchHeader
          children={this.props.children}
          researchCount={this.props.user.researchCount}
          profileCount={this.props.user.profileCount}
          searchTerm={this.state.search}
          handleSearchTextChange={value => this.handleTextChange(value)}
          clearText={() => this.handleClearText()}
          performSearch={() => this.handleSearchButtonClick()}
          tabValue={0}
          changeToResearcher = {()=>this.handleToggleResearcherTab()}
          changeToResearch = {()=>this.handleToggleResearchTab()}
        >
          <Grid container >
            <Grid item xs sm lg md />
            <Grid item xs={11} sm={11} lg={5} md={8}>
              <Grid container justify="center">
              {
                (query && query.q.trim() === "") ?

                  <Typography variant="inherit" style={{marginTop: "16px", fontSize: "1.2rem", fontWeight: "500"}}>
                    ນັກຄົ້ນຄວ້າທັງຫມົດ ({this.props.user.profileCount})
                  </Typography> : null
              }
                {
                  <ProfileCard
                    resercher={
                      this.props.user && this.props.user.profilesSearchResult
                        ? this.props.user.profilesSearchResult
                        : null
                    }
                    user={
                      this.props.user && this.props.user.userData
                        ? this.props.user.userData
                        : null
                    }
                    runFollow={id => this.followUser(id)}
                    runUnfollow={id => this.unfollowUser(id)}
                  />
                }

                {console.log(this.props.user.userData)}
              </Grid>
            </Grid>
            <Grid item xs sm lg md />
          </Grid>
        </SearchHeader>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

export default withRouter(connect(mapStateToProps)(ResearcherSearch));
