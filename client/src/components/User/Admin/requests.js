import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';

import moment from "moment";

import ManageUserHeader from "../../../hoc/manage_user_header";

import { connect } from "react-redux";

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress
} from "@material-ui/core";

import {
  DeleteOutline,
  FilterListOutlined,
  CloseOutlined,
  CheckCircleOutlineOutlined
} from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import {
  getRequestUser,
  confirmUser,
  removeUser,
  // cancelUsers
} from "../../../actions/user_actions";
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "ອີເມລ"
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "ຊື່ ແລະ ນາມສະກຸນ"
  },
  { id: "gender.name", numeric: false, disablePadding: false, label: "ເພດ" },
  {
    id: "affiliation.department.name",
    numeric: false,
    disablePadding: false,
    label: "ພາກວິຊາ"
  },
  {
    id: "dateOfBirth",
    numeric: false,
    disablePadding: false,
    label: "ວ.ດ.ປ ເກີດ"
  },
  {
    id: "degree.name",
    numeric: false,
    disablePadding: false,
    label: "ວຸດທິ"
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "ວັນສະຫມັກ"
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              color="primary"
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                {!row.hideSortIcon ? (
                  <>
                    <Tooltip
                      title="ຮຽງຕາມ"
                      placement={row.numeric ? "bottom-end" : "bottom-start"}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={this.createSortHandler(row.id)}
                      >
                        {row.label}
                      </TableSortLabel>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <TableSortLabel
                      active={false}
                      hover={false}
                      hideSortIcon={true}
                    >
                      {row.label}
                    </TableSortLabel>
                  </>
                )}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.primary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const {
    numSelected,
    classes,
    openDeleteDialog,
    requestCount,
    handleCancelUser,
    handleConfirmUser
  } = props;

  // <Toolbar
  //     className={classNames(classes.root, {
  //       [classes.highlight]: numSelected > 0
  //     })}
  //     style={{ paddingLeft: 0, paddingRight: 0, borderWidth: "1px" }}
  //   ></Toolbar>
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
      style={{ paddingLeft: 0, paddingRight: 0, borderWidth: "1px" }}
    >
      <Grid
        container
        alignItems="center"
        style={{ marginTop: "16px", marginBottom: "16px" }}
      >
        <Grid item xs>
          <div>
            {numSelected > 0 ? (
              <Typography
                style={{ marginLeft: "24px" }}
                color="inherit"
                variant="inherit"
              >
                ເລືອກ {numSelected} ລາຍການ
              </Typography>
            ) : (
              <Typography
                variant="inherit"
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  paddingLeft: 0,
                  marginLeft: 0
                }}
                id="tableTitle"
              >
                ຜູ້ຮ້ອງຂໍສະຫມັກສະມາຊິກ{" "}
                <div
                  style={{
                    fontWeight: "normal",
                    display: "inline",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#898989",
                    fontSize: "16px"
                  }}
                >
                  {requestCount}
                </div>
              </Typography>
            )}
          </div>
        </Grid>
        <Grid item xs={5} align="right">
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <>
                <Tooltip title="ຍົກເລີກການສະຫມັກ">
                  <IconButton
                    onClick={() => {
                      handleCancelUser();
                    }}
                    style={{ marginRight: "0px" }}
                  >
                    <CloseOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="ລຶບ">
                  <IconButton
                    onClick={() => {
                      openDeleteDialog();
                    }}
                    style={{ marginRight: "8px" }}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleConfirmUser();
                  }}
                  style={{ marginRight: "16px" }}
                >
                  ຢືນຢັນ
                </Button>
              </>
            ) : (
              <>
                <Tooltip title="Filter list">
                  <IconButton
                    aria-label="Filter list"
                    style={{ marginRight: "0px" }}
                  >
                    <FilterListOutlined />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  mainContainer: {
    [theme.breakpoints.up("xl")]: {
      // marginLeft: -12,
      // marginRight: 20,
      paddingLeft: 240
    },
    [theme.breakpoints.up("lg")]: {
      // marginLeft: -12,
      // marginRight: 20,
      paddingLeft: 240
    },
    [theme.breakpoints.down("md")]: {
      // marginLeft: -12,
      // marginRight: 20,
      paddingLeft: 0
    },
  }
});

