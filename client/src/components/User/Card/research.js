import React from "react";

import { Link as ReactLink, withRouter } from "react-router-dom";

import LinesEllipsis from "react-lines-ellipsis";

import {
  Grid,
  Paper,
  Avatar,
  Divider,
  Link,
  Button,
  Typography,
  IconButton,
  LinearProgress,
  Chip
} from "@material-ui/core";

import {
  CheckOutlined,
  ListOutlined,
  PersonAddOutlined,
  CommentOutlined,
  ModeCommentOutlined,
  ReplyOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
  MoreVertOutlined
} from "@material-ui/icons";

const ResearchCard = ({ userData, userDetail }) => {
  const user = { ...userData };
  const profile = { ...userDetail };

  const isAuth = user.isAuth;
  let isOwner = false;

  if (isAuth) {
    if (userData._id === profile._id) {
      isOwner = true;
    } else {
      isOwner = false;
    }
  }

  const renderItems = id => (
    <Grid item xs={12}>
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
            ຜົນງານການຄົ້ນຄວ້າ
          </Typography>
        </Grid>
      </Grid>
      <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
        {true ? (
          <div>
            <Grid container style={{ padding: "8px" }} wrap="nowrap">
              <Grid
                item
                xs={6}
                style={{ paddingTop: "8px", paddingLeft: "8px" }}
              >
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "1.5 px",
                    fontWeight: "600",
                    color: "#00695C"
                  }}
                >
                  {"10/02/2041"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                align="right"
                style={{ paddingRight: "4px", objectFit: "contain" }}
              >
                {isOwner ? (
                  <IconButton style={{ padding: 0 }}>
                    <MoreVertOutlined fontSize="small" />
                  </IconButton>
                ) : null}
              </Grid>
            </Grid>
            <Grid
              container
              style={{ paddingLeft: "16px", paddingRight: "16px" }}
            >
              <Grid item xs zeroMinWidth style={{ paddingRight: "16px" }}>
                <LinesEllipsis
                  text={`ສຶກສາ ແລະ ຜະລິດເຄື່ອງຕອງນໍ້າທີ່ມີຄຸນນະພາບ ຈາກກາບໝາກພ້າວ ແລະ ກາກອ້ອຍ`}
                  maxLine="2"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                  style={{ fontSize: "20px", fontWeight: "500" }}
                />
                <Grid container />
                <Grid
                  container
                  style={{ marginTop: "4px", marginBottom: "4px" }}
                >
                  <div
                    style={{
                      marginTop: "4px",
                      marginBottom: "4px",
                      marginRight: "8px",
                      borderRadius: "2px",
                      border: "1px solid #efefef",
                      background: "#efefef",
                      height: "24px",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      color: "#626262",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "26px"
                    }}
                  >{`ບົດຄວາມ`}</div>

                  <div
                    style={{
                      marginTop: "4px",
                      marginBottom: "4px",
                      marginRight: "8px",
                      borderRadius: "2px",
                      border: "1px solid #e5e5e5",
                      background: "transparent",
                      height: "24px",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      color: "#626262",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "26px"
                    }}
                  >{`ມີເອກກະສານໃຫ້ອ່ານ`}</div>
                  <div
                    style={{
                      marginTop: "4px",
                      marginBottom: "4px",
                      borderRadius: "2px",
                      border: "1px solid #e5e5e5",
                      background: "transparent",
                      height: "24px",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      color: "#626262",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "26px"
                    }}
                  >{`ພາຍໃນ`}</div>
                </Grid>
              </Grid>
              <Grid item align="right">
                <img
                  style={{
                    marginRight: "4px",
                    borderRadius: "6px",
                    objectFit: "cover"
                  }}
                  src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  alt="nothing"
                  width={80}
                  height={80}
                />
              </Grid>
              <Grid container style={{ marginBottom: "4px" }}>
                <Grid item style={{ marginRight: "4px" }}>
                  <Avatar
                    style={{ width: "18px", height: "18px" }}
                    src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="inherit"
                    style={{
                      height: "18px",
                      lineHeight: "18px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                  >
                    {`ພຸດທະໄຊ ສີສົມບູນ`} &nbsp; {" • "}&nbsp;
                  </Typography>
                </Grid>

                <Grid item style={{ marginRight: "4px" }}>
                  <Avatar
                    style={{ width: "18px", height: "18px" }}
                    src="http://hespokestyle.com/wp-content/uploads/2017/04/navy-cotton-linen-blazer-tan-chinos-polo-shirt-mens-spring-fashion-trends-8-800x533.jpg"
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="inherit"
                    style={{
                      height: "18px",
                      lineHeight: "18px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                  >
                    {`ພຸດທະໄຊ ສີສົມບູນ`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "4px", marginBottom: "4px" }}>
                <Grid item>
                  <LinesEllipsis
                    text={`ໂດຍອາໄສແຊນ (gène) ເປັນໂຕກາງໃນການສົ່ງຜ່ານລັກສະນະທາງພັນທຸກຳ ອັນເປັນພື້ນຖານຂອງການເກີດວິວັດທະນາການ ລັກສະນະເຊັ່ນນີ້ ແມ່ນເກີດຂຶ້ນໃນປະຊາກອນເພື່ອໃຫ້ເກີດຄວາມແປຜັນທາງພັນທຸກຳເມື່ອສິ່ງມີຊີວິດໃຫ້ກຳເນີດລູກຫຼານມັກເກີດລັກສະນະໃໝ່ ຫຼືປ່ຽນແປງລັກສະນະເດີມ.

                  ລັກສະນະໃໝ່ທີ່ເກີດຂຶ້ນນີ້ມີສາເຫດສຳຄັນ 2 ປະການ: ປະການນຶ່ງ ເກີດຈາກຂະບວນການກາຍພັນຂອງແຊນ, ສ່ວນປະການສອງ ເກີດຈາກການແລກປ່ຽນແຊນລະຫວ່າງປະຊາກອນ ແລະລະຫວ່າງແອສະແປດ (espèce) ໃນສິ່ງມີຊີວິດທີ່ມີການສືບພັນແບບອາໄສເພດ ສິ່ງມີຊີວິດໃໝ່ທີ່ເກີດຂຶ້ນຈະຜ່ານຂະບວນການແລກປ່ຽນແຊນ ອັນກໍ່ໃຫ້ເກີດຄວາມແປຜັນທາງພັນທຸກຳທີ່ຫຼາກຫຼາຍໃນສິ່ງມີຊີວິດ.
                  
                  ວິວັດທະນາການເກີດຂຶ້ນເມື່ອຄວາມແຕກຕ່າງທາງພັນທຸກຳເກີດຂຶ້ນ ຈົນເກີດຄວາມແຕກຕ່າງຫຼາຍຂຶ້ນເລື້ອຍໆ ຈົນກາຍເປັນລັກສະນະທີ່ແຕກຕ່າງກັນ.`}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="words"
                    style={{
                      fontSize: "14px",
                      color: "#666666",
                      fontWeight: "400"
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: "4px", marginBottom: "4px" }}
                alignItems="flex-end"
              >
                <Grid item xs={6}>
                  <Button variant="contained" color="primary">
                    ອ່ານ
                  </Button>
                </Grid>
                <Grid item xs={6} align="right" alignItems="flex-end">
                  <span style={{ fontSize: "13.5px", color: "#757575" }}>
                    ອ່ານ
                  </span>
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#757575",
                      fontFamily: "'Roboto', sans serif",
                      display: "inline",
                      fontWeight: "500"
                    }}
                  >
                    &nbsp;{`100,326`}&nbsp;
                  </div>
                  <span style={{ fontSize: "13.5px", color: "#757575" }}>
                    ຄັ້ງ
                  </span>
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: "4px", marginBottom: "16px" }}
              >
                <Button
                  size="small"
                  style={{
                    color: "#686868",
                    minWidth: "14px",
                    height: "36px",
                    borderRadius: "22px"
                  }}
                >
                  {" "}
                  <FavoriteBorderOutlined fontSize="small" />
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#757575",
                      fontFamily: "'Roboto', sans serif",
                      display: "inline",
                     
                    }}
                  >
                    &nbsp;{`100,326`}&nbsp;
                  </div>
                </Button>
                <Button
                  size="small"
                  style={{
                    color: "#686868",
                    minWidth: "14px",
                    height: "36px",
                    borderRadius: "22px"
                  }}
                >
                  {" "}
                  <ModeCommentOutlined fontSize="small" />
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#757575",
                      fontFamily: "'Roboto', sans serif",
                      display: "inline",
                     
                    }}
                  >
                    &nbsp;{`100,326`}&nbsp;
                  </div>
                </Button>
                <Button
                  size="small"
                  style={{
                    color: "#686868",
                    minWidth: "14px",
                    height: "36px",
                    borderRadius: "22px"
                  }}
                >
                  {" "}
                  <ReplyOutlined fontSize="small" />
                  <div
                    style={{
                      fontSize: "13.5px",
                      color: "#757575",
                      fontFamily: "'Roboto', sans serif",
                      display: "inline",
                     
                    }}
                  >
                    &nbsp;{`100,326`}&nbsp;
                  </div>
                </Button>
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Grid item xs={12} align="center">
                <Button color="primary" style={{ width: "100%" }}>
                  {" "}
                  <ListOutlined style={{ marginRight: "8px" }} />
                  ເບິ່ງທັງຫມົດ
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div style={{ margin: "20px" }}>
            <Typography variant="caption" align="center">
              ຍັງບໍ່ມີຜົນງານການຄົ້ນຄວ້າເທື່ອ
            </Typography>
          </div>
        )}
      </Paper>
    </Grid>
  );

  const renderNoData = () => {
    return (
      <Grid item xs={12}>
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
              ຜົນງານການຄົ້ນຄວ້າ
            </Typography>
          </Grid>
        </Grid>
        <Paper style={{ boxShadow: "none", border: "1px solid #d8d8d8" }}>
          <LinearProgress style={{ margin: "16px" }} />
        </Paper>
      </Grid>
    );
  };

  return userDetail ? renderItems() : renderNoData();
};

export default withRouter(ResearchCard);
