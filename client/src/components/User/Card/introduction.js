import React from "react";
import AutoLinkText from 'react-autolink-text2';

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
  EditOutlined,
  InsertDriveFileOutlined,
  RemoveRedEyeOutlined,
  ForwardOutlined
} from "@material-ui/icons";

const iconStyles = {
  position: "relative",
  top: "5px",
  marginRight: "4px",
  width: "20px",
  width: "20px"
};

const IntroductionCard = props => {
  const profile = {...props.user.userDetail}
  const user = {...props.user.userData}

  const isAuth = user.isAuth
  var isOwner = false
  
  if (isAuth) {
    if (user._id === profile._id) {
      isOwner = true
    } else {
      isOwner = false
    }
  }

    return (
      <div>
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
          {
            isOwner ? 
            <IconButton style={{ padding: "4px", margin: "4px" }}>
              <EditOutlined fontSize="small" /> 
            </IconButton>
            : null
          }
          </Grid>
        </Grid>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container spacing={8} style={{ padding: "16px" }} >
              <Typography variant="inherit">
              < AutoLinkText text={profile.profileDescription} />
              </Typography>
          </Grid>
        </Paper>
      </div>
    );

};

export default IntroductionCard;
