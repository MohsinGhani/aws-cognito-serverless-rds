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
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import CommentModal from './CommentModal'

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
            showCommentModal: false
        }
    }

    componentDidMount() {
        let { product_id, getProductByIdAction } = this.props
        if (product_id) getProductByIdAction({ product_id })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product_id !== this.props.product_id && this.props.product_id) {
            this.props.getProductByIdAction({ product_id: this.props.product_id })
        }
    }

    handleLikeAndDislikeProduct = (action) => {
        const { user, product_id, likeProductAction } = this.props
        let payload = {
            user_id: user.user_id,
            product_id,
            action
        }
        if (user.user_id && product_id) {
            likeProductAction(payload)
        }
        else {
            alert('user id or product id is missing')
        }
    }

    render() {
        const { classes, open, handleDetailDialog, product } = this.props;
        const { showCommentModal } = this.state;
        return (
            <div>
                <CommentModal
                    open={showCommentModal}
                    handleClose={() => this.setState({ showCommentModal: false  })}
                />
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
                            <Button color="inherit" onClick={() => handleDetailDialog(null)}>
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
                                    <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(true) }}>
                                        <ListItemText primary={'Like'} secondary={product._like} />
                                    </ListItem>
                                    <Divider />
                                    <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(false) }}>
                                        <ListItemText primary={'Dislike'} secondary={product._dislike} />
                                    </ListItem>
                                    <Divider />
                                    {
                                        (() => {
                                            if (product && product._comments) {
                                                return product._comments.map((comment, i) => {
                                                    return (
                                                        <ListItem key={i} button onClick={() => { this.handleLikeAndDislikeProduct(false) }}>
                                                            <ListItemText secondary={comment.comment} />
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        })()
                                    }
                                    <Divider />
                                    <ListItem button onClick={() => { this.setState({ showCommentModal: true }) }}>
                                        <ListItemText secondary={'Add Comment'} />
                                    </ListItem>
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

const mapStateToProps = (state) => {
    const {
        ProductReducer: {
            product, getProductByIdLoader, getProductByIdError,
            liked, likeProductLoader, likeProductError
        },
        authReducer: { user }
    } = state;
    return {
        product, getProductByIdLoader, getProductByIdError,
        liked, likeProductLoader, likeProductError,
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductByIdAction: (payload) => dispatch(ProductAction.getProductById(payload)),
        likeProductAction: (payload) => dispatch(ProductAction.likeProduct(payload)),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(ProductDetailModal));