import React from "react";
import { Auth } from 'aws-amplify';
import credentials from './../../config/credentials'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { authAction } from './../../store/actions'

// To federated sign in from Google
class SignInWithGoogle extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        const ga = window.gapi && window.gapi.auth2 ?
            window.gapi.auth2.getAuthInstance() :
            null;
        if (!ga) this.createScript();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn) {
            this.props.history.push('/')
        }
    }

    signIn() {
        const ga = window.gapi.auth2.getAuthInstance();
        ga.signIn().then(
            googleUser => {
                this.getAWSCredentials(googleUser);
            },
            error => {
                debugger
                console.log(error);
            }
        );
    }

    async getAWSCredentials(googleUser) {
        const { id_token, expires_at } = googleUser.getAuthResponse();
        const profile = googleUser.getBasicProfile();
        let user = {
            email: profile.getEmail(),
            name: profile.getName()
        };

        Auth.federatedSignIn('google', { token: id_token, expires_at }, user)
            .then(cred => {
                // If success, you will get the AWS credentials
                // console.log(cred);
                return Auth.currentAuthenticatedUser();
            }).then(user => {
                // If success, the user object you passed in Auth.federatedSignIn
                // console.log(user);
                this.props.postSocialAuth({ email: user.email, user_id: user.id, firstname: user.name.split(" ")[0], lastname: user.name.split(" ")[1] })
            }).catch(e => {
                debugger
                console.log(e)
            });
    }

    createScript() {
        // load the Google SDK
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.onload = this.initGapi;
        document.body.appendChild(script);
    }

    initGapi() {
        // init the Google SDK client
        const g = window.gapi;
        g.load('auth2', function () {
            g.auth2.init({
                client_id: credentials.GOOGLE_CLIENT_ID,
                // authorized scopes
                scope: 'profile email openid'
            });
        });
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
                    Sign in with Google
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
)(withStyles({})(SignInWithGoogle));