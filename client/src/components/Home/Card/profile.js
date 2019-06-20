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

const renderNoData = () => {
  return <LinearProgress style={{ margin: "16px" }} />;
};

const ProfileCard = ({ resercher, user, runFollow,runUnfollow }) => {
  const renderResearchArea = (id, researchArea) => {
    let researchArealabel = [];
    let list = "";
    researchArea.map((value, index, array) => {
      researchArealabel.push(value.label);
    });
    list = researchArealabel.join(" • ");
    console.log(list);
    return (
      <Typography
                          variant="inherit"
                          style={{ fontSize: "13px", color: "#686868" }}
                        >
      <LinesEllipsis
            text={list}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"

          />
          </Typography>
    )
  };

  const renderFollowButton = id => {
    if (user.isAuth) {
    let duplicate = false;
    user.following.forEach(item => {
      if (item._id === id) {
        duplicate = true;
      }
    });

    if (id === user._id) {
      return <div />;
    }

    
      if (duplicate) {
        return (
       
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{marginRight: "8px"}}
              onClick={() => {
                runUnfollow(id);
              }}
            >
              <CheckOutlined style={{ marginRight: "8px" }} />
              ຕິດຕາມຢູ່
            </Button>
    
        );
      } else {
        return (
          
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                runFollow(id);
              }}
              style={{marginRight: "8px"}}
            >
              <PersonAddOutlined style={{ marginRight: "8px" }} />
              ຕິດຕາມ
            </Button>
         
        );
      }
    }
  };

  return (
    <Grid item xs={12}>
      {console.log(resercher)}
      {resercher ? (
        <>
          {resercher.map((value, index, array) => (
            <Grid item>
              <Paper
                style={{
                  boxShadow: "none",
                  border: "1px solid #d8d8d8",
                  marginTop: "16px        "
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
                      value.profileImage && value.profileImage[0] && value.profileImage[0].name ?
                      <Avatar
                      src={`${UPLOADS_SERVER}/images/${value.profileImage[0].name}`}
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
                        backgroundColor: `${`${value.name}${
                          value.lastname
                        }`.toColor()}`,
                        fontFamily: "'Noto Sans Lao UI', sans serif",
                        fontWeight: "500"
                      }}
                    >
                    <Typography variant="inherit">
                    {`${value.name.charAt(0)}${value.lastname.charAt(0)}`}
                    </Typography>
                      
                    </Avatar>
                    }
                      
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <Grid container>
                      <Grid item xs>
                        <Link
                          to={`/profile/${value._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            style={{
                              fontWeight: "bold",
                              color: "#404040",
                              fontSize: "18px"
                            }}
                            variant="inherit"
                          >
                            {value.prefix} {value.name} {value.lastname}
                          </Typography>

                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "14px",
                              color: "#4c4c4c",
                              display: "inline",
                              fontWeight: 500
                            }}
                          >
                            {value.affiliation.institution.name} •{" "}
                            {value.affiliation.faculty.name} •{" "}
                            {value.affiliation.department.name}
                          </Typography>
                          {value.researchArea &&
                          value.researchArea.length > 0 ? (
                            <>
                              <Typography
                                variant="inherit"
                                style={{
                                  fontWeight: "600",
                                  color: "#4c4c4c",
                                  fontSize: "15px",
                                  marginTop: "4px"
                                }}
                              >
                                ຂົງເຂດການຄົ້ນຄວ້າ
                              </Typography>
                              <>
                                {renderResearchArea(
                                  value._id,
                                  value.researchArea
                                )}
                              </>
                            </>
                          ) : null}
                          </Link>
                          <Grid
                            container
                            alignItems="flex-end"
                            style={{ marginTop: "16px" }}
                          >
                            <Grid item xs={8} align="left">
                            {renderFollowButton(value._id)}

                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  console.log("click");
                                }}
                              >
                                <ReplyOutlined
                                  style={{ marginRight: "8px", transform: "rotateY(180deg)" }}
                                />
                                ແບ່ງປັນ
                              </Button>
                            </Grid>
                            <Grid item xs align="right">
                            {
                              value.research && value.research.length > 0 ?
                              <>
                              <div
                              style={{
                                fontSize: "14px",
                                color: "#757575",
                                fontFamily: "'Roboto', sans serif",
                                display: "inline",
                                fontWeight: "500"
                              }}
                            >
                              &nbsp;
                              <NumberFormat
                                value={
                                  value.research && value.research.length
                                    ? value.research.length
                                    : 0
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                              &nbsp;
                            </div>
                            <span
                              style={{ fontSize: "14px", color: "#757575" }}
                            >
                              ຜົນງານຄົ້ນຄວ້າ
                            </span>
                              </>: null
                            }
                              
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
          border: "1px solid #d8d8d8",
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

export default ProfileCard;
