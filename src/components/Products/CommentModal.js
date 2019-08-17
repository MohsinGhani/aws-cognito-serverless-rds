import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ProductAction } from './../../store/actions'
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1'
import Modal from '@material-ui/core/Modal';
import { InputField } from './../MaterialUI/index'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import "./index.css";
const styles = theme => ({

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
        let { open, handleClose, classes } = this.props
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
                                <Grid item style={{flex:1}}>
                                    <InputField
                                        label={"Comment Box"}
                                        // variant={"outlined"}
                                        id={"comment"}
                                        value={comment}
                                        fullWidth={true}
                                        multiline={true}
                                        rows={8}
                                        onChange={this.handleInput}
                                        maxLength="1000"
                                    />
                                    <div className="comment-footer-div">

                                        <Button onClick={handleClose} >
                                            <i className="material-icons clear"  >
                                                clear
                                            </i>
                                        </Button>
                                        <Button className={"sendButton"} onClick={this.doComment} >
                                            <i className="material-icons send">
                                                send
                                            </i>
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
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
