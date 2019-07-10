import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
import PropTypes from "prop-types";
import classNames from "classnames";
import Select from "react-select";

import { withStyles } from "@material-ui/core/styles";
import NoSsr from "@material-ui/core/NoSsr";

import Dropzone from "react-dropzone";
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
  Paper
} from "@material-ui/core";

import { emphasize } from "@material-ui/core/styles/colorManipulator";

import {
  CloseOutlined,
  CancelOutlined,
  DescriptionOutlined
} from "@material-ui/icons";

// import { getCountry } from "../../../actions/user_actions";
import {
  getResearchType,
  getPublicationType
} from "../../../actions/research_actions";

import { connect } from "react-redux";

const suggestions = [
  { label: "ພຸດທະໄຊ ສີສົມບູນ" },
  { label: "ສົມສັກ ອິນທະສອນ" },
  { label: "Nicolas Pasquier" },
  { label: "Andrea G. B. Tettamanzi" },
  { label: "Celia da Costa Pereira" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "16px",
    
  },
  input: {
    display: "flex",
    padding: 0
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
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
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
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelOutlined {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
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

class UpdateResearchArea extends Component {
  state = {
    single: null,
    multi: null,
    date: null,
    currentResearchType: "5cdb82bb27ba7c4214ef5776",
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
     
        
    }
  };


  

  handleChange = name => value => {
    this.setState({
      [name]: value
    });

    console.log(this.state.multi)
  };

  
  componentDidUpdate(prevProps, prevState) {
    let multi = []
    if (prevProps.researchArea !== this.props.researchArea) {
        this.props.researchArea.map((value)=>{
            multi.push({value: value, label: value})
            return null
        })
        this.setState({
            multi
          });
    }

    
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "addEducation");
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
    let formIsValid = isFormValid(this.state.formdata, "addEducation");

    if (formIsValid & !this.state.formError) {
      // this.props
      //   .dispatch(
      //     addEducation(
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
        },

        padding: "16px"
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
        onClose={() => this.props.close()}
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
                fontWeight: "bold",
                fontFamily: "'Noto Sans Lao UI', sans serif"
              }}
            >
              <Typography variant="inherit">{`ແກ້ໄຂຫົວຂໍ້ການຄົ້ນຄວ້າ`}</Typography>
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

            <div className={classes.root}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  textFieldProps={{
                    label: "ນັກຄົ້ນຄວ້າ",
                    InputLabelProps: {
                      shrink: true,
                     
                    },
                    variant: "outlined",
                    
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

UpdateResearchArea.propTypes = {
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
  withStyles(styles, { withTheme: true })(UpdateResearchArea)
);
