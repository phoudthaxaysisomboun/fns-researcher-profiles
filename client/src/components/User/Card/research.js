import React from "react";

import { Link, withRouter } from "react-router-dom";

import {
  Grid,
  Paper,
  Avatar,
  Divider,
  Button,
  Typography,
  IconButton
} from "@material-ui/core";

import {
  CheckOutlined,
  ListOutlined,
  PersonAddOutlined,
  MoreVertOutlined
} from "@material-ui/icons";

const ResearchCard = ({ userData, userDetail }) => {
  const user = { ...userData };
  const profile = { ...userDetail };

  const isAuth = user.isAuth;
  let isOwner = false;

  if (isAuth) {
    if (userData._id === profile._id) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = id => (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "20px",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            ຜົນງານການຄົ້ນຄວ້າ
          </Typography>
        </Grid>
      </Grid>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }} >
            <Grid container style={{ padding: "8px" }}>
                <Grid item xs={6} style={{paddingTop: "8px", paddingLeft: "8px"}}>
                    <Typography variant="body1" style={{fontFamily: "'Roboto', sans-serif", fontSize: "12px", letterSpacing: "1.5 px", fontWeight: "600", color: "#00695C"}}>
                        {"10/02/2041"}
                    </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                    {isOwner ? 
                        <IconButton style={{ padding: 0 }}>
                        <MoreVertOutlined fontSize="small" />
                        </IconButton>
                    : null
                    }
                </Grid>
                
            </Grid>
      </Paper>
    </Grid>
  );

  return <div>{renderItems()}</div>;
};

export default withRouter(ResearchCard);