class RequestRegisterAdmin extends React.Component {
  state = {
    order: "desc",
    orderBy: "createdAt",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    openDeleteConfirmationDialog: false,
    tabNumber: 1,
    openAddUserDialog: false
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleAddUserDialogClose() {
    this.setState({
      openAddUserDialog: false
    });
  }

  handleOpenAddUserDialog() {
    this.setState({
      openAddUserDialog: true
    });
  }

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });

    console.log(this.state.selected);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount() {}

  componentWillMount() {
    document.title =
      "ເຄຶ່ອງມືຈັດການນັກຄົ້ນຄວ້າ(ນັກຄົ້ນຄວ້າ)-FNS Researcher Profiles";
    this.props.dispatch(getRequestUser()).then(response => {
      this.setState({
        data: this.props.user.userRegisterationRequest
      });
    });
  }

  componentWillUnmount() {
    // this.props.dispatch(clearAllResearchers())
  }

  componentDidUpdate(prevProps, prevState) {}

  handleOpenDeleteConfirmationDialog() {
    this.setState({
      openDeleteConfirmationDialog: true
    });
  }

  handleDeleteResearchConfirmationClose() {
    this.setState({
      openDeleteConfirmationDialog: false
    });
  }

  handleUserDeletetion = () => {
    this.props.dispatch(removeUser(this.state.selected)).then(response => {
      console.log(response.payload.success);
      if (response.payload.success) {
        this.props.dispatch(getRequestUser()).then(response => {
          this.setState({
            data: this.props.user.userRegisterationRequest,
            openDeleteConfirmationDialog: false,
            selected: []
          });
        });
      }
    });
  };

  handleConfirmUser = () => {
    this.props.dispatch(confirmUser(this.state.selected)).then(response => {
      console.log(response.payload.success);
      if (response.payload.success) {
        this.props.dispatch(getRequestUser()).then(response => {
          this.setState({
            data: this.props.user.userRegisterationRequest,
            openDeleteConfirmationDialog: false,
            selected: []
          });
        });
      }
    });
  };

  handleCancelUser = () => {
    this.props.dispatch(confirmUser(this.state.selected)).then(response => {
      console.log(response.payload.success);
      if (response.payload.success) {
        this.props.dispatch(getRequestUser()).then(response => {
          this.setState({
            data: this.props.user.userRegisterationRequest,
            openDeleteConfirmationDialog: false,
            selected: []
          });
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <>
<div className={classes.mainContainer}>

        <ManageUserHeader
          props={this.props}
          children={this.props.children}
          tab={this.state.tabNumber}
          changeTab={tabNumber => this.changeTab(tabNumber)}
          requestCount={this.props.user.userRegisterationCount}
        >
          <Grid
            container
            spacing={0}
            style={{ paddingTop: "0", paddingBottom: "24px" }}
          >
            <Grid item xs sm lg md />

            <Grid item xs={11} sm={11} lg={11} md={11}>
              {this.props.user.userRegisterationRequest ? (
                <>
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={this.state.selected}
                    openDeleteDialog={() => {
                      this.handleOpenDeleteConfirmationDialog();
                    }}
                    handleConfirmUser={() => {
                      this.handleConfirmUser();
                    }}
                    handleCancelUser={() => {
                      this.handleCancelUser();
                    }}
                    requestCount={
                      this.props.user.userRegisterationCount
                        ? `(${this.props.user.userRegisterationCount})`
                        : null
                    }
                  />
                  <Paper
                    style={{
                      boxShadow: "none",
                      border: "1px solid #d8d8d8",

                      borderRadius: 0
                    }}
                  >
                    {this.props.user.userRegisterationCount > 0 ? (
                      <>
                        <div className={classes.tableWrapper}>
                          <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                          >
                            <EnhancedTableHead
                              numSelected={selected.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={this.handleSelectAllClick}
                              onRequestSort={this.handleRequestSort}
                              rowCount={data.length}
                            />
                            <TableBody>
                              {stableSort(data, getSorting(order, orderBy))
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map(n => {
                                  const isSelected = this.isSelected(n._id);
                                  return (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      aria-checked={isSelected}
                                      tabIndex={-1}
                                      key={n.id}
                                      selected={isSelected}
                                      onClick={event =>
                                        this.handleClick(event, n._id)
                                      }
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          color="primary"
                                          checked={isSelected}
                                          onClick={event =>
                                            this.handleClick(event, n._id)
                                          }
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        <Typography variant="inherit">
                                          {`${n.email}`}
                                          {n.emailIsVerified ? (
                                            <>
                                              {" "}
                                              <div
                                                style={{
                                                  fontWeight: "normal",
                                                  display: "inline"
                                                }}
                                              >
                                                <CheckCircleOutlineOutlined
                                                  style={{
                                                    padding: 0,
                                                    position: "relative",
                                                    top: "3px",
                                                    color: "#388e3c",
                                                    fontSize: "16px"
                                                  }}
                                                />
                                              </div>
                                            </>
                                          ) : null}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        <Typography variant="inherit">{`${
                                          n.prefix
                                        } ${n.name} ${n.lastname}`}</Typography>
                                      </TableCell>
                                      <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        <Typography variant="inherit">{`${
                                          n["gender.name"]
                                        }`}</Typography>{" "}
                                      </TableCell>

                                      <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        {" "}
                                        <Typography variant="inherit">{`${
                                          n["affiliation.department.name"]
                                        }`}</Typography>{" "}
                                      </TableCell>
                                      <TableCell
                                        align="left"
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        {moment(n.dateOfBirth).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </TableCell>
                                      <TableCell
                                      align="left"
                                      component="th"
                                      scope="row"
                                      padding="dense"
                                      >
                                        <Typography variant="inherit">
                                          {n["degree.name"]
                                            ? `${n["degree.name"]}`
                                            : ""}
                                        </Typography>
                                      </TableCell>
                                      <TableCell
                                      align="left"
                                      component="th"
                                      scope="row"
                                      padding="dense"
                                      >
                                        {moment(n.createdAt).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                  <TableCell colSpan={6} />
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 20]}
                          component="div"
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          backIconButtonProps={{
                            "aria-label": "ຫນ້າກ່ອນຫນ້າ"
                          }}
                          nextIconButtonProps={{
                            "aria-label": "ຫນ້າຕໍ່ໄປ"
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          labelRowsPerPage="ແຖວຕໍ່ຫນ້າ"
                          labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} ໃນ ${count}`
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Grid
                          container
                          alignContent="center"
                          alignItems="center"
                          justify="center"
                          style={{ marginTop: "16px" }}
                        >
                          <Grid item align="center">
                            <Typography
                              variant="inherit"
                              style={{
                                padding: "24px",
                                color: "rgba(0, 0, 0, 0.54)",
                                fontSize: "0.75rem"
                              }}
                            >
                              ບໍ່ມີຂໍ້ມູນ
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Paper>
                </>
              ) : (
                <Paper
                  style={{
                    boxShadow: "none",
                    border: "1px solid #d8d8d8",
                    width: "100%",
                    borderRadius: 0,
                    marginTop: "16px"
                  }}
                >
                  <Grid
                    container
                    alignContent="center"
                    alignItems="center"
                    justify="center"
                  >
                    <Grid item align="center">
                      <CircularProgress style={{ padding: "24px" }} />
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>
            <Grid item xs sm lg md />
          </Grid>
        </ManageUserHeader>

        </div>
        <Dialog
          open={this.state.openDeleteConfirmationDialog}
          onClose={() => this.handleDeleteResearchConfirmationClose()}
          maxWidth="xs"
        >
          <DialogTitle style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}>
            ຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ບໍ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
            >
              ທ່ານກໍາລັງຈະລຶບຂໍ້ມູນຜູ້ສະຫມັກນີ້.
              ທ່ານແນ່ໃຈຫລືບໍ່ວ່າຈະລຶບຂໍ້ມູນດັ່ງກ່າວ?
              ການກະທໍາຕໍ່ໄປນີ້ບໍ່ສາມາດແກ້ໄຂໄດ້
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleDeleteResearchConfirmationClose()}
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={this.handleUserDeletetion}
              style={{ color: "#f44336" }}
              autoFocus
            >
              ຢືນຢັນ
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

RequestRegisterAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,

};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const enhance = compose(
  withRouter,
  withWidth(),
  withStyles(styles),
  connect(mapStateToProps, null),
)

export default enhance(RequestRegisterAdmin);
