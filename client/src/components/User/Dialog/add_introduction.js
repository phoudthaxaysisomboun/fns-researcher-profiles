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

import { updateProfileDescription, getCountry } from "../../../actions/user_actions";

import { connect } from "react-redux";

class AddIntroductionDialogue extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
        description: {
            element: "input",
            value: "",
            config: {
              name: "abstract_input",
              type: "text",
              label: "ຄໍາແນະນໍາກ່ຽວກັບຕົນເອງ",
    
              placeholder: "",
              multiline: true,
              rows: 9,
              autoFocus: true
            },
            validation: {
              required: false
            },
            valid: false,
            touched: true,
            validationMessage: ""
          }
      }
    }
 

  componentDidMount() {
    // const formdata = this.state.formdata;
    // console.log(this.state);

    // this.props.dispatch(getCountry()).then(response => {
    //   const newFormdata = populateOptionFields(
    //     formdata,
    //     this.props.province,
    //     "country"
    //   );

    //   this.updateFields(newFormdata);
    // });

    // const newFormdata = {
    //   ...this.state.formdata
    // };
    // newFormdata["country"].value = "5cb447959c03a67fad711b7b";

    // this.setState({ formdata: newFormdata });
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.profileDescription !== this.props.profileDescription) {
        const newFormData = {...this.state.formdata}

        console.log(newFormData)
        
        newFormData["description"].value = this.props.profileDescription
        this.setState({
            formdata: newFormData
        })
      }
    // const prevPlaceOfBirth =
    //   prevProps.profile && prevProps.profile.placeOfBirth
    //     ? prevProps.profile.placeOfBirth
    //     : "";
    // const currentPlaceOfBirth =
    //   this.props.profile && this.props.profile.placeOfBirth
    //     ? this.props.profile.placeOfBirth
    //     : "";
    // if (prevPlaceOfBirth !== currentPlaceOfBirth) {
    //   const newFormdata = {
    //     ...this.state.formdata
    //   };
    //   newFormdata["village"].value =
    //     this.props.profile &&
    //     this.props.profile.placeOfBirth &&
    //     this.props.profile.placeOfBirth.village
    //       ? this.props.profile.placeOfBirth.village
    //       : "";
    //   newFormdata["province"].value =
    //     this.props.profile &&
    //     this.props.profile.placeOfBirth &&
    //     this.props.profile.placeOfBirth.province
    //       ? this.props.profile.placeOfBirth.province
    //       : "";
    //   newFormdata["district"].value =
    //     this.props.profile &&
    //     this.props.profile.placeOfBirth &&
    //     this.props.profile.placeOfBirth.district
    //       ? this.props.profile.placeOfBirth.district
    //       : "";
    //   newFormdata["country"].value =
    //     this.props.profile &&
    //     this.props.profile.placeOfBirth &&
    //     this.props.profile.placeOfBirth.country &&
    //     this.props.profile.placeOfBirth.country._id
    //       ? this.props.profile.placeOfBirth.country._id
    //       : "";
    //   this.setState({ formdata: newFormdata });
  }

  updateForm = element => {
    const newFormdata = update(
      element,
      this.state.formdata,
      "addIntroduction"
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
    // const formdata = this.state.formdata;
    // const newFormdata = populateOptionFields(
    //   formdata,
    //   this.props.country,
    //   "country"
    // );

    // this.updateFields(newFormdata);
    console.log(this.props)
  }

  componentWillMount() {
      
  }

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "addIntroduction");

    const profileDescription = this.state.formdata.description.value
    if (formIsValid & !this.state.formError) {
        this.props
          .dispatch(
            updateProfileDescription(
              this.props.profile._id,
              profileDescription
            )
          )
          .then(response => {
            console.log(this.state.formdata);
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
              <Typography variant="inherit">{`ແກ້ໄຂຄໍາແນະນໍາກ່ຽວກັບຕົນເອງ`}</Typography>
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
          <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography
                  variant="inherit"
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans serif",
                      
                      color: "rgb(102, 102, 102)"
                    }}
                  >
                    ແກ້ໄຂຂໍ້ມູນການແນະນໍາກ່ຽວກັບຕົວຂອງທ່ານເພື່ອບອກໃຫ້ຄົນອື່ນຮູ້ກ່ຽວກັບວຽກ ຫລື ງານວິໄຈທີ່ທ່ານກໍາລັງເຮັດຢູ່. ຂໍ້ຄໍາແນະນໍາກ່ຽວກັບຕົວຂອງທ່ານທີ່ຖືກຕ້ອງຈະຊ່ວຍໃຫ້ຄົນອື່ນເຂົ້າໃຈວຽກຂອງທ່ານຍິ່ງຂຶ້ນ.
                  </Typography>
                </Grid>
              </Grid>
           
              <FormField
              id={"description"}
              formdata={this.state.formdata.description}
              change={element => this.updateForm(element)}
              maxlength={500}
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

export default connect(mapStateToProps)(AddIntroductionDialogue);
