import React from "react";

import { Link, withRouter } from "react-router-dom";

import {
  Grid,
  Paper,
  Avatar,
  Divider,
  Button,
  Typography,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";

import {
  CheckOutlined,
  ListOutlined,
  PersonAddOutlined
} from "@material-ui/icons";

import { colorPallete } from "../../../utils/misc";

import { UPLOADS_SERVER } from "../../../../components/utils/misc";

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


const SuggestedToFollowCard = ({
  userData,

  userFollower,
  runFollow,
  runUnfollow,
  runSeeAllFollower,
  loading
}) => {
  const user = { ...userData };
 

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

  const renderFollower = () => (
    <div>
      {userFollower
        ? <div>
          {
            userFollower.map(followings => (
              <div key={followings._id}>
                <Grid container spacing={0} style={{ padding: "16px" }}>
                  <Grid
                    item
                    align="center"
                    style={{ marginRight: "8px", width: "54px" }}
                  >
                    <Link to={`/profile/${followings._id}`}
                    
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
                            borderColor: "#CFCECE",
                            borderWidth: "1px"
                          }}
                          src={`${UPLOADS_SERVER}/images/${
                            followings.profileImage[0].name
                          }`}
                        />
                      ) : (
                        <Avatar
                          alt="profile image"
                          style={{
                            width: "46px",
                            height: "46px",
                            backgroundColor: toColor(`${followings.name}${
                              followings.lastname
                            }`),
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
                            style={{ fontWeight: "500", color: "#404040" }}
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
          }
          <Grid container>
                  <Grid item xs={12} align="center">
                    <Button
                      color="primary"
                      style={{ width: "100%" }}
                      onClick={() => {
                        // runSeeAllFollower();
                      }}
                    >
                      {" "}
                      <ListOutlined style={{ marginRight: "8px" }} />
                      ເບິ່ງທັງຫມົດ
                    </Button>
                  </Grid>
                </Grid>
        </div>
        : <div style={{ margin: "20px", textAlign: "center",   }}>
        <CircularProgress  />
      </div>}
    </div>
  );
  const renderItems = () => (

      
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8", marginTop: "24px", position: "" }}>
      <Grid container style={{padding: "16px", paddingBottom: 0}}>
        <Grid item xs={12}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "1.375rem",
              marginBottom: "8px",
              fontWeight: "500"
            }}
          >
            ແນະນໍາໃຫ້ຕິດຕາມ
          </Typography>
        </Grid>
      </Grid>
        {!loading ? (
          <div>{renderFollower()}</div>
        ) : (
          <LinearProgress style={{ margin: "16px" }} />
        )}
      </Paper>

  );

  return <div>{renderItems()}</div>;
};

export default withRouter(SuggestedToFollowCard);
