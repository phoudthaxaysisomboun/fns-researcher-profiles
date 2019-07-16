import React from "react";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";

const AffiliationCard = ({props, editAffiliation}) => {
  const profile = { ...props.user.userDetail };
  const user = {...props.user.userData}
  const affiliation = { ...profile.affiliation };
  const department = { ...affiliation.department };
  const faculty = { ...affiliation.faculty };
  const institution = { ...affiliation.institution };

  const isAuth = user.isAuth
  var isOwner = false

  if (isAuth) {
    if ((user._id === profile._id) || user.isAdmin) {
      isOwner = true
    } else {
      isOwner = false
    }
  }


  return (
    <div>
      
      <Paper style={{boxShadow: "none", border:"1px solid #d8d8d8"}}><Grid container style={{padding: "16px", paddingBottom: 0}}>
      <Grid item xs={6}>
        <Typography
          variant="inherit"
          style={{
            fontSize: "1.375rem",
            marginBottom: "8px",
            fontWeight: "bold"
          }}
        >
          ສັງກັດ
        </Typography>
      </Grid>
      <Grid item xs={6} align="right">
      {
        props.user.userDetail && (isOwner || user.isAdmin) ? 
        <IconButton style={{ padding: 0 }} onClick={()=>{editAffiliation()}}>
          <EditOutlined fontSize="small" />
        </IconButton>
        : null
      }
        
      </Grid>
    </Grid>
        {profile.affiliation ?
          <Grid container spacing={8} style={{ padding: "16px" }}>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="inherit"
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#212121"
                  }}
                >
                  {institution.name}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "6px" }}>
                <Typography
                  variant="inherit"
                  style={{ fontWeight: "600", color: "#4c4c4c" }}
                >
                  ຄະນະ:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="inherit" style={{ color: "#666666" }}>
                  {faculty.name}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "6px" }}>
                <Typography
                  variant="inherit"
                  style={{ fontWeight: "600", color: "#4c4c4c" }}
                >
                  ພາກວິຊາ:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="inherit" style={{ color: "#666666" }}>
                  {department.name}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "6px" }}>
                <Typography
                  variant="inherit"
                  style={{ fontWeight: "600", color: "#4c4c4c" }}
                >
                  ຕໍາແຫນ່ງ:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="inherit" style={{ color: "#666666" }}>
                  {affiliation.position}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} align="right">
            <embed
              height="80px"
              width="80px"
              style={{ marginBottom: "16px" }}
              type="image/svg+xml"
              src="/images/fns.svg"
            />
          </Grid>
        </Grid> : <LinearProgress style={{margin: "16px"}} />
        }
      </Paper>
    </div>
  );
};

export default AffiliationCard;
