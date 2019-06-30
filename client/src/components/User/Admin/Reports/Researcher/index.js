import React, { Component } from "react";
import RsearcherReportsHeader from "../../../../../hoc/researcher_reports_header";

import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link, withRouter } from "react-router-dom";

import moment from "moment";

import { connect } from "react-redux";

import { getAllResearchersReports } from "../../../../../actions/user_actions";


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
  VisibilityOutlined
} from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  // console.log(stabilizedThis.map(el => el[0]))
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
    label: "ລ/ດ"
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "ພາກວິຊາ"
  },
  {
    id: "bachelorCount",
    numeric: false,
    disablePadding: false,
    label: "ປະລິນຍາຕີ"
  },
  {
    id: "masterCount",
    numeric: false,
    disablePadding: false,
    label: "ປະລິນຍາໂທ"
  },
  {
    id: "doctorialCount",
    numeric: false,
    disablePadding: false,
    label: "ປະລິນຍາເອກ"
  },
  {
    id: "femaleCount",
    numeric: false,
    disablePadding: false,
    label: "ຍິງ"
  },
  {
    id: "maleCount",
    numeric: false,
    disablePadding: false,
    label: "ຊາຍ"
  },
  {
    id: "age18to30Count",
    numeric: false,
    disablePadding: false,
    label: "18-30"
  },
  {
    id: "age31to45Count",
    numeric: false,
    disablePadding: false,
    label: "31-45"
  },
  {
    id: "age46to65Count",
    numeric: false,
    disablePadding: false,
    label: "46-65"
  },
  {
    id: "allCount",
    numeric: false,
    disablePadding: false,
    label: "ທັງຫມົດ"
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
    data,
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
                ຈໍານວນນັກຄົ້ນຄວ້າ{" "}
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
            )}
          </div>
        </Grid>
        <Grid item xs={5} align="right">
          <div className={classes.actions}>
            {numSelected > 0 ? (
              <>
                {!isUser ? (
                  <>
                    {numSelected === 1 ? (
                      <>
                        <Tooltip title="ແກ້ໄຂ">
                          <IconButton
                            onClick={() => {
                              console.log("click");
                            }}
                            style={{ marginRight: "0px" }}
                          >
                            <EditOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ເບິ່ງ">
                          <IconButton
                            component={Link}
                            to={`/profile/${selected[0]}`}
                            style={{ marginRight: "0px" }}
                          >
                            <VisibilityOutlined />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : null}
                    <Tooltip title="ລຶບ">
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          openDeleteDialog();
                        }}
                        style={{ marginRight: "8px" }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>{" "}
                  </>
                ) : (
                  <>
                    {numSelected === 1 ? (
                      <>
                        <Tooltip title="ແກ້ໄຂ">
                          <IconButton
                            onClick={() => {
                              console.log("click");
                            }}
                            style={{ marginRight: "0px" }}
                          >
                            <EditOutlined />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ເບິ່ງ">
                          <IconButton
                            component={Link}
                            to={`/profile/${selected[0]}`}
                            style={{ marginRight: "0px" }}
                          >
                            <VisibilityOutlined />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : null}
                    <Tooltip title="ລຶບ">
                      <IconButton
                        aria-label="Delete"
                        disabled
                        style={{ marginRight: "8px" }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </>
            ) : (
              <>
                <Tooltip title="Filter list">
                  <IconButton
                    aria-label="Filter list"
                    style={{ marginRight: "8px" }}
                  >
                    <FilterListOutlined />
                  </IconButton>
                </Tooltip>
                <ExcelFile name="ຈໍານວນນັກຄົ້ນຄວ້າ" element={<Button variant="contained" >Download Data</Button>}>
                <ExcelSheet data={data} name="ຈໍານວນນັກຄົ້ນຄວ້າ">
                    <ExcelColumn name="Saysettha OT" label="ລ/ດ" value={(col) => 1}/>
                    <ExcelColumn label="ປະລິນຍາຕີ" value="bachelorCount"/>
                    <ExcelColumn label="ປະລິນຍາໂທ" value="masterCount"/>
                    <ExcelColumn label="ປະລິນຍາເອກ" value="doctorialCount"/>
                    <ExcelColumn label="ຍິງ" value="femaleCount"/>
                    <ExcelColumn label="ຊາຍ" value="maleCount"/>
                    <ExcelColumn label="18-30" value="age18to30Count"/>
                    <ExcelColumn label="31-45" value="age31to45Count"/>
                    <ExcelColumn label="46-65" value="age46to65Count"/>
                    <ExcelColumn label="ທັງຫມົດ" value="allCount"/>
                    {
                      // <ExcelColumn label="Marital Status"
                      //            value={(col) => col.is_married ? "Married" : "Single"}/>
                    }
                </ExcelSheet>
                
            </ExcelFile>
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
  }
});

class AllResearcherReports extends Component {
  state = {
    tabNumber: 0,
    order: "asc",
    orderBy: "bachelorCount",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 1
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

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

  componentWillMount() {
    this.props.dispatch(getAllResearchersReports()).then(response => {
      this.setState({
        data: this.props.user.allResearchersReports
      });
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <>
        <RsearcherReportsHeader
          props={this.props}
          children={this.props.children}
          tab={this.state.tabNumber}
          changeTab={tabNumber => this.changeTab(tabNumber)}
        >
          <Grid
            container
            spacing={0}
            style={{ paddingTop: "0", paddingBottom: "24px" }}
          >
            <Grid item xs sm lg md />

            <Grid item xs={11} sm={11} lg={11} md={11}>
              {this.props.user.allResearchersReports ? (
                <>
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={this.state.selected}
                    data = {this.state.data}
                  />
                  <Paper
                    style={{
                      boxShadow: "none",
                      border: "1px solid #d8d8d8",

                      borderRadius: 0,
                      borderBottom: 0
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
                          {console.log(this.state.data)}
                          {stableSort(data, getSorting(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((n, index) => {
                              const isSelected = this.isSelected(n._id);
                              return (
                                <TableRow tabIndex={-1} key={n.id}>
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
                                      n.bachelorCount
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.bachelorCount
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.masterCount
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.doctorialCount
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.femaleCount
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.maleCount
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.age18to30Count
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.age31to45Count
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.age46to65Count
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.allCount
                                    }`}</Typography>
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
                    
                    {
                      //   <TablePagination
                      //   rowsPerPageOptions={[10, 15, 25]}
                      //   component="div"
                      //   count={data.length}
                      //   rowsPerPage={rowsPerPage}
                      //   page={page}
                      //   backIconButtonProps={{
                      //     "aria-label": "ຫນ້າກ່ອນຫນ້າ"
                      //   }}
                      //   nextIconButtonProps={{
                      //     "aria-label": "ຫນ້າຕໍ່ໄປ"
                      //   }}
                      //   onChangePage={this.handleChangePage}
                      //   onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      //   labelRowsPerPage="ແຖວຕໍ່ຫນ້າ"
                      //   labelDisplayedRows={({ from, to, count }) =>
                      //     `${from}-${to} ໃນ ${count}`
                      //   }
                      // />
                    }
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
      </>
    );
  }
}

AllResearcherReports.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(AllResearcherReports))
);
