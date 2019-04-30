import React from "react";
import AutoLinkText from 'react-autolink-text2';

import {
  FormControl,
  FormLabel,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  RadioGroup,
  Grid,
  Fab,
  Radio,
  FormControlLabel,
  Paper,
  Avatar,
  Button,
  FormHelperText,
  Tabs,
  Tab,
  Link,
  Chip,
  Typography,
  withWidth
} from "@material-ui/core";

import {
  EditOutlined,
  InsertDriveFileOutlined,
  RemoveRedEyeOutlined,
  ForwardOutlined
} from "@material-ui/icons";

const iconStyles = {
  position: "relative",
  top: "5px",
  marginRight: "4px",
  width: "20px",
  width: "20px"
};

const ResearchaAreaCard = props => {

    const profile = { ...props.user.userDetail };
    const researchArea = profile.researchArea
    

    
    
    const chipData = [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ]

      console.log(chipData)
      console.log(researchArea)
      

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            variant="inherit"
            style={{
              fontSize: "20px",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            ຂົງເຂດການຄົ້ນຄວ້າ
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <IconButton style={{ padding: "4px", margin: "4px" }}>
            <EditOutlined fontSize="small" /> 
          </IconButton>
        </Grid>
      </Grid>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <Grid container spacing={8} style={{ padding: "16px" }} >
        { profile.researchArea ? profile.researchArea.map(data=>{
          console.log(data)
            return (<Chip style={{margin: "4px"}}
                key={data.key}
        
                label={data.label}

        variant="outlined"
              />)
        }) : null }
        
        </Grid>
      </Paper>
    </div>
  );
};

export default ResearchaAreaCard;
