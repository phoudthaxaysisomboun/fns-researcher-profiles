import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import {
  Paper,
  Typography,
  Grid,
  Button,
  FormControl,
  TextField,
  IconButton,
  CircularProgress, 
  Tooltip
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import {
  //   CloseOutlined,
  //   Cancel,
  //   DescriptionOutlined,
  //   AccountCircleOutlined,
  InsertLinkOutlined,
  // InfoOutlined,
  // Cancel,
  Error
} from "@material-ui/icons";

import axios from "axios";

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

const filesize = require("filesize")
class AddResearchFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      files: null,
      error: false,
      errorMessage: 'ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ'
    };
  }
  

  componentDidMount() {
    //   this.props.switchPage('details')
    
    const size = filesize.partial({standard: "iec"});
    console.log(size)
  }

  onDrop(files) {
    this.setState({
      uploading: true
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
                size: response.data.size
              }
            ],
            error: false,
            uploading: false
          });
          console.log(this.state.files);
        } else {
          console.log(response.data)
          this.setState({
            uploading: false,
            error: true,
            files: null,
            errorMessage: response.data.message ? response.data.message : "ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ"
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
    });
  }

  render() {
    const { classes } = this.props;

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
              {
                this.state.uploading ?
                <Paper
                style={{
                  boxShadow: "none",
                  border: "1px solid #d8d8d8",
                  marginTop: "16px",
                  padding: "16px"
                }}
              >
                <Grid container alignItems="center" justify="center">
                  <CircularProgress />
                </Grid>
              </Paper> : <>
              
              {!this.state.files ? (
                <>
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
                    <Dropzone
                      style={{ height: "100%", width: "100%" }}
                      onDrop={e => this.onDrop(e)}
                      multiple={false}
                      accept=".pdf,.docx,.doc"
                      maxSize = {1073741824}
                    >
                      <Grid container alignItems="center" alignContent="center">
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
                    </Dropzone>
                  </Button>
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
                    <Dropzone
                      style={{ height: "100%", width: "100%" }}
                      onDrop={e => this.onDrop(e)}
                      multiple={false}
                      accept=".pdf,.docx"
                    >
                      <Grid container alignItems="center" alignContent="center">
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
                    </Dropzone>
                  </Button>

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
                    <InsertLinkOutlined
                      style={{ marginRight: 16, fontSize: 35 }}
                    />
                    <Dropzone
                      style={{ height: "100%", width: "100%" }}
                      onDrop={e => this.onDrop(e)}
                      multiple={false}
                      accept=".pdf,.docx"
                    >
                      <Grid container alignItems="center" alignContent="center">
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
                    </Dropzone>
                  </Button>
                </>
              ) : (
                <>
                  <Paper
                    style={{
                      boxShadow: "none",
                      border: "1px solid #d8d8d8",
                      marginTop: "16px",
                      padding: "16px"
                    }}
                  >
                    <Grid container alignItems="center">
                      <Grid item>
                        <svg
                          width="35"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1000 1000"
                          style={{ marginRight: 16 }}
                        >
                          <rect
                            width="1000"
                            height="1000"
                            rx="118.7"
                            fill="#3789da"
                          />
                          <g fill="#fff">
                            <path d="M397.37 750.24l-5.57 24.12h-96.83L166.7 218.8h107.97l122.7 531.45zM833.3 218.8L705.03 774.36H597.07L725.33 218.8H833.3z" />
                            <path d="M520.07 218.8L391.8 774.36h-66.22L453.84 218.8h66.23z" />
                            <path d="M660.56 774.36h-66.23L466.07 218.8h66.22l128.27 555.57z" />
                          </g>
                        </svg>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          variant="inherit"
                          style={{ fontWeight: 500, marginBottom: 8 }}
                        >
                          {this.state.files[0].name}
                        </Typography>
                        <Typography
                          variant="inherit"
                          style={{ fontSize: "12px" }}
                        >
                        {filesize(this.state.files[0].size, { fullform: true}, {separator: ","})}
                        </Typography>
                      </Grid>

                      <Grid item align="right">
                      <Tooltip title="ລຶບ">
                        <IconButton
                          onClick={() => this.removeFile()}
                          style={{ marginLeft: 16 }}
                        >
                        <svg

                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        focusable="false"
                        class="a-s-fa-Ha-pa"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
                        <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
                      </svg>
                        </IconButton>
                        </Tooltip>
                        </Grid>
                    </Grid>
                  </Paper>
                </>
              )}
              </>
              }
             
              {false ? (
                <FormControl fullWidth>
                  <TextField
                    placeholder="ວາງລີ້ງຜົນງານຄົ້ນຄວ້າ"
                    value=""
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                      maxLength: 1024
                    }}
                  />
                </FormControl>
              ) : null}

              <Grid container alignItems="center" style={{ marginTop: 16 }}>
                <Grid
                  item
                  xs={12}
                  style={{ fontSize: 14, color: "rgba(0,0,0,0.65)" }}
                >
                {
                  !this.state.error ?
                  <>
                  
                  ທ່າານສາມາດເພີ່ມລາຍລະອຽດກ່ຽວກັບວຽກໃນຂັ້ນຕອນຕໍ່ໄປ
                  </> : 
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
                  <span style={{ fontSize: 14, color: "#d93025" }}>{this.state.errorMessage}</span>
                  
                  </div>

                }
                  
                </Grid>
                <Grid item xs md align="right" style={{ marginTop: 34 }}>
                  <Button>ຂ້າມ</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 8 }}
                    onClick={() => this.props.switchPage("details")}
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
