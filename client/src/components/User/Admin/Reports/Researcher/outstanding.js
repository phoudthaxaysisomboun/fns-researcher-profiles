import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

// import Chart from "react-apexcharts";

import {  withRouter } from "react-router-dom";

import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";

import moment from "moment";

import RsearcherReportsHeader from "../../../../../hoc/researcher_reports_header";

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
  // IconButton,
  Tooltip,
  CircularProgress,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Input,
  TextField
} from "@material-ui/core";

// import { SaveAltOutlined } from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import {
  // clearAllResearchersListsReports,
  // getAllResearchersListsReports,
  getDepartments,
  getOutstandingReports
} from "../../../../../actions/user_actions";
// function createData(name, calories, fat, carbs, protein) {
//   counter += 1;
//   return { id: counter, name, calories, fat, carbs, protein };
// }

// import ReactExport from "react-data-export";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


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
    id: "no",
    numeric: false,
    disablePadding: false,
    label: "ລ/ດ",
    hideSortIcon: true,
    active: false
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "ຊື່ ແລະ ນາມສະກຸນ"
  },
  {
    id: "affiliation.department",
    numeric: false,
    disablePadding: false,
    label: "ພາກວິຊາ"
  },
  {
    id: "degree",
    numeric: false,
    disablePadding: false,
    label: "ວຸດທິ"
  },
  {
    id: "outstanding.date",
    numeric: false,
    disablePadding: false,
    label: "ວັນໄດ້ຮັບ"
  },
  {
    id: "outstanding.description",
    numeric: false,
    disablePadding: false,
    label: "ລາຍລະອຽດ"
  }
  // {
  //   id: "actions",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "",
  //   hideSortIcon: true,
  //   active: false
  // }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
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

class EnhancedTableToolbar extends React.Component {
  render() {
    const {
      numSelected,
      // selected,
      classes,
      researchersCount,
      departments,
      // data,
      selectedValue,
      handleDepartmentChange,
      endValue,
      startValue,
      handleEndChange,
      handleEndBlur,
      handleStartChange,
      handleStartBlur
    } = this.props;
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
                ລາຍຊື່ນັກຄົ້ນຄວ້າດີເດັ່ນ{" "}
                <div
                  style={{
                    fontWeight: "normal",
                    display: "inline",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#898989",
                    fontSize: "16px"
                  }}
                >
                  {researchersCount}
                </div>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8} align="right">
            <div className={classes.actions}>
              <FormControl
                style={{
                  minWidth: 120,
                  textAlign: "-webkit-left",
                  marginRight: "8px"
                }}
              >
                <TextField
                  id="standard-name"
                  label="ແຕ່"
                  value={startValue}
                  onChange={event => {
                    handleStartChange(event);
                  }}
                  onBlur={event => {
                    handleStartBlur(event);
                  }}
                  type="date"
                  margin="none"
                />
              </FormControl>
              <FormControl
                style={{
                  minWidth: 120,
                  textAlign: "-webkit-left",
                  marginRight: "8px"
                }}
              >
                <TextField
                  id="standard-name"
                  label="ຮອດ"
                  value={endValue}
                  onChange={event => {
                    handleEndChange(event);
                  }}
                  onBlur={event => {
                    handleEndBlur(event);
                  }}
                  type="date"
                  margin="none"
                />
              </FormControl>

