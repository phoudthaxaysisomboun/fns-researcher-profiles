import React, { Component } from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { logoutUser } from "../../../actions/user_actions";

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
  Button
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import MoreIcon from "@material-ui/icons/MoreVertOutlined";
import {ArrowDropDownOutlined} from "@material-ui/icons";
import {
  SettingsOutlined,
  ExitToAppOutlined,
  AddOutlined,
  PersonOutlined
} from "@material-ui/icons";

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
    pointerEvents: "none",
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
  }
});

class Header extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
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
          <Link to={`/profile/${this.props.user.userData._id}`} style={{textDecoration: "none", outline: 0}}>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              style={{
                padding: "8px",
                margin: 0
              }}
            >
              <Avatar
                style={{ width: "32px", height: "32px", margin: 0 }}
                alt="Remy Sharp"
                src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
              />
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

  render() {
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
          <Link to={`/profile/${this.props.user.userData._id}`} style={{textDecoration: "none", outline: 0}}>
            <MenuItem
              style={{ fontFamily: "'Noto Sans Lao UI', sans-serif" }}
              onClick={this.handleMenuClose}
            >
              <AccountCircle style={{ marginRight: "4px" }} />
              {this.props.user.userData.name} {this.props.user.userData.lastname}
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
                    style={{ width: "32px", height: "32px", margin: 0 }}
                    alt="Remy Sharp"
                    src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  />
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
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="default"
          style={{
            boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.1)",
            backgroundColor: "white"
          }}
        >
          <Toolbar variant="regular" style={{ height: "64px" }}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                FNS Researcher Profiles
              </Typography>
            </Link>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="ຄົ້ນຫານັກຄົ້ນຄວ້າ, ຜົນງານ ຯລຯ"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                style={{
                  fontFamily: "'Noto Sans Lao UI', sans-serif"
                }}
              />
            </div>
            <div className={classes.grow} />
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
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Header)));
