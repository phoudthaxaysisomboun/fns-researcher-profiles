import React, { Component } from "react";
import FormField from "../utils/Form/formfield";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields
} from "../utils/Form/formActions";

import {
  FormControl,
  FormLabel,
  IconButton,
  RadioGroup,
  Link,
  Grid,
  Radio,
  FormControlLabel,
  Paper,
  Button,
  FormHelperText,
  Typography
} from "@material-ui/core";

import RemoveRedEyeOutlined from "@material-ui/icons/RemoveRedEyeOutlined";

import { connect } from "react-redux";
import { getDepartments, registerUser } from "../../actions/user_actions";

const styles = {
  container: {
    padding: "26px",
    border: "1px solid #d8d8d8"
  },
  font: {
    fontFamily: "'Noto Sans Lao UI', sans-serif",
    fontWeight: "700"
  }
};

class Register extends Component {
  state = {
    type: "input",
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "ຊື່",
          name: "name_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          label: "ນາມສະກຸນ",
          name: "lastname_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          label: "ອີເມລ",
          name: "email_input",
          type: "email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          label: "ລະຫັດຜ່ານ",
          name: "password_input",
          type: "password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          label: "ຢືນຢັນລະຫັດຜ່ານ",
          name: "confirm_password_input",
          type: "password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      dateOfBirth: {
        element: "date",
        value: "",
        config: {
          label: "ວ.ດ.ປ ເກີດ",
          name: "date_of_birth_input",
          type: "date"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      gender: {
        element: "radio",
        value: "5cb2c97c1331746efcc3b1fb",
        config: {
          name: "gender_radio",
          options: [
            { label: "ຊາຍ", value: "5cb2c97c1331746efcc3b1fb" },
            { label: "ຍິງ", value: "5cb2c98e1331746efcc3b1fd" }
          ]
        },
        validation: {
          required: true
        },
        valid: true,
        touched: false,
        validationMessage: ""
      },
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
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true
      },
      prefix: {
        element: "input",
        value: "",
        config: {
          label: "ຄໍານໍາຫນ້າ",
          placeholder: "ທ້າວ, ທ່ານ, ທ່ານປະລິນຍາເອກ...",
          name: "prefix_input",
          type: "text"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
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
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  showHide = e => {
    e.preventDefault();
    e.stopPropagation();

    const newFormdata = {
      ...this.state.formdata
    };

    const arr = ["password", "confirmPassword"];

    arr.forEach(item => {
      const newElement = {
        ...newFormdata[item]
      };
      newElement.config.type === "text"
        ? (newElement.config.type = "password")
        : (newElement.config.type = "text");

      this.setState({ formdata: newFormdata });
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");
    if (formIsValid) {
      const newDataToSubmit = {
        ...dataToSubmit,
        affiliation: {
          department: `${dataToSubmit.department}`,
          position: `${dataToSubmit.position}`
        }
      };
      delete newDataToSubmit.department;
      delete newDataToSubmit.position;

      console.log(newDataToSubmit);
      this.props
        .dispatch(registerUser(newDataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({
              formError: false,
              formSuccess: true
            });
            setTimeout(() => {
              this.props.history.push("/");
            }, 3000);
          } else {
            console.log(response.payload);
            this.setState({
              formError: true,
              formErrorMessage:
                "ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດສະຫມັກສະຫມັກສະມາຊິກໄດ້"
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
            formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດສະຫມັກສະຫມັກສະມາຊິກໄດ້ (error: ${e})`
          });
        });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
      });
    }
  };

  handleChange = event => {
    const newFormdata = {
      ...this.state.formdata
    };
    const newElement = {
      ...newFormdata["gender"]
    };
    newElement.value = event.target.value;
    newFormdata["gender"] = newElement;

    this.setState({ formdata: newFormdata });
  };

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata
    });
  };

  componentDidMount() {
    const formdata = this.state.formdata;

    this.props.dispatch(getDepartments()).then(response => {
      const newFormdata = populateOptionFields(
        formdata,
        this.props.user.departments,
        "department"
      );

      this.updateFields(newFormdata);
    });
  }

  render() {
    return (
      <form onSubmit={event => this.submitForm(event)}>
        <Grid
          container
          spacing={0}
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <Grid item lg md sm xs />
          <Grid item lg={5} md={7} sm={9} xs={11}>
            <Paper style={styles.container} elevation={0}>
              <Typography
                style={styles.font}
                variant="h5"
                component="h3"
                style={{
                  fontWeight: 500,
                  fontFamily: "'Noto Sans Lao UI', sans-serif"
                }}
              >
                ສະຫມັກສະມາຊິກ
              </Typography>

              <Grid container spacing={24} style={{ marginTop: "0px" }}>
                <Grid item xs={6}>
                  <Typography
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans-serif",
                      fontWeight: "normal",
                      fontSize: "1rem"
                    }}
                  >
                    ເພດ
                  </Typography>

                  <RadioGroup
                    aria-label="position"
                    value={this.state.formdata.gender.value}
                    onChange={this.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="5cb2c97c1331746efcc3b1fb"
                      control={<Radio color="primary" />}
                      label="ຊາຍ"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="5cb2c98e1331746efcc3b1fd"
                      control={<Radio color="primary" />}
                      label="ຍິງ"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"prefix"}
                    formdata={this.state.formdata.prefix}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"position"}
                    formdata={this.state.formdata.position}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"name"}
                    formdata={this.state.formdata.name}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"lastname"}
                    formdata={this.state.formdata.lastname}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"dateOfBirth"}
                    formdata={this.state.formdata.dateOfBirth}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
                <Grid item xs={6} style={{ paddingTop: 0 }}>
                  <FormField
                    labelWidth={
                      this.state.formdata.department.config.labelWidth
                    }
                    id={"department"}
                    formdata={this.state.formdata.department}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <FormField
                    id={"email"}
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid container style={{ paddingTop: "12px" }}>
                <Grid item xs={11} style={{ paddingRight: "24px" }}>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <FormField
                        id={"password"}
                        formdata={this.state.formdata.password}
                        change={element => this.updateForm(element)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormField
                        id={"confirmPassword"}
                        formdata={this.state.formdata.confirmPassword}
                        change={element => this.updateForm(element)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Grid item xs={12} align="right">
                    <IconButton
                      style={{ marginTop: "15px" }}
                      onClick={this.showHide}
                    >
                      {this.state.formdata.password.config.type === "text" ? (
                        <svg
                          fill="#757575"
                          height="35"
                          viewBox="0 0 24 24"
                          width="35"
                          xmlns="https://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M12,7c-2.48,0-4.5,2.02-4.5,4.5S9.52,16,12,16s4.5-2.02,4.5-4.5S14.48,7,12,7z M12,14.2c-1.49,0-2.7-1.21-2.7-2.7 c0-1.49,1.21-2.7,2.7-2.7s2.7,1.21,2.7,2.7C14.7,12.99,13.49,14.2,12,14.2z" />
                          <path d="M12,4C7,4,2.73,7.11,1,11.5C2.73,15.89,7,19,12,19s9.27-3.11,11-7.5C21.27,7.11,17,4,12,4z M12,17 c-3.79,0-7.17-2.13-8.82-5.5C4.83,8.13,8.21,6,12,6s7.17,2.13,8.82,5.5C19.17,14.87,15.79,17,12,17z" />
                          <path fill="none" d="M0,0h24v24H0V0z" />
                        </svg>
                      ) : (
                        <svg
                          fill="#757575"
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
                      )}
                    </IconButton>
                  </Grid>
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

              <Grid container spacing={24} style={{ marginTop: "24px" }}>
                <Grid
                  item
                  xs={6}
                  align="left"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Link
                    href="/login"
                    color="primary"
                    style={{ fontWeight: "600" }}
                  >
                    ລົງຊື່ເຂົ້າໃຊ້ແທນ
                  </Link>
                </Grid>

                <Grid item xs={6} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    href="/register"
                    onClick={event => this.submitForm(event)}
                  >
                    ຕໍ່ໄປ
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg md sm xs />
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Register);
