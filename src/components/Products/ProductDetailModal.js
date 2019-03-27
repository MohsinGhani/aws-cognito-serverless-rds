import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { ProductAction } from './../../store/actions'
import CommentModal from './CommentModal'
import ShareModal from './ShareModal'
import Moment from 'react-moment';
import CardContent from '@material-ui/core/CardContent';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
const styles = {

    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        textAlign: 'center',
        fontSize: '20px',
    },
    ul: {
        listStyleType: 'none',
    },
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    span: {
        float: 'right',
    },
    typography: {
        margin: '10px'
    },
    listItem: {
        width: '100%',
        height: 'auto',
        padding: '12px 20px',
        boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        backgroundColor: '#c2d1f0',
        margin: '2px',
        borderRadius: '10px',
        fontSize: '16px',
        resize: 'none',
    },
    commentTime: {
        margin: '5px',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -20,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    root: {
        position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        height: 'auto',
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    navIcon: {
        width: '24px !important',
        height: '24px !important'
    },
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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProductDetailModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showCommentModal: false,
            showShareModal: false,
            bottom: false,
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
        if (user && user.user_id && product_id) {
            likeProductAction({
                user_id: user.user_id,
                product_id,
                action
            })
        }
        else {
            alert("you can't perform any action before authentication")
        }
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    render() {
        const { classes, open, handleDetailDialog, product } = this.props;
        const { showCommentModal, showShareModal } = this.state;


        return (
            <div className="product-detail-modal-body">
                <CommentModal
                    open={showCommentModal}
                    handleClose={() => this.setState({ showCommentModal: false })}
                />
                <ShareModal
                    open={showShareModal}
                    handleClose={() => this.setState({ showShareModal: false })}
                    product_id={product ? product.product_id : ''}
                />
                <Dialog
                    fullScreen
                    open={open}
                    onClose={() => handleDetailDialog(null)}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => handleDetailDialog(null)} aria-label="Close" >
                                <i className="material-icons navigate">
                                    navigate_before
                            </i>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                <i className="material-icons account">
                                    account_circle
                                </i>
                            </Typography>
                            <Button color="inherit" onClick={() => handleDetailDialog(null)}>
                                <i className="material-icons search" >
                                    search
                            </i>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div>
                        {
                            product ?
                                <div className="product-image-container">
                                    <Card className={classes.card} >
                                        <CardMedia
                                            className={classes.media}
                                            image={product.product_img}
                                            title="Paella dish"
                                            alt="product"

                                        />
                                        <Typography gutterBottom component="h5" className={classes.typography}>
                                            {product.city}, {product.country}
                                            <span className={classes.span}>
                                                <Moment format="MMMM D, YYYY h:mm a">
                                                    {product.created_date}</Moment>
                                            </span>
                                        </Typography>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {product.title}
                                            </Typography>
                                            <Typography component="p">
                                                {product.description}
                                            </Typography>
                                            <Typography gutterBottom component="h5" >
                                                Posted By : Mohsin Ghani
                                            </Typography>
                                        </CardContent>
                                        {
                                            (() => {
                                                if (product && product._comments) {
                                                    return product._comments.map((comment, i) => {
                                                        return (
                                                            <div className="container">
                                                                <List key={i}>
                                                                    <ListItem className={classes.listItem}>{comment.comment} </ListItem>
                                                                    <Typography className={classes.commentTime} component="p">
                                                                        <Moment fromNow ago>
                                                                            {comment.time}
                                                                        </Moment> ago
                                                                    </Typography>
                                                                </List>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            })()
                                        }

                                        <BottomNavigation onChange={this.handleChange} className={classes.root}>
                                            <BottomNavigationAction icon={<FavoriteIcon id="favoriteIcon" />} />
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
                                                    <List className={classes.fullList}>

                                                        <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(true) }}>
                                                            <ListItemIcon> <FavoriteIcon /></ListItemIcon>
                                                            <ListItemText primary={'Like'} secondary={product._like} />
                                                        </ListItem>
                                                        <Divider />
                                                        <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(false) }}>
                                                            <ListItemIcon> <FavoriteIcon /></ListItemIcon>
                                                            <ListItemText primary={'Dislike'} secondary={product._dislike} />
                                                        </ListItem>

                                                        <ListItem button onClick={() => { this.setState({ showCommentModal: true }) }}>
                                                            <ListItemIcon> <FavoriteIcon /></ListItemIcon>
                                                            <ListItemText secondary={'Add Comment'} />
                                                        </ListItem>

                                                        <ListItem button onClick={() => { this.setState({ showShareModal: true }) }}>
                                                            <ListItemIcon> <FavoriteIcon /></ListItemIcon>
                                                            <ListItemText secondary={'Share'} />
                                                        </ListItem>
                                                    </List>

                                                </div>
                                            </SwipeableDrawer>
                                            {/* <SwipeableTemporaryDrawer fullList={this.props.fullList} /> */}
                                            <BottomNavigationAction icon={<i className="material-icons" id="checkBoxIcon">
                                                indeterminate_check_box
                                            </i>} />
                                        </BottomNavigation>

                                    </Card>
                                </div>
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
)(withStyles(styles, stylesTheme)(ProductDetailModal));
console.clear();