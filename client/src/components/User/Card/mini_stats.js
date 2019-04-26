import React from "react";

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

import { EditOutlined } from "@material-ui/icons";

const MiniStatsCard = props => {
  console.log(props);
  return (
    <div>
      <Paper>
        <Grid container spacing={8} style={{ padding: "16px" }} >
            <Grid item xs={4}>
                <Grid container >
                <Grid item xs={12}>
                
                </Grid>
                <Grid item xs={12}>
                
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MiniStatsCard;
