import React from "react";

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
  Typography,
  withWidth
} from "@material-ui/core";

import {
  Mail,
  Phone,
  ShareOutlined,
  PersonAddOutlined,
  CheckOutlined,
  AddOutlined,
  EditOutlined
} from "@material-ui/icons";

const iconStyles = {
  position: "relative",
  top: "6px",
  marginRight: "6px",
  width: "20px",
  width: "20px"
};

const ProfileHeader = props => {
  const { width } = props;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper style={{ paddingTop: "24px", borderRadius: 0 }}>
          <Grid container>
            <Grid item xs sm={1} lg={3} md={2} />
            <Grid item xs={10} sm={10} lg={6} md={8}>
              <Grid container spacing={24}>
                <Grid item lg={2} md={2} sm={3} xs={12} align="left">
                  <Avatar
                    style={{ width: "96px", height: "96px" }}
                    alt="Remy Sharp"
                    src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  />
                </Grid>
                <Grid item lg={5} md={5} sm={8} xs={12} style={{padding: "left"}}>
                  <Typography
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans serif",
                      fontWeight: 700,
                      fontSize: "24px"
                    }}
                  >
                    {"ທ່ານ"} {"ພຸດທະໄຊ"} {"ສີສົມບູນ"}
                    {true ? (
                      <span>
                        <IconButton style={{ padding: "4px", margin: "4px" }}>
                          <EditOutlined style={{ fontSize: "16px" }} />
                        </IconButton>
                      </span>
                    ) : null}
                  </Typography>

                  {true ? (
                    <Typography variant="h7" style={{ marginBottom: "8px" }}>
                      <span style={{ fontWeight: "bold" }}>ວຸດທິການສຶກສາ:</span>
                      {" ປະລິນຍາເອກ"}
                      {true ? (
                        <span>
                          <IconButton style={{ padding: "4px", margin: "4px" }}>
                            <EditOutlined style={{ fontSize: "16px" }} />
                          </IconButton>
                        </span>
                      ) : null}
                    </Typography>
                  ) : null}
                  {true ? (
                    <Link
                      href="mailto:xigh1952@gmail.com"
                      style={{ color: "#BA000D", marginTop: "8px" }}
                    >
                      <Typography variant="body">
                        <Mail style={iconStyles} />
                        xigh1952@gmail.com
                        {true ? (
                          <span>
                            <IconButton
                              style={{ padding: "4px", margin: "4px" }}
                            >
                              <EditOutlined style={{ fontSize: "16px" }} />
                            </IconButton>
                          </span>
                        ) : null}
                      </Typography>
                    </Link>
                  ) : null}
                  {true ? (
                    <Link style={{ color: "#1976D2" }}>
                      <Typography variant="body">
                        <svg
                          style={iconStyles}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="facebook"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          class="svg-inline--fa fa-facebook fa-w-14 fa-2x"
                        >
                          <path
                            fill="currentColor"
                            d="M448 56.7v398.5c0 13.7-11.1 24.7-24.7 24.7H309.1V306.5h58.2l8.7-67.6h-67v-43.2c0-19.6 5.4-32.9 33.5-32.9h35.8v-60.5c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9h-58.4v67.6h58.4V480H24.7C11.1 480 0 468.9 0 455.3V56.7C0 43.1 11.1 32 24.7 32h398.5c13.7 0 24.8 11.1 24.8 24.7z"
                            class=""
                          />
                        </svg>
                        Phoudthaxay Sisomboun
                        {true ? (
                          <span>
                            <IconButton
                              style={{ padding: "4px", margin: "4px" }}
                            >
                              <EditOutlined style={{ fontSize: "16px" }} />
                            </IconButton>
                          </span>
                        ) : null}
                      </Typography>
                    </Link>
                  ) : null}
                  {true ? (<Link href="tel:02076697480" style={{ color: "#2E7D32" }}>
                  <Typography variant="body">
                    <Phone style={iconStyles} />
                    020 76697480{true ? (
                      <span>
                        <IconButton
                          style={{ padding: "4px", margin: "4px" }}
                        >
                          <EditOutlined style={{ fontSize: "16px" }} />
                        </IconButton>
                      </span>
                    ) : null}
                  </Typography>
                </Link>): null}
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} align="right">
                  <Button
                    size="medium"
                    variant="outlined"
                    color="primary"
                    style={{ margin: "8px" }}
                  >
                    <ShareOutlined style={{ marginRight: "8px" }} />
                    ແບ່ງປັນ
                  </Button>
                  {true ? (
                    <Fab
                      size="medium"
                      variant="extended"
                      color="primary"
                      style={{ margin: "8px" }}
                    >
                      <AddOutlined style={{ marginRight: "8px" }} />
                      ເພີ່ມຜົນງານ
                    </Fab>
                  ) : (
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      style={{ margin: "8px" }}
                    >
                      <PersonAddOutlined style={{ marginRight: "8px" }} />
                      ຕິດຕາມ
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs sm={1} lg={3} md={2} />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={0}
                indicatorColor="primary"
                textColor="primary"
                centered
                style={{marginTop: "16px"}}
              >
                <Tab
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ໂດຍລວມ"
                />
                <Tab
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ປະຫວັດລະອຽດ"
                />
                <Tab
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ຜົນງານຄົ້ນຄວ້າ"
                />
                <Tab
                  style={{ fontSize: "14px", fontWeight: 500 }}
                  label="ສະຖິຕິ"
                />
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {props.children}
    </Grid>
  );
};

export default ProfileHeader;
