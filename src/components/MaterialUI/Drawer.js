import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authAction, ProductAction } from './../../store/actions'
import "./index.css";
const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        textAlign: 'center',
        fontSize: '10px',
        marginLeft: '10px'
    },
    list: {
        color: 'white',
        padding: '0px',
    },
    listItem: {
        padding: '3px',
        paddingLeft: '40px',
        cursor: 'pointer',
        color: 'white',
        textDecoration : 'none',
    },
    swipeList: {
        height: '100%',
        backgroundColor: 'red',
        border: '10px solid 	#E8E8E8',
        borderTop: '5px solid 	#E8E8E8',
    },
    accountCircle: {
        textAlign: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'white',
        // marginRight: theme.spacing.unit * 0,
        paddingRight: '25px',
        marginLeft: 0,
        width: '100%',
        marginTop: '-15px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'black',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
});


class SwipeableTemporaryDrawer extends React.Component {
    state = {
        top: false,
        left: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    goto = (path) => {
        this.props.history.push(path)
    }
    logout = () => {
        this.props.logoutAction()
    }
    render() {
        const { classes, isLoggedIn } = this.props;
        return (
            <div >
                <MenuIcon onClick={this.toggleDrawer('left', true)} id="svgIcon" />
                <div>
                    <Drawer open={this.state.left} className={classes.drawer}>
                        <p className="MenuLinks">Menu Links</p>
                        <div
                            tabIndex={0}
                            role="button"
                            primary="Menu Links"
                            className={classes.swipeList}
                        >
                            <List className={classes.list}>
                                <ListItem>

                                    <Typography variant="h6" color="inherit" className={classes.flex}>
                                        <i className="material-icons account">
                                            account_circle
                                </i>
                                    </Typography>
                                    <Typography color="inherit" 
                                    onClick={this.toggleDrawer('left', false)}
                                    onKeyDown={this.toggleDrawer('left', false)}>
                                        <i className="material-icons clear">
                                            clear
                                </i>
                                    </Typography>
                                </ListItem>
                                <ListItem> <div className={classes.search}>
                                    <InputBase
                                        placeholder="Search Keyword or Place"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                    />
                                </div>
                                </ListItem>
                                <ListItem className="searchItem">
                                    <div className="searchButton">
                                        <i className="material-icons searchh" type="btn">
                                            search
                                    </i>
                                        {/* <SearchIcon /> */}
                                    </div>
                                </ListItem>
                                <ListItem className={classes.listItem} onClick={() => this.goto('/add-product')}>
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
                                <ListItem className={classes.listItem} onClick={() => this.goto('/')}>
                                    My Product
                                </ListItem>
                                {
                                    isLoggedIn ?
                                    <ListItem className={classes.listItem} onClick={this.logout}>Logout</ListItem> :
                                    <ListItem className={classes.listItem} onClick={() => this.goto('/signin')}>Login</ListItem>
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
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    const {
        ProductReducer: { searchedProducts, searchLoader, searchError },
        authReducer: { isLoggedIn }
    } = state;
    return {
        searchedProducts, searchLoader, searchError,
        isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(authAction.logout()),
        searchAction: (payload) => dispatch(ProductAction.search(payload)),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(styles)(SwipeableTemporaryDrawer)));