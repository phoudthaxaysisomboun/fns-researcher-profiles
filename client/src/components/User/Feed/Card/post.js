import React from "react";

import { Link as ReactLink, withRouter } from "react-router-dom";

import NumberFormat from "react-number-format";
import { PDFReader, MobilePDFReader } from "reactjs-pdf-reader";

import LinesEllipsis from "react-lines-ellipsis";
import 'moment/locale/lo'

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
  CircularProgress,
  Chip,
  Fab,
  LinearProgress
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

import { colorPallete } from "../../../../components/utils/misc";

import { UPLOADS_SERVER } from "../../../../components/utils/misc";

moment.locale('lo');

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
    marginTop: "4px",
    marginBottom: "4px",
    marginRight: "8px",
    borderRadius: "2px",
    border: "1px solid #efefef",
    background: "#efefef",
    height: "24px",
    paddingLeft: "4px",
    paddingRight: "4px",
    color: "#626262",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "26px"
  },
  chipSecondary: {
    marginTop: "4px",
    marginBottom: "4px",
    marginRight: "8px",
    borderRadius: "2px",
    border: "1px solid #e5e5e5",
    background: "transparent",
    height: "24px",
    paddingLeft: "4px",
    paddingRight: "4px",
    color: "#626262",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "26px"
  }
};

