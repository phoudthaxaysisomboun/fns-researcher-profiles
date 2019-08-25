import React, { Component } from "react";

import FormField from "../../utils/Form/formfield";
// import moment from "moment";
import {
  update,
  // generateData,
  isFormValid
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

// import { Link as ReactLink, withRouter } from "react-router-dom";

import { updateFacebook } from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateFacebookDialogue extends Component {
  state = {
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          label: "ຊື່",
          autoFocus: true
        },
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      url: {
        element: "input",
        value: "",
        config: {
          name: "url_input",
          type: "url",
          label: "url"
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

  componentWillReceiveProps() {
    const newFormdata = {
      ...this.state.formdata
    };

    newFormdata["name"].value =
      this.props.profile &&
      this.props.profile.facebook &&
      this.props.profile.facebook.name
        ? this.props.profile.facebook.name
        : "";

    newFormdata["url"].value =
      this.props.profile &&
      this.props.profile.facebook &&
      this.props.profile.facebook.url
        ? this.props.profile.facebook.url
        : "";
    this.setState({ formdata: newFormdata });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "updateFacebook");
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
    let formIsValid = isFormValid(this.state.formdata, "updateFacebook");

    const curName = this.state.formdata.name.value;
    const curUrl = this.state.formdata.url.value;

    if (curName.trim() === "" && curUrl.trim() === "") {
      this.setState({ formError: false });
      const newFormdata = {
        ...this.state.formdata
      };

      newFormdata["name"].valid = true;

      newFormdata["url"].valid = true;
      this.setState({ formdata: newFormdata });
      formIsValid = true

      if (formIsValid) {
        this.props
          .dispatch(
            updateFacebook(
              this.props.profile._id,
              this.state.formdata.name.value,
              this.state.formdata.url.value
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
                formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ facebook ໄດ້`
              });
            }
          })
          .catch(e => {
            this.setState({
              formError: true,
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ facebook ໄດ້ (error: ${e})`
            });
          });
      } else {
        this.setState({
          formError: true,
          formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
        });
      }
    } else if (curName.trim() === "" || curUrl.trim() === "") {
      this.setState({ formError: true });
      const newFormdata = {
        ...this.state.formdata
      };

      newFormdata["name"].valid = false;

      newFormdata["url"].valid = false;
      this.setState({ formdata: newFormdata });
      formIsValid = false
    } else if (curName.trim() !== "" && curUrl.trim() !== "") {
      this.setState({ formError: false });
      const newFormdata = {
        ...this.state.formdata
      };

      newFormdata["name"].valid = true;

      newFormdata["url"].valid = true;
      this.setState({ formdata: newFormdata });
      formIsValid = true
      if (formIsValid) {
        this.props
          .dispatch(
            updateFacebook(
              this.props.profile._id,
              this.state.formdata.name.value,
              this.state.formdata.url.value
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
                formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ facebook ໄດ້`
              });
            }
          })
          .catch(e => {
            this.setState({
              formError: true,
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ facebook ໄດ້ (error: ${e})`
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
              xs={9}
              style={{
                padding: "24px",
                fontWeight: "bold",
                fontFamily: "'Noto Sans Lao UI', sans serif"
              }}
            >
              <Typography variant="inherit">{`ແກ້ໄຂ facebook`}</Typography>
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
              id={"name"}
              formdata={this.state.formdata.name}
              change={element => this.updateForm(element)}
              maxlength={500}
            />

            <FormField
              id={"url"}
              formdata={this.state.formdata.url}
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
    profile: state.user.userDetail
  };
};

export default connect(mapStateToProps)(UpdateFacebookDialogue);
