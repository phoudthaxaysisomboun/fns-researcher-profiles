import React from "react";
import {
  FormControl,
  TextField,
  FormHelperText,
  OutlinedInput,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";

const FormField = ({ formdata, change, id, labelWidth, maxlength = null }) => {
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
                  inputProps={{
                    maxLength: maxlength,
                  }}
                />
              ) : (
                <TextField
                  {...formdata.config}
                  value={formdata.value}
                  onBlur={event => change({ event, id, blur: true })}
                  onChange={event => change({ event, id })}
                  margin="normal"
                  variant="outlined"
                  inputProps={{
                    maxLength: maxlength,
                  }}
                />
              )}

              {formdata.validationMessage ? showError() : null}
            </FormControl>
          </div>
        );
        break;
      case "date":
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
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              ) : (
                <TextField
                  {...formdata.config}
                  value={formdata.value}
                  onBlur={event => change({ event, id, blur: true })}
                  onChange={event => change({ event, id })}
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              )}

              {formdata.validationMessage ? showError() : null}
            </FormControl>
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <FormControl
            fullWidth
            style={{ marginTop: "16px" }}
            variant="outlined"
          >
            {formdata.validationMessage ? (
              <div>
                <InputLabel error>{formdata.config.label}</InputLabel>
                <Select error fullWidth
                  style={{
                    fontFamily: "'Noto Sans Lao UI', sans serif",
                    marginBottom: "8px"
                  }}
                 
                  value={formdata.value}
                  onBlur={event => change({ event, id, blur: true })}
                  onChange={event => change({ event, id })}
                  input={<OutlinedInput name={id} labelWidth={labelWidth} />}
                >
              
                  {formdata.config.options.map(item => (
                    <MenuItem
                    style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
                    key={item.key}
                    value={item.key}
                    >
                     {item.value}
                    </MenuItem>
                    
                  ))}
                </Select>
              </div>
            ) : (
              <div>
                <InputLabel>{formdata.config.label}</InputLabel>
                <Select fullWidth
                  style={{
                    fontFamily: "'Noto Sans Lao UI', sans serif",
                    marginBottom: "8px"
                  }}
                 
                  value={formdata.value}
                  onBlur={event => change({ event, id, blur: true })}
                  onChange={event => change({ event, id })}
                  input={<OutlinedInput name={id} labelWidth={labelWidth} />}
                >
                  
                  {formdata.config.options.map(item => (
                    <MenuItem
                    style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
                    key={item.key}
                    value={item.key}
                    >
                     {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
            {formdata.validationMessage ? showError() : null}
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
