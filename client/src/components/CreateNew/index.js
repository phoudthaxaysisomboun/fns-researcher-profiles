import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import AddResearchFile from '../CreateNew/add_file'
import AddPublicationDetails from '../CreateNew/add_details'

const styles = theme => ({
  mainContainer: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 240
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0
    }
  },
  container: {
    padding: "26px",
    border: "1px solid #dadce0",
    maxWidth: "480px",
    marginLeft: "auto",
    marginRight: "auto"
    // padding: 0
  },
  title: {
    // fontFamily: "'Noto Sans Lao UI', sans-serif",
    fontWeight: "500",
    // textAlign: "center",
    fontSize: "1.75rem",
    marginBottom: 24
  }
});


class CreateResearch extends Component {

  state = {
    page: 'index'
  }

  switchPage = (page) => {
    this.setState({page})
    console.log(page)
  }

  renderPage = () => {
    switch(this.state.page) {
      case 'index': {
        return (
          <AddResearchFile switchPage={(page)=> this.switchPage(page)}/>
        )
      }
      case 'details': {
        return (
          <AddPublicationDetails />
        )
      }
      default: {
        return (
          <AddResearchFile />
        )
      }
    }
    
  }


  

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
      {this.renderPage()}
        
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true })
  // withWidth(),
);

export default enhance(CreateResearch);
