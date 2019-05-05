import React from "react";

import {
  IconButton,
  Grid,
  Paper,
  Chip,
  Typography,
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
    if (user._id === profile._id){
      isOwner = true
    } else {
      isOwner = false
    }
  }

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
            ຂົງເຂດການຄົ້ນຄວ້າ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          {isOwner ? (
            <IconButton style={{ padding: "4px", margin: "4px" }}>
              <EditOutlined fontSize="small" />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <Grid container spacing={8} style={{ padding: "16px" }}>
          {profile.researchArea
            ? profile.researchArea.map((data, i) => {
                return (
                  <Chip
                    key={i}
                    label={data.label}
                    variant="outlined"
                    style={{ fontSize: "14px", margin: "4px" }}
                  />
                );
              })
            : null}
        </Grid>
      </Paper>
    </div>
  );
};

export default ResearchaAreaCard;
