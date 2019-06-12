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




const FileViwerCard = ({user, research}) => {
let name
  name = research && research.files && research.files[0] ? research.files[0].name : "";

const file = `${UPLOADS_SERVER}${name}`;
const type = file.split('.').pop();
  return (
    
    <Grid item xs={12}>
    {console.log(research)}
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
        {
          name !== "" ? <FileViewer fileType={type} filePath={file} /> : null
        }
          
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
        {
          name !== "" ? <FileViewer fileType={type} filePath={file} /> : null
        }
        </Paper>
      )}
    </Grid>
  );
};

export default FileViwerCard;
