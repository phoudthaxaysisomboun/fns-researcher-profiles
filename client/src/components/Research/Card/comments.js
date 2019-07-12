import React from "react";
import AutoLinkText from "react-autolink-text2";
import ReactTextFormat from "react-text-format";

import LinesEllipsis from "react-lines-ellipsis";

import NumberFormat from "react-number-format";
import { UPLOADS_SERVER } from "../../../components/utils/misc";

import moment from "moment";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  Button,
  MenuItem,
  Menu,
  Avatar,
  CircularProgress,
  TextField
} from "@material-ui/core";

import {
  EditOutlined,
  CheckOutlined,
  PersonAddOutlined,
  ReplyOutlined,
  MoreVertOutlined
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

const styles = {
  chip: {
    display: "inline",
    marginLeft: "4px",
    marginRight: "0",
    borderRadius: "2px",
    border: "1px solid #efefef",
    background: "#efefef",
    height: "24px",
    padding: "2px",
    color: "#626262",
    fontWeight: "500",
    fontSize: "11.5px",
    lineHeight: "26px"
  }
};

const CommentsCard = ({
  comments,
  user,
  research,
  anchorElComment,
  handleCommentMenuClose,
  handleCommentMenuClick
}) => {
  const renderIsAuthor = (id, author) => {
    let isAuthor = false;

    author.map((value, index) => {
      if (value._id === id) {
        return (isAuthor = true);
      }
    });

    if (isAuthor) {
      return <div style={styles.chip}>ຜູ້ຂຽນ</div>;
    } else {
      return null;
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Menu
          className="menu"
          anchorEl={anchorElComment}
          open={Boolean(anchorElComment)}
          onClose={event => {
            handleCommentMenuClose(event);
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
              fontWeight: 500
            }}
            selected={false}
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
            selected={true}
          />
        </Menu>
        
        {
          user && user.isAuth && user._id ?
          <>
          
          <Grid item>
                <Paper
                  style={{
                    boxShadow: "none",
                    border: "none",

                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    style={{ padding: "16px", paddingLeft: 0, paddingRight: 0 }}
                  >
                    <Grid
                      item
                      align="center"
                      style={{ marginRight: "16px", width: "48px" }}
                    >
                      <Link
                        to={`/profile/${user._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {user.profileImage &&
                        user.profileImage[0] &&
                        user.profileImage[0].name ? (
                          <Avatar
                            src={`${UPLOADS_SERVER}/images/${
                              user.profileImage[0].name
                            }`}
                            alt="profile image"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderStyle: "solid",
                              borderColor: "#CFCECE",
                              borderWidth: "1px"
                            }}
                          />
                        ) : (
                          <Avatar
                            alt="profile image"
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: `${`${user.name}${
                                user.lastname
                              }`.toColor()}`,
                              fontFamily: "'Noto Sans Lao UI', sans serif",
                              fontWeight: "500"
                            }}
                          >
                            <Typography variant="inherit">
                              {`${user.name.charAt(
                                0
                              )}${user.lastname.charAt(0)}`}
                            </Typography>
                          </Avatar>
                        )}
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Grid container>
                        <Grid item xs>
                          <Grid container>
                            <Grid item xs={12}>
                            <TextField
                            id="commentTextField"
                            style={{ margin: 8 }}
                            placeholder="ເພີ່ມຄໍາເຫັນໃຫ້ແກ່ຜົນງານນີ້"
                            fullWidth
                            value="ທົດສອບການໃຫ້ຄໍາເຫັນ"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                            </Grid>
                            <Grid item xs={12} align="right">
                            <Button style={{marginRight: "8px"}}>ຍົກເລີກ</Button>
                            <Button variant="contained" color="primary">ໃຫ້ຄໍາເຫັນ</Button>
                            </Grid>

                          </Grid>

                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
          </>
          : null
        }

        {comments ? (
          <>
            {comments.map((value, index, array) => (
              <Grid item>
                {console.log(value)}
                <Paper
                  style={{
                    boxShadow: "none",
                    border: "none",
               
                  }}
                >
                  <Grid
                    container
                    spacing={0}
                    style={{ padding: "16px", paddingLeft: 0, paddingRight: 0 }}
                  >
                    <Grid
                      item
                      align="center"
                      style={{ marginRight: "16px", width: "48px" }}
                    >
                      <Link
                        to={`/profile/${value._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {value.user.profileImage &&
                        value.user.profileImage[0] &&
                        value.user.profileImage[0].name ? (
                          <Avatar
                            src={`${UPLOADS_SERVER}/images/${
                              value.user.profileImage[0].name
                            }`}
                            alt="profile image"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderStyle: "solid",
                              borderColor: "#CFCECE",
                              borderWidth: "1px"
                            }}
                          />
                        ) : (
                          <Avatar
                            alt="profile image"
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: `${`${value.user.name}${
                                value.user.lastname
                              }`.toColor()}`,
                              fontFamily: "'Noto Sans Lao UI', sans serif",
                              fontWeight: "500"
                            }}
                          >
                            <Typography variant="inherit">
                              {`${value.user.name.charAt(
                                0
                              )}${value.user.lastname.charAt(0)}`}
                            </Typography>
                          </Avatar>
                        )}
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Grid container>
                        <Grid item xs>
                          <Grid container>
                            <Grid item xs={11}>
                              <Link
                                to={`/profile/${value.user._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Typography
                                  style={{
                                    fontWeight: "600",
                                    color: "#404040",
                                    fontSize: "14px",
                                    display: "inline"
                                  }}
                                >
                                  {value.user.name} {value.user.lastname}
                                  {renderIsAuthor(
                                    value.user._id,
                                    research.author
                                  )}
                                  <div
                                    style={{
                                      display: "inline",
                                      fontWeight: 200,
                                      fontSize: "13px",
                                      color: "#626262",
                                      marginLeft: "4px"
                                    }}
                                  >
                                    {moment(value.time).format(
                                      "HH:mm - DD/MM/YYYY"
                                    )}
                                  </div>
                                </Typography>
                              </Link>
                            </Grid>

                            <Grid item xs align="right">
                              {user.isAdmin ||
                              user._id === value.user._id ||
                              user._id === research.uploader ? (
                                <IconButton
                                  style={{ padding: 0 }}
                                  onClick={event => {
                                    handleCommentMenuClick(event, value._id);
                                  }}
                                >
                                  <MoreVertOutlined fontSize="small" />
                                </IconButton>
                              ) : null}
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "0" }}>
                              <Typography variant="inherit" style={{fontSize: "14px"}}>
                                <AutoLinkText text={value.comment} />
                              </Typography>
                            </Grid>

                            {
                              user.isAuth ?
                              <Grid item xs={12} style={{ marginTop: "10px" }}>
                              <Button size="small" variant="outlined">
                                ຕອບກັບ
                              </Button>
                            </Grid>
                            : null
                            }

                            {value.replies && value.replies.length > 0 ? (
                              <>
                                <Grid
                                  item
                                  xs={12}
                                  style={{ marginTop: "10px" }}
                                >
                                  <Typography
                                    variant="inherit"
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    {`ຄໍາຕອບກັບ (${value.replies.length})`}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  style={{ marginTop: "10px" }}
                                >
                                  {value.replies.map(reply => (
                                    <>
                                      <Grid item>
                                        <Paper
                                          style={{
                                            boxShadow: "none",
                                            border: "none",
                                            marginTop: "8px"
                                          }}
                                        >
                                          <Grid
                                            container
                                            spacing={0}
                                            style={{
                                              padding: "0",
                                              paddingLeft: 0,
                                              paddingRight: 0
                                            }}
                                          >
                                            <Grid
                                              item
                                              align="center"
                                              style={{
                                                marginRight: "8px",
                                                width: "32"
                                              }}
                                            >
                                              <Link
                                                to={`/profile/${value._id}`}
                                                style={{
                                                  color: "inherit",
                                                  textDecoration: "none"
                                                }}
                                              >
                                                {value.user.profileImage &&
                                                value.user.profileImage[0] &&
                                                value.user.profileImage[0]
                                                  .name ? (
                                                  <Avatar
                                                    src={`${UPLOADS_SERVER}/images/${
                                                      reply.user.profileImage[0]
                                                        .name
                                                    }`}
                                                    alt="profile image"
                                                    style={{
                                                      width: "24px",
                                                      height: "24px",
                                                      borderStyle: "solid",
                                                      borderColor: "#CFCECE",
                                                      borderWidth: "1px"
                                                    }}
                                                  />
                                                ) : (
                                                  <Avatar
                                                    alt="profile image"
                                                    style={{
                                                      width: "24px",
                                                      height: "24px",
                                                      backgroundColor: `${`${
                                                        reply.user.name
                                                      }${
                                                        reply.user.lastname
                                                      }`.toColor()}`,
                                                      fontFamily:
                                                        "'Noto Sans Lao UI', sans serif",
                                                      fontWeight: "500"
                                                    }}
                                                  >
                                                    <Typography variant="inherit">
                                                      {`${reply.user.name.charAt(
                                                        0
                                                      )}${reply.user.lastname.charAt(
                                                        0
                                                      )}`}
                                                    </Typography>
                                                  </Avatar>
                                                )}
                                              </Link>
                                            </Grid>
                                            <Grid item xs>
                                              <Grid container>
                                                <Grid item xs>
                                                  <Grid container>
                                                    <Grid item xs={11}>
                                                      <Link
                                                        to={`/profile/${
                                                          reply.user._id
                                                        }`}
                                                        style={{
                                                          textDecoration: "none"
                                                        }}
                                                      >
                                                        <Typography
                                                          style={{
                                                            fontWeight: "600",
                                                            color: "#404040",
                                                            fontSize: "14px",
                                                            display: "inline"
                                                          }}
                                                        >
                                                          {reply.user.name}{" "}
                                                          {reply.user.lastname}
                                                          {renderIsAuthor(
                                                            reply.user._id,
                                                            research.author
                                                          )}
                                                          <div
                                                            style={{
                                                              display: "inline",
                                                              fontWeight: 200,
                                                              fontSize: "13px",
                                                              color: "#626262",
                                                              marginLeft: "4px"
                                                            }}
                                                          >
                                                            {moment(
                                                              reply.time
                                                            ).format(
                                                              "HH:mm - DD/MM/YYYY"
                                                            )}
                                                          </div>
                                                        </Typography>
                                                      </Link>
                                                    </Grid>

                                                    <Grid item xs align="right">
                                                      {user.isAdmin ||
                                                      user._id ===
                                                      reply.user._id ||
                                                      user._id ===
                                                        research.uploader ? (
                                                        <IconButton
                                                          style={{ padding: 0 }}
                                                          onClick={event => {
                                                            handleCommentMenuClick(
                                                              event,
                                                              value._id
                                                            );
                                                          }}
                                                        >
                                                          <MoreVertOutlined fontSize="small" />
                                                        </IconButton>
                                                      ) : null}
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      xs={12}
                                                    >
                                                      <Typography variant="inherit" style={{fontSize: "14px"}}>
                                                        <AutoLinkText
                                                          text={reply.reply}
                                                        />
                                                      </Typography>
                                                    </Grid>

                                                  </Grid>
                                                </Grid>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Paper>
                                      </Grid>
                                    </>
                                  ))}
                                </Grid>
                              </>
                            ) : null}
                          </Grid>

                          {
                          //   <Grid
                          //   container
                          //   alignItems="flex-end"
                          //   style={{ marginTop: "16px" }}
                          // >
                          //   <Grid item xs={8} align="left" />
                          //   <Grid item xs align="right">
                          //     test
                          //   </Grid>
                          // </Grid>
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </>
        ) : (
          <Grid item>
            <Paper
              style={{
                boxShadow: "none",
                border: "none",
                marginTop: "16px",
                padding: "16px"
              }}
            >
              <Grid
                container
                alignContent="center"
                alignItems="center"
                justify="center"
              >
                <Grid item align="center">
                  <CircularProgress style={{ padding: "24px" }} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CommentsCard;
