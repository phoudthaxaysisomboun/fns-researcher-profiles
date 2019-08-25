import React from "react";

import { Link, withRouter } from "react-router-dom";

import NumberFormat from "react-number-format";

import LinesEllipsis from "react-lines-ellipsis";

import { PDFReader } from "reactjs-pdf-reader";

import moment from "moment";

import {
  Grid,
  Paper,
  Avatar,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  
} from "@material-ui/core";

import {
  ModeCommentOutlined,
  ReplyOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  MoreVertOutlined,
} from "@material-ui/icons";

import { colorPallete } from "../../utils/misc";

import { UPLOADS_SERVER } from "../../../components/utils/misc";

const toColor = (str) => {
  var colors = colorPallete;

  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
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

const ResearchCard = ({ userData, userResearch, runLike, runUnLike }) => {
  const user = { ...userData };
  const research = { ...userResearch };
  const profileResearch = { ...research.userResearch };

  let author = [];

  for (var key in profileResearch) {
    author.push(profileResearch[key].author);
  }

  let isOwner = false;

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

    if (!user.isAuth && (likeCount > 0)) {
      return (
        <Button
          size="small"
          disabled
          style={{
            color: "#686868",
            minWidth: "14px",
            height: "36px",
            borderRadius: "22px"
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
      )
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

  const renderItems = () => (
    <Grid item xs={12}>
      {console.log(research)}
      {userResearch ? (
        <div>
          
        {userResearch.map(researches => (
            <Paper
            style={{
              boxShadow: "none",
              border: "1px solid #d8d8d8",
              marginTop: "16px"
            }}
          >
            <Grid container style={{ padding: "8px" }} wrap="nowrap">
              <Grid
                item
                xs={6}
                style={{ paddingTop: "8px", paddingLeft: "8px" }}
              >
                <Typography
                  variant="body1"
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
                <Link
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
                </Link>
                <Grid container />
                <Grid
                  container
                  style={{ marginTop: "4px", marginBottom: "8px" }}
                >
                  <div style={styles.chip}>
                    {researches.researchType.name}
                  </div>

                  
                    {researches.files && researches.files[0] && researches.files[0].name ? <div style={styles.chipSecondary}>ມີເອກກະສານໃຫ້ອ່ານ</div> : null}
                  
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
                            backgroundColor: toColor(`${value.name}${
                              value.lastname
                            }`),
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
              <Link
                        to={`/profile/${researches._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Grid
                          container
                          style={{ marginBottom: "4px", cursor: "pointer" }}
                        >
                          <Grid item>
                            {researches.files[0] && researches.files[0].name && (researches.files[0].name.split(".").pop() === 'pdf') ? (
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
                      </Link>
              <Grid
                container
                style={{ marginTop: "4px", marginBottom: "4px" }}
                alignItems="flex-end"
              >
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/research/${researches._id}`}
                  >
                    ອ່ານ
                  </Button>
                </Grid>
                <Grid item xs={6} align="right" alignItems="flex-end">
                  <span
                    style={{ fontSize: "13.5px", color: "#757575" }}
                  >
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
                      value={
                        researches.reads ? researches.reads.length : 0
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    {console.log(researches.reads)}
                    &nbsp;
                  </div>
                  <span
                    style={{ fontSize: "13.5px", color: "#757575" }}
                  >
                    ຄັ້ງ
                  </span>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: "4px", marginBottom: "8px" }}
              >
              {renderLikeButton(researches._id, researches.likes)}
                {
                  user.isAuth ?
                  <Button
                  size="small"
                  style={{
                    color: "#686868",
                    minWidth: "14px",
                    height: "36px",
                    borderRadius: "22px"
                  }}
                  component = {Link}
                  to={`/research/${researches._id}/comments`}
                >
                  {" "}
                  <ModeCommentOutlined fontSize="small" />
                  {researches.comments ? (
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
                          researches.comments && researches.comments.length > 0
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
                : 
                <Button
                  size="small"
                  style={{
                    color: "#686868",
                    minWidth: "14px",
                    height: "36px",
                    borderRadius: "22px"
                  }}
                  component = {Link}
                  to={`/research/${researches._id}/comments`}
                  disabled
                >
                  {" "}
                  <ModeCommentOutlined fontSize="small" />
                  {researches.comments ? (
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
                          researches.comments && researches.comments.length > 0
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
                }
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
                  {researches.shares ? (
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
            </Grid>
            </Paper>
        ))}

        </div>
      ) : (
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
      )}
    </Grid>
  );

  return renderItems();
};

export default withRouter(ResearchCard);
