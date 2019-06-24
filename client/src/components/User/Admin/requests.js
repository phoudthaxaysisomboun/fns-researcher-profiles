import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Link, withRouter } from "react-router-dom";

import moment from "moment";

import ManageUserHeader from "../../../hoc/manage_user_header"

import AddUserDialog from "../Admin/Dialog/add_user"

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

import {
 getRequestUser,
 confirmUser,
 removeUser
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
  },
  {
    id: "researchCount",
    numeric: false,
    disablePadding: false,
    label: "ຈໍານວນຜົນງານຄົ້ນຄວ້າ"
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
    hideSortIcon: true,
    active: false
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
  const { numSelected, classes, openDeleteDialog, researchersCount, openAddUserDialog, handleAddNewUser } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
      style={{paddingLeft: 0, paddingRight: 0, borderWidth: "1px",}}
    >
    <Grid container alignItems="center" style={{marginTop: "16px", marginBottom: "16px"}}>
      <Grid item xs>
      <div >
        {numSelected > 0 ? (
          <Typography style={{marginLeft: "24px"}} color="inherit" variant="inherit">
            ເລືອກ {numSelected} ລາຍການ
          </Typography>
        ) : (
          <Typography
            variant="inherit"
            style={{ fontSize: "20px", fontWeight: "500", paddingLeft: 0, marginLeft: 0 }}
            id="tableTitle"
   
          >
            ນັກຄົ້ນຄວ້າ{" "}
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
      <div className={classes.actions} >
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => {
                openDeleteDialog();
              }}
              style={{marginRight: "8px"}}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        ) : (
          <>
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" style={{marginRight: "8px"}}>
              <FilterListOutlined />
            </IconButton>
          </Tooltip>
          <Button variant="contained" color="primary" onClick={() => {
            openAddUserDialog();
          }}>
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

class RequestRegisterAdmin extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 10,
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
    })
  }

  handleOpenAddUserDialog() {
    this.setState({
      openAddUserDialog: true
    })
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
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <>
      <ManageUserHeader
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
            {this.props.user.allUsers ? (
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
                    this.props.user.allUsers
                      ? `(${this.props.user.allUsers.length})`
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
                
                <div className={classes.tableWrapper}>
                  <Table className={classes.table} aria-labelledby="tableTitle">
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
                              <TableCell
                                padding="dense"
                                component="th"
                                scope="row"
                              >
                                {n.researchCount}
                              </TableCell>
                              {selected.length === 0 ? (
                                <TableCell
                                  align="right"
                                  component="th"
                                  scope="row"
                                >
                                  
                                  <Tooltip title="ແກ້ໄຊ">
                                    <IconButton
                                      onClick={() => {
                                        console.log("click");
                                      }}
                                    >
                                      <EditOutlined fontSize="small" />
                                    </IconButton>
                                    
                                  </Tooltip>
                                  <Tooltip title="ເບິ່ງ">
                                    <IconButton
                                      component={Link}
                                      to={`/profile/${n._id}`}
                                    >
                                      <VisibilityOutlined fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="ລຶບ">
                                    <IconButton
                                      aria-label="Delete"
                                      onClick={() => {
                                        console.log("click");
                                      }}
                                    >
                                      <DeleteOutline fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="right"
                                  component="th"
                                  scope="row"
                                >
                                  
                                  <Tooltip title="ແກ້ໄຊ">
                                    <IconButton
                                      disabled
                                      onClick={() => {
                                        console.log("click");
                                      }}
                                    >
                                      <EditOutlined fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="ເບິ່ງ">
                                    <IconButton
                                      disabled
                                      onClick={() => {
                                        console.log("click");
                                      }}
                                    >
                                      <VisibilityOutlined fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="ລຶບ">
                                    <IconButton
                                      disabled
                                      aria-label="Delete"
                                      onClick={() => {
                                        console.log("click");
                                      }}
                                    >
                                      <DeleteOutline fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              )}
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
                  borderRadius: 0
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
              onClick={this.handleUserDeletetion}
              style={{ color: "#f44336" }}
              autoFocus
            >
              ຢືນຢັນ
            </Button>
          </DialogActions>
        </Dialog>

        <AddUserDialog
          open={this.state.openAddUserDialog}
          close={() => this.handleAddUserDialogClose()}
          save ={()=>{this.handleAddNewUser()}}
        />

      </>
    );
  }
}

RequestRegisterAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(RequestRegisterAdmin))
);
