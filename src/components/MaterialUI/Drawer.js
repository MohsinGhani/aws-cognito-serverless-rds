import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authAction, ProductAction } from "./../../store/actions";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextModal from './../common/TextModal'
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
      // { label: "Profile", path: "/profile" },
      { label: "My Product", path: "/my-product" },
      // { label: "Login", path: "/signin" }
    ],
    openTextModal: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  goto = path => {
    // console.log(path);
    this.props.history.push(path);
  };
  logout = () => {
    this.props.logoutAction();
  };

  login(path) {
    this.props.history.push(path);
  }
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
    const { navItems, left, openTextModal } = this.state;
    const { classes, isLoggedIn } = this.props;
    return (
      <div>
        <TextModal
          open={openTextModal}
          handleClose={() => this.setState({ openTextModal: false })}
          title={"Copied!"}
          text={"You have successfully copied our link"}
          isTimer={true}
          btnAction={() => this.setState({ openTextModal: false })}
          btnTitle={"Copied"}
        />

        <MenuIcon onClick={this.toggleDrawer("left", true)} id="svgIcon" />
        <div>
          <Drawer
            open={left}
            className={classes.drawer}
            onClose={this.toggleDrawer('left', false)}
          >
            <div
              tabIndex={0}
              role="button"
              primary="Menu Links"
              className={classes.swipeList}
              style={{ width: 320 }}
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
                <h4 style={{ textAlign: 'center' }}>Productmania</h4>
                {
                  navItems.map(item => {
                    if (!isLoggedIn && item.label === 'My Product') return <span></span>

                    // when user want to copy url
                    if (item.label === "Share App Link" || item.label === "Copy App Link") {
                      return (
                        <ListItem
                          className={classes.listItem}
                        >
                          <CopyToClipboard text={window.location.origin}
                            onCopy={() => this.setState({ openTextModal: true })}>
                            <span>{item.label}</span>
                          </CopyToClipboard>
                        </ListItem>
                      )
                    }
                    return (
                      <ListItem
                        className={classes.listItem}
                        onClick={() => this.goto(item.path)}
                      >
                        {item.label}
                      </ListItem>
                    );
                  })
                }
                {
                  isLoggedIn ? (
                    <div>
                      <ListItem className={classes.listItem} onClick={() => { this.props.history.push("/profile"); }}>
                        Profile
                  </ListItem>
                      <ListItem className={classes.listItem} onClick={this.logout}>
                        Logout
                    </ListItem>
                    </div>
                  ) :
                    <ListItem className={classes.listItem} onClick={() => this.login("/signin")}>
                      Login
                  </ListItem>
                }
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
    searchAction: payload => dispatch(ProductAction.search(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SwipeableTemporaryDrawer)));
