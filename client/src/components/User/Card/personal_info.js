import React from "react";

import {
  IconButton,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Divider,
  Link
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

  const styles ={
    label: {
      color: "#5f6368",
                letterSpacing: ".00625em",
                fontWeight: "bold"
    }
  }

  const renderFields = () => {
    if (isOwner || user.isAdmin) {
      return (
        <>
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ເພດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {profile.gender.name ? profile.gender.name : null}
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ທີ່ຢູ່
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {
                profile.address ?
                <>
                {
                  profile.address.village ? `ບ້ານ${profile.address.village}` : null
                }
                { profile.address.district.name ? `, ເມືອງ${
                  profile.address.district.name
                }` : null}
                {
                  profile.address.province.name ?
                  <>
                  {profile.address.province.name === "ນະຄອນຫຼວງວຽງຈັນ" ||
                profile.address.province.name === "ນະຄອນຫລວງວຽງຈັນ"
                  ? `, ${profile.address.province.name} `
                  : `, ແຂວງ${profile.address.province.name} `}
                  </> : null
                }
                </>
                :
                null
              }
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ມືຖື
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            <Link href={profile.mobile ? `tel:{$profile.mobile}` : null}>
              {profile.mobile ? profile.mobile : null}
            </Link>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid> 

          
          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ໂທລະສັບ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            <Link href={profile.phone ? `tel:{$profile.phone}` : null}>
              {profile.phone ? profile.phone : null}
            </Link>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid> 


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ແຟັກ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            <Link href={profile.fax ? `fax:{$profile.fax}` : null}>
              {profile.fax ? profile.fax : null}
            </Link>
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid> 

          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              facebook
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            {
              profile.facebook ?
              <>
              
              {profile.facebook.name ? 
                <>
                <Grid item xs={12}>
                  <Typography variant="inherit">
                  {profile.facebook.name}
                  </Typography>              
                </Grid>
                </> : null}
              
              
              {profile.facebook.url ?
                <><Grid item xs={12}>
                  <Link href={`${profile.facebook.url}`}>
                  {profile.facebook.url}
                  </Link>
                </Grid></> : null
              }
              
              </>
              : null
            }
           
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid> 


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              website
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
            {profile.website ?
              <><Grid item xs={12}>
                <Link href={`https://${profile.website}`}>
                {`https://${profile.website}`}
                </Link>
              </Grid></> : null
            }
            
           
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid> 


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ວັນ-ເດືອນ-ປີ ເກີດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {profile.dateOfBirth ? moment(profile.dateOfBirth).format("DD/MM/YYYY") : null}
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ທີ່ເກີດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {
                profile.placeOfBirth ?
                <>
                {
                  profile.placeOfBirth.village ?
                  `ບ້ານ${profile.placeOfBirth.village}` :
                  null
                }
                {profile.placeOfBirth.district ? ` , ເມືອງ${
                  profile.placeOfBirth.district
                }` : null}
                {
                  profile.placeOfBirth.province ? 
                    <>
                    {profile.placeOfBirth.province === "ນະຄອນຫຼວງວຽງຈັນ" ||
                    profile.placeOfBirth.province === "ນະຄອນຫລວງວຽງຈັນ"
                      ? `, ${profile.placeOfBirth.province} `
                      : `, ແຂວງ${profile.placeOfBirth.province} `}
                    </>
                  : null
                }
                {
                  profile.placeOfBirth.country.name ?
                  <>
                  {profile.placeOfBirth.country.englishName === "Laos"
                  ? null
                  : `, ປະເທດ${profile.placeOfBirth.country.laoName}`}
                  </> : null
                }
                </> : null
              }
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ສັນຊາດ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {profile.nationality}
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>


          <Divider style={{ marginLeft: "16px", marginRight: "16px" }} />
          <Grid
            container
            alignItems="center"
            spacing={8}
            style={{ padding: "16px" }}
          >
            <Grid
              item
              xs={3}
              style={styles.label}
            >
              ເຜົ່າ
            </Grid>
            <Grid item xs={8} style={{ fontSize: "1rem", color: "#202124" }}>
              {profile.minor_ethnicity}
            </Grid>
            <Grid item xs={1} align="right">
              <IconButton style={{ padding: "4px" }}>
                <EditOutlined fontSize="small" />
              </IconButton>
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
        </Grid>
        {props.user.userDetail ? renderItems() : renderNoData()}
      </Paper>
    </Grid>
  );
};

export default PersonalInfoCard;
