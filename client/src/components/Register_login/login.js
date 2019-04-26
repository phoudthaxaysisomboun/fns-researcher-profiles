import React, { Component } from "react";
import FormField from "../utils/Form/formfield";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
import {
  FormControl,
  Link,
  Grid,
  Button,
  FormHelperText
} from "@material-ui/core";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../../actions/user_actions";

class Login extends Component {
  state = {
    formError: false,
    formErrorMessage: "ອີເມລ ຫລື ລະຫັດບໍ່ຖືກຕ້ອງ, ກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: "",
    formdata: {
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

  handleRegisterClick = () =>{
    this.props.history.push("/register")
  }

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

  componentDidMount() {
    document.title = "ລົງຊື່ເຂົ້າໃຊ້ - FNS Researcher Profiles";
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <FormControl fullWidth>
            <FormField
              id={"email"}
              formdata={this.state.formdata.email}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"password"}
              formdata={this.state.formdata.password}
              change={element => this.updateForm(element)}
            />
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
            <Grid container spacing={0} justify="center">
              <Grid
                item
                xs={6}
                align="left"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  color="primary"
                  style={{ fontWeight: "600" }}
                  onClick={this.handleRegisterClick}
                >
                ສະຫມັກສະມາຊິກ
                  
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
            <Grid
              container
              spacing={24}
              style={{ marginTop: "12px", fontSize: "14px" }}
              align="right"
            >
              <Grid item xs={12}>
                <Link href="/reset_user">ລືມລະຫັດຜ່ານ?</Link>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
