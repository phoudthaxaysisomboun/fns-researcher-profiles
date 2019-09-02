import React from "react";

import { Link, withRouter } from "react-router-dom";

import { UPLOADS_SERVER } from "../../../components/utils/misc";

import {
  Grid,
  Avatar,
  Divider,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";

import {
  CheckOutlined,
  PersonAddOutlined,
  ExpandMoreOutlined
} from "@material-ui/icons";

import { colorPallete } from "../../utils/misc";

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

const LoadMoreFollowerCard = ({
  userData,
  userDetail,
  userFollower,
  runFollow,
  runUnfollow,
  followerLimit,
  loadMore,
  loading
}) => {
  const user = { ...userData };
  const profile = { ...userDetail };

  const isAuth = user.isAuth;
  // var isOwner = false;

  // if (isAuth) {
  //   if (user._id === profile._id) {
  //     isOwner = true;
  //   } else {
  //     isOwner = false;
  //   }
  // }

  const renderFollowButton = id => {
    let duplicate = false;
    userData.following.forEach(item => {
      if (item._id === id) {
        duplicate = true;
      }
    });

    if (id === userData._id) {
      return <div />;
    }

    if (duplicate) {
      return (
        <Grid item style={{ width: "100px" }} align="right">
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => {
              runUnfollow(id);
            }}
          >
            <CheckOutlined style={{ marginRight: "8px" }} />
            ຕິດຕາມຢູ່
          </Button>
        </Grid>
      );
    } else {
      return (
        <Grid item style={{ width: "100px" }} align="right">
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              runFollow(id);
            }}
          >
            <PersonAddOutlined style={{ marginRight: "8px" }} />
            ຕິດຕາມ
          </Button>
        </Grid>
      );
    }
  };

  const renderButton = () =>
    loading ? (
      <CircularProgress size={24} style={{ margin: "6px" }} />
    ) : (
      <Button
        color="primary"
        style={{ width: "100%" }}
        onClick={() => {
          loadMore();
        }}
      >
        {" "}
        <ExpandMoreOutlined style={{ marginRight: "8px" }} />
        ໂຫລດຕື່ມ
      </Button>
    );

  const renderItems = () => (
    <div>
      {profile.follower && profile.follower.length === 0 ? (
        <div style={{ margin: "20px" }}>
          <Typography variant="inherit" align="center">
            ຍັງບໍ່ມີຜູ້ຕິດຕາມ
          </Typography>
        </div>
      ) : (
        <div>
          {userFollower
            ? userFollower.map(followings => (
                <div key={followings._id}>
                  <Grid container spacing={0} style={{ padding: "16px" }}>
                    <Grid
                      item
                      align="center"
                      style={{ marginRight: "8px", width: "54px" }}
                    >
                      <Link
                        to={`/profile/${followings._id}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {followings.profileImage &&
                        followings.profileImage[0] &&
                        followings.profileImage[0].name ? (
                          <Avatar
                            alt="profile image"
                            style={{
                              width: "46px",
                              height: "46px",
                              borderStyle: "solid",
                              borderColor: "rgb(239, 239, 239)",
                              borderWidth: "1px"
                            }}
                            src={`${UPLOADS_SERVER}/images/${followings.profileImage[0].name}`}
                          />
                        ) : (
                          <Avatar
                            alt="profile image"
                            style={{
                              width: "46px",
                              height: "46px",
                              backgroundColor: toColor(
                                `${followings.name}${followings.lastname}`
                              ),
                              fontFamily: "'Noto Sans Lao UI', sans serif",
                              fontWeight: "500"
                            }}
                          >
                            <Typography variant="inherit">
                              {`${followings.name.charAt(
                                0
                              )}${followings.lastname.charAt(0)}`}
                            </Typography>
                          </Avatar>
                        )}
                      </Link>
                    </Grid>
                    <Grid item xs>
                      <Grid container>
                        <Grid item xs>
                          <Link
                            to={`/profile/${followings._id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              style={{ fontWeight: "bold", color: "#404040" }}
                              variant="inherit"
                            >
                              {followings.name} {followings.lastname}
                            </Typography>
                          </Link>
                          <Typography
                            variant="inherit"
                            style={{ fontSize: "14px", fontWeight: "500" }}
                          >
                            {followings.affiliation.institution.name}
                          </Typography>
                          <Typography
                            variant="inherit"
                            style={{ fontSize: "13px", color: "#686868" }}
                          >
                            {followings.affiliation.faculty.name} •{" "}
                            {followings.affiliation.department.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {isAuth ? renderFollowButton(followings._id) : null}
                  </Grid>
                  <Divider />
                </div>
              ))
            : null}

          <Grid container>
            <Grid item xs={12} align="center">
              {profile.follower.length <= userFollower.length ||
              profile.follower.length === 6
                ? null
                : renderButton()}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );

  return <div>{renderItems()}</div>;
};

export default withRouter(LoadMoreFollowerCard);
