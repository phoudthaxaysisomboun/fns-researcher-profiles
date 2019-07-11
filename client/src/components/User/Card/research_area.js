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

const ResearchaAreaCard = ({props, runOpenUpdateDialog}) => {
  const profile = { ...props.user.userDetail };
  const user = { ...props.user.userData };

  var isOwner = false
  const isAuth =  user.isAuth

  if (isAuth || user.isAdmin) {
    if ((user._id === profile._id) || user.isAdmin){
      isOwner = true
    } else {
      isOwner = false
    }
  }

  const renderItems = () => {
    return (
      isOwner ?
      <>
      

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
          ຫົວຂໍ້ການຄົ້ນຄ້ວາ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          {props.user.userDetail && (isOwner || user.isAdmin) ? (
            <IconButton style={{ padding: "0",  }}>
              <EditOutlined onClick={()=>{runOpenUpdateDialog()}} fontSize="small" />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
        <Grid container style={{ padding: "16px", paddingTop: 0 }}>
        {
          props.user.userDetail && props.user.userDetail.researchArea.length !== 0 ? 
          <>
          {
            profile.researchArea.map((data, i) => {
              return (
                <Chip
                  key={i}
                  label={data}
                  variant="outlined"
                  style={{ fontSize: "14px", margin: "4px" }}
                />
              );
            })
          }</> : <Typography
          variant="inherit"
          style={{
            textAlign: "center",
            width: "100%",
            color: "rgb(137, 137, 137)"
          }}
        >
          ຍັງບໍ່ມີຂໍ້ມູນເທື່ອຄລິກປຸມ່ແກ້ໄຂດ້ານເທິງເພື່ອເພີ່ມຂໍ້ມູນ
        </Typography>}
        </Grid>
      </Paper>
      </Grid>
      </> : <>
      {
        props.user.userDetail && props.user.userDetail.researchArea.length !== 0 ?
        <>
        
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
          ຫົວຂໍ້ການຄົ້ນຄ້ວາ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          
        </Grid>
      </Grid>
        <Grid container style={{ padding: "16px", paddingTop: 0 }}>
        {
          profile.researchArea.map((data, i) => {
            return (
              <Chip
                key={i}
                label={data}
                variant="outlined"
                style={{ fontSize: "14px", margin: "4px" }}
              />
            );
          })
        }
        </Grid>
      </Paper>
      </Grid>
        
        </> : null
      }
      
      </>
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
          ຫົວຂໍ້ການຄົ້ນຄ້ວາ
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
