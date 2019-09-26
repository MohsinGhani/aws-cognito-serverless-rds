import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import { InputField } from './../MaterialUI/index'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from '@material-ui/core/Modal';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    paper: {
        // position: 'absolute',
        width: 350,
        minHeight: 225,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid red',
        boxShadow: theme.shadows[5],
        padding: 0,
        margin: '100px auto',
        borderRadius: 10,
        overflow: 'hidden'
    },
})

class ShareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_path: `${window.location.href}product/${props.product_id}`,
            host_url: window.location.href,
            copied: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product_id !== this.props.product_id && this.props.product_id) {
            let url = window.location.href
            let splitedUrl = url.split('/')
            this.setState({
                product_path: `${splitedUrl[0]}//${splitedUrl[2]}/product/${this.props.product_id}`,
            })
        }
    }

    render() {
        let { open, handleClose, classes } = this.props
        let { product_path, copied } = this.state
        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={classes.modalStyle} className={classes.paper + " text-modal-wrapper"}>
                    <h2 id="simple-modal-title">Copy this Product to share</h2>
                    <p id="simple-modal-description">
                        Copy this Product to share
                        </p>

                    <button className={'text-modal-button'}>
                        {
                            copied ? 'Copied!' :
                                <CopyToClipboard text={product_path}
                                    onCopy={() => this.setState({ copied: true })}>
                                    <span>Copy to clipboard</span>
                                </CopyToClipboard>
                        }
                    </button>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ShareModal);