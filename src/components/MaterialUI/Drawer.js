import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
        paddingLeft: theme.spacing.unit ,
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

    render() {
        const { classes } = this.props;

        return (
            <div >
                <MenuIcon onClick={this.toggleDrawer('left', true)} />
                <div>
                <Drawer open={this.state.left}  className={classes.drawer}>
                <p className="MenuLinks">Menu Links</p>
                    <div
                        tabIndex={0}
                        role="button"
                        primary="Menu Links"
                        className={classes.swipeList}
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                              <List className={classes.list}>
                            <ListItem>

                                <Typography variant="h6" color="inherit" className={classes.flex}>
                                    <i className="material-icons account">
                                        account_circle
                                </i>
                                </Typography>
                                <Typography color="inherit" onClose={this.toggleDrawer('left', false)}>
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
                            <ListItem className={classes.listItem}>Add Product</ListItem>
                            <ListItem className={classes.listItem}>Map View</ListItem>
                            <ListItem className={classes.listItem}>List View</ListItem>
                            <ListItem className={classes.listItem}>Feedback</ListItem>
                            <ListItem className={classes.listItem}>Privacy</ListItem>
                            <ListItem className={classes.listItem}>Terms of Use</ListItem>
                            <ListItem className={classes.listItem}>Cookie Policy</ListItem>
                            <ListItem className={classes.listItem}>How To Use</ListItem>
                            <ListItem className={classes.listItem}>Share App Link</ListItem>
                            <ListItem className={classes.listItem}>Copy App Link</ListItem>
                            <ListItem className={classes.listItem}>Bookmark</ListItem>
                            <ListItem className={classes.listItem}>My Product</ListItem>
                            <ListItem className={classes.listItem}>Logout/Login</ListItem>
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

export default withStyles(styles)(SwipeableTemporaryDrawer);