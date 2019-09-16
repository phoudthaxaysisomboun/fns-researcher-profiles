import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import AddResearchFile from "../CreateNew/add_file";
import AddPublicationDetails from "../CreateNew/add_details";

import Grow from '@material-ui/core/Grow';

const styles = theme => ({
  mainContainer: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 240
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 0
    },
    borderTop: "1px solid #dadce0"
  }
});

class CreateResearch extends Component {
  state = {
    page: "index",
    loading: false
  };

  componentDidMount() {
    document.title = "ເພີ່ມຜົນງານຄົ້ນຄວ້າ - FNS Researcher Profiles";
  }

  switchPage = page => {
    setTimeout(() => {
      this.setState({
        loading: true
    })
  }, 2000)
    this.setState({ page, loading: false });
  };

  showLoading = () => {
    this.setState({ loading: true });
  }

  stopLoading = () => {
    this.setState({ loading: false });
  }
  renderPage = () => {  
    switch (this.state.page) {
      case "index": {
        return (
          <Grow in={this.state.page === "index"}>
          <AddResearchFile
            switchPage={page => this.switchPage(page)}
            user={
              this.props && this.props.user && this.props.user.userData
                ? this.props.user.userData
                : {}
            }
          />
          </Grow>
        );
      }
      case "details": {
        return<Grow in={this.state.page === "details"} style={{ transformOrigin: '0 0 0' }}
        {...(this.state.page === "details" ? { timeout: 1000 } : {})}>
         <AddPublicationDetails />
        </Grow>
      }
      default: {
        return <AddResearchFile />;
      }
    }
  };

  loading = () => {
    return (
      <div className = "loading">
      <CircularProgress className="loader"/>
      </div>
    )
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.mainContainer}>
    {this.renderPage()}
    </div>;
  }
}

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true })
);

export default enhance(CreateResearch);
