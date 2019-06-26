import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link, withRouter } from "react-router-dom";

import moment from "moment";

import FormField from "../../../utils/Form/formfield"
import {update,
    generateData,
    isFormValid,
    populateOptionFields} from "../../../utils/Form/formActions"

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
  EditOutlined,
  VisibilityOutlined,
  CloseOutlined
} from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import {
  getNotOutstandingResearcher,
  clearAllResearchers,
  removeResearchers,
  addOutstandingResearcher,
  getRequestUserCount
} from "../../../../actions/user_actions";
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
  { id: "dateOfBirth", numeric: false, disablePadding: false, label: "ອາຍຸ" },
  {
    id: "degree.name",
    numeric: false,
    disablePadding: false,
    label: "ວຸດທິການສຶກສາ"
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
    selected,
    classes,
    openDeleteDialog,
    researchersCount,
    openAddUserDialog,
    handleAddNewUser,
    openAddOutstandingResearcherDialog,
    userId
  } = props;
  let isUser = false;
  selected.map((value, index, array) => {
    if (value === userId) {
      return (isUser = true);
    } else {
      return null;
    }
  });
  return (
    <>
      {numSelected > 0 ? (
        <Toolbar
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0
          })}
          style={{ paddingLeft: 0, paddingRight: 0, borderWidth: "1px" }}
        >
          <Grid container alignItems="center" style={{}}>
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
                ) : null}
              </div>
            </Grid>
            <Grid item xs={5} align="right">
              <div className={classes.actions}>
                {numSelected > 0 ? (
                  <>
                  <Button variant="contained" color="primary" style={{marginRight: "16px"}} onClick={()=> {openAddOutstandingResearcherDialog()}}>
                  ເພີ່ມເປັນນັກຄົ້ນຄວ້າດີເດັ່ນ
                </Button>
                  </>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      ) : null}
    </>
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
  }
});

