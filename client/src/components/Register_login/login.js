import React, { Component } from "react";

import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Link,
  TextField,
  Grid,
  Button
} from "@material-ui/core";

const styles = {
  font: { fontFamily: "'Noto Sans Lao UI', sans-serif !importtant", fontWeight: "500" },
  formControl: {
    margin: "8px"
  }
};

class Login extends Component {
  state = {
    formError: false,
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
          type: "password",
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

  render() {
    return (
      <div>
        <FormControl fullWidth >
          <TextField
            id={"email"}
            value={this.state.formdata.email.value}
            {...this.state.formdata.email.config}
            label={this.state.formdata.email.config.label}
            style={styles.font}
            margin="normal"
            variant="outlined"
            // onChange={(element) => this.updateForm(element)}
          />
          <TextField
            id={"password"}
            style={styles.font}
            margin="normal"
            variant="outlined"
            {...this.state.formdata.password.config}
            // onChange={(element) => this.updateForm(element)}
          />
        </FormControl>
       
        <Grid container spacing={0}>
          <Grid item xs={3}>
          <Link href="/register" color="primary" style={{paddingBottom: '0'}}>
          {'color="inherit"'}
            </Link>
          </Grid>
          <Grid item xs={3} justify="flex-end">
            
          </Grid>
          <Grid item xs={3} justify="flex-end">
           
          </Grid>
          <Grid item xs={3} justify="flex-end">
            <Button variant="contained" color="primary" href="/register">
              Link
            </Button>
          </Grid>
         
        </Grid>
        <Grid container spacing={24}>
        <Grid item xs={12}>
        <Link
      onClick={() => this.props.history.push('/reset_user')}>
        Forgot my password
      </Link>
        </Grid>
        </Grid>
        
      </div>
    );
  }
}

export default Login;
