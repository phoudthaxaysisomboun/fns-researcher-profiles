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

import { updateProfileDescription, getCountry, updateDegree, getDegrees, getDepartments } from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateDegreeDialog extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
        degree: {
            element: "select",
            value: "",
            config: {
              label: "ວຸດທິການສຶກສາ",
              name: "degree_select",
              options: [],
              labelWidth: 88
            },
            validation: {
              required: true
            },
            valid: true,
            touched: false,
            validationMessage: "",
            showlabel: true
          },
      }
    }
 

  componentDidMount() {
    this.props.dispatch(getDegrees()).then(response => {
    });

  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.userData !== this.props.userData) {

        const newFormData = {...this.state.formdata}
        
        newFormData["degree"].value = this.props.userData.degree && this.props.userData.degree._id ? this.props.userData.degree._id : ""
        this.setState({
            formdata: newFormData
        })
      }


      if (prevProps.degrees !== this.props.degrees) {
        const formdata = this.state.formdata;
        const newFormdata = populateOptionFields(
            formdata,
            this.props.degrees,
            "degree"
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
    let formIsValid = isFormValid(this.state.formdata, "updateDegree");
    let dataToSubmit = generateData(this.state.formdata, "updateDegree");

    let newDataToSubmit = {
        ...dataToSubmit
    }

    newDataToSubmit["_id"] = this.props.userData._id


    if (formIsValid & !this.state.formError) {
        this.props
          .dispatch(
            updateDegree(newDataToSubmit)
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
              <Typography variant="inherit">{`ແກ້ໄຂວຸດທິ`}</Typography>
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
          labelWidth={
            this.state.formdata.degree.config.labelWidth
          }
          id={"degree"}
          formdata={this.state.formdata.degree}
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

export default connect(mapStateToProps)(UpdateDegreeDialog);
