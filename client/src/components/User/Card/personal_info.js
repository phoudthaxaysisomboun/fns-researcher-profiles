import React from "react";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";

const PersonalInfoCard = props => {
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
      
      <Grid container spacing={8} style={{ padding: "16px" }}>
      <Typography variant="inherit">
        {profile.profileDescription}
      </Typography>
    </Grid>
    )
  }

  const renderNoData = () => {
    return (
      <LinearProgress style={{margin: "16px"}} />
    )
  }

  return (
    
    <Grid item xs={12}>
    
    <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
    <Grid container style={{padding: "16px", paddingBottom: 0}}>
      <Grid item xs={6}>
        <Typography
          variant="inherit"
          style={{
            fontSize: "1.375rem",
            marginBottom: "8px",
            fontWeight: "bold"
          }}
        >
        ຂໍ້ມູນສ່ວນຕົວ
        </Typography>
      </Grid>
      <Grid item xs={6} align="right">
        {isOwner ? (
          <IconButton style={{ padding: "4px" }}>
            <EditOutlined fontSize="small" />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
    {props.user.userDetail ? renderItems() : renderNoData()}
      
    </Paper>
  </Grid>

  );
};

export default PersonalInfoCard;
