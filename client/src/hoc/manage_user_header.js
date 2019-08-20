import React from "react";

import { Link, withRouter } from "react-router-dom";

import {
  IconButton,
  Grid,
  Fab,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Typography,
  LinearProgress,
  CircularProgress,
  Divider, Badge
} from "@material-ui/core";

const ManageUserHeader = ({ tab, props, children, requestCount, width }) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        style={{ paddingTop: "24px", paddingLeft: width === "lg" || width === "xl" ? 180 : 0}}
      >
        <Grid item xs sm lg md />

        <Grid item xs={11} sm={11} lg={11} md={11}>
        <Typography
              variant="inherit"
              style={{
                fontFamily: "'Noto Sans Lao UI', sans serif",
                fontWeight: 500,
                fontSize: "24px"
              }}
            >
            ເຄຶ່ອງມືຈັດການນັກຄົ້ນຄວ້າ
            </Typography>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
            style={{ marginTop: "16px" }}
          >
            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ທັງຫມົດ"
              to={`/admin/researchers`}
              component={Link}
            />

            {
              requestCount && requestCount > 0 ?
              <Tab
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
              label={
                <Badge color="secondary" style={{padding: "0 16px"}} badgeContent={requestCount}>
                ຂໍສະຫມັກ
                </Badge>
              }
              
              to={`/admin/researchers/requests`}
              component={Link}
            /> :
            <Tab
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
              label="ຂໍສະຫມັກ"
              
              to={`/admin/researchers/requests`}
              component={Link}
            />
            }

            
            <Tab
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
              label="ດີເດັ່ນ"
              to={`/admin/researchers/outstanding`}
              component={Link}
            />
            <Tab
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
              label="ຫນ້າໃຫມ່"
              to={`/admin/researchers/newcomer`}
              component={Link}
            />
          </Tabs>
          <Divider />
        </Grid>
        <Grid item xs sm lg md />
      </Grid>
      {children}
    </>
  );
};

export default ManageUserHeader;
