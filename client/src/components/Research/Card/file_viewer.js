import React from "react";

import FileViewer from "react-file-viewer";

import { PDFReader, MobilePDFReader } from 'reactjs-pdf-reader';

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";
import { UPLOADS_SERVER } from "../../../components/utils/misc";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';



const FileViwerCard = ({ user, research }) => {
  let name;
  name =
    research && research.files && research.files[0]
      ? research.files[0].name
      : "";

  const file = `${UPLOADS_SERVER}${name}`;
  const type = file.split(".").pop();


  return (
    research && research.files && research.files[0] ?
    
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
            textAlign: "center",
            overflow:'auto',
            
          }}
        >

           <PDFReader showAllPage withCredentials={false} url={file}/>
        </Paper>
      ) : (
        <Paper
          style={{
            boxShadow: "none",
            border: "1px solid #d8d8d8",
            padding: "16px",
            marginTop: "24px",
            fontFamily: "'Phetsarath', sans-serif",
            borderRadius: 0
          }}
        >
          {name !== "" ? <FileViewer fileType={type} filePath={file} /> : null}
        </Paper>
      )}
    </Grid> : null
  );
};

export default FileViwerCard;
