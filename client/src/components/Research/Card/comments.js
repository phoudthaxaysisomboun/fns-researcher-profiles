import React from "react";
import AutoLinkText from "react-autolink-text2";
import ReactTextFormat from "react-text-format";

import LinesEllipsis from "react-lines-ellipsis";

import NumberFormat from "react-number-format";
import {UPLOADS_SERVER} from "../../../components/utils/misc"

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Avatar,
  CircularProgress
} from "@material-ui/core";

import {
  EditOutlined,
  CheckOutlined,
  PersonAddOutlined,
  ReplyOutlined
} from "@material-ui/icons";

import { colorPallete } from "../../utils/misc";

import { Link } from "react-router-dom";

String.prototype.toColor = function() {
  var colors = colorPallete;

  var hash = 0;
  if (this.length === 0) return hash;
  for (var i = 0; i < this.length; i++) {
    hash = this.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
};

const CommentsCard = ({ comments, user }) => {

  return (
    <Grid item xs={12}>
    
      {comments ? (
        <>
          {comments.map((value, index, array) => (
            <Grid item>
            {console.log(value)}
            <Paper
            style={{
              boxShadow: "none",
              border: "none",
              marginTop: "16px"
            }}
          >
            <Grid container spacing={0} style={{ padding: "16px" }}>
              <Grid
                item
                align="center"
                style={{ marginRight: "16px", width: "54px" }}
              >
                <Link
                  to={`/profile/${value._id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                {
                    value.user.profileImage && value.user.profileImage[0] && value.user.profileImage[0].name ?
                  <Avatar
                  src={`${UPLOADS_SERVER}/images/${value.user.profileImage[0].name}`}
                  alt="profile image"
                  style={{
                    width: "46px",
                    height: "46px",
                    borderStyle: "solid",
            borderColor: "#CFCECE",
            borderWidth: "1px"
                  }}
                >
                  
                </Avatar>
                  : 
                  <Avatar
                  alt="profile image"
                  style={{
                    width: "46px",
                    height: "46px",
                    backgroundColor: `${`${value.user.name}${
                        value.user.lastname
                    }`.toColor()}`,
                    fontFamily: "'Noto Sans Lao UI', sans serif",
                    fontWeight: "500"
                  }}
                >
                <Typography variant="inherit">
                {`${value.user.name.charAt(0)}${value.user.lastname.charAt(0)}`}
                </Typography>
                  
                </Avatar>
                }
                  
                </Link>
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item xs>
                    <Link
                      to={`/profile/${value.user._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        style={{
                          fontWeight: "normal",
                          color: "#404040",
                          fontSize: "16px"
                        }}
                        variant="inherit"
                      >
                        {value.user.name} {value.user.lastname}
                      </Typography>

                     
                      </Link>
                      <Grid
                        container
                        alignItems="flex-end"
                        style={{ marginTop: "16px" }}
                      >
                        <Grid item xs={8} align="left">

                          
                        </Grid>
                        <Grid item xs align="right">
                        
                          
                        </Grid>
                      </Grid>
                    
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
            </Grid>
          ))}
        </>
      ) : 
    
    <Grid item>
    <Paper
        style={{
          boxShadow: "none",
          border: "none",
          marginTop: "16px",
          padding: "16px",
      
        }}
      >
        <Grid container alignContent="center" alignItems="center" justify="center">
          <Grid item align="center">
          <CircularProgress style={{padding: "24px"}} />
          </Grid>
        </Grid>


      </Paper>
    </Grid>
    }
    </Grid>
  );
};

export default CommentsCard;
