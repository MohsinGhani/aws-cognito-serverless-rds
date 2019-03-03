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
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
import { authAction, ProductAction } from './../../store/actions'
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
        marginBottom: '15px'
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
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
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
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
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
        const { anchorEl, mobileMoreAnchorEl, query } = this.state;
        const { classes, isLoggedIn } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                {
                    isLoggedIn ?
                        <MenuItem onClick={this.logout}>Logout</MenuItem> :
                        <MenuItem onClick={() => this.goto('/signin')}>Login</MenuItem>
                }
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit" title="Add Product" onClick={() => this.goto('/')}>
                        <Icon>format_list_bulleted</Icon> <span style={{ fontSize: '14px', paddingLeft: '10px' }}>Products</span>
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit" title="Add Product" onClick={() => this.goto('/add-product')}>
                        <Icon>add_circle</Icon> <span style={{ fontSize: '14px', paddingLeft: '10px' }}>Add Product</span>
                    </IconButton>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle /> <span style={{ fontSize: '14px', paddingLeft: '10px' }}>Profile</span>
                    </IconButton>
                </MenuItem>
                {
                    isLoggedIn ?
                        <MenuItem onClick={this.logout}>
                            <IconButton color="inherit">
                                <Icon>input</Icon> <span style={{ fontSize: '14px', paddingLeft: '10px' }}>Logout</span>
                            </IconButton>
                        </MenuItem> :
                        <MenuItem onClick={() => this.goto('/signin')}>
                            <IconButton color="inherit">
                                <Icon>input</Icon> <span style={{ fontSize: '14px', paddingLeft: '10px' }}>Login</span>
                            </IconButton>
                        </MenuItem>
                }
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            Productmania
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
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
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit" title="Add Product" onClick={() => this.goto('/')}>
                                <Icon>format_list_bulleted</Icon>
                            </IconButton>
                            <IconButton color="inherit" title="Add Product" onClick={() => this.goto('/add-product')}>
                                <Icon>add_circle</Icon>
                            </IconButton>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
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