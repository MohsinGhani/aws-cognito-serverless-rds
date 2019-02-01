import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField, InputFieldWithEndAdornment } from "./../MaterialUI";
import "./index.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Auth } from 'aws-amplify';
import SignInWithGoogle from './SignInWithGoogle'
import SignInWithFacebook from './SignInWithFacebook'

const styles = theme => ({
  p05: {
    padding: "5px"
  },
  button: {
    margin: theme.spacing.unit
  },
  btns_parent: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px"
  },
  login_btn_parent: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px"
  }
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this)
  }

  goto = path => {
    this.props.history.push(path);
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  async login() {
    let { email, password } = this.state
    let username = email
    try {
      const user = await Auth.signIn(username, password);
      alert('user successfully logged in')
      if (user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        // // You need to get the code from the UI inputs
        // // and then trigger the following function with a button click
        // const code = getCodeFromUserInput();
        // // If MFA is enabled, sign-in should be confirmed with the confirmation code
        // const loggedUser = await Auth.confirmSignIn(
        //   user,   // Return object from Auth.signIn()
        //   code,   // Confirmation code  
        //   mfaType // MFA Type e.g. SMS, TOTP.
        // );
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        // You need to get the new password and required attributes from the UI inputs
        // and then trigger the following function with a button click
        // For example, the email and phone_number are required attributes
        // const { username, email, phone_number } = getInfoFromUserInput();
        const loggedUser = await Auth.completeNewPassword(
          user,               // the Cognito User Object
          password,       // the new password
          // OPTIONAL, the required attributes
          {
            email,
            // phone_number,
          }
        );
      } else if (user.challengeName === 'MFA_SETUP') {
        // This happens when the MFA method is TOTP
        // The user needs to setup the TOTP before using it
        // More info please check the Enabling MFA part
        Auth.setupTOTP(user);
      } else {
        // The user directly signs in
        console.log(user)
      }
    } catch (err) {
      console.log(err);
      alert(err.message)
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else {
        console.log(err);
      }
    }

    // For advanced usage
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    // Auth.signIn({
    //   username, // Required, the username
    //   password, // Optional, the password
    //   // validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
    // }).then(user => { console.log(user) })
    //   .catch(err => { console.log(err) });
  }

  render() {
    let { classes } = this.props;
    return (
      <Card className="signip-container">
        <Grid container spacing={16}>
          <Grid item md={12} sm={12} xs={12}>
            <h1 className={`title center ${classes.p05}`}>Sign In</h1>
            <h3 className={`sub-title center ${classes.p05}`}>
              to continue to Productmania
            </h3>

            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"Email address"}
                  variant={"outlined"}
                  id={"email"}
                  name={"email"}
                  fullWidth={true}
                  onChange={this.handleInput}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <InputFieldWithEndAdornment
                  label={"Password"}
                  variant={"outlined"}
                  id={"password"}
                  name={"password"}
                  fullWidth={true}
                  type={"password"}
                  onChange={this.handleInput}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.login_btn_parent}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
                onClick={this.login}
              >
                Login
              </Button>
            </Grid>
            <Divider />
            <Grid container className={classes.btns_parent}>
              <Button
                onClick={() => this.goto("/signup")}
                color="primary"
                className={classes.button}
              >
                Create account
              </Button>

              <Button
                onClick={() => this.goto("/forgot-password")}
                color="primary"
                className={classes.button}
              >
                Forgot password?
              </Button>
            </Grid>

            <SignInWithGoogle />
            <br />
            <SignInWithFacebook />
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(SignIn);
