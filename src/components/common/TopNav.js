import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
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
    marginRight: 0
  },
  title: {
    display: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    overflow: 'hidden',
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
const base64BrownImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqEAAAKhCAYAAABgondeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE1NjBGRTNDMkRDNjExRTk5RjA5QjdBMEUyOERDNERGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE1NjBGRTNEMkRDNjExRTk5RjA5QjdBMEUyOERDNERGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTU2MEZFM0EyREM2MTFFOTlGMDlCN0EwRTI4REM0REYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTU2MEZFM0IyREM2MTFFOTlGMDlCN0EwRTI4REM0REYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6CIb9IAAA+n0lEQVR42uzd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`;

class TopNav extends React.Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { searchedQuery } = this.props
    if (searchedQuery) {
      this.setState({
        query: searchedQuery
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchedQuery && !this.props.searchedQuery) {
      this.setState({
        query: this.props.searchedQuery
      })
    }

    if (this.props.searchedQuery && !this.state.query) {
      this.setState({
        query: this.props.searchedQuery
      })
    }
  }

  logout = () => {
    this.props.logoutAction();
  };

  goto = path => {
    this.props.history.push(path);
  };

  handleSearch = e => {
    let { value, id } = e.target
    this.setState({ [id]: value }, () => this.props.searchAction({ query: value }));
  };

  render() {
    const { query } = this.state;
    const { classes, user } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <SwipeableTemporaryDrawer />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
              onClick={() => this.goto('/')}
            >
              Productmania
            </Typography>
            <div className={classes.grow} />
            <div className={'search-field-container'}>
              <input
                type={'text'}
                className={'search-field'}
                value={query}
                onChange={this.handleSearch}
                id="query"
                placeholder={'Search...'}
                autoFocus={true}
              />
              <div className={'search-field-addon'}>
                {query ?
                  <div onClick={() => { this.setState({ query: '' }); this.props.searchAction({ query: '' }); }} className={'search-field-addon-icon'}>X</div>
                  : <SearchIcon className={'search-field-addon-icon'} />
                }
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {
    ProductReducer: { searchedProducts, searchLoader, searchError, searchedQuery },
    authReducer: { isLoggedIn, user }
  } = state;
  return {
    searchedProducts,
    searchLoader,
    searchError,
    isLoggedIn,
    user,
    searchedQuery
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
