import React, { Component } from 'react';
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

class AddResearchButton extends Component {
  render() {
    return (
      <div>
      <Fab size="large" variant="extended" color="primary" style={fabStyle} onClick={() => this.props.add()}>
        <AddOutlined fontSize="large" style={{ marginRight: "8px" }} />
        ເພີ່ມ
      </Fab>
    </div>
    );
  }
}

export default AddResearchButton;

