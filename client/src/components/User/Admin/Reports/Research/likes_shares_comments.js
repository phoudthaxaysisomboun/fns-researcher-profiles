import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link, withRouter } from "react-router-dom";

import moment from "moment";

import compose from "recompose/compose";
import withWidth from "@material-ui/core/withWidth";

import ResearchReportsHeader from "../../../../../hoc/research_reports_header";

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
  getDepartments
} from "../../../../../actions/user_actions";

import {
  getAllResearchesListsReports,
  getPublicationType,
  getResearchType
} from "../../../../../actions/research_actions";
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
    numeric: true,
    disablePadding: false,
    label: "ລ/ດ",
    hideSortIcon: true,
    active: false
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "ຫົວເລື່ອງ"
  },
  {
    id: "author",
    numeric: false,
    disablePadding: false,
    label: "ຜູ້ຮັບຜິດຊອບ"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "ວັນທີ"
  },
  {
    id: "researchType",
    numeric: false,
    disablePadding: false,
    label: "ປະເພດຜົນງານ"
  },
  {
    id: "publicationType",
    numeric: false,
    disablePadding: false,
    label: "ການຕີພິມ"
  },
  {
    id: "likes",
    numeric: false,
    disablePadding: false,
    label: "ຖຶກໃຈ"
  },
  {
    id: "comments",
    numeric: false,
    disablePadding: false,
    label: "ຄໍາເຫັນ"
  },
  {
    id: "shares",
    numeric: false,
    disablePadding: false,
    label: "ແຊຣ໌"
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
      handleStartBlur,
      handlePublicationTypeChange,
      handleResearchTypeChange,
      researchType,
      publicationType,
      selectedResearchType,
      selectedPublicationType
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
                ລາຍການຜົນງານຄົ້ນຄວ້າ{" "}
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

              <FormControl
                style={{
                  minWidth: 120,
                  textAlign: "-webkit-left",
                  marginRight: "8px"
                }}
              >
                <InputLabel shrink htmlFor="age-label-placeholder">
                  ປະເພດຜົນງານ
                </InputLabel>
                <Select
                  value={selectedResearchType}
                  onChange={event => {
                    handleResearchTypeChange(event);
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
                  {researchType.map((value, index, id) => (
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
                  ການຕີພິມ
                </InputLabel>
                <Select
                  value={selectedPublicationType}
                  onChange={event => {
                    handlePublicationTypeChange(event);
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
                  {publicationType.map((value, index, id) => (
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
              //   <ExcelFile
              //   filename={`ລາຍງານຈໍານວນຖືກໃຈ, ຄໍາເຫັນ, ແຊຣ໌ຜົນງານຄົ້ນຄວ້າ (${moment(startValue).format("DD-MM-YYYY")} - ${moment(endValue).format("DD-MM-YYYY")}) ${selectedValue} ຄວທ`}
              //   element={
              //     <Tooltip title="ດາວໂຫລດຟາຍລ໌ Excel">
              //       <IconButton style={{ marginRight: "0px" }}>
              //         <SaveAltOutlined />
              //       </IconButton>
              //     </Tooltip>
              //   }
              // >
              //   <ExcelSheet data={data} name="ລາຍການຜົນງານຄົ້ນຄວ້າ">
              //     <ExcelColumn label="ລ/ດ" value="no" />
              //     <ExcelColumn label="ຫົວເລື່ອງ" value="title" />
              //     <ExcelColumn label="ຜູ້ຮັບຜິດຊອບ" value="author" />
              //     <ExcelColumn label="ວັນທີ" value="date" />
              //     <ExcelColumn label="ປະເພດຜົນງານ" value="researchType" />
              //     <ExcelColumn label="ການຕີພິມ" value="publicationType" />
              //     <ExcelColumn label="ຖືກໃຈ" value="likes" />
              //     <ExcelColumn label="ຄໍາເຫັນ" value="comments" />
              //     <ExcelColumn label="ແຊຣ໌" value="shares" />
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

class ResearchLikesCommentsSharesReports extends React.Component {
  state = {
    order: "desc",
    orderBy: "likes",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    tabNumber: 2,
    department: "",
    researchType: "",
    publicationType: "",
    departmentText: "ທັງຫມົດ",
    start: moment("1996-05-11").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD"),
    useCanvas: false,
    options: {
      chart: {
        id: "apexchart-example"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: "series-2",
        data: [16, 85, 41, 63, 49, 25, 62, 85]
      }
    ]
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
    this.props.history.push(`/research/${id}`);
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
    document.title = "ລາຍງານຜົນງານຄົ້ນຄວ້າ - FNS Researcher Profiles";

    this.props.dispatch(getDepartments());
    this.props.dispatch(getResearchType());
    this.props.dispatch(getPublicationType());

    this.props
      .dispatch(getAllResearchesListsReports("", "", "", "", "", "", ""))
      .then(response => {
        this.setState({
          data: this.props.research.listResearchesListReports
        });
      });
  }

  componentWillUnmount() {
    // this.props.dispatch(clearAllResearchers())
  }

  getData() {
    this.props
      .dispatch(
        getAllResearchesListsReports(
          this.state.department,
          this.state.start,
          this.state.end,
          this.state.researchType,
          this.state.publicationType,
          this.state.order,
          this.state.orderBy,
        )
      )
      .then(response => {
        this.setState({
          data: this.props.research.listResearchesListReports
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevDepartment = prevState.department;
    const currDepartment = this.state.department;

    const prevResearchType = prevState.researchType;
    const currResearchType = this.state.researchType;

    const prevPublicationType = prevState.publicationType;
    const currPublicationType = this.state.publicationType;

    if (
      prevDepartment !== currDepartment ||
      prevResearchType !== currResearchType ||
      prevPublicationType !== currPublicationType
    ) {
      // this.props.dispatch(clearAllResearchersListsReports());
      this.getData();
    }
    if (
      prevState.order !== this.state.order ||
      prevState.orderBy !== this.state.orderBy
    ) {
      this.getData();
    }
  }

  handleResearchTypeChange = event => {
    this.setState({
      researchType: event.target.value
    });
  };

  handlePublicationTypeChange = event => {
    this.setState({
      publicationType: event.target.value
    });
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

    // this.props.dispatch(clearAllResearchersListsReports());
    this.getData();
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
    this.getData();
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <>
      <div className={classes.mainContainer}>

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
            style={{ paddingTop: "0", paddingBottom: "24px", }}
          >
            <Grid item xs sm lg md />

            <Grid item xs={11} sm={11} lg={11} md={11}>
              {this.props.research.listResearchesListReports ? (
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
                      this.props.research.listResearchesListReportsCount
                        ? `(${this.props.research.listResearchesListReportsCount})`
                        : null
                    }
                    selectedValue={this.state.department}
                    handleDepartmentChange={event =>
                      this.handleDepartmentChange(event)
                    }
                    handleResearchTypeChange={event =>
                      this.handleResearchTypeChange(event)
                    }
                    selectedResearchType = {this.state.researchType}
                    selectedPublicationType = {this.state.publicationType}
                    handlePublicationTypeChange={event =>
                      this.handlePublicationTypeChange(event)
                    }
                    departments={this.props.user.departments}
                    publicationType={this.props.research.publicationType}
                    researchType={this.props.research.researchType}
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
                                    <Link
                                      to={`/research/${n._id}`}
                                      style={{
                                        textDecoration: "none",
                                        color: "inherit"
                                      }}
                                    >
                                      <Typography variant="inherit">{`${
                                        n.title
                                      }`}</Typography>
                                    </Link>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.author
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell align="left" padding="dense">
                                    {n.date}
                                  </TableCell>
                                  <TableCell padding="dense">
                                    <Typography variant="inherit">
                                      {n.researchType}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.publicationType}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.likes}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.comments}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.shares}
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

              <div />
            </Grid>
            <Grid item xs sm lg md />
          </Grid>
        </ResearchReportsHeader>
      </div>
        </>
    );
  }
}

ResearchLikesCommentsSharesReports.propTypes = {
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

export default enhance(ResearchLikesCommentsSharesReports);