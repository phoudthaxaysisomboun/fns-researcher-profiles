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
  Fab,
  Menu,
  MenuItem,
  MenuList
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
  AddOutlined,
  EditOutlined,
  DeleteOutline
} from "@material-ui/icons";

const EducationCard = ({
  userData,
  userDetail,
  runAddEducation,
  handleClick,
  handleClose,
  anchorEl,
  runDelete,
  runEdit
}) => {
  const user = { ...userData };
  const profile = { ...userDetail };

  const isAuth = user.isAuth;
  let isOwner = false;

  if (isAuth) {
    if (userData._id === profile._id || user.isAdmin) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = () => {
    if (isOwner) {
      return (
        <>
          <Grid item xs={12}>
            {profile.education[0] ? (
              <div>
                <Menu
                  className="menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  
                  onClose={event => {
                    handleClose(event);
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
             
                >
                  <MenuItem
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans-serif",
                      fontWeight: 500,
                     
                    }}
                  onClick={()=>{runEdit()}}
                    selected ={false}
                  >
                    {" "}
                    <EditOutlined style={{ marginRight: "16px" }} /> ແກ້ໄຂ
                  </MenuItem>

                  <MenuItem
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans-serif",
                      fontWeight: 500,
                      
                    }}
                    selected ={false}
                    onClick={()=>{runDelete()}}
                  >
                    <svg
                      style={{ marginRight: "16px" }}
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="#212121"
                      focusable="false"
                      class="a-s-fa-Ha-pa"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
                      <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
                    </svg>
                    ລຶບ
                  </MenuItem>

                  <MenuItem 
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans-serif",
                      fontWeight: 500,
                      display: "none"
                    }}
                    selected ={true}
                  ></MenuItem>
                </Menu>
                <Paper
                  style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}
                >
                  <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
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
                      <IconButton
                        style={{ padding: "0px" }}
                        onClick={() => {
                          runAddEducation();
                        }}
                      >
                        <AddOutlined fontSize="default" />
                      </IconButton>
                    </Grid>
                  </Grid>

                  {profile.education.map((value, index, array) => (
                    <>
                      <Grid container style={{ padding: "8px" }} wrap="nowrap">
                        <Grid
                          item
                          xs={6}
                          style={{ paddingTop: "8px", paddingLeft: "8px" }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontFamily: "'Roboto', sans-serif",
                              fontSize: "0.9rem",
                              letterSpacing: "1.5 px",
                              fontWeight: "600",
                              color: "#00695C"
                            }}
                          >
                          {value.start === value.end ? 
                            moment(value.start).format("YYYY") :
                            <>{moment(value.start).format("YYYY")} - {moment(value.end).format("YYYY")}</>
                          }
                          
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          align="right"
                          style={{
                            paddingRight: "4px",
                            objectFit: "contain"
                          }}
                        >
                          <IconButton
                            style={{ padding: 0 }}
                            onClick={event => {
                              handleClick(event, value._id);
                            }}
                          >
                            <MoreVertOutlined fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        style={{ padding: "16px", paddingTop: 0 }}
                      >
                        <Grid item xs={12}>
                          <LinesEllipsis
                            text={value.fieldOfStudy}
                            maxLine="2"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                            style={{ fontSize: "19px", fontWeight: "500" }}
                          />
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: "4px" }}>
                          <LinesEllipsis
                            text={value.degree}
                            maxLine="2"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              color: "#4c4c4c"
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} style={{ paddingTop: "4px" }}>
                          <LinesEllipsis
                            text={value.city.trim() !== "" ? `${value.institution} • ${
                              value.city
                            } • ປະເທດ${value.country.laoName.trim()}` : `${value.institution} • ປະເທດ${value.country.laoName.trim()}`}
                            maxLine="3"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                            style={{
                              fontSize: "14px",
                              fontWeight: "normal",
                              color: "#666666"
                            }}
                          />
                        </Grid>
                      </Grid>
                      {index !== array.length - 1 ? <Divider /> : null}
                    </>
                  ))}
                </Paper>
              </div>
            ) : (
              <Grid item xs={12}>
                <Paper
                  style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}
                >
                  <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
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
                      {isOwner || user.isAdmin ? (
                        <IconButton style={{ padding: "0px" }}>
                          <AddOutlined fontSize="default" />
                        </IconButton>
                      ) : null}
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
        </>
      );
    } else {
      return <></>;
    }
  };
  const renderNoData = () => {
    return (
      <Grid item xs={12}>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
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
