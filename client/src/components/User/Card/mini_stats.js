import React from "react";

import { Grid, Paper, Typography, CircularProgress } from "@material-ui/core";

import {
  InsertDriveFileOutlined,
  RemoveRedEyeOutlined,
  ForwardOutlined
} from "@material-ui/icons";

const iconStyles = {
  position: "relative",
  top: "5px",
  marginRight: "4px",
  width: "20px"
};



const MiniStatsCard = props => {
  const renderItems = () => {
    return (
      <div>
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
              ສະຖິຕິໂດຍລວມ
            </Typography>
          </Grid>
        </Grid>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <Grid container spacing={8} style={{ padding: "12px" }}>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="inherit" style={{ fontSize: "16px" }}>
                    <InsertDriveFileOutlined style={iconStyles} />
                    ຜົນງານ
                  </Typography>
                </Grid>
  
                <Grid item xs={12}>
                  {props.user.userDetail ? (
                    <Typography variant="h5" style={{ fontWeight: "600" }}>
                      0
                    </Typography>
                  ) : (
                    <CircularProgress size={24} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="inherit" style={{ fontSize: "16px" }}>
                    <RemoveRedEyeOutlined style={iconStyles} />
                    ຖືກອ່ານ
                  </Typography>
                </Grid>
  
                <Grid item xs={12}>
                  {props.user.userDetail ? (
                    <Typography variant="h5" style={{ fontWeight: "600" }}>
                      0
                    </Typography>
                  ) : (
                    <CircularProgress size={24} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="inherit" style={{ fontSize: "16px" }}>
                    <ForwardOutlined style={iconStyles} />
                    ຖືກນໍາໄປອ້າງອີງ
                  </Typography>
                </Grid>
  
                <Grid item xs={12}>
                  {props.user.userDetail ? (
                    <Typography variant="h5" style={{ fontWeight: "600" }}>
                      0
                    </Typography>
                  ) : (
                    <CircularProgress size={24} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
  
  return renderItems();
};

export default MiniStatsCard;
