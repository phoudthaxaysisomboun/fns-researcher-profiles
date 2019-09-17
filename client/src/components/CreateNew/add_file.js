import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import Microlink from "@microlink/react";

import {
  Paper,
  Typography,
  Grid,
  Button,
  FormControl,
  TextField,
  IconButton,
  CircularProgress,
  Tooltip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Link,
  InputAdornment
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import {
  //   CloseOutlined,
  //   Cancel,
  //   DescriptionOutlined,
  //   AccountCircleOutlined,
  InsertLinkOutlined,
  // InfoOutlined,
  Cancel,
  Error
} from "@material-ui/icons";

const normalizeUrl = require("normalize-url");

const styles = theme => ({
  container: {
    padding: "26px",
    border: "1px solid #dadce0",
    maxWidth: "550px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8
    // padding: 0
  },
  title: {
    // fontFamily: "'Noto Sans Lao UI', sans-serif",
    fontWeight: "500",
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: 8,
    marginTop: 14
  }
});

const filesize = require("filesize");
class AddResearchFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      files: null,
      error: false,
      errorMessage: "ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ",
      checked: false,
      checkedError: false,
      insertLink: false,
      link: "",
      linkPreview: null,
      
    };
    this.timeout = null
  }

  componentDidMount() {
    //   this.props.switchPage('details')

    console.log();
  }

  handleCheckBox = event => {
    this.setState({ checked: event.target.checked });

    if (event.target.checked) {
      this.setState({ checkedError: false });
    } else {
      this.setState({ checkedError: true });
    }
  };

  validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  handleLinkTextFieldChange = event => {
    
    const link = event.target.value
    this.setState({ link });
// this is the search text
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (
        link.trim() !== "" &&
        this.validURL(normalizeUrl(link, { forceHttps: true }))
      ) {
        axios
          .get(
            `/api/research/get_metatags?url=${normalizeUrl(link, {
              forceHttps: true
            })}`
          )
          .then(response => {
            if (response.data !== []) {
              this.setState({
                linkPreview: response.data[0]
              });
            } else {
              this.setState({
                linkPreview: null
              });
            }
          });
  
        console.log(this.state.linkPreview);
      }
      console.log("running")
    }, 3000);
  };

  onDrop(files, isPrivate = false) {
    this.setState({
      uploading: true,
      checked: false
    });

    let formdata = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formdata.append("file", files[0]);

    if (files[0]) {
      axios
        .post("/api/research/upload_tmp_publication_file", formdata, config)
        .then(response => {
          if (response.data.success) {
            this.setState({
              files: [
                {
                  name: response.data.name,
                  location: response.data.location,
                  date: response.data.date,
                  mimetype: response.data.mimetype,
                  uploader: response.data.uploader,
                  size: response.data.size,
                  private: isPrivate
                }
              ],
              error: false,
              uploading: false
            });
            console.log(this.state.files);
          } else {
            console.log(response.data);
            this.setState({
              uploading: false,
              error: true,
              files: null,
              errorMessage: response.data.message
                ? response.data.message
                : "ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ"
            });
          }
        });
    } else {
      this.setState({
        uploading: false,
        error: true,
        files: null,
        errorMessage: "ບໍ່ສາມາດອັພໂຫລດຟາຍລ໌ນີ້ໄດ້"
      });
    }
  }

  removeFile = () => {
    this.setState({
      uploading: false,
      error: false,
      files: null,
      checked: false,
      checkedError: false
    });
  };

  renderLinkPreview = () => {
    try {
      if (
        this.state.link.trim() !== "" &&
        this.validURL(normalizeUrl(this.state.link, { forceHttps: true })) &&
        this.state.linkPreview
      )
        return (
          <a
            className="link-preview-contianer"
            href={normalizeUrl(this.state.link, { forceHttps: true })}
            title={this.state.linkPreview.title ? this.state.linkPreview.title : this.state.link}
            direction="rlt"
            media="image,logo"
          >
            <div className="link-icon" style={{backgroundImage: `url(${this.state.linkPreview.image ? this.state.linkPreview.image : this.state.linkPreview.favicon})`}}></div>
            <div className="link-preview-content">
              <header className="link-preview-header">
                <p title="Google" className="link-preview-title">
                  {this.state.linkPreview.title ? this.state.linkPreview.title : this.state.link}
                </p>
              </header>
              <div className="link-preview-description">
                <p
                  title={this.state.linkPreview.title}
                  className="link-preview-description-paragraph"
                >
                  {this.state.linkPreview.description ? this.state.linkPreview.description : null}
                </p>
              </div>
              <footer className="link-preview-footer">
                <p title={normalizeUrl(this.state.link, { forceHttps: true })} className="link-preview-footer-text">
                  {normalizeUrl(this.state.link, { forceHttps: true })}
                </p>
              </footer>
            </div>
          </a>
        );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  renderIcon = () => {
    switch (this.state.files[0].mimetype) {
      case "application/pdf": {
        return (
          <svg
            style={{ marginRight: "16px" }}
            fill="currentColor"
            height="35"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
          >
            <rect width="1000" height="1000" rx="118.4" fill="#f8393f" />
            <g fill="#fff">
              <path d="M517.36 334.8H390.6v330.4h126.76c49.78 0 90.5-40.74 90.5-90.53V425.33c0-49.8-40.73-90.53-90.5-90.53zm9.08 233.87a18.71 18.71 0 0 1-18.64 18.65H472V412.68h35.8a18.71 18.71 0 0 1 18.64 18.65zM255.66 334.8H111.8v217.3h143.87a73.62 73.62 0 0 0 73.4-73.41v-70.46a73.63 73.63 0 0 0-73.4-73.42zm-4.47 118.62a20.86 20.86 0 0 1-20.79 20.8h-40.74v-61.54h40.74a20.85 20.85 0 0 1 20.79 20.79z" />
              <path d="M111.8 529.36H194V665.2h-82.2zM665.68 334.8h82.2v330.4h-82.2z" />
              <path d="M665.7 417.02v-82.2h222.53v82.2zm-.02 135.08v-82.2H832.3v82.2z" />
            </g>
          </svg>
        );
      }
      case "application/msword": {
        return (
          <svg
            style={{ marginRight: "16px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="35"
            viewBox="0 0 1000 1000"
          >
            <rect width="1000" height="1000" rx="118.7" fill="#3789da" />
            <g fill="#fff">
              <path d="M397.37 750.24l-5.57 24.12h-96.83L166.7 218.8h107.97l122.7 531.45zM833.3 218.8L705.03 774.36H597.07L725.33 218.8H833.3z" />
              <path d="M520.07 218.8L391.8 774.36h-66.22L453.84 218.8h66.23z" />
              <path d="M660.56 774.36h-66.23L466.07 218.8h66.22l128.27 555.57z" />
            </g>
          </svg>
        );
      }
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        return (
          <svg
            style={{ marginRight: "16px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="35"
            viewBox="0 0 1000 1000"
          >
            <rect width="1000" height="1000" rx="118.7" fill="#3789da" />
            <g fill="#fff">
              <path d="M397.37 750.24l-5.57 24.12h-96.83L166.7 218.8h107.97l122.7 531.45zM833.3 218.8L705.03 774.36H597.07L725.33 218.8H833.3z" />
              <path d="M520.07 218.8L391.8 774.36h-66.22L453.84 218.8h66.23z" />
              <path d="M660.56 774.36h-66.23L466.07 218.8h66.22l128.27 555.57z" />
            </g>
          </svg>
        );
      }
      default: {
        return (
          <svg
            style={{ marginRight: "16px" }}
            fill="currentColor"
            height="35"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 796.6 1000"
          >
            <path
              d="M492.3 0H102.65C46.2 0 0 46.2 0 102.65v794.7C0 953.8 46.2 1000 102.65 1000H694c56.46 0 102.65-46.2 102.65-102.65v-593zm224.64 353.1H445.8V81.94h.68L716.94 352.4z"
              fill="#07d"
            />
            <path
              d="M716.94 352.4v.68H445.8V81.94h.68L716.94 352.4z"
              fill="#fff"
            />
          </svg>
        );
      }
    }
  };

  submit = async () => {
    if (this.state.checked && !this.state.error) {
      this.setState({ error: false, checkedError: false });

      // this.props.switchPage("details");
    } else if (!this.state.checked) {
      this.setState({ checkedError: true });
    } else {
      this.setState({ error: true, errorMessage: "ຂໍອະໄພເກີດຄວາມຜິດພາດ" });
    }
  };

  render() {
    const { classes } = this.props;
    const error = this.state.checkedError;

    return (
      <Grid
        container
        justify="center"
        spacing={0}
        style={{ marginTop: "24px" }}
      >
        <Grid item lg md sm xs />
        <Grid item lg={8} xl={8} md={8} sm={11} xs={11}>
          <Paper className={classes.container} elevation={0}>
            <div>
              <Grid container>
                <Grid item xs={12} align="center" style={{ marginTop: 8 }}>
                  <svg
                    width="54"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 657.69 854.52"
                  >
                    <defs>
                      <linearGradient
                        id="A"
                        x1="524.28"
                        x2="702.04"
                        y1="208.85"
                        y2="386.61"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-opacity=".1" offset=".04" />
                        <stop
                          stop-color="#e8eaed"
                          stop-opacity=".3"
                          offset="1"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M597.88 194.7a26 26 0 0 1 7.62 18.4V757a46.49 46.49 0 0 1-46.35 46.34H46.34A46.48 46.48 0 0 1 0 757V72.37A72.59 72.59 0 0 1 72.37 0h320a26 26 0 0 1 18.4 7.62z"
                      fill="#bcc1c6"
                    />
                    <path
                      d="M657.7 253.52v554.66a46.49 46.49 0 0 1-46.35 46.34H98.53a46.48 46.48 0 0 1-46.34-46.34V97.54a46.48 46.48 0 0 1 46.34-46.35h356.83z"
                      fill="#e5e8e9"
                    />
                    <path d="M204.04 415.96H506v36.8H204.04z" fill="#7f868b" />
                    <path
                      d="M657.7 253.52V431L479.92 253.2a29.45 29.45 0 0 0 4.23.31z"
                      fill="url(#A)"
                    />
                    <path
                      d="M657.7 253.52H484.15a29.45 29.45 0 0 1-4.23-.31 28.91 28.91 0 0 1-24.56-28.48V51.2z"
                      fill="#007bd7"
                    />
                    <path
                      d="M204.04 484.3H506v36.8H204.04zm0 68.34H506v36.8H204.04zm0 68.34h185.68v36.8H204.04z"
                      fill="#7f868b"
                    />
                  </svg>
                </Grid>
              </Grid>
              <Typography className={classes.title} variant="inherit">
                ເພີ່ມຜົນງານຄົ້ນຄວ້າ
              </Typography>

              <Typography
                variant="inherit"
                style={{ color: "#5f6368", textAlign: "center" }}
              >
                ທ່ານຕ້ອງການອັພໂຫລດຟາຍລ໌ເອກະສານ ຫລື ບໍ່?
              </Typography>
              {this.state.uploading ? (
                <Paper
                  style={{
                    boxShadow: "none",
                    border: "0",
                    marginTop: "16px",
                    padding: "16px",
                    background: "#f5f5f5"
                  }}
                >
                  <Grid container alignItems="center" justify="center">
                    <CircularProgress />
                  </Grid>
                </Paper>
              ) : (
                <>
                  {!this.state.files ? (
                    <>
                      <Dropzone
                        style={{ height: "100%", width: "100%" }}
                        onDrop={e => this.onDrop(e, false)}
                        multiple={false}
                        accept=".pdf,.docx,.doc"
                        maxSize={1073741824}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{
                            width: "100%",
                            marginTop: "24px",
                            textTransform: "none",
                            minHeight: "56px"
                          }}
                        >
                          <svg
                            fill="currentColor"
                            height="35"
                            viewBox="0 0 24 24"
                            width="35"
                            xmlns="https://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            style={{ marginRight: "16px" }}
                          >
                            <path d="M12,7c-2.48,0-4.5,2.02-4.5,4.5S9.52,16,12,16s4.5-2.02,4.5-4.5S14.48,7,12,7z M12,14.2c-1.49,0-2.7-1.21-2.7-2.7 c0-1.49,1.21-2.7,2.7-2.7s2.7,1.21,2.7,2.7C14.7,12.99,13.49,14.2,12,14.2z" />
                            <path d="M12,4C7,4,2.73,7.11,1,11.5C2.73,15.89,7,19,12,19s9.27-3.11,11-7.5C21.27,7.11,17,4,12,4z M12,17 c-3.79,0-7.17-2.13-8.82-5.5C4.83,8.13,8.21,6,12,6s7.17,2.13,8.82,5.5C19.17,14.87,15.79,17,12,17z" />
                            <path fill="none" d="M0,0h24v24H0V0z" />
                          </svg>

                          <Grid
                            container
                            alignItems="center"
                            alignContent="center"
                          >
                            <Grid item>
                              <Typography
                                variant="inherit"
                                style={{
                                  fontWeight: 500,
                                  fontSize: 16,
                                  textAlign: "left"
                                }}
                              >
                                ເພີ່ມຟາຍລ໌ສາທາລະນະ
                              </Typography>
                              <Typography
                                variant="inherit"
                                style={{
                                  fontWeight: "normal",
                                  fontSize: 12,
                                  textAlign: "left"
                                }}
                              >
                                ທຸກຄົນສາມາດເຂົ້າເຖິງຟາຍລ໌ຂອງທ່ານໄດ້
                              </Typography>
                            </Grid>
                          </Grid>
                        </Button>
                      </Dropzone>
                      <Dropzone
                        style={{ height: "100%", width: "100%" }}
                        onDrop={e => this.onDrop(e, true)}
                        multiple={false}
                        accept=".pdf,.docx,.doc"
                        maxSize={1073741824}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{
                            width: "100%",
                            marginTop: "16px",
                            textTransform: "none",
                            minHeight: "56px"
                          }}
                        >
                          <svg
                            fill="currentColor"
                            height="35"
                            viewBox="0 0 24 24"
                            width="35"
                            xmlns="https://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            style={{ marginRight: "16px" }}
                          >
                            <path d="M10.58,7.25l1.56,1.56c1.38,0.07,2.47,1.17,2.54,2.54l1.56,1.56C16.4,12.47,16.5,12,16.5,11.5C16.5,9.02,14.48,7,12,7 C11.5,7,11.03,7.1,10.58,7.25z" />
                            <path d="M12,6c3.79,0,7.17,2.13,8.82,5.5c-0.64,1.32-1.56,2.44-2.66,3.33l1.42,1.42c1.51-1.26,2.7-2.89,3.43-4.74 C21.27,7.11,17,4,12,4c-1.4,0-2.73,0.25-3.98,0.7L9.63,6.3C10.4,6.12,11.19,6,12,6z" />
                            <path d="M16.43,15.93l-1.25-1.25l-1.27-1.27l-3.82-3.82L8.82,8.32L7.57,7.07L6.09,5.59L3.31,2.81L1.89,4.22l2.53,2.53 C2.92,8.02,1.73,9.64,1,11.5C2.73,15.89,7,19,12,19c1.4,0,2.73-0.25,3.98-0.7l4.3,4.3l1.41-1.41l-3.78-3.78L16.43,15.93z M11.86,14.19c-1.38-0.07-2.47-1.17-2.54-2.54L11.86,14.19z M12,17c-3.79,0-7.17-2.13-8.82-5.5c0.64-1.32,1.56-2.44,2.66-3.33 l1.91,1.91C7.6,10.53,7.5,11,7.5,11.5c0,2.48,2.02,4.5,4.5,4.5c0.5,0,0.97-0.1,1.42-0.25l0.95,0.95C13.6,16.88,12.81,17,12,17z" />
                          </svg>

                          <Grid
                            container
                            alignItems="center"
                            alignContent="center"
                          >
                            <Grid item>
                              <Typography
                                variant="inherit"
                                style={{
                                  fontWeight: 500,
                                  fontSize: 16,
                                  textAlign: "left"
                                }}
                              >
                                ເພີ່ມຟາຍລ໌ສ່ວນຕົວ
                              </Typography>
                              <Typography
                                variant="inherit"
                                style={{
                                  fontWeight: "normal",
                                  fontSize: 12,
                                  textAlign: "left"
                                }}
                              >
                                ອະນຸຍາດການເຂົ້າເຖິງຟາຍລ໌ເມື່ອມີການຮ້ອງຂໍ
                              </Typography>
                            </Grid>
                          </Grid>
                        </Button>
                      </Dropzone>

                      <Button
                        variant="outlined"
                        color="primary"
                        style={{
                          width: "100%",
                          marginTop: "16px",
                          textTransform: "none",
                          minHeight: "56px"
                        }}
                        onClick={() => this.setState({ insertLink: true })}
                      >
                        <InsertLinkOutlined
                          style={{ marginRight: 16, fontSize: 35 }}
                        />

                        <Grid
                          container
                          alignItems="center"
                          alignContent="center"
                        >
                          <Grid item>
                            <Typography
                              variant="inherit"
                              style={{
                                fontWeight: 500,
                                fontSize: 16,
                                textAlign: "left"
                              }}
                            >
                              ເພີ່ມລີ້ງຜົນງານ
                            </Typography>
                            <Typography
                              variant="inherit"
                              style={{
                                fontWeight: "normal",
                                fontSize: 12,
                                textAlign: "left"
                              }}
                            >
                              ລີ້ງຂອງຜົນງານທີ່ທ່ານມີແລ້ວໃນເວັພໄຊທ໌ອື່ນ
                            </Typography>
                          </Grid>
                        </Grid>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Paper
                        style={{
                          boxShadow: "none",
                          border: "0",
                          marginTop: "16px",
                          padding: "16px",
                          background: "#f5f5f5"
                        }}
                      >
                        <Grid container alignItems="center">
                          <Grid item>
                            {this.state.files[0].mimetype
                              ? this.renderIcon()
                              : null}
                          </Grid>
                          <Grid item xs>
                            <Typography
                              variant="inherit"
                              style={{ fontWeight: 500, marginBottom: 4 }}
                            >
                              {this.state.files[0].name}
                            </Typography>
                            <Typography
                              variant="inherit"
                              style={{ fontSize: 14 }}
                            >
                              {filesize(
                                this.state.files[0].size,
                                { fullform: false },
                                { separator: "," }
                              )}{" "}
                              {" • "}{" "}
                              {this.state.files[0].private ? (
                                <Typography
                                  color="secondary"
                                  variant="inherit"
                                  style={{
                                    display: "inline",
                                    fontWeight: "500"
                                  }}
                                >
                                  <span>
                                    <svg
                                      viewBox="0 0 24 24"
                                      preserveAspectRatio="xMidYMid meet"
                                      focusable="false"
                                      fill="currentColor"
                                      className="small-publicity-icon"
                                    >
                                      <g>
                                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                                      </g>
                                    </svg>

                                    <span style={{ fontSize: 14 }}>
                                      ສ່ວນຕົວ
                                    </span>
                                  </span>
                                </Typography>
                              ) : (
                                <Typography
                                  variant="inherit"
                                  color="secondary"
                                  style={{ display: "inline", fontWeight: 500 }}
                                >
                                  <span>
                                    {" "}
                                    <svg
                                      viewBox="0 0 24 24"
                                      preserveAspectRatio="xMidYMid meet"
                                      focusable="false"
                                      fill="currentColor"
                                      className="small-publicity-icon"
                                    >
                                      <g>
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                                      </g>
                                    </svg>
                                  </span>
                                  <span style={{ fontSize: 14 }}>ສາທາລະນະ</span>
                                </Typography>
                              )}
                            </Typography>
                          </Grid>

                          <Grid item align="right">
                            <Tooltip title="ລຶບ">
                              <IconButton
                                disableRipple
                                disableTouchRipple
                                onClick={() => this.removeFile()}
                                style={{ marginLeft: 16, padding: 0 }}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Paper>
                    </>
                  )}
                </>
              )}

              {this.state.insertLink ? (
                <FormControl required error={this.state.checked} fullWidth>
                  <TextField
                    placeholder="ວາງລີ້ງຜົນງານຄົ້ນຄວ້າ"
                    value={this.state.link}
                    margin="normal"
                    onChange={event => this.handleLinkTextFieldChange(event)}
                    autoFocus
                    inputProps={{
                      maxLength: 1024,
                      shrink: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <InsertLinkOutlined />
                        </InputAdornment>
                      )
                    }}
                  />

                  {this.state.link.trim() !== ""
                    ? this.renderLinkPreview()
                    : null}
                </FormControl>
              ) : null}
              {this.state.files ? (
                <FormControl required error={error}>
                  <FormGroup row style={{ marginTop: 16 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.checked}
                          onChange={event => this.handleCheckBox(event)}
                          value=""
                          color="primary"
                          style={{
                            padding: 0,
                            marginRight: 8,
                            marginLeft: 14,
                            alignSelf: "flex-start"
                          }}
                        />
                      }
                      label={
                        !this.state.files[0].private ? (
                          <>
                            ຂ້າພະເຈົ້າໄດ້ກວດສອບ ແລະ
                            ຢືນຢັນວ່າເອກະສານທີ່ຂ້າພະເຈົ້າກຳລັງອັພໂຫລດນີ້
                            ແມ່ນຂ້າພະເຈົ້າມີສິດໃນການເຜຍແພ່ ແລະ
                            ແບ່ງປັນແຕ່ລະຟາຍລ໌ຢ່າງເປັນສາທາລະນະ, ຮວມທັງເຫັນດີນຳ{" "}
                            <Link> ເງື່ອນໄຂການອັບໂຫລດ</Link>.
                            {error ? (
                              <FormHelperText
                                style={{ fontWeight: "normal", marginTop: 0 }}
                              >
                                {" "}
                                <Error
                                  style={{
                                    fontSize: 16,
                                    marginRight: 4,
                                    position: "relative",
                                    top: 3,
                                    color: "currentColor"
                                  }}
                                />
                                ບໍ່ສາມາດວ່າງໄດ້
                              </FormHelperText>
                            ) : null}
                          </>
                        ) : (
                          <>
                            ຂ້າພະເຈົ້າໄດ້ກວດສອບ ແລະ
                            ຢືນຢັນວ່າເອກະສານທີ່ຂ້າພະເຈົ້າກຳລັງອັພໂຫລດນີ້
                            ແມ່ນຂ້າພະເຈົ້າມີສິດໃນຈັດເກັບແຕ່ລະຟາຍລ໌ເປັນການສ່ວນຕົວ
                            ແລະ ນໍາໃຊ້ໂດຍຂ້າພະເຈົ້າ ແລະ ຜູ້ຮ່ວມຂຽນ,
                            ຮວມທັງເຫັນດີນຳ
                            <Link> ເງື່ອນໄຂການອັບໂຫລດ</Link>.
                            {error ? (
                              <FormHelperText
                                style={{ fontWeight: "normal", marginTop: 0 }}
                              >
                                {" "}
                                <Error
                                  style={{
                                    fontSize: 16,
                                    marginRight: 4,
                                    position: "relative",
                                    top: 3,
                                    color: "currentColor"
                                  }}
                                />
                                ບໍ່ສາມາດວ່າງໄດ້
                              </FormHelperText>
                            ) : null}
                          </>
                        )
                      }
                    />
                  </FormGroup>
                </FormControl>
              ) : null}
              <Grid container alignItems="center" style={{ marginTop: 16 }}>
                <Grid
                  item
                  xs={12}
                  style={{ fontSize: 14, color: "rgba(0,0,0,0.65)" }}
                >
                  {!this.state.error ? (
                    <>ທ່າານສາມາດເພີ່ມລາຍລະອຽດກ່ຽວກັບວຽກໃນຂັ້ນຕອນຕໍ່ໄປ</>
                  ) : (
                    <div>
                      <Error
                        style={{
                          fontSize: 16,
                          marginRight: 4,
                          position: "relative",
                          top: 3,
                          color: "#d93025"
                        }}
                      />
                      <span style={{ fontSize: 14, color: "#d93025" }}>
                        {this.state.errorMessage}
                      </span>
                    </div>
                  )}
                </Grid>
                <Grid item xs md align="right" style={{ marginTop: 34 }}>
                  <Button>ຂ້າມ</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 8, boxShadow: "none" }}
                    onClick={() => this.submit()}
                    disabled={
                      this.state.uploading ||
                      this.state.files === null ||
                      this.state.error
                        ? true
                        : false
                    }
                  >
                    ອັພໂຫລດ
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </Grid>
        <Grid item lg md sm xs />
      </Grid>
    );
  }
}

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true })
  // withWidth(),
);

export default enhance(AddResearchFile);
