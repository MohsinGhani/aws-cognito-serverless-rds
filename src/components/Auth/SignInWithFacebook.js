import React from "react";
import { Auth } from 'aws-amplify';
import credentials from '../../config/credentials'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { authAction } from './../../store/actions'

function waitForInit() {
    return new Promise((res, rej) => {
        const hasFbLoaded = () => {
            if (window.FB) {
                res();
            } else {
                setTimeout(hasFbLoaded, 300);
            }
        };
        hasFbLoaded();
    });
}

// To federated sign in from Facebook
class SignInWithFacebook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.getAWSCredentials = this.getAWSCredentials.bind(this);
    }

    componentDidMount() {
        waitForInit();
    }

    signIn = () => {
        const fb = window.FB;
        fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.getAWSCredentials(response.authResponse);
            } else {
                fb.login(
                    response => {
                        if (!response || !response.authResponse) return;
                        this.getAWSCredentials(response.authResponse);
                    },
                    {
                        // the authorized scopes
                        scope: 'public_profile,email'
                    }
                );
            }
        });
    }

    getAWSCredentials = (response) => {
        const { accessToken, expiresIn } = response;
        const date = new Date();
        const expires_at = expiresIn * 1000 + date.getTime();
        if (!accessToken) {
            return;
        }

        const fb = window.FB;
        fb.api('/me', { fields: 'name,email' }, response => {
            const user = {
                name: response.name,
                email: response.email
            };

            Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
                .then(cred => {
                    // If success, you will get the AWS credentials
                    // console.log(cred);
                    return Auth.currentAuthenticatedUser();
                }).then(user => {
                    // If success, the user object you passed in Auth.federatedSignIn
                    // console.log(user);
                    this.props.postSocialAuth({ email: user.email, user_id: user.id, firstname: user.name.split(" ")[0], lastname: user.name.split(" ")[1] })

                }).catch(e => {
                    // debugger
                    console.log(e)
                });
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn) {
            this.props.history.push('/')
        }
    }

    render() {
        let { authLoader } = this.props
        return (
            <div>
                <Button
                    variant="contained"
                    // color="primary"
                    fullWidth
                    onClick={this.signIn}
                    disabled={authLoader}
                >
                    Sign in with Facebook
              </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { authReducer: { authLoader, authError, isLoggedIn } } = state;
    return {
        authLoader, authError, isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postSocialAuth: (payload) => dispatch(authAction.postSocialAuth(payload))
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles({})(SignInWithFacebook));