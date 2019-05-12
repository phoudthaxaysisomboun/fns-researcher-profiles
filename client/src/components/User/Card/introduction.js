import React from "react";
import AutoLinkText from "react-autolink-text2";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";

const IntroductionCard = props => {
  const profile = { ...props.user.userDetail };
  const user = { ...props.user.userData };

  const isAuth = user.isAuth;
  var isOwner = false;

  if (isAuth) {
    if (user._id === profile._id) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = () => {
    return (
      profile.profileDescription ?
      <Grid item xs={12}>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "20px",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            ແນະນໍາ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          {isOwner ? (
            <IconButton style={{ padding: "4px", margin: "4px" }}>
              <EditOutlined fontSize="small" />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
      <Grid container spacing={8} style={{ padding: "16px" }}>
      <Typography variant="inherit">
        <AutoLinkText text={profile.profileDescription} />
      </Typography>
    </Grid>
      </Paper>
    </Grid>
    : null
    )
  }

  const renderNoData = () => {
    return (
      <Grid item xs={12}>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "20px",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            ແນະນໍາ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          {isOwner ? (
            <IconButton style={{ padding: "4px", margin: "4px" }}>
              <EditOutlined fontSize="small" />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <LinearProgress style={{margin: "16px"}} />
      </Paper>
    </Grid>
    )
  }

  return (
    props.user.userDetail ? renderItems() : renderNoData()
  );
};

export default IntroductionCard;
