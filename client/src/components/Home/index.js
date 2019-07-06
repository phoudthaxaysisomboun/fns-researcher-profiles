import React, { Component } from "react";
import SearchHeader from "../../hoc/search_header";

import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import { getProfileAndResearchCount } from "../../actions/user_actions";

class Home extends Component {
  componentDidMount() {
    document.title = "FNS Researcher Profiles";
  }

  state = {
    search: "",
    tabValue: 0
  };

  handleChangeTab (value) {
    this.setState({
      tabValue: value
    })
  }

  componentWillMount() {
    console.log(this.props.location);
    this.props.dispatch(getProfileAndResearchCount()).then(response => {
      console.log(response.payload);
    });
  }

  handleTextChange = value => {
    this.setState({
      search: value
    });
    console.log(this.state.search);
  };

  handleClearText = () => {
    this.setState({
      search: ""
    });
    console.log(this.state.search);
  };

  handleToggleResearchTab() {
    this.props.history.push(`/search/researches?q=${this.state.search}`);
    
    
  }

  handleSearchButtonClick () {
    if (this.state.tabValue === 0){
      this.props.history.push(`/search/researchers?q=${this.state.search}`);
    } else {
      this.props.history.push(`/search/researches?q=${this.state.search}`);
    }
  }

  handleToggleResearcherTab() {
    this.props.history.push(`/search/researchers?q=${this.state.search}`);
  }

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
          tabValue ={this.state.tabValue}
          changeToResearcher = {()=>this.handleChangeTab(0)}
          changeToResearch = {()=>this.handleChangeTab(1)}
          performSearch={() => this.handleSearchButtonClick()}
        >
          <Grid container>
            <Grid item xs sm lg md />
            <Grid item xs={11} sm={11} lg={5} md={8}>
              <Grid container justify="center">
              <Grid item style={{marginTop: "32px"}}>
             <SearchOutlined style={{top: "6px", position: "relative"}}/> ພິມຫົວຂໍ້ຜົນງານ ຊື່ນັກຄົ້ນຄວ້າ ເພື່ອຄົ້ນຫານັກຄົ້ນຄວ້າ ຫລື ຜົນງານການຄົ້ນຄວ້າທີ່ຕ້ອງການ
              </Grid>
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
  console.log(state);
  return {
    user: state.user,
    research: state.research
  };
};

export default connect(mapStateToProps)(Home);
