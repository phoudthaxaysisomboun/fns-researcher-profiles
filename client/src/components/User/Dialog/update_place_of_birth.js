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
  TextField
} from "@material-ui/core";

import { CloseOutlined } from "@material-ui/icons";

import {
  updatePlaceOfBirth,
  getCountry
} from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdatePlaceOfBirthDialogue extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
      village: {
        element: "input",
        value: "",
        config: {
          name: "village_input",
          type: "text",
          label: "ບ້ານ",
          autoFocus: true
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
      district: {
        element: "input",
        value: "",
        config: {
          name: "district_input",
          type: "text",
          label: "ເມືອງ",
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
      province: {
        element: "input",
        value: "",
        config: {
          name: "province_input",
          type: "text",
          label: "ແຂວງ",
        },
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
      country: {
        element: "select",
        value: "",
        config: {
          name: "country_input",
          type: "text",
          label: "ປະເທດ",
          labelWidth: 44,
          options: []
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

  componentDidMount() {
    const formdata = this.state.formdata;
    console.log(this.state);

    this.props.dispatch(getCountry()).then(response => {
      const newFormdata = populateOptionFields(
        formdata,
        this.props.province,
        "country"
      );

      this.updateFields(newFormdata);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPlaceOfBirth =
      prevProps.profile && prevProps.profile.placeOfBirth
        ? prevProps.profile.placeOfBirth
        : "";
    const currentPlaceOfBirth =
      this.props.profile && this.props.profile.placeOfBirth
        ? this.props.profile.placeOfBirth
        : "";

    if (prevPlaceOfBirth !== currentPlaceOfBirth) {
      const newFormdata = {
        ...this.state.formdata
      };

      newFormdata["village"].value =
        this.props.profile &&
        this.props.profile.placeOfBirth &&
        this.props.profile.placeOfBirth.village
          ? this.props.profile.placeOfBirth.village
          : "";
      newFormdata["province"].value =
        this.props.profile &&
        this.props.profile.placeOfBirth &&
        this.props.profile.placeOfBirth.province 
          ? this.props.profile.placeOfBirth.province
          : "";
      newFormdata["district"].value =
        this.props.profile &&
        this.props.profile.placeOfBirth &&
        this.props.profile.placeOfBirth.district 
          ? this.props.profile.placeOfBirth.district
          : "";

      newFormdata["country"].value =
        this.props.profile &&
        this.props.profile.placeOfBirth &&
        this.props.profile.placeOfBirth.country
        &&
        this.props.profile.placeOfBirth.country._id
          ? this.props.profile.placeOfBirth.country._id
          : "";

      this.setState({ formdata: newFormdata });

      console.log(this.state.formdata.country)
    }
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "updatePlaceOfBirth");
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
    const formdata = this.state.formdata;
    const newFormdata = populateOptionFields(
      formdata,
      this.props.country,
      "country"
    );

    this.updateFields(newFormdata);
  }

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "updatePlaceOfBirth");

    const curVillage = this.state.formdata.village.value;
    const curProvince = this.state.formdata.province.value;
    const curDistrict = this.state.formdata.district.value;
    const curCountry = this.state.formdata.country.value;

    if (
      (curVillage.trim() === "") &
      (curProvince.trim() === "") &
      (curCountry.trim() === "") &
      (curDistrict.trim() === "")
    ) {
      this.setState({formError: false})
      if (formIsValid) {
        this.props
          .dispatch(
            updatePlaceOfBirth(
              this.props.profile._id,
              curVillage,
              curDistrict,
              curProvince,
              curCountry
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
                formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
              });
            }
          })
          .catch(e => {
            this.setState({
              formError: true,
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
            });
          });
      } else {
        this.setState({
          formError: true,
          formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
        });
      }
    } else if (
      curVillage.trim() === "" ||
      curProvince.trim() === "" ||
      curCountry.trim() === "" ||
      curDistrict.trim() === "" 
    ) {

      this.setState({formError: true})
    }
    else  if (
      (curVillage.trim() !== "") &
      (curProvince.trim() !== "") &
      (curCountry.trim() !== "") &
      (curDistrict.trim() !== "")
    ) {
      this.setState({formError: false})
      if (formIsValid) {
        this.props
          .dispatch(
            updatePlaceOfBirth(
                this.props.profile._id,
                curVillage,
                curDistrict,
                curProvince,
                curCountry
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
                formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
              });
            }
          })
          .catch(e => {
            this.setState({
              formError: true,
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
            });
          });
      } else {
        this.setState({
          formError: true,
          formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
        });
      }
    }

    
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.close()}
        aria-labelledby="max-width-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle style={{ padding: 0 }}>
          <Grid container>
            <Grid
              item
              xs={10}
              style={{
                padding: "24px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans Lao UI', sans serif"
              }}
            >
              <Typography variant="inherit">{`ແກ້ໄຂທີ່ເກີດ`}</Typography>
            </Grid>
            <Grid item xs={2} align="right" style={{ padding: "16px" }}>
              <IconButton
                onClick={() => this.props.close()}
                style={{ padding: 0 }}
              >
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent style={{ padding: "24px", paddingTop: 0 }}>
          <form onSubmit={event => this.submitForm(event)}>
            <FormField
              id={"village"}
              formdata={this.state.formdata.village}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
            <FormField
              labelWidth={this.state.formdata.province.config.labelWidth}
              id={"province"}
              formdata={this.state.formdata.province}
              change={element => this.updateForm(element)}
            />
            <FormField
              labelWidth={this.state.formdata.district.config.labelWidth}
              id={"district"}
              formdata={this.state.formdata.district}
              change={element => this.updateForm(element)}
            />
            <FormField
              labelWidth={this.state.formdata.country.config.labelWidth}
              id={"country"}
              formdata={this.state.formdata.country}
              change={element => this.updateForm(element)}
            />
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

export default connect(mapStateToProps)(UpdatePlaceOfBirthDialogue);
