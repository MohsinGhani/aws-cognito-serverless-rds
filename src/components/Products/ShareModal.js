import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputField } from './../MaterialUI/index'
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
        let { open, handleClose } = this.props
        let { product_path, copied } = this.state
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Copy this URL to share</DialogTitle>
                    <DialogContent>
                        <InputField
                            label={"Product URL to share"}
                            variant={"outlined"}
                            id={"product_path"}
                            value={product_path}
                            fullWidth={true}
                            multiline={true}
                            rows={3}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button color="primary">
                            {
                                copied ? 'Copied!' :
                                    <CopyToClipboard text={product_path}
                                        onCopy={() => this.setState({ copied: true })}>
                                        <span>Copy to clipboard</span>
                                    </CopyToClipboard>
                            }
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ShareModal;