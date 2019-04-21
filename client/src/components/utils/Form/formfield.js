import React from "react";
import {
  FormControl,
  TextField,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

const FormField = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <FormHelperText
          style={{
            fontFamily: "'Noto Sans Lao UI', sans serif",
            fontWeight: "bold",
            marginTop: "0"
          }}
          error
          id="component-error-text"
        >
          {formdata.validationMessage}
        </FormHelperText>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div>
            <FormControl fullWidth>
              {formdata.validationMessage ? (
                <TextField
                  error
                  {...formdata.config}
                  value={formdata.value}
                  onBlur={event => change({ event, id, blur: true })}
                  onChange={event => change({ event, id })}
                  margin="normal"
                  variant="outlined"
                />
              ) : (
                <TextField
                  {...formdata.config}
                  value={formdata.value}
                  onBlur={event => change({ event, id, blur: true })}
                  onChange={event => change({ event, id })}
                  margin="normal"
                  variant="outlined"
                />
              )}

              {formdata.validationMessage ? showError() : null}
            </FormControl>
          </div>
        );
        break;
      case "radio":
        formTemplate = (
          <FormControl>
          <RadioGroup
          aria-label="position"
          name="position"
          value={formdata.value}
          row
          onChange={event => change({ event, id })}
        >
          {formdata.config.options.map(item => (
            <FormControlLabel
              
              value={formdata.value}
              control={<Radio color="primary" checked="false"/>}
              label={item.label}
              labelPlacement="end"
              
              
            />
          ))}
        </RadioGroup>
          </FormControl>
        );
        break;

      default:
        formTemplate = null;
        break;
    }

    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
