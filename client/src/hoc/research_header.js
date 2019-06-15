import React from "react";

import {
  IconButton,
  Grid,
  Fab,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Link,
  Typography,
  LinearProgress,
  CircularProgress,
  Hidden
} from "@material-ui/core";

import NumberFormat from "react-number-format";

import moment from "moment";

import LinesEllipsis from "react-lines-ellipsis";

import {
  Mail,
  Phone,
  PersonAddOutlined,
  AddOutlined,
  EditOutlined,
  ReplyOutlined,
  CheckOutlined,
  Web,
  PublicOutlined,
  ListOutlined,
  CommentOutlined,
  ModeCommentOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  MoreVertOutlined,
  ForwardOutlined,
  MoreHorizOutlined,
  RemoveRedEyeOutlined
} from "@material-ui/icons";

import { Link as ReactLink, withRouter } from "react-router-dom";

import {UPLOADS_SERVER} from "../components/utils/misc"

const ResearchHeader = ({
  props,
  children,
  loading,
  tab,
  research,
  openShareDialog,
  
}) => {
  const userData = { ...props.user.userData };

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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper
          style={{
            paddingTop: "24px",
            borderRadius: 0,
            boxShadow: "none",
            border: "1px solid #d8d8d8",
            borderLeft: 0,
            borderRight: 0,
            borderTop: "0"
          }}
        >
          <Grid container>
            <Grid item xs sm={1} lg={2} md={1} />
            <Grid item xs={10} sm={10} lg={8} md={10}>
              <Grid container spacing={24}>
                <Grid item lg md sm xs>
                  {research ? (
                    <>
                      <Grid container style={{ marginBottom: "8px" }}>
                        <div style={styles.chip}>
                          {research.researchType.name}
                        </div>

                        {research.files ? (
                          <div style={styles.chipSecondary}>
                            ມີເອກກະສານໃຫ້ອ່ານ
                          </div>
                        ) : null}

                        {research.publicationType ? (
                          <div style={styles.chipSecondary}>
                            {research.publicationType.name}
                          </div>
                        ) : null}
                      </Grid>
                      <Grid container>
                        <Typography
                          variant="inherit"
                          style={{
                            fontFamily: "'Noto Sans Lao UI', sans serif",
                            fontWeight: 700,
                            fontSize: "24px"
                          }}
                        >
                          {research.title}
                        </Typography>
                      </Grid>
                      <Grid container>
                        <Typography
                          variant="body2"
                          style={{
                            fontFamily: "'Roboto', sans-serif",
                            fontSize: "12px",
                            letterSpacing: "1.5 px",
                            fontWeight: "600",
                            color: "#00695C"
                          }}
                        >
                          {moment(research.date).format("DD/MM/YYYY")}
                        </Typography>
                      </Grid>

                      <Grid container style={{ marginTop: "8px" }}>
                        {research.author.map((value, item, array) => (
                          <>
                            <Grid
                              item
                              style={{
                                marginRight: "4px",
                                marginBottom: "8px"
                              }}
                            >
                            {
                              value.profileImage && value.profileImage[0] && value.profileImage[0].name ?
                              <Avatar
                              src={`${UPLOADS_SERVER}/images/${value.profileImage[0].name}`}
                              style={{
                                width: "18px",
                                height: "18px",
                              }}
                              alt="profile image"
                            >
                              
                            </Avatar>
                              :

                              <Avatar
                              style={{
                                width: "18px",
                                height: "18px",
                                backgroundColor: `${`${value.name}${
                                  value.lastname
                                }`.toColor()}`,
                               
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
                            }
                              
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
                      {research &&
                      research.researchType &&
                      research.researchType._id ===
                        "5cdb83a127ba7c4214ef5779" ? (
                        <>
                          {research.degree ? (
                            <Grid container>
                              <Typography
                                variant="inherit"
                                style={{
                                  letterSpacing: "1.5 px"
                                }}
                              >
                                <strong>ລະດັບ: </strong> {research.degree}
                              </Typography>
                            </Grid>
                          ) : null}
                          {research.supervisor[0] ? (
                            <Grid container>
                              <Typography
                                variant="inherit"
                                style={{
                                  letterSpacing: "1.5 px"
                                }}
                              >
                                <strong>ຜູ້ນໍາພາ: </strong>{" "}
                                {`${research.supervisor[0].prefix} ${
                                  research.supervisor[0].name
                                } ${research.supervisor[0].lastname}`}
                              </Typography>
                            </Grid>
                          ) : null}
                        </>
                      ) : null}

                      {research &&
                        research.researchType &&
                        research.researchType._id ===
                          "5d0516e447c496528476ec94" ? (
                          <>
                            {research.conferenceTitle ? (
                              <Grid container>
                                <Typography
                                  variant="inherit"
                                  style={{
                                    letterSpacing: "1.5 px"
                                  }}
                                >
                                  <strong>ງານປະຊຸມ: </strong> {research.conferenceTitle}
                                </Typography>
                              </Grid>
                            ) : null}
                            {research.location ? (
                              <Grid container>
                                <Typography
                                  variant="inherit"
                                  style={{
                                    letterSpacing: "1.5 px"
                                  }}
                                >
                                  <strong>ສະຖານທີ່ປະຊຸມ: </strong>{" "}
                                  {`${research.location}`}
                                </Typography>
                              </Grid>
                            ) : null}
                          </>
                        ) : null}
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item lg={3} md={6} sm={12} xs={12} align="right">
                  <Hidden mdUp>
                    <Grid container>
                      <Grid container>
                        <Grid item style={{ width: "32px", marginRight: "8px" }} align="left">
                          <RemoveRedEyeOutlined style={{ color: "#757575", paddingLeft: 0 }} />
                        </Grid>
                        <Grid item xs align="left">
                          <Typography variant="inherit">
                            {" "}
                            <span style={{ color: "#757575" }}>ອ່ານ</span>
                            <div
                              style={{
                                color: "#757575",
                                fontFamily: "'Roboto', sans serif",
                                display: "inline",
                                fontWeight: "500"
                              }}
                            >
                              &nbsp;
                              <NumberFormat
                                value={
                                  research.reads ? research.reads.length : 0
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                              &nbsp;
                            </div>
                            <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Hidden smDown>
                    <Grid
                      container
                      alignItems="flex-end"
                      alignContent="flex-end"
                    >
                      <Grid container>
                        <Grid item xs>
                          <Grid container>
                            <Grid item xs align="right">
                              <Typography variant="inherit">
                                {" "}
                                <span style={{ color: "#757575" }}>ອ່ານ</span>
                                <div
                                  style={{
                                    color: "#757575",
                                    fontFamily: "'Roboto', sans serif",
                                    display: "inline",
                                    fontWeight: "500"
                                  }}
                                >
                                  &nbsp;
                                  <NumberFormat
                                    value={
                                      research.reads ? research.reads.length : 0
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                  &nbsp;
                                </div>
                                <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                              </Typography>
                            </Grid>
                            <Grid item style={{ width: "32px" }}>
                              <RemoveRedEyeOutlined
                                style={{ color: "#757575" }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <Grid container>
                            <Grid item xs align="right">
                              <Typography variant="inherit">
                                {" "}
                                <span style={{ color: "#757575" }}>
                                  ຖືກນໍາໄປອ້າງອີງ
                                </span>
                                <div
                                  style={{
                                    color: "#757575",
                                    fontFamily: "'Roboto', sans serif",
                                    display: "inline",
                                    fontWeight: "500"
                                  }}
                                >
                                  &nbsp;
                                  <NumberFormat
                                    value={
                                      research.reads ? research.reads.length : 0
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                  &nbsp;
                                </div>
                                <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                              </Typography>
                            </Grid>
                            <Grid item style={{ width: "32px" }}>
                              <ForwardOutlined style={{ color: "#757575" }} />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs>
                          <Grid container>
                            <Grid item xs align="right">
                              <Typography variant="inherit">
                                {" "}
                                <span style={{ color: "#757575" }}>
                                  ດາວນ໌ໂຫລດ
                                </span>
                                <div
                                  style={{
                                    color: "#757575",
                                    fontFamily: "'Roboto', sans serif",
                                    display: "inline",
                                    fontWeight: "500"
                                  }}
                                >
                                  &nbsp;
                                  <NumberFormat
                                    value={
                                      research.reads ? research.reads.length : 0
                                    }
                                    displayType={"text"}
                                    thousandSeparator={true}
                                  />
                                  &nbsp;
                                </div>
                                <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                              </Typography>
                            </Grid>
                            <Grid item style={{ width: "32px" }}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="a-s-fa-Ha-pa"
                                viewBox="0 0 24 24"
                                focusable="false"
                                fill="#757575"
                                style={{
                                  width: "24px",
                                  height: "24px"
                                }}
                              >
                                <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z" />
                              </svg>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item lg md sm xs>
                  <Grid
                    container
                    style={{ marginTop: "4px", marginBottom: "8px" }}
                    spacing={16}
                  >
                    <Grid item>
                      <Button
                        style={{
                          color: "#686868",
                          minWidth: "14px",
                          padding: "4px"
                        }}
                        size="large"
                      >
                        <FavoriteBorderOutlined
                          fontSize="default"
                          style={{ marginRight: "6px" }}
                        />
                        {research.likes && research.likes[0] ? (
                          <div
                            style={{
                              fontSize: "1rem",
                              color: "#757575",
                              fontFamily: "'Roboto', sans serif",
                              display: "inline"
                            }}
                          >
                            &nbsp;
                            <NumberFormat
                              value={
                                research.likes ? research.likes.length : null
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            &nbsp;
                          </div>
                        ) : (
                          <div
                            style={{
                              fontSize: "1rem",

                              fontFamily: "'Roboto', sans serif",
                              display: "inline"
                            }}
                          >
                            ຖຶກໃຈ
                          </div>
                        )}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        style={{
                          color: "#686868",
                          minWidth: "14px",
                          padding: "4px"
                        }}
                      >
                        {" "}
                        <ModeCommentOutlined
                          fontSize="default"
                          style={{ marginRight: "6px" }}
                        />
                        {research.comments && research.comments[0] ? (
                          <div
                            style={{
                              fontSize: "1rem",
                              color: "#757575",
                              fontFamily: "'Roboto', sans serif",
                              display: "inline"
                            }}
                          >
                            &nbsp;
                            <NumberFormat
                              value={
                                research.comments
                                  ? research.comments.length
                                  : null
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            &nbsp;
                          </div>
                        ) : (
                          <div
                            style={{
                              fontSize: "1rem",

                              fontFamily: "'Roboto', sans serif",
                              display: "inline"
                            }}
                          >
                            ໃຫ້ຄໍາເຫັນ
                          </div>
                        )}
                      </Button>
                    </Grid>

                    <Grid item>
                      <Button
                        style={{
                          color: "#686868",
                          minWidth: "14px",
                          padding: "4px"
                        }}
                      >
                        {" "}
                        <ReplyOutlined
                          fontSize="default"
                          style={{
                            marginRight: "6px",
                            transform: "rotateY(180deg)"
                          }}
                        />
                        {research.shares && research.shares[0] ? (
                          <div
                            style={{
                              fontSize: "1rem",
                              color: "#757575",
                              fontFamily: "'Roboto', sans serif",
                              display: "inline"
                            }}
                          >
                            &nbsp;
                            <NumberFormat
                              value={
                                research.shares ? research.shares.length : null
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            &nbsp;
                          </div>
                        ) : (
                          <div
                            style={{
                              fontSize: "1rem",

                              fontFamily: "'Roboto', sans serif",
                              display: "inline"
                            }}
                          >
                            ແບ່ງປັນ
                          </div>
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12} align="right">
                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ fontSize: "1rem" }}
                  >
                    <ForwardOutlined style={{ marginRight: "14px" }} />
                    ນໍາໄປອ້າງອີງ
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginLeft: "8px", fontSize: "1rem" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="a-s-fa-Ha-pa"
                      viewBox="0 0 24 24"
                      focusable="false"
                      fill="white"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "14px"
                      }}
                    >
                      <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z" />
                    </svg>
                    ດາວນ໌ໂຫລດ
                  </Button>

                  <IconButton style={{ marginLeft: "8px" }}>
                    <MoreHorizOutlined />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs sm={1} lg={2} md={1} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{ marginTop: "16px" }}
              >
                <Tab
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  label="ໂດຍລວມ"
                  to={`/research/${research._id}`}
                  component={ReactLink}
                />

                <Tab
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    textDecoration: "none"
                  }}
                  label="ສະຖິຕິ"
                  to={`/profile/${research._id}/info`}
                  component={ReactLink}
                />

                <Tab
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  label="ຄໍາເຫັນ"
                />
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {children}
    </Grid>
  );
};

export default withRouter(ResearchHeader);
