import React, { Component } from "react";
import compose from "recompose/compose";
import {
  withRouter
  // Link as ReactLink
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { ObjectID } from "bson";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import InputError from "../utils/Form/input_error";
import FormField from "../utils/Form/formfield";
import { SERVER } from "../utils/misc";

import { generateData, isFormValid, update } from "../utils/Form/formActions";
import { abstractList } from "../utils/misc";

import ReactSelect from "react-select";
import NoSsr from "@material-ui/core/NoSsr";

import "moment/locale/lo";

import moment from "moment";

import {
  Paper,
  Typography,
  Grid,
  Button,
  // FormControl,
  TextField,
  Snackbar,
  SnackbarContent,
  InputLabel,
  MenuItem,
  // OutlinedInput,
  Chip,
  Avatar
} from "@material-ui/core";

import {
  Cancel,
  Error,
  AccountCircle,
  ArrowDropDown,
  AddCircleOutline
} from "@material-ui/icons";
import { emphasize } from "@material-ui/core/styles/colorManipulator";

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

let suggestions = [];
let length = 0;

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
      publicationTypeName: "",
      authorError: false,
      authorErrorMessage: "",
      single: null,
      multi: null,
      error: false,
      formError: false,
      errorMessage: "ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ",
      hasSomeValue: false,
      formdata: {
        abstract: {
          element: "input_secondary",
          value: "",
          label: "ບົດຄັດຫຍໍ້",
          config: {
            name: "abstract_input",
            type: "text",
            placeholder: "ອະທິບາຍກ່ຽວກັບບົດຄົ້ນຄວ້າຂອງທ່ານ",
            autoFocus: true,
            multiline: true,
            rows: 5,
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        conferenceTitle: {
          element: "input_secondary",
          value: "",
          label: "ຊື່ງານປະຊຸມ",
          config: {
            name: "conference_title_input",
            type: "text",
            placeholder: "ຫົວຂໍ້ ຫລື ຊື່ຂອງງານປະຊຸມ",
            autoFocus: false
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        conferenceName: {
          element: "input_secondary",
          value: "",
          label: "ຊື່ງານ",
          config: {
            name: "conference_title_input",
            type: "text",
            placeholder: "ຫົວຂໍ້ ຫລື ຊື່ຂອງງານທີ່ທ່ານນໍາເອົາບົດນີ້ໄປນໍາສະເຫນີ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        location: {
          element: "input_secondary",
          value: "",
          label: "ສະຖານທີ່",
          config: {
            name: "location_input",
            type: "text",
            placeholder: "ທີ່ຕັ້ງຂອງສະຖານທີ່ຈັດງານ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        journalName: {
          element: "input_secondary",
          value: "",
          label: "ຊື່ວາລະສານ",
          config: {
            name: "journal_input",
            type: "text",
            placeholder: "ພິມຊື່ວາລະສານ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },

        volume: {
          element: "input_secondary",
          value: "",
          label: "ເຫລັ້ມ",
          config: {
            name: "volume_input",
            type: "text",
            placeholder: "ພິມເຫລັ້ມ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        issue: {
          element: "input_secondary",
          value: "",
          label: "ສະບັບ",
          config: {
            name: "issue_input",
            type: "text",
            placeholder: "ພິມສະບັບ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        page: {
          element: "input_secondary",
          value: "",
          label: "ຫນ້າ",
          config: {
            name: "page_input",
            type: "text",
            placeholder: "ພິມຫນ້າ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        publisher: {
          element: "input_secondary",
          value: "",
          label: "",
          config: {
            name: "publisher_input",
            type: "text",
            placeholder: "ພິມສໍານັກພິມ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        editor: {
          element: "input_secondary",
          label: "ບັນນາທິການ",
          value: "",
          config: {
            name: "editor_input",
            type: "text",
            placeholder: "ພິມບັນນາທິການ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        edition: {
          element: "input_secondary",
          value: "",
          label: "ສະບັບ",
          config: {
            name: "edition_input",
            type: "text",
            placeholder: "ພິມສະບັບ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        institution: {
          element: "input_secondary",
          value: "",
          label: "ສະຖາບັນ",
          config: {
            name: "institution_input",
            type: "text",
            placeholder: "ພິມສະຖາບັນ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        degree: {
          element: "input_secondary",
          value: "",
          label: "ລະດັບການສຶກສາ",
          config: {
            name: "degree_input",
            type: "text",
            placeholder: "ພິມລະດັບການສຶກສ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        }
      }
    };
  }

  updateForm = element => {
    const newFormdata = update(
      element,
      this.state.formdata,
      "addAdditionalDetails"
    );
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  componentDidMount() {
    let multi = [];

    const publicationTypeName = this.props.research.researchType.filter(
      item => {
        return item._id === this.props.researchType;
      }
    );

    const newFormdata = {
      ...this.state.formdata
    };
    this.setState({ publicationTypeName: publicationTypeName[0].name }, () => {
      newFormdata["abstract"].config.placeholder = this.state.publicationTypeName ? `ອະທິບາຍກ່ຽວກັບ${this.state.publicationTypeName}ຂອງທ່ານ` : `ອະທິບາຍກ່ຽວກັບບົດຄົ້ນຄວ້າຂອງທ່ານ`;
      const isAbstract = abstractList.some((item) => {
        return item === this.props.researchType
      })

      newFormdata["abstract"].label = isAbstract ? "ບົດຄັດຫຍໍ້" : "ຄໍາອະທິບາຍ"
    });
    this.setState({ formdata: newFormdata });

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

    this.setState({
      multi
    });
  }

  handleChange = name => (value, { action, removedValue }) => {
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


  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      loadingLink: false
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.formdata !== this.state.formdata) {
      let dataToSubmit = generateData(
        this.state.formdata,
        "addAdditionalPublicationDetails"
      );
      let hasSomeValue = ""
      const newDataToSubmit = { ...dataToSubmit };
      for (let key in newDataToSubmit) {
        hasSomeValue += newDataToSubmit[key].trim() 
        if (hasSomeValue) {
          this.setState({hasSomeValue: true})
        } else {
          this.setState({hasSomeValue: false})
        }
      }
    }
  }


  handleSkip = () => {

  }

  submit = () => {
    // event.preventDefault();
    if (this.state.linkPreview || this.state.files) {
      if (!this.state.checked) {
        this.setState({ checkedError: true });
      } else {
        this.setState({ checkedError: false });
      }
    }

    let author = [];

    if (this.state.multi) {
      this.setState({ authorError: false });
      author = this.state.multi.map(item => {
        return item.value;
      });
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
        "addAdditionalPublicationDetails"
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
      newDataToSubmit.author = author;
      if (this.state.files) {
        newDataToSubmit.files = { ...this.state.files };
      }
      if (this.state.linkPreview) {
        newDataToSubmit.linkPreview = { ...this.state.linkPreview };
      }

      // this.setState({ error: false, checkedError: false });
      this.props.setPublicationDetails(newDataToSubmit, () => {
        this.props.switchPage("details");
      });
    } else {
      this.setState({
        error: true,
        errorMessage:
          "ຂໍອະໄພເກີດຄວາມຜິດພາດ, ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
      });
    }
  };

  renderFields = () => {
    switch (this.props.researchType) {
      // ບົດຄວາມ
      case "5cdb82bb27ba7c4214ef5776": {
        return (
          <>
          
          <Grid container s>
              <Grid item xs={12} style={{ marginTop: 18}}>
                <FormField
                  id={"journalName"}
                  formdata={this.state.formdata.journalName}
                  change={element => this.updateForm(element)}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 18}}>
                <FormField
                  id={"volume"}
                  formdata={this.state.formdata.volume}
                  change={element => this.updateForm(element)}
                 
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 18}}>
                <FormField
                  id={"page"}
                  formdata={this.state.formdata.page}
                  change={element => this.updateForm(element)}
                  maxlength={500}
                />
              </Grid>
            </Grid>
          </>
        );
      }
      // ເອກະສານການປະຊຸມທາງວິຊາການ
      case "5d0516e447c496528476ec94": {
        return (
          <Grid container>
          <Grid item xs={12} style={{ marginTop: 18}}>
            <FormField
              id={"conferenceTitle"}
              formdata={this.state.formdata.conferenceTitle}
              change={element => this.updateForm(element)}
              maxlength={500}
            /></Grid>
            <Grid item xs={12} style={{ marginTop: 18}}>
            <FormField
              id={"location"}
              formdata={this.state.formdata.location}
              change={element => this.updateForm(element)}
              maxlength={500}
            /></Grid>
          </Grid>
        );
      }
      // ເອກະສານການປະຊຸມທາງວິຊາການ
      case "5d035867f7c01c535c182950": {
        return (
          <Grid container >
          <Grid item xs={12} style={{ marginTop: 18}}>
            <FormField
              id={"conferenceName"}
              formdata={this.state.formdata.conferenceName}
              change={element => this.updateForm(element)}
              maxlength={500}
            /></Grid>
            <Grid item xs={12} style={{ marginTop: 18}}>
            <FormField
              id={"location"}
              formdata={this.state.formdata.location}
              change={element => this.updateForm(element)}
              maxlength={500}
            /></Grid>
            <Grid item xs={12} style={{ marginTop: 18}}>
            <FormField
              id={"institution"}
              formdata={this.state.formdata.institution}
              change={element => this.updateForm(element)}
              maxlength={500}
            /></Grid>
          </Grid>
        );
      }
      // ປື້ມ
      case "5cdb830827ba7c4214ef5777": {
        return (
          <>
          <Grid container>
          <Grid item xs={12} style={{ marginTop: 18}}>
                <FormField
                  id={"publisher"}
                  formdata={this.state.formdata.publisher}
                  change={element => this.updateForm(element)}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 18}}>
                <FormField
                  id={"editor"}
                  formdata={this.state.formdata.editor}
                  change={element => this.updateForm(element)}
                  maxlength={500}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: 18}}>
                <FormField
                  id={"edition"}
                  formdata={this.state.formdata.edition}
                  change={element => this.updateForm(element)}
                  maxlength={500}
                />
              </Grid>
            </Grid>
          </>
        );
      }
      // ບົດສະເໜີໂຄງການ
      case "5cdb835b27ba7c4214ef5778": {
        return (
          <Grid container style={{ marginTop: 18 }}>
            <FormField
              id={"researchProposal"}
              formdata={this.state.formdata.institution}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
            {
              //   <FormField
              //   id={"location"}
              //   formdata={this.state.formdata.location}
              //   change={element => this.updateForm(element)}
              //   maxlength={500}
              // />
            }
          </Grid>
        );
      }
      // ບົດໂຄງການຈົບຊັ້ນ
      case "5cdb83a127ba7c4214ef5779": {
        return (
          <Grid container style={{ marginTop: 18 }}>
            <FormField
              id={"degree"}
              formdata={this.state.formdata.degree}
              change={element => this.updateForm(element)}
              maxlength={500}
            />

            {
              //   <FormField
              //   id={"location"}
              //   formdata={this.state.formdata.location}
              //   change={element => this.updateForm(element)}
              //   maxlength={500}
              // />
            }
          </Grid>
        );
      }
      default: {
        break;
      }
    }
  }

  render() {
    const { classes, className, theme } = this.props;

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
            <form onSubmit={event => this.submit(event)}>
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
                {this.state.publicationTypeName
                  ? this.state.publicationTypeName + "ຂອງທ່ານ"
                  : "ຜົນງານຄົ້ນຄວ້າຂອງທ່ານ"}
              </Typography>
              <Typography
                variant="inherit"
                style={{ color: "#5f6368", textAlign: "center" }}
              >
              {this.state.publicationTypeName
                ? "ເຮັດໃຫ້" + this.state.publicationTypeName + "ຂອງທ່ານສາມາດຄົ້ນພົບໄດ້ງ່າຍໂດຍການໃສ່ຂໍ້ມູນເພີ່ມຕື່ມ"
                : "ເຮັດໃຫ້ຜົນງານຄົ້ນຄວ້າຂອງທ່ານສາມາດຄົ້ນພົບໄດ້ງ່າຍໂດຍການໃສ່ຂໍ້ມູນເພີ່ມຕື່ມ"}
              </Typography>

              <Grid container style={{ marginTop: 18 }}>
                <Grid item xs={12}>
                  <FormField
                    id={"abstract"}
                    formdata={this.state.formdata.abstract}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              
              {this.renderFields()}

              {
                this.props.researchType === "5cdb83a127ba7c4214ef5779" ?
                <Grid container style={{ marginTop: 18 }}>
                <Grid item xs={12}>
                  <InputLabel
                    error={this.state.authorError}
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    ທີ່ປຶກສາ
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
                        placeholder="ກະລຸນາເລືອກທີ່ປຶກສາ"
                        isMulti
                        isClearable={false}
                        // styles={{control: customControlStyles}}
                      />
                    </NoSsr>
                  </div>
                  {this.state.authorError ? (
                    <InputError message={this.state.authorErrorMessage} />
                  ) : null}
                </Grid>
              </Grid> : null
              }

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
                <Button onClick={() => this.handleSkip()}>ຂ້າມ</Button>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: 8, boxShadow: "none" }}
                    onClick={() => this.submit()}
                    disabled={
                      this.state.hasSomeValue ? false : true
                    }
                  >
                    ເພີ່ມ
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
