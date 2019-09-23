import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

import AddResearchFile from "../CreateNew/add_file";
import AddPublicationDetails from "../CreateNew/add_details";

import Grow from "@material-ui/core/Grow";
import { getResearchType } from "../../actions/research_actions";
import { connect } from "react-redux";
import queryString from "query-string";

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
    loading: false,
    publicationType: {}
  };

  componentDidMount() {
    document.title = "ເພີ່ມຜົນງານຄົ້ນຄວ້າ - FNS Researcher Profiles";
    this.props.dispatch(getResearchType()).then(()=>{
      const query = queryString.parse(this.props.location.search);
      const type = query.publicationType
        ? query.publicationType
        : this.props.research.researchType[0].englishName;
      this.props.research.researchType.map((item, index) => {
        if (item.englishName === type) {
          console.log(item);
           this.setState({ publicationType: item });
           return null
        } else {
          console.log(this.props.research.researchType[0]);
           this.setState({
            publicationType: this.props.research.researchType[0]
          });
          return null
        }
      });
    })
  }

  componentDidUpdate(prevProps, prevState) {
   
    if (prevProps.history !== this.props.history) {
      
    }
  }

  switchPage = page => {
    setTimeout(() => {
      this.setState({
        loading: true
      });
    }, 2000);
    this.setState({ page, loading: false });
  };

  showLoading = () => {
    this.setState({ loading: true });
  };

  stopLoading = () => {
    this.setState({ loading: false });
  };
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
        return (
          <Grow
            in={this.state.page === "details"}
            style={{ transformOrigin: "0 0 0" }}
            {...(this.state.page === "details" ? { timeout: 1000 } : {})}
          >
            <AddPublicationDetails user={
              this.props && this.props.user && this.props.user.userData
                ? this.props.user.userData
                : {}
            }
            
            publicationType={
            this.state.publicationType
            }
            />
          </Grow>
        );
      }
      default: {
        return <AddResearchFile />;
      }
    }
  };

  loading = () => {
    return (
      <div className="loading">
        <CircularProgress className="loader" />
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.mainContainer}>{this.renderPage()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    null
  )
);

export default enhance(CreateResearch);
