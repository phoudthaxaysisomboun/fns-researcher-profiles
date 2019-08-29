import React from "react";

import { Link } from "react-router-dom";

import {
  Grid,
  Tabs,
  Tab,
  Typography,
  Divider, 
} from "@material-ui/core";

const ResearchReportsHeader = ({ tab, props, children, width }) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        style={{ paddingTop: "24px" , paddingLeft: width === "xl" ? 240 : width === "lg" ? 180 : 0}}
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
            ລາຍງານຜົນງານການຄົ້ນຄວ້າ
            </Typography>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
            style={{ marginTop: "16px" }}
            TabIndicatorProps={{
              style:{
                // backgroundColor: "red",
                height: "3px",
                borderTopRightRadius: "3px",
                borderTopLeftRadius: "3px",
                paddingLeft: "3px",
                paddingRight: "3px"
              }
            }}
          >
            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ຈໍານວນ"
              to={`/admin/reports/researches/numbers`}
              component={Link}
            />

            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ລາຍການ"
              to={`/admin/reports/researches/lists`}
              component={Link}
            />
            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ຖືກໃຈ-ຄໍາເຫັນ-ແບ່ງປັນ"
              to={`/admin/reports/researches/likes_comments_shares`}
              component={Link}
            />
            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ອ່ານ"
              to={`/admin/reports/researches/reads`}
              component={Link}
            />
            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ດາວນ໌ໂຫລດ"
              to={`/admin/reports/researches/downloads`}
              component={Link}
            />
            <Tab
              style={{ fontWeight: 500, fontSize: "14px" }}
              label="ນໍາໄປອ້າງອີງ"
              to={`/admin/reports/researches/citations`}
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
