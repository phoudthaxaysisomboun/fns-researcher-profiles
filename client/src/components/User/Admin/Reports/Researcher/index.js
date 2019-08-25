import React, { Component } from "react";
import RsearcherReportsHeader from "../../../../../hoc/researcher_reports_header";

import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import compose from 'recompose/compose';
import withWidth from '@material-ui/core/withWidth';

import { withRouter } from "react-router-dom";

import Chart from "react-apexcharts";

import moment from "moment";

import { connect } from "react-redux";

import {
  getAllResearchersReports,
  getDepartments,
  clearAllResearchersReports
} from "../../../../../actions/user_actions";

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
  FormHelperText,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
  FormControl,
  CircularProgress,
  Input,
  TextField
} from "@material-ui/core";

import {
  DeleteOutline,
  FilterListOutlined,
  EditOutlined,
  VisibilityOutlined,
  SaveAltOutlined
} from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const ExcelRow = ReactExport.ExcelFile.ExcelRow;

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
    label: "ລ/ດ"
  },
  {
    id: "deapartmentName",
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
    id: "countByDepartment",
    numeric: false,
    disablePadding: false,
    label: "ທັງຫມົດ"
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
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
              >
                {!row.hideSortIcon ? (
                  <>
                    <TableSortLabel
                      direction={order}
                      active={false}
                      hover={false}
                      hideSortIcon={true}
                    >
                      {row.label}
                    </TableSortLabel>
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
  state = {
    labelWidth: 0
  };

  render() {
    const {
      numSelected,
      classes,
      researchersCount,
      departments,
      data,
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
            </div>
          </Grid>
          <Grid item xs={6} align="right">
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
              <ExcelFile
                filename={`ລາຍງານຈໍານວນນັກຄົ້ນຄວ້າ ຄວທ (${moment(
                  startValue
                ).format("DD/MM/YYYY")}-${moment(endValue).format(
                  "DD/MM/YYYY"
                )})`}
                element={
                  <Tooltip title="ດາວໂຫລດຟາຍລ໌ Excel">
                    <IconButton style={{ marginRight: "0px" }}>
                      <SaveAltOutlined />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ExcelSheet data={data} name="ຈໍານວນນັກຄົ້ນຄວ້າ ຄວທ">
                  <ExcelColumn name="Saysettha OT" label="ລ/ດ" value="no" />
                  <ExcelColumn label="ພາກວິຊາ" value="deapartmentName" />
                  <ExcelColumn label="ປະລິນຍາຕີ" value="bachelorCount" />
                  <ExcelColumn label="ປະລິນຍາໂທ" value="masterCount" />
                  <ExcelColumn label="ປະລິນຍາເອກ" value="doctorialCount" />
                  <ExcelColumn label="ຍິງ" value="femaleCount" />
                  <ExcelColumn label="ຊາຍ" value="maleCount" />
                  <ExcelColumn label="18-30" value="age18to30Count" />
                  <ExcelColumn label="31-45" value="age31to45Count" />
                  <ExcelColumn label="46-65" value="age46to65Count" />
                  <ExcelColumn label="ທັງຫມົດ" value="countByDepartment" />
                  {
                    // <ExcelColumn label="Marital Status"
                    //            value={(col) => col.is_married ? "Married" : "Single"}/>
                  }
                </ExcelSheet>
              </ExcelFile>
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
  }
});

class AllResearcherReports extends Component {
  state = {
    tabNumber: 0,
    order: "asc",
    orderBy: "",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 1,
    department: "",
    departmentText: "ທັງຫມົດ",
    start: moment("1996-05-11").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD"),
    options: {
      chart: {
        id: "apexchart-example"

        // width: "100%",
        // height: "300"
      },
      // xaxis: {
      //   categories: departmentName
      // },
      labels: [],
      dataLabels: {
        formatter: function(val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      theme: {
        mode: "light",
        palette: "palette2",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      }
    },
    series: [],

    optionsDegree: {
      chart: {
        id: "apexchart-example",

        width: "100%",
        height: "100%"
      },
      // xaxis: {
      //   categories: departmentName
      // },
      labels: ["ປະລິນຍາຕີ", "ປະລິນຍາໂທ", "ປະລິນຍາເອກ"],
      dataLabels: {
        formatter: function(val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      theme: {
        mode: "light",
        palette: "palette3",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      }
    },
    seriesDegree: [],

    optionsGender: {
      chart: {
        id: "apexchart-example",

        width: "100%"
      },
      labels: ["ຊາຍ", "ຍິງ"],
      dataLabels: {
        formatter: function(val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      theme: {
        mode: "light",
        palette: "palette4",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      }
    },
    seriesGender: [],

    optionsAge: {
      chart: {
        id: "apexchart-example",

        width: "100%"
      },
      labels: ["18-30", "31-45", "46-65"],
      dataLabels: {
        formatter: function(val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      theme: {
        mode: "light",
        palette: "palette5",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      }
    },
    seriesAge: []
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
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillMount() {
    console.log(this.props.width)
    this.props.dispatch(getDepartments());
    this.props
      .dispatch(getAllResearchersReports("", this.state.start, this.state.end))
      .then(response => {
        this.setState({
          data: this.props.user.allResearchersReports,
          rowsPerPage: this.props.user.allResearchersReports.length
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

  handleDepartmentChange = event => {
    this.setState({
      department: event.target.value,
      departmentText: event.nativeEvent.srcElement.innerText
    });
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
    this.props
      .dispatch(
        getAllResearchersReports(
          this.state.department,
          this.state.start,
          this.state.end
        )
      )
      .then(response => {
        this.setState({
          data: this.props.user.allResearchersReports,
          rowsPerPage: this.props.user.allResearchersReports.length
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

    this.props
      .dispatch(
        getAllResearchersReports(
          this.state.department,
          this.state.start,
          this.state.end
        )
      )
      .then(response => {
        this.setState({
          data: this.props.user.allResearchersReports,
          rowsPerPage: this.props.user.allResearchersReports.length
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevDepartment = prevState.department;
    const currDepartment = this.state.department;

    const prevData = prevState.data;
    const currData = this.state.data;

    if (prevData !== currData && currData.length > 0) {
      if (this.props.user.allResearchersReports.length > 0) {
        let departmentName = [];
        let countByDepartment = [];

        let countByDegree = [];
        let countByGender = [];
        let countByAge = [];

        this.state.data.map(function(el, index, array) {
          var o = Object.assign({}, el);
          if (o["deapartmentName"] !== "ລວມ") {
            departmentName.push(o.deapartmentName);
            countByDepartment.push(o["countByDepartment"]);

            countByDegree[0] = o["bachelorCount"];
            countByDegree[1] = o["masterCount"];
            countByDegree[2] = o["doctorialCount"];
            countByGender[0] = o["maleCount"];
            countByGender[1] = o["femaleCount"];
            countByAge[0] = o["age18to30Count"];
            countByAge[1] = o["age31to45Count"];
            countByAge[2] = o["age46to65Count"];
          } else {
            countByDegree[0] = o["bachelorCount"];
            countByDegree[1] = o["masterCount"];
            countByDegree[2] = o["doctorialCount"];
            countByGender[0] = o["maleCount"];
            countByGender[1] = o["femaleCount"];
            countByAge[0] = o["age18to30Count"];
            countByAge[1] = o["age31to45Count"];
            countByAge[2] = o["age46to65Count"];
          }
          return null;
        });

        let newlabelData = { ...this.state.options };
        newlabelData["labels"] = departmentName;

        this.setState({
          options: newlabelData,
          series: countByDepartment,
          seriesDegree: countByDegree,
          seriesGender: countByGender,
          seriesAge: countByAge
        });
      }
    }

    if (prevDepartment !== currDepartment) {
      this.props
        .dispatch(
          getAllResearchersReports(
            this.state.department,
            this.state.start,
            this.state.end
          )
        )
        .then(response => {
          this.setState({
            data: this.props.user.allResearchersReports,
            rowsPerPage: this.props.user.allResearchersReports.length
          });
        });
    }
  }

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
          width={this.props.width}
        >
          <Grid
            container
            spacing={0}
            style={{ paddingTop: "0", paddingBottom: "24px", paddingLeft: this.props.width === "xl" ? 240 : this.props.width === "lg" ? 180 : 0 }}
          >
            <Grid item xs sm lg md />

            <Grid item xs={11} sm={11} lg={11} md={11}>
              {this.props.user.allResearchersReports ? (
                <>
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={this.state.selected}
                    data={this.state.data}
                    departments={this.props.user.departments}
                    selectedValue={this.state.department}
                    handleDepartmentChange={event =>
                      this.handleDepartmentChange(event)
                    }
                    endValue={this.state.end}
                    startValue={this.state.start}
                    handleEndChange={event => this.handleEndChange(event)}
                    handleEndBlur={event => this.handleEndBlur(event)}
                    handleStartChange={event => this.handleStartChange(event)}
                    handleStartBlur={event => this.handleStartBlur(event)}
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
                          {stableSort(data, getSorting(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((n, index) => {
                              return (
                                <TableRow tabIndex={-1} key={n.id}>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    {n.no}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.deapartmentName
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
                                      n.countByDepartment
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
                  </Paper>
                  {this.state.department === "" &&
                  this.state.series.length > 0 ? (
                    <Grid container spacing={16} style={{ marginTop: "16px" }}>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            maxHeight: "400px",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງຕາມພາກ
                          </Typography>
                          <Chart
                            options={this.state.options}
                            labels={this.state.department}
                            series={this.state.series}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງຕາມວຸດທິ
                          </Typography>
                          <Chart
                            options={this.state.optionsDegree}
                            labels={this.state.optionsDegree.labels}
                            series={this.state.seriesDegree}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງຕາມເພດ
                          </Typography>
                          <Chart
                            options={this.state.optionsGender}
                            labels={this.state.optionsGender.labels}
                            series={this.state.seriesGender}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງອາຍຸ
                          </Typography>
                          <Chart
                            options={this.state.optionsAge}
                            labels={this.state.optionsAge.labels}
                            series={this.state.seriesAge}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container spacing={16} style={{ marginTop: "16px" }}>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງຕາມວຸດທິ
                          </Typography>
                          <Chart
                            options={this.state.optionsDegree}
                            labels={this.state.optionsDegree.labels}
                            series={this.state.seriesDegree}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງຕາມເພດ
                          </Typography>
                          <Chart
                            options={this.state.optionsGender}
                            labels={this.state.optionsGender.labels}
                            series={this.state.seriesGender}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                      <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Paper
                          style={{
                            boxShadow: "none",
                            border: "1px solid #d8d8d8",
                            padding: "16px"
                          }}
                        >
                          <Typography
                            variant="inherit"
                            style={{
                              fontSize: "18px",
                              fontWeight: 500
                            }}
                          >
                            ຈໍານວນນັກຄົ້ນຄວ້າແບ່ງອາຍຸ
                          </Typography>
                          <Chart
                            options={this.state.optionsAge}
                            labels={this.state.optionsAge.labels}
                            series={this.state.seriesAge}
                            props
                            type="pie"
                            height={260}
                          />
                        </Paper>
                      </Grid>
                    </Grid>
                  )}
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
    user: state.user,
    width: PropTypes.string.isRequired,

  };
};

const enhance = compose(
  withRouter,
  withWidth(),
  withStyles(styles),
  connect(mapStateToProps, null),
)

export default enhance(AllResearcherReports);