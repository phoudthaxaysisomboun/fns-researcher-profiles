import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser, getRequestUserCount } from "../actions/user_actions";
import { UPLOADS_SERVER } from "../components/utils/misc";

import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
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
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Collapse,
  ListSubheader,
  Badge
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { fade } from "@material-ui/core/styles/colorManipulator";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import { ArrowDropDownOutlined } from "@material-ui/icons";
import {
  SettingsOutlined,
  ExitToAppOutlined,
  AddOutlined,
  PersonOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  InboxOutlined,
  MailOutlineOutlined,
  ExpandLessOutlined,
  ExpandMoreOutlined,
  HomeOutlined,
  Home,
  Person,
  PersonOutlineOutlined,
  Description,
  DescriptionOutlined,
  SearchOutlined,
  BuildOutlined
} from "@material-ui/icons";

import { colorPallete } from "../components/utils/misc";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButtonMain: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    fontWeight: "600",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.03)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    },
    flexGrow: "0.4",
    height: "45px"
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
    height: "45px"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
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
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
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
    marginLeft: 0
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

String.prototype.toColor = function() {
  var colors = colorPallete;

  var hash = 0;
  if (this.length === 0) return hash;
  for (var i = 0; i < this.length; i++) {
    hash = this.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash];
};

const drawerWidth = 240;

