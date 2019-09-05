import React from "react";

import {
  IconButton,
  Grid,
  Avatar,
  Button,
  Tabs,
  Tab,
  Typography,
  Hidden,
  MenuItem,
  Menu
} from "@material-ui/core";

import { ObjectID } from "bson";

import NumberFormat from "react-number-format";

import moment from "moment";

import {
  EditOutlined,
  ReplyOutlined,
  ModeCommentOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  ForwardOutlined,
  MoreHorizOutlined,
  SaveAltOutlined,
  RemoveRedEyeOutlined,
PersonAddDisabledOutlined
} from "@material-ui/icons";

import { Link, withRouter } from "react-router-dom";

import { SERVER, colorPallete } from "../components/utils/misc";


const ResearchHeader = ({
  props,
  children,
  loading,
  tabIndex,
  research,
  openShareDialog,
  runLike,
  runUnLike,
  anchorUploader,
  anchorCoAuthor,
  handleUploaderMenuClick,
  handleUploaderMenuClose,
  handleCoAuthorMenuClick,
  handleCoAuthorMenuClose,
  openDeleteResearchDialog,
  openRemoveAuthorDialog,
  openEditResearch
}) => {
  const userData = { ...props.user.userData };

  let author = []

  let citationString = ""

  let researchTitle

  if (research.author) {
    author = research.author.map((value)=> {
      return `${value.name} ${value.lastname}`
    })
    citationString = encodeURIComponent(`${author.join(", ")}. (${moment(research.date).format("YYYY")}). ${research.title}`)

    researchTitle = research.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }

  

  const isAuth = userData.isAuth;

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
  

  const _id = new ObjectID();

  const renderMoreMenu = () => {
    let isAuthor
    if (research.author) {
      research.author.map((value)=>{
        if (value._id === userData._id) {
          isAuthor = true
          console.log("fiasdasdasdasdasd")
          
        } 
        return null
      })

      console.log(isAuthor)
    }
    if (research && research.uploader && research.uploader._id) {
        if ((userData._id === research.uploader._id) || (userData.isAdmin === true)) {
        return (
          <>
          <IconButton style={{ marginLeft: "8px" }} onClick={event => {
            handleUploaderMenuClick(
              event,
            );
          }}>
                    <MoreHorizOutlined />
                  </IconButton>
          </>
        )
      } else if (isAuthor === true ) {
        console.log(isAuthor)
        return (
          <>
          <IconButton style={{ marginLeft: "8px" }} onClick={event => {
            handleCoAuthorMenuClick(
              event,
            );
          }}>
          <MoreHorizOutlined />
        </IconButton>
          </>
        )
      } else {
        return (
          <></>
        )
      }
    }
    
  }

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
    }
  };

  const renderLikeButton = id => {
    let likeCount =
      research.likes && research.likes ? research.likes.length : 0;
    let duplicate = false;
    // let hasLike = false;
    if (userData.likes) {
      userData.likes.forEach(item => {
        if (item === id) {
          duplicate = true;
        }
      });
    }

    // if (research.likes) {
    //   research.likes.forEach((item, index) => {
    //     if (item) {
    //       hasLike = true;
    //     }
    //   });
    // }

    if (duplicate) {
      return (
        <Grid item>
          <Button
            style={{
              color: "#d32f2f",
              minWidth: "14px",
              padding: "4px"
            }}
            size="large"
            onClick={() => {
              runUnLike(id);
            }}
          >
            <FavoriteOutlined
              fontSize="default"
              style={{ marginRight: "6px" }}
            />
            {likeCount > 0 ? (
              <div
                style={{
                  fontSize: "1rem",
                  color: "#d32f2f",
                  // fontFamily: "'Roboto', sans serif",
                  display: "inline"
                }}
              >
                &nbsp;
                <NumberFormat
                  value={likeCount}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                &nbsp;
              </div>
            ) : (
              <div
                style={{
                  fontSize: "1rem",

                  // fontFamily: "'Roboto', sans serif",
                  display: "inline"
                }}
              >
                ຖຶກໃຈ
              </div>
            )}
          </Button>
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <Button
            style={{
              color: "#686868",
              minWidth: "14px",
              padding: "4px"
            }}
            size="large"
            onClick={() => {
              runLike(id);
            }}
          >
            <FavoriteBorderOutlined
              fontSize="default"
              style={{ marginRight: "6px" }}
            />
            {likeCount > 0 ? (
              <div
                style={{
                  fontSize: "1rem",
                  color: "#757575",
                  // fontFamily: "'Roboto', sans serif",
                  display: "inline"
                }}
              >
                &nbsp;
                <NumberFormat
                  value={likeCount}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                &nbsp;
              </div>
            ) : (
              <div
                style={{
                  fontSize: "1rem",

                  // fontFamily: "'Roboto', sans serif",
                  display: "inline"
                }}
              >
                ຖຶກໃຈ
              </div>
            )}
          </Button>
        </Grid>
      );
    }
  };

  // const downloadFile = () => {
  //   this.props.history.push(`/api/research/download/${research.files[0].name}`)
  // }

  return (
    <Grid container>
    <Menu
          className="menu"
          anchorEl={anchorUploader}
          open={Boolean(anchorUploader)}
          onClose={event => {
            handleUploaderMenuClose(event);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem
            style={{
              fontFamily: "'Roboto', 'Noto Sans Lao UI', sans-serif",
              fontWeight: 500
            }}
            selected={false}
            onClick = {()=> {openEditResearch()}}
          >
           <EditOutlined style={{ marginRight: "16px" }}/>
            ແກ້ໄຂ
          </MenuItem>
          <MenuItem
            style={{
              fontFamily: "'Roboto', 'Noto Sans Lao UI', sans-serif",
              fontWeight: 500
            }}
            selected={false}
            onClick = {()=> {openDeleteResearchDialog()}}
          >
            <svg
              style={{ marginRight: "16px" }}
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="#212121"
              focusable="false"
              class="a-s-fa-Ha-pa"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
              <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
            </svg>
            ລຶບ
          </MenuItem>

          <MenuItem
            style={{
              fontFamily: "'Roboto', 'Noto Sans Lao UI', sans-serif",
              fontWeight: 500,
              display: "none"
            }}
            selected={true}
          />
        </Menu>


        <Menu
          className="menu"
          anchorEl={anchorCoAuthor}
          open={Boolean(anchorCoAuthor)}
          onClose={event => {
            handleCoAuthorMenuClose(event);
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem
            style={{
              fontFamily: "'Roboto', 'Noto Sans Lao UI', sans-serif",
              fontWeight: 500
            }}
            selected={false}
            onClick = {()=> {openRemoveAuthorDialog()}}
          >
            <PersonAddDisabledOutlined style={{marginRight: "16px"}} />
            ເອົາຊື່ອອກ
          </MenuItem>

          <MenuItem
            style={{
              fontFamily: "'Roboto', 'Noto Sans Lao UI', sans-serif",
              fontWeight: 500,
              display: "none"
            }}
            selected={true}
          />
        </Menu>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs sm={1} lg={2} md={1} />
          <Grid
            item
            xs={10}
            sm={10}
            lg={8}
            md={10}
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
            <Grid container spacing={24}>
              <Grid item lg md sm xs>
                {research ? (
                  <>
                    <Grid container style={{ marginBottom: "8px" }}>
                      <div style={styles.chip}>
                        {research.researchType.name}
                      </div>

                      {research.files ? (
                        <div style={styles.chipSecondary}>
                          ມີເອກກະສານໃຫ້ອ່ານ
                        </div>
                      ) : null}

                      {research.publicationType ? (
                        <div style={styles.chipSecondary}>
                          {research.publicationType.name}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid container>
                      <Typography
                        variant="inherit"
                        style={{
                          fontFamily: "'Roboto', 'Noto Sans Lao UI', sans serif",
                          fontWeight: 700,
                          fontSize: "24px"
                        }}
                      >
                        {research.title}
                      </Typography>
                    </Grid>
                    <Grid container>
                      <Typography
                        variant="body2"
                        style={{
                          // fontFamily: "'Roboto', sans-serif",
                          fontSize: "12px",
                          letterSpacing: "1.5 px",
                          fontWeight: "600",
                          color: "#00695C"
                        }}
                      >
                        {moment(research.date).format("DD/MM/YYYY")}
                      </Typography>
                    </Grid>

                    <Grid container style={{ marginTop: "8px" }}>
                      {research.author.map((value, item, array) => (
                        <>
                          <Link
                            to={`/profile/${value._id}`}
                            style={{
                              color: "inherit",
                              textDecoration: "none"
                            }}
                          >
                            <Grid
                              item
                              style={{
                                marginRight: "4px",
                                marginBottom: "8px"
                              }}
                            >
                              {value.profileImage &&
                              value.profileImage[0] &&
                              value.profileImage[0].location ? (
                                <Avatar
                                  src={`${SERVER}${
                                    value.profileImage[0].location
                                  }`}
                                  style={{
                                    width: "18px",
                                    height: "18px"
                                  }}
                                  alt="profile image"
                                />
                              ) : (
                                <Avatar
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    backgroundColor: toColor(`${value.name}${
                                      value.lastname
                                    }`),

                                    fontWeight: "normal",
                                    fontSize: "8px"
                                  }}
                                  alt="profile image"
                                >
                                  <Typography variant="inherit">
                                    {`${value.name.charAt(
                                      0
                                    )}${value.lastname.charAt(0)}`}
                                  </Typography>
                                </Avatar>
                              )}
                            </Grid>
                          </Link>
                          <Link to={`/profile/${value._id}`}style={{
                            color: "inherit",
                            textDecoration: "none"
                          }} >
                          <Grid item>
                            <Typography
                              variant="inherit"
                              style={{
                                height: "18px",
                                lineHeight: "18px",
                                marginBottom: "8px",
                                fontWeight: "500",
                                marginRight: "4px"
                              }}
                            >
                              {`${value.name} ${value.lastname}`}{" "}
                              {item !== array.length - 1 ? " • " : null}
                            </Typography>
                          </Grid>
                          </Link>
                        </>
                      ))}
                    </Grid>
                    {research &&
                    research.researchType &&
                    research.researchType._id === "5cdb83a127ba7c4214ef5779" ? (
                      <>
                        {research.degree ? (
                          <Grid container style={{ marginTop: "8px" }}>
                            <Typography
                              variant="inherit"
                              style={{
                                letterSpacing: "1.5 px"
                              }}
                            >
                              <strong>ລະດັບ: </strong> {research.degree}
                            </Typography>
                          </Grid>
                        ) : null}
                        {research.supervisor[0] ? (
                          <>
                          <Grid container style={{ marginTop: "8px" }}>
                            <Typography
                              variant="inherit"
                              style={{
                                letterSpacing: "1.5 px",
                                marginRight: "8px"
                              }} 
                            >
                              <strong>ຜູ້ນໍາພາ: </strong>{" "}
                              
                              
                            </Typography> 
                          </Grid>
                          <Grid container style={{marginTop: "4px"}}>
                          {research.supervisor.map((value, item, array) => (
                            < >
                              <Link
                                to={`/profile/${value._id}`}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none"
                                }}
                              >
                                <Grid
                                  item
                                  style={{
                                    marginRight: "4px",
                                    marginBottom: "8px"
                                  }}
                                >
                                  {value.profileImage &&
                                  value.profileImage[0] &&
                                  value.profileImage[0].location ? (
                                    <Avatar
                                      src={`${SERVER}${
                                        value.profileImage[0].location
                                      }`}
                                      style={{
                                        width: "18px",
                                        height: "18px"
                                      }}
                                      alt="profile image"
                                    />
                                  ) : (
                                    <Avatar
                                      style={{
                                        width: "18px",
                                        height: "18px",
                                        backgroundColor: toColor(`${value.name}${
                                          value.lastname
                                        }`),
    
                                        fontWeight: "normal",
                                        fontSize: "8px"
                                      }}
                                      alt="profile image"
                                    >
                                      <Typography variant="inherit">
                                        {`${value.name.charAt(
                                          0
                                        )}${value.lastname.charAt(0)}`}
                                      </Typography>
                                    </Avatar>
                                  )}
                                </Grid>
                              </Link>
                              <Link to={`/profile/${value._id}`}style={{
                                color: "inherit",
                                textDecoration: "none"
                              }} >
                              <Grid item>
                                <Typography
                                  variant="inherit"
                                  style={{
                                    height: "18px",
                                    lineHeight: "18px",
                                    marginBottom: "8px",
                                    fontWeight: "500",
                                    marginRight: "4px"
                                  }}
                                >
                                  {`${value.name} ${value.lastname}`}{" "}
                                  {item !== array.length - 1 ? " • " : null}
                                </Typography>
                              </Grid>
                              </Link>
                            </>
                          ))}
                          </Grid>
                          </>

                        ) : null}
                      </>
                    ) : null}

                    {research &&
                    research.researchType &&
                    research.researchType._id === "5d0516e447c496528476ec94" ? (
                      <>
                        {research.conferenceTitle ? (
                          <Grid container>
                            <Typography
                              variant="inherit"
                              style={{
                                letterSpacing: "1.5 px"
                              }}
                            >
                              <strong>ງານປະຊຸມ: </strong>{" "}
                              {research.conferenceTitle}
                            </Typography>
                          </Grid>
                        ) : null}
                        {research.location ? (
                          <Grid container>
                            <Typography
                              variant="inherit"
                              style={{
                                letterSpacing: "1.5 px"
                              }}
                            >
                              <strong>ສະຖານທີ່ປະຊຸມ: </strong>{" "}
                              {`${research.location}`}
                            </Typography>
                          </Grid>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item lg={3} md={6} sm={12} xs={12} align="right">
                <Hidden mdUp>
                  <Grid container>
                    <Grid container>
                      <Grid
                        item
                        style={{ width: "32px", marginRight: "8px" }}
                        align="left"
                      >
                        <RemoveRedEyeOutlined
                          style={{ color: "#757575", paddingLeft: 0 }}
                        />
                      </Grid>
                      <Grid item xs align="left">
                        <Typography variant="inherit">
                          {" "}
                          <span style={{ color: "#757575" }}>ອ່ານ</span>
                          <div
                            style={{
                              color: "#757575",
                              // fontFamily: "'Roboto', sans serif",
                              display: "inline",
                              fontWeight: "500"
                            }}
                          >
                            &nbsp;
                            <NumberFormat
                              value={research.reads ? research.reads.length : 0}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            &nbsp;
                          </div>
                          <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        style={{ width: "32px", marginRight: "8px" }}
                        align="left"
                      >
                        <ForwardOutlined
                          style={{ color: "#757575", paddingLeft: 0 }}
                        />
                      </Grid>
                      <Grid item xs align="left">
                        <Typography variant="inherit">
                          {" "}
                          <span style={{ color: "#757575" }}>ຖືກນໍາໄປອ້າງອີງ</span>
                          <div
                            style={{
                              color: "#757575",
                              // fontFamily: "'Roboto', sans serif",
                              display: "inline",
                              fontWeight: "500"
                            }}
                          >
                            &nbsp;
                            <NumberFormat
                              value={research.citations ? research.citations.length : 0}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            &nbsp;
                          </div>
                          <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        style={{ width: "32px", marginRight: "8px" }}
                        align="left"
                      >
                        <SaveAltOutlined
                          style={{ color: "#757575", paddingLeft: 0 }}
                        />
                      </Grid>
                      <Grid item xs align="left">
                        <Typography variant="inherit">
                          {" "}
                          <span style={{ color: "#757575" }}>ດາວນ໌ໂຫລດ</span>
                          <div
                            style={{
                              color: "#757575",
                              // fontFamily: "'Roboto', sans serif",
                              display: "inline",
                              fontWeight: "500"
                            }}
                          >
                            &nbsp;
                            <NumberFormat
                              value={research.downloads ? research.downloads.length : 0}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            &nbsp;
                          </div>
                          <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Hidden>
                <Hidden smDown>
                  <Grid container alignItems="flex-end" alignContent="flex-end">
                    <Grid container>
                      <Grid item xs>
                        <Grid container>
                          <Grid item xs align="right">
                            <Typography variant="inherit">
                              {" "}
                              <span style={{ color: "#757575" }}>ອ່ານ</span>
                              <div
                                style={{
                                  color: "#757575",
                                  // fontFamily: "'Roboto', sans serif",
                                  display: "inline",
                                  fontWeight: "500"
                                }}
                              >
                                &nbsp;
                                <NumberFormat
                                  value={
                                    research.reads ? research.reads.length : 0
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                &nbsp;
                              </div>
                              <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                            </Typography>
                          </Grid>
                          <Grid item style={{ width: "32px" }}>
                            <RemoveRedEyeOutlined
                              style={{ color: "#757575" }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs>
                        <Grid container>
                          <Grid item xs align="right">
                            <Typography variant="inherit">
                              {" "}
                              <span style={{ color: "#757575" }}>
                                ຖືກນໍາໄປອ້າງອີງ
                              </span>
                              <div
                                style={{
                                  color: "#757575",
                                  // fontFamily: "'Roboto', sans serif",
                                  display: "inline",
                                  fontWeight: "500"
                                }}
                              >
                                &nbsp;
                                <NumberFormat
                                  value={
                                    research.citations ? research.citations.length : 0
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                &nbsp;
                              </div>
                              <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                            </Typography>
                          </Grid>
                          <Grid item style={{ width: "32px" }}>
                            <ForwardOutlined style={{ color: "#757575" }} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs>
                        <Grid container>
                          <Grid item xs align="right">
                            <Typography variant="inherit">
                              {" "}
                              <span style={{ color: "#757575" }}>
                                ດາວນ໌ໂຫລດ
                              </span>
                              <div
                                style={{
                                  color: "#757575",
                                  // fontFamily: "'Roboto', sans serif",
                                  display: "inline",
                                  fontWeight: "500"
                                }}
                              >
                                &nbsp;
                                <NumberFormat
                                  value={
                                    research.downloads
                                      ? research.downloads.length
                                      : 0
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                />
                                &nbsp;
                              </div>
                              <span style={{ color: "#757575" }}>ຄັ້ງ</span>
                            </Typography>
                          </Grid>
                          <Grid item style={{ width: "32px" }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="a-s-fa-Ha-pa"
                              viewBox="0 0 24 24"
                              focusable="false"
                              fill="#757575"
                              style={{
                                width: "24px",
                                height: "24px"
                              }}
                            >
                              <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m11.59-8.41L13 12.17V4h-2v8.17L8.41 9.59 7 11l5 5 5-5-1.41-1.41z" />
                            </svg>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item lg md sm xs>
                <Grid
                  container
                  style={{ marginTop: "4px", marginBottom: "8px" }}
                  spacing={16}
                >
                  {isAuth ? renderLikeButton(research._id) : null}

                  {
                    isAuth ?
                    <>
                    <Grid item>
                    <Button
                      style={{
                        color: "#686868",
                        minWidth: "14px",
                        padding: "4px"
                      }}
                      component = {Link}
                      to={`/research/${research._id}/comments`}
                    >
                      {" "}
                      <ModeCommentOutlined
                        fontSize="default"
                        style={{ marginRight: "6px" }}
                      />
                      {research.comments && research.comments[0] ? (
                        <div
                          style={{
                            fontSize: "1rem",
                            color: "#757575",
                            // fontFamily: "'Roboto', sans serif",
                            display: "inline"
                          }}
                        >
                          &nbsp;
                          <NumberFormat
                            value={
                              research.comments
                                ? research.comments.length
                                : null
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "1rem",

                            // fontFamily: "'Roboto', sans serif",
                            display: "inline"
                          }}
                        >
                          ໃຫ້ຄໍາເຫັນ
                        </div>
                      )}
                    </Button>
                  </Grid>
                    </> : null
                  }

                  <Grid item>
                    <Button
                      style={{
                        color: "#686868",
                        minWidth: "14px",
                        padding: "4px"
                      }}

                      onClick={()=>{openShareDialog()}}
                    >
                      {" "}
                      <ReplyOutlined
                        fontSize="default"
                        style={{
                          marginRight: "6px",
                          transform: "rotateY(180deg)"
                        }}
                      />
                      {research.shares && research.shares[0] ? (
                        <div
                          style={{
                            fontSize: "1rem",
                            color: "#757575",
                            // fontFamily: "'Roboto', sans serif",
                            display: "inline"
                          }}
                        >
                          &nbsp;
                          <NumberFormat
                            value={
                              research.shares ? research.shares.length : null
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: "1rem",

                            // fontFamily: "'Roboto', sans serif",
                            display: "inline"
                          }}
                        >
                          ແບ່ງປັນ
                        </div>
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12} align="right">
              {
              //   console.log(`/api/research/download/citation/${encodeURIComponent(`${research.author.join(", ")}. (${moment(research.date).format("YYYY")}). ${research.author}.`)}&${
              //   userData._id ? userData._id : _id.toHexString()
              // }&${research._id}`)
            }
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ fontSize: "1rem" }}
                  href={`/api/research/download/citation/${citationString}&${userData._id ? userData._id : _id.toHexString()}&${research._id}&${encodeURIComponent(researchTitle)}`}
                >
                  <ForwardOutlined style={{ marginRight: "14px" }} />
                  ນໍາໄປອ້າງອີງ
                </Button>
                {research &&
                research.files &&
                research.files.length > 0 &&
                research.files[0].name ? (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginLeft: "8px", fontSize: "1rem" }}
                      href={`/api/research/download/${research.files[0].name}&${
                        userData._id ? userData._id : _id.toHexString()
                      }&${research._id}`}
                    >
                      <SaveAltOutlined style={{ marginRight: "14px" }} />
                      ດາວນ໌ໂຫລດ
                    </Button>
                  </>
                ) : null}

                {
                  userData.isAuth ? renderMoreMenu() : null
                }

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  value={tabIndex}
                  indicatorColor="primary"
                  textColor="primary"
                  
                  style={{ marginTop: "16px" }}
                  TabIndicatorProps={{
                    style:{
                      // backgroundColor: "red",
                      height: "3px",
                      borderTopRightRadius: "3px",
                      borderTopLeftRadius: "3px",
                      paddingLeft: "3px",
                      paddingRight: "3px"
                    }
                  }}
                >
                  <Tab
                    style={{ fontSize: "16px", fontWeight: 500 }}
                    label="ໂດຍລວມ"
                    to={`/research/${research._id}`}
                    component={Link}
                  />

                  <Tab
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      textDecoration: "none"
                    }}
                    label="ສະຖິຕິ"
                    to={`/profile/${research._id}/info`}
                    component={Link}
                  />

                  <Tab
                    style={{ fontSize: "16px", fontWeight: 500 }}
                    label={
                      research.comments && research.comments.length > 0
                        ? `ຄໍາເຫັນ (${research.comments.length})`
                        : `ຄໍາເຫັນ`
                    }
                    to={`/research/${research._id}/comments`}
                    component={Link}
                  />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs sm={1} lg={2} md={1} />
        </Grid>
      </Grid>

      {children}
    </Grid>
  );
};

export default withRouter(ResearchHeader);
