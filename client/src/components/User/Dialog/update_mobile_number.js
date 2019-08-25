import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
import {
  update,
  // generateData,
  isFormValid
} from "../../utils/Form/formActions";
import {
  // FormControl,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";

import { CloseOutlined } from "@material-ui/icons";

// import { Link as ReactLink, withRouter } from "react-router-dom";

import { updateMobile } from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateMobilePhoneNumber extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
      mobile: {
        element: "input",
        value: "",
        config: {
          name: "mobile_input",
          type: "tel",
          label: "ມືຖື",
          autoFocus: true
        },
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentDidMount() {
    const newFormdata = {
      ...this.state.formdata
    };

    newFormdata["mobile"].value =
      this.props.profile && this.props.profile.mobile
        ? this.props.profile.mobile
        : "";
  }

  componentWillReceiveProps() {
    const newFormdata = {
      ...this.state.formdata
    };

    newFormdata["mobile"].value =
      this.props.profile && this.props.profile.mobile
        ? this.props.profile.mobile
        : "";
    this.setState({ formdata: newFormdata });
  }

  updateForm = element => {
    const newFormdata = update(
      element,
      this.state.formdata,
      "updateMobileNumber"
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

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "updatePhoneNumber");

    if (formIsValid) {
      this.props
        .dispatch(
          updateMobile(this.props.profile._id, this.state.formdata.mobile.value)
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
              formErrorMessage:
                "ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນມືຖືໄດ້"
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
            formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນມືຖືໄດ້ (error: ${e})`
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
              xs={9}
              style={{
                padding: "24px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans Lao UI', sans serif"
              }}
            >
              <Typography variant="inherit">ແກ້ໄຂມືຖື</Typography>
            </Grid>
            <Grid item xs align="right" style={{ padding: "0" }}>
            <IconButton
              onClick={() => this.props.close()}
              style={{ padding: 0, marginRight: "24px", marginTop: "24px" }}
              >
                <CloseOutlined />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent style={{ padding: "24px", paddingTop: 0 }}>
          <form onSubmit={event => this.submitForm(event)}>
            <FormField
              id={"mobile"}
              formdata={this.state.formdata.mobile}
              change={element => this.updateForm(element)}
              maxlength={40}
            />
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
    profile: state.user.userDetail
  };
};

export default connect(mapStateToProps)(UpdateMobilePhoneNumber);
