import React from "react";

import { Link } from "react-router-dom";
import withWidth from '@material-ui/core/withWidth';

import {
  
  Grid,
  
  Tabs,
  Tab,
  Typography,
  
  Divider, 
} from "@material-ui/core";

const ManageResearchHeader = ({ tab, props, children, requestCount }) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        style={{ paddingTop: "24px", }}
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
            ເຄຶ່ອງມືຈັດການຜົນງານການຄົ້ນຄວ້າ
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
              label="ທັງຫມົດ"
              to={`/admin/researches`}
              component={Link}
            />

            {
                // {
                //     requestCount && requestCount > 0 ?
                //     <Tab
                //     style={{
                //       fontSize: "14px",
                //       fontWeight: 500,
                //       textDecoration: "none"
                //     }}
                //     label={
                //       <Badge color="secondary" style={{padding: "0 16px"}} badgeContent={requestCount}>
                //       ຂໍສະຫມັກ
                //       </Badge>
                //     }
                    
                //     to={`/admin/researchers/requests`}
                //     component={Link}
                //   /> :
                //   <Tab
                //     style={{
                //       fontSize: "14px",
                //       fontWeight: 500,
                //       textDecoration: "none"
                //     }}
                //     label="ຂໍສະຫມັກ"
                    
                //     to={`/admin/researchers/requests`}
                //     component={Link}
                //   />
                //   }
      
                  
                //   <Tab
                //     style={{
                //       fontSize: "14px",
                //       fontWeight: 500,
                //       textDecoration: "none"
                //     }}
                //     label="ດີເດັ່ນ"
                //     to={`/admin/researchers/outstanding`}
                //     component={Link}
                //   />
                //   <Tab
                //     style={{
                //       fontSize: "14px",
                //       fontWeight: 500,
                //       textDecoration: "none"
                //     }}
                //     label="ຫນ້າໃຫມ່"
                //     to={`/admin/researchers/newcomer`}
                //     component={Link}
                //   />
            }
          </Tabs>
          <Divider />
        </Grid>
        <Grid item xs sm lg md />
      </Grid>
      {children}
    </>
  );
};

export default withWidth()(ManageResearchHeader);
