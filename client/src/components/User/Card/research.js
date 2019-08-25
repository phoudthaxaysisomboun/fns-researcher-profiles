import React from "react";

import { Link as ReactLink, withRouter } from "react-router-dom";

import NumberFormat from "react-number-format";

import LinesEllipsis from "react-lines-ellipsis";

import moment from "moment";

import {UPLOADS_SERVER} from "../../../components/utils/misc"

import { PDFReader, MobilePDFReader } from "reactjs-pdf-reader";

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

import {colorPallete} from "../../utils/misc"

String.prototype.toColor = function() {
	var colors = colorPallete
	
    var hash = 0;
	if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
    return colors[hash];
}


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

const ResearchCard = ({ userData, userDetail, userResearch, loading, openAddResearchDialog }) => {
  const user = { ...userData };
  const profile = { ...userDetail };
  const research = { ...userResearch };
  const profileResearch = { ...research.userResearch };

  

  let author = [];

  for (var key in profileResearch) {
    author.push(profileResearch[key].author);
  }



  const isAuth = user.isAuth;
  let isOwner = false;

  if (isAuth) {
    if (userData._id === profile._id) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = () => (
    <Grid item xs={12}>
      {userResearch ? (
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
                ຜົນງານການຄົ້ນຄວ້າ{" "}
                <span
              variant="inherit"
              style={{ fontWeight: "normal", color: "#898989" }}
            >
              {profile.research ? `(${profile.research.length})` : null}
            </span>
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
            {
              !loading && (isOwner || user.isAdmin) ? 
              
              <IconButton onClick={()=>openAddResearchDialog()} style={{padding: "0px"}}>
              <AddOutlined fontSize="default" />
              </IconButton >
              : null
            }
            </Grid>
          </Grid>
            {userResearch ? (
              <div>
                {userResearch.map(researches => (
                  <div>
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
                        {
                        //   isOwner ? (
                        //   <IconButton style={{ padding: 0 }}>
                        //     <MoreVertOutlined fontSize="small" />
                        //   </IconButton>
                        // ) : null
                      
                      }
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
                      <ReactLink to={`/research/${researches._id}`} style={{textDecoration: "none", color: "inherit"}}>
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

                          
                            {researches.files[0] && researches.files[0].name  ? <div style={styles.chipSecondary}>ມີເອກກະສານໃຫ້ອ່ານ</div> : null}
                          
                          <div style={styles.chipSecondary}>
                            {researches.publicationType.name}
                          </div>
                        </Grid>
                      </Grid>
                      {
                        true ? null :

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
                      }
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
                      </ReactLink>
                      <Grid
                        container
                        style={{ marginTop: "4px", marginBottom: "4px" }}
                        alignItems="flex-end"
                      >
                        <Grid item xs={6}>
                          <Button variant="contained" color="primary" component={ReactLink} to={`/research/${researches._id}`} >
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
                              value={researches.reads ? researches.reads.length : 0}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                     
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
                          <FavoriteBorderOutlined fontSize="small" />
                          {researches.likes ? (
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
                                  researches.likes && researches.likes.length > 0 ? researches.likes.length : null
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
                    </Grid>

                    <Divider />
                  </div>
                ))}

                <Grid container>
                  <Grid item xs={12} align="center">
                    <Button color="primary" style={{ width: "100%" }}>
                      {" "}
                      <ListOutlined style={{ marginRight: "8px" }} />
                      ເບິ່ງທັງຫມົດ
                    </Button>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div style={{ margin: "20px" }}>
                <Typography variant="caption" align="center">
                  ຍັງບໍ່ມີຜົນງານການຄົ້ນຄວ້າເທື່ອ
                </Typography>
              </div>
            )}
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
                ຜົນງານການຄົ້ນຄວ້າ{" "}
                <span
              variant="inherit"
              style={{ fontWeight: "normal", color: "#898989" }}
            >
              {profile.research ? `(${profile.research.length})` : null}
            </span>
              </Typography>
            </Grid>
            <Grid item xs={4} align="right">
            {
              !loading && (isOwner || user.isAdmin) ? 
              
              <IconButton style={{padding: "0px"}} onClick={()=>openAddResearchDialog()}>
              <AddOutlined fontSize="default" />
              </IconButton >
              : null
            }
            </Grid>
          </Grid>
          <div style={{ margin: "20px" }}>
          <Typography variant="inherit" align="center">
            ຍັງບໍ່ມີຜົນງານການຄົ້ນຄວ້າເທື່ອ
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
                ຜົນງານການຄົ້ນຄວ້າ
              </Typography>
            </Grid>
            
          </Grid>
        <LinearProgress style={{ margin: "16px" }} />
        </Paper>
      </Grid>
    );
  };

  return loading ? renderNoData() : renderItems();
};

export default withRouter(ResearchCard);
