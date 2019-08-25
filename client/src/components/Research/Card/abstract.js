import React from "react";
import AutoLinkText from "react-autolink-text2";
import {
  IconButton,
  Grid,
  Paper,
  Typography,

  CircularProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";

const renderNoData = () => {
  return (
    <Grid item xs={12} align="center">
    <CircularProgress style={{ padding: "24px" }} />
    </Grid>
  );
};

const AbstractCard = ({ user, research }) => {
  const abstract = research && research.abstract ? research.abstract : "";

  const renderItems = () => {
    return (
      <Grid
        container
        spacing={8}
        style={{ padding: "24px", paddingTop: "16px" }}
      >
        <Typography
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: "24px",
            fontSize: "1rem"
          }}
        >
          <AutoLinkText text={abstract} />
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid item xs={12}>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <Grid container style={{ padding: "24px", paddingBottom: 0 }}>
          <Grid item xs={6}>
            <Typography
              variant="inherit"
              style={{
                fontSize: "1.375rem",
                marginBottom: "8px",
                fontWeight: "bold"
              }}
            >
              ບົດຄັດຍໍ່
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            {user.isAuth && (user._id === research.uploader || user.isAdmin) ? (
              <IconButton style={{ padding: 0 }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
        {research && research.abstract ? renderItems() : renderNoData()}
      </Paper>
    </Grid>
  );
};

export default AbstractCard;
