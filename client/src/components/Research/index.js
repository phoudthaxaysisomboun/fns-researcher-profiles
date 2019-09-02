import React, { Component } from "react";

import ResearchHeader from "../../hoc/research_header";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import compose from 'recompose/compose';

import {
  // Hidden,
  Grid,
  Dialog,
  DialogTitle,
  // Divider,
  DialogContent,
  // IconButton,
  // Typography,
  Button,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { like, unlike, 
  // clearLike
 } from "../../actions/user_actions";

import {
  getResearchForCard,
  clearResearchCard,
  addLike,
  removeLike,
  clearLikeResearch,
  addCountToResearch,
  removeResearch,
  removeAuthor,
  // updateResearch,
  addShareCount
} from "../../actions/research_actions";

import { SizeMe } from 'react-sizeme'

// import { CloseOutlined } from "@material-ui/icons";
import { LOCALHOST } from "../utils/misc";
import ShareDialog from "../utils/Dialogs/share_research";
import AddResearch from "../utils/Dialogs/add_research";
import UpdateResearch from "../utils/Dialogs/edit_research";
import AddResearchButton from "../utils/Button/add_research_button";

import AbstractCard from "../Research/Card/abstract";
import FileViwerCard from "../Research/Card/file_viewer";

import { ObjectID } from "bson";


let shareUrl;
// let size = 0

const styles = theme => ({
  mainContainer: {
    [theme.breakpoints.up("xl")]: {
      // marginLeft: -12,
      // marginRight: 20,
      marginLeft: 0
    },
    [theme.breakpoints.down("lg")]: {
      // marginLeft: -12,
      // marginRight: 20,
      marginLeft: 60
    },
    [theme.breakpoints.down("md")]: {
      // marginLeft: -12,
      // marginRight: 20,
      marginLeft: 0
    },
  }
});
class Research extends Component {

  constructor(props){
    super(props)
    this.myInput = React.createRef()
  }

  state = {
    isAuthor: false,
    isUploader: false,
    isAuth: false,
    isAdmin: false,
    tabIndex: 0,
    anchorUploader: null,
    anchorCoAuthor: null,
    openDeleteResearchDialog: false,
    openRemoveAuthorResearchDialog: false,
    openRemoveAuthorDialog: false,
    openEditResearchDialog: false,
    openAddResearchDialog: false,
    openShareDialog: false,
    seeFullText: false,
    canvasSize: 0
  };

  handleShareDialogClose = () => {
    this.setState({
      openShareDialog: false
    })
  }

  handleShareDialogOpen = () => {
    this.setState({
      openShareDialog: true
    })
  }

  handleShareCount = () => {
    const _id = new ObjectID();
    this.props.dispatch(addShareCount(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id : "", this.props && this.props.user && this.props.user.userData && this.props.user.userData._id ? this.props.user.userData._id : _id.toHexString()
      ))
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

  handleEditResearchClose = () => {
    this.setState({
      openEditResearchDialog: false
    });
  };

  handleEditResearchOpen = () => {
    this.setState({
      openEditResearchDialog: true
    });
  };

  handleDeleteResearchDialogClose = () => {
    this.setState({
      openDeleteResearchDialog: false
    })
  }

  handleDeleteResearchDialogOpen = () => {
    this.setState({
      openDeleteResearchDialog: true
    })
  }

  handleRemoveAuthorResearchDialogClose = () => {
    this.setState({
      openRemoveAuthorResearchDialog: false
    })
  }

  handleRemoveAuthorResearchDialogOpen = () => {
    this.setState({
      openRemoveAuthorResearchDialog: true
    })
  }

  handleUploaderMenuClick = (event, id) => {
    this.setState({ anchorUploader: event.currentTarget });

  //   let educations = this.props.user.userDetail.education
  //   let obj = educations.find(o => o._id === id);
  //  this.setState({
  //   selectedEducation: obj
  //  })
  };
  

  handleRemoveResearch = () => {
    this.props.dispatch((removeResearch(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id
      : ""))).then(response=>{
        this.props.history.goBack()
      })
  }

  handleRemoveAuthor = () => {
    this.props.dispatch((removeAuthor(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id
      : "", this.props && this.props.user && this.props.user.userData ?this.props.user.userData._id : ""))).then(response => {
       
        this.setState({
          anchorCoAuthor: null,
          openRemoveAuthorResearchDialog: false
        })

        this.props.dispatch(getResearchForCard(this.props.research.userResearch[0]._id))
      })
  }

  handleUploaderMenuClose = () => {
    this.setState({ anchorUploader: null });
  };

  handleCoAuthorMenuClick = (event, id) => {
    this.setState({ anchorCoAuthor: event.currentTarget });
  };

  handleCoAuthorMenuClose = () => {
    this.setState({ anchorCoAuthor: null });
  };

  like = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(like(id)).then(() => {});
      this.props.dispatch(addLike(id)).then(() => {
        this.props.dispatch(getResearchForCard(id));
      });
    } else {
      console.log("You need to login");
    }
  };

  unlike = id => {
    if (this.props.user.userData.isAuth) {
      this.props.dispatch(unlike(id)).then(() => {});
      this.props.dispatch(removeLike(id)).then(() => {
        this.props.dispatch(getResearchForCard(id));
      });
    } else {
      console.log("You need to login");
    }
  };

  handleSeeFullText = () => {
    const _id = new ObjectID();
    
    this.setState({
      seeFullText: true
    })

    this.props.dispatch(addCountToResearch(this.props.research && this.props.research.userResearch
      ? this.props.research.userResearch[0]._id
      : "", this.props && this.props.user && this.props.user.userData && this.props.user.userData._id ? this.props.user.userData._id : _id.toHexString()))
  }

  componentDidMount() {
 
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    

    this.props.dispatch(getResearchForCard(id)).then(response => {
      shareUrl = `${LOCALHOST}/research/${response.payload[0]._id}`;
      document.title = `${response.payload[0].title} - FNS Researcher Profiles`;

      

      const author = response.payload[0].author.find(
        array => array._id === this.props.user.userData._id
      );
      const uploader =
        response.payload[0].uploader._id === this.props.user.userData._id;
      const auth = this.props.user.userData.isAuth;
      const admin = this.props.user.userData.isAdmin;

      if (author) {
        this.setState({
          isAuthor: true
        });
      }

      if (uploader) {
        this.setState({
          isUploader: true
        });
      }

      if (auth) {
        this.setState({
          isAuth: true
        });
      }

      if (admin) {
        this.setState({
          isAdmin: true
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearLikeResearch());
    this.props.dispatch(clearResearchCard());
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    if (prevProps.research.newResearch !== this.props.research.newResearch) {
      this.props.dispatch(getResearchForCard(id))
      this.setState({
        anchorUploader: false
      })
    }
  }



  render() {
const { classes } = this.props;

    return (
<div className={classes.mainContainer}>


      <ResearchHeader
        props={this.props}
        children={this.props.children}
        userData={this.props.user.userData}
        research={
          this.props.research && this.props.research.userResearch
            ? this.props.research.userResearch[0]
            : ""
        }
        openShareDialog={() => {
          this.handleShareDialogOpen();
        }}
        tabIndex ={this.state.tabIndex}
        runLike={id => this.like(id)}
        runUnLike={id => this.unlike(id)}

        anchorUploader={this.state.anchorUploader}
            anchorCoAuthor={this.state.anchorCoAuthor}
            handleUploaderMenuClick={(event, id) => {
              this.handleUploaderMenuClick(event, id);
            }}
            handleUploaderMenuClose={event => {
              this.handleUploaderMenuClose(event);
            }}
            handleCoAuthorMenuClick={(event) => {
              this.handleCoAuthorMenuClick(event);
            }}
            handleCoAuthorMenuClose={event => {
              this.handleCoAuthorMenuClose(event);
            }}

            openDeleteResearchDialog = {
              () => {
                this.handleDeleteResearchDialogOpen()
              }
            }
            openRemoveAuthorDialog = {
              () => {
                this.handleRemoveAuthorResearchDialogOpen()
              }
            }
            openEditResearch = {
              () => {
                this.handleEditResearchOpen()
              }
            }
      >
        <Grid
          container
          spacing={0}
          style={{ paddingTop: "24px", paddingBottom: "24px" }}
          justify="center"
        >
          <Grid item xs sm={1} lg={2} md={1} />

          <Grid item xs={11} sm={10} lg={8} md={10}>
            <AbstractCard
              user={this.props.user.userData}
              research={
                this.props.research && this.props.research.userResearch
                  ? this.props.research.userResearch[0]
                  : ""
              }
            />
            <SizeMe>
            {({ size }) =>  <FileViwerCard
            user={this.props.user.userData}
            research={
              this.props.research && this.props.research.userResearch
                ? this.props.research.userResearch[0]
                : ""
            }
            seeFullText = {this.state.seeFullText}
            handleSeeFullText = {
              () => {
                this.handleSeeFullText()
              }
            }

           size={size.width}
          />}
          </SizeMe>
           

          </Grid>

          <Grid item xs sm={1} lg={2} md={1} />
        </Grid>

        {
          this.props.user && this.props.user.userData.isAuth ?
          <>
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
        
          <UpdateResearch
          open={this.state.openEditResearchDialog}
          close={() => this.handleEditResearchClose()}
          authorSuggestions={ 
            this.props && this.props.user && this.props.user.authorSuggestions ? this.props.user.authorSuggestions : []
          }
          user = {
            this.props && this.props.user && this.props.user.userData ? this.props.user.userData : {}
          }

          _research = {
            this.props.research && this.props.research.userResearch
                  ? this.props.research.userResearch[0]
                  : {}
          }

          size= {this.size}
          
        />
        

        <Dialog
          open={this.state.openDeleteResearchDialog}
          maxWidth="xs"
        >
          <DialogTitle style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}>
            ຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ບໍ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
            >
            ທ່ານກຳລັງຈະລຶບຂໍ້ມູນຜົນງານການຄົ້ນຄວ້ານີ້.ທ່ານແນ່ໃຈຫລືບໍ່ວ່າຈະລຶບຂໍ້ມູນດັ່ງກ່າວ?
              ການກະທໍາຕໍ່ໄປນີ້ບໍ່ສາມາດແກ້ໄຂໄດ້
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleDeleteResearchDialogClose()}
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={this.handleRemoveResearch}
              style={{ color: "#f44336" }}
              autoFocus
            >
              ຢືນຢັນ
            </Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.openRemoveAuthorResearchDialog}
          maxWidth="xs"
        >
          <DialogTitle style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}>
            ຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ບໍ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              style={{ fontFamily: "'Noto Sans Lao UI', sans serif" }}
            >
            ທ່ານແນ່ໃຈທີ່ຈະລຶບຕົວເອງອອກຈາກຜົນງານການຄົ້ນຄວ້ານີ້ແທ້ບໍ່.ທ່ານແນ່ໃຈຫລືບໍ່ວ່າຈະລຶບຂໍ້ມູນດັ່ງກ່າວ?
              ການກະທໍາຕໍ່ໄປນີ້ບໍ່ສາມາດແກ້ໄຂໄດ້
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleRemoveAuthorResearchDialogClose()}
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={this.handleRemoveAuthor}
              style={{ color: "#f44336" }}
              autoFocus
            >
              ຢືນຢັນ
            </Button>
          </DialogActions>
        </Dialog>
        <AddResearchButton add={()=> this.handleAddResearchOpen()} />

        <ShareDialog
          open={this.state.openShareDialog}
          close={() => this.handleShareDialogClose()}
          url={shareUrl}
          profile={this.props && this.props.user && this.props.user.userDetail ? this.props.user.userDetail : null}
          user={this.props.user.userData ? this.props.user.userData : this.props}
          handleShareCount = {()=>{this.handleShareCount()}}
          title = {this.props.research && this.props.research.userResearch && this.props.research.userResearch[0].title
            ? `${this.props.research.userResearch[0].title} - FNS Researcher Profiles`
            : ""}
          description = {this.props.research && this.props.research.userResearch
            && this.props.research.userResearch[0].title? `${this.props.research.userResearch[0].title} - FNS Researcher Profiles`
            : ""}
        />

          </> : null
        }
      </ResearchHeader>
    </div>
      );
  }
}



const mapStateToProps = state => {
  return {
    user: state.user,
    research: state.research
  };
};

Research.propTypes = {
  classes: PropTypes.object.isRequired,

};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, null),
)

export default enhance(Research);