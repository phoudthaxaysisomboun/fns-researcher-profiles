import React from "react";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Divider
} from "@material-ui/core";

import { EditOutlined } from "@material-ui/icons";

import moment from "moment";

const PersonalInfoCard = props => {
  const profile = { ...props.user.userDetail };
  const user = { ...props.user.userData };

  const isAuth = user.isAuth;
  var isOwner = false;

  if (isAuth) {
    if (user._id === profile._id) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderFields = () => {
    if (isOwner  || user.isAdmin) {
      return (
        <>
          <Grid container alignItems="center" spacing={8} style={{ padding: "16px" }}>
            <Grid
              item
              xs={4}
              style={{
                color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
              }}
            >
              ເພດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            {profile.gender.name}
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid container alignItems="center" spacing={8} style={{ padding: "16px" }}>
            <Grid
              item
              xs={4}
              style={{
                color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
              }}
            >
              ທີ່ຢູ່
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {`ບ້ານ${profile.address.village} , ເມືອງ${profile.address.district.name}`}
              {
                profile.address.province.name === 'ນະຄອນຫຼວງວຽງຈັນ' || profile.address.province.name === 'ນະຄອນຫລວງວຽງຈັນ' ?
                `, ${profile.address.province.name} `
                :
                `, ແຂວງ${profile.address.province.name} `
              }
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid container alignItems="center" spacing={8} style={{ padding: "16px" }}>
            <Grid
              item
              xs={4}
              style={{
                color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
              }}
            >
              ວັນ-ເດືອນ-ປີ ເກີດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            {moment(profile.dateOfBirth).format("DD/MM/YYYY")}
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid container alignItems="center" spacing={8} style={{ padding: "16px" }}>
            <Grid
              item
              xs={4}
              style={{
                color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
              }}
            >
            ທີ່ເກີດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            {`ບ້ານ${profile.placeOfBirth.village} , ເມືອງ${profile.placeOfBirth.district}`}
            {
              profile.placeOfBirth.province === 'ນະຄອນຫຼວງວຽງຈັນ' || profile.placeOfBirth.province === 'ນະຄອນຫລວງວຽງຈັນ' ?
              `, ${profile.placeOfBirth.province} `
              :
              `, ແຂວງ${profile.placeOfBirth.province} `
            }
            {
              profile.placeOfBirth.country.englishName === 'Laos' ?
              null
              :
              `, ປະເທດ${profile.placeOfBirth.country.laoName}`
            }
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid container alignItems="center" spacing={8} style={{ padding: "16px" }}>
            <Grid
              item
              xs={4}
              style={{
                color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
              }}
            >
            ສັນຊາດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {profile.nationality}
            </Grid>
          </Grid>
          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid container alignItems="center" spacing={8} style={{ padding: "16px" }}>
            <Grid
              item
              xs={4}
              style={{
                color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
              }}
            >
            ເຜົ່າ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {profile.minor_ethnicity}
            </Grid>
          </Grid>
          
        </>
      );
    } else if (isAuth) {
    } else {
    }
  };

  const renderItems = () => {
    return <>{renderFields()}</>;
  };

  const renderNoData = () => {
    return <LinearProgress style={{ margin: "16px" }} />;
  };

  return (
    <Grid item xs={12}>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        <Grid container style={{ padding: "16px", paddingBottom: 0 }}>
          <Grid item xs={6}>
            <Typography
              variant="inherit"
              style={{
                fontSize: "1.375rem",
                marginBottom: "8px",
                fontWeight: "bold"
              }}
            >
              ຂໍ້ມູນສ່ວນຕົວ
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            {isOwner ? (
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            ) : null}
          </Grid>
        </Grid>
        {props.user.userDetail ? renderItems() : renderNoData()}
      </Paper>
    </Grid>
  );
};

export default PersonalInfoCard;
