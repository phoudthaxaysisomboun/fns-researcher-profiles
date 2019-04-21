import React, { Component } from "react";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid, populateOptionFields } from "../utils/Form/formActions";

import {
  FormControl,
  FormLabel,
  RadioGroup,
  Link,
  Grid,
  Radio,
  FormControlLabel,
  Paper,
  Button,
  FormHelperText,
  Typography,
} from "@material-ui/core";

import { connect } from "react-redux";
import { getDepartments } from "../../actions/user_actions";

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
    
    formError: false,
    formErrorMessage: "",
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
        valid: false,
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
      }
    }
  };


  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "login");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");

    if (formIsValid) {
      console.log(dataToSubmit)
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "ມີບາງຢ່າງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
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
    console.log(this.state.formdata.gender.value);
  };

  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata
    })
  }

  componentDidMount() {
    const formdata = this.state.formdata

    this.props.dispatch(getDepartments()).then(response=>{
      const newFormdata = populateOptionFields(formdata, this.props.user.departments, 'department')

      this.updateFields(newFormdata)
    })
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
              <Typography style={styles.font} variant="h6" component="h3">
                ລົງຊື່ເຂົ້າໃຊ້
              </Typography>
              <Grid item xs={12} style={{ marginTop: "14px" }}>
                <FormControl margin="none">
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
                    name="position"
                    value={this.state.value}
                    onChange={this.handleChange}
                    row
                  >
                    <FormControlLabel
                      value="5cb2c97c1331746efcc3b1fb"
                      control={
                        <Radio
                          color="primary"
                          checked={this.state.formdata.gender.value}
                        />
                      }
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
                </FormControl>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <FormField
                    id={"name"}
                    formdata={this.state.formdata.name}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormField
                    id={"lastname"}
                    formdata={this.state.formdata.lastname}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormField
                  id={"email"}
                  formdata={this.state.formdata.email}
                  change={element => this.updateForm(element)}
                />
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <FormField
                    id={"dateOfBirth"}
                    formdata={this.state.formdata.dateOfBirth}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormField
                    labelWidth = {this.state.formdata.department.config.labelWidth}
                    id={"department"}
                    formdata={this.state.formdata.department}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                      
              </Grid>
              {this.state.formError ? (
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
              ) : null}

              <Grid container spacing={24}>
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Register);
