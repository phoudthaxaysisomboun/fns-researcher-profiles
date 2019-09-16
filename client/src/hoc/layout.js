import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import withWidth from "@material-ui/core/withWidth";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser, getRequestUserCount } from "../actions/user_actions";
import { SERVER } from "../components/utils/misc";

import Footer from "../components/Header_footer/Footer";

import { getResearchType } from "../actions/research_actions";

// import {
//   enableDynamicTheme,
//   // disableDynamicTheme
//  } from "darkreader-api"

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Avatar,
  Fab,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Collapse,
  ListSubheader,
  Badge,
  Hidden,
  Tooltip
} from "@material-ui/core";

import { Link } from "react-router-dom";
// import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
// import MoreIcon from "@material-ui/icons/MoreVertOutlined";
// import { ArrowDropDownOutlined } from "@material-ui/icons";
import {
  SettingsOutlined,
  ExitToAppOutlined,
  PersonOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  HomeOutlined,
  PersonOutlineOutlined,
  DescriptionOutlined,
  SearchOutlined,
  SettingsApplicationsOutlined,
  AccountCircleOutlined,
  PollOutlined
} from "@material-ui/icons";

import { colorPallete } from "../components/utils/misc";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    [theme.breakpoints.up("lg")]: {
      flexGrow: 1
    },
    [theme.breakpoints.down("md")]: {
      flexGrow: 0.3
    },
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0
    }
  },
  menuButtonMain: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
    [theme.breakpoints.down("sm")]: {
      display: ""
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
      marginRight: 0
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      marginRight: 0
    }
  },
  title: {
    fontWeight: "500",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 8
    },
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 8
    },
    [theme.breakpoints.up("lg")]: {
      marginRight: 0
    }
  },
  logo: {
    // display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // }
  },
  formSearch: {
    flexGrow: 1,
    margin: 0,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 8,
      marginRight: 8
    },
    [theme.breakpoints.up("sm")]: {
      // flexGrow: 1,
      marginLeft: 16,
      marginRight: 16
    },
    [theme.breakpoints.up("md")]: {
      // flexGrow: 1
      marginLeft: 0,
      marginRight: 0
    }
  },
  rightHeaderSection: {
    [theme.breakpoints.up("md")]: {
      minWidth: "226px",
      textAlign: "right"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "unset",
      textAlign: "right"
    }
  },
  leftHeaderSection: {
    [theme.breakpoints.up("md")]: {
      minWidth: "226px"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "unset"
    },
    display: "flex",
    alignItems: "center"
  },
  moreIcon: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "20px"
    }
  },
  searchButton: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  search: {
    position: "relative",
    borderRadius: "8px",
    backgroundColor: "#f1f3f4",
    // maxWidth: "580px",
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.black, 0.03)
    // },

    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto"
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    flexGrow: "0.4",
    height: "48px"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    // pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
    paddingLeft: "8px"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    height: "48px"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: 56,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    },
    flexGrow: "1"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  // drawer: {
  //   width: 240,
  //   flexShrink: 0
  // },
  // drawerPaper: {
  //   width: 240
  // },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1
  // },
  sectionDesktop2: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inherit"
    }
  },
  sectionMobile2: {
    display: "inherit",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  // drawer

  // root: {
  //     display: 'flex',
  //   },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    border: "'0' !important"
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 0,
    paddingRight: 8
  },
  drawerPaperSmall: {
    width: 270,
    borderRight: 0,
    paddingRight: 8,
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px;"
  },
  menuPaper: {
    left: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: 0
    }
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  layout: {
    minHeight: "75vh",
    paddingTop: "64px",
    // marginLeft: this.state.margin,e
    [theme.breakpoints.up("xl")]: {
      marginLeft: 0
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: 0
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 240
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 240
    }
  },
  transparent: {
    backgroundColor: "transparent"
  }
});

const toColor = str => {
  var colors = colorPallete;

  var hash = 0;
  if (str.length === 0) return hash;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
};

const drawerWidth = 240;

class Layout extends Component {
  state = {
    anchorEl: null,
    anchorElCreateNew: null,
    open: true,
    headerclass: "",
    openManageToolMenu: true,
    openReportsToolMenu: true,
    showHeader: false,
    searchText: "",
    margin: 240,
    scroll: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: this.state.open ? false : true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    // enableDynamicTheme()

    // const width = this.props.width
    // if (width === "xs" || width === "sm") {
    //   this.setState({open: false })
    // } else  {
    //   this.setState({open: true })
    // }

    // if (width === "lg" || width === "xl") {

    //   this.setState({margin: 60 })
    // } else {
    //   this.setState({margin: 240 })
    // }

    // if (
    //   this.props.user &&
    //   this.props.user.userData &&
    //   this.props.user.userData.isAdmin
    // ) {
    //   this.setState({
    //     open: true
    //   });
    // }

    if (
      this.props &&
      this.props.location &&
      this.props.location.pathname.startsWith("/publications/create")
    ) {
      this.setState({
        open: false
      });
    } else {
      this.setState({
        open: true
      });
    }

    this.props.dispatch(getResearchType());

    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.userData !== this.props.user.userData) {
      this.props.dispatch(getRequestUserCount()).then(response => {
        // console.log(response.data);
      });
    }

