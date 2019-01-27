import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: this.props.isShowDetail,
    };

    handleClickOpen = () => {
        this.props.handleDetailDialog(true)
    };

    handleClose = () => {
        this.props.handleDetailDialog(false)
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isShowDetail !== this.props.isShowDetail) {
            this.setState({
                open: this.props.isShowDetail
            })
        }
    }
    render() {
        const { classes, movie } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {movie ? movie.title : 'Movie Detail'}
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {
                        movie ?
                            <List>
                                <ListItem button>
                                    <ListItemText primary={'Movie ID'} secondary={movie.id} />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary={'Movie Title'} secondary={movie.title} />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary={'Movie Overview'} secondary={movie.overview} />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary={'Movie Popularity'} secondary={movie.popularity} />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary={'Release Date'} secondary={movie.release_date} />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary={'Vote Average'} secondary={movie.vote_average} />
                                </ListItem>
                                <Divider />
                                <ListItem button>
                                    <ListItemText primary={'Vote Count'} secondary={movie.vote_count} />
                                </ListItem>
                                <Divider />
                            </List>
                            : ''
                    }
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);