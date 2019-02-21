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

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { classes, open, handleDetailDialog, product } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={() => handleDetailDialog(null)}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => handleDetailDialog(null)} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Product Modal
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className="product-detail-modal-body">
                        <div className="product-image-container">
                            <img src={require('./../../assets/img/c15.jpg')} alt="product" className="product-image" />
                        </div>
                        {
                            product ?
                                <List>
                                    <ListItem button>
                                        <ListItemText primary={'Product Title'} secondary={product.title} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary={'Product Description'} secondary={product.description} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary={'Country'} secondary={product.country} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary={'City'} secondary={product.city} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary={'Like'} secondary={product._like} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button>
                                        <ListItemText primary={'Dislike'} secondary={product._dislike} />
                                    </ListItem>
                                    <Divider />
                                </List>
                                : ''
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}

ProductDetailModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductDetailModal);