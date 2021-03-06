import React, { Component } from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { logoutUser } from "../../../actions/user_actions";

import { SERVER, UPLOADS_SERVER } from "../../../components/utils/misc"

// import classNames from 'classnames';

import PropTypes from 'prop-types';


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
  
  Grid
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
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
} from "@material-ui/icons";

import { colorPallete } from "../../../components/utils/misc";

const toColor = (str) => {
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

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
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

});

class Header extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false,
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
                  margin: 0,
                  
                }}
              >
                {
                  this.props.user.userData && this.props.user.userData.profileImage && this.props.user.userData.profileImage[0] && this.props.user.userData.profileImage[0].location ?
                  <Avatar
                  src={`${SERVER}${this.props.user.userData.profileImage[0].location}`}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderStyle: "solid",
                    borderColor: "rgb(239, 239, 239)",
                    borderWidth: "1px"
                  }}
                >
                 
                </Avatar>
                  :

                  <Avatar
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: toColor(`${this.props.user.userData.name}${
                      this.props.user.userData.lastname
                    }`),
                    fontFamily: "'Noto Sans Lao UI', sans serif",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                >
                  {`${this.props.user.userData.name.charAt(
                    0
                  )}${this.props.user.userData.lastname.charAt(0)}`}
                </Avatar>
                }
                
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

  render(props) {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

    // const { open } = this.state;

    return (
      <>
        <div className={classes.root}>
          <AppBar
            position="fixed"
            id="header"
            color="default"
            className={`${classes.appbar} ${this.props.headerclass}`}
            style={{
              background: "white",
              boxShadow: "none",
              // zIndex: 1201
            }}
          >
            <Toolbar variant="regular" style={{ height: "64px" }}>
              {!this.props.location.pathname.startsWith("/search") ? (
                <>
                  <IconButton
                  className={classes.menuButton}
                    color="inherit"
                    aria-label="Open drawer"
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
                  <Grid container alignItems="center" style={{ flexGrow: "1", margin: 0,  }}>
                    <Grid item xs={2} align="left">
                      <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Open drawer"
                      >
                        <MenuIcon />
                      </IconButton>
                    </Grid>

                    <Grid item xs ={8} alignContent="center">
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
                            fontFamily: "'Roboto', sans serif",
                           
                          }}
                          noWrap
                        >
                          FNS Researcher Profiles
                        </Typography>
                      </Link>
                    </Grid>

                    <Grid item xs={2}  align="right">
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
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Header)));
