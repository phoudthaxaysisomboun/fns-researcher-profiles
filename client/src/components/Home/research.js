import React, { Component } from "react";
import SearchHeader from "../../hoc/search_header";

import { connect } from "react-redux";

import queryString from "query-string";

import { Grid } from "@material-ui/core";

import ResearchCard from "../Home/Card/research";

import { withRouter } from "react-router-dom";

import { getProfileAndResearchCount } from "../../actions/user_actions";

import {
  searchResearches,
  clearSearchResearches
} from "../../actions/research_actions";

class ResearchSearch extends Component {
  componentDidMount() {
    document.title = "FNS Researcher Profiles";
  }

  state = {
    search: ""
  };

  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
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
          tabValue = {1}
          changeToResearcher = {()=>this.handleToggleResearcherTab()}
          changeToResearch = {()=>this.handleToggleResearchTab()}
        >
          <Grid container>
            <Grid item xs sm={2} lg={4} md={3} />
            <Grid item xs={10} sm={8} lg={4} md={6}>
              <Grid container justify="center">
              {
                  console.log(this.props.research)
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
                  />
                }
              </Grid>
            </Grid>
            <Grid item xs sm={2} lg={4} md={3} />
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
