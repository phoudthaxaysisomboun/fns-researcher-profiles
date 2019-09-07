import React, { Component } from "react";



import { SERVER } from "../../utils/misc";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";

import { withRouter } from "react-router-dom";

import Dropzone from "react-dropzone";
import axios from "axios";

import ReactCrop from "react-image-crop";

import moment from "moment";

import {
  // FormControl,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  // Divider,
  DialogContent,
  FormHelperText,
  IconButton,
  Paper,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";

import { emphasize } from "@material-ui/core/styles/colorManipulator";

import { CloseOutlined, Cancel, DescriptionOutlined } from "@material-ui/icons";

import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "16px"
  },
  input: {
    display: "flex",
    padding: "8px"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 20000,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class ProfileImageEditor extends Component {
  constructor() {
    super();
    this.state = {
      src: null,
      croppedImageUrl: null,
      croppedImageBlob: null,
      crop: {
        unit: "%",
        width: 100,
        aspect: 1 / 1
      },
      uploading: false,
      files: {}
    };
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }

    console.log(e.target.files[0]);
  };


  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        this.setState({ croppedImageBlob: blob });
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  removeFile() {
    axios
      .post(
        `/api/research/remove_publication_file?filename=${this.state.files[0].name}`
      )
      .then(response => {
        if (response.data.success) {
          this.setState({
            files: [],
            uploading: false
          });
        }
      });
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

    axios
      .post("/api/users/upload_tmp_profile_image", formdata, config)
      .then(response => {
        if (response.data.success) {
          this.setState({
            src: `${SERVER}${response.data.location}`,
            files: [
              {
                name: response.data.filename,
                location: response.data.location,
                date: moment().toDate(),
                uploader: this.props.user._id,
                size: files[0].size
              }
            ],
            uploading: false
          });
        }
      });
  }

  handleChangeForAdvisor = name => value => {
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {}
  
  handleCancel() {
    this.props.close()
    let files = [];
    if (
      this.props.userDetail.profileImage &&
      this.props.userDetail.profileImage[0] &&
      this.props.userDetail.profileImage[0].location
    ) {
      files[0] = {
        name: this.props.userDetail.profileImage[0].location,
        location: this.props.userDetail.profileImage[0].location,
        date: this.props.userDetail.profileImage[0].date,
        uploader: this.props.userDetail.profileImage[0].uploader,
        size: this.props.userDetail.profileImage[0].size
      };
      this.setState({
        src:
          this.props.userDetail.profileImage[0] &&
          this.props.userDetail.profileImage[0].location
            ? `${SERVER}${this.props.userDetail.profileImage[0].location}`
            : null,
        files:
          this.props.userDetail.profileImage[0] &&
          this.props.userDetail.profileImage[0].location
            ? files
            : {}
      });
    }
  }
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.croppedImageUrl !== this.state.croppedImageUrl) {
      console.log(this.state.croppedImageUrl);
    }
    if (prevProps.userDetail !== this.props.userDetail) {
      console.log(this.props);
      let files = [];
      if (
        this.props.userDetail.profileImage &&
        this.props.userDetail.profileImage[0] &&
        this.props.userDetail.profileImage[0].location
      ) {
        files[0] = {
          name: this.props.userDetail.profileImage[0].location,
          location: this.props.userDetail.profileImage[0].location,
          date: this.props.userDetail.profileImage[0].date,
          uploader: this.props.userDetail.profileImage[0].uploader,
          size: this.props.userDetail.profileImage[0].size
        };
        this.setState({
          src:
            this.props.userDetail.profileImage[0] &&
            this.props.userDetail.profileImage[0].location
              ? `${SERVER}${this.props.userDetail.profileImage[0].location}`
              : null,
          files:
            this.props.userDetail.profileImage[0] &&
            this.props.userDetail.profileImage[0].location
              ? files
              : {}
        });
      }
    }
  }

  updateForm = element => {};

  clearImage = () => {
    this.setState({
      src: null,
      croppedImageUrl: null,
      croppedImageBlob: null,
    });
  }

  submitForm = event => {
    event.preventDefault();
    console.log(this.state);

    this.setState({
      uploading: true
    });

    if (this.state.src !== null) {
      var file = new File(
        [this.state.croppedImageBlob],
        this.state.files[0].name,
        { type: "content-type" }
      );
  
      let formdata = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" }
      };
      formdata.append("file", file);
      formdata.append("userId", this.props.user._id);
      console.log(formdata.file);
  
      axios
        .post(
          `/api/users/upload_profile_image?userId=${this.props.userDetail._id}&location=${this.props.userDetail.profileImage[0].location}`,
          formdata,
          config
        )
        .then(response => {
          if (response.data.success) {
            this.setState({
              // files: [
              //   {
              //     name: response.data.filename,
              //     location: response.data.location,
              //     date: moment().toDate(),
              //     uploader: this.props.user._id,
              //     size: file.size
              //   }
              // ],
              uploading: false
            });
            // this.props.history.push(`/profile/${this.props.userDetail._id}`);
            // location.reload();

            this.props.refreshProfileImage()
            this.props.close()
          }
        });
    } else {
      let url = ""
      if (this.props.userDetail.profileImage !== null) {
        url = `/api/users/upload_profile_image?userId=${this.props.userDetail._id}&action=remove&location=${this.props.userDetail.profileImage[0].location}`
      } else {
        url = `/api/users/upload_profile_image?userId=${this.props.userDetail._id}&action=remove`
      }
      axios
      .post(
        url
      )
      .then(response => {
        if (response.data.success) {
          this.setState({
            // files: [
            //   {
            //     name: response.data.filename,
            //     location: response.data.location,
            //     date: moment().toDate(),
            //     uploader: this.props.user._id,
            //     size: file.size
            //   }
            // ],
            uploading: false
          });
          this.props.history.push(`/profile/${this.props.userDetail._id}`);
        }
      });
    }

    
  };

  render() {
    // const { classes, theme } = this.props;
    const { crop, src } = this.state;

    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="max-width-dialog-title"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle style={{ padding: 0 }}>
          <Grid container>
            <Grid
              item
              xs={9}
              style={{
                padding: "24px",
                fontWeight: "500",
                fontFamily: "'Noto Sans Lao UI', sans serif"
              }}
            >
              <Typography variant="inherit">{`ເລືອກຮູບໂປຣຟາຍລ໌ຂອງທ່ານ`}</Typography>
            </Grid>
            <Grid item xs align="right" style={{ padding: "16px" }}>
              <IconButton
                onClick={() => this.handleCancel()}
                style={{ padding: 0, margin: "8px", marginBottom: 0 }}
              >
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent style={{ padding: "24px", paddingTop: 0 }}>
          <Typography variant="body1" style={{ fontSize: "1rem" }}>
            ຍ້າຍຮູບວົງມົນເພື່ອເລືອກສ່ວນຂອງຮູບທີ່ທ່ານຕ້ອງການໃຊ້. ຄລິກ ແລະ
            ລາກທີ່ມຸມຂອງກ່ອງເພື່ອປັບຂະໜາດຂອງວົງມົນ
          </Typography>
          <form onSubmit={event => this.submitForm(event)}>
            {
              //   <div>
              //   <input type="file" onChange={this.onSelectFile} />
              // </div>
            }
            {!this.state.uploading ? (
              <>
                <div className="profile-image-preview">
                  {src && (
                    <ReactCrop
                      src={src}
                      crop={crop}
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                      circularCrop={true}
                      crossorigin="anonymous"
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <Grid
                  container
                  alignItems="center"
                  className="profile-image-preview-uploading"
                >
                  <Grid item xs={12}>
                    <Typography>ກໍາລັງອັພໂຫລດ...</Typography>
                    <LinearProgress />
                  </Grid>
                </Grid>
              </>
            )}

            {
              //   croppedImageUrl && (
              //   <img
              //     crossorigin="anonymous"
              //     alt="Crop"
              //     style={{ maxWidth: "100%" }}
              //     src={croppedImageUrl}
              //   />
              // )
            }

            {// this.state.files && this.state.files[0]  ? (
            false ? (
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
                      <DescriptionOutlined style={{ marginRight: "16px" }} />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="inherit" style={{ fontWeight: 600 }}>
                        {this.state.files[0].name}
                      </Typography>
                      <Typography
                        variant="inherit"
                        style={{ fontSize: "12px" }}
                      >
                        {this.state.files[0].size} bytes
                      </Typography>
                    </Grid>

                    <Grid item align="right">
                      <IconButton
                        onClick={() => this.removeFile()}
                        style={{ padding: "4px" }}
                      >
                        <Cancel />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            ) : (
              <Grid
                container
                style={{ marginTop: "16px", marginBottom: "16px" }}
              >
                <Grid item xs={12}>
                  {this.state.uploading ? (
                    <>
                      <Button variant="outlined" color="primary" disabled>
                        <svg
                          style={{ marginRight: "8px" }}
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          className="upload-icon"
                        >
                          <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m4.41-7.59L11 7.83V16h2V7.83l2.59 2.59L17 9l-5-5-5 5 1.41 1.41z"></path>
                        </svg>
                        <Dropzone
                          style={{ height: "100%", width: "100%" }}
                          onDrop={e => this.onDrop(e)}
                          multiple={false}
                          accept=".jpeg,.jpg,.png"
                        >
                          ອັພໂຫລດຮູບ
                        </Dropzone>
                      </Button>
                      {
                        this.state.src ?
                        <Button style={{ marginLeft: "8px"}} disabled>
                        <svg
                          style={{ marginRight: "4px" }}
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          focusable="false"
                          class="a-s-fa-Ha-pa"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
                          <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
                        </svg>
                        ລຶບຮູບ
                      </Button> : null
                      }
                    </>
                  ) : (
                    <>
                      <Button variant="outlined" color="primary">
                        <svg
                          style={{ marginRight: "4px" }}
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          className="upload-icon"
                        >
                          <path d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m4.41-7.59L11 7.83V16h2V7.83l2.59 2.59L17 9l-5-5-5 5 1.41 1.41z"></path>
                        </svg>
                        <Dropzone
                          style={{ height: "100%", width: "100%" }}
                          onDrop={e => this.onDrop(e)}
                          multiple={false}
                          accept=".jpeg,.jpg,.png"
                        >
                          ອັພໂຫລດຮູບ
                        </Dropzone>
                      </Button>
                      {
                        this.state.src ?
                        <Button style={{ marginLeft: "8px", color: "#f44336", borderColor: "#f44336" }} onClick={()=>{this.clearImage()}}>
                        <svg
                          style={{ marginRight: "4px" }}
                          width="18px"
                          height="18px"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          focusable="false"
                          class="a-s-fa-Ha-pa"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z" />
                          <path d="M9 8h2v9H9zm4 0h2v9h-2z" />
                        </svg>
                        ລຶບຮູບ
                      </Button>
                      : null
                      }
                    </>
                  )}
                </Grid>
              </Grid>
            )}

            {this.state.formError ? (
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <FormHelperText
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans serif",
                      fontWeight: "600",
                      marginBottom: "8px",
                      marginTop: "8px"
                    }}
                    error
                    id="component-error-text"
                  >
                    {this.state.formErrorMessage}
                  </FormHelperText>
                </Grid>
              </Grid>
            ) : null}
            <Typography variant="body1" style={{ color: "#707070" }}>
              ດ້ວຍການອັພໂຫລດ ແລະ ແບ່ງປັນເນື້ອຫານີ້,
              ທ່ານໄດ້ຢືນຢັນວ່າທ່ານເປັນເຈົ້າຂອງຂອງເນື້ອຫາ ແລະ
              ມີສິດທີ່ຈະເຮັດການກະທໍາດັ່ງກ່າວ.
            </Typography>
            <Grid item align="right" style={{ marginTop: "24px" }}>
              <Button onClick={() => this.handleCancel()}>ຍົກເລີກ</Button>
              {this.state.uploading ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                  disableRipple
                  disableFocusRipple
                  disableTouchRipple
                >
                  <CircularProgress size={24} color="#fff" />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                  onClick={event => this.submitForm(event)}
                  type="submit"
                >
                  ປ່ຽນຮູບໂປຣຟາຍລ໌
                </Button>
              )}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

ProfileImageEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.userData
  };
};

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
);

export default enhance(ProfileImageEditor);