              <FormControl
                style={{
                  minWidth: 120,
                  textAlign: "-webkit-left",
                  marginRight: "8px"
                }}
              >
                <InputLabel shrink htmlFor="age-label-placeholder">
                  ພາກວິຊາ
                </InputLabel>
                <Select
                  value={selectedValue}
                  onChange={event => {
                    handleDepartmentChange(event);
                  }}
                  style={{ borderBottom: 0, marginTop: "16px" }}
                  input={
                    <Input
                      style={{
                        fontFamily: "'Noto Sans Lao UI', sans serif",
                        borderBottom: 0
                      }}
                      id="age-label-placeholder"
                    />
                  }
                  displayEmpty
                >
                  <MenuItem
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans serif",
                      borderBottom: 0
                    }}
                    value=""
                  >
                    <em
                      style={{
                        fontFamily: "'Noto Sans Lao UI', sans serif",
                        fontStyle: "normal"
                      }}
                    >
                      ທັງຫມົດ
                    </em>
                  </MenuItem>
                  {departments.map((value, index, id) => (
                    <MenuItem
                      style={{
                        fontFamily: "'Noto Sans Lao UI', sans serif"
                      }}
                      value={value._id}
                    >
                      <Typography variant="inherit">{value.name}</Typography>{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
{
            // <ExcelFile
            //   name="ລາຍຊື່ນັກຄົ້ນຄວ້າດີເດັ່ນ"
            //   element={
            //     <Tooltip title="ດາວໂຫລດຟາຍລ໌ Excel">
            //       <IconButton style={{ marginRight: "0px" }}>
            //         <SaveAltOutlined />
            //       </IconButton>
            //     </Tooltip>
            //   }
            // >
            //   <ExcelSheet data={data} name="ລາຍຊື່ນັກຄົ້ນຄວ້າດີເດັ່ນ">
            //     <ExcelColumn label="ລ/ດ" value="no" />
            //     <ExcelColumn label="ຊື່ ແລະ ນາມສະກຸນ" value="myName" />
          
            //     <ExcelColumn label="ພາກວິຊາ" value="affiliation.department" />

            //     <ExcelColumn label="ວຸດທິ" value="degree" />
            //     <ExcelColumn label="ວັນໄດ້ຮັບ" value="outstandingDate" />
            //     <ExcelColumn label="ລາຍລະອຽດ" value="outstanding.description" />
            //     {
            //       // <ExcelColumn label="Marital Status"
            //       //            value={(col) => col.is_married ? "Married" : "Single"}/>
            //     }
            //   </ExcelSheet>
            // </ExcelFile>
          
            }
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    );
  }
}

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
  },mainContainer: {
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

class OutstandingResearchersList extends React.Component {
  state = {
    order: "desc",
    orderBy: "outstanding.date",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    tabNumber: 2,
    department: "",
    departmentText: "ທັງຫມົດ",
    start: moment("1996-05-11").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD")
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
    this.props.history.push(`/profile/${id}`);
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
    document.title = "ລາຍງານນັກຄົ້ນຄວ້າດີເດັ່ນ - FNS Researcher Profiles";
    this.props.dispatch(getDepartments());


    this.props
      .dispatch(
        getOutstandingReports(
            this.state.orderBy,
            this.state.order,
            this.state.department,
            this.state.start,
            this.state.end
        )
      )
      .then(response => {
        this.setState({
          data: this.props.user.outstandingReports
        });
      });
  }

  componentWillUnmount() {
    // this.props.dispatch(clearAllResearchers())
  }

  componentDidUpdate(prevProps, prevState) {
    const prevDepartment = prevState.department;
    const currDepartment = this.state.department;
    if (prevDepartment !== currDepartment) {
      // this.props.dispatch(clearAllResearchersListsReports());
      this.props
        .dispatch(
          getOutstandingReports(
            this.state.orderBy,
            this.state.order,
            this.state.department,
            this.state.start,
            this.state.end
          )
        )
        .then(response => {
          this.setState({
            data: this.props.user.outstandingReports
          });
        });
    }
    if (
      prevState.order !== this.state.order ||
      prevState.orderBy !== this.state.orderBy
    ) {
      this.props
        .dispatch(
          getOutstandingReports(
            this.state.orderBy,
            this.state.order,
            this.state.department,
            this.state.start,
            this.state.end
          )
        )
        .then(response => {
          this.setState({
            data: this.props.user.outstandingReports
          });
        });
    }
  }

  handleDepartmentChange = event => {
    this.setState({
      department: event.target.value,
      departmentText: event.nativeEvent.srcElement.innerText
    });
    console.log("click");
  };

  handleEndChange = event => {
    this.setState({ end: event.target.value });
  };

  handleEndBlur = event => {
    if (
      this.state.end > moment().format("YYYY-MM-DD") ||
      this.state.end < this.state.start
    ) {
      this.setState({ end: moment().format("YYYY-MM-DD") });
    }

    // this.props.dispatch(clearAllResearchersListsReports());
    this.props
      .dispatch(
        getOutstandingReports(
          this.state.orderBy,
          this.state.order,
          this.state.department,
          this.state.start,
          this.state.end
        )
      )
      .then(response => {
        this.setState({
          data: this.props.user.outstandingReports
        });
      });
  };

  handleStartChange = event => {
    this.setState({ start: event.target.value });
  };

  handleStartBlur = event => {
    if (
      this.state.start > moment().format("YYYY-MM-DD") ||
      this.state.start > this.state.end
    ) {
      this.setState({ start: moment().format("YYYY-MM-DD") });
    }

    // this.props.dispatch(clearAllResearchersListsReports());
    this.props
      .dispatch(
        getOutstandingReports(
          this.state.orderBy,
          this.state.order,
          this.state.department,
          this.state.start,
          this.state.end
        )
      )
      .then(response => {
        this.setState({
          data: this.props.user.outstandingReports
        });
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

        <RsearcherReportsHeader
          props={this.props}
          children={this.props.children}
          tab={this.state.tabNumber}
          changeTab={tabNumber => this.changeTab(tabNumber)}
          width={this.props.width}
        >
          <Grid
            container
            spacing={0}
            style={{ paddingTop: "0", paddingBottom: "24px", }}
          >
            <Grid item xs sm lg md />

            <Grid item xs={11} sm={11} lg={11} md={11}>
              {this.props.user.outstandingReports ? (
                <>
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={this.state.selected}
                    openDeleteDialog={() => {
                      this.handleOpenDeleteConfirmationDialog();
                    }}
                    openAddUserDialog={() => {
                      this.handleOpenAddUserDialog();
                    }}
                    researchersCount={
                      this.props.user.outstandingReportsCount
                        ? `(${this.props.user.outstandingReportsCount})`
                        : null
                    }
                    selectedValue={this.state.department}
                    handleDepartmentChange={event =>
                      this.handleDepartmentChange(event)
                    }
                    departments={this.props.user.departments}
                    endValue={this.state.end}
                    startValue={this.state.start}
                    handleEndChange={event => this.handleEndChange(event)}
                    handleEndBlur={event => this.handleEndBlur(event)}
                    handleStartChange={event => this.handleStartChange(event)}
                    handleStartBlur={event => this.handleStartBlur(event)}
                    data={this.state.data}
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
                            .map((n, index) => {
                              return (
                                <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={n.id}
                                  onClick={event =>
                                    this.handleClick(event, n._id)
                                  }
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    {index + 1}
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
                                    {" "}
                                    <Typography variant="inherit">{`${
                                      n["affiliation.department"]
                                    }`}</Typography>{" "}
                                  </TableCell>
                                  
                                  <TableCell padding="dense">
                                    <Typography variant="inherit">
                                      {n["degree"] ? `${n["degree"]}` : ""}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    {moment(n["outstanding.date"]).format("DD/MM/YYY")}
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    {n["outstanding.description"]}
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
                      rowsPerPageOptions={[10, 15, 20]}
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
        </RsearcherReportsHeader>
      </div>
        </>
    );
  }
}

OutstandingResearchersList.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
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
  connect(
    mapStateToProps,
    null
  )
);

export default enhance(OutstandingResearchersList);