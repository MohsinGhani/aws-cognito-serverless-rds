import React from "react";
import { Auth } from 'aws-amplify';
import credentials from './../../config/credentials'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

    signIn() {
        const ga = window.gapi.auth2.getAuthInstance();
        ga.signIn().then(
            googleUser => {
                debugger
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

        const credentials = await Auth.federatedSignIn(
            'google',
            { token: id_token, expires_at },
            user
        );
        console.log('credentials', credentials);
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
        return (
            <div>
                <Button
                    variant="contained"
                    // color="primary"
                    fullWidth
                    onClick={this.signIn}
                >
                    Sign in with Google
              </Button>
            </div>
        );
    }
}

export default withStyles({})(SignInWithGoogle);