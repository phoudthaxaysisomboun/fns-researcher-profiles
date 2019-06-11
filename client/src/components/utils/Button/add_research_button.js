import React from "react";
import { Fab } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
  fontWeight: "500"
};

const AddResearchButton = () => {
  return (
    <div>
      <Fab size="large" variant="extended" color="primary" style={fabStyle}>
        <AddOutlined fontSize="large" style={{ marginRight: "8px" }} />
        ເພີ່ມ
      </Fab>
    </div>
  );
};

export default AddResearchButton;

