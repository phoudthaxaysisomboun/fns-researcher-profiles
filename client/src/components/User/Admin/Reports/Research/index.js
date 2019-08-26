import React, { Component } from "react";
import ResearchReportsHeader from "../../../../../hoc/research_reports_header";

import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";

import { withRouter } from "react-router-dom";

import Chart from "react-apexcharts";

import moment from "moment";

import { connect } from "react-redux";

import {
  // getAllResearchersReports,
  getDepartments
  // clearAllResearchersReports
} from "../../../../../actions/user_actions";
import { getAllResearchesNumbersReports } from "../../../../../actions/research_actions";

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  // TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  // Checkbox,
  IconButton,
  Tooltip,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
  Input,
  TextField
} from "@material-ui/core";

import { SaveAltOutlined } from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
// const ExcelRow = ReactExport.ExcelFile.ExcelRow;

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

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      // onSelectAllClick,
      order,
      // orderBy,
      // numSelected,
      // rowCount,
      rows
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
      by,
      endValue,
      startValue,
      handleEndChange,
      handleEndBlur,
      handleStartChange,
      handleStartBlur,
      handleByChange
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
                ຈໍານວນຜົນງານຄົ້ນຄວ້າ{" "}
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

              <FormControl
                style={{
                  minWidth: 120,
                  textAlign: "-webkit-left",
                  marginRight: "8px"
                }}
              >
                <InputLabel shrink htmlFor="age-label-placeholder">
                  ຕາມ
                </InputLabel>
                <Select
                  value={by}
                  onChange={event => {
                    handleByChange(event);
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
                >
                  <MenuItem
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans serif"
                    }}
                    value={"researchType"}
                  >
                    <Typography variant="inherit">ປະເພດຜົນງານ</Typography>{" "}
                  </MenuItem>
                  <MenuItem
                    style={{
                      fontFamily: "'Noto Sans Lao UI', sans serif"
                    }}
                    value={"publicationType"}
                  >
                    <Typography variant="inherit">ປະເພດການຕີພິມ</Typography>{" "}
                  </MenuItem>
                </Select>
              </FormControl>
              {by === "researchType" ? (
                <ExcelFile
                  filename={`ລາຍງານຈໍານວນຜົນງານຄົ້ນຄວ້າ ຄວທ ແບ່ງຕາມປະເພດຜົນງານ (${moment(
                    startValue
                  ).format("DD-MM-YYYY")} - ${moment(endValue).format(
                    "DD-MM-YYYY"
                  )})`}
                  element={
                    <Tooltip title="ດາວໂຫລດຟາຍລ໌ Excel">
                      <IconButton style={{ marginRight: "0px" }}>
                        <SaveAltOutlined />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ExcelSheet
                    data={data}
                    name="ລາຍງານຈໍານວນຜົນງານຄົ້ນຄວ້າ ຄວທ ແບ່ງຕາມປະເພດຜົນງານ"
                  >
                    <ExcelColumn name="Saysettha OT" label="ລ/ດ" value="no" />
                    <ExcelColumn label="ປະເພດຜົນງານ" value="name" />
                    <ExcelColumn label="ຕີພິມພາຍໃນ" value="nationalCount" />
                    <ExcelColumn
                      label="ຕີພິມພາຍຕ່າງປະເທດ"
                      value="internationalCount"
                    />
                    <ExcelColumn label="ທັງຫມົດ" value="count" />
                    {
                      // <ExcelColumn label="Marital Status"
                      //            value={(col) => col.is_married ? "Married" : "Single"}/>
                    }
                  </ExcelSheet>
                </ExcelFile>
              ) : (
                <ExcelFile
                  filename={`ລາຍງານຈໍານວນຜົນງານຄົ້ນຄວ້າ ຄວທ ແບ່ງຕາມປະເພດການຕີພິມ (${moment(
                    startValue
                  ).format("DD-MM-YYYY")} - ${moment(endValue).format(
                    "DD-MM-YYYY"
                  )})`}
                  element={
                    <Tooltip title="ດາວໂຫລດຟາຍລ໌ Excel">
                      <IconButton style={{ marginRight: "0px" }}>
                        <SaveAltOutlined />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ExcelSheet
                    data={data}
                    name="ລາຍງານຈໍານວນຜົນງານຄົ້ນຄວ້າ ຄວທ ແບ່ງຕາມປະເພດການຕີພິມ"
                  >
                    <ExcelColumn name="Saysettha OT" label="ລ/ດ" value="no" />
                    <ExcelColumn label="ປະເພດການຕີພິມ" value="name" />
                    <ExcelColumn label="ທັງຫມົດ" value="count" />
                    {
                      // <ExcelColumn label="Marital Status"
                      //            value={(col) => col.is_married ? "Married" : "Single"}/>
                    }
                  </ExcelSheet>
                </ExcelFile>
              )}
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

class ResearchNumbersReports extends Component {
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
    by: "researchType",
    start: moment("1996-05-11").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD"),
    rows: [
      {
        id: "no",
        numeric: false,
        disablePadding: false,
        label: "ລ/ດ"
      },
      {
        id: "countByDepartment",
        numeric: false,
        disablePadding: false,
        label: "ປະເພດ"
      },
      {
        id: "countByDepartment",
        numeric: false,
        disablePadding: false,
        label: "ພາຍໃນ"
      },
      {
        id: "countByDepartment",
        numeric: false,
        disablePadding: false,
        label: "ຕ່າງປະເທດ"
      },
      {
        id: "countByDepartment",
        numeric: false,
        disablePadding: false,
        label: "ທັງຫມົດ"
      }
    ],
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

    optionsByPub: {
      chart: {
        id: "apexchart-example",

        width: "100%",
        height: "100%"
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
        palette: "palette3",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65
        }
      }
    },
    seriesByPub: []
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
    this.props.dispatch(getDepartments());
    this.props
      .dispatch(
        getAllResearchesNumbersReports(
          "",
          this.state.start,
          this.state.end,
          this.state.by
        )
      )
      .then(response => {
        this.setState({
          data: this.props.research.allResearchesListsReports,
          rowsPerPage: this.props.research.allResearchesListsReports.length
        });
      });
    // this.props
    //   .dispatch(getAllResearchersReports("", this.state.start, this.state.end))
    //   .then(response => {
    //     this.setState({
    //       data: this.props.user.allResearchersReports,
    //       rowsPerPage: this.props.user.allResearchersReports.length
    //     });
    //   });
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
    console.log("click");
  };

  handleByChange = event => {
    this.setState({
      by: event.target.value
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
        getAllResearchesNumbersReports(
          this.state.department,
          this.state.start,
          this.state.end,
          this.state.by
        )
      )
      .then(response => {
        this.setState({
          data: this.props.research.allResearchesListsReports,
          rowsPerPage: this.props.research.allResearchesListsReports.length
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
        getAllResearchesNumbersReports(
          this.state.department,
          this.state.start,
          this.state.end,
          this.state.by
        )
      )
      .then(response => {
        this.setState({
          data: this.props.research.allResearchesListsReports,
          rowsPerPage: this.props.research.allResearchesListsReports.length
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevDepartment = prevState.department;
    const currDepartment = this.state.department;

    const prevData = prevState.data;
    const currData = this.state.data;

    const prevBy = prevState.by;
    const currBy = this.state.by;

    if (prevBy !== currBy) {
      this.props
        .dispatch(
          getAllResearchesNumbersReports(
            this.state.department,
            this.state.start,
            this.state.end,
            this.state.by
          )
        )
        .then(response => {
          this.setState({
            data: this.props.research.allResearchesListsReports,
            rowsPerPage: this.props.research.allResearchesListsReports.length
          });
        });
    }

    if (prevData !== currData && currData.length > 0) {
      if (currBy === "researchType") {
        this.setState({
          rows: [
            {
              id: "no",
              numeric: false,
              disablePadding: false,
              label: "ລ/ດ"
            },
            {
              id: "countByDepartment",
              numeric: false,
              disablePadding: false,
              label: "ປະເພດ"
            },
            {
              id: "countByDepartment",
              numeric: false,
              disablePadding: false,
              label: "ພາຍໃນ"
            },
            {
              id: "countByDepartment",
              numeric: false,
              disablePadding: false,
              label: "ຕ່າງປະເທດ"
            },
            {
              id: "countByDepartment",
              numeric: false,
              disablePadding: false,
              label: "ທັງຫມົດ"
            }
          ]
        });
      } else {
        this.setState({
          rows: [
            {
              id: "no",
              numeric: false,
              disablePadding: false,
              label: "ລ/ດ"
            },
            {
              id: "countByDepartment",
              numeric: false,
              disablePadding: false,
              label: "ປະເພດຕີພິມ"
            },
            {
              id: "countByDepartment",
              numeric: false,
              disablePadding: false,
              label: "ທັງຫມົດ"
            }
          ]
        });
      }

      if (this.state.data.length > 0) {
        let name = [];
        let countByResearchType = [];
        let countNationalPublication = [];
        let countInternationalPublication = [];

        let countByPublicationType = [];

        this.state.data.map(function(el, index, array) {
          var o = Object.assign({}, el);
          if (o["name"] !== "ລວມ") {
            name.push(o.name);
            countByResearchType.push(o["count"]);
            countByPublicationType.push(o["count"]);
            countNationalPublication.push(o["nationalCount"]);
            countInternationalPublication.push(o["internationalCount"]);
          } else {
          }
          return null;
        });

        let newlabelData = { ...this.state.options };
        newlabelData["labels"] = name;

        this.setState({
          options: newlabelData,
          optionsByPub: newlabelData,
          series: countByResearchType,
          seriesByPub: countByPublicationType
          // seriesDegree: countByDegree,
          // seriesGender: countByGender,
          // seriesAge: countByAge
        });
      }
    }

    if (prevDepartment !== currDepartment) {
      this.props
        .dispatch(
          getAllResearchesNumbersReports(
            this.state.department,
            this.state.start,
            this.state.end,
            this.state.by
          )
        )
        .then(response => {
          this.setState({
            data: this.props.research.allResearchesListsReports,
            rowsPerPage: this.props.research.allResearchesListsReports.length
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
        <ResearchReportsHeader
          props={this.props}
          children={this.props.children}
          tab={this.state.tabNumber}
          changeTab={tabNumber => this.changeTab(tabNumber)}
          width={this.props.width}

        >
          <Grid
            container
            spacing={0}
            style={{ paddingTop: "0", paddingBottom: "24px",paddingLeft:
            this.props.width === "xl"
              ? 240
              : this.props.width === "lg"
              ? 180
              : 0 }}
          >
            <Grid item xs sm lg md />

            <Grid item xs={11} sm={11} lg={11} md={11}>
              {this.props.research.allResearchesListsReports ? (
                <>
                  {console.log(this.state.data)}
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={this.state.selected}
                    data={this.state.data}
                    departments={this.props.user.departments}
                    selectedValue={this.state.department}
                    handleDepartmentChange={event =>
                      this.handleDepartmentChange(event)
                    }
                    by={this.state.by}
                    handleByChange={event => this.handleByChange(event)}
                    endValue={this.state.end}
                    startValue={this.state.start}
                    handleEndChange={event => this.handleEndChange(event)}
                    handleEndBlur={event => this.handleEndBlur(event)}
                    handleStartChange={event => this.handleStartChange(event)}
                    handleStartBlur={event => this.handleStartBlur(event)}
                  />
                  <Grid container spacing={8}>
                    <Grid item lg={8} sm={12}>
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
                              rows={this.state.rows}
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
                                        {console.log(n)}
                                        {n.no}
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        <Typography variant="inherit">{`${n.name}`}</Typography>
                                      </TableCell>
                                      {this.state.by === "researchType" ? (
                                        <>
                                          <TableCell
                                            component="th"
                                            scope="row"
                                            padding="dense"
                                          >
                                            <Typography variant="inherit">{`${n.nationalCount}`}</Typography>
                                          </TableCell>
                                          <TableCell
                                            component="th"
                                            scope="row"
                                            padding="dense"
                                          >
                                            <Typography variant="inherit">{`${n.internationalCount}`}</Typography>
                                          </TableCell>
                                        </>
                                      ) : null}
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="dense"
                                      >
                                        <Typography variant="inherit">{`${n.count}`}</Typography>
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
                    </Grid>
                    <Grid item lg={4} sm={12}>
                      {this.state.by === "researchType" ? (
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
                            ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມປະເພດ
                          </Typography>
                          {this.state.rowsPerPage > 1 ? (
                            <Chart
                              options={this.state.options}
                              labels={this.state.options.labels}
                              series={this.state.series}
                              props
                              type="pie"
                              height={260}
                            />
                          ) : null}
                        </Paper>
                      ) : (
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
                            ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມການຕີພິມ
                          </Typography>
                          {this.state.rowsPerPage > 1 ? (
                            <Chart
                              options={this.state.optionsByPub}
                              labels={this.state.optionsByPub.labels}
                              series={this.state.seriesByPub}
                              props
                              type="pie"
                              height={260}
                            />
                          ) : null}
                        </Paper>
                      )}
                    </Grid>
                  </Grid>
                  {console.log(this.state.data.length)}
                  {
                    // {this.state.department === "" &&
                    // this.state.series.length > 0 ? (
                    //   <Grid container spacing={16} style={{ marginTop: "16px" }}>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           maxHeight: "400px",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມພາກ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.options}
                    //           labels={this.state.department}
                    //           series={this.state.series}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມວຸດທິ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.optionsDegree}
                    //           labels={this.state.optionsDegree.labels}
                    //           series={this.state.seriesDegree}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມເພດ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.optionsGender}
                    //           labels={this.state.optionsGender.labels}
                    //           series={this.state.seriesGender}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງອາຍຸ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.optionsAge}
                    //           labels={this.state.optionsAge.labels}
                    //           series={this.state.seriesAge}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //   </Grid>
                    // ) : (
                    //   <Grid container spacing={16} style={{ marginTop: "16px" }}>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມວຸດທິ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.optionsDegree}
                    //           labels={this.state.optionsDegree.labels}
                    //           series={this.state.seriesDegree}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງຕາມເພດ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.optionsGender}
                    //           labels={this.state.optionsGender.labels}
                    //           series={this.state.seriesGender}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //     <Grid item lg={4} md={6} sm={6} xs={12}>
                    //       <Paper
                    //         style={{
                    //           boxShadow: "none",
                    //           border: "1px solid #d8d8d8",
                    //           padding: "16px"
                    //         }}
                    //       >
                    //         <Typography
                    //           variant="inherit"
                    //           style={{
                    //             fontSize: "18px",
                    //             fontWeight: 500
                    //           }}
                    //         >
                    //           ຈໍານວນຜົນງານຄົ້ນຄວ້າແບ່ງອາຍຸ
                    //         </Typography>
                    //         <Chart
                    //           options={this.state.optionsAge}
                    //           labels={this.state.optionsAge.labels}
                    //           series={this.state.seriesAge}
                    //           props
                    //           type="pie"
                    //           height={260}
                    //         />
                    //       </Paper>
                    //     </Grid>
                    //   </Grid>
                    // )}
                  }
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
        </ResearchReportsHeader>
      </>
    );
  }
}

ResearchNumbersReports.propTypes = {
  classes: PropTypes.object.isRequired, 
  width: PropTypes.string.isRequired

};

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
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

export default enhance(ResearchNumbersReports);