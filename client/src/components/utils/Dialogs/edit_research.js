import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";

import { withStyles } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";

import Dropzone from "react-dropzone";
import axios from "axios";

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
  FormControl,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  IconButton,
  TextField,
  Checkbox,
  Chip,
  MenuItem,
  Paper,
  Avatar,
  CircularProgress
} from "@material-ui/core";

import { emphasize } from "@material-ui/core/styles/colorManipulator";

import {
  CloseOutlined,
  Close,
  CancelOutlined,
  Cancel,
  DescriptionOutlined,
  AccountCircleOutlined
} from "@material-ui/icons";

import { getAuthorSuggestions } from "../../../actions/user_actions";
import {
  getResearchType,
  getPublicationType,
  addNewResearch
} from "../../../actions/research_actions";

import { connect } from "react-redux";

let suggestions = [];
let length = 0;

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

function NoOptionsMessage(props) {
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
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

const handleInputChanged = event => {
  var fullNameArr = event.target.value.split(/\s+/);
  let name = fullNameArr.slice(0, -1).join(" ");
  let lastname = fullNameArr.pop();

  const _id = new ObjectID();

  if (event.target.value.trim() !== "" || length > 0) {
    suggestions[length] = {
      value: { _id: _id.toHexString(), name, lastname },
      label: event.target.value
    };
  }
};

function Control(props) {
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
}

function Option(props) {
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
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      avatar={
        <Avatar style={{ backgroundColor: "transparent" }}>
          <AccountCircleOutlined />
        </Avatar>
      }
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<Cancel {...props.removeProps} />}
      variant="outlined"
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      style={{ position: "relative" }}
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

class EditResearch extends Component {
  constructor() {
    super();
    this.state = {
      authorError: false,
      authorErrorMessage: "",
      single: null,
      multi: null,
      multiForAdvisor: null,
      date: null,
      currentResearchType: "5cdb82bb27ba7c4214ef5776",
      formError: false,
      formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
      formSuccess: false,
      uploading: false,
      files: [],
      formdata: {
        title: {
          element: "input",
          value: "",
          config: {
            name: "title_input",
            type: "text",
            label: "ຫົວຂໍ້",
            autoFocus: true,
            placeholder: "ຊື່ຜົນງານ"
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ""
        },
        abstract: {
          element: "input",
          value: "",
          config: {
            name: "abstract_input",
            type: "text",
            label: "ບົດຄັດຍໍ່",

            placeholder: "ລາຍລະອຽດ ຫລື ຄໍາອະທິບາຍຜົນງານ",
            multiline: true,
            rows: 3
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ""
        },
        date: {
          element: "date",
          value: moment(Date.now()).format("YYYY-MM-DD"),
          config: {
            name: "date_of_birth_input",
            type: "date",
            label: "ວັນທີ(ຕີພິມ)"
          },
          validation: {
            required: true
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        researchType: {
          element: "select",
          value: "",
          config: {
            name: "research_type_input",
            type: "text",
            label: "ປະເພດຜົນງານ",
            labelWidth: 86,
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
          element: "select",
          value: "",
          config: {
            name: "publication_type_input",
            type: "text",
            label: "ປະເພດວາລະສານ",
            labelWidth: 96,
            options: []
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        conferenceTitle: {
          element: "input",
          value: "",
          config: {
            name: "conference_title_input",
            type: "text",
            label: "ຊື່ງານປະຊຸມ",
            placeholder: "ຫົວຂໍ້ ຫລື ຊື່ຂອງງານປະຊຸມ"
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        conferenceName: {
          element: "input",
          value: "",
          config: {
            name: "conference_title_input",
            type: "text",
            label: "ຊື່ງານ",
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
          element: "input",
          value: "",
          config: {
            name: "location_input",
            type: "text",
            label: "ສະຖານທີ່",
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
          element: "input",
          value: "",
          config: {
            name: "journal_input",
            type: "text",
            label: "ຊື່ວາລະສານ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },

        volume: {
          element: "input",
          value: "",
          config: {
            name: "volume_input",
            type: "text",
            label: "ເຫລັ້ມ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        issue: {
          element: "input",
          value: "",
          config: {
            name: "issue_input",
            type: "text",
            label: "ສະບັບ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        page: {
          element: "input",
          value: "",
          config: {
            name: "page_input",
            type: "text",
            label: "ຫນ້າ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        publisher: {
          element: "input",
          value: "",
          config: {
            name: "publisher_input",
            type: "text",
            label: "ສໍານັກພິມ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        editor: {
          element: "input",
          value: "",
          config: {
            name: "editor_input",
            type: "text",
            label: "ບັນນາທິການ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        edition: {
          element: "input",
          value: "",
          config: {
            name: "edition_input",
            type: "text",
            label: "ສະບັບ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        institution: {
          element: "input",
          value: "",
          config: {
            name: "institution_input",
            type: "text",
            label: "ສະຖາບັນ",
            placeholder: ""
          },
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          validationMessage: ""
        },
        degree: {
          element: "input",
          value: "",
          config: {
            name: "degree_input",
            type: "text",
            label: "ລະດັບການສຶກສາ",
            placeholder: ""
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

  removeFile() {
    // /api/research/remove_publication_file


    axios
      .post(`/api/research/remove_publication_file?filename=${this.state.files[0].name}`)
      .then(response => {
        console.log(response.data)
        if (response.data.success) {

          this.setState({
            files: [],
            uploading: false,
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
      .post("/api/research/upload_publication", formdata, config)
      .then(response => {
        if (response.data.success) {
          



          this.setState({
            files: [{
              name: response.data.filename,
              location: response.data.filename,
              date: moment().toDate(),
              uploader: this.props.user._id,
              size: files[0].size
            }],
            uploading: false,
         
           
          });
          
        }
      });
  }

  renderFields = () => {
    switch (this.state.currentResearchType) {
      // ບົດຄວາມ
      case "5cdb82bb27ba7c4214ef5776": {
        return (
          <>
            <Grid container>
              <Grid item xs={4} style={{ paddingRight: "8px" }}>
                <FormField
                  id={"journalName"}
                  formdata={this.state.formdata.journalName}
                  change={element => this.updateForm(element)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <FormField
                  id={"volume"}
                  formdata={this.state.formdata.volume}
                  change={element => this.updateForm(element)}
                 
                />
              </Grid>
              <Grid item xs={4} style={{ paddingLeft: "8px" }}>
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
          <>
            <FormField
              id={"conferenceTitle"}
              formdata={this.state.formdata.conferenceTitle}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
            <FormField
              id={"location"}
              formdata={this.state.formdata.location}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
          </>
        );
      }
      // ເອກະສານການປະຊຸມທາງວິຊາການ
      case "5d035867f7c01c535c182950": {
        return (
          <>
            <FormField
              id={"conferenceName"}
              formdata={this.state.formdata.conferenceName}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
            <FormField
              id={"location"}
              formdata={this.state.formdata.location}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
            <FormField
              id={"institution"}
              formdata={this.state.formdata.institution}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
          </>
        );
      }
      // ປື້ມ
      case "5cdb830827ba7c4214ef5777": {
        return (
          <>
            <Grid container>
              <Grid item xs={4} style={{ paddingRight: "8px" }}>
                <FormField
                  id={"publisher"}
                  formdata={this.state.formdata.publisher}
                  change={element => this.updateForm(element)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <FormField
                  id={"editor"}
                  formdata={this.state.formdata.editor}
                  change={element => this.updateForm(element)}
                  maxlength={500}
                />
              </Grid>
              <Grid item xs={4} style={{ paddingLeft: "8px" }}>
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
          <>
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
          </>
        );
      }
      // ບົດໂຄງການຈົບຊັ້ນ
      case "5cdb83a127ba7c4214ef5779": {
        return (
          <>
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
          </>
        );
      }
      default: {
        break;
      }
    }
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });

    
  };

  handleChangeForAdvisor = name => value => {
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.props.dispatch(getResearchType());

    this.props.dispatch(getPublicationType());

    this.props.dispatch(getAuthorSuggestions());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.research !== this.props.research) {
      const newFormdata = {
        ...this.state.formdata
      };
      newFormdata["researchType"].value = "5cdb82bb27ba7c4214ef5776";
      newFormdata["publicationType"].value = "5cdb90c8ae41ef71480b6e0d";
  
      this.setState({ formdata: newFormdata });
    }



    let multi = [];
    if (this.props && this.props.other && (prevProps.other.value !== this.props.other)) {
      console.log(this.props.other.value)
      multi[0] = {
        value: this.props.other.value,
        label: this.props.other.label
      };
    } else {
      multi[0] = {
        value: this.props.user._id,
        label: `${this.props.user.name} ${this.props.user.lastname}`
      };
    }
    
    if (prevProps.authorSuggestions !== this.props.authorSuggestions) {
      console.log(this.props)
      
      
      this.props.authorSuggestions.map(value => {
        suggestions.push({
          value: value._id,
          label: `${value.name} ${value.lastname}`
        });
        return null;
      });
      length = multi.length;
      this.setState({
        multi
      });
    }


    const prevResearchType =
      prevProps.research && prevProps.research.researchType
        ? prevProps.research.researchType
        : null;
    const currentResearchType =
      this.props.research && this.props.research.researchType
        ? this.props.research.researchType
        : null;
    if (
      currentResearchType !== null &&
      prevResearchType !== currentResearchType
    ) {
      const formdata = this.state.formdata;
      const newFormdata = populateOptionFields(
        formdata,
        this.props.research.researchType,
        "researchType"
      );
      this.updateFields(newFormdata);
    }

    const prevPublicationType =
      prevProps.research && prevProps.research.publicationType
        ? prevProps.research.publicationType
        : null;
    const currentPublicationType =
      this.props.research && this.props.research.publicationType
        ? this.props.research.publicationType
        : null;
    if (
      currentPublicationType !== null &&
      prevPublicationType !== currentPublicationType
    ) {
      const formdata = this.state.formdata;
      const newFormdata = populateOptionFields(
        formdata,
        this.props.research.publicationType,
        "publicationType"
      );
      this.updateFields(newFormdata);
      console.log(this.props.research);
    }

 

    const prevRTState = prevState.formdata.researchType.value;
    const curRTState = this.state.formdata.researchType.value;

    if (prevRTState !== curRTState && (curRTState && prevRTState) !== "") {
      this.setState({
        currentResearchType: curRTState
      });
      console.log(this.state);
    }
  }

  updateForm = element => {
    const newFormdata = update(
      element,
      this.state.formdata,
      "addResearchDialog"
    );
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  componentWillReceiveProps() {
    // const formdata2 = this.state.formdata;
    // const newFormdata2 = populateOptionFields(
    //     formdata2,
    //   this.props.research.publicationType,
    //   "publicationType"
    // );
    // this.updateFields(newFormdata2);
  }

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "addResearchDialog");

    let dataToSubmit = generateData(this.state.formdata, "addResearchDialog");

    const newDataToSubmit = {...dataToSubmit}

   

    const author = [];
    if (this.state.multi && (this.state.multi.length > 0)) {
      this.state.multi.map(value => {
        author.push(value.value);
        return null;
      });

      if (this.props.user.isAdmin) {
        newDataToSubmit["uploader"] = this.state.multi[0].value ? this.state.multi[0].value : this.props.user._id
      } else {
        newDataToSubmit["uploader"] = this.props.user._id
      }
    }




    
    if (this.state.files.length > 0) {
      newDataToSubmit["files"] = this.state.files
    }

    

    

    let hasAuthor = false 
    if (this.state.multi) {
      this.state.multi.map((value)=>{
        console.log(value.value)
        console.log(this.props.user._id)
        if (this.props.user.isAdmin || (value.value === this.props.user._id)) {
          return hasAuthor = true
        }
        else {
          return hasAuthor = false
        }
        
      })
    }

  

    if (!this.state.multi) {
      this.setState({
        authorError: true,
        authorErrorMessage: "ກະລຸນາຕື່ມນັກຄົ້ນຄວ້າ",
        // formError: true,
        // formErrorMessage: "ກະລຸນາຕື່ມນັກຄົ້ນຄວ້າ"
      })
      console.log(this.state.formError)

    } else if (!hasAuthor) {
      this.setState({
        authorError: true,
        authorErrorMessage: "ທ່ານສາມາດເພີ່ມຜົນງານການຄົ້ນຄວ້າທີ່ມີທ່ານເປັນເຈົ້າຂອງເທົ່ານັ້ນ",
        // formError: true,
        // formErrorMessage: "ທ່ານສາມາດເພີ່ມຜົນງານການຄົ້ນຄວ້າທີ່ມີທ່ານເປັນເຈົ້າຂອງເທົ່ານັ້ນ"
      })
      console.log(this.state.formError)

    } else {
      this.setState({
        authorError: false,
        authorErrorMessage: "",
        // formError: false,
        // formErrorMessage: ""
      })
      newDataToSubmit["author"] = author
   
    }

    console.log(this.state.multiForAdvisor)


    if (this.state.formdata.researchType.value === "5cdb83a127ba7c4214ef5779") {
      const supervisor = [];
      if (this.state.multiForAdvisor && (this.state.multiForAdvisor.length > 0)) {
        this.state.multiForAdvisor.map(value => {
          supervisor.push(value.value);
          return null;
        });

        console.log(supervisor)
  
      
      }
      newDataToSubmit["supervisor"] = supervisor
    }

    if (formIsValid && !this.state.formError && !this.state.authorError && hasAuthor) {

      console.log(newDataToSubmit)

      this.props.dispatch(addNewResearch(newDataToSubmit)).then((response) => {
        console.log(response)
        if (response.payload.success) {
          this.setState({
                    formError: false,
                    formSuccess: true
                  });

                  this.props.close()
        } else {
          this.setState({
                    formError: true,
                    formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້ (${response.payload.err})`
                  });
        }
      }).catch(e => {
            this.setState({
              formError: true,
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້ (${e})`
            });
          });

      console.log(newDataToSubmit)
      // this.props
      //   .dispatch(
      //     addResearchDialog(
      //       this.props.profile._id,
      //       institution,
      //       fieldOfStudy,
      //       degree,
      //       start,
      //       end,
      //       city,
      //       country,
      //     )
      //   )
      //   .then(response => {
      //     console.log(this.state.formdata);
      //     if (response.payload.success) {
      //       this.setState({
      //         formError: false,
      //         formSuccess: true
      //       });
      //       const newFormdata = {
      //         ...this.state.formdata
      //       };
      //       newFormdata["country"].value = "5cb447959c03a67fad711b7b";
      //       newFormdata["fieldOfStudy"].value = "";
      //       newFormdata["degree"].value = "";
      //       newFormdata["start"].value = "";
      //       newFormdata["end"].value = "";
      //       newFormdata["city"].value = "";
      //       newFormdata["institution"].value = "";
      //       this.setState({ formdata: newFormdata });
      //       this.props.close();
      //     } else {
      //       this.setState({
      //         formError: true,
      //         formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
      //       });
      //     }
      //   })
      //   .catch(e => {
      //     this.setState({
      //       formError: true,
      //       formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
      //     });
      //   });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
      });
    }
  };

  render() {
    const { classes, theme } = this.props;

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

    // const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    //   noKeyboard: true
    // });
    // const files = acceptedFiles.map(file => (
    //   <li key={file.path}>{file.path}</li>
    // ));

    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="max-width-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle style={{ padding: 0 }}>
          <Grid container>
            <Grid
              item
              xs={9}
              style={{
                padding: "24px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans Lao UI', sans serif"
              }}
            >
              <Typography variant="inherit">{`ແກ້ໄຂຜົນງານການຄົ້ນຄວ້າ`}</Typography>
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
            {
              //     <Grid container>
              //   <Grid item xs={6} style={{ paddingRight: "8px" }}>
              //     <FormField
              //       id={"city"}
              //       formdata={this.state.formdata.city}
              //       change={element => this.updateForm(element)}
              //       maxlength={500}
              //     />
              //   </Grid>
              //   <Grid item xs={6} style={{ paddingLeft: "8px" }}>
              //     <FormField
              //       labelWidth={this.state.formdata.country.config.labelWidth}
              //       id={"country"}
              //       formdata={this.state.formdata.country}
              //       change={element => this.updateForm(element)}
              //     />
              //   </Grid>
              // </Grid>
            }
            <FormField
              labelWidth={this.state.formdata.researchType.config.labelWidth}
              id={"researchType"}
              formdata={this.state.formdata.researchType}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"title"}
              formdata={this.state.formdata.title}
              change={element => this.updateForm(element)}
              maxlength={500}
            />

            <Grid container>
              <Grid item xs={6} style={{ paddingRight: "8px" }}>
                <FormField
                  labelWidth={
                    this.state.formdata.publicationType.config.labelWidth
                  }
                  id={"publicationType"}
                  formdata={this.state.formdata.publicationType}
                  change={element => this.updateForm(element)}
                />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: "8px" }}>
                <FormField
                  id={"date"}
                  formdata={this.state.formdata.date}
                  change={element => this.updateForm(element)}
                  maxlength={500}
                />
              </Grid>
            </Grid>

            <div className={classes.root}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  textFieldProps={{
                    label: "ນັກຄົ້ນຄວ້າ",
                    InputLabelProps: {
                      shrink: true
                    },
                    variant: "outlined"
                  }}
                  options={suggestions}
                  components={components}
                  value={this.state.multi}
                  onChange={this.handleChange("multi")}
                  placeholder=""
                  isMulti
                />
              </NoSsr>
            </div>

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
{
  console.log(this.state.files)
}
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
                      <IconButton onClick={() => this.removeFile()} style={{ padding: "4px" }}>
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
                {this.state.uploading  ? (
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
                      accept ='.pdf,.docx'
                      maxSize= {20971520}
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

            <FormField
              id={"abstract"}
              formdata={this.state.formdata.abstract}
              change={element => this.updateForm(element)}
            />

            {this.renderFields()}

            {this.state.formdata.researchType.value ===
            "5cdb83a127ba7c4214ef5779" ? (
              <div className={classes.root}>
                <NoSsr>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    textFieldProps={{
                      label: "ທີ່ປຶກສາ",
                      InputLabelProps: {
                        shrink: true
                      },
                      variant: "outlined"
                    }}
                    options={suggestions}
                    components={components}
                    value={this.state.multiForAdvisor}
                    onChange={this.handleChangeForAdvisor("multiForAdvisor")}
                    placeholder=""
                    isMulti
                  />
                </NoSsr>
              </div>
            ) : null}

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

EditResearch.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.userData,
    research: state.research
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(EditResearch)
);
