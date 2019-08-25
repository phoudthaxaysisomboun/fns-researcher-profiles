import React, { Component } from "react";
import SearchHeader from "../../hoc/search_header";

import { connect } from "react-redux";

import queryString from "query-string";

import { Grid, Typography } from "@material-ui/core";

import ResearchCard from "../Home/Card/research";

import { withRouter } from "react-router-dom";

import { getProfileAndResearchCount,like, unlike, 
  // clearLike
 } from "../../actions/user_actions";

import {
  searchResearches,
  clearSearchResearches,
  addLike,
  removeLike,
  // clearLikeResearch
} from "../../actions/research_actions";
let query = ""
class ResearchSearch extends Component {
  componentDidMount() {
    document.title = "FNS Researcher Profiles";
  }

  state = {
    search: ""
  };

  componentWillMount() {
     query = queryString.parse(this.props.location.search);
    this.setState({
      search: query.q
    });
    const search = query.q;
    this.props.dispatch(searchResearches(search));
    console.log(query.q);
    this.props.dispatch(getProfileAndResearchCount()).then(response => {
      console.log(response.payload);
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearchResearches());
  }

  handleTextChange = value => {
    this.setState({
      search: value
    });
    console.log(this.state.search);
  };

  handleSearchButtonClick() {
    if (this.state.search.trim() !== "") {
      this.props.history.push(`/search/researches?q=${this.state.search}`);
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
  };

  like = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(like(id)).then(() => {});
      this.props.dispatch(addLike(id)).then(() => {
        this.props.dispatch(this.props.dispatch(searchResearches(this.state.search)))
      });
    } else {
      console.log("You need to login");
    }
  };

  unlike = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unlike(id)).then(() => {});
      this.props.dispatch(removeLike(id)).then(() => {
        this.props.dispatch(this.props.dispatch(searchResearches(this.state.search)))
      });
    } else {
      console.log("You need to login");
    }
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
          tabValue = {1}
          changeToResearcher = {()=>this.handleToggleResearcherTab()}
          changeToResearch = {()=>this.handleToggleResearchTab()}
        >
          <Grid container>
            <Grid item xs sm lg md />
            <Grid item xs={11} sm={11} lg={7} xl={5} md={10}>
              <Grid container justify="center">
              {
                (query && query.q.trim() === "") ?

                  <Typography variant="inherit" style={{marginTop: "16px", fontSize: "1.2rem", fontWeight: "500"}}>
                    ຜົນງານຄົ້ນຄວ້າທັງຫມົດ ({this.props.user.researchCount})
                  </Typography> : null
              }
                {
                  <ResearchCard
                    userResearch={
                      this.props.user &&
                      this.props.research.researchSearchResult
                        ? this.props.research.researchSearchResult
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
                }
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

export default withRouter(connect(mapStateToProps)(ResearchSearch));
