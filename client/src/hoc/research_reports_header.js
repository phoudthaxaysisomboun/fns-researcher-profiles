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

const ResearchReportsHeader = ({ tab, props, children }) => {
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
              label="ຈໍານວນ"
              to={`/admin/reports/research/numbers`}
              component={Link}
            />

            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ລາຍຊື່"
              to={`/admin/reports/research/lists`}
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

export default ResearchReportsHeader;
