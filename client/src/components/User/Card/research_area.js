import React from "react";

import {
  IconButton,
  Grid,
  Paper,
  Chip,
  Typography,
  LinearProgress
} from "@material-ui/core";

import {
  EditOutlined,
} from "@material-ui/icons";

const ResearchaAreaCard = props => {
  const profile = { ...props.user.userDetail };
  const user = { ...props.user.userData };

  var isOwner = false
  const isAuth =  user.isAuth

  if (isAuth) {
    if ((user._id === profile._id) || user.isAdmin){
      isOwner = true
    } else {
      isOwner = false
    }
  }

  const renderItems = () => {
    return (
      props.user.userDetail && props.user.userDetail.researchArea.length != 0 ?
      <Grid item xs={12}>
      
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
      <Grid container style={{padding: "16px", paddingBottom: 0}}>
        <Grid item xs={6}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "1.375rem",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            ຂົງເຂດການຄົ້ນຄວ້າ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          {isOwner ? (
            <IconButton style={{ padding: "4px",  }}>
              <EditOutlined fontSize="small" />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
        <Grid container spacing={8} style={{ padding: "16px" }}>
          {
            profile.researchArea.map((data, i) => {
              return (
                <Chip
                  key={i}
                  label={data.label}
                  variant="outlined"
                  style={{ fontSize: "14px", margin: "4px" }}
                />
              );
            })
          }
        </Grid>
      </Paper>
      </Grid>
      : null
    )
  }

  const renderNoData = () => {
    return (
      <Grid item xs={12}>
      
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
      <Grid container style={{padding: "16px", paddingBottom: 0}}>
        <Grid item xs={6}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "1.375rem",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            ຂົງເຂດການຄົ້ນຄວ້າ
          </Typography>
        </Grid>
        
      </Grid>
        <LinearProgress style={{margin: "16px"}}/>
      </Paper>
      </Grid>
    )
  }

  return (
    props.user.userDetail ? renderItems() : renderNoData()
  );
};

export default ResearchaAreaCard;