class AddOutstandingResearcherDialog extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    openDeleteConfirmationDialog: false,
    tabNumber: 0,
    openAddUserDialog: false,
    openAddOutstandingResearcherDialog: false,
    formError: false,
    formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ",
    formSuccess: false,
    formdata: {
        date: {
            element: "date",
            value: "",
            config: {
              label: "ວັນໄດ້ຮັບ",
              name: "date_input",
              type: "date"
            },
            validation: {
              required: true
            },
            valid: false,
            touched: false,
            validationMessage: ""
          },
          description: {
            element: "input",
            value: "",
            config: {
              name: "abstract_input",
              type: "text",
              label: "ຄໍາອະທິບາຍ",
    
              placeholder: "",
              multiline: true,
              rows: 3
            },
            validation: {
              required: false
            },
            valid: false,
            touched: false,
            validationMessage: ""
          },
    }
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

  handleOpenAddOutstandingDialog() {
    this.setState({
        openAddOutstandingResearcherDialog: true
      });
  }
  handleCloseAddOutstandingDialog() {
    this.setState({
        openAddOutstandingResearcherDialog: false
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
      "ເຄຶ່ອງມືຈັດການນັກຄົ້ນຄວ້າ(ຂໍສະຫມັກ)-FNS Researcher Profiles";
    this.props.dispatch(getNotOutstandingResearcher()).then(response => {
      this.setState({
        data: this.props.user.notOutstandingResearcher
      });
    });
    this.props.dispatch(getRequestUserCount());
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

  handleAddNewUser() {
    this.props.dispatch(getNotOutstandingResearcher()).then(response => {
      this.setState({
        data: this.props.user.notOutstandingResearcher,
        openAddUserDialog: false
      });
    });
  }

  handleDeleteResearchConfirmationClose() {
    this.setState({
      openDeleteConfirmationDialog: false
    });
  }

  handleResearcherDeletetion = () => {
    this.props
      .dispatch(removeResearchers(this.state.selected))
      .then(response => {
        console.log(response.payload.success);
        if (response.payload.success) {
          this.props.dispatch(getNotOutstandingResearcher()).then(response => {
            this.setState({
              data: this.props.user.notOutstandingResearcher,
              openDeleteConfirmationDialog: false,
              selected: []
            });
          });
        }
      });
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");

    if (this.state.formdata.gender.value.trim() === "") {
      const newFormdata = {
        ...this.state.formdata
      };
      const newElement = {
        ...newFormdata["gender"]
      };
      newElement.error = true;
      newFormdata["gender"] = newElement;
  
      this.setState({ formdata: newFormdata });
    }
    else {
      const newFormdata = {
        ...this.state.formdata
      };
      const newElement = {
        ...newFormdata["gender"]
      };
      newElement.error = false;
      newFormdata["gender"] = newElement;
  
      this.setState({ formdata: newFormdata });
      
    }
    
    if (
      formIsValid &&
      this.state.formdata.password.value.trim() ===
        this.state.formdata.confirmPassword.value.trim() && !this.state.formdata.gender.error
    ) {
      const newDataToSubmit = {
        ...dataToSubmit,
        affiliation: {
          department: `${dataToSubmit.department}`,
          position: `${dataToSubmit.position}`
        },
        emailIsVerified: true,
        accountIsVerified: true
      };
      delete newDataToSubmit.department;
      delete newDataToSubmit.position;

      // this.props
      //   .dispatch(registerUser(newDataToSubmit))
      //   .then(response => {
      //     if (response.payload.success) {
      //       this.setState({
      //         formError: false,
      //         formSuccess: true
      //       });
      //       this.props.save()
      //     } else {
      //       console.log(response.payload);
      //       this.setState({
      //         formError: true,
      //         formErrorMessage: "ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດສະຫມັກສະມາຊິກໄດ້"
      //       });
      //     }
      //   })
      //   .catch(e => {
      //     this.setState({
      //       formError: true,
      //       formErrorMessage: `ຂໍອະໄພມີບາງຢ່າງຜິດພາດ,ບໍ່ສາມາດສະຫມັກສະມາຊິກໄດ້ (error: ${e})`
      //     });
      //   });
    } else {
      this.setState({
        formError: true,
        formErrorMessage: "ມີບາງຂໍ້ມູນບໍ່ຖືກຕ້ອງກະລຸນາກວດສອບຂໍ້ມູນຄືນ"
      });
    }
  };


  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.close()}
          aria-labelledby="max-width-dialog-title"
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle style={{ padding: 0 }}>
            <Grid container>
              <Grid
                item
                xs={9}
                style={{
                  padding: "24px",
                  fontWeight: "bold",
                  fontFamily: "'Noto Sans Lao UI', sans serif"
                }}
              >
                <Typography variant="inherit">{`ເລືອກນັກຄົ້ນຄວ້າ`}</Typography>
              </Grid>
              <Grid item xs align="right" style={{ padding: "16px" }}>
                <IconButton
                  onClick={() => this.props.close()}
                  style={{ padding: 0, margin: "8px", marginBottom: 0 }}
                >
                  <CloseOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent style={{ padding: "24px", paddingTop: 0 }}>
            {this.props.user.notOutstandingResearcher ? (
              <>
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  selected={this.state.selected}
                  openAddOutstandingResearcherDialog={() => {
                    this.handleOpenAddOutstandingDialog();
                  }}
                  openAddUserDialog={() => {
                    this.handleOpenAddUserDialog();
                  }}
                  researchersCount={
                    this.props.user.allUsers
                      ? `(${this.props.user.notOutstandingResearcher.length})`
                      : null
                  }
                  userId={this.props.user.userData._id}
                />
                <Paper
                  style={{
                    boxShadow: "none",
                    border: "1px solid #d8d8d8",

                    borderRadius: 0
                  }}
                >
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
                                  <Typography variant="inherit">{`${n.prefix} ${
                                    n.name
                                  } ${n.lastname}`}</Typography>
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
                                <TableCell align="left" padding="dense">
                                  {moment().diff(n.dateOfBirth, "years", false)}
                                </TableCell>
                                <TableCell padding="dense">
                                  <Typography variant="inherit">
                                    {n["degree.name"]
                                      ? `${n["degree.name"]}`
                                      : ""}
                                  </Typography>
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
                    rowsPerPageOptions={[10, 15, 25]}
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
                </Paper>

                <Dialog
                  open={this.state.openAddOutstandingResearcherDialog}
                  onClose={() => this.handleCloseAddOutstandingDialog()}
                  maxWidth="xs"
                >
                  <DialogTitle
                    style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
                  >
                    ເພີ່ມນັກຄົ້ນຄວ້າດີເດັ່ນ?
                  </DialogTitle>
                  <DialogContent>
                  <form onSubmit={event => this.submitForm(event)}>
                  <Grid container spacing={24}>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"date"}
                    formdata={this.state.formdata.date}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <FormField
                    id={"description"}
                    formdata={this.state.formdata.description}
                    change={element => this.updateForm(element)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24} style={{ marginTop: "24px" }}>
                <Grid
                  item
                  xs={6}
                  align="left"
                  style={{ display: "flex", alignItems: "center" }}
                >
                </Grid>

                <Grid item xs={6} align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    href="/register"
                    onClick={event => this.submitForm(event)}
                    type="submit"
                  >
                    ບັນທຶກ
                  </Button>
                </Grid>
              </Grid>
                  </form>
                  </DialogContent>
                  <DialogActions>
                    <Button
                    onClick={() => this.handleCloseAddOutstandingDialog()}
                    >
                      ຍົກເລີກ
                    </Button>
                    <Button
                      onClick={this.handleResearcherDeletetion}
                      style={{ color: "#f44336" }}
                      autoFocus
                    >
                      ຢືນຢັນ
                    </Button>
                  </DialogActions>
                </Dialog>
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
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

AddOutstandingResearcherDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(AddOutstandingResearcherDialog))
);
