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

import { Link } from "react-router-dom";

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
  SearchOutlined,
  CloseOutlined
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

const SearchHeader = ({
  props,
  children,
  searchTerm,
  handleSearchTextChange,
  clearText,
  researchCount,
  profileCount,
  performSearch,
  tabValue,
  changeToResearcher,
  changeToResearch
}) => {
  return (
    <Grid container>
      <Grid item xs={12} style={{paddingTop:"16px"}}>
      <embed
      height="160px"
      width="100%"
      style={{ marginBottom: "16px" }}
      type="image/svg+xml"
      src="/images/fns.svg"
    />
          <Grid container justify="center" style={{ paddingBottom: "14px" }}>
          <Link
                          to="/"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
            <Typography
              variant="inherit"
              style={{ fontSize: "24px", fontWeight: "bold" }}
            >
              ເວັບໄຊທ໌ຖານປະຫວັດຂໍ້ມູນນັກຄົ້ນຄວ້າ ຄວທ
            </Typography>
            </Link>
          </Grid>
          <Grid container justify="center" style={{ paddingBottom: "24px" }}>
            <Grid item xs={12}>
              <Typography variant="inherit" style={{ textAlign: "center" }}>
                ດ້ວຍ{" "}
                <Link to="/search/researchers?q=">
                  <NumberFormat
                    value={profileCount}
                    displayType={"text"}
                    thousandSeparator={true}
                  />{" "}
                  ນັກຄົ້ນຄວ້າ
                </Link>{" "}
                ແລະ{" "}
                <Link to="/search/researches?q=">
                  <NumberFormat
                    value={researchCount}
                    displayType={"text"}
                    thousandSeparator={true}
                  />{" "}
                  ຜົນງານຄົ້ນຄວ້າ
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="inherit" style={{ textAlign: "center" }}>
                ນີ້ແມ່ນບ່ອນທີ່ທຸກຄົນສາມາດເຂົ້າເຖິງວິທະຍາສາດ
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs sm lg md />
            <Grid item xs={11} sm={11} lg={5} md={8} style={{ paddingTop: "24px",
            borderRadius: 0,
            boxShadow: "none",
            border: "1px solid #d8d8d8",
            borderLeft: 0,
            borderRight: 0,
            borderTop: "0"}}>
              <Grid container justify="center">
                <form
                  onSubmit={() => {
                    performSearch();
                  }}
                  style={{ padding: 0, margin: 0, width: "100%" }}
                >
                  <Paper style={styles.root} elevation={0}>
                    {
                      <IconButton
                        style={styles.iconButton}
                        aria-label="Menu"
                        type="submit"
                      >
                        <SearchOutlined />
                      </IconButton>
                    }
                    <InputBase
                      style={styles.input}
                      autoFocus
                      placeholder="ຄົ້ນຫາຜົນງານຄົ້ນຄວ້າ, ນັກວິໄຈ..."
                      onChange={e => {
                        handleSearchTextChange(e.target.value);
                      }}
                      value={searchTerm}
                    />

                    {searchTerm !== "" ? (
                      <IconButton
                        style={styles.iconButton}
                        onClick={() => {
                          clearText();
                        }}
                        aria-label="Search"
                      >
                        <CloseOutlined />
                      </IconButton>
                    ) : null}
                    {
                      //     <Divider style={styles.divider} />
                      // <IconButton
                      //   color="primary"
                      //   style={styles.iconButton}
                      //   aria-label="Directions"
                      // >
                      //   <DirectionsOutlined />
                      // </IconButton>
                    }
                  </Paper>
                </form>
                <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{ marginTop: "16px" }}
              >
                <Tab
                  style={{ fontSize: "16px", fontWeight: 500 }}
                  label="ນັກຄົ້ນຄວ້າ"
                  // to={`/research/}`}
                  // component={ReactLink}
                  onClick={() => {
                    changeToResearcher();
                  }}
                />

                <Tab
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    textDecoration: "none"
                  }}
                  label="ຜົນງານຄົ້ນຄວ້າ"
                  // to={`/profile/`}
                  // component={ReactLink}
                  onClick={() => {
                    changeToResearch();
                  }}
                />
              </Tabs>
            </Grid>
          </Grid>
              </Grid>
            </Grid>
            <Grid item xs sm lg md />
          </Grid>
          
   
      </Grid>

      {children}
    </Grid>
  );
};

SearchHeader.prototypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SearchHeader));
