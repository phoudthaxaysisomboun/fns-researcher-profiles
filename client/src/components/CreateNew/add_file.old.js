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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  TextField,
  IconButton,
  CircularProgress, 
  LinearProgress,
  Tooltip
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  TextField
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import {
//   CloseOutlined,
//   Cancel,
//   DescriptionOutlined,
//   AccountCircleOutlined,
  InsertLinkOutlined,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  // InfoOutlined,
  // Cancel,
=======
  InfoOutlined,
  Cancel,
>>>>>>> parent of 3c2218a... fix webpack errors and add icons and file preview and validation
=======
  InfoOutlined,
  Cancel,
>>>>>>> parent of 3c2218a... fix webpack errors and add icons and file preview and validation
=======
  InfoOutlined,
  Cancel,
>>>>>>> parent of 3c2218a... fix webpack errors and add icons and file preview and validation
  Error
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
  InfoOutlined
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
} from "@material-ui/icons";

const styles = theme => ({
  container: {
    padding: "26px",
    border: "1px solid #dadce0",
    maxWidth: "580px",
    marginLeft: "auto",
    marginRight: "auto"
    // padding: 0
  },
  title: {
    // fontFamily: "'Noto Sans Lao UI', sans-serif",
    fontWeight: "500",
    // textAlign: "center",
    fontSize: "1.75rem",
    marginBottom: 24
  }
});
class AddResearchFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //   this.props.switchPage('details')
    console.log(this.props)
  }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

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
                uploader: this.props.user._id,
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
  removeFile =() => {
    this.setState({files: null})
  }
  

=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        justify="center"
        spacing={0}
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        <Grid item lg md sm xs />
        <Grid item lg={8} xl={8} md={8} sm={11} xs={11}>
          <Paper className={classes.container} elevation={0}>
            <div>
              <Typography className={classes.title} variant="inherit">
                ເພີ່ມຜົນງານຄົ້ນຄວ້າ
              </Typography>

              <Typography variant="inherit" style={{ color: "#5f6368" }}>
                ທ່ານຕ້ອງການອັພໂຫລດຟາຍລ໌ເອກະສານ ຫລື ບໍ່?
              </Typography>

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator

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
                <InsertLinkOutlined style={{ marginRight: 16, fontSize: 35 }} />
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
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
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
                        ລີ້ງຂອງຜົນງານທີ່ທ່ານມີແລ້ວໃນເວັພໄຊທ໌ອື່ນ
                      </Typography>
                    </Grid>
                  </Grid>
                </Dropzone>
              </Button>

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                {
                  !this.state.error ?
                  <>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  
=======
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
                  <InfoOutlined
=======
=======
>>>>>>> parent of 3c2218a... fix webpack errors and add icons and file preview and validation
=======
>>>>>>> parent of 3c2218a... fix webpack errors and add icons and file preview and validation
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
                  <InfoOutlined
                    style={{
                      fontSize: 16,
                      marginRight: 4,
                      position: "relative",
                      top: 3
                    }}
                  />
                  ທ່າານສາມາດເພີ່ມລາຍລະອຽດກ່ຽວກັບວຽກໃນຂັ້ນຕອນຕໍ່ໄປ
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                  </> : 
                  <div>
                  <Error
>>>>>>> parent of 3c2218a... fix webpack errors and add icons and file preview and validation
                    style={{
                      fontSize: 16,
                      marginRight: 4,
                      position: "relative",
                      top: 3
                    }}
                  />
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
                  ທ່າານສາມາດເພີ່ມລາຍລະອຽດກ່ຽວກັບວຽກໃນຂັ້ນຕອນຕໍ່ໄປ
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
=======
>>>>>>> parent of 723e19d... add file upload validation and loading indicator
                </Grid>
                <Grid item xs md align="right" style={{ marginTop: 34 }}>
                  <Button>ຂ້າມ</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 8 }}
                    onClick={() => this.props.switchPage("details")}
                  >
                    <svg
                      style={{ marginRight: "8px" }}
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      className="upload-icon"
                    >
                      <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m4.41-7.59L11 7.83V16h2V7.83l2.59 2.59L17 9l-5-5-5 5 1.41 1.41z"></path>
                    </svg>
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
