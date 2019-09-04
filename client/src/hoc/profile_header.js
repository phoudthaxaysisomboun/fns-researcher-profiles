import React from "react";

import {
  IconButton,
  Grid,
  Fab,
  Avatar,
  Button,
  Tabs,
  Tab,
  Link,
  Typography,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";



import LinesEllipsis from "react-lines-ellipsis";

import { UPLOADS_SERVER } from "../components/utils/misc";

import {
  Mail,
  Phone,
  PersonAddOutlined,
  AddOutlined,
  EditOutlined,
  ReplyOutlined,
  CheckOutlined,
  PublicOutlined
} from "@material-ui/icons";

import { Link as ReactLink, withRouter } from "react-router-dom";

import { colorPallete } from "../components/utils/misc";

const toColor = str => {
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

const ProfileHeader = ({
  props,
  runUnfollow,
  runFollow,
  children,
  loading,
  tab,
  openShareDialog,
  openAddResearchDialog,
  openEditName,
  openUpdateDegree,
  width,
  openProfileImageEditor
}) => {
  const userData = { ...props.user.userData };
  const profile = { ...props.user.userDetail };
  const facebook = { ...profile.facebook };
  var isOwner = false;
  const isAuth = userData.isAuth;

  if (isAuth) {
    if (userData._id === profile._id) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderFollowButton = (id = profile._id) => {
    let duplicate = false;
    userData.following.forEach(item => {
      if (item._id === id) {
        duplicate = true;
      }
    });

    if (id === userData._id) {
      return (
        <Fab
          size="medium"
          variant="extended"
          color="primary"
          style={{ margin: "8px" }}
          onClick={() => openAddResearchDialog()}
        >
          <AddOutlined style={{ marginRight: "8px" }} />
          ເພີ່ມຜົນງານວິໄຈ
        </Fab>
      );
    }

    if (duplicate) {
      return (
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={() => {
            runUnfollow(id);
          }}
          style={{ margin: "8px" }}
        >
          <CheckOutlined style={{ marginRight: "8px" }} />
          ຕິດຕາມຢູ່
        </Button>
      );
    } else {
      return props.user.userDetail ? (
        loading ? (
          <Button
            size="medium"
            variant="outlined"
            color="primary"
            style={{ margin: "8px" }}
          >
            <CircularProgress size={24} />
          </Button>
        ) : (
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => {
              runFollow(id);
            }}
            style={{ margin: "8px" }}
          >
            <PersonAddOutlined style={{ marginRight: "8px" }} />
            ຕິດຕາມ
          </Button>
        )
      ) : null;
    }
  };

  const renderContactInfo = () => {
    if (props.user.userDetail) {
      return (
        <div>
          {profile.email ? (
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item style={{ width: "24px" }}>
                <Mail
                  style={{
                    width: "20px",
                    color: "#BA000D"
                  }}
                />
              </Grid>
              <Grid item xs>
                <Link
                  href={`mailto:${profile.email}`}
                  style={{ color: "#BA000D", wordWrap: "break-word" }}
                >
                  <Typography variant="inherit">
                    <LinesEllipsis
                      text={profile.email}
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          ) : null}

          {facebook.name ? (
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item style={{ width: "24px" }}>
                <svg
                  style={{
                    width: "20px",
                    color: "#1976D2"
                  }}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  role="img"
                  width="20px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="svg-inline--fa fa-facebook fa-w-14 fa-2x"
                >
                  <path
                    fill="currentColor"
                    d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"
                    className=""
                  />
                </svg>
              </Grid>
              <Grid item xs>
                <Link
                  href={facebook.url}
                  style={{ color: "#1976D2", wordWrap: "break-word" }}
                >
                  <LinesEllipsis
                    text={facebook.name}
                    maxLine="1"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Link>
              </Grid>
            </Grid>
          ) : null}
          {profile.mobile ? (
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item style={{ width: "24px" }}>
                <Phone
                  style={{
                    width: "20px",
                    color: "#2E7D32"
                  }}
                />
              </Grid>
              <Grid item xs>
                <Link
                  href={`tel:{$profile.mobile}`}
                  style={{ color: "#2E7D32", wordWrap: "break-word" }}
                >
                  <LinesEllipsis
                    text={profile.mobile}
                    maxLine="1"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Link>
              </Grid>
            </Grid>
          ) : null}

          {profile.website ? (
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item style={{ width: "24px" }}>
                <PublicOutlined
                  style={{
                    width: "20px",
                    color: "#3f51b5"
                  }}
                />
              </Grid>
              <Grid item xs>
                <Link href={profile.website} style={{ wordWrap: "break-word" }}>
                  <LinesEllipsis
                    text={profile.website}
                    maxLine="1"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Link>
              </Grid>
            </Grid>
          ) : null}
        </div>
      );
    } else {
      return <LinearProgress style={{ margin: "16px" }} />;
    }
  };

  const renderItems = () => {
    return (
      <div>
        {props.user.userDetail ? (
          <>
            <Typography
              variant="inherit"
              style={{
                fontFamily: "'Noto Sans Lao UI', sans serif",
                fontWeight: 700,
                fontSize: "24px"
              }}
            >
              {profile.prefix} {profile.name} {profile.lastname}
              {isOwner || userData.isAdmin ? (
                <IconButton
                  style={{
                    padding: "4px",
                    margin: "4px",
                    position: "relative"
                  }}
                  onClick={() => openEditName()}
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
              ) : null}
            </Typography>
          </>
        ) : (
          <LinearProgress style={{ margin: "16px" }} />
        )}

        {profile.degree && profile.degree.name ? (
          <Typography variant="inherit">
            <span style={{ fontWeight: "bold" }}>ວຸດທິການສຶກສາ: </span>
            {profile.degree.name}
            {isOwner || userData.isAdmin ? (
              <span>
                <IconButton
                  style={{ padding: "4px", margin: "4px" }}
                  onClick={() => openUpdateDegree()}
                >
                  <EditOutlined style={{ fontSize: "16px" }} />
                </IconButton>
              </span>
            ) : null}
          </Typography>
        ) : null}
        <div style={{ height: "16px" }} />
        {renderContactInfo()}
      </div>
    );
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs sm lg md />
          <Grid
            item
            xs={11}
            sm={10}
            lg={8}
            md={11}
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
            <Grid container spacing={24}>
              <Grid align="left" style={{ width: "96px", margin: "12px" }}>
                {profile.profileImage &&
                profile.profileImage[0] &&
                profile.profileImage[0].name ? (
                  <Avatar
                    style={{
                      width: "96px",
                      height: "96px",
                      borderStyle: "solid",
                      borderColor: "rgb(239, 239, 239)",
                      borderWidth: "1px",
                      cursor: isOwner || userData.isAdmin ? "pointer" : "default"
                    }}
                    alt={`${profile.name} ${profile.lastname}`}
                    onClick={()=>{openProfileImageEditor()}}
                  >
                  <img
                      src={`${UPLOADS_SERVER}/images/${profile.profileImage[0].name}`}
                      alt={`${profile.name} ${profile.lastname}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        objectFit: "cover"
                      }}
                    />
                 {
                  isOwner || userData.isAdmin ? 
                    <>
                      <div style={{
                        backgroundColor: "rgba(32,33,36,0.6)",
                            bottom: 0,
                            height: "26%",
                            left: 0,
                            position: "absolute",
                            right: 0,
                      }}>
                      <div style={{
                        backgroundImage: "url(//www.gstatic.com/images/icons/material/system/2x/photo_camera_white_24dp.png)",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        webkitBackgroundSize: "20px 20px",
                        backgroundSize: "20px 20px",
                        height: '100%',
                        opacity: .8,
                      }}>
                      
                      </div>
                      </div>
                      </> 
                    : null
                 }
                  
                  </Avatar>
                ) : (
                  <Avatar
                    style={{
                      width: "96px",
                      height: "96px",
                      backgroundColor: toColor(
                        `${profile.name}${profile.lastname}`
                      ),
                      fontWeight: "500",
                      fontSize: "46px"
                    }}
                    alt={`${profile.name} ${profile.lastname}`}
                    onClick={()=>{openProfileImageEditor()}}

                  >
                    <Typography variant="inherit">
                      {profile.name
                        ? `${profile.name.charAt(0)}${profile.lastname.charAt(
                            0
                          )}`
                        : ""}
                    </Typography>
                    {
                      isOwner || userData.isAdmin ? 
                        <>
                          <div style={{
                            backgroundColor: "rgba(32,33,36,0.6)",
                                bottom: 0,
                                height: "26%",
                                left: 0,
                                position: "absolute",
                                right: 0,
                          }}>
                          <div style={{
                            backgroundImage: "url(//www.gstatic.com/images/icons/material/system/2x/photo_camera_white_24dp.png)",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            webkitBackgroundSize: "20px 20px",
                            backgroundSize: "20px 20px",
                            height: '100%',
                            opacity: .8,
                          }}>
                          
                          </div>
                          </div>
                          </> 
                        : null
                     }
                  </Avatar>
                )}
              </Grid>
              <Grid
                item
                lg={5}
                md={5}
                sm={7}
                xs={12}
                style={{ padding: "left" }}
              >
                {renderItems()}
              </Grid>
              <Grid item lg md sm xs={12} align="right">
                {props.user.userDetail ? (
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    style={{ margin: "8px" }}
                    onClick={() => {
                      openShareDialog();
                    }}
                  >
                    <ReplyOutlined
                      style={{
                        marginRight: "8px",
                        transform: "rotateY(180deg)"
                      }}
                    />
                    ແບ່ງປັນ
                  </Button>
                ) : (
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    style={{ margin: "8px" }}
                  >
                    <CircularProgress size={24} />
                  </Button>
                )}
                {isAuth ? renderFollowButton() : null}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  TabIndicatorProps={{
                    style: {
                      // backgroundColor: "red",f
                      height: "3px",
                      borderTopRightRadius: "3px",
                      borderTopLeftRadius: "3px",
                      paddingLeft: "3px",
                      paddingRight: "3px"
                    }
                  }}
                  
                  style={{ marginTop: "16px" }}
                >
                  <Tab
                    style={{ fontSize: "16px", fontWeight: 500 }}
                    label="ໂດຍລວມ"
                    to={`/profile/${profile._id}`}
                    component={ReactLink}
                  />

                  <Tab
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      textDecoration: "none"
                    }}
                    label="ປະຫວັດລະອຽດ"
                    to={`/profile/${profile._id}/info`}
                    component={ReactLink}
                  />

                  <Tab
                    style={{ fontSize: "16px", fontWeight: 500 }}
                    label="ຜົນງານຄົ້ນຄວ້າ"
                  />
                  {isOwner || userData.isAdmin ? (
                    <Tab
                      style={{ fontSize: "16px", fontWeight: 500 }}
                      label="ສະຖິຕິ"
                    />
                  ) : null}
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs sm lg md />
        </Grid>
      </Grid>

      {children}
    </Grid>
  );
};

export default withRouter(ProfileHeader);
