import React, { Component } from "react";
import compose from "recompose/compose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import classNames from "classnames";
import { ObjectID } from "bson";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import Shimmer from "react-js-loading-shimmer";

import InputError from "../utils/Form/input_error";
import { SERVER } from "../utils/misc";

// import dateExists from 'date-exists';

import "moment/locale/lo";

import moment from "moment";

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
  InputAdornment,
  Snackbar,
  SnackbarContent,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Avatar,
  InputBase,
  Input
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
  Error,
  PublicOutlined,
  // AccountCircleOutlined,
  AccountCircle,
  ArrowDropDown
} from "@material-ui/icons";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import NoSsr from "@material-ui/core/NoSsr";

const normalizeUrl = require("normalize-url");

moment.locale("lo");

const styles = theme => ({
  container: {
    padding: "26px",
    border: "1px solid #dadce0",
    maxWidth: "550px",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8
    // boxShadow: "0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)"
    // padding: 0
  },
  title: {
    // fontFamily: "'Noto Sans Lao UI', sans-serif",
    fontWeight: "500",
    textAlign: "center",
    fontSize: "1.36rem",
    marginBottom: 8,
    marginTop: 8
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  root: {
    flexGrow: 1,
    marginTop: 4
  },
  input: {
    display: "flex",
    padding: "8px",
    minHeight: 40,
    paddingLeft: 14
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
    left: 16,
    fontSize: 16,
    color: "black",
    opacity: 0.4
  },
  paper: {
    position: "absolute",
    zIndex: 20000,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    marginBottom: 24,
    borderRadius: 4
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

const filesize = require("filesize");
const parse = require("url-parse");

let suggestions = [];
let length = 0;
let dates = [];
let years = [];

for (let index = moment().year(); index >= 1940; index--) {
  years.push(index);
}

for (let index = 1; index <= 31; index++) {
  dates.push(index);
}
const NoOptionsMessage = props => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
      style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
    >
      ບໍ່ມີຂໍ້ມູນໃຫ້ເລືອກ, ກະລຸນາພິມສີ່ງທີ່ທ່ານຕ້ອງການຈະເພີ່ມ
    </Typography>
  );
};

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />;
};

const handleInputChanged = event => {
  var fullNameArr = event.target.value.split(/\s+/);
  let name = fullNameArr.slice(0, -1).join(" ");
  let lastname = fullNameArr.pop();

  const _id = new ObjectID();

  console.log(length)
  if (event.target.value.trim() !== "" || length > 0) {
    suggestions[length] = {
      value: { _id: _id.toHexString(), name, lastname, email: null,
        notRegister: true },
      label: event.target.value,
      
    };
  } else {
    if (suggestions) {
      delete suggestions[length]
    }
  }
};

const Control = props => {
  return (
    <TextField
      fullWidth
      onChange={event => {
        handleInputChanged(event);
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
};

const CaretDownIcon = () => {
  return <div>asdsadsa</div>;
};

const DropdownIndicator = props => {
  return <ArrowDropDown className="react-select-custom-dropdown" />;
  // return (
  //   <components.DropdownIndicator {...props}>
  //     <InsertLinkOutlined />
  //   </components.DropdownIndicator>
  // );
};

const Option = props => {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 700 : 500
      }}
      {...props.innerProps}
    >
      <Grid container>
        <Grid item style={{ width: 42 }}>
          {props.data.profileImage &&
          props.data.profileImage[0] &&
          props.data.profileImage[0].location ? (
            <Avatar
              alt="profile image"
              style={{
                width: 30,
                height: 30
              }}
              src={`${SERVER}${props.data.profileImage[0].location}`}
            />
          ) : (
            <Avatar
              style={{
                backgroundColor: "transparent",
                width: 30,
                height: 30
              }}
            >
              <AccountCircle
                style={{
                  width: 40,
                  height: 40,
                  color: "#9e9e9e",
                  backgroundColor: "#ececec"
                }}
              />
            </Avatar>
          )}
        </Grid>
        <Grid item xs>
          <Grid container>
            <Grid item xs={12}>
              <Typography style={{ fontWeight: 500 }}>
                {props.children}
              </Typography>
            </Grid>
            {props.data.affiliation ? (
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontWeight: "normal",
                    color: "rgb(104, 104, 104)",
                    fontSize: 12
                  }}
                >
                  {props.data.affiliation.department.name} {" • "}{" "}
                  {props.data.affiliation.faculty.name} {" • "}{" "}
                  {props.data.affiliation.institution.name}
                </Typography>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </MenuItem>
  );
};

const Placeholder = props => {
  return (
    <Typography
      // color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
      style={{ fontWeight: 400, color: "" }}
      disabled
    >
      {props.children}
    </Typography>
  );

  // return (
  //   <Input
  //       placeholder={props.children}
  //       disabled
  //       className={props.selectProps.classes.placeholder}
  //       {...props.innerProps}
  //     />
  // )
};

const SingleValue = props => {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const ValueContainer = props => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
};

const MultiValue = props => {
  console.log(props);
  return (
    <Chip
      tabIndex={-1}
      avatar={
        props.data.profileImage &&
        props.data.profileImage[0] &&
        props.data.profileImage[0].location ? (
          <Avatar
            alt="profile image"
            style={{
              marginLeft: 3,
              width: 26,
              height: 26
            }}
            src={`${SERVER}${props.data.profileImage[0].location}`}
          />
        ) : (
          <Avatar
            style={{
              backgroundColor: "transparent",
              marginLeft: 3,
              width: 26,
              height: 26
            }}
          >
            <AccountCircle
              style={{
                width: 30,
                height: 30,
                color: "#9e9e9e",
                backgroundColor: "#ececec"
              }}
            />
          </Avatar>
        )
      }
      label={<div style={{ fontWeight: 500 }}>{props.children}</div>}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      labelprop
      onDelete={props.removeProps.onClick}
      deleteIcon={<Cancel {...props.removeProps} />}
      variant="outlined"
    />
  );
};

const Menu = props => {
  return (
    <Paper
      square
      // style={{ position: "relative" }}
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
};

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator,
  CaretDownIcon,
  IndicatorSeparator: () => null
};
class AddPublicationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorError: false,
      authorErrorMessage: "",
      single: null,
      multi: null,
      multiForAdvisor: null,

      uploading: false,
      files: null,
      error: false,
      formError: false,
      errorMessage: "ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ",
      checked: true,
      checkedError: false,
      insertLink: false,
      link: "",
      linkPreview: null,
      loadingLink: false,
      disableUploadButtom: true,
      labelWidth: 0,
      formdata: {
        researchType: {
          element: "select",
          value: "",
          config: {
            name: "research_type_input",
            type: "text",
            label: "ປະເພດຜົນງານ",
            labelWidth: 0,
            options: []
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        title: {
          element: "input",
          value: "",
          label: "ຫົວຂໍ້",
          config: {
            name: "title_input",
            type: "text",
            // label: "ຫົວຂໍ້",
            // autoFocus: true,
            // placeholder: "ຊື່ຜົນງານ",
            multiline: true,
            rows: 2,
            maxLength: 500,
            minLength: 6
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        }
      },
      date: {
        day: moment().date(),
        month: moment().format("MMMM"),
        year: moment().year(),
        date: moment().year() + "-" + moment().month() + "-" + moment().date(),
        valid: true
      }
    };
    this.timeout = null;
  }

  componentDidUpdate(prevProps, prevState) {
    // let multi = [];
    // if (
    //   this.props &&
    //   this.props.other &&
    //   prevProps.other.value !== this.props.other
    // ) {
    //   multi[0] = {
    //     value: this.props.other.value,
    //     label: this.props.other.label
    //   };
    // } else {
    //   multi[0] = {
    //     value: this.props.user._id,
    //     label: `${this.props.user.name} ${this.props.user.lastname}`
    //   };
    // }

    // if (prevProps.authorSuggestions !== this.props.authorSuggestions) {
    //   console.log(this.props.authorSuggestions);
    // }
  }

  componentDidMount() {
    const newFormdata = {
      ...this.state.formdata
    };

    let multi = [];

    const month = moment()
      .month(this.state.date.month)
      .format("M");
    const date = this.state.date.year + "-" + month + "-" + this.state.date.day;

    console.log(moment(date).isValid());

    newFormdata["researchType"].value = this.props.publicationType._id;
    newFormdata["title"].value = this.props.files
      ? this.props.files[0].title
      : this.props.linkPreview
      ? this.props.linkPreview.title
      : "";

    newFormdata["researchType"].text = this.props.publicationType.name;
    newFormdata["researchType"].config.options = this.props.publicationTypes;
    this.setState({
      files: this.props.files,
      linkPreview: this.props.linkPreview,
      link: this.props.link,
      formdata: newFormdata
    });

    if (this.props.linkPreview) {
      this.setState({ insertLink: true });
    }

    this.props.authorSuggestions.map(value => {
      suggestions.push({
        value: value._id,
        label: `${value.name} ${value.lastname}`,
        profileImage: value.profileImage ? value.profileImage : null,
        affiliation: value.affiliation ? value.affiliation : null
      });
      return null;
    });
    // length = multi.length;

    multi.push(suggestions.find(
      x => x.value === this.props.user._id
    ))



    
    this.setState({
      multi
    }, 
    // ()=>{
    //   console.log(suggestions.find(
    //     x => x.value === this.props.user._id
    //   ))
    //   console.log(this.props.user)
    //   console.log(suggestions)
    // }
    );
  }

  handleChange = name => value => {
    console.log(value)
    this.setState({
      [name]: value
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ error: false });
  };

  handlePublicationTypeChange = event => {
    const newFormdata = {
      ...this.state.formdata
    };
    newFormdata["researchType"].value = event.target.value;
    newFormdata[
      "researchType"
    ].text = this.state.formdata.researchType.config.options.find(
      x => x._id === event.target.value
    )
      ? this.state.formdata.researchType.config.options.find(
          x => x._id === event.target.value
        ).name
      : "";
    this.setState({ formdata: newFormdata });
    if (this.state.formdata.researchType.validation.required) {
      const newFormdata = {
        ...this.state.formdata
      };
      newFormdata["researchType"].valid = this.state.formdata.researchType.value
        ? true
        : false;
      this.setState({ formdata: newFormdata });
    }
    // this.props.publicationTypes.find(x => x._id === event.target.value)
  };

  handleDayChange = event => {
    const newFormdata = {
      ...this.state.date
    };
    newFormdata["day"] = event.target.value;
    // this.setState({ date: newFormdata });
    this.setState(
      {
        date: newFormdata
      },
      () => {
       if (this.validDate(
        this.state.date.day,
        this.state.date.month,
        this.state.date.year
      )) {
        newFormdata["valid"] = true;
      } else {
        newFormdata["valid"] = false; 
      }
      this.setState({
        date: newFormdata
      })
      }
    );
  };
  handleMonthChange = event => {
    const newFormdata = {
      ...this.state.date
    };
    newFormdata["month"] = event.target.value;
    // console.log(moment().month(event.target.value).format("M"))
    // this.setState({ date: newFormdata });
    this.setState(
      {
        date: newFormdata
      },
      () => {
       if (this.validDate(
        this.state.date.day,
        this.state.date.month,
        this.state.date.year
      )) {
        newFormdata["valid"] = true;
      } else {
        newFormdata["valid"] = false; 
      }
      this.setState({
        date: newFormdata
      })
      }
    );
  };
  handleYearChange = event => {
    const newFormdata = {
      ...this.state.date
    };
    newFormdata["year"] = event.target.value;
    // this.setState({ date: newFormdata });
    this.setState(
      {
        date: newFormdata
      },
      () => {
       if (this.validDate(
        this.state.date.day,
        this.state.date.month,
        this.state.date.year
      )) {
        newFormdata["valid"] = true;
      } else {
        newFormdata["valid"] = false; 
      }
      this.setState({
        date: newFormdata
      })
      }
    );
  };

  handleTitleChange = event => {
    const newFormdata = {
      ...this.state.formdata
    };
    newFormdata["title"].value = event.target.value;

    this.setState({ formdata: newFormdata });
    if (this.state.formdata.title.validation.required) {
      const newFormdata = {
        ...this.state.formdata
      };
      if (
        this.state.formdata.title.value.trim().length <
          this.state.formdata.title.config.minLength ||
        this.state.formdata.title.value.trim().length >
          this.state.formdata.title.config.maxLength
      ) {
        newFormdata["title"].valid = false;
      } else {
        newFormdata["title"].valid = true;
      }
      // newFormdata["researchType"].valid = this.state.formdata.researchType.value
      //   ? true
      //   : false;
      this.setState({ formdata: newFormdata });
    }
    // this.props.publicationTypes.find(x => x._id === event.target.value)
  };

  handleTitleBlur = event => {
    if (this.state.formdata.title.validation.required) {
      const newFormdata = {
        ...this.state.formdata
      };
      if (
        this.state.formdata.title.value.trim().length <
          this.state.formdata.title.config.minLength ||
        this.state.formdata.title.value.trim().length >
          this.state.formdata.title.config.maxLength
      ) {
        newFormdata["title"].valid = false;
      } else {
        newFormdata["title"].valid = true;
      }
      // newFormdata["researchType"].valid = this.state.formdata.researchType.value
      //   ? true
      //   : false;
      this.setState({ formdata: newFormdata });
    }
  };
  handlePublicationTypeBlur = event => {
    if (this.state.formdata.researchType.validation.required) {
      const newFormdata = {
        ...this.state.formdata
      };
      newFormdata["researchType"].valid = this.state.formdata.researchType.value
        ? true
        : false;
      this.setState({ formdata: newFormdata });
    }
  };

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

  handleLinkTextFieldChange = async event => {
    const link = event.target.value.replace(" ", "");

    if (event.target.value !== this.state.link) {
      this.setState({ link, linkPreview: null, loadingLink: true });

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (
          link.trim() !== "" &&
          this.validURL(normalizeUrl(link, { forceHttps: false }))
        ) {
          axios
            .get(
              `/api/research/get_metatags?url=${normalizeUrl(link, {
                forceHttps: false
              })}`
            )
            .then(response => {
              console.log(response.data);
              if (response.data) {
                this.setState({
                  linkPreview: response.data[0],
                  loadingLink: false
                });
                if (this.state.formdata.title.value.trim() === "") {
                  const newFormdata = {
                    ...this.state.formdata
                  };
                  newFormdata["title"].value = response.data[0].title;
                  this.setState({ formdata: newFormdata });
                }
              } else {
                this.setState({
                  linkPreview: null,
                  loadingLink: false
                });
              }
            });

          console.log(this.state.linkPreview);
        }
        console.log("running");
      }, 1000);
    } else {
      this.setState({ loadingLink: false });
    }
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
                  private: isPrivate,
                  title: response.data.title,
                  numPages: response.data.numPages,
                  abstract: response.data.abstract
                }
              ],
              error: false,
              uploading: false
            });
            if (this.state.formdata.title.value.trim() === "") {
              const newFormdata = {
                ...this.state.formdata
              };
              newFormdata["title"].value = response.data.title;
              this.setState({ formdata: newFormdata });
            }

            console.log(this.state.files);
            console.log(response.data);
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

  cancelInsertingLink = () => {
    this.setState({
      uploading: false,
      error: false,
      files: null,
      checked: false,
      checkedError: false,
      insertLink: false,
      link: "",
      linkPreview: null,
      loadingLink: false
    });
  };

  renderLoadingLinkPreview = () => {
    return (
      <div
        className="link-preview-contianer-loading"
        direction="rlt"
        media="image,logo"
      >
        <div
          className="link-icon"
          style={{
            // backgroundImage: `url(${imageUrl}`,
            // backgroundSize: "cover"
            display: "inherit"
          }}
        >
          <Shimmer className="shimmer-full-height" />
        </div>

        <div className="link-preview-content">
          <header className="link-preview-header">
            <Shimmer className="shimmer-w-60" />
          </header>

          <div className="link-preview-description">
            <Shimmer className="shimmer-w-100-h-12" />
            <Shimmer className="shimmer-w-100-h-12" />
          </div>

          <footer className="link-preview-footer">
            <Shimmer className="shimmer-w-30-h-8 " />
          </footer>
        </div>
      </div>
    );
  };

  renderLinkPreview = () => {
    let imageUrl = "";
    let faviconUrl = "";

    if (this.state.linkPreview) {
      if (this.state.linkPreview.image) {
        if (
          this.state.linkPreview.image.startsWith("/") &&
          !this.state.linkPreview.image.startsWith("//")
        ) {
          imageUrl =
            normalizeUrl(parse(this.state.linkPreview.url, true).hostname, {
              forceHttps: false
            }) + this.state.linkPreview.image;
        } else if (this.state.linkPreview.image.startsWith("//")) {
          imageUrl = this.state.linkPreview.image.replace("//", "");
        } else {
          imageUrl = this.state.linkPreview.image;
        }
      }

      if (this.state.linkPreview.favicon) {
        if (
          this.state.linkPreview.favicon.startsWith("/") &&
          !this.state.linkPreview.favicon.startsWith("//")
        ) {
          faviconUrl =
            normalizeUrl(parse(this.state.linkPreview.url, true).hostname, {
              forceHttps: false
            }) + this.state.linkPreview.favicon;
        } else if (this.state.linkPreview.favicon.startsWith("//")) {
          faviconUrl = normalizeUrl(
            this.state.linkPreview.favicon.replace("//", ""),
            { forceHttps: false }
          );
        } else {
          faviconUrl = this.state.linkPreview.favicon;
        }
      }
    }

    if (
      this.state.link.trim() !== "" &&
      this.validURL(normalizeUrl(this.state.link, { forceHttps: false })) &&
      this.state.linkPreview
    )
      return (
        <a
          className="link-preview-contianer"
          href={normalizeUrl(this.state.link, { forceHttps: false })}
          title={
            this.state.linkPreview.title
              ? this.state.linkPreview.title
              : this.state.link
          }
          direction="rlt"
          media="image,logo"
        >
          {this.state.linkPreview.image ? (
            <div
              className="link-icon"
              style={{
                backgroundImage: `url(${imageUrl}`,
                backgroundSize: "cover"
              }}
            ></div>
          ) : null}
          <div className="link-preview-content">
            <header className="link-preview-header">
              <p
                title={this.state.linkPreview.title}
                className="link-preview-title"
              >
                {this.state.linkPreview.title
                  ? this.state.linkPreview.title
                  : this.state.link}
              </p>
            </header>
            {this.state.linkPreview.description ? (
              <div className="link-preview-description">
                <p
                  title={this.state.linkPreview.description}
                  className="link-preview-description-paragraph"
                >
                  {this.state.linkPreview.description
                    ? this.state.linkPreview.description
                    : null}
                </p>
              </div>
            ) : null}

            <footer className="link-preview-footer">
              <span
                title={normalizeUrl(this.state.linkPreview.url, {
                  forceHttps: false
                })}
                className="link-preview-footer-text"
              >
                {this.state.linkPreview.favicon ? (
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      marginRight: 4,
                      position: "relative",
                      top: 3
                    }}
                  >
                    <img
                      style={{ width: 14, height: 14 }}
                      src={faviconUrl}
                      alt=""
                    />
                  </span>
                ) : (
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      marginRight: 4,
                      position: "relative",
                      top: 3
                    }}
                  >
                    <PublicOutlined style={{ fontSize: 14 }} />
                  </span>
                )}
                {parse(this.state.linkPreview.url, true).hostname}
              </span>
            </footer>
          </div>
        </a>
      );
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      loadingLink: false
    });
  }

  daysInMonth = (m, y) => {
    switch (m) {
      case 1:
        return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
      case 8:
      case 3:
      case 5:
      case 10:
        return 30;
      default:
        return 31;
    }
  };

  validDate = (day, month, year) => {
    const myMonth = (
      "0" +
      parseInt(
        moment()
          .month(month)
          .format("M")
      )
    ).slice(-2);
    const myDay = ("0" + day).slice(-2);
    const myDate = `${year}-${myMonth}-${myDay}`;
    if (day && month && year) {
      if (myDate === moment(myDate).format("YYYY-MM-DD")) {
        return true;
      } else {
        return false;
      }
    } else if (!day && month && year) return true;
    else if (day && !month && year) return false;
    else if (!year) return false;
    else if (!day && !month && year) return true;
    else return false;
  };

  

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
      console.log(this.state.multi)
    } else if (!this.state.checked) {
      this.setState({ checkedError: true });
    } else {
      this.setState({ error: true, errorMessage: "ຂໍອະໄພເກີດຄວາມຜິດພາດ" });
    }
  };

  render() {
    const { classes, className, theme } = this.props;
    const error = this.state.checkedError;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        }

        // padding: "16px"
      })
    };

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
            <form>
              <Grid container>
                <Grid item xs={12} align="center" style={{ marginTop: 8 }}>
                  <svg
                    width="46"
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
                {this.state.formdata.researchType.text
                  ? this.state.formdata.researchType.text + "ຂອງທ່ານ"
                  : "ຜົນງານຄົ້ນຄວ້າຂອງທ່ານ"}
              </Typography>

              <Grid container style={{ marginTop: 18, width: "100%" }}>
                <InputLabel
                  htmlFor={this.state.formdata.researchType.config.name}
                  error={!this.state.formdata.researchType.valid}
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {this.state.formdata.researchType.config.label}
                </InputLabel>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  style={{ marginTop: 4 }}
                >
                  <Select
                    error={!this.state.formdata.researchType.valid}
                    fullWidth
                    value={this.state.formdata.researchType.value}
                    onChange={this.handlePublicationTypeChange}
                    onBlur={this.handlePublicationTypeBlur}
                    style={{
                      fontFamily: "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                    }}
                    input={
                      <OutlinedInput
                        name={this.state.formdata.researchType.name}
                      />
                    }
                  >
                    <MenuItem
                      style={{
                        fontFamily:
                          "Noto Sans Lao UI, Roboto, Arial, sans-serif",
                        fontStyle: "italic",
                        color: "#424242"
                      }}
                      value=""
                    >
                      ກະລຸນາເລືອກ{this.state.formdata.researchType.config.label}
                    </MenuItem>
                    {this.state.formdata.researchType.config.options.map(
                      item => (
                        <MenuItem
                          style={{
                            fontFamily:
                              "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                          }}
                          key={item._id}
                          value={item._id}
                        >
                          {item.name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {!this.state.formdata.researchType.valid ? (
                    <InputError />
                  ) : null}
                </FormControl>
              </Grid>
              <div style={{ marginTop: 18 }}>
                <InputLabel style={{ fontSize: 14, fontWeight: 500 }}>
                  ຟາຍລ໌ (ບໍ່ໃສ່ກໍໄດ້)
                </InputLabel>

                {!this.state.insertLink ? (
                  <>
                    {this.state.uploading ? (
                      <Paper
                        style={{
                          boxShadow: "none",
                          border: "0",
                          marginTop: 4,
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
                            <Grid
                              container
                              spacing={8}
                              style={{ marginTop: 4 }}
                            >
                              <Grid item xs={4} style={{ paddingTop: 0 }}>
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
                                      textTransform: "none",
                                      height: "100%",
                                      overflowWrap: "break-word"
                                    }}
                                  >
                                    <Grid
                                      container
                                      alignContent="center"
                                      alignItems="flex-start"
                                    >
                                      <Grid item xs={12} style={{ height: 35 }}>
                                        <svg
                                          fill="currentColor"
                                          height="35"
                                          viewBox="0 0 24 24"
                                          width="35"
                                          xmlns="https://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M12,7c-2.48,0-4.5,2.02-4.5,4.5S9.52,16,12,16s4.5-2.02,4.5-4.5S14.48,7,12,7z M12,14.2c-1.49,0-2.7-1.21-2.7-2.7 c0-1.49,1.21-2.7,2.7-2.7s2.7,1.21,2.7,2.7C14.7,12.99,13.49,14.2,12,14.2z" />
                                          <path d="M12,4C7,4,2.73,7.11,1,11.5C2.73,15.89,7,19,12,19s9.27-3.11,11-7.5C21.27,7.11,17,4,12,4z M12,17 c-3.79,0-7.17-2.13-8.82-5.5C4.83,8.13,8.21,6,12,6s7.17,2.13,8.82,5.5C19.17,14.87,15.79,17,12,17z" />
                                          <path
                                            fill="none"
                                            d="M0,0h24v24H0V0z"
                                          />
                                        </svg>
                                      </Grid>

                                      <Grid item xs={12}>
                                        <Grid item>
                                          <Typography
                                            variant="inherit"
                                            style={{
                                              fontWeight: 500,
                                              fontSize: 16,
                                              textAlign: "center",
                                              lineHeight: "normal"
                                            }}
                                          >
                                            ເພີ່ມຟາຍລ໌ສາທາລະນະ
                                          </Typography>
                                          <Typography
                                            variant="inherit"
                                            style={{
                                              fontWeight: "normal",
                                              fontSize: 12,
                                              textAlign: "center",
                                              lineHeight: "normal"
                                            }}
                                          >
                                            ທຸກຄົນສາມາດເຂົ້າເຖິງຟາຍລ໌ຂອງທ່ານໄດ້
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Button>
                                </Dropzone>
                              </Grid>

                              <Grid item xs={4} style={{ paddingTop: 0 }}>
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
                                      textTransform: "none",
                                      height: "100%",
                                      overflowWrap: "break-word"
                                    }}
                                  >
                                    <Grid
                                      container
                                      alignContent="center"
                                      alignItems="flex-start"
                                    >
                                      <Grid item xs={12} style={{ height: 35 }}>
                                        <svg
                                          fill="currentColor"
                                          height="35"
                                          viewBox="0 0 24 24"
                                          width="35"
                                          xmlns="https://www.w3.org/2000/svg"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <path d="M10.58,7.25l1.56,1.56c1.38,0.07,2.47,1.17,2.54,2.54l1.56,1.56C16.4,12.47,16.5,12,16.5,11.5C16.5,9.02,14.48,7,12,7 C11.5,7,11.03,7.1,10.58,7.25z" />
                                          <path d="M12,6c3.79,0,7.17,2.13,8.82,5.5c-0.64,1.32-1.56,2.44-2.66,3.33l1.42,1.42c1.51-1.26,2.7-2.89,3.43-4.74 C21.27,7.11,17,4,12,4c-1.4,0-2.73,0.25-3.98,0.7L9.63,6.3C10.4,6.12,11.19,6,12,6z" />
                                          <path d="M16.43,15.93l-1.25-1.25l-1.27-1.27l-3.82-3.82L8.82,8.32L7.57,7.07L6.09,5.59L3.31,2.81L1.89,4.22l2.53,2.53 C2.92,8.02,1.73,9.64,1,11.5C2.73,15.89,7,19,12,19c1.4,0,2.73-0.25,3.98-0.7l4.3,4.3l1.41-1.41l-3.78-3.78L16.43,15.93z M11.86,14.19c-1.38-0.07-2.47-1.17-2.54-2.54L11.86,14.19z M12,17c-3.79,0-7.17-2.13-8.82-5.5c0.64-1.32,1.56-2.44,2.66-3.33 l1.91,1.91C7.6,10.53,7.5,11,7.5,11.5c0,2.48,2.02,4.5,4.5,4.5c0.5,0,0.97-0.1,1.42-0.25l0.95,0.95C13.6,16.88,12.81,17,12,17z" />
                                        </svg>
                                      </Grid>

                                      <Grid item xs={12}>
                                        <Typography
                                          variant="inherit"
                                          style={{
                                            fontWeight: 500,
                                            fontSize: 16,
                                            textAlign: "center",
                                            lineHeight: "normal"
                                          }}
                                        >
                                          ເພີ່ມຟາຍລ໌ສ່ວນຕົວ
                                        </Typography>
                                        <Typography
                                          variant="inherit"
                                          style={{
                                            fontWeight: "normal",
                                            fontSize: 12,
                                            textAlign: "center",
                                            lineHeight: "normal"
                                          }}
                                        >
                                          ອະນຸຍາດການເຂົ້າເຖິງຟາຍລ໌ເມື່ອມີການຮ້ອງຂໍ
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Button>
                                </Dropzone>
                              </Grid>

                              <Grid item xs={4} style={{ paddingTop: 0 }}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  style={{
                                    width: "100%",
                                    textTransform: "none",
                                    height: "100%",
                                    overflowWrap: "break-word"
                                  }}
                                  onClick={() =>
                                    this.setState({ insertLink: true })
                                  }
                                >
                                  <Grid
                                    container
                                    alignContent="center"
                                    alignItems="flex-start"
                                  >
                                    <Grid item xs={12} style={{ height: 35 }}>
                                      <InsertLinkOutlined
                                        style={{ fontSize: 35 }}
                                      />
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Typography
                                        variant="inherit"
                                        style={{
                                          fontWeight: 500,
                                          fontSize: 16,
                                          textAlign: "center",
                                          lineHeight: "normal"
                                        }}
                                      >
                                        ເພີ່ມລີ້ງຜົນງານ
                                      </Typography>
                                      <Typography
                                        variant="inherit"
                                        style={{
                                          fontWeight: "normal",
                                          fontSize: 12,
                                          textAlign: "center",
                                          lineHeight: "normal"
                                        }}
                                      >
                                        ລີ້ງຂອງຜົນງານທີ່ທ່ານມີແລ້ວໃນເວັພໄຊທ໌ອື່ນ
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Button>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Paper
                              style={{
                                boxShadow: "none",
                                border: "0",
                                marginTop: 4,
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
                                <Grid
                                  item
                                  xs
                                  style={{
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                  }}
                                >
                                  <div
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      fontWeight: 500,
                                      marginBottom: 4
                                    }}
                                  >
                                    {this.state.files[0].name}
                                  </div>
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
                                        style={{
                                          display: "inline",
                                          fontWeight: 500
                                        }}
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
                                        <span style={{ fontSize: 14 }}>
                                          ສາທາລະນະ
                                        </span>
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
                  </>
                ) : (
                  <>
                    {this.state.insertLink ? (
                      <FormControl error={this.state.checked} fullWidth>
                        <div
                          className="insert-link-textfield-container"
                          style={{ marginTop: 4, marginBottom: 8 }}
                        >
                          {
                            // <InputLabel >ລີ້ງຂອງຜົນງານຄົ້ນຄວ້າ</InputLabel>
                          }

                          <TextField
                            placeholder="ວາງລີ້ງຜົນງານຄົ້ນຄວ້າຂອງທ່ານເຊັ່ນໃນ Researchgate, Google Scholar ຯລຯ."
                            value={this.state.link}
                            // label="ລີ້ງຂອງຜົນງານຄົ້ນຄວ້າ"
                            margin="none"
                            onChange={event =>
                              this.handleLinkTextFieldChange(event)
                            }
                            autoFocus={this.state.link ? false : true}
                            inputProps={{
                              maxLength: 1024,
                              // shrink: true,
                              startAdornment: (
                                <InputAdornment position="start">
                                  <InsertLinkOutlined />
                                </InputAdornment>
                              )
                            }}
                            className="insert-link-textfield"
                          />
                          <div className="cancel-insert-link-button-container">
                            <Link
                              className="cancel-insert-link-button"
                              color="default"
                              onClick={() => this.cancelInsertingLink()}
                            >
                              ຍົກເລີກ
                            </Link>
                          </div>
                        </div>

                        {this.state.link.trim() !== ""
                          ? this.state.loadingLink
                            ? this.renderLoadingLinkPreview()
                            : this.renderLinkPreview()
                          : null}
                      </FormControl>
                    ) : null}
                  </>
                )}

                <div style={{ marginTop: 4 }}>
                  {this.state.files ? (
                    <FormControl
                      required
                      error={error}
                      style={{ marginTop: 4 }}
                    >
                      <FormGroup row>
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
                                ແບ່ງປັນແຕ່ລະຟາຍລ໌ຢ່າງເປັນສາທາລະນະ,
                                ຮວມທັງເຫັນດີນຳ <Link> ເງື່ອນໄຂການອັບໂຫລດ</Link>.
                                {error ? (
                                  <FormHelperText
                                    style={{
                                      fontWeight: "normal",
                                      marginTop: 0
                                    }}
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
                                    style={{
                                      fontWeight: "normal",
                                      marginTop: 0
                                    }}
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

                  {this.state.linkPreview ? (
                    <FormControl
                      required
                      error={error}
                      style={{ marginTop: 4 }}
                    >
                      <FormGroup row>
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
                            <>
                              ຂ້າພະເຈົ້າໄດ້ກວດສອບ ແລະ
                              ຢືນຢັນວ່າລິ້ງຂ້າພະເຈົ້າກຳລັງອັພໂຫລດນີ້
                              ແມ່ນຂ້າພະເຈົ້າມີສິດໃນການເຜຍແພ່ ແລະ ແບ່ງປັນ,
                              ຮວມທັງເຫັນດີນຳ <Link> ເງື່ອນໄຂການອັບໂຫລດ</Link>.
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
                          }
                        />
                      </FormGroup>
                    </FormControl>
                  ) : null}
                </div>
              </div>

              <Grid container style={{ marginTop: 18, width: "100%" }}>
                <InputLabel
                  htmlFor={this.state.formdata.title.config.name}
                  error={!this.state.formdata.title.valid}
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {this.state.formdata.title.label}
                </InputLabel>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  style={{ marginTop: 4 }}
                >
                  <TextField
                    {...this.state.formdata.title.config}
                    value={this.state.formdata.title.value}
                    placeholder={
                      this.state.formdata.researchType.text
                        ? "ພິມຫົວຂໍ້" +
                          this.state.formdata.researchType.text +
                          "ຂອງທ່ານ"
                        : "ພິມຫົວຂໍ້ຜົນງານຄົ້ນຄວ້າຂອງທ່ານ"
                    }
                    error={!this.state.formdata.title.valid}
                    onChange={this.handleTitleChange}
                    onBlur={this.handleTitleBlur}
                    // onBlur={event => change({ event, id, blur: true })}
                    // onChange={event => change({ event, id })}
                    margin="none"
                    variant="outlined"
                    inputProps={{
                      maxLength: this.state.formdata.title.config.maxLength
                    }}
                  />
                  {!this.state.formdata.title.valid ? (
                    <InputError message="ຕ້ອງມີອັກສອນຢ່າງຫນ້ອຍ 6 ຕົວ ແລະ ບໍ່ຫລາຍກວ່າ 500" />
                  ) : null}
                </FormControl>
              </Grid>
              <Grid container style={{ marginTop: 18 }}>
                <Grid item xs={12}>
                  <InputLabel
                    // htmlFor={this.state.formdata.title.config.name}
                    error={this.state.authorError}
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    ຜູ້ຂຽນ
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.root}>
                    <NoSsr>
                      <ReactSelect
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={{
                          // placeholder: "ກະລຸນາເລືອກຜູ້ຂຽນ",

                          // InputLabelProps: {
                          //   shrink: true
                          // },
                          error: this.state.authorError,
                          variant: "outlined"
                        }}
                        options={suggestions}
                        components={components}
                        value={this.state.multi}
                        onChange={this.handleChange("multi")}
                        placeholder="ກະລຸນາເລືອກຜູ້ຂຽນ"
                        isMulti
                        isClearable={false}
                      />
                    </NoSsr>
                  </div>
                  {this.state.authorError ? (
                    <InputError message={this.state.authorErrorMessage} />
                  ) : null}
                </Grid>
              </Grid>

              {this.state.authorError ? (
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
                      {this.state.authorErrorMessage}
                    </FormHelperText>
                  </Grid>
                </Grid>
              ) : null}

              <Grid container style={{ marginTop: 18 }}>
                <Grid item xs={12}>
                  <InputLabel
                    // htmlFor={this.state.formdata.title.config.name}
                    error={!this.state.date.valid}
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    ວັນທີ
                  </InputLabel>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={16}>
                    <Grid item xs={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className={classes.formControl}
                        style={{ marginTop: 4 }}
                        error={!this.state.date.valid}
                      >
                        <Select
                          fullWidth
                          value={this.state.date.day}
                          onChange={this.handleDayChange}
                          style={{
                            fontFamily:
                              "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                          }}
                          input={<OutlinedInput name="day-select" />}
                        >
                          <MenuItem
                            style={{
                              fontFamily:
                                "Noto Sans Lao UI, Roboto, Arial, sans-serif",
                              fontStyle: "italic",
                              color: "#424242"
                            }}
                            value=""
                          >
                            ວັນ (ບໍ່ໃສ່ກໍໄດ້)
                          </MenuItem>
                          {dates.map(item => (
                            <MenuItem
                              style={{
                                fontFamily:
                                  "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                              }}
                              key={item}
                              value={item}
                            >
                              {("0" + item).slice(-2)}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className={classes.formControl}
                        style={{ marginTop: 4 }}
                        error={!this.state.date.valid}
                      >
                        <Select
                          fullWidth
                          value={this.state.date.month}
                          onChange={this.handleMonthChange}
                          style={{
                            fontFamily:
                              "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                          }}
                          input={<OutlinedInput name="month_input" />}
                        >
                          <MenuItem
                            style={{
                              fontFamily:
                                "Noto Sans Lao UI, Roboto, Arial, sans-serif",
                              fontStyle: "italic",
                              color: "#424242"
                            }}
                            value=""
                          >
                            ເດືອນ (ບໍ່ໃສ່ກໍໄດ້)
                          </MenuItem>
                          {moment.months().map(item => (
                            <MenuItem
                              style={{
                                fontFamily:
                                  "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                              }}
                              key={item}
                              value={item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className={classes.formControl}
                        style={{ marginTop: 4 }}
                        error={!this.state.date.year || !this.state.date.valid}
                      >
                        <Select
                          fullWidth
                          value={this.state.date.year}
                          onChange={this.handleYearChange}
                          style={{
                            fontFamily:
                              "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                          }}
                          input={<OutlinedInput name="year_input" />}
                        >
                          <MenuItem
                            style={{
                              fontFamily:
                                "Noto Sans Lao UI, Roboto, Arial, sans-serif",
                              fontStyle: "italic",
                              color: "#424242"
                            }}
                            value=""
                          >
                            ປີ
                          </MenuItem>
                          {years.map(item => (
                            <MenuItem
                              style={{
                                fontFamily:
                                  "Noto Sans Lao UI, Roboto, Arial, sans-serif"
                              }}
                              key={item}
                              value={item}
                            >
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                        {!this.state.date.year ? (
                          <InputError />
                        ) : null}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {!this.state.date.valid && this.state.date.year ? (
                  <InputError message="ວັນທີບໍ່ຖືກຕ້ອງ"/>
                ) : null}
              </Grid>

              <Grid container alignItems="center" style={{ marginTop: 16 }}>
                <Grid
                  item
                  xs={12}
                  style={{ fontSize: 14, color: "rgba(0,0,0,0.65)" }}
                >
                  {
                    //   !this.state.error ? (
                    // ) : (
                    //   <div>
                    //     <Error
                    //       style={{
                    //         fontSize: 16,
                    //         marginRight: 4,
                    //         position: "relative",
                    //         top: 3,
                    //         color: "#d93025"
                    //       }}
                    //     />
                    //     <span style={{ fontSize: 14, color: "#d93025" }}>
                    //       {this.state.errorMessage}
                    //     </span>
                    //   </div>
                    // )
                  }
                </Grid>
                <Grid item xs md align="right" style={{ marginTop: 24 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 8, boxShadow: "none" }}
                    onClick={() => this.submit()}
                    disabled={
                      (this.state.files !== null ||
                        this.state.linkPreview !== null) &&
                      !this.state.error &&
                      !this.state.uploading
                        ? false
                        : true
                    }
                  >
                    ອັພໂຫລດ
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item lg md sm xs />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          variant="error"
          open={this.state.error}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classNames(classes["error"], className)}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar" className={classes.message}>
                <Error
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                {this.state.errorMessage}
              </span>
            }
          />
        </Snackbar>
      </Grid>
    );
  }
}

AddPublicationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.userData,
    research: state.research
  };
};

const enhance = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    null
  )
);

export default enhance(AddPublicationDetails);
