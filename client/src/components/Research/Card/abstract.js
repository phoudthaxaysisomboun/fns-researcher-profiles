import React from "react";
import AutoLinkText from "react-autolink-text2";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";



  const renderNoData = () => {
    return (
      <LinearProgress style={{margin: "16px"}} />
    )
  }

const AbstractCard = ({user, research}) => {
    const renderItems = () => {
        return (
          
          <Grid container spacing={8} style={{ padding: "24px" }}>
          <Typography variant="body1" style={{}} >
            <AutoLinkText text={research ? research.abstract : null} />
    
            
          </Typography>
        </Grid>
        )
      }
    return (
        <Grid item xs={12}>
    
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <Grid container style={{padding: "24px", paddingBottom: 0}}>
          <Grid item xs={6}>
            <Typography
              variant="inherit"
              style={{
                fontSize: "1.375rem",
                marginBottom: "8px",
                fontWeight: "bold"
              }}
            >
              ແນະນໍາ
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            {true ? (
              <IconButton style={{ padding: 0 }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
        {true ? renderItems() : renderNoData()}
          
        </Paper>
      </Grid>
    );
};

export default AbstractCard;