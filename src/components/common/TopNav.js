import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { authAction, ProductAction } from "./../../store/actions";
import SwipeableTemporaryDrawer from "../MaterialUI/Drawer";
import { withRouter } from "react-router-dom";
import "./index.css";
const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "#9e7339	"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  appbar: {
    backgroundColor: "#9e7339	"
  },
  svgIcon: {
    fontSize: "34px"
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TopNav extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    query: "",
    selectedImage: {},

    open: false
  };
  handleClickOpenPopup = () => {
    this.setState({ open: true });
  };

  handleClosePopup = () => {
    this.setState({ open: false });
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  logout = () => {
    this.props.logoutAction();
  };

  goto = path => {
    this.props.history.push(path);
  };

  handleSearch = e => {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        console.log(this.state.query);
        this.props.searchAction({ query: this.state.query });
      }
    );
  };

  handleImageChange = event => {
    console.log(event, "event");
    // funciton for get file and save in state
    if (event.target.files && event.target.files[0]) {
      let file = {
        name: event.target.files[0].name,
        size: event.target.files[0].size,
        type: event.target.files[0].type
      };
      this.setState({ selectedImage: file },()=>{
        console.log(this.state.selectedImage.base64)
      });

      let reader = new FileReader();
      reader.onload = e => {
        this.setState({
          selectedImage: {
            ...this.state.selectedImage,
            base64: e.target.result
          }
        });
        const { user, uploadProfileImageAction } = this.props;
        uploadProfileImageAction({
          user_id: user.user_id,
          user_img: JSON.stringify({
            ...this.state.selectedImage,
            base64: e.target.result
          })
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.setState({ open: false });
  };

  handleChangeImagePopup = () => {
    this.setState({ open: true });
  };
  handleRemoveImagePopup = () => {
    
    this.setState({ open: false });
  };
  render() {
    const { query, selectedImage, isImageClickPopup } = this.state;
    const { classes, isLoggedIn, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              {/* <MenuIcon /> */}
              <SwipeableTemporaryDrawer />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Productmania
            </Typography>
            <div className={classes.grow} />
            {isLoggedIn ? (
              <div className={classes.sectionDesktop}>
                {(() => {
                  if (!selectedImage.base64 && user && !user.picture) {
                    return (
                      <IconButton
                        aria-haspopup="true"
                        color="inherit"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        onClick={this.handleClickOpenPopup}
                      >
                        <AccountCircle id="svgIcon" />
                      </IconButton>
                    );
                  } else if (!selectedImage.base64 && user && user.picture) {
                    return (
                      <img
                        src={user.picture}
                        alt="profile image"
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                        onClick={this.handleClickOpenPopup}
                      />
                    );
                  }
                })()}
                {selectedImage && selectedImage.base64 && (
                  <img
                    src={selectedImage.base64}
                    alt="product"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50%"
                    }}
                    onClick={this.handleClickOpenPopup}
                  />
                )}
              </div>
            ) : null}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                value={query}
                onChange={this.handleSearch}
                id="query"
              />
            </div>
          </Toolbar>
        </AppBar>

        <div>
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClosePopup}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"User Information :"}
            </DialogTitle>
            <DialogContent style={{ marginTop: -15 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {user ? (
                  <Avatar
                    alt={`${user.firstname} ${user.lastname}`}
                    src={user.picture}
                    className={classes.bigAvatar}
                  />
                ) : (
                  <AccountCircle id="svgIcon" />
                )}
              </div>
              {user && (
                <div style={{ marginTop: 10 }}>
                  <div>{`Name : ${user.firstname} ${user.lastname}`}</div>
                  <div> {`email : ${user.email}`}</div>
                  <div> {`Phone : ${user.phone}`}</div>
                </div>
              )}
            </DialogContent>
            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button onClick={this.handleClosePopup} style={{ color: "red" }}>
                Cancel
              </Button>
              <Button onClick={this.handleRemoveImagePopup} color="primary">
                Remove Image
              </Button>
              <Button
                onClick={() => {
                  this.handleChangeImagePopup();
                  var elem = document.getElementById("theFile");
                  if (elem && document.createEvent) {
                    var evt = document.createEvent("MouseEvents");
                    evt.initEvent("click", false, true);
                    elem.dispatchEvent(evt);
                  }
                }}
                color="primary"
              >
                Change Image
                <input
                  type="file"
                  id="theFile"
                  // display="hidden"
                  onChange={event => {
                    this.handleImageChange(event);
                    event.target.value = null;
                    this.setState({
                      hideTool: true
                    });
                  }}
                />
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {
    ProductReducer: { searchedProducts, searchLoader, searchError },
    authReducer: { isLoggedIn, user }
  } = state;
  return {
    searchedProducts,
    searchLoader,
    searchError,
    isLoggedIn,
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(authAction.logout()),
    searchAction: payload => dispatch(ProductAction.search(payload)),
    uploadProfileImageAction: payload =>
      dispatch(authAction.uploadProfileImage(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(TopNav)));
