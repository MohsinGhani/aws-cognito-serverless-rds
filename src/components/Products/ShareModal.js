import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { InputField } from './../MaterialUI/index'

class ShareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_path: `${window.location.href}product/${props.product_id}`,
            host_url: window.location.href
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product_id !== this.props.product_id && this.props.product_id) {
            this.setState({
                product_path: `${window.location.href}product/${this.props.product_id}`,
            })
        }
    }

    render() {
        let { open, handleClose } = this.props
        let { product_path } = this.state
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
                        <Button onClick={this.doComment} color="primary">
                            Copy
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ShareModal;