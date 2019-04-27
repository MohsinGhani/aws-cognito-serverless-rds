import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { authAction, ProductAction } from './../../store/actions'
import Icon from '@material-ui/core/Icon';
import SwipeableTemporaryDrawer from '../MaterialUI/Drawer'
import { withRouter } from 'react-router-dom';
import './index.css';
const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: '#9e7339	',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
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
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 0,
            '&:focus': {
                width: 200,
            },
        },
        [theme.breakpoints.down('sm')]: {
            width: 0,
            '&:focus': {
                width: 200,
            },
        },
    },
    appbar: {
        backgroundColor: '#9e7339	',
    },
    svgIcon: {
        fontSize: '34px',
    }
});

class TopNav extends React.Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        query: ''
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
        this.props.logoutAction()
    }

    goto = (path) => {
        this.props.history.push(path)
    }

    handleSearch = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            this.props.searchAction({ query: this.state.query })
        })
    }

    render() {
        const {query } = this.state;
        const { classes, isLoggedIn } = this.props;


        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appbar}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            {/* <MenuIcon /> */}
                            <SwipeableTemporaryDrawer />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Productmania
                        </Typography>
                        <div className={classes.grow} />
                        {isLoggedIn ?
                            <div className={classes.sectionDesktop}>
                                <IconButton
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle id="svgIcon"/>
                                </IconButton>
                            </div> : null
                        }
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon id="svgIcon"/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={query}
                                onChange={this.handleSearch}
                                id='query'
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

TopNav.propTypes = {
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
)(withRouter(withStyles(styles)(TopNav)));