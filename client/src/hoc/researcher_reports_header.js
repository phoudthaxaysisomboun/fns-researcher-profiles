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

const ResearcherReportsHeader = ({ tab, props, children, requestCount }) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        style={{ paddingTop: "24px",}}
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
            ລາຍງານນັກຄົ້ນຄວ້າ
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
              to={`/admin/reports/researchers`}
              component={Link}
            />

            <Tab
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
              label="ດີເດັ່ນ"
              to={`/admin/reports/researchers/outstanding`}
              component={Link}
            />
            <Tab
              style={{
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none"
              }}
              label="ຫນ້າໃຫມ່"
              to={`/admin/reports/researchers/newcomer`}
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

export default ResearcherReportsHeader;
