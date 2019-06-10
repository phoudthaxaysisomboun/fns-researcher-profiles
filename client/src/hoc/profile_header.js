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
  CircularProgress
} from "@material-ui/core";

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
  PersonOutlined
} from "@material-ui/icons";

import { Link as ReactLink, withRouter } from "react-router-dom";

const ProfileHeader = ({
  props,
  runUnfollow,
  runFollow,
  children,
  loading,
  tab,
  openShareDialog
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
        >
          <AddOutlined style={{ marginRight: "8px" }} />
          ເພີ່ມຜົນງານ
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
                >
                  <EditOutlined fontSize="small" />
                </IconButton>
              ) : null}
            </Typography>
          </>
        ) : (
          <LinearProgress style={{ margin: "16px" }} />
        )}

        {profile.degree ? (
          <Typography variant="inherit">
            <span style={{ fontWeight: "bold" }}>ວຸດທິການສຶກສາ: </span>
            {profile.degree}
            {isOwner || userData.isAdmin ? (
              <span>
                <IconButton style={{ padding: "4px", margin: "4px" }}>
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
            <Grid item xs sm={1} lg={3} md={2} />
            <Grid item xs={10} sm={10} lg={6} md={8}>
              <Grid container spacing={24}>
                <Grid align="left" style={{ width: "96px", margin: "12px" }}>
                  
                  <Avatar
                    style={{ width: "96px", height: "96px", backgroundColor: "white", borderStyle: "solid", borderWidth: "2px", borderColor: "#e6e6e6" }}
                    alt="profile image"
                  >
                  <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  
                  style={{
                    pointerEvents: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    fill: "#bbbbbb",
                    padding: "8px"
                  }}
                >
                  <g style={{color: "#0066cb"}}>
                    <path
                      d="M12,0 C18.62375,0 24,5.37625 24,12 C24,18.62375 18.62375,24 12,24 C5.37625,24 0,18.62375 0,12 C0,5.37625 5.37625,0 12,0 Z M12,10.63625 C13.66,10.63625 15,9.29625 15,7.63625 C15,5.97625 13.66,4.63625 12,4.63625 C10.34,4.63625 9,5.97625 9,7.63625 C9,9.29625 10.34,10.63625 12,10.63625 Z M12,12.40875 C8.33375,12.40875 5.455,14.18125 5.455,15.8175 C6.84125,17.95 9.26875,19.3625 12,19.3625 C14.73125,19.3625 17.15875,17.95 18.545,15.8175 C18.545,14.18125 15.66625,12.40875 12,12.40875 Z"
                      class="style-scope yt-icon"
                    />
                  </g>
                </svg>
                  </Avatar>
                </Grid>
                <Grid
                  item
                  lg={5}
                  md={5}
                  sm={8}
                  xs={12}
                  style={{ padding: "left" }}
                >
                  {renderItems()}
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} align="right">
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
            </Grid>
            <Grid item xs sm={1} lg={3} md={2} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                centered
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
        </Paper>
      </Grid>

      {children}
    </Grid>
  );
};

export default withRouter(ProfileHeader);