const FeedCard = ({ userData, userResearch, runLike, runUnLike, comment }) => {
  const user = { ...userData };
  const research = { ...userResearch };
  const profileResearch = { ...research.userResearch };

  let author = [];

  for (var key in profileResearch) {
    author.push(profileResearch[key].author);
  }

  const isAuth = user.isAuth;
  let isOwner = false;

  const showTime = time => {
    var durationMinutes = moment().diff(time, "minutes");
    var durationHours = moment().diff(time, "hours");
    var durationDay = moment().diff(time, "days");
    var durationWeek = moment().diff(time, "weeks");
    var durationMonth = moment().diff(time, "months");
    var durationYear = moment().diff(time, "years");
    
    

    if (durationMinutes < 60) {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
        {moment(time).fromNow()}
        </Typography>
      );
    } else if (durationHours < 24) {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
        {moment(time).fromNow()}
        </Typography>
      );
    } else if (durationDay === 1) {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
          ມື້ວານ
        </Typography>
      );
    } else if (durationDay >= 1 && durationWeek === 0) {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
        {moment(time).fromNow()}
        </Typography>
      );
    } else if (durationMonth === 0 || durationWeek < 4) {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
        {moment(time).fromNow()}
        </Typography>
      );
    } else if (durationMonth >= 1 && durationYear < 1) {
      
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
          {moment(time).format("DD MMMM")}
        </Typography>
      );
    } else if (durationYear >= 1) {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
          {durationYear} ປີກ່ອນ
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="inherit"
          style={{
            fontWeight: 400,
            display: "block",
            fontSize: "13px",
            color: "rgb(140, 140, 140)",
            marginBottom: "8px"
          }}
        >
        {moment(time).format("DD MMMM YYYY")}
        </Typography>
      );
    }

    //   <Typography
    //                   variant="inherit"
    //                     style={{
    //                       fontWeight: 400
    //                       ,display: "block",
    //                       fontSize: "13px"
    //                     }}
    //                   >
    //                     {researches.createdAt}
    //                   </Typography>
  };

  let name;
  name =
    research && research.files && research.files[0]
      ? research.files[0].name
      : "";

  const file = `${UPLOADS_SERVER}${name}`;
  const type = file.split(".").pop();

  const renderLikeButton = (id, researchLike) => {
    let likeCount = researchLike ? researchLike.length : 0;
    let duplicate = false;
    if (userData.likes) {
      userData.likes.forEach(item => {
        if (item === id) {
          duplicate = true;
        }
      });
    }

    if (duplicate) {
      return (
        <Button
          size="small"
          style={{
            color: "#d32f2f",
            minWidth: "14px",
            height: "36px",
            borderRadius: "22px"
          }}
          onClick={() => {
            runUnLike(id);
          }}
        >
          {" "}
          <FavoriteOutlined fontSize="small" />
          {likeCount > 0 ? (
            <div
              style={{
                fontSize: "13.5px",
                color: "#d32f2f",
                fontFamily: "'Roboto', sans serif",
                display: "inline"
              }}
            >
              &nbsp;
              <NumberFormat
                value={likeCount}
                displayType={"text"}
                thousandSeparator={true}
              />
              &nbsp;
            </div>
          ) : null}
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          style={{
            color: "#686868",
            minWidth: "14px",
            height: "36px",
            borderRadius: "22px"
          }}
          onClick={() => {
            runLike(id);
          }}
        >
          {" "}
          <FavoriteBorderOutlined fontSize="small" />
          {likeCount > 0 ? (
            <div
              style={{
                fontSize: "13.5px",
                color: "#757575",
                fontFamily: "'Roboto', sans serif",
                display: "inline"
              }}
            >
              &nbsp;
              <NumberFormat
                value={likeCount}
                displayType={"text"}
                thousandSeparator={true}
              />
              &nbsp;
            </div>
          ) : null}
        </Button>
      );
    }
  };

  const renderItems = () =>
    userResearch ? (
      <Grid item xs={12}>
        <div style={{ float: "right" }}>
          {userResearch.map(researches => (
            <>
              <Paper
                style={{
                  boxShadow: "none",
                  border: "1px solid #d8d8d8",
                  marginTop: "24px",
                  padding: "16px",
                  paddingBottom: 0,
                  maxWidth: "640px"
                }}
                
              >
                <Grid container>
                  <Grid
                    item
                    style={{
                      marginRight: "4px",
                      marginBottom: "8px",
                      width: "52px"
                    }}
                  >
                    {researches.uploader.profileImage &&
                    researches.uploader.profileImage[0] &&
                    researches.uploader.profileImage[0].name ? (
                      <ReactLink
                        to={`/profile/${researches.uploader._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Avatar
                          style={{
                            width: "46px",
                            height: "46px",
                            borderStyle: "solid",
                            borderColor: "#CFCECE",
                            borderWidth: "1px"
                          }}
                          alt="profile image"
                          src={`${UPLOADS_SERVER}/images/${
                            researches.uploader.profileImage[0].name
                          }`}
                        />
                      </ReactLink>
                    ) : (
                      <ReactLink
                        to={`/profile/${researches.uploader._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Avatar
                          style={{
                            width: "46px",
                            height: "46px",
                            backgroundColor: `${`${researches.uploader.name}${
                              researches.uploader.lastname
                            }`.toColor()}`,
                            fontFamily: "'Noto Sans Lao UI', sans serif",
                            fontWeight: "normal",
                            fontSize: "8px"
                          }}
                          alt="profile image"
                        >
                          <Typography variant="inherit">
                            {`${researches.uploader.name.charAt(
                              0
                            )}${researches.uploader.lastname.charAt(0)}`}
                          </Typography>
                        </Avatar>
                      </ReactLink>
                    )}
                  </Grid>
                  <Grid item xs>
                    <ReactLink
                      to={`/profile/${researches.uploader._id}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <Typography
                        variant="inherit"
                        style={{
                          display: "inline",
                          fontWeight: 500,
                          fontSize: "18px"
                        }}
                      >
                        {researches.uploader.prefix} {researches.uploader.name}{" "}
                        {researches.uploader.lastname}
                      </Typography>
                    </ReactLink>{" "}
                    <Typography
                      variant="body1"
                      style={{
                        display: "inline",
                        fontWeight: "400",
                        color: "rgb(140, 140, 140)",
                        fontSize: "16px",
                        fontFamily: "'Noto Sans Lao UI', sans serif"
                      }}
                    >
                      ໄດ້ເພີ່ມຜົນງານການຄົ້ນຄວ້າ
                    </Typography>
                    {showTime(researches.createdAt)}
                  </Grid>
                </Grid>
                <Paper
                  style={{
                    boxShadow: "none",
                    border: "1px solid #d8d8d8",
                    marginTop: "0"
                  }}
                >
                  <ReactLink
                    to={`/profile/${researches._id}}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      cursor: "pointer"
                    }}
                  >
                    <Grid container style={{ padding: "8px" }} wrap="nowrap">
                      <Grid
                        item
                        xs={6}
                        style={{ paddingTop: "8px", paddingLeft: "8px" }}
                      >
                        <Typography
                          style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "12px",
                            letterSpacing: "1.5 px",
                            fontWeight: "600",
                            color: "#00695C"
                          }}
                        >
                          {moment(researches.date).format("DD/MM/YYYY")}
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
                        {isOwner ? (
                          <IconButton style={{ padding: 0 }}>
                            <MoreVertOutlined fontSize="small" />
                          </IconButton>
                        ) : null}
                      </Grid>
                    </Grid>
                  </ReactLink>
                  <ReactLink
                    to={`/profile/${researches._id}}`}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      cursor: "pointer"
                    }}
                  >
                    <Grid
                      container
                      style={{ paddingLeft: "16px", paddingRight: "16px" }}
                    >
                      <Grid
                        item
                        xs
                        zeroMinWidth
                        style={{ paddingRight: "16px" }}
                      >
                        <ReactLink
                          to={`/research/${researches._id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <LinesEllipsis
                            text={researches.title}
                            maxLine="2"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                            style={{ fontSize: "20px", fontWeight: "500" }}
                          />
                        </ReactLink>
                        <Grid container />
                        <Grid
                          container
                          style={{ marginTop: "4px", marginBottom: "8px" }}
                        >
                          <div style={styles.chip}>
                            {researches.researchType.name}
                          </div>

                          {researches.files[0] ? (
                            <div style={styles.chipSecondary}>
                              ມີເອກກະສານໃຫ້ອ່ານ
                            </div>
                          ) : null}

                          <div style={styles.chipSecondary}>
                            {researches.publicationType.name}
                          </div>
                        </Grid>
                      </Grid>
                      {true ? null : (
                        <Grid item align="right">
                          <img
                            style={{
                              marginRight: "4px",
                              borderRadius: "6px",
                              objectFit: "cover"
                            }}
                            src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                            alt="nothing"
                            width={80}
                            height={80}
                          />
                        </Grid>
                      )}
                      <Grid container style={{}}>
                        {researches.author.map((value, item, array) => (
                          <>
                            <Grid
                              item
                              style={{
                                marginRight: "4px",
                                marginBottom: "8px"
                              }}
                            >
                              {value.profileImage &&
                              value.profileImage[0] &&
                              value.profileImage[0].name ? (
                                <Avatar
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    borderStyle: "solid",
                                    borderColor: "#CFCECE",
                                    borderWidth: "1px"
                                  }}
                                  alt="profile image"
                                  src={`${UPLOADS_SERVER}/images/${
                                    value.profileImage[0].name
                                  }`}
                                />
                              ) : (
                                <Avatar
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    backgroundColor: `${`${value.name}${
                                      value.lastname
                                    }`.toColor()}`,
                                    fontFamily:
                                      "'Noto Sans Lao UI', sans serif",
                                    fontWeight: "normal",
                                    fontSize: "8px"
                                  }}
                                  alt="profile image"
                                >
                                  <Typography variant="inherit">
                                    {`${value.name.charAt(
                                      0
                                    )}${value.lastname.charAt(0)}`}
                                  </Typography>
                                </Avatar>
                              )}
                            </Grid>
                            <Grid item>
                              <Typography
                                variant="inherit"
                                style={{
                                  height: "18px",
                                  lineHeight: "18px",
                                  marginBottom: "8px",
                                  fontWeight: "500",
                                  marginRight: "4px"
                                }}
                              >
                                {`${value.name} ${value.lastname}`}{" "}
                                {item !== array.length - 1 ? " • " : null}
                              </Typography>
                            </Grid>
                          </>
                        ))}
                      </Grid>
                      <ReactLink
                        to={`/profile/${researches._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Grid
                          container
                          style={{ marginBottom: "4px", cursor: "pointer" }}
                        >
                          <Grid item>
                            {researches.files[0] && researches.files[0].name ? (
                              <Grid container spacing={8}>
                                <Grid
                                  item
                                  style={{
                                    maxWidth: "80px",
                                    maxHeight: "120px",
                                    marginTop: "8px",
                                    marginBottom: "8px"
                                  }}
                                >
                                  <Paper
                                    style={{
                                      border: "1px solid #e5e5e5",
                                      borderRadius: 0,
                                      boxShadow: "none"
                                    }}
                                  >
                                    <PDFReader
                                      width={80}
                                      page={1}
                                      withCredentials={false}
                                      url={`${UPLOADS_SERVER}${
                                        researches.files[0].name
                                      }`}
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs>
                                  <LinesEllipsis
                                    text={researches.abstract}
                                    maxLine="5"
                                    ellipsis="..."
                                    trimRight
                                    basedOn="words"
                                    style={{
                                      fontSize: "16px",
                                      color: "#666666",
                                      fontWeight: "normal",
                                      marginTop: "4px",
                                      marginLeft: "8px"
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <LinesEllipsis
                                text={researches.abstract}
                                maxLine="3"
                                ellipsis="..."
                                trimRight
                                basedOn="words"
                                style={{
                                  fontSize: "16px",
                                  color: "#666666",
                                  fontWeight: "normal",
                                  marginTop: "4px"
                                }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </ReactLink>
                      <Grid
                        container
                        style={{ marginTop: "4px", marginBottom: "16px" }}
                        alignItems="flex-end"
                      >
                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            component={ReactLink}
                            to={`/research/${researches._id}`}
                          >
                            ອ່ານ
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </ReactLink>
                </Paper>
                <Grid
                  container
                  style={{ marginTop: "4px", marginBottom: "4px" }}
                  alignItems="center"
                >
                  <Grid item xs={6} align="left" alignItems="flex-start">
                    {isAuth
                      ? renderLikeButton(researches._id, researches.likes)
                      : null}

                    <Button
                      size="small"
                      style={{
                        color: "#686868",
                        minWidth: "14px",
                        height: "36px",
                        borderRadius: "22px",
                        textDecoration: "none"
                      }}
                      onClick={() => comment(researches._id)}
                    >
                      {" "}
                      <ModeCommentOutlined fontSize="small" />
                      {researches.comments.length > 0 ? (
                        <div
                          style={{
                            fontSize: "13.5px",
                            color: "#757575",
                            fontFamily: "'Roboto', sans serif",
                            display: "inline"
                          }}
                        >
                          &nbsp;
                          <NumberFormat
                            value={
                              researches.comments
                                ? researches.comments.length
                                : null
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &nbsp;
                        </div>
                      ) : null}
                    </Button>
                    <Button
                      size="small"
                      style={{
                        color: "#686868",
                        minWidth: "14px",
                        height: "36px",
                        borderRadius: "22px"
                      }}
                    >
                      {" "}
                      <ReplyOutlined fontSize="small" />
                      {researches.shares && researches.shares.length ? (
                        <div
                          style={{
                            fontSize: "13.5px",
                            color: "#757575",
                            fontFamily: "'Roboto', sans serif",
                            display: "inline"
                          }}
                        >
                          &nbsp;
                          <NumberFormat
                            value={
                              researches.shares && researches.shares.length > 0
                                ? researches.shares.length
                                : null
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &nbsp;
                        </div>
                      ) : null}
                    </Button>
                  </Grid>
                  <Grid item xs={6} align="right" alignItems="flex-end">
                    <span style={{ fontSize: "13.5px", color: "#757575" }}>
                      ອ່ານ
                    </span>
                    <div
                      style={{
                        fontSize: "13.5px",
                        color: "#757575",
                        fontFamily: "'Roboto', sans serif",
                        display: "inline",
                        fontWeight: "500"
                      }}
                    >
                      &nbsp;
                      <NumberFormat
                        value={researches.reads ? researches.reads.length : 0}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      &nbsp;
                    </div>
                    <span style={{ fontSize: "13.5px", color: "#757575" }}>
                      ຄັ້ງ
                    </span>
                  </Grid>
                </Grid>
              </Paper>
            </>
          ))}
          <div style={{ height: "24px" }} />
        </div>
      </Grid>
    ) : (
      <div style={{ float: "right" }}>
        <>
          <Grid container style={{}}>
            <Paper
              style={{
                boxShadow: "none",
                border: "1px solid #d8d8d8",
                marginTop: "24px",
                padding: "16px",
                paddingBottom: 0
              }}
            >
            <CircularProgress style={{color: "#909090", margin: "40px"}} thickness={5}  size={30} variant="indeterminate"/>
            </Paper>
          </Grid>
        </>
      </div>
    );

  return renderItems();
};

export default withRouter(FeedCard);