class Layout extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
    headerclass: "",
    openManageToolMenu: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    if (
      this.props.user &&
      this.props.user.userData &&
      this.props.user.userData.isAdmin
    ) {
      this.setState({
        open: true
      });
    }
    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.user.userData.isAdmin) {
        
        this.setState({
          open: true
        });
      }
      if (prevProps.user.userData !==  this.props.user.userData) {
        this.props.dispatch(getRequestUserCount()).then(response => {
          console.log(response.data)
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = event => {
    let scroll = window.pageYOffset;
    if (scroll > 0) {
      this.setState({ headerclass: "active" });
    } else {
      this.setState({ headerclass: "" });
    }
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleSearch = event => {
    console.log(event.target.value);
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleMangeListClick = () => {
    this.setState(state => ({ openManageToolMenu: !state.openManageToolMenu }));
  };

  showAccountButton = () => {
    if (this.props.user.userData) {
      if (this.props.user.userData.isAuth) {
        return (
          <div>
            <Link
              to={`/profile/${this.props.user.userData._id}`}
              style={{ textDecoration: "none", outline: 0 }}
            >
              <IconButton
                aria-haspopup="true"
                color="inherit"
                style={{
                  padding: "8px",
                  margin: 0
                }}
              >
                {this.props.user.userData &&
                this.props.user.userData.profileImage &&
                this.props.user.userData.profileImage[0] &&
                this.props.user.userData.profileImage[0].name ? (
                  <Avatar
                    src={`${UPLOADS_SERVER}/images/${
                      this.props.user.userData.profileImage[0].name
                    }`}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderStyle: "solid",
                      borderColor: "#CFCECE",
                      borderWidth: "1px"
                    }}
                  />
                ) : (
                  <Avatar
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: `${`${this.props.user.userData.name}${
                        this.props.user.userData.lastname
                      }`.toColor()}`,
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
            </Link>

            <IconButton
              aria-haspopup="true"
              onClick={this.handleProfileMenuOpen}
              color="inherit"
              style={{
                padding: "0px",
                margin: 0
              }}
            >
              <ArrowDropDownOutlined />
            </IconButton>
          </div>
        );
      } else {
        return (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              size="medium"
              variant="outlined"
              color="primary"
              style={{ margin: "8px" }}
            >
              <PersonOutlined style={{ marginRight: "8px" }} />
              ລົງຊື່ເຂົ້າໃຊ້
            </Button>
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

    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { open } = this.state;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {this.props.user.userData ? (
          <Link
            to={`/profile/${this.props.user.userData._id}`}
            style={{ textDecoration: "none", outline: 0 }}
          >
            <MenuItem
              style={{ fontFamily: "'Noto Sans Lao UI', sans-serif" }}
              onClick={this.handleMenuClose}
            >
              <AccountCircle style={{ marginRight: "4px" }} />
              {this.props.user.userData.name}{" "}
              {this.props.user.userData.lastname}
            </MenuItem>
          </Link>
        ) : null}
        <MenuItem
          style={{ fontFamily: "'Noto Sans Lao UI', sans-serif" }}
          onClick={this.handleMenuClose}
        >
          <SettingsOutlined style={{ marginRight: "4px" }} />
          ຕັ້ງຄ່າ
        </MenuItem>
        <MenuItem
          style={{ fontFamily: "'Noto Sans Lao UI', sans-serif" }}
          onClick={this.logoutHandler}
        >
          <ExitToAppOutlined style={{ marginRight: "4px" }} />
          ລົງຊື່ອອກ
        </MenuItem>
      </Menu>
    );

    const renderMobileMenu = () => {
      if (this.props.user.userData) {
        if (this.props.user.userData.isAuth) {
          return (
            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={isMobileMenuOpen}
              onClose={this.handleMenuClose}
            >
              {
                //   <MenuItem onClick={this.handleMobileMenuClose}>
                //   <IconButton color="inherit">
                //     <Badge badgeContent={4} color="secondary">
                //       <MailIcon />
                //     </Badge>
                //   </IconButton>
                //   <p>Messages</p>
                // </MenuItem>
                // <MenuItem onClick={this.handleMobileMenuClose}>
                //   <IconButton color="inherit">
                //     <Badge badgeContent={11} color="secondary">
                //       <NotificationsIcon />
                //     </Badge>
                //   </IconButton>
                //   <p>Notifications</p>
                // </MenuItem>
              }

              <MenuItem onClick={this.handleProfileMenuOpen}>
                <IconButton
                  aria-owns={isMenuOpen ? "material-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                  style={{
                    padding: "8px",
                    margin: 0,
                    paddingLeft: "8px",
                    paddingRight: "8px"
                  }}
                >
                  <Avatar
                    style={{
                      width: "32px",
                      height: "32px",
                      margin: 0,
                      backgroundColor: "white",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      borderColor: "#e6e6e6"
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                      style={{
                        pointerEvents: "none",
                        display: "block",
                        width: "100%",
                        height: "100%",
                        fill: "#0066cb",
                        padding: "2px"
                      }}
                    >
                      <g style={{ color: "#0066cb" }}>
                        <path
                          d="M12,0 C18.62375,0 24,5.37625 24,12 C24,18.62375 18.62375,24 12,24 C5.37625,24 0,18.62375 0,12 C0,5.37625 5.37625,0 12,0 Z M12,10.63625 C13.66,10.63625 15,9.29625 15,7.63625 C15,5.97625 13.66,4.63625 12,4.63625 C10.34,4.63625 9,5.97625 9,7.63625 C9,9.29625 10.34,10.63625 12,10.63625 Z M12,12.40875 C8.33375,12.40875 5.455,14.18125 5.455,15.8175 C6.84125,17.95 9.26875,19.3625 12,19.3625 C14.73125,19.3625 17.15875,17.95 18.545,15.8175 C18.545,14.18125 15.66625,12.40875 12,12.40875 Z"
                          class="style-scope yt-icon"
                        />
                      </g>
                    </svg>
                  </Avatar>
                </IconButton>
                <p style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}>
                  ບັນຊີ
                </p>
              </MenuItem>
              <MenuItem onClick={this.handleProfileMenuOpen}>
                <Fab
                  size="medium"
                  variant="extended"
                  color="primary"
                  style={{ margin: "8px", width: "100%", boxShadow: "none" }}
                >
                  <AddOutlined style={{ marginRight: "8px" }} />
                  ເພີ່ມ
                </Fab>
              </MenuItem>
            </Menu>
          );
        } else {
          return (
            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={isMobileMenuOpen}
              onClose={this.handleMenuClose}
            >
              {
                //   <MenuItem onClick={this.handleMobileMenuClose}>
                //   <IconButton color="inherit">
                //     <Badge badgeContent={4} color="secondary">
                //       <MailIcon />
                //     </Badge>
                //   </IconButton>
                //   <p>Messages</p>
                // </MenuItem>
                // <MenuItem onClick={this.handleMobileMenuClose}>
                //   <IconButton color="inherit">
                //     <Badge badgeContent={11} color="secondary">
                //       <NotificationsIcon />
                //     </Badge>
                //   </IconButton>
                //   <p>Notifications</p>
                // </MenuItem>
              }
              <Link to="/login" style={{ textDecoration: "none" }}>
                <MenuItem>
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    style={{ margin: "8px" }}
                  >
                    <PersonOutlined style={{ marginRight: "8px" }} />
                    ລົງຊື່ເຂົ້າໃຊ້
                  </Button>
                </MenuItem>
              </Link>
            </Menu>
          );
        }
      }
    };

    return (
      <div>
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
                // zIndex: 1201
              }}
            >
              <Toolbar
                // disableGutters={!open}
                variant="regular"
                style={{ height: "64px" }}
              >
                {!this.props.location.pathname.startsWith("/search") ? (
                  <>
                    <IconButton
                      //   className={classes.menuButton}

                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerOpen}
                      className={classNames(
                        classes.menuButtonMain,
                        open && classes.hide
                      )}
                    >
                      <MenuIcon />
                    </IconButton>
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
                      color="inherit"
                      noWrap
                      style={{ fontWeight: "bold" }}
                    >
                      FNS Researcher Profiles
                    </Typography>
                  </Link>
                ) : null}

                {!this.props.location.pathname.startsWith("/search") ? (
                  <>
                    <div className={classes.search}>
                      <IconButton
                        className={classes.searchIcon}
                        style={{
                          padding: "2px",
                          margin: 0,
                          width: "28px",
                          height: "28px",
                          marginTop: "8.5px",
                          marginBottom: "8.5px",
                          marginLeft: "8px"
                        }}
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
                        onChange={event => {
                          this.handleSearch(event);
                        }}
                      />
                    </div>
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
                        <IconButton
                          onClick={this.handleDrawerOpen}
                          className={classNames(
                            classes.menuButtonMain,
                            open && classes.hide
                          )}
                          color="inherit"
                          aria-label="Open drawer"
                        >
                          <MenuIcon />
                        </IconButton>
                      </Grid>

                      <Grid item xs={8} alignContent="center">
                        <Link
                          to="/"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Typography
                            variant="h6"
                            color="inherit"
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontFamily: "'Roboto', sans serif"
                            }}
                            noWrap
                          >
                            FNS Researcher Profiles
                          </Typography>
                        </Link>
                      </Grid>

                      <Grid item xs={2} align="right">
                        <div className={classes.sectionDesktop2}>
                          {
                            // <IconButton color="inherit">
                            //   <Badge badgeContent={4} color="secondary">
                            //     <MailIcon />
                            //   </Badge>
                            // </IconButton>
                            // <IconButton color="inherit">
                            //   <Badge badgeContent={17} color="secondary">
                            //     <NotificationsIcon />
                            //   </Badge>
                            // </IconButton>
                          }
                          {this.showAccountButton()}
                        </div>
                        <div className={classes.sectionMobile2}>
                          <IconButton
                            aria-haspopup="true"
                            onClick={this.handleMobileMenuOpen}
                            color="inherit"
                          >
                            <MoreIcon />
                          </IconButton>
                        </div>
                      </Grid>
                    </Grid>
                  </>
                )}

                {!this.props.location.pathname.startsWith("/search") ? (
                  <>
                    <div className={classes.sectionDesktop}>
                      {
                        // <IconButton color="inherit">
                        //   <Badge badgeContent={4} color="secondary">
                        //     <MailIcon />
                        //   </Badge>
                        // </IconButton>
                        // <IconButton color="inherit">
                        //   <Badge badgeContent={17} color="secondary">
                        //     <NotificationsIcon />
                        //   </Badge>
                        // </IconButton>
                      }
                      {this.showAccountButton()}
                    </div>
                    <div className={classes.sectionMobile}>
                      <IconButton
                        aria-haspopup="true"
                        onClick={this.handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </div>
                  </>
                ) : null}
              </Toolbar>
            </AppBar>

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftOutlined />
                  ) : (
                    <ChevronRightOutlined />
                  )}
                </IconButton>
              </div>
              <Divider />

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
                  >
                    {"/" === pathname ? (
                      <>
                        <ListItemIcon>
                          <HomeOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{
                            style: { color: "#3f51b5", fontWeight: "500" }
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
                  component={Link}
                  to="/search"
                  selected={
                    pathname.startsWith("/search") &&
                    !("?q=" === this.props.location.search)
                  }
                >
                  {pathname.startsWith("/search") &&
                  !("?q=" === this.props.location.search) ? (
                    <>
                      <ListItemIcon>
                        <SearchOutlined color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          style: { color: "#3f51b5", fontWeight: "500" }
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
                          style: { color: "#3f51b5", fontWeight: "500" }
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
                  button
                  component={Link}
                  to="/search/researches?q="
                  selected={
                    "/search/researches" === pathname &&
                    "?q=" === this.props.location.search
                  }
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
                          style: { color: "#3f51b5", fontWeight: "500" }
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

                {this.props &&
                this.props.user &&
                this.props.user.userData &&
                this.props.user.userData.isAdmin ? (
                  <>
                    <Divider />
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
                      <ListItem button onClick={this.handleMangeListClick}>
                        <ListItemIcon>
                          <BuildOutlined fontSize="small" />
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
                            button
                            component={Link}
                            to="/admin/researchers"
                            selected={pathname.startsWith("/admin/researchers")}
                            className={classes.nested}
                          >
                            { pathname.startsWith("/admin/researchers") ? (
                              <>
                                <ListItemIcon>
                                  {this.props &&
                                  this.props.user &&
                                  this.props.user.userRegisterationCount &&
                                  this.props.user.userRegisterationCount > 0 ? (
                                    <Badge badgeContent={this.props.user.userRegisterationCount} variant="dot" color="secondary">
                                      <PersonOutlineOutlined color="primary" />
                                    </Badge>
                                  ) : (
                                    <PersonOutlineOutlined color="primary" />
                                  )}
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
                              {
                              this.props.user.userRegisterationCount
                                 > 0 ? (
                                <Badge badgeContent={this.props.user.userRegisterationCount} variant="dot" color="secondary">
                                  <PersonOutlineOutlined />
                                </Badge>
                              ) : (
                                <PersonOutlineOutlined  />
                              )}
                            </ListItemIcon>
                                <ListItemText inset primary="ນັກຄົ້ນຄວ້າ" />
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

            {renderMenu}
            {renderMobileMenu()}
          </div>
          {
            //   <Drawer
            //   className={classes.drawer}
            //   variant="persistent"
            //   classes={{
            //     paper: classes.drawerPaper
            //   }}
            //   open={false}
            // >
            //   <div className={classes.toolbar}style={{paddingTop: "64px"}} />
            //   <List>
            //     {["Inbox", "Starred", "Send on the most amazing", "Drafts"].map((text, index) => (
            //       <ListItem button key={text}>
            //         <ListItemIcon>
            //           {index % 2 === 0 ? <SearchIcon /> : <SearchIcon />}
            //         </ListItemIcon>
            //         <ListItemText primary={text} />
            //       </ListItem>
            //     ))}
            //   </List>
            //   <Divider />
            //   <List>
            //     {["All mail", "Trash", "Spam"].map((text, index) => (
            //       <ListItem button key={text}>
            //         <ListItemIcon>
            //           {index % 2 === 0 ? <SearchIcon /> : <SearchIcon />}
            //         </ListItemIcon>
            //         <ListItemText primary={text} />
            //       </ListItem>
            //     ))}
            //   </List>
            // </Drawer>
          }
        </>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
          style={{ padding: 0 }}
        >
          <div className="page_container" style={{ marginLeft: drawerWidth }}>
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

// export default withStyles(styles, { withTheme: true })(Layout);
// export default withRouter(connect(mapStateToProps)(withStyles(styles)(Layout)));
export default withRouter(
  connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Layout))
);
