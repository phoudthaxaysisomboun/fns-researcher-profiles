import React from "react";

import { Link, withRouter } from "react-router-dom";

import {
  Grid,
  Avatar,
  Divider,
  Button,
  Typography
} from "@material-ui/core";

import {
  CheckOutlined,
  PersonAddOutlined,
  ExpandMoreOutlined
} from "@material-ui/icons";

const LoadMoreFollowingCard = ({
  userData,
  userDetail,
  userFollowing,
  runFollow,
  runUnfollow,
  followingLimit,
  loadMore
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

  const renderItems = () => (
    <div>
    {profile.following && profile.following.length === 0 ? (
      <div style={{ margin: "20px" }}>
        <Typography variant="inherit" align="center">
          ຍັງບໍ່ມີຜູ້ຕິດຕາມ
        </Typography>
      </div>
    ) : (
      <div>
        {userFollowing
          ? userFollowing.map(followings => (
              <div key={followings._id}>
                <Grid container spacing={0} style={{ padding: "16px" }}>
                  <Grid
                    item
                    align="center"
                    style={{ marginRight: "8px", width: "54px" }}
                  >
                    <Link to={`/profile/${followings._id}`}>
                      <Avatar
                        alt="Remy Sharp"
                        style={{ width: "46px", height: "46px" }}
                        src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                      />
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
            {userDetail.following.length <= userFollowing.length ? (
             null
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
            )}
          </Grid>
        </Grid>
      </div>
    )}
    </div>
  );

  return <div>{renderItems()}</div>;
};

export default withRouter(LoadMoreFollowingCard);
