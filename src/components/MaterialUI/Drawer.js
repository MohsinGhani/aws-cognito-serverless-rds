<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Drawer from "@material-ui/core/Drawer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authAction, ProductAction } from "./../../store/actions";
import "./index.css";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1,
    textAlign: "center",
    fontSize: "10px"
  },
  drawerCloseButton: { position: "fixed", top: 30, left: 280 },
  list: {
    color: "white"
  },
  listItem: {
    padding: "3px",
    paddingLeft: "18px",
    marginLeft: 0,
    cursor: "pointer",
    color: "white",
    textDecoration: "none"
  },
  swipeList: {
    height: "100%",
    backgroundColor: "red"
  },
  accountCircle: {
    textAlign: "center"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    paddingRight: "25px",
    marginLeft: 0,
    width: "100%",
    marginTop: "-15px",
    [theme.breakpoints.up("sm")]: {
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
    color: "black",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    query: "",
    searchId: "",
    navItems: [
      { label: "Add Product", path: "/add-product" },
      { label: "Map View", path: "/" },
      { label: "List View", path: "/products-list" },
      { label: "Feedback", path: "/feedback" },
      { label: "Privacy", path: "/privacy" },
      { label: "Terms of Use", path: "/terms-of-use" },
      { label: "Cookie Policy", path: "/cookie-policy" },
      { label: "How To Use", path: "/how-to-use" },
      { label: "Share App Link", path: "/share-app-link" },
      { label: "Copy App Link", path: "/copy-app-link" },
      { label: "Bookmark", path: "/bookmark" },
      { label: "My Product", path: "/my-product" },
      { label: "Login", path: "/signin" }
    ]
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  goto = path => {
    console.log(path);
    this.props.history.push(path);
  };
  logout = () => {
    this.props.logoutAction();
  };

  handleSearch = e => {
    this.setState({ searchId: e.target.id, query: e.target.value });
    if (e.target.value === "") {
      this.setState({
        [e.target.id]: e.target.value,
        navItems: [
          { label: "Add Product", path: "/add-product" },
          { label: "Map View", path: "/" },
          { label: "List View", path: "/products-list" },
          { label: "Feedback", path: "/feedback" },
          { label: "Privacy", path: "/privacy" },
          { label: "Terms of Use", path: "/terms-of-use" },
          { label: "Cookie Policy", path: "/cookie-policy" },
          { label: "How To Use", path: "/how-to-use" },
          { label: "Share App Link", path: "/share-app-link" },
          { label: "Copy App Link", path: "/copy-app-link" },
          { label: "Bookmark", path: "/bookmark" },
          { label: "My Product", path: "/my-product" },
          { label: "Login", path: "/signin" }
        ]
      });
    }
  };
  handleTextSubmit = () => {
    const { query, searchId } = this.state;
    if (query === "") {
      this.setState({
        [searchId]: query,
        navItems: [
          { label: "Add Product", path: "/add-product" },
          { label: "Map View", path: "/" },
          { label: "List View", path: "/products-list" },
          { label: "Feedback", path: "/feedback" },
          { label: "Privacy", path: "/privacy" },
          { label: "Terms of Use", path: "/terms-of-use" },
          { label: "Cookie Policy", path: "/cookie-policy" },
          { label: "How To Use", path: "/how-to-use" },
          { label: "Share App Link", path: "/share-app-link" },
          { label: "Copy App Link", path: "/copy-app-link" },
          { label: "Bookmark", path: "/bookmark" },
          { label: "My Product", path: "/my-product" },
          { label: "Login", path: "/signin" }
        ]
      });
    } else {
      this.setState({
        [searchId]: query,
        navItems: this.state.navItems.filter(
          item => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      });
    }
  };
  render() {
    const { query, navItems } = this.state;
    const { classes, isLoggedIn } = this.props;
    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer("left", true)} id="svgIcon" />
        <div>
          <Drawer open={this.state.left} className={classes.drawer}>
            <div
              tabIndex={0}
              role="button"
              primary="Menu Links"
              className={classes.swipeList}
            >
              <List className={classes.list}>
                <ListItem>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.flex}
                  >
                    <i className="material-icons account">account_circle</i>
                  </Typography>
                  <Typography
                    color="inherit"
                    onClick={this.toggleDrawer("left", false)}
                    onKeyDown={this.toggleDrawer("left", false)}
                    className={classes.drawerCloseButton}
                  >
                    <i className="material-icons clear">clear</i>
                  </Typography>
                </ListItem>
                <ListItem>
                  <div className={classes.search}>
                    <InputBase
                      placeholder="Search Keyword or Place"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      value={query}
                      onChange={this.handleSearch}
                      id="query"
                    />
                  </div>
                </ListItem>
                <ListItem className="searchItem">
                  <div
                    className="searchButton"
                    style={{ cursor: "pointer" }}
                    onClick={this.handleTextSubmit}
                  >
                    <i className="material-icons searchh" type="btn">
                      search
                    </i>
                  </div>
                </ListItem>
                {navItems.map(item => {
                  return (
                    <ListItem
                      className={classes.listItem}
                      onClick={() => this.goto(item.path)}
                    >
                      {item.label}
                    </ListItem>
                  );
                })}
                {/* <ListItem className={classes.listItem} onClick={() => this.goto('/add-product')}>
                                    Add Product
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/')}>
                                    Map View
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/products-list')}>
                                    List View
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/feedback')}>
                                    Feedback
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/privacy')}>
                                    Privacy
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/terms-of-use')}>
                                    Terms of Use
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/cookie-policy')}>
                                    Cookie Policy
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/how-to-use')}>
                                    How To Use
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/share-app-link')}>
                                    Share App Link
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/copy-app-link')}>
                                    Copy App Link
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/bookmark')}>
                                    Bookmark
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/my-product')}>
                                    My Product
                                </ListItem> */}
                {isLoggedIn ? (
                  <ListItem className={classes.listItem} onClick={this.logout}>
                    Logout
                  </ListItem>
                ) : (
                  <ListItem className={classes.listItem} />
                )}
              </List>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const {
    ProductReducer: { searchedProducts, searchLoader, searchError },
    authReducer: { isLoggedIn }
  } = state;
  return {
    searchedProducts,
    searchLoader,
    searchError,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(authAction.logout()),
    searchAction: payload => dispatch(ProductAction.search(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SwipeableTemporaryDrawer)));
=======
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Drawer from "@material-ui/core/Drawer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authAction, ProductAction } from "./../../store/actions";
import "./index.css";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1,
    textAlign: "center",
    fontSize: "10px"
  },
  drawerCloseButton: { position: "fixed", top: 30, left: 280 },
  list: {
    color: "white"
  },
  listItem: {
    padding: "3px",
    paddingLeft: "18px",
    marginLeft: 0,
    cursor: "pointer",
    color: "white",
    textDecoration: "none"
  },
  swipeList: {
    height: "100%",
    backgroundColor: "red"
  },
  accountCircle: {
    textAlign: "center"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    paddingRight: "25px",
    marginLeft: 0,
    width: "100%",
    marginTop: "-15px",
    [theme.breakpoints.up("sm")]: {
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
    color: "black",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    query: "",
    searchId: "",
    navItems: [
      { label: "Add Product", path: "/add-product" },
      { label: "Map View", path: "/" },
      { label: "List View", path: "/products-list" },
      { label: "Feedback", path: "/feedback" },
      { label: "Privacy", path: "/privacy" },
      { label: "Terms of Use", path: "/terms-of-use" },
      { label: "Cookie Policy", path: "/cookie-policy" },
      { label: "How To Use", path: "/how-to-use" },
      { label: "Share App Link", path: "/share-app-link" },
      { label: "Copy App Link", path: "/copy-app-link" },
      { label: "Bookmark", path: "/bookmark" },
      { label: "My Product", path: "/my-product" },
      { label: "Login", path: "/signin" }
    ]
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  goto = path => {
    console.log(path);
    this.props.history.push(path);
  };
  logout = () => {
    this.props.logoutAction();
  };

  handleSearch = e => {
    this.setState({ searchId: e.target.id, query: e.target.value });
    if (e.target.value === "") {
      this.setState({
        [e.target.id]: e.target.value,
        navItems: [
          { label: "Add Product", path: "/add-product" },
          { label: "Map View", path: "/" },
          { label: "List View", path: "/products-list" },
          { label: "Feedback", path: "/feedback" },
          { label: "Privacy", path: "/privacy" },
          { label: "Terms of Use", path: "/terms-of-use" },
          { label: "Cookie Policy", path: "/cookie-policy" },
          { label: "How To Use", path: "/how-to-use" },
          { label: "Share App Link", path: "/share-app-link" },
          { label: "Copy App Link", path: "/copy-app-link" },
          { label: "Bookmark", path: "/bookmark" },
          { label: "My Product", path: "/my-product" },
          { label: "Login", path: "/signin" }
        ]
      });
    }
  };
  handleTextSubmit = () => {
    const { query, searchId } = this.state;
    if (query === "") {
      this.setState({
        [searchId]: query,
        navItems: [
          { label: "Add Product", path: "/add-product" },
          { label: "Map View", path: "/" },
          { label: "List View", path: "/products-list" },
          { label: "Feedback", path: "/feedback" },
          { label: "Privacy", path: "/privacy" },
          { label: "Terms of Use", path: "/terms-of-use" },
          { label: "Cookie Policy", path: "/cookie-policy" },
          { label: "How To Use", path: "/how-to-use" },
          { label: "Share App Link", path: "/share-app-link" },
          { label: "Copy App Link", path: "/copy-app-link" },
          { label: "Bookmark", path: "/bookmark" },
          { label: "My Product", path: "/my-product" },
          { label: "Login", path: "/signin" }
        ]
      });
    } else {
      this.setState({
        [searchId]: query,
        navItems: this.state.navItems.filter(
          item => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
        )
      });
    }
  };
  render() {
    const { query, navItems } = this.state;
    const { classes, isLoggedIn } = this.props;
    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer("left", true)} id="svgIcon" />
        <div>
          <Drawer open={this.state.left} className={classes.drawer}>
            <div
              tabIndex={0}
              role="button"
              primary="Menu Links"
              className={classes.swipeList}
            >
              <List className={classes.list}>
                <ListItem>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.flex}
                  >
                    <i className="material-icons account">account_circle</i>
                  </Typography>
                  <Typography
                    color="inherit"
                    onClick={this.toggleDrawer("left", false)}
                    onKeyDown={this.toggleDrawer("left", false)}
                    className={classes.drawerCloseButton}
                  >
                    <i className="material-icons clear">clear</i>
                  </Typography>
                </ListItem>
                <ListItem>
                  <div className={classes.search}>
                    <InputBase
                      placeholder="Search Keyword or Place"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      value={query}
                      onChange={this.handleSearch}
                      id="query"
                    />
                  </div>
                </ListItem>
                <ListItem className="searchItem">
                  <div
                    className="searchButton"
                    style={{ cursor: "pointer" }}
                    onClick={this.handleTextSubmit}
                  >
                    <i className="material-icons searchh" type="btn">
                      search
                    </i>
                  </div>
                </ListItem>
                {navItems.map(item => {
                  return (
                    <ListItem
                      className={classes.listItem}
                      onClick={() => this.goto(item.path)}
                    >
                      {item.label}
                    </ListItem>
                  );
                })}
                {/* <ListItem className={classes.listItem} onClick={() => this.goto('/add-product')}>
                                    Add Product
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/')}>
                                    Map View
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/products-list')}>
                                    List View
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/feedback')}>
                                    Feedback
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/privacy')}>
                                    Privacy
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/terms-of-use')}>
                                    Terms of Use
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/cookie-policy')}>
                                    Cookie Policy
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/how-to-use')}>
                                    How To Use
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/share-app-link')}>
                                    Share App Link
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/copy-app-link')}>
                                    Copy App Link
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/bookmark')}>
                                    Bookmark
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/my-product')}>
                                    My Product
                                </ListItem> */}
                {isLoggedIn ? (
                  <ListItem className={classes.listItem} onClick={this.logout}>
                    Logout
                  </ListItem>
                ) : (
                  <ListItem className={classes.listItem} />
                )}
              </List>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const {
    ProductReducer: { searchedProducts, searchLoader, searchError },
    authReducer: { isLoggedIn }
  } = state;
  return {
    searchedProducts,
    searchLoader,
    searchError,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => dispatch(authAction.logout()),
    searchAction: payload => dispatch(ProductAction.search(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SwipeableTemporaryDrawer)));
>>>>>>> add8c4e3abe9f26eaa186d854b857f73e2f6663d
