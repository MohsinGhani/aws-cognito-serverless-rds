
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { fade } from "@material-ui/core/styles/colorManipulator";
import TimeAgo from "timeago-react";
import TextModal from './../common/TextModal'
import Popover from '@material-ui/core/Popover';
import "./index.css"

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
            openTextModal: false,
            textModalTitle: '',
            textModalText: '',
            actionPopoverOpen: false,
            anchorEl: null
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

            // display confirmation modal
            this.setState({
                openTextModal: true,
                textModalTitle: "Successfull!",
                textModalText: `you have successfully ${action ? 'Like' : 'Dislike'} this product`,
                btnTitle: 'Close',
                btnAction: () => { this.setState({ openTextModal: false }) },
                strickedAction: null
            }, this.handleActionPopoverClose())
        }
        else {
            this.showLoginModal()
            this.handleActionPopoverClose()
        }
    }

    handleNavigateToBefore = () => {
        const { handleDetailDialog, identifier } = this.props;
        handleDetailDialog(null)
        if (identifier === "my-product") {
            this.props.history.push("/my-product")
        }
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleCommentLoginModal = () => {
        const { user } = this.props;
        if (user) {
            this.setState({ showCommentModal: true })
        }
        else {
            this.showLoginModal()
        }
    }

    handleAddPostClick = () => {
        const { user } = this.props;
        if (user) {
            this.props.history.push('/add-product')
        }
        else {
            this.showLoginModal()
        }
    }

    showLoginModal = () => {
        this.setState({
            openTextModal: true,
            textModalTitle: "Login Required!",
            textModalText: "You must login to perform this action",
            btnAction: () => { this.props.history.push("/signin") },
            btnTitle: "Login",
            strickedAction: () => { this.props.history.push("/signin") }
        })
    }

    closeTextModal = () => {
        // console.log("close")
        this.setState({
            openTextModal: false,
            isOpenDetailDialog: true
        })
    }

    handleActionPopoverClose = () => {
        this.setState({
            actionPopoverOpen: false,
            anchorEl: null
        })
    }

    handleActionPopoverClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            actionPopoverOpen: true
        })
    }

    render() {
        const { classes, open, handleDetailDialog, product, user, history, liked, addPostModalToMyPrdctI } = this.props;
        const { showCommentModal, actionPopoverOpen, anchorEl, showShareModal, isDislike, openTextModal, textModalTitle, textModalText, btnTitle, btnAction, strickedAction } = this.state;
        const actionPopoverId = actionPopoverOpen ? 'simple-popover' : undefined;

        return (
            <div className="product-detail-modal-body">
                <ActionPopover
                    id={actionPopoverId}
                    open={actionPopoverOpen}
                    anchorEl={anchorEl}
                    handleClose={this.handleActionPopoverClose}
                    classes={classes}
                    handleLikeAndDislikeProduct={this.handleLikeAndDislikeProduct}
                />
                <CommentModal
                    open={showCommentModal}
                    handleClose={() => this.setState({ showCommentModal: false })}
                />
                <ShareModal
                    open={showShareModal}
                    handleClose={() => this.setState({ showShareModal: false })}
                    product_id={product ? product.product_id : ''}
                />

                <TextModal
                    open={openTextModal}
                    handleClose={this.closeTextModal}
                    title={textModalTitle}
                    text={textModalText}
                    isTimer={true}
                    btnAction={btnAction}
                    btnTitle={btnTitle}
                    strickedAction={strickedAction}
                />

                <Dialog
                    fullScreen
                    open={open}
                    onClose={() => handleDetailDialog(null)}
                    TransitionComponent={Transition}
                    className={"dialog"}
                >


                    <AppBar className={classes.appBar}>
                        <Toolbar style={{ padding: 0 }}>
                            <div className="product-modal-header">
                                <div className="product-modal-back-icon-wrapper">
                                    <IconButton
                                        color="inherit"
                                        onClick={this.handleNavigateToBefore}
                                        aria-label="Close"
                                    >
                                        <i className="material-icons navigate">navigate_before</i>
                                    </IconButton>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, padding: '20px 0', cursor: 'pointer' }} onClick={() => { handleDetailDialog(null); this.props.history.push('/') }}>Productmania</h4>
                                </div>
                                <div className="product-modal-center-icon-wrapper">
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        className={classes.flex}
                                    >
                                        <i className="material-icons account">account_circle</i>
                                    </Typography>
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>

                    <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
                        {
                            product ?
                                <div className="product-image-container">
                                    <Card className={classes.card} >

                                        <div className="main-product-image-wrapper">
                                            <img
                                                src={product.product_img}
                                                className="main-product-image"
                                                onClick={this.toggleDrawer('bottom', true)}
                                            />
                                            {/* <img
                                                src={require("./../../assets/img/more.svg")}
                                                className="more-image-icon"
                                                onClick={this.toggleDrawer('bottom', true)}
                                            /> */}
                                        </div>


                                        <Typography gutterBottom component="h5" className={classes.typography}>
                                            {product.city}, {product.country}
                                            <span className={classes.span}>
                                                <Moment format="MMMM D, YYYY h:mm a">
                                                    {product.created_date}</Moment>
                                            </span>
                                        </Typography>

                                        <div>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {product.title}
                                                </Typography>
                                                <Typography component="p">
                                                    {product.description}
                                                </Typography>
                                                <Typography gutterBottom component="h5" >
                                                    Posted By : Post Writer Name
                                            </Typography>
                                            </CardContent>
                                            {
                                                (() => {
                                                    if (product && product._comments) {
                                                        return product._comments.reverse().map((comment, i) => {
                                                            return (
                                                                <div className="container">
                                                                    <List key={i}>
                                                                        <ListItem className={classes.listItem}>{comment.comment} </ListItem>
                                                                        <Typography className={classes.commentTime} component="p">
                                                                            <TimeAgo datetime={comment.time} />
                                                                        </Typography>
                                                                    </List>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                })()
                                            }

                                            <div
                                                onChange={this.handleChange}
                                                className={`${classes.root} product-modal-footer`}
                                            >
                                                <div>
                                                    {(() => {
                                                        if (!liked) {
                                                            return <img src={require("./../../assets/img/heart.svg")} onClick={this.handleActionPopoverClick} className="like-heart" />
                                                        }
                                                        else if (liked && !liked.action) {
                                                            return <img src={require("./../../assets/img/heartbroken.svg")} onClick={this.handleActionPopoverClick} className="like-heart" />
                                                        }
                                                        else {
                                                            return <img src={require("./../../assets/img/like.svg")} onClick={this.handleActionPopoverClick} className="like-heart" />
                                                        }
                                                    })()}
                                                </div>

                                                <div>
                                                    <Fab
                                                        aria-label="Add"
                                                        className={classes.margin}
                                                        id="add-product-fabbtn"
                                                        onClick={this.handleAddPostClick}
                                                    >
                                                        <AddIcon />
                                                    </Fab>
                                                </div>
                                                <div>
                                                    <img
                                                        src={require("./../../assets/img/more.svg")}
                                                        className="like-heart"
                                                        onClick={this.toggleDrawer('bottom', true)}
                                                    />
                                                    {/* <img onClick={() => { this.setState({ showCommentModal: true }) }} src={require("./../../assets/img/comment.svg")} className="like-heart" /> */}
                                                </div>
                                            </div>
                                        </div>

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
                                                    <ListItem button onClick={this.handleCommentLoginModal} >
                                                        <i class="material-icons comment">
                                                            mode_comment
                                                        </i>
                                                        <span className="comment-text">Comments {product._comments ? <span className="text-badge"> {product._comments.length}</span> : ""}</span>
                                                    </ListItem>
                                                    <ListItem button onClick={() => { this.setState({ showShareModal: true }) }}>
                                                        <i class="fa fa-share"></i>
                                                        <span className="comment-text">{'share'}</span>
                                                    </ListItem>
                                                    <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(true) }}>
                                                        <FavoriteIcon id="like" />
                                                        <span className="comment-text">Like <span className="text-badge">{product._like}</span></span>
                                                    </ListItem>
                                                    <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(false) }} >
                                                        <FavoriteIcon id="dislike" />
                                                        <span className="comment-text">Dislike <span className="text-badge">{product._dislike}</span></span>
                                                    </ListItem>
                                                </List>

                                            </div>
                                        </SwipeableDrawer>
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

const ActionPopover = ({ id, open, anchorEl, handleClose, classes, handleLikeAndDislikeProduct }) => {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <div className={'action-popover-wrapper'}>
                <div className={'action-popover-item'}>
                    <img
                        onClick={() => handleLikeAndDislikeProduct(true)}
                        title={'like this product'}
                        src={require("./../../assets/img/like.svg")}
                        className="like-heart"
                    />
                </div>
                <div className={'action-popover-item'}>
                    <img
                        onClick={() => handleLikeAndDislikeProduct(false)}
                        title={'dislike this product'}
                        src={require("./../../assets/img/heartbroken.svg")}
                        className="like-heart"
                    />
                </div>
            </div>
        </Popover>
    )
}

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
        boxShadow: "none"
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
