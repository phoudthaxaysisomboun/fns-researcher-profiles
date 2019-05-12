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

import {
  Mail,
  Phone,
  PersonAddOutlined,
  AddOutlined,
  EditOutlined,
  ReplyOutlined,
  CheckOutlined
} from "@material-ui/icons";

const iconStyles = {
  position: "relative",
  top: "6px",
  marginRight: "6px",
  width: "20px"
};

const ProfileHeader = ({ props, runUnfollow, runFollow, children, loading }) => {
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
        
          loading ? <Button
          size="medium"
          variant="outlined"
          color="primary"
          style={{ margin: "8px" }}
        >
          <CircularProgress size={24}/>
        </Button> : <Button
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
        
      ) : (
        null
      );
    }
  };

  const renderContactInfo = () => {
    if (props.user.userDetail) {
      return (
        <div>
          {profile.email ? (
            <Link href={`mailto:${profile.email}`} style={{ color: "#BA000D" }}>
              <Typography variant="inherit">
                <Mail style={iconStyles} />
                {profile.email}
                {isOwner ? (
                  <span>
                    <IconButton style={{ padding: "4px", margin: "4px" }}>
                      <EditOutlined style={{ fontSize: "16px" }} />
                    </IconButton>
                  </span>
                ) : null}
              </Typography>
            </Link>
          ) : null}
          {facebook.name ? (
            <Link href={facebook.url} style={{ color: "#1976D2" }}>
              <Typography variant="inherit">
                <svg
                  style={iconStyles}
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  role="img"
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
                {facebook.name}
                {isOwner ? (
                  <span>
                    <IconButton style={{ padding: "4px", margin: "4px" }}>
                      <EditOutlined style={{ fontSize: "16px" }} />
                    </IconButton>
                  </span>
                ) : null}
              </Typography>
            </Link>
          ) : null}
          {profile.mobile ? (
            <Link href={`tel:{$profile.mobile}`} style={{ color: "#2E7D32" }}>
              <Typography variant="inherit">
                <Phone style={iconStyles} />
                {profile.mobile}
                {isOwner ? (
                  <span>
                    <IconButton style={{ padding: "4px", margin: "4px" }}>
                      <EditOutlined style={{ fontSize: "16px" }} />
                    </IconButton>
                  </span>
                ) : null}
              </Typography>
            </Link>
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
        <Typography
          variant="inherit"
          style={{
            fontFamily: "'Noto Sans Lao UI', sans serif",
            fontWeight: 700,
            fontSize: "24px"
          }}
        >
          {props.user.userDetail ? (
            `${profile.prefix} ${profile.name} ${profile.lastname}`
          ) : (
            <LinearProgress style={{ margin: "16px" }} />
          )}
          {isOwner ? (
            <span>
              <IconButton style={{ padding: "4px", margin: "4px" }}>
                <EditOutlined style={{ fontSize: "16px" }} />
              </IconButton>
            </span>
          ) : null}
        </Typography>

        {profile.degree ? (
          <Typography variant="inherit">
            <span style={{ fontWeight: "bold" }}>ວຸດທິການສຶກສາ: </span>
            {profile.degree}
            {isOwner ? (
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
                  {
                    props.user.userDetail ?
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
                  : <Button
                  size="medium"
                  variant="outlined"
                  color="primary"
                  style={{ margin: "8px" }}
                >
                  <CircularProgress size={24} />
                </Button>
                  }
                  {isAuth ? renderFollowButton() : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs sm={1} lg={3} md={2} />
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
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ໂດຍລວມ"
                />
                <Tab
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ປະຫວັດລະອຽດ"
                />
                <Tab
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ຜົນງານຄົ້ນຄວ້າ"
                />
                {isOwner ? (
                  <Tab
                    style={{ fontSize: "14px", fontWeight: 500 }}
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

export default ProfileHeader;
