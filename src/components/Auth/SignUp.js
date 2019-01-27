import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import './index.css'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Card className="signup-container">
                <h1 className="title">Create your Account</h1>
                <h3 className="sub-title">Continue to Product Name</h3>
            </Card>
        )
    }
}



export default withStyles({})(SignUp);