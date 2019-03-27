import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};
const stylesTheme = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
})
class SwipeableTemporaryDrawer extends React.Component {
    state = {
        bottom: false,
    }
    
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    render() {
        const { classes, product, open, handleDetailDialog } = this.props;
        // const { showCommentModal, showShareModal } = this.state;

        const fullList = (
            <div className={classes.fullList}>
                <List>
                    {['Comment', 'Share', 'Like', 'Dislike'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <FavoriteIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}

                </List>

            </div>
        );

        return (
            <div>
                <Fab color="primary" aria-label="Add" className={classes.margin} onClick={this.toggleDrawer('bottom', true)}>
                    <AddIcon />
                </Fab>
                {/* <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button> */}
                <SwipeableDrawer
                    anchor="bottom"
                    open={this.state.bottom}
                    onClose={this.toggleDrawer('bottom', false)}
                    onOpen={this.toggleDrawer('bottom', true)}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('bottom', false)}
                        onKeyDown={this.toggleDrawer('bottom', false)}
                    >
                        {fullList}

                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

SwipeableTemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default 
withStyles(styles, stylesTheme)(SwipeableTemporaryDrawer);