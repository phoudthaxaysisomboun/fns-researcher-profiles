import React from "react";
import { FormHelperText } from "@material-ui/core";
import { Error } from "@material-ui/icons";

const InputError = ({message = "ບໍ່ສາມາດວ່າງໄດ້"}) => {
  return (
    <FormHelperText
      error
      style={{ fontWeight: "normal", marginTop: 4, marginLeft: 0 }}
    >
      {" "}
      <Error
        style={{
          fontSize: 16,
          marginRight: 4,
          position: "relative",
          top: 3,
          color: "currentColor"
        }}
      />
      {message}
    </FormHelperText>
  );
};

export default InputError;
