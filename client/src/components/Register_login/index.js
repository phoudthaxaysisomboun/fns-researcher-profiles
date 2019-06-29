import React from "react";
import Login from "./login";

import { Paper, Typography, Grid } from "@material-ui/core";



const styles = {
  container: {
    padding: "26px",
    border: "1px solid #d8d8d8",
    maxWidth: "480px",
    marginLeft: 'auto',
    marginRight: "auto"
  },
  font: {
    fontFamily: "'Noto Sans Lao UI', sans-serif",
    fontWeight: "700",
    textAlign: "center"
  }
};


const ResgisterLogin = () => {
  return (
    <Grid container justify="center" spacing={0} style={{marginTop: "40px",marginBottom: "40px"}}>
      <Grid item lg md sm xs/>
      <Grid item lg={4} md={6}  sm={9} xs={11}>
        <Paper style={styles.container} elevation={0} >
          <embed
            height="100px"
            width="100%"
            style={{ marginBottom: "16px" }}
            type="image/svg+xml"
            src="/images/fns.svg"
          />

          <Typography style={styles.font} variant="h6" component="h3">
            ລົງຊື່ເຂົ້າໃຊ້
          </Typography>

          <Login />
        </Paper>
      </Grid>
      <Grid item lg md sm xs/>
    </Grid>
    // <div className="center_vertical_and_horizontal">
    //   <Paper style={styles.container} elevation={0}>
    //     <embed height="100px" width="100%" style={{marginBottom: "16px"}} type="image/svg+xml" src="/images/fns.svg" />

    //     <Typography style={styles.font} variant="h6" component="h3">
    //       ລົງຊື່ເຂົ້າໃຊ້
    //     </Typography>

    //     <Login />
    //   </Paper>
    // </div>
  );
};

export default ResgisterLogin;
