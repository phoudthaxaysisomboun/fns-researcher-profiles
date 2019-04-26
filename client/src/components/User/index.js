import React, { Component } from "react";
import ProfileHeader from "../../hoc/profile_header";
import { connect } from "react-redux";

import AffiliationCard from "../User/Card/affiliation";

import {
  FormControl,
  FormLabel,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  RadioGroup,
  Grid,
  Fab,
  Radio,
  FormControlLabel,
  Paper,
  Avatar,
  Button,
  FormHelperText,
  Tabs,
  Tab,
  Link,
  Typography,
  withWidth
} from "@material-ui/core";

import {
  getProfileDetail,
  clearProfileDetail
} from "../../actions/user_actions";

class ProfileOverview extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.dispatch(getProfileDetail(id));
    console.log(this.props);
  }

  componentWillUnmount() {
    this.props.dispatch(clearProfileDetail());
  }

  render() {
    return (
      <ProfileHeader {...this.props}>
        <Grid
          container
          spaciing={24}
          style={{ margin: "16px", marginTop: "26px" }}
        >
        <Grid item xs></Grid>
          <Grid item xs={4} style = {{marginRight: "8px"}}>
            <Paper>
              <Typography variant="inherit">test</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} style = {{marginLeft: "8px"}}>
            <AffiliationCard {...this.props} />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </ProfileHeader>
    );
  }
}

const mapStateToProps = state => {
  return {
    userDetail: state.user
  };
};

export default connect(mapStateToProps)(ProfileOverview);
