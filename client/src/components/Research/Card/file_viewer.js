import React from "react";

import FileViewer from "react-file-viewer";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";
import { UPLOADS_SERVER } from "../../../components/utils/misc";

const name = "1558183548fns_researcher_profiles.pdf";

const file = `${UPLOADS_SERVER}${name}`;
const type = "pdf";

const FileViwerCard = () => {
  return (
    <Grid item xs={12}>
      {type === "pdf" ? (
        <Paper
          style={{
            boxShadow: "none",
            border: "1px solid #d8d8d8",
            padding: "16px",
            marginTop: "24px",
            fontFamily: "'Phetsarath', sans-serif",
            borderRadius: 0,
            textAlign: "center"
          }}
        >
          <FileViewer fileType={type} filePath={file} />
        </Paper>
      ) : (
        <Paper
          style={{
            boxShadow: "none",
            border: "1px solid #d8d8d8",
            padding: "16px",
            marginTop: "24px",
            fontFamily: "'Phetsarath', sans-serif",
            borderRadius: 0,
            
          }}
        >
          <FileViewer fileType={type} filePath={file} />
        </Paper>
      )}
    </Grid>
  );
};

export default FileViwerCard;
