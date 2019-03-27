
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ProductAction } from './../../store/actions'
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1'
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { InputField } from './../MaterialUI/index'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
const styles = theme => ({
    // root: {
    //     flexGrow: 1,
    //     direction: "row",
    //     justify: "center",
    //     alignItems: "center"
    // },
    // paper: {
    //     padding: theme.spacing.unit * 2,
    //     textAlign: 'center',
    //     top: "40%",
    //     margin: '5px',
    //     position: 'relative',
    //     backgroundColor: theme.palette.background.paper,
    //     color: theme.palette.text.secondary,
    // },
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    paper: {
        top: '25%',
        position: 'relative',
        maxWidth: 400,
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing.unit * 2,
    },
})
class CommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    componentDidMount() {
        if (!this.props.product) this.props.handleClose()
    }

    handleInput = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    doComment = () => {
        const { user, doCommentOnProductAction, product } = this.props
        const { comment } = this.state
        doCommentOnProductAction({
            comment_id: uuidv1(),
            user_id: user.user_id,
            product_id: product.product_id,
            comment
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.commented && !this.props.doCommentLoader && prevProps.doCommentLoader) this.props.handleClose()
    }

    render() {
        let { open, handleClose, fullScreen, classes } = this.props
        let { comment } = this.state
        return (
            <div className={classes.root}>
                <Modal
                    // item xs={12} md={6}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                    className="flex-item"
                >
                    <div className={classes.paper}>
                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={16}>
                                <Grid item>
                                    <InputField
                                        label={"Comment Box"}
                                        // variant={"outlined"}
                                        id={"comment"}
                                        value={comment}
                                        fullWidth={true}
                                        multiline={true}
                                        rows={8}
                                        onChange={this.handleInput}
                                    />
                                    <Button onClick={handleClose} >
                                            <i className="material-icons clear"  >
                                                clear
                                            </i>
                                    </Button>                             
                                    <Button onClick={this.doComment} >
                                            <i className="material-icons send">
                                                 send
                                            </i>
                                    </Button>
                                </Grid>
                                {/* <Grid item xs zeroMinWidth>
                                <InputField
                            label={"Write Comment"}
                            variant={"outlined"}
                            id={"comment"}
                            value={comment}
                            fullWidth={true}
                            multiline={true}
                            rows={4}
                            onChange={this.handleInput}
                        />
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.doComment} color="primary">
                            Post
                        </Button>
                                </Grid> */}
                            </Grid>
                        </Paper>
                        {/* <Typography variant="h6" id="modal-title">
                            Post a Comment
                        </Typography>
                        <Typography variant="subtitle1" id="simple-modal-description">
                            Write your views about this product
                        </Typography>
                        <InputField
                            label={"Write Comment"}
                            variant={"outlined"}
                            id={"comment"}
                            value={comment}
                            fullWidth={true}
                            multiline={true}
                            rows={4}
                            onChange={this.handleInput}
                        />
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.doComment} color="primary">
                            Post
                        </Button> */}
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        ProductReducer: {
            product, getProductByIdLoader, getProductByIdError,
            commented, doCommentLoader, doCommentError
        },
        authReducer: { user }
    } = state;
    return {
        product, getProductByIdLoader, getProductByIdError,
        commented, doCommentLoader, doCommentError,
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doCommentOnProductAction: (payload) => dispatch(ProductAction.doCommentOnProduct(payload))
    };
};

export default (withStyles(styles)(connect(
    mapStateToProps, mapDispatchToProps
)(CommentModal)))
console.clear();