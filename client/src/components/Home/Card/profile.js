import React from "react";
import AutoLinkText from "react-autolink-text2";
import ReactTextFormat from "react-text-format";
import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";

const renderNoData = () => {
  return <LinearProgress style={{ margin: "16px" }} />;
};
const ProfileCard = () => {
  return (
    <Grid item xs={12}>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8", marginTop: "16px" }}>
      efdsf
      </Paper>
    </Grid>
  );
};

export default ProfileCard;
