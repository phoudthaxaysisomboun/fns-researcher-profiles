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
import { getAuthorSuggestions } from "../../actions/user_actions";

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
    publicationType: {},
    files: null,
    linkPreview: null,
    link: "",
    publicationTypes: []
  };

  componentDidMount() {
    document.title = "ເພີ່ມຜົນງານຄົ້ນຄວ້າ - FNS Researcher Profiles";
    this.props.dispatch(getResearchType()).then(() => {
      const query = queryString.parse(this.props.location.search);
      const type = query.publicationType
        ? query.publicationType
        : this.props.research.researchType[0];
      this.setState({
        publicationType: this.props.research.researchType[0],
        publicationTypes: this.props.research.researchType
      });

      this.props.research.researchType.map((item, index) => {
        if (item.englishName === type) {
          console.log(item);
          return this.setState({ publicationType: item });
        } else {
          return null;
        }
      });
    });

    this.props.dispatch(getAuthorSuggestions()).then(payload => {
      console.log();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.history !== this.props.history) {
    }
  }

  switchPage = page => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ page, loading: false });
    }, 400);

    // setTimeout(() => {
    //   this.setState({
    //     loading: true
    //   });
    // }, 2000).then(()=> {
    //   this.setState({ page, loading: false });
    // })
  };

  setFilesData = files => {
    this.setState({ files });
    console.log(files);
  };

  setLinkData = (linkPreview, link) => {
    this.setState({ linkPreview, link });
    console.log(linkPreview);
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
          <Grow in={this.state.loading} 
          style={{ transitionDelay: "5000ms" }}
          
          >
            <AddResearchFile
              switchPage={page => this.switchPage(page)}
              setFilesData={files => this.setFilesData(files)}
              setLinkData={(linkPreview, link) =>
                this.setLinkData(linkPreview, link)
              }
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
            in={this.state.page !== "index"}
            
            style={{ transitionDelay: "5000ms" }}
          >
            <AddPublicationDetails
              user={
                this.props && this.props.user && this.props.user.userData
                  ? this.props.user.userData
                  : {}
              }
              switchPage={page => this.switchPage(page)}
              setFilesData={files => this.setFilesData(files)}
              setLinkData={(linkPreview, link) =>
                this.setLinkData(linkPreview, link)
              }
              publicationType={this.state.publicationType}
              publicationTypes={this.state.publicationTypes}
              linkPreview={this.state.linkPreview}
              files={this.state.files}
              link={this.state.link}
              authorSuggestions={
                this.props.user.authorSuggestions
                  ? this.props.user.authorSuggestions
                  : null
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

    return (
      <div className={classes.mainContainer}>
        {
          this.state.loading ? this.loading() : null
        } 
        {this.renderPage()}
      </div>
    );
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
