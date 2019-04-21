import React, { Component } from "react";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";

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
  Typography
} from "@material-ui/core";

import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

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
        element: "input",
        value: "1970-01-01",
        config: {
          label: "ວ.ດ.ປ ເກີດ",
          name: "email_input",
          type: "date",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      gender: {
        element: "radio",
        value: "",
        config: {
          name: "gender_radio",
          options: [
            { label: "ຊາຍ", value: "5cb2c97c1331746efcc3b1fb" },
            { label: "ຍິງ", value: "5cb2c98e1331746efcc3b1fd" }
          ]
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    },
    
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

    let dataToSubmit = generateData(this.state.formdata, "login");
    let formIsValid = isFormValid(this.state.formdata, "login");

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          console.log(response.payload);
          this.props.history.push("/");
        } else {
          this.setState({
            formError: true,
            formErrorMessage: response.payload.message
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "ອີເມລ ຫລື ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
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
      newFormdata["gender"] = newElement

    this.setState({ newFormdata})
    console.log(newFormdata)
  };

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
              <Grid container>
                <Grid item xs={12}>
                  <FormControl>
                    <Typography
                      style={{
                        fontFamily: "'Noto Sans Lao UI', sans-serif",
                        fontWeight: "normal",
                        fontSize: "1rem"
                      }}
                    >
                      ເພດ
                    </Typography>
                    <FormField
                      id={"gender"}
                      formdata={this.state.formdata.gender}
                      change={element => this.updateForm(element)}
                    />
                    <RadioGroup
                      aria-label="position"
                      name="position"
                      value={this.state.value}
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
                      id={"lastname"}
                      formdata={this.state.formdata.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </Grid>
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

export default connect()(Register);
