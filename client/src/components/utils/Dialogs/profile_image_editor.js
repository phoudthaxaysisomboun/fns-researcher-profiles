import React, { Component, PureComponent } from "react";

import { TEMP_SERVER } from "../../utils/misc";

import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";

import { withStyles } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";

import Dropzone from "react-dropzone";
import axios from "axios";

import ReactCrop from "react-image-crop";

import { ObjectID } from "bson";
// import { useDropzone } from "react-dropzone";

import moment from "moment";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields
} from "../../utils/Form/formActions";
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
  TextField,
  Chip,
  MenuItem,
  Paper,
  Avatar,
  CircularProgress
} from "@material-ui/core";

import { emphasize } from "@material-ui/core/styles/colorManipulator";

import {
  CloseOutlined,
  Cancel,
  DescriptionOutlined,
  AccountCircleOutlined
} from "@material-ui/icons";

import { getAuthorSuggestions } from "../../../actions/user_actions";

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
    // if (files[0]) {
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () =>
    //     this.setState({ src: reader.result })
    //   );
    //   reader.readAsDataURL(files[0]);
    //   console.log(this.state.src);
    // }


    this.setState({
      uploading: true
    });

    let formdata = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formdata.append("file", files[0]);

    axios
      .post("/api/users/upload_profile_image", formdata, config)
      .then(response => {
        if (response.data.success) {
          this.setState({
            src: `${TEMP_SERVER}${response.data.location}`,
            files: [{
              name: response.data.filename,
              location: response.data.location,
              date: moment().toDate(),
              uploader: this.props.user._id,
              size: files[0].size
            }],
            uploading: false,
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

  componentDidUpdate(prevProps, prevState) {}

  updateForm = element => {};

  submitForm = event => {
    console.log(this.statecroppedImageUrl)
  };

  render() {
    const { classes, theme } = this.props;
    const { crop, croppedImageUrl, src } = this.state;

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
                onClick={() => this.props.close()}
                style={{ padding: 0, margin: "8px", marginBottom: 0 }}
              >
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent style={{ padding: "24px", paddingTop: 0 }}>
          <form onSubmit={event => this.submitForm(event)}>
            <div>
              <input type="file" onChange={this.onSelectFile} />
            </div>
            <div className="profile-image-preview">
              {src && (
                <ReactCrop
                  src={src}
                  crop={crop}
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                  circularCrop={true}
                  crossorigin = "anonymous"
                />
              )}
            </div>
            {croppedImageUrl && (
              <img
              crossorigin="anonymous"
                alt="Crop"
                style={{ maxWidth: "100%"}}
                src={croppedImageUrl}
              />
            )}

            {this.state.files && this.state.files[0] ? (
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
                {this.state.uploading ? (
                  <>
                    <Grid
                      container
                      alignItems="center"
                      alignContent="center"
                      justify="center"
                    >
                      <Grid item justify="center">
                        <CircularProgress style={{ margin: "16px" }} />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <DescriptionOutlined style={{ marginRight: "16px" }} />
                    <Dropzone
                      style={{ height: "100%", width: "100%" }}
                      onDrop={e => this.onDrop(e)}
                      multiple={false}
                      accept=".jpeg,.jpg,.png"
                    >
                      <Grid container alignItems="center" alignContent="center">
                        <Grid item>
                          <Typography variant="inherit">
                            ແນບຟາຍລ໌ເອກະສານຕີພິມ
                          </Typography>
                        </Grid>
                      </Grid>
                    </Dropzone>
                  </>
                )}
              </Button>
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
            <Grid item align="right" style={{ marginTop: "24px" }}>
              <Button onClick={() => this.props.close()}>ຍົກເລີກ</Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "8px" }}
                onClick={event => this.submitForm(event)}
                type="submit"
              >
                ບັນທຶກ
              </Button>
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

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ProfileImageEditor)
);
