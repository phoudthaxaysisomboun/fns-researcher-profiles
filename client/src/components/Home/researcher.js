import React, { Component } from "react";
import SearchHeader from "../../hoc/search_header";

import { connect } from "react-redux";

import queryString from 'query-string'

import { Grid } from "@material-ui/core";

import ProfileCard from "../Home/Card/profile"

import {withRouter} from "react-router-dom"

import {
    getProfileAndResearchCount,
    searchProfiles,
    clearSearchProfiles
  } from "../../actions/user_actions";

class ResearcherSearch extends Component {
  componentDidMount() {
    document.title = "FNS Researcher Profiles";
  }

  state = {
      search: '',
  }

  componentWillMount() {
    
    const query = queryString.parse(this.props.location.search)
    this.setState({
      search: query.q
    })
    const search = query.q
    this.props.dispatch(searchProfiles(search))
    console.log(query.q)
      this.props.dispatch(getProfileAndResearchCount()).then(response => {
          console.log(response.payload)
      })
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearchProfiles())
  }

  handleTextChange = (value) => {
    this.setState({
        search: value
    });
    console.log(this.state.search)
  };

  handleSearchButtonClick() {
    if (this.state.search.trim() !== "") {
      this.props.history.push(`/search/researchers?q=${this.state.search}`)

    }
  }

  handleClearText = () => {
    this.setState({
        search: ""
    });
    console.log(this.state.search)
  };

  render() {
    return (
      <>
        <SearchHeader children={this.props.children} researchCount={this.props.user.researchCount} profileCount={this.props.user.profileCount} searchTerm = {this.state.search} handleSearchTextChange={value => this.handleTextChange(value)} clearText={()=> this.handleClearText()} performSearch={()=>this.handleSearchButtonClick()}>
          <Grid container>
            <Grid item xs sm={2} lg={4} md={3} />
            <Grid item xs={10} sm={8} lg={4} md={6}>
              <Grid container justify="center" >
              {
                 < ProfileCard resercher = {this.props.user && this.props.user.profilesSearchResult ? this.props.user.profilesSearchResult : null} />
              }

              {
                console.log(this.props.user.profilesSearchResult)
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

export default withRouter(connect(mapStateToProps)(ResearcherSearch));
