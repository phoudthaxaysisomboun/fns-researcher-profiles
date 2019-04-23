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
  Radio,
  FormControlLabel,
  Paper,
  Avatar,
  Button,
  FormHelperText,
  Tabs,
  Tab,
  Typography
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const ProfileHeader = props => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={2}>
                  <Avatar
                    alt="Remy Sharp"
                    src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h4">Test</Typography>

                  <Typography variant="h7">Test</Typography>
                  <Typography variant="body">Test</Typography>
                  <Typography variant="body">Test</Typography>
                  <Typography variant="body">Test</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Button variant="contained" color="secondary">
                    <DeleteIcon />
                    Delete
                  </Button>
                  <Button variant="contained" color="secondary">
                    <DeleteIcon />
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Item One" />
                <Tab label="Item Two" />
                <Tab label="Item Three" />
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {props.children}
    </Grid>
  );
};

export default ProfileHeader;
