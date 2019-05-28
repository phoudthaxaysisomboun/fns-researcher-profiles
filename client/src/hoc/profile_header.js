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
  Web
} from "@material-ui/icons";

import { Link as ReactLink, withRouter } from "react-router-dom";

const iconStyles = {
  position: "relative",
  top: "6px",
  marginRight: "6px",
  width: "20px"
};

const ProfileHeader = ({
  props,
  runUnfollow,
  runFollow,
  children,
  loading,
  tab
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
                    position: "relative",
                    
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
                position: "relative",
                top: "2px",
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
                  <Typography variant="inherit">
                  {facebook.name}
                    {isOwner || userData.isAdmin ? (
                      <IconButton style={{ padding: "4px", margin: "4px" }}>
                        <EditOutlined style={{ fontSize: "16px" }} />
                      </IconButton>
                    ) : null}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            
            
          ) : null}
          {profile.mobile ? (
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item style={{ width: "24px" }}>
                <Phone
                  style={{
                    position: "relative",
                    top: "2px",
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
                  <Typography variant="inherit">
                  {profile.mobile}
                    {isOwner || userData.isAdmin ? (
                      <IconButton style={{ padding: "4px", margin: "4px" }}>
                        <EditOutlined style={{ fontSize: "16px" }} />
                      </IconButton>
                    ) : null}
                  </Typography>
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
            borderTop: "0"
          }}
        >
          <Grid container>
            <Grid item xs sm={1} lg={3} md={2} />
            <Grid item xs={10} sm={10} lg={6} md={8}>
              <Grid container spacing={24}>
                <Grid align="left" style={{ width: "96px", margin: "12px" }}>
                  <Avatar
                    style={{ width: "96px", height: "96px" }}
                    alt="Remy Sharp"
                    srcSet="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  >
                    <Button style={{ zIndex: "100" }}> test</Button>
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
