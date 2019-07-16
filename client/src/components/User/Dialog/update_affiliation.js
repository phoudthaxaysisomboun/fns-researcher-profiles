import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
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
  Checkbox
} from "@material-ui/core";

import { CloseOutlined } from "@material-ui/icons";

import { updateProfileDescription, getCountry, updateAffiliation, getDegrees, getDepartments } from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateAffiliationDialog extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
        department: {
            element: "select",
            value: "",
            config: {
              label: "ພາກວິຊາ",
              name: "department_select",
              options: [],
              labelWidth: 50
            },
            validation: {
              required: true
            },
            valid: true,
            touched: false,
            validationMessage: "",
            showlabel: true
          },
          position: {
            element: "input",
            value: "",
            config: {
              label: "ຕໍາແຫນ່ງ",
              placeholder: "ນັກຮຽນ, ອາຈານ, ຫົວຫນ້າພາກ",
              name: "position_input",
              type: "text"
            },
            validation: {
              required: true
            },
            valid: true,
            touched: false,
            validationMessage: ""
          }
      }
    }
 

  componentDidMount() {
    this.props.dispatch(getDepartments()).then(response => {
    });

  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.userData !== this.props.userData) {

        console.log(this.props)
        

        const newFormData = {...this.state.formdata}
        
        newFormData["department"].value = this.props.userData.affiliation && this.props.userData.affiliation.department ? this.props.userData.affiliation.department._id : ""
        newFormData["position"].value = this.props.userData.affiliation && this.props.userData.affiliation.department ? this.props.userData.affiliation.position : ""
        this.setState({
            formdata: newFormData
        })
      }


      if (prevProps.departments !== this.props.departments) {
        const formdata = this.state.formdata;
        const newFormdata = populateOptionFields(
            formdata,
            this.props.departments,
            "department"
          );
    
          this.updateFields(newFormdata);
      }

  }

  updateForm = element => {
    const newFormdata = update(
      element,
      this.state.formdata,
      "updateDegree"
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

  componentWillMount() {
      
  }

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "updateDepartments");
    let dataToSubmit = generateData(this.state.formdata, "updateDepartments");

    let newDataToSubmit = {
        ...dataToSubmit
    }

    newDataToSubmit["_id"] = this.props.userData._id
    let department = newDataToSubmit.department
    let position = newDataToSubmit.position

    let affiliation = {
        department,
        position,
        institution: this.props.userData.affiliation.institution,
        faculty: this.props.userData.affiliation.faculty,
    }

    let myData = {
        _id: this.props.userData._id,
        affiliation: affiliation
    }



    if (formIsValid & !this.state.formError) {
        console.log(myData)
        this.props
          .dispatch(
            updateAffiliation(myData)
          )
          .then(response => {
            if (response.payload.success) {
              this.setState({
                formError: false,
                formSuccess: true
              });
              this.props.close();
            } else {
              this.setState({
                formError: true,
                formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້`
              });
            }
          })
          .catch(e => {
            this.setState({
              formError: true,
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້`
            });
          });
      } else {
        this.setState({
          formError: true,
          formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
        });
      }
  };

  

  render() {
      
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
              <Typography variant="inherit">{`ແກ້ໄຂສັງກັດ`}</Typography>
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

           
          <FormField
          id={"position"}
          formdata={this.state.formdata.position}
          change={element => this.updateForm(element)}
        />
        <FormField
        labelWidth={
          this.state.formdata.department.config.labelWidth
        }
        id={"department"}
        formdata={this.state.formdata.department}
        change={element => this.updateForm(element)}
      />
            
            
            {
            //     <FormControlLabel
            //   control={
            //     <Checkbox checked={true} color="primary" value="checkedA" />
            //   }
            //   label="Secondary"
            // />
        }
            
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


const mapStateToProps = state => {
  return {
    profile: state.user.userDetail,
    country: state.user.country
  };
};

export default connect(mapStateToProps)(UpdateAffiliationDialog);
