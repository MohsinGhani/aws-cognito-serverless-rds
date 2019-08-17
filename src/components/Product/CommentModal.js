
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ProductAction } from './../../store/actions'
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1'
import { InputField } from './../MaterialUI/index'

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
        let { open, handleClose } = this.props
        let { comment } = this.state
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Post a Comment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Write your views about this product
                        </DialogContentText>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.doComment} color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
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

export default connect(
    mapStateToProps, mapDispatchToProps
)(CommentModal);