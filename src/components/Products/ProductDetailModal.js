
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
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
import Menu from "@material-ui/icons/Menu";
import Fab from '@material-ui/core/Fab';
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
const styles = (theme) => ({

    appBar: {
        position: 'relative',
        backgroundColor: '#9e7339	',
        padding: '0px',
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
        color: 'white',
    },
    fullList: {
        width: 'auto',
        backgroundColor: '#a98652',
        color: 'white',
    },
    margin: {
        backgroundColor: '#9e7339',
        color: 'white',
    },
    // dialog: {
    //     padding: '0px',
    // },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },

        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing.unit,
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
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: 120,
        }
    },
});
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
        const { classes, open, handleDetailDialog, product, user, history } = this.props;
        const { showCommentModal, showShareModal } = this.state;
        console.log(this.props.history)

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
                    className={classes.dialog}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={() => handleDetailDialog(null)}
                                aria-label="Close"
                            >
                                <i className="material-icons navigate">navigate_before</i>
                            </IconButton>
                            {user ? (
                                <Typography
                                    variant="h6"
                                    color="inherit"
                                    className={classes.flex}
                                >
                                    <img
                                        src={user.picture}
                                        alt="profile image"
                                        style={{
                                            height: "50px",
                                            width: "50px",
                                            borderRadius: "50%",
                                            cursor: "pointer"
                                        }}
                                    />
                                </Typography>
                            ) : (
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        className={classes.flex}
                                    >
                                        <i className="material-icons account">account_circle</i>
                                    </Typography>
                                )}

                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput
                                    }}
                                    // value={query}
                                    onChange={this.handleSearch}
                                    id="query"
                                />
                            </div>
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
                                            <BottomNavigationAction
                                                className="favoriteIcon" icon={
                                                    <FavoriteIcon id="favoriteIcon" />}
                                            />
                                            <Fab aria-label="Add" className={classes.margin}
                                                onClick={() => { history.push("/add-product") }}
                                            >
                                                <AddIcon />
                                            </Fab>
                                            <Fab
                                                aria-label="Menu"
                                                className={classes.margin}
                                                onClick={this.toggleDrawer("bottom", true)}
                                            >
                                                <Menu />
                                            </Fab>
                                            {/* <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button> */}
                                            <SwipeableDrawer
                                                anchor="bottom"
                                                open={this.state.bottom}
                                                className="swipeableDrawer"
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
                                                        <ListItem button onClick={() => { this.setState({ showCommentModal: true }) }} >
                                                            <i class="material-icons comment">
                                                                mode_comment
                                                            </i>
                                                            <span className="comment-text">{'Comment'}</span>
                                                            {/* <i class="material-icons key" onClose={this.toggleDrawer('bottom', false)}>
                                                                keyboard_arrow_down
                                                            </i> */}
                                                        </ListItem>

                                                        <ListItem button onClick={() => { this.setState({ showShareModal: true }) }}>
                                                            <i class="fa fa-share"></i>
                                                            <span className="comment-text">{'share'}</span>

                                                            {/* <ListItemText  secondary={'Share'} color= {"white"}/> */}
                                                        </ListItem>
                                                        <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(true) }}>
                                                            <FavoriteIcon id="like" />
                                                            <span className="comment-text">Like {product._like}</span>
                                                        </ListItem>
                                                        <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(false) }} >
                                                            <FavoriteIcon id="dislike" />
                                                            <span className="comment-text">Dislike {product._dislike}</span>
                                                        </ListItem>
                                                    </List>

                                                </div>
                                            </SwipeableDrawer>
                                            {/* <SwipeableTemporaryDrawer fullList={this.props.fullList} /> */}
                                            <BottomNavigationAction
                                            // className="check-box" 
                                            // icon={<i className="material-icons" id="checkBoxIcon">
                                            //     indeterminate_check_box
                                            // </i>} 
                                            />
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
