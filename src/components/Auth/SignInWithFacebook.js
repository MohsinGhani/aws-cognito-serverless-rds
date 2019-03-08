import React from "react";
import { Auth } from 'aws-amplify';
import credentials from './../../config/credentials'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
        // this.signIn = this.signIn.bind(this);
        this.getAWSCredentials = this.getAWSCredentials.bind(this);
    }

    componentDidMount() {
        waitForInit();
        // if (!window.FB) this.createScript();
    }

    // statusChangeCallback = response => {
    //     if (response.status === "connected") {
    //         debugger
    //         this.handleResponse(response.authResponse);
    //     } else {
    //         debugger
    //         this.handleError(response);
    //     }
    // };

    // checkLoginState = () => {
    //     window.FB.getLoginStatus(this.statusChangeCallback);
    // };

    // handleClick = () => {
    //     window.FB.login(this.checkLoginState, { scope: "public_profile,email" });
    // };

    // handleError(error) {
    //     alert(error);
    // }

    // async handleResponse(data) {
    //     const { email, accessToken: token, expiresIn } = data;
    //     const expires_at = expiresIn * 1000 + new Date().getTime();
    //     const user = { email };

    //     this.setState({ isLoading: true });

    //     try {
    //         const response = await Auth.federatedSignIn(
    //             "facebook",
    //             { token, expires_at },
    //             user
    //         );
    //         debugger
    //         this.setState({ isLoading: false });
    //         // this.props.onLogin(response);
    //     } catch (e) {
    //         debugger
    //         this.setState({ isLoading: false });
    //         this.handleError(e);
    //     }
    // }

    signIn() {
        const fb = window.FB;
        fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                debugger
                // this.getAWSCredentials(response.authResponse);
                response = response.authResponse
                const { accessToken, expiresIn } = response;
                const date = new Date();
                const expires_at = expiresIn * 1000 + date.getTime();
                if (!accessToken) {
                    return;
                }

                const fb = window.FB;
                fb.api('/me', { fields: 'name,email' }, response => {
                    debugger
                    const user = {
                        name: response.name,
                        email: response.email
                    };

                    Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
                        .then(credentials => {
                            console.log(credentials);
                        });
                });
                /////////////////////
            } else {
                fb.login(
                    response => {
                        debugger
                        if (!response || !response.authResponse) {
                            return;
                        }
                        // this.getAWSCredentials(response.authResponse);
                        response = response.authResponse
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
                                .then(credentials => {
                                    debugger
                                    console.log(credentials);
                                })
                                .catch((err)=>{
                                    debugger
                                })
                        });
                        //////////////////
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
        debugger
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
                .then(credentials => {
                    console.log(credentials);
                });
        });
    }

    // createScript() {
    //     // load the sdk
    //     window.fbAsyncInit = this.fbAsyncInit;
    //     const script = document.createElement('script');
    //     script.src = 'https://connect.facebook.net/en_US/sdk.js';
    //     script.async = true;
    //     script.onload = this.initFB;
    //     document.body.appendChild(script);
    // }

    // initFB() {
    //     const fb = window.FB;
    //     console.log('FB SDK inited', fb);
    // }

    // fbAsyncInit() {
    //     // init the fb sdk client
    //     const fb = window.FB;
    //     fb.init({
    //         appId: credentials.FB_APP_ID,
    //         cookie: true,
    //         xfbml: true,
    //         version: 'v2.11'
    //     });
    // }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    // color="primary"
                    fullWidth
                    onClick={this.signIn}
                // onClick={this.handleClick}
                >
                    Sign in with Facebook
              </Button>
            </div>
        );
    }
}

export default withStyles({})(SignInWithFacebook);