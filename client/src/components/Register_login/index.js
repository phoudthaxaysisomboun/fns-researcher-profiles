import React from "react";
import Login from './login'

import { Paper, Typography, Button, Grid } from "@material-ui/core";

const styles = {
    container:{
      padding: "26px"
    },
    font: {fontFamily: "'Noto Sans Lao UI', sans-serif", fontWeight: "700"},
  };

const ResgisterLogin = () => {
  return (
    <div className="center_vertical_and_horizontal">
        <Paper style={styles.container} elevation={1}>
        <Typography style={styles.font} variant="h5" component="h3">
        ລົງຊື່ເຂົ້າໃຊ້
        </Typography>

        <Login/>
    </Paper>
      
    </div>
  );
};

export default ResgisterLogin;
