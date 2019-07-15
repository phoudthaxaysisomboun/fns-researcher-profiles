import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link, withRouter } from "react-router-dom";

import LinesEllipsis from "react-lines-ellipsis";

import moment from "moment";

import ManageResearchHeader from "../../../hoc/manage_research_header";

import AddResearch from "../../utils/Dialogs/add_research";

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
  VisibilityOutlined
} from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import { getAllResearches } from "../../../actions/research_actions";
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
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "ຫົວຂໍ້"
  },
  {
    id: "uploaderName",
    numeric: false,
    disablePadding: false,
    label: "ຜູ້ອັບໂຫລດ"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "ວັນທີ"
  },
  {
    id: "researchTypeName",
    numeric: false,
    disablePadding: false,
    label: "ປະເພດຜົນງານ"
  },
  {
    id: "publicationTypeName",
    numeric: false,
    disablePadding: false,
    label: "ປະເພດວາລະສານ"
  },
  {
    id: "reads",
    numeric: false,
    disablePadding: false,
    label: "ອ່ານ"
  },
  {
    id: "downloads",
    numeric: false,
    disablePadding: false,
    label: "ດາວໂຫລດ"
  },
  {
    id: "likes",
    numeric: false,
    disablePadding: false,
    label: "ຖືກໃຈ"
  },
  {
    id: "comments",
    numeric: false,
    disablePadding: false,
    label: "ຄໍາເຫັນ"
  },
  {
    id: "citations",
    numeric: false,
    disablePadding: false,
    label: "ນໍາໄປອ້າງອີງ"
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
    researchesCount,
    openAddResearchDialog,
    handleAddNewUser,
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
                ຜົນງານຄົ້ນຄວ້າ{" "}
                <div
                  style={{
                    fontWeight: "normal",
                    display: "inline",
                    fontFamily: "'Roboto', sans-serif",
                    color: "#898989",
                    fontSize: "16px"
                  }}
                >
                  {researchesCount}
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
                            to={`/research/${selected[0]}`}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    openAddResearchDialog()
                  }}
                >
                  ເພີ່ມ
                </Button>
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

class ResearcherAdmin extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
    openDeleteConfirmationDialog: false,
    tabNumber: 0,
    openAddResearchDialog: false
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

  componentDidMount() {}

  componentWillMount() {
    document.title = "ເຄຶ່ອງມືຈັດການຜົນງານຄົ້ນຄວ້າ - FNS Researcher Profiles";
    this.props.dispatch(getAllResearches()).then(response => {
      this.setState({
        data: this.props.research.allResearches
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

  handleAddResearchClose = () => {
    this.setState({
      openAddResearchDialog: false
    });
  };

  handleAddResearchOpen = () => {
    this.setState({
      openAddResearchDialog: true
    });
  };

  handleResearcherDeletetion = () => {
    // this.props
    //   .dispatch(removeResearchers(this.state.selected))
    //   .then(response => {
    //     console.log(response.payload.success);
    //     if (response.payload.success) {
    //       this.props.dispatch(getAllResearches()).then(response => {
    //         this.setState({
    //           data: this.props.research.allResearches,
    //           openDeleteConfirmationDialog: false,
    //           selected: []
    //         });
    //       });
    //     }
    //   });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <>
        <ManageResearchHeader
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
              {this.props.research.allResearches ? (
                <>
                  <EnhancedTableToolbar
                    numSelected={selected.length}
                    selected={this.state.selected}
                    openDeleteDialog={() => {
                      this.handleOpenDeleteConfirmationDialog();
                    }}
                  
                    openAddResearchDialog={() => {
                      this.handleAddResearchOpen();
                    }}
                  
                    researchesCount={
                      this.props.research.allResearches
                        ? `(${this.props.research.allResearches.length})`
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
                                    <Typography variant="inherit">
                                      {`${n.title}`}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    {n.uploader.prefix ? (
                                      <Typography variant="inherit">
                                        {`${n.uploader.prefix} ${
                                          n.uploader.name
                                        } `}
                                      </Typography>
                                    ) : (
                                      <Typography variant="inherit">
                                        {`${n.uploader.name} `}
                                      </Typography>
                                    )}
                                    {n.uploader.lastname ? (
                                      <Typography variant="inherit">
                                        {`${n.uploader.lastname}`}
                                      </Typography>
                                    ) : null}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">
                                      {moment(n.date).format("D/MM/YYYY")}
                                    </Typography>{" "}
                                  </TableCell>

                                  <TableCell
                                    align="left"
                                    component="th"
                                    scope="row"
                                    padding="dense"
                                  >
                                    <Typography variant="inherit">{`${
                                      n.researchType.name
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell align="left" padding="dense">
                                    <Typography variant="inherit">{`${
                                      n.publicationType.name
                                    }`}</Typography>
                                  </TableCell>
                                  <TableCell padding="dense">
                                    <Typography variant="inherit">
                                      {n.reads.length ? n.reads.length : 0}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.downloads.length
                                        ? n.downloads.length
                                        : 0}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.likes.length ? n.likes.length : 0}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.comments.length
                                        ? n.comments.length
                                        : 0}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    padding="dense"
                                    component="th"
                                    scope="row"
                                  >
                                    <Typography variant="inherit">
                                      {n.citations.length
                                        ? n.citations.length
                                        : 0}
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
        </ManageResearchHeader>

        <AddResearch
          open={this.state.openAddResearchDialog}
          close={() => this.handleAddResearchClose()}
          authorSuggestions={
            this.props && this.props.user && this.props.user.authorSuggestions ? this.props.user.authorSuggestions : []
          }
          user = {
            this.props && this.props.user && this.props.user.userData ? this.props.user.userData : {}
          }
        />

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
              ທ່ານກໍາລັງຈະລຶບຂໍ້ມູນນັກຄົ້ນຄວ້ານີ້.
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
              onClick={this.handleResearcherDeletetion}
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

ResearcherAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(ResearcherAdmin))
);
