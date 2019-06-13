import React from "react";

import {
  IconButton,
  Grid,
  Fab,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
  Link,
  Typography,
  LinearProgress,
  CircularProgress,
  Hidden,
  InputBase,
  Divider
} from "@material-ui/core";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import NumberFormat from "react-number-format";

import moment from "moment";

import LinesEllipsis from "react-lines-ellipsis";

import {
  Mail,
  Phone,
  PersonAddOutlined,
  AddOutlined,
  EditOutlined,
  ReplyOutlined,
  CheckOutlined,
  Web,
  PublicOutlined,
  ListOutlined,
  CommentOutlined,
  ModeCommentOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  MoreVertOutlined,
  ForwardOutlined,
  MoreHorizOutlined,
  RemoveRedEyeOutlined,
  MenuOutlined,
  DirectionsOutlined,
  SearchOutlined
} from "@material-ui/icons";

import { Link as ReactLink, withRouter } from "react-router-dom";

const styles = {
  chip: {
    marginTop: "4px",
    marginBottom: "4px",
    marginRight: "8px",
    borderRadius: "2px",
    border: "1px solid #efefef",
    background: "#efefef",
    height: "24px",
    paddingLeft: "4px",
    paddingRight: "4px",
    color: "#626262",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "26px"
  },
  chipSecondary: {
    marginTop: "4px",
    marginBottom: "4px",
    marginRight: "8px",
    borderRadius: "2px",
    border: "1px solid #e5e5e5",
    background: "transparent",
    height: "24px",
    paddingLeft: "4px",
    paddingRight: "4px",
    color: "#626262",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "26px"
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
    borderColor: "rgba(223,225,229,0)"
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: "18px"
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

const SearchHeader = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper
          style={{
            paddingTop: "24px",
            borderRadius: 0,
            boxShadow: "none",
            border: "1px solid #d8d8d8",
            borderLeft: 0,
            borderRight: 0,
            borderTop: "0"
          }}
        >
        <Grid container justify="center" style={{ paddingBottom: "24px"}}>
          <Typography variant="inherit" style={{fontSize: "24px", fontWeight: "bold"}}>
            ຄົ້ນຫາ
          </Typography><div style={{display: "inline", fontSize: "24px", fontWeight: "bold", fontFamily: "'Roboto', sans serif"}}>
          FNS Researcher Profiles
          </div>
        </Grid>
          <Grid container>
            <Grid item xs sm={2} lg={4} md={3} />
            <Grid item xs={10} sm={8} lg={4} md={6}>
              <Grid container justify="center">
                <Paper style={styles.root} elevation={0}>
                  {
                //     <IconButton style={styles.iconButton} aria-label="Menu">
                //     <MenuOutlined />
                //   </IconButton>
                  }
                  <InputBase
                    style={styles.input}
                    placeholder="ຄົ້ນຫາຜົນງານຄົ້ນຄວ້າ, ນັກວິໄຈ..."
                  />
                  <IconButton style={styles.iconButton} aria-label="Search">
                    <SearchOutlined />
                  </IconButton>
                  {

                //     <Divider style={styles.divider} />
                //   <IconButton
                //     color="primary"
                //     style={styles.iconButton}
                //     aria-label="Directions"
                //   >
                //     <DirectionsOutlined />
                //   </IconButton>
                  }
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs sm={2} lg={4} md={3} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{ marginTop: "16px" }}
              >
                <Tab
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  label="ໂດຍລວມ"
                  to={`/research/}`}
                  component={ReactLink}
                />

                <Tab
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    textDecoration: "none"
                  }}
                  label="ສະຖິຕິ"
                  to={`/profile/`}
                  component={ReactLink}
                />

                <Tab
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  label="ຄໍາເຫັນ"
                />
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

SearchHeader.prototypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SearchHeader));
