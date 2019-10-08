import React, { Component } from "react";
import compose from "recompose/compose";
import {
  withRouter
  // Link as ReactLink
} from "react-router-dom";
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

import { generateData, isFormValid } from "../utils/Form/formActions";

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
  Avatar
  // RadioGroup,
  // Radio
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
  ArrowDropDown,
  AddCircleOutline
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
    padding: 3.5,
    paddingRight: 8,
    minHeight: 40,
    paddingLeft: 14
  },
  selectOutlineInput: {
    paddingTop: 14,
    paddingBottom: 14
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
  },
  radioButtonLabel: {
    fontSize: 16
  },
  fileContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 18
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 18
    }
  },
  publishTypeContainer: {
    [theme.breakpoints.down("xs")]: {
      marginTop: 2
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 0
    }
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
  // length= this.state.multi.length
  const _id = new ObjectID();

  console.log(length);
  console.log(suggestions);
  if (event.target.value.trim() !== "" || length > 0) {
    suggestions[length] = {
      value: {
        _id: _id.toHexString(),
        name,
        lastname,
        email: null,
        notRegister: true
      },
      label: event.target.value
    };
  } else {
    delete suggestions[length - 1];
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
  console.log(props);
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? "600" : 500
        // maxHeight: 220
      }}
      {...props.innerProps}
    >
      <Grid container alignItems="center">
        {!props.data.value.notRegister ? (
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
        ) : null}
        <Grid item xs>
          <Grid container>
            <Grid item xs={12}>
              <Typography
                style={{ fontWeight: props.isFocused ? 500 : "normal" }}
              >
                {props.children}
              </Typography>
            </Grid>
            {props.data.affiliation ? (
              <Grid item xs={12}>
                <Typography
                  style={{
                    fontWeight: props.isFocused ? 500 : "normal",
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
        {!props.data.value.notRegister ? (
          <Grid
            item
            style={{
              width: 24,
              display: "flex",
              alignItems: "center",
              color: "black",
              opacity: ".54"
            }}
            align="right"
          >
            <AddCircleOutline />
          </Grid>
        ) : null}
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
  // console.log(props);
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
      onDelete={!props.data.isFixed ? props.removeProps.onClick : null}
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
      // style={{maxHeight: 220}}
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
class AddPublicationAdditionaDetails extends Component {
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
      checked: false,
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
        publicationType: {
          element: "radio",
          value: "",
          config: {
            name: "publish_type_input",
            type: "text",
            label: "ຕີພິມ"
            // labelWidth: 0,
            // options: []
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

    console.log(this.props.publishType);

    let multi = [];

    newFormdata["researchType"].value = this.props.researchType._id;
    newFormdata["publicationType"].value = this.props.publishType[0]._id;
    newFormdata["title"].value = this.props.files
      ? this.props.files[0].title
      : this.props.linkPreview
      ? this.props.linkPreview.title
      : "";

    newFormdata["researchType"].text = this.props.researchType.name;
    newFormdata["researchType"].config.options = this.props.publicationTypes;
    this.setState({
      files: this.props.files,
      linkPreview: this.props.linkPreview,
      link: this.props.link,
      formdata: newFormdata
    });

    if (this.props.linkPreview) {
      this.setState({ insertLink: true, checked: true });
    }
    if (this.props.files) {
      this.setState({ checked: true });
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
    length = suggestions.length;

    multi.push(suggestions.find(x => x.value === this.props.user._id));
    multi[0].isFixed = this.props.user.isAdmin ? false : true;

    // isFixed

    this.setState(
      {
        multi
      }
      // ()=>{
      //   console.log(suggestions.find(
      //     x => x.value === this.props.user._id
      //   ))
      //   console.log(this.props.user)
      //   console.log(suggestions)
      // }
    );
  }

  handleChange = name => (value, { action, removedValue }) => {
    console.log(removedValue);
    console.log(action);

    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      default:
        break;
    }

    // if (value.find(x => x.isFixed === true)) return
    this.setState(
      {
        [name]: value
      },
      () => {
        if (!this.state.multi) {
          this.setState({
            authorError: true,
            authorErrorMessage: "ຊ່ອງຜູ້ຂຽນວ່າງບໍ່ໄດ້"
          });
        } else {
          this.setState({
            authorError: false
          });
        }
      }
    );
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
        if (
          this.validDate(
            this.state.date.day,
            this.state.date.month,
            this.state.date.year
          )
        ) {
          newFormdata["valid"] = true;
        } else {
          newFormdata["valid"] = false;
        }
        this.setState({
          date: newFormdata
        });
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
        if (
          this.validDate(
            this.state.date.day,
            this.state.date.month,
            this.state.date.year
          )
        ) {
          newFormdata["valid"] = true;
        } else {
          newFormdata["valid"] = false;
        }
        this.setState({
          date: newFormdata
        });
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
        if (
          this.validDate(
            this.state.date.day,
            this.state.date.month,
            this.state.date.year
          )
        ) {
          newFormdata["valid"] = true;
        } else {
          newFormdata["valid"] = false;
        }
        this.setState({
          date: newFormdata
        });
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

  handleChangePublishTypeChange = event => {
    const newFormdata = {
      ...this.state.formdata
    };
    if (this.state.formdata.publicationType.validation.required) {
      newFormdata["publicationType"].valid = this.state.formdata.researchType.value
        ? true
        : false;
    }
    newFormdata["publicationType"].value = event.target.value;
    this.setState({ formdata: newFormdata });
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
    const link = event.target.value.trim().replace(" ", "");

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
                  this.setState({ formdata: newFormdata }, () => {
                    if (response.data[0].title) {
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
                      this.setState({ formdata: newFormdata });
                    }
                  });
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
              this.setState({ formdata: newFormdata }, () => {
                if (response.data.title) {
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
                  this.setState({ formdata: newFormdata });
                }
              });
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
          target="_blank"
          rel="noopener noreferrer"
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

  submit = () => {
    // event.preventDefault();
    console.log(this.state.error);
    if (this.state.linkPreview || this.state.files) {
      if (!this.state.checked) {
        this.setState({ checkedError: true });
      } else {
        this.setState({ checkedError: false });
      }
    }

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
      this.setState({ formdata: newFormdata });
    }
    let author = []

    if (this.state.multi) {
      this.setState({ authorError: false });
      author = this.state.multi.map(item => {
        return item.value;
      });
      console.log(author);
    } else {
      this.setState({ authorError: true });
    }

    let formIsValid = isFormValid(this.state.formdata, "addResearchDetails");

    if (
      !this.state.error &&
      formIsValid &&
      !this.state.checkedError &&
      !this.state.authorError &&
      this.state.date.valid
    ) {
      let dataToSubmit = generateData(
        this.state.formdata,
        "addResearchDetails"
      );

      const newDataToSubmit = { ...dataToSubmit };
      newDataToSubmit.date = { ...this.state.date };
      if (newDataToSubmit.date.month) {

        newDataToSubmit.date.month = parseInt(
          moment()
            .month(newDataToSubmit.date.month)
            .format("M")
        );
      }
      delete newDataToSubmit.date.valid;
      delete newDataToSubmit.date.date;
      newDataToSubmit.author = author
      if (this.state.files) {
        newDataToSubmit.files = {...this.state.files}
      }
      if (this.state.linkPreview) {
        newDataToSubmit.linkPreview = {...this.state.linkPreview}
      }
      console.log(newDataToSubmit);

      // this.setState({ error: false, checkedError: false });
      this.props.setPublicationDetails(newDataToSubmit, ()=> {

        this.props.switchPage("details");
      })

    } else {
      this.setState({
        error: true,
        errorMessage:
          "ຂໍອະໄພເກີດຄວາມຜິດພາດ, ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
      });
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

        // maxHeight: 220
      }),
      menuList: base => ({
        ...base,

        maxHeight: 200
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
                    input={
                      <OutlinedInput
                        inputProps={{
                          className: classes.selectOutlineInput
                        }}
                      />
                    }
                    style={{ padding: 0 }}
                    inputProps={{
                      maxLength: this.state.formdata.title.config.maxLength,
                      style: {
                        marginTop: -4.5,
                        marginBottom: -4.5
                      }
                    }}
                  />
                  {!this.state.formdata.title.valid ? (
                    <InputError message="ຕ້ອງມີອັກສອນຢ່າງຫນ້ອຍ 6 ຕົວ ແລະ ບໍ່ຫລາຍກວ່າ 500" />
                  ) : null}
                </FormControl>
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
                      // (this.state.files !== null ||
                      //   this.state.linkPreview !== null) &&
                      !this.state.error && !this.state.uploading ? false : true
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

AddPublicationAdditionaDetails.propTypes = {
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

export default enhance(AddPublicationAdditionaDetails);
