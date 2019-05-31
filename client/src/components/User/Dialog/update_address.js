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

import { Link as ReactLink, withRouter } from "react-router-dom";

import {
  updateAddress,
  getProvince,
  getDistrict
} from "../../../actions/user_actions";

import { connect } from "react-redux";

class UpdateAddressDialogue extends Component {
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
        valid: false,
        touched: false,
        validationMessage: ""
      },
      district: {
        element: "select",
        value: "",
        config: {
          name: "district_input",
          type: "text",
          label: "ເມືອງ",
          labelWidth: 40,
          options: []
        },
        validation: {
          required: false
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      province: {
        element: "select",
        value: "",
        config: {
          name: "province_input",
          type: "text",
          label: "ແຂວງ",
          labelWidth: 40,
          options: []
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
    const formdata = this.state.formdata;
    console.log(this.state);

    this.props.dispatch(getProvince()).then(response => {
      const newFormdata = populateOptionFields(
        formdata,
        this.props.province,
        "province"
      );

      this.updateFields(newFormdata);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevAddress =
      prevProps.profile && prevProps.profile.address
        ? prevProps.profile.address
        : "";
    const currentAddress =
      this.props.profile && this.props.profile.address
        ? this.props.profile.address
        : "";

    const previousProvince = prevState.formdata["province"].value;
    const currentProvince = this.state.formdata["province"].value;

    if (prevAddress !== currentAddress) {
      const newFormdata = {
        ...this.state.formdata
      };

      newFormdata["village"].value =
        this.props.profile &&
        this.props.profile.address &&
        this.props.profile.address.village
          ? this.props.profile.address.village
          : "";
      newFormdata["province"].value =
        this.props.profile &&
        this.props.profile.address &&
        this.props.profile.address.province &&
        this.props.profile.address.province._id
          ? this.props.profile.address.province._id
          : "";
      newFormdata["district"].value =
        this.props.profile &&
        this.props.profile.address &&
        this.props.profile.address.district &&
        this.props.profile.address.district._id
          ? this.props.profile.address.district._id
          : "";
      this.setState({ formdata: newFormdata });
    }
    if (previousProvince !== currentProvince) {
      this.props.dispatch(getDistrict(currentProvince)).then(response => {
        const formdata = this.state.formdata;
        const newFormdata = populateOptionFields(
          formdata,
          this.props.district,
          "district"
        );

        this.updateFields(newFormdata);
      });
    }
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "updateAddress");
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
      this.props.district,
      "district"
    );

    this.updateFields(newFormdata);
  }

  submitForm = event => {
    event.preventDefault();
    let formIsValid = isFormValid(this.state.formdata, "updateAddress");
    console.log(this.state.formdata);
    console.log(formIsValid);
    if (formIsValid) {
      this.props
        .dispatch(
          updateAddress(
            this.props.profile._id,
            this.state.formdata.village.value,
            this.state.formdata.district.value,
            this.state.formdata.province.value
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
              formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ຢູ່ໄດ້`
            });
          }
        })
        .catch(e => {
          this.setState({
            formError: true,
            formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນທີ່ຢູ່ໄດ້`
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
              <Typography variant="inherit">{`ແກ້ໄຂທີ່ຢູ່`}</Typography>
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
    profile: state.user.userDetail,
    district: state.user.district,
    province: state.user.province
  };
};

export default connect(mapStateToProps)(UpdateAddressDialogue);
