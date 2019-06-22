import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import moment from "moment";

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
  Button
} from "@material-ui/core";

import { DeleteOutline, FilterListOutlined } from "@material-ui/icons";

import { lighten } from "@material-ui/core/styles/colorManipulator";

import {
  getAllResearchers,
  clearAllResearchers,
  removeResearchers
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
    disablePadding: true,
    label: "ຊື່ ແລະ ນາມສະກຸນ"
  },
  { id: "gender", numeric: false, disablePadding: true, label: "ເພດ", },
  { id: "department", numeric: false, disablePadding: true, label: "ພາກວິຊາ" },
  { id: "age", numeric: true, disablePadding: false, label: "ອາຍຸ" }
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
      rowCount,
      
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
  const { numSelected, classes, openDeleteDialog  } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="inherit">
            ເລືອກ {numSelected} ລາຍການ
          </Typography>
        ) : (
          <Typography
            variant="inherit"
            style={{ fontSize: "1.375rem", fontWeight: "bold" }}
            id="tableTitle"
          >
            ນັກຄົ້ນຄວ້າ
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => {
                openDeleteDialog()
              }}
            >
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListOutlined />
            </IconButton>
          </Tooltip>
        )}
      </div>
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
    openDeleteConfirmationDialog: false
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
    this.props.dispatch(getAllResearchers()).then(response => {
      this.setState({
        data: this.props.user.allUsers
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  handleOpenDeleteConfirmationDialog() {
    this.setState({
      openDeleteConfirmationDialog: true
    })
  }

  handleDeleteResearchConfirmationClose() {
    this.setState({
      openDeleteConfirmationDialog: false
    })
  }

  handleResearcherDeletetion = () => {
    this.props.dispatch(removeResearchers(this.state.selected)).then(response=>{
      console.log(response.payload.success)
      if (response.payload.success) {
        this.props.dispatch(getAllResearchers()).then(response => {
        this.setState({
          data: this.props.user.allUsers,
          openDeleteConfirmationDialog: false,
          selected: []
        });
        
      });
      }
      
    })
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
     <>
     <Grid
     container
     spacing={0}
     style={{ paddingTop: "24px", paddingBottom: "24px" }}
   >
     <Grid item xs sm lg md />

     <Grid item xs={11} sm={11} lg={11} md={11}>
       <Paper
         style={{
           boxShadow: "none",
           border: "1px solid #d8d8d8",
           width: "100%"
         }}
       >
         <EnhancedTableToolbar
           numSelected={selected.length}
           selected={this.state.selected}
           openDeleteDialog = {()=>{this.handleOpenDeleteConfirmationDialog()}}
            
         />
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
                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .map(n => {
                   const isSelected = this.isSelected(n._id);
                   return (
                     <TableRow
                       hover
                       onClick={event => this.handleClick(event, n._id)}
                       role="checkbox"
                       aria-checked={isSelected}
                       tabIndex={-1}
                       key={n.id}
                       selected={isSelected}
                       
                     >
                       <TableCell padding="checkbox">
                         <Checkbox color="primary" checked={isSelected} />
                       </TableCell>
                       <TableCell component="th" scope="row" padding="none">
                         <Typography variant="inherit">{`${n.prefix} ${
                           n.name
                         } ${n.lastname}`}</Typography>
                       </TableCell>
                       <TableCell align="left" component="th" scope="row" padding="none">
                       <Typography variant="inherit">{`${
                        n.gender.name
                      }`}</Typography>{" "}
                        
                       </TableCell>
                       <TableCell align="left" component="th" scope="row" padding="none">
                         {" "}
                         <Typography variant="inherit">{`${
                           n.affiliation.department.name
                         }`}</Typography>{" "}
                       </TableCell>
                       <TableCell align="right" >{moment().diff(n.dateOfBirth, 'years',false)}</TableCell>
                   
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
     </Grid>
     <Grid item xs sm lg md />
   </Grid>
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
         <Button onClick={() => this.handleDeleteResearchConfirmationClose()}>
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
    user: state.user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ResearcherAdmin));
