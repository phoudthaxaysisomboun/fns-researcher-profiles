import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
import moment from "moment";
import {
  update,
  generateData,
  isFormValid
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
  TextField, RadioGroup, Radio
} from "@material-ui/core";

import { CloseOutlined } from "@material-ui/icons";

import { Link as ReactLink, withRouter } from "react-router-dom";

import { updateGender } from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateGenderDialogue extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
        gender: {
            element: "radio",
            value: "",
            config: {
              name: "gender_radio",
              options: [
                { label: "ຊາຍ", value: "5cb2c97c1331746efcc3b1fb" },
                { label: "ຍິງ", value: "5cb2c98e1331746efcc3b1fd" }
              ],
              autoFocus: true
            },
            validation: {
              required: true
            },
            valid: true,
            touched: false,
            validationMessage: ""
          },
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

    console.log(this.state.formdata.gender.value)
  };


  componentWillReceiveProps() {
    const newFormdata = {
        ...this.state.formdata
      };
      const newElement = {
        ...newFormdata["gender"]
      };
      newElement.value =  this.props.profile && this.props.profile.gender && this.props.profile.gender._id
      ? this.props.profile.gender._id
      : "";
      newFormdata["gender"] = newElement;
  
      this.setState({ formdata: newFormdata });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "updateGender");
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

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "updateGender");

    if (formIsValid) {
      this.props
        .dispatch(
            updateGender(
            this.props.profile._id,
            this.state.formdata.gender.value,
          )
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
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນເພດໄດ້`
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
            formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນເພດໄດ້ (error: ${e})`
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
              <Typography variant="inherit">{`ແກ້ໄຂເພດ`}</Typography>
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
          <RadioGroup
          value={this.state.formdata.gender.value}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="5cb2c97c1331746efcc3b1fb"
            control={<Radio  color="primary" />}
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
            <Grid item align="right" style={{ marginTop: "24px" }}>
              <Button onClick={() => this.props.close()}>ຍົກເລີກ</Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "8px" }}
                onClick={event => this.submitForm(event)}
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
    profile: state.user.userDetail
  };
};

export default connect(mapStateToProps)(UpdateGenderDialogue);
