import React, { Component } from "react";
import SearchHeader from "../../hoc/search_header";

import { connect } from "react-redux";

import { Grid } from "@material-ui/core";

import ProfileCard from "../Home/Card/profile"

import {
    getProfileAndResearchCount
  } from "../../actions/user_actions";

class Home extends Component {
  componentDidMount() {
    document.title = "FNS Researcher Profiles";
  }

  state = {
      search: '',
  }

  componentWillMount() {
      this.props.dispatch(getProfileAndResearchCount()).then(response => {
          console.log(response.payload)
      })
  }

  handleTextChange = (value) => {
    this.setState({
        search: value
    });
    console.log(this.state.search)
  };

  handleClearText = () => {
    this.setState({
        search: ""
    });
    console.log(this.state.search)
  };

  render() {
    return (
      <>
        <SearchHeader children={this.props.children} researchCount={this.props.user.researchCount} profileCount={this.props.user.profileCount} searchTerm = {this.state.search} handleSearchTextChange={value => this.handleTextChange(value)} clearText={()=> this.handleClearText()}>
          <Grid container>
            <Grid item xs sm={2} lg={4} md={3} />
            <Grid item xs={10} sm={8} lg={4} md={6}>
              <Grid container justify="center" >
               < ProfileCard />
          
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
    console.log(state)
    return {
        user: state.user,
        research: state.research
      };
  };

export default connect(mapStateToProps)(Home);
