import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import AddResearchFile from "../CreateNew/add_file";
import AddPublicationDetails from "../CreateNew/add_details";

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
    page: "index"
  };

  componentDidMount() {
    document.title = "ເພີ່ມຜົນງານຄົ້ນຄວ້າ - FNS Researcher Profiles";
  }

  switchPage = page => {
    this.setState({ page });
    console.log(page);
  };

  renderPage = () => {  
    switch (this.state.page) {
      case "index": {
        return (
          <AddResearchFile
            switchPage={page => this.switchPage(page)}
            user={
              this.props && this.props.user && this.props.user.userData
                ? this.props.user.userData
                : {}
            }
          />
        );
      }
      case "details": {
        return <AddPublicationDetails />;
      }
      default: {
        return <AddResearchFile />;
      }
    }
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.mainContainer}>{this.renderPage()}</div>;
  }
}

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true })
);

export default enhance(CreateResearch);
