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

const IntroductionCard = ({props, openEditDialog}) => {
  const profile = { ...props.user.userDetail };
  const user = { ...props.user.userData };

  const isAuth = user.isAuth;
  var isOwner = false;

  if (isAuth || user.isAdmin) {
    if (user._id === profile._id || user.isAdmin) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = () => {
    return (
      
        isOwner ?
        <Grid item xs={12}>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
            <Grid item xs={6}>
              <Typography
                variant="inherit"
                style={{
                  fontSize: "1.375rem",
                  marginBottom: "8px",
                  fontWeight: "bold"
                }}
              >
                ແນະນໍາ
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              {props.user.userDetail && (isOwner || user.isAdmin) ? (
                <IconButton style={{ padding: 0 }}>
                  <EditOutlined onClick={()=>{openEditDialog()}} fontSize="small" />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
          <Grid container style={{ padding: "16px" }}>
            {props.user.userDetail.profileDescription.trim() !== "" ? (
              <Typography variant="inherit">
                <AutoLinkText text={profile.profileDescription} />
              </Typography>
            ) : (
              <>
                {isOwner ? (
                  <Typography
                    variant="inherit"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      color: "rgb(137, 137, 137)"
                    }}
                  >
                    ຍັງບໍ່ມີຂໍ້ມູນເທື່ອຄລິກປຸມ່ແກ້ໄຂດ້ານເທິງເພື່ອເພີ່ມຂໍ້ມູນ
                  </Typography>
                ) : null}
              </>
            )}
          </Grid>
        </Paper>
      </Grid>
      : <>
      {
        props.user.userDetail.profileDescription.trim() !== "" ?
        <Grid item xs={12}>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
            <Grid item xs={6}>
              <Typography
                variant="inherit"
                style={{
                  fontSize: "1.375rem",
                  marginBottom: "8px",
                  fontWeight: "bold"
                }}
              >
                ແນະນໍາ
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              
            </Grid>
          </Grid>
          <Grid container style={{ padding: "16px" }}>
          <Typography variant="inherit">
          <AutoLinkText text={profile.profileDescription} />
        </Typography>
          </Grid>
        </Paper>
      </Grid> : null
      }
      </>
      
    );
  };

  const renderNoData = () => {
    return (
      <Grid item xs={12}>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
            <Grid item xs={6}>
              <Typography
                variant="inherit"
                style={{
                  fontSize: "1.375rem",
                  marginBottom: "8px",
                  fontWeight: "bold"
                }}
              >
                ແນະນໍາ
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              {props.user.userDetail && (isOwner || user.isAdmin) ? (
                <IconButton onClick={()=>{openEditDialog()}} style={{ padding: 0 }}>
                  <EditOutlined fontSize="small" />
                </IconButton>
              ) : null}
            </Grid>
          </Grid>
          <LinearProgress style={{ margin: "16px" }} />
        </Paper>
      </Grid>
    );
  };

  return props.user.userDetail ? renderItems() : renderNoData();
};

export default IntroductionCard;
