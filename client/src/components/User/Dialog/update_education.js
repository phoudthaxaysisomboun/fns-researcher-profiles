import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
import moment from "moment";
import {
  update,
  // generateData,
  isFormValid,
  populateOptionFields
} from "../../utils/Form/formActions";
import {

  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  FormHelperText,
  IconButton,
} from "@material-ui/core";

import { CloseOutlined } from "@material-ui/icons";

import { editEducation, getCountry } from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateEducationDialogue extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
      institution: {
        element: "input",
        value: "",
        config: {
          name: "institution_input",
          type: "text",
          label: "ສະຖາບັນ",
          autoFocus: true,
          placeholder: "ຊື່ໂຮງຮຽນ, ສະຖານທີ່ສຶກສາ ຫລື ວິທະຍາໄລ"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      fieldOfStudy: {
        element: "input",
        value: "",
        config: {
          name: "field_of_study_input",
          type: "text",
          label: "ສາຂາວິຊາຮຽນ"
          //   autoFocus: true
        },
        validation: {
          required: false
        },
        valid: false,
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
          //   autoFocus: true,
          placeholder: "ອະນຸປະລິນຍາ, ປະລິນຍາຕີ, ປະລິນຍາເອກ ຯລຯ"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      start: {
        element: "year",
        value: "",
        config: {
          name: "start_input",
          type: "number",
          label: "ປີເລີ່ມ"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      end: {
        element: "year",
        value: "",
        config: {
          name: "end_input",
          type: "number",
          label: "ປິສິ້ນສຸດ"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      city: {
        element: "input",
        value: "",
        config: {
          name: "cityt_input",
          type: "text",
          label: "ເມືອງ",
          placeholder: "ໃສ່ເມືອງ (ຫລື ແຂວງ) ຂອງສະຖານທີ່ສຶກສາ"
        },
        validation: {
          required: false
        },
        valid: false,
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
          required: true
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

    const newFormdata = {
      ...this.state.formdata
    };
    newFormdata["country"].value = "5cb447959c03a67fad711b7b";

    this.setState({ formdata: newFormdata });
  }

  componentDidUpdate(prevProps) {
      if (prevProps.education !== this.props.education) {
        const newFormdata = {
                ...this.state.formdata
              };
              newFormdata["institution"].value =
               this.props.education && this.props.education.institution ? this.props.education.institution
                  : "";
              newFormdata["fieldOfStudy"].value =
               this.props.education && this.props.education.fieldOfStudy ? this.props.education.fieldOfStudy
                  : "";
              newFormdata["degree"].value =
               this.props.education && this.props.education.degree ? this.props.education.degree
                  : "";
              newFormdata["start"].value =
               this.props.education && this.props.education.start ? moment(this.props.education.start).format("YYYY")
                  : "";
              newFormdata["end"].value =
               this.props.education && this.props.education.end ? moment(this.props.education.end).format("YYYY")
                  : "";
              newFormdata["city"].value =
               this.props.education && this.props.education.city ? this.props.education.city
                  : "";
              
              newFormdata["country"].value =
              this.props.education && this.props.education.country && this.props.education.country._id ? this.props.education.country._id
              : "";
              this.setState({ formdata: newFormdata });
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
    let formIsValid = isFormValid(this.state.formdata, "addEducation");

    const institution = this.state.formdata.institution.value;
    const fieldOfStudy = this.state.formdata.fieldOfStudy.value;
    const degree = this.state.formdata.degree.value;
    const start = moment(`01-01-${this.state.formdata.start.value}`).format(
      "MM-DD-YYYY"
    );
    const end = moment(`01-01-${this.state.formdata.end.value}`).format(
      "MM-DD-YYYY"
    );
    const city = this.state.formdata.city.value;
    const country = this.state.formdata.country.value;

    if ((institution.trim()) !== "" && (start.trim() !== "") && (end.trim() !== "") && (country.trim() !== "")  && (degree.trim() !== "")){
        formIsValid = true
    }

    if (moment(start).format("YYYY") > moment(end).format("YYYY")) {
      this.setState({
        formError: true,
        formErrorMessage: "ປິເລີ່ມບໍ່ສາມາດຫລາຍກວ່າປິທີ່ສິ້ນສຸດໄດ້"
      });
      formIsValid = false;
    } else if (moment(start).format("YYYY") <= moment(end).format("YYYY")) {
      this.setState({
        formError: false,
        formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ເກີດໄດ້`
      });
    } else if (
      moment(start)
        .format("YYYY")
        .trim().length > 4 ||
      moment(end)
        .format("YYYY")
        .trim().length > 4
    ) {
      this.setState({
        formError: true,
        formErrorMessage: `ຂໍອະໄພປີທີ່ທ່ານປ້ອນບໍ່ຖືກຕ້ອງ`
      });
      formIsValid = false;
    }

    if (formIsValid & !this.state.formError) {
      this.props
        .dispatch(
            editEducation(
            this.props.profile._id,
            
            institution,
            fieldOfStudy,
            degree,
            start,
            end,
            city,
            country,
            this.props.education._id,
          )
        )
        .then(response => {
          console.log(this.state.formdata);
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            });
            const newFormdata = {
              ...this.state.formdata
            };
            newFormdata["country"].value = "5cb447959c03a67fad711b7b";
            newFormdata["fieldOfStudy"].value = "";
            newFormdata["degree"].value = "";
            newFormdata["start"].value = "";
            newFormdata["end"].value = "";
            newFormdata["city"].value = "";
            newFormdata["institution"].value = "";

            this.setState({ formdata: newFormdata });
            this.props.closeMenu()
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
              <Typography variant="inherit">{`ແກ້ໄຂຂໍ້ມູນການສຶກສາ`}</Typography>
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
              id={"institution"}
              formdata={this.state.formdata.institution}
              change={element => this.updateForm(element)}
              maxlength={500}
            />

            <FormField
              id={"fieldOfStudy"}
              formdata={this.state.formdata.fieldOfStudy}
              change={element => this.updateForm(element)}
              maxlength={500}
            />

            <FormField
              id={"degree"}
              formdata={this.state.formdata.degree}
              change={element => this.updateForm(element)}
              maxlength={500}
            />
            <Grid container>
              <Grid item xs={6} style={{ paddingRight: "8px" }}>
                <FormField
                  id={"start"}
                  formdata={this.state.formdata.start}
                  change={element => this.updateForm(element)}
                  maxlength={4}
                />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: "8px" }}>
                <FormField
                  id={"end"}
                  formdata={this.state.formdata.end}
                  change={element => this.updateForm(element)}
                  maxlength={4}
                />
              </Grid>
              <FormHelperText
                style={{
                  fontFamily: "'Noto Sans Lao UI', sans serif",
                  fontWeight: "500",
                  marginBottom: "8px",
                  marginTop: "8px"
                }}
              >
                ຖ້າກໍາລັງສຶກສາຢູ່ແມ່ນໃສ່ປີຄາດວ່າຈະຈົບ
              </FormHelperText>
            </Grid>

            {
              //     <FormControlLabel
              //   control={
              //     <Checkbox checked={true} color="primary" value="checkedA" />
              //   }
              //   label="Secondary"
              // />
            }
            <Grid container>
              <Grid item xs={6} style={{ paddingRight: "8px" }}>
                <FormField
                  id={"city"}
                  formdata={this.state.formdata.city}
                  change={element => this.updateForm(element)}
                  maxlength={500}
                />
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: "8px" }}>
                <FormField
                  labelWidth={this.state.formdata.country.config.labelWidth}
                  id={"country"}
                  formdata={this.state.formdata.country}
                  change={element => this.updateForm(element)}
                />
              </Grid>
            </Grid>

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

export default connect(mapStateToProps)(UpdateEducationDialogue);
