import React from "react";

import { Link as ReactLink, withRouter } from "react-router-dom";

import NumberFormat from "react-number-format";

import LinesEllipsis from "react-lines-ellipsis";

import moment from "moment";

import {
  Grid,
  Paper,
  Avatar,
  Divider,
  Link,
  Button,
  Typography,
  IconButton,
  LinearProgress,
  Chip,
  Fab
} from "@material-ui/core";

import {
  CheckOutlined,
  ListOutlined,
  PersonAddOutlined,
  CommentOutlined,
  ModeCommentOutlined,
  ReplyOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  MoreVertOutlined,
  AddOutlined
} from "@material-ui/icons";

const EducationCard = ({ userData, userDetail, loading }) => {
  const user = { ...userData };
  const profile = { ...userDetail };


  const isAuth = user.isAuth;
  let isOwner = false;

  if (isAuth) {
    if ((userData._id === profile._id) || user.isAdmin) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = () => (
    <Grid item xs={12}>
      {true ? (
        <div>
          
          <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container style={{padding: "16px", paddingBottom: 0}}>
            <Grid item xs={8}>
              <Typography
                variant="inherit"
                style={{
                  fontSize: "1.375rem",
                  marginBottom: "8px",
                  fontWeight: "bold"
                }}
              >
                ການສຶກສາ
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
            {
              !loading && (isOwner || user.isAdmin) ? 
              
              <IconButton style={{padding: "0px"}}>
              <AddOutlined fontSize="default" />
              </IconButton >
              : null
            }
            </Grid>
          </Grid>
            
          </Paper>
        </div>
      ) : (
        <Grid item xs={12}>
          
          <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container style={{padding: "16px", paddingBottom: 0}}>
            <Grid item xs={8}>
              <Typography
                variant="inherit"
                style={{
                  fontSize: "1.375rem",
                  marginBottom: "8px",
                  fontWeight: "bold"
                }}
              >
                ການສຶກສາ
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
            {
              !loading && (isOwner || user.isAdmin) ? 
              
              <IconButton style={{padding: "0px"}}>
              <AddOutlined fontSize="default" />
              </IconButton >
              : null
            }
            </Grid>
          </Grid>
          <div style={{ margin: "20px" }}>
          <Typography variant="inherit" align="center">
            ຍັງບໍ່ມີການສຶກສາເທື່ອ
          </Typography>
        </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  );

  const renderNoData = () => {
    return (
      <Grid item xs={12}>
        
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <Grid container style={{padding: "16px", paddingBottom: 0}}>
            <Grid item xs={8}>
              <Typography
                variant="inherit"
                style={{
                  fontSize: "1.375rem",
                  marginBottom: "8px",
                  fontWeight: "bold"
                }}
              >
                ການສຶກສາ
              </Typography>
            </Grid>
            
          </Grid>
        <LinearProgress style={{ margin: "16px" }} />
        </Paper>
      </Grid>
    );
  };

  return !userDetail ? renderNoData() : renderItems();
};

export default withRouter(EducationCard);