    if (
      prevProps.width !== this.props.width ||
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      const width = this.props.width;

      if (this.props.location.pathname.startsWith("/publications/create")) {
        this.setState({ open: false });
      } else {
        this.setState({ open: true });
        if (width === "xs" || width === "sm") {
          this.setState({ open: false });
        } else {
          this.setState({ open: true });
        }

        if (width === "lg" || width === "xl") {
          this.setState({ margin: 60 });
        } else {
          this.setState({ margin: 240 });
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    let scroll = window.pageYOffset;

    if (scroll !== 0) {
      this.setState({ headerclass: "active" });
      if (scroll >= 232) {
        this.setState({ showHeader: true });
      } else {
        this.setState({ showHeader: false });
      }
      // this.setState({scroll: true})
    } else {
      // if (this.state.scroll)  {this.setState({scroll: false})}

      this.setState({ headerclass: "" });
    }
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    // this.handleMobileMenuClose();
  };
  handleCreateNewMenuOpen = event => {
    this.setState({ anchorElCreateNew: event.currentTarget });
  };

  handleCreateNewMenuClose = () => {
    this.setState({ anchorElCreateNew: null });
    // this.handleMobileMenuClose();
  };

  handleSearch = event => {
    this.setState({
      searchText: event.target.value
    });
  };

  submitSearch = event => {
    event.preventDefault();
    this.props.history.push(
      `/search/researchers?q=${encodeURIComponent(this.state.searchText)}`
    );
    this.setState({
      searchText: ""
    });
  };
  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
    this.setState({ anchorEl: null });
    this.handleMenuClose();
  };

  handleMangeListClick = () => {
    this.setState(state => ({ openManageToolMenu: !state.openManageToolMenu }));
  };

  handleReportsClick = () => {
    this.setState(state => ({
      openReportsToolMenu: !state.openReportsToolMenu
    }));
  };

  showAccountButton = () => {
    const { classes } = this.props;
    if (this.props.user.userData) {
      if (this.props.user.userData.isAuth) {
        return (
          <div>
            {!this.props.location.pathname.startsWith("/search") &&
            !this.props.location.pathname.startsWith("/publications/create") ? (
              <IconButton
                aria-haspopup="true"
                color="inherit"
                component={Link}
                to="/search"
                style={{
                  padding: "8px",
                  margin: 0,
                  marginRight: "8px"
                }}
                className={classes.searchButton}
              >
                <SearchIcon style={{ color: "#5f6368" }} />
              </IconButton>
            ) : null}
            {!this.props.location.pathname.startsWith(
              "/publications/create"
            ) ? (
              <IconButton
                aria-haspopup="true"
                color="inherit"
                style={{
                  padding: "4px",

                  margin: 0
                }}
                onClick={this.handleProfileMenuOpen}
              >
                {this.props.user.userData &&
                this.props.user.userData.profileImage &&
                this.props.user.userData.profileImage[0] &&
                this.props.user.userData.profileImage[0].location ? (
                  <Avatar
                    src={`${SERVER}${this.props.user.userData.profileImage[0].location}`}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderStyle: "solid",
                      borderColor: "rgb(239, 239, 239)",
                      borderWidth: "1px"
                    }}
                  />
                ) : (
                  <Avatar
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: toColor(
                        `${this.props.user.userData.name}${this.props.user.userData.lastname}`
                      ),
                      fontFamily: "'Noto Sans Lao UI', sans serif",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                  >
                    {`${this.props.user.userData.name.charAt(
                      0
                    )}${this.props.user.userData.lastname.charAt(0)}`}
                  </Avatar>
                )}
              </IconButton>
            ) : null}

            {
              //  <IconButton
              //             aria-haspopup="true"
              //             onClick={this.handleProfileMenuOpen}
              //             color="inherit"
              //             style={{
              //               padding: "0px",
              //               margin: 0
              //             }}
              //           >
              //             <ArrowDropDownOutlined />
              //           </IconButton>
            }
          </div>
        );
      } else {
        return (
          <Link to="/login" style={{ textDecoration: "none" }}>
            {this.props.width === "sm" || this.props.width === "xs" ? (
              <Tooltip title="ລົງຊື່ເຂົ້າໃຊ້">
                <IconButton style={{ margin: "8px", marginRight: 0 }}>
                  <AccountCircle
                    style={{
                      fontSize: 28,
                      border: "solid",
                      borderRadius: "50%",
                      borderWidth: 1,
                      borderColor: "rgb(216, 216, 216)"
                    }}
                    color="primary"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                size="medium"
                variant="outlined"
                color="primary"
                style={{ margin: "8px" }}
              >
                <PersonOutlined style={{ marginRight: "8px" }} />
                ລົງຊື່ເຂົ້າໃຊ້
              </Button>
            )}
          </Link>
        );
      }
    }
  };

  // {marginLeft: 240}
  render() {
    const {
      classes,
      theme,
      location: { pathname }
    } = this.props;

    const { anchorEl, anchorElCreateNew } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isCreateNewMenuOpen = Boolean(anchorElCreateNew);
    const { open } = this.state;
    const renderMenu = this.props.user.userData ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        style={{ top: 38 }}
      >
        {this.props.user.userData && this.props.user.userData.isAuth ? (
          <Link
            to={`/profile/${this.props.user.userData._id}`}
            style={{ textDecoration: "none", outline: 0 }}
          >
            <MenuItem
              style={{
                fontFamily: "'Noto Sans Lao UI', sans-serif",
                fontWeight: "500"
              }}
              onClick={this.handleMenuClose}
            >
              {this.props.user.userData &&
              this.props.user.userData.profileImage &&
              this.props.user.userData.profileImage[0] &&
              this.props.user.userData.profileImage[0].location ? (
                <Avatar
                  src={`${SERVER}${this.props.user.userData.profileImage[0].location}`}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderStyle: "solid",
                    borderColor: "rgb(239, 239, 239)",
                    borderWidth: "1px",
                    marginRight: "16px"
                  }}
                />
              ) : (
                <Avatar
                  style={{
                    width: "32px",
                    height: "32px",
                    marginRight: "16px",
                    backgroundColor: toColor(
                      `${this.props.user.userData.name}${this.props.user.userData.lastname}`
                    ),
                    fontFamily: "'Noto Sans Lao UI', sans serif",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  {`${this.props.user.userData.name.charAt(
                    0
                  )}${this.props.user.userData.lastname.charAt(0)}`}
                </Avatar>
              )}
              {this.props.user.userData.prefix} {this.props.user.userData.name}{" "}
              {this.props.user.userData.lastname}
            </MenuItem>
          </Link>
        ) : null}
        <Divider style={{ marginTop: 8 }} />
        <MenuItem
          style={{ fontFamily: "'Noto Sans Lao UI', sans-serif" }}
          onClick={this.handleMenuClose}
        >
          <span style={{ minWidth: "50px" }}>
            <SettingsOutlined />
          </span>
          ຕັ້ງຄ່າ
        </MenuItem>
        <MenuItem
          style={{ fontFamily: "'Noto Sans Lao UI', sans-serif" }}
          onClick={this.logoutHandler}
        >
          <span style={{ minWidth: "50px" }}>
            {" "}
            <ExitToAppOutlined />
          </span>
          ລົງຊື່ອອກ
        </MenuItem>
      </Menu>
    ) : null;

    const renderCreateNewMenu = this.props.user.userData ? (
      <Menu
        anchorEl={anchorElCreateNew}
        open={isCreateNewMenuOpen}
        onClose={this.handleCreateNewMenuClose}
        disableAutoFocus={true}
        disableAutoFocusItem={true}
        disableEnforceFocus={true}
        classes={{
          paper: classes.menuPaper
        }}
        style={{ left: -1}}
      >
        {this.props.research && this.props.research.researchType ? (
          <>
            {this.props.research.researchType.map(item => (
              <MenuItem
                style={{
                  fontFamily: "'Noto Sans Lao UI', sans-serif",
                  padding: "8px",
                  minWidth: 160,
                  paddingLeft: 24,
                  paddingRight: 24
                }}
                onClick={this.handleCreateNewMenuClose}
                key={item._id}
                value={item._id}
                component={Link}
                to={`/publications/create?publicationType=${encodeURIComponent(
                  item.englishName
                )}`}
              >
                {
                  // <SettingsOutlined fontSize="small" style={{ marginRight: "16px" }}/>
                }
                {item.name}
              </MenuItem>
            ))}
          </>
        ) : null}
      </Menu>
    ) : null;

    const theme2 = createMuiTheme({
      palette: {
        primary: {
          main: "#1564bf",
          light: "#5e91f2",
          dark: "#003b8e",
          contrastText: "#fff"
        },
        secondary: {
          light: "#48a999",
          main: "#00796b",
          dark: "#004c40",
          contrastText: "#fff"
        }
      }
    });

    return (
      <MuiThemeProvider theme={theme2}>
        {console.log(theme2.palette.primary.main)}
        {
          // <Header headerclass={this.state.headerclass} />
        }

        <>
          <div className={classes.root}>
            <AppBar
              position="fixed"
              id="header"
              color="default"
              // className={`${classes.appbar} ${this.state.headerclass}`}
              className={classNames(this.state.headerclass, classes.appBar, {
                [classes.appBarShift]: open
              })}
              style={{
                background: "white",
                boxShadow: "none"
                // zIndex: 1201,
              }}
            >
              <Toolbar
                // disableGutters={!open}
                variant="regular"
                style={{
                  height: "64px",
                  paddingLeft: "8px",
                  paddingRight: "8px"
                }}
              >
                <span className={classes.leftHeaderSection}>
                  {!this.props.location.pathname.startsWith("/search") ? (
                    <>
                      {!this.props.location.pathname.startsWith(
                        "/publications/create"
                      ) ? (
                        <IconButton
                          onClick={this.handleDrawerOpen}
                          className={classNames(classes.menuButtonMain)}
                          color="inherit"
                          aria-label="Open drawer"
                        >
                          <MenuIcon />
                        </IconButton>
                      ) : null}
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <embed
                          className={classes.logo}
                          height="28"
                          width="28"
                          style={{
                            marginBottom: "0",
                            flexGrow: 0,
                            paddingRight: "8px",
                            paddingBottom: "6px",
                            paddingLeft: 8
                          }}
                          type="image/svg+xml"
                          src="/images/fns.svg"
                        />
                      </Link>
                    </>
                  ) : null}
                  {!this.props.location.pathname.startsWith("/search") ? (
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        className={classes.title}
                        variant="h6"
                        color="default"
                        noWrap
                        style={{
                          fontWeight: "normal",
                          fontFamily:
                            "'Product Sans', 'Roboto', 'Arial', sans serif",
                          color: "#5f6368"
                        }}
                      >
                        Researcher Profiles
                      </Typography>
                    </Link>
                  ) : null}
                </span>

                {!this.props.location.pathname.startsWith("/search") ? (
                  <>
                    <div className={classes.grow} />
                    {this.props.location.pathname.startsWith(
                      "/publications/create"
                    ) ? (
                      <div style={{ flexGrow: 1 }}></div>
                    ) : (
                      <form
                        style={{
                          padding: 0
                          // margin: 0,
                          // marginLeft: 8,
                          // marginRight: 8
                        }}
                        className={classes.formSearch}
                        onSubmit={event => this.submitSearch(event)}
                      >
                        <div className={classes.search}>
                          <IconButton
                            className={classes.searchIcon}
                            style={{
                              padding: "8px",
                              margin: 0,
                              width: "40px",
                              height: "40px",
                              marginLeft: 8,
                              marginTop: 4
                            }}
                            type="submit"
                          >
                            <SearchIcon />
                          </IconButton>
                          <InputBase
                            placeholder="ຄົ້ນຫານັກຄົ້ນຄວ້າ, ຜົນງານ ຯລຯ"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput
                            }}
                            style={{
                              fontFamily: "'Noto Sans Lao UI', sans-serif"
                            }}
                            value={this.state.searchText}
                            onChange={event => {
                              this.handleSearch(event);
                            }}
                          />
                        </div>
                      </form>
                    )}

                    <div className={classes.grow} />
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      alignItems="center"
                      style={{ flexGrow: "1", margin: 0 }}
                    >
                      <Grid item xs={2} align="left">
                        {!this.props.location.pathname.startsWith(
                          "/publications/create"
                        ) ? (
                          <IconButton
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButtonMain)}
                            color="inherit"
                            aria-label="Open drawer"
                          >
                            <MenuIcon />
                          </IconButton>
                        ) : null}
                      </Grid>

                      <Grid item xs={8} alignContent="center">
                        {this.state.showHeader ? (
                          <Link
                            to="/"
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Typography
                              variant="h6"
                              color="default"
                              style={{
                                textAlign: "center",
                                // fontWeight: "500",
                                fontFamily:
                                  "'Product Sans', 'Roboto', 'Arial', sans serif",
                                color: "#5f6368",
                                fontWeight: "normal"
                              }}
                              noWrap
                            >
                              Researcher Profiles
                            </Typography>
                          </Link>
                        ) : null}
                      </Grid>

                      <Grid item xs={2} align="right">
                        {this.showAccountButton()}
                        {
                          //   <div className={classes.sectionDesktop2}>
                          //   {
                          //     // <IconButton color="inherit">
                          //     //   <Badge badgeContent={4} color="secondary">
                          //     //     <MailIcon />
                          //     //   </Badge>
                          //     // </IconButton>
                          //     // <IconButton color="inherit">
                          //     //   <Badge badgeContent={17} color="secondary">
                          //     //     <NotificationsIcon />
                          //     //   </Badge>
                          //     // </IconButton>
                          //   }
                          //   {this.showAccountButton()}
                          // </div>
                          // <div className={classes.sectionMobile2}>
                          //   <IconButton
                          //     aria-haspopup="true"
                          //     onClick={this.handleMobileMenuOpen}
                          //     color="inherit"
                          //     className={classes.moreIcon}
                          //   >
                          //     <MoreIcon />
                          //   </IconButton>
                          // </div>
                        }
                      </Grid>
                    </Grid>
                  </>
                )}

                {!this.props.location.pathname.startsWith("/search") ? (
                  <>
                    <div className={classes.rightHeaderSection}>
                      {this.showAccountButton()}
                    </div>
                    {
                      //   <div className={classes.sectionDesktop}>
                      //   {
                      //     // <IconButton color="inherit">
                      //     //   <Badge badgeContent={4} color="secondary">
                      //     //     <MailIcon />
                      //     //   </Badge>
                      //     // </IconButton>
                      //     // <IconButton color="inherit">
                      //     //   <Badge badgeContent={17} color="secondary">
                      //     //     <NotificationsIcon />
                      //     //   </Badge>
                      //     // </IconButton>
                      //   }
                      //   {this.showAccountButton()}
                      // </div>
                      // <div className={classes.sectionMobile}>
                      //   <IconButton
                      //     aria-haspopup="true"
                      //     onClick={this.handleMobileMenuOpen}
                      //     color="inherit"
                      //     className={classes.moreIcon}
                      //   >
                      //     <MoreIcon />
                      //   </IconButton>
                      // </div>
                    }
                  </>
                ) : null}
              </Toolbar>
            </AppBar>
            {this.state.scroll ? (
              <div class="mKShuf">
                <div class="s0CmG"></div>
              </div>
            ) : null}

            <Hidden smDown>
              <Drawer
                className=".main-side-bar"
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <div className={classes.drawerHeader} />

                <List style={{ paddingTop: 0 }}>
                  {this.props &&
                  this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAuth ? (
                    <ListItem
                      style={{
                        padding: 0,
                        paddingBottom: 16,
                        paddingLeft: 16,
                        marginTop: "16"
                      }}
                    >
                      <Fab
                        size="large"
                        variant="extended"
                        color="default"
                        className="add-research-button"
                        style={{
                          margin: 0,
                          fontWeight: "500",
                          boxShadow:
                            "0 1px 2px 0 rgba(60,64,67,0.302), 0 1px 3px 1px rgba(60,64,67,0.149)",
                          backgroundColor: "#fff",
                          fontSize: "1rem",
                          paddingRight: 24,
                          marginTop: 16
                        }}
                        disableFocusRipple
                        dis
                        onClick={this.handleCreateNewMenuOpen}
                      >
                        <embed
                          height="36"
                          width="36"
                          style={{
                            marginRight: "14px"
                          }}
                          type="image/svg+xml"
                          src="/images/add_icon.svg"
                        />
                        {
                          //   <AddOutlined
                          //   color="primary"
                          //   style={{ marginRight: "16", fontSize: 38 }}
                          // />
                        }
                        ເພີ່ມຜົນງານວິໄຈ
                      </Fab>
                    </ListItem>
                  ) : null}
                  {this.props &&
                  this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAuth ? (
                    <ListItem
                      button
                      component={Link}
                      to="/"
                      selected={"/" === pathname}
                      style={{
                        borderTopRightRadius: "23px",
                        borderBottomRightRadius: "23px",
                        height: 40
                      }}
                    >
                      {"/" === pathname ? (
                        <>
                          <ListItemIcon>
                            <HomeOutlined fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primaryTypographyProps={{
                              style: { fontWeight: "500" },
                              color: "primary"
                            }}
                            inset
                            primary="ຫນ້າຫລັກ"
                          />
                        </>
                      ) : (
                        <>
                          <ListItemIcon>
                            <HomeOutlined fontSize="small" />
                          </ListItemIcon>
                          <ListItemText inset primary="ຫນ້າຫລັກ" />
                        </>
                      )}
                    </ListItem>
                  ) : null}
                  <ListItem
                    button
                    component={Link}
                    to="/search"
                    selected={
                      pathname.startsWith("/search") &&
                      !("?q=" === this.props.location.search)
                    }
                    style={{
                      borderTopRightRadius: "23px",
                      borderBottomRightRadius: "23px",
                      height: 40
                    }}
                  >
                    {pathname.startsWith("/search") &&
                    !("?q=" === this.props.location.search) ? (
                      <>
                        <ListItemIcon>
                          <SearchOutlined fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            style: { fontWeight: "500" },
                            color: "primary"
                          }}
                          inset
                          primary="ຄົ້ນຫາ"
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <SearchOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText inset primary="ຄົ້ນຫາ" />
                      </>
                    )}
                  </ListItem>
                  <ListItem
                    style={{
                      borderTopRightRadius: "23px",
                      borderBottomRightRadius: "23px",
                      height: 40
                    }}
                    button
                    component={Link}
                    to="/search/researchers?q="
                    selected={
                      "/search/researchers" === pathname &&
                      "?q=" === this.props.location.search
                    }
                  >
                    {"/search/researchers" === pathname &&
                    "?q=" === this.props.location.search ? (
                      <>
                        <ListItemIcon>
                          <PersonOutlineOutlined
                            fontSize="small"
                            color="primary"
                          />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primary="ນັກຄົ້ນຄວ້າ"
                          primaryTypographyProps={{
                            style: { fontWeight: "500" },
                            color: "primary"
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <PersonOutlineOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
                      </>
                    )}
                  </ListItem>

                  <ListItem
                    button
                    component={Link}
                    to="/search/researches?q="
                    selected={
                      "/search/researches" === pathname &&
                      "?q=" === this.props.location.search
                    }
                    style={{
                      borderTopRightRadius: "23px",
                      borderBottomRightRadius: "23px",
                      height: 40
                    }}
                  >
                    {"/search/researches" === pathname &&
                    "?q=" === this.props.location.search ? (
                      <>
                        <ListItemIcon>
                          <DescriptionOutlined
                            fontSize="small"
                            color="primary"
                          />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primaryTypographyProps={{
                            style: { fontWeight: "500" },
                            color: "primary"
                          }}
                          primary="ຜົນງານຄົ້ນຄວ້າ"
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <DescriptionOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText inset primary="ຜົນງານຄົ້ນຄວ້າ" />
                      </>
                    )}
                  </ListItem>

                  {this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAuth ? (
                    <ListItem
                      button
                      component={Link}
                      style={{
                        borderTopRightRadius: "23px",
                        borderBottomRightRadius: "23px",
                        height: 40
                      }}
                      to={`/profile/${this.props.user.userData._id}`}
                      selected={pathname.startsWith(
                        `/profile/${this.props.user.userData._id}`
                      )}
                    >
                      {pathname.startsWith(
                        `/profile/${this.props.user.userData._id}`
                      ) ? (
                        <>
                          <ListItemIcon>
                            <AccountCircleOutlined
                              fontSize="small"
                              color="primary"
                            />
                          </ListItemIcon>
                          <ListItemText
                            inset
                            primaryTypographyProps={{
                              style: { fontWeight: "500" },
                              color: "primary"
                            }}
                            primary="ໂປຣຟາຍລ໌ຂອງຂ້ອຍ"
                          />
                        </>
                      ) : (
                        <>
                          <ListItemIcon>
                            <AccountCircleOutlined fontSize="small" />
                          </ListItemIcon>
                          <ListItemText inset primary="ໂປຣຟາຍລ໌ຂອງຂ້ອຍ" />
                        </>
                      )}
                    </ListItem>
                  ) : null}

                  {this.props &&
                  this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAdmin ? (
                    <>
                      <Divider
                        style={{ marginTop: "16px", marginBottom: "8px" }}
                      />
                      <List
                        component="nav"
                        subheader={
                          <ListSubheader
                            style={{
                              fontFamily: "'Noto Sans Lao UI', sans serif"
                            }}
                            component="div"
                          >
                            ເຄື່ອງມືຜູ້ບໍລິຫານລະບົບ
                          </ListSubheader>
                        }
                        className={classes.root}
                      >
                        <ListItem
                          style={{
                            borderTopRightRadius: "23px",
                            borderBottomRightRadius: "23px",
                            height: 40
                          }}
                          button
                          onClick={this.handleMangeListClick}
                        >
                          <ListItemIcon>
                            <SettingsApplicationsOutlined fontSize="small" />
                          </ListItemIcon>
                          <ListItemText inset primary="ຈັດການ" />
                          {this.state.openManageToolMenu ? (
                            <ExpandLessOutlined fontSize="small" />
                          ) : (
                            <ExpandMoreOutlined fontSize="small" />
                          )}
                        </ListItem>
                        <Collapse
                          in={this.state.openManageToolMenu}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItem
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px",
                                height: 40
                              }}
                              button
                              component={Link}
                              to="/admin/researchers"
                              selected={pathname.startsWith(
                                "/admin/researchers"
                              )}
                              className={classes.nested}
                            >
                              {pathname.startsWith("/admin/researchers") ? (
                                <>
                                  <ListItemIcon>
                                    {this.props &&
                                    this.props.user &&
                                    this.props.user.userRegisterationCount &&
                                    this.props.user.userRegisterationCount >
                                      0 ? (
                                      <Badge
                                        badgeContent={
                                          this.props.user.userRegisterationCount
                                        }
                                        variant="dot"
                                        color="secondary"
                                      >
                                        <PersonOutlineOutlined
                                          fontSize="small"
                                          color="primary"
                                        />
                                      </Badge>
                                    ) : (
                                      <PersonOutlineOutlined
                                        fontSize="small"
                                        color="primary"
                                      />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: { fontWeight: "500" },
                                      color: "primary"
                                    }}
                                    primary="ນັກຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    {this.props.user.userRegisterationCount >
                                    0 ? (
                                      <Badge
                                        badgeContent={
                                          this.props.user.userRegisterationCount
                                        }
                                        variant="dot"
                                        color="secondary"
                                      >
                                        <PersonOutlineOutlined fontSize="small" />
                                      </Badge>
                                    ) : (
                                      <PersonOutlineOutlined fontSize="small" />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
                                </>
                              )}
                            </ListItem>
                          </List>
                          <List component="div" disablePadding>
                            <ListItem
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px",
                                height: 40
                              }}
                              button
                              component={Link}
                              to="/admin/researches"
                              selected={pathname.startsWith(
                                "/admin/researches"
                              )}
                              className={classes.nested}
                            >
                              {pathname.startsWith("/admin/researches") ? (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: {
                                        color: "#3f51b5",
                                        fontWeight: "500"
                                      }
                                    }}
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              )}
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>

                      <List component="nav" className={classes.root}>
                        <ListItem
                          style={{
                            borderTopRightRadius: "23px",
                            borderBottomRightRadius: "23px",
                            height: 40
                          }}
                          button
                          onClick={this.handleReportsClick}
                        >
                          <ListItemIcon>
                            <PollOutlined fontSize="small" />
                          </ListItemIcon>
                          <ListItemText inset primary="ລາຍງານ" />
                          {this.state.openReportsToolMenu ? (
                            <ExpandLessOutlined fontSize="small" />
                          ) : (
                            <ExpandMoreOutlined fontSize="small" />
                          )}
                        </ListItem>
                        <Collapse
                          in={this.state.openReportsToolMenu}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItem
                              button
                              component={Link}
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px",
                                height: 40
                              }}
                              to="/admin/reports/researchers/numbers"
                              selected={pathname.startsWith(
                                "/admin/reports/researchers"
                              )}
                              className={classes.nested}
                            >
                              {pathname.startsWith(
                                "/admin/reports/researchers"
                              ) ? (
                                <>
                                  <ListItemIcon>
                                    <PersonOutlineOutlined
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: {
                                        color: "#3f51b5",
                                        fontWeight: "500"
                                      }
                                    }}
                                    primary="ນັກຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    <PersonOutlineOutlined fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
                                </>
                              )}
                            </ListItem>
                          </List>
                          <List component="div" disablePadding>
                            <ListItem
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px",
                                height: 40
                              }}
                              button
                              component={Link}
                              to="/admin/reports/researches/numbers"
                              selected={pathname.startsWith(
                                "/admin/reports/researches"
                              )}
                              className={classes.nested}
                            >
                              {pathname.startsWith(
                                "/admin/reports/researches"
                              ) ? (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined
                                      color="primary"
                                      fontSize="small"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: {
                                        color: "#3f51b5",
                                        fontWeight: "500"
                                      }
                                    }}
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              )}
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>
                    </>
                  ) : null}
                  {
                    /*  collapse component */
                    //     <ListItem button onClick={this.handleClick}>
                    //   <ListItemIcon>
                    //     <InboxOutlined />
                    //   </ListItemIcon>
                    //   <ListItemText inset primary="Inbox" />
                    //   {this.state.openList ? (
                    //     <ExpandLessOutlined />
                    //   ) : (
                    //     <ExpandMoreOutlined />
                    //   )}
                    // </ListItem>
                    // <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                    //   <List component="div" disablePadding>
                    //     <ListItem button className={classes.nested}>
                    //       <ListItemIcon>
                    //         <InboxOutlined />
                    //       </ListItemIcon>
                    //       <ListItemText inset primary="Starred" />
                    //     </ListItem>
                    //   </List>
                    // </Collapse>
                  }
                </List>
              </Drawer>
            </Hidden>

            <Hidden mdUp>
              <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaperSmall
                }}
                style={{
                  border: "0 !important",
                  transition: "1s"
                }}
                BackdropProps={{
                  classes: {
                    root: classes.transparent
                  }
                }}
                onClose={this.handleDrawerClose}
              >
                <div
                  style={{
                    alignItems: "center",
                    padding: "0 8px",
                    paddingLeft: "16px",
                    ...theme.mixins.toolbar,
                    justifyContent: "flex-start"
                  }}
                >
                  <Grid
                    style={{
                      height: "100%",
                      paddingTop: "22px"
                    }}
                    alignItems="center"
                  >
                    <Grid item>
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Link
                          to="/"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <embed
                            height="28"
                            width="28"
                            style={{
                              marginBottom: "0",
                              flexGrow: 0,
                              paddingRight: "8px",
                              position: "absolute",
                              top: "20px"
                            }}
                            type="image/svg+xml"
                            src="/images/fns.svg"
                          />
                        </Link>
                        <Typography
                          variant="h6"
                          color="default"
                          noWrap
                          style={{
                            // fontWeight: "500",
                            fontFamily:
                              "'Product Sans', 'Roboto', 'Arial', sans serif",
                            color: "#5f6368",

                            display: "inline",
                            paddingLeft: "36px",
                            fontWeight: "normal"
                          }}
                        >
                          Researcher Profiles
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </div>

                <List>
                  {this.props &&
                  this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAuth ? (
                    <ListItem
                      button
                      component={Link}
                      to="/"
                      selected={"/" === pathname}
                      style={{
                        borderTopRightRadius: "23px",
                        borderBottomRightRadius: "23px"
                      }}
                      onClick={this.handleDrawerClose}
                    >
                      {"/" === pathname ? (
                        <>
                          <ListItemIcon>
                            <HomeOutlined color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primaryTypographyProps={{
                              style: { fontWeight: "500" },
                              color: "primary"
                            }}
                            inset
                            primary="ຫນ້າຫລັກ"
                          />
                        </>
                      ) : (
                        <>
                          <ListItemIcon>
                            <HomeOutlined />
                          </ListItemIcon>
                          <ListItemText inset primary="ຫນ້າຫລັກ" />
                        </>
                      )}
                    </ListItem>
                  ) : null}
                  <ListItem
                    button
                    onClick={this.handleDrawerClose}
                    component={Link}
                    to="/search"
                    selected={
                      pathname.startsWith("/search") &&
                      !("?q=" === this.props.location.search)
                    }
                    style={{
                      borderTopRightRadius: "23px",
                      borderBottomRightRadius: "23px"
                    }}
                  >
                    {pathname.startsWith("/search") &&
                    !("?q=" === this.props.location.search) ? (
                      <>
                        <ListItemIcon>
                          <SearchOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            style: { fontWeight: "500" },
                            color: "primary"
                          }}
                          inset
                          primary="ຄົ້ນຫາ"
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <SearchOutlined />
                        </ListItemIcon>
                        <ListItemText inset primary="ຄົ້ນຫາ" />
                      </>
                    )}
                  </ListItem>
                  <ListItem
                    style={{
                      borderTopRightRadius: "23px",
                      borderBottomRightRadius: "23px"
                    }}
                    onClick={this.handleDrawerClose}
                    button
                    component={Link}
                    to="/search/researchers?q="
                    selected={
                      "/search/researchers" === pathname &&
                      "?q=" === this.props.location.search
                    }
                  >
                    {"/search/researchers" === pathname &&
                    "?q=" === this.props.location.search ? (
                      <>
                        <ListItemIcon>
                          <PersonOutlineOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primary="ນັກຄົ້ນຄວ້າ"
                          primaryTypographyProps={{
                            style: { fontWeight: "500" },
                            color: "primary"
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <PersonOutlineOutlined />
                        </ListItemIcon>
                        <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
                      </>
                    )}
                  </ListItem>

                  <ListItem
                    onClick={this.handleDrawerClose}
                    button
                    component={Link}
                    to="/search/researches?q="
                    selected={
                      "/search/researches" === pathname &&
                      "?q=" === this.props.location.search
                    }
                    style={{
                      borderTopRightRadius: "23px",
                      borderBottomRightRadius: "23px"
                    }}
                  >
                    {"/search/researches" === pathname &&
                    "?q=" === this.props.location.search ? (
                      <>
                        <ListItemIcon>
                          <DescriptionOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primaryTypographyProps={{
                            style: { fontWeight: "500" },
                            color: "primary"
                          }}
                          primary="ຜົນງານຄົ້ນຄວ້າ"
                        />
                      </>
                    ) : (
                      <>
                        <ListItemIcon>
                          <DescriptionOutlined />
                        </ListItemIcon>
                        <ListItemText inset primary="ຜົນງານຄົ້ນຄວ້າ" />
                      </>
                    )}
                  </ListItem>

                  {this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAuth ? (
                    <ListItem
                      button
                      component={Link}
                      onClick={this.handleDrawerClose}
                      style={{
                        borderTopRightRadius: "23px",
                        borderBottomRightRadius: "23px"
                      }}
                      to={`/profile/${this.props.user.userData._id}`}
                      selected={pathname.startsWith(
                        `/profile/${this.props.user.userData._id}`
                      )}
                    >
                      {pathname.startsWith(
                        `/profile/${this.props.user.userData._id}`
                      ) ? (
                        <>
                          <ListItemIcon>
                            <AccountCircleOutlined color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            inset
                            primaryTypographyProps={{
                              style: { fontWeight: "500" },
                              color: "primary"
                            }}
                            primary="ໂປຣຟາຍລ໌ຂອງຂ້ອຍ"
                          />
                        </>
                      ) : (
                        <>
                          <ListItemIcon>
                            <AccountCircleOutlined />
                          </ListItemIcon>
                          <ListItemText inset primary="ໂປຣຟາຍລ໌ຂອງຂ້ອຍ" />
                        </>
                      )}
                    </ListItem>
                  ) : null}

                  {this.props &&
                  this.props.user &&
                  this.props.user.userData &&
                  this.props.user.userData.isAdmin ? (
                    <>
                      <Divider
                        style={{ marginTop: "16px", marginBottom: "8px" }}
                      />
                      <List
                        component="nav"
                        subheader={
                          <ListSubheader
                            style={{
                              fontFamily: "'Noto Sans Lao UI', sans serif"
                            }}
                            component="div"
                          >
                            ເຄື່ອງມືຜູ້ບໍລິຫານລະບົບ
                          </ListSubheader>
                        }
                        className={classes.root}
                      >
                        <ListItem
                          style={{
                            borderTopRightRadius: "23px",
                            borderBottomRightRadius: "23px"
                          }}
                          button
                          onClick={this.handleMangeListClick}
                        >
                          <ListItemIcon>
                            <SettingsApplicationsOutlined />
                          </ListItemIcon>
                          <ListItemText inset primary="ຈັດການ" />
                          {this.state.openManageToolMenu ? (
                            <ExpandLessOutlined />
                          ) : (
                            <ExpandMoreOutlined />
                          )}
                        </ListItem>
                        <Collapse
                          in={this.state.openManageToolMenu}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItem
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px"
                              }}
                              button
                              component={Link}
                              to="/admin/researchers"
                              selected={pathname.startsWith(
                                "/admin/researchers"
                              )}
                              className={classes.nested}
                              onClick={this.handleDrawerClose}
                            >
                              {pathname.startsWith("/admin/researchers") ? (
                                <>
                                  <ListItemIcon>
                                    {this.props &&
                                    this.props.user &&
                                    this.props.user.userRegisterationCount &&
                                    this.props.user.userRegisterationCount >
                                      0 ? (
                                      <Badge
                                        badgeContent={
                                          this.props.user.userRegisterationCount
                                        }
                                        variant="dot"
                                        color="secondary"
                                      >
                                        <PersonOutlineOutlined color="primary" />
                                      </Badge>
                                    ) : (
                                      <PersonOutlineOutlined color="primary" />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: { fontWeight: "500" },
                                      color: "primary"
                                    }}
                                    primary="ນັກຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    {this.props.user.userRegisterationCount >
                                    0 ? (
                                      <Badge
                                        badgeContent={
                                          this.props.user.userRegisterationCount
                                        }
                                        variant="dot"
                                        color="secondary"
                                      >
                                        <PersonOutlineOutlined />
                                      </Badge>
                                    ) : (
                                      <PersonOutlineOutlined />
                                    )}
                                  </ListItemIcon>
                                  <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
                                </>
                              )}
                            </ListItem>
                          </List>
                          <List component="div" disablePadding>
                            <ListItem
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px"
                              }}
                              onClick={this.handleDrawerClose}
                              button
                              component={Link}
                              to="/admin/researches"
                              selected={pathname.startsWith(
                                "/admin/researches"
                              )}
                              className={classes.nested}
                            >
                              {pathname.startsWith("/admin/researches") ? (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined color="primary" />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: { fontWeight: "500" },
                                      color: "primary"
                                    }}
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              )}
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>

                      <List component="nav" className={classes.root}>
                        <ListItem
                          style={{
                            borderTopRightRadius: "23px",
                            borderBottomRightRadius: "23px"
                          }}
                          button
                          onClick={this.handleReportsClick}
                        >
                          <ListItemIcon>
                            <PollOutlined />
                          </ListItemIcon>
                          <ListItemText inset primary="ລາຍງານ" />
                          {this.state.openReportsToolMenu ? (
                            <ExpandLessOutlined />
                          ) : (
                            <ExpandMoreOutlined />
                          )}
                        </ListItem>
                        <Collapse
                          in={this.state.openReportsToolMenu}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            <ListItem
                              button
                              component={Link}
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px"
                              }}
                              onClick={this.handleDrawerClose}
                              to="/admin/reports/researchers/numbers"
                              selected={pathname.startsWith(
                                "/admin/reports/researchers"
                              )}
                              className={classes.nested}
                            >
                              {pathname.startsWith(
                                "/admin/reports/researchers"
                              ) ? (
                                <>
                                  <ListItemIcon>
                                    <PersonOutlineOutlined color="primary" />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: { fontWeight: "500" },
                                      color: "primary"
                                    }}
                                    primary="ນັກຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    <PersonOutlineOutlined />
                                  </ListItemIcon>
                                  <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
                                </>
                              )}
                            </ListItem>
                          </List>
                          <List component="div" disablePadding>
                            <ListItem
                              style={{
                                borderTopRightRadius: "23px",
                                borderBottomRightRadius: "23px"
                              }}
                              button
                              component={Link}
                              to="/admin/reports/researches/numbers"
                              selected={pathname.startsWith(
                                "/admin/reports/researches"
                              )}
                              className={classes.nested}
                              onClick={this.handleDrawerClose}
                            >
                              {pathname.startsWith(
                                "/admin/reports/researches"
                              ) ? (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined color="primary" />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primaryTypographyProps={{
                                      style: { fontWeight: "500" },
                                      color: "primary"
                                    }}
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              ) : (
                                <>
                                  <ListItemIcon>
                                    <DescriptionOutlined />
                                  </ListItemIcon>
                                  <ListItemText
                                    inset
                                    primary="ຜົນງານຄົ້ນຄວ້າ"
                                  />
                                </>
                              )}
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>
                    </>
                  ) : null}
                  {
                    /*  collapse component */
                    //     <ListItem button onClick={this.handleClick}>
                    //   <ListItemIcon>
                    //     <InboxOutlined />
                    //   </ListItemIcon>
                    //   <ListItemText inset primary="Inbox" />
                    //   {this.state.openList ? (
                    //     <ExpandLessOutlined />
                    //   ) : (
                    //     <ExpandMoreOutlined />
                    //   )}
                    // </ListItem>
                    // <Collapse in={this.state.openList} timeout="auto" unmountOnExit>
                    //   <List component="div" disablePadding>
                    //     <ListItem button className={classes.nested}>
                    //       <ListItemIcon>
                    //         <InboxOutlined />
                    //       </ListItemIcon>
                    //       <ListItemText inset primary="Starred" />
                    //     </ListItem>
                    //   </List>
                    // </Collapse>
                  }
                </List>
              </Drawer>
            </Hidden>
            {renderMenu}
            {renderCreateNewMenu}
          </div>
        </>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
          style={{ padding: 0 }}
        >
          {
            // <div className={classes.layout} style={{ marginLeft: drawerWidth }} open={this.state.open}></div>
          }
          <div className={classes.layout} open={this.state.open}>
            {this.props.children}
          </div>
        </main>
        <Footer />
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

const enhance = compose(
  withRouter,
  withWidth(),
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    null
  )
);

export default enhance(Layout);
