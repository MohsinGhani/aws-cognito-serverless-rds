import React from "react";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import { authAction } from './../../store/actions'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField } from "./../MaterialUI";
import "./index.css";
import Button from "@material-ui/core/Button";

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
  },
  recoveryLinkMessage: {
    textAlign: "center",
    fontSize: 13,
    border: "1px solid #4caf50",
    backgroundColor: "#c1e1c5",
    color: "#4caf50",
    borderRadius: 2,
    padding: "5px 4px",
  },
  recoveryLinkMessageError: {
    textAlign: "center",
    fontSize: 13,
    border: "1px solid #d32f2f",
    backgroundColor: "rgba(211, 47, 47, 0.2)",
    color: "#d32f2f",
    borderRadius: 2,
    padding: "5px 4px",
  }
});

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: null,
      userPass: null,
      confirmPassword: null,
      confirmationCode: null,
      error: {
        userEmail: null,
        userPass: null,
        confirmPassword: null,
        confirmationCode: null
      },
      isSignupButtonDisabled: true,
      isHideMessage: true
    }
  }

  goto = path => {
    this.props.history.push(path);
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userEmail !== this.state.userEmail || prevState.confirmationCode !== this.state.confirmationCode || prevState.userPass !== this.state.userPass || prevState.confirmPassword !== this.state.confirmPassword) {
      this.validateSignupForm()
    }

    if (this.props.confirmNewPassword !== prevProps.confirmNewPassword) {
      this.goto('/signin')
    }
    
    if (this.props.forgotPasswordError !== prevProps.forgotPasswordError || this.props.confirmNewPasswordError !== prevProps.confirmNewPasswordError) {
      this.setState({
        isHideMessage: false
      })
    }
  }

  validateSignupForm = () => {
    let { userEmail, error, confirmPassword, userPass, confirmationCode } = this.state

    if (userEmail) {
      this.setState({ isSignupButtonDisabled: false, error })

      if ((confirmPassword && confirmPassword.length >= 8) && (userPass && userPass.length >= 8) && (confirmPassword && confirmPassword === userPass) && (confirmationCode && confirmationCode.length === 6)) {
        error = { userPass: null, confirmPassword: null, confirmationCode: null }
        this.setState({ isSignupButtonDisabled: false, error })
      }
      else if (confirmPassword && userPass && confirmPassword !== userPass) {
        this.setState(prevState => ({
          isSignupButtonDisabled: true, error: {
            ...prevState.error,
            confirmPassword: 'Confirm Password do not match'
          }
        }))
      }
      else if ((confirmPassword && confirmPassword.length < 8) && (userPass && userPass.length < 8)) {

        this.setState(prevState => ({
          isSignupButtonDisabled: true, error: {
            ...prevState.error,
            userPass: "password does not meet the requirements"
          }
        }))
      }
      else if ((confirmationCode && confirmationCode.length !== 6)) {

        this.setState(prevState => ({
          isSignupButtonDisabled: true, error: {
            ...prevState.error,
            confirmationCode: "Incorrect confirmation code"
          }
        }))
      }
    }
    else {
      this.setState(prevState => ({
        isSignupButtonDisabled: true, error: {
          ...prevState.error,
          userEmail: "Please provide correct email address"
        }
      }))
    }
  }

  handleConfirmNewPass = () => {

    let { userPass, confirmationCode, userEmail } = this.state;

    this.props.confirmNewPasswordAction({ userEmail, code: confirmationCode, userPass });
  }

  handleForgotPassword = () => {
    let { userEmail } = this.state;

    this.props.forgotPasswordAction(userEmail);
  }

  componentDidMount() {
    this.props.isLoggedInAction()
    if (this.props.isLoggedIn) {
      this.goto('/add-product')
    }
  }

  errorMessage = (message) => {

    let {classes} = this.props;
    
    setTimeout(()=>{
      this.setState({
        isHideMessage: true
      })
    }, 5000)
    
    return (
      <Grid container>
        <Grid item md={12} sm={12} xs={12} className={classes.p05}>
          <p className={classes.recoveryLinkMessageError}>{message}</p>
        </Grid>
      </Grid>
    )
  }

  render() {
    let { classes, forgotPassword, forgotPasswordError, confirmNewPasswordLoader, confirmNewPasswordError } = this.props;
    let { userEmail, userPass, confirmPassword, confirmationCode, error, isSignupButtonDisabled, isHideMessage } = this.state;

    return (
      <Card className="signip-container">
        <Grid container spacing={16}>
          <Grid item md={12} sm={12} xs={12}>
            <h1 className={`title center ${classes.p05}`}>Account recovery</h1>

            {
              !forgotPassword && !confirmNewPasswordLoader ? (
                <React.Fragment>
                  <Grid container>
                    <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                      <InputField
                        label={"Email address"}
                        variant={"outlined"}
                        id={"userEmail"}
                        error={error.userEmail}
                        fullWidth={true}
                        value={userEmail ? userEmail : ""}
                        onChange={this.handleInput}
                      />
                    </Grid>
                  </Grid>

                  <Grid container className={classes.btns_parent}>
                    <Button
                      onClick={() => this.goto("/signin")}
                      color="primary"
                      className={classes.button}
                    >
                      Sign in instead
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.handleForgotPassword}
                      disabled={this.state.isSignupButtonDisabled}
                    >
                      Next
                    </Button>
                  </Grid>
                </React.Fragment>
              ) : (
                  <Grid container>
                    <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                      <InputField
                        label={"Confirmation Code"}
                        variant={"outlined"}
                        id={"confirmationCode"}
                        fullWidth={true}
                        type={"number"}
                        onChange={this.handleInput}
                        value={confirmationCode ? confirmationCode : ""}
                        error={error.confirmationCode}
                        helperText={error.confirmationCode}
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                      <InputField
                        label={"New Password"}
                        variant={"outlined"}
                        id={"userPass"}
                        fullWidth={true}
                        type={"password"}
                        onChange={this.handleInput}
                        value={userPass ? userPass : ""}
                        error={error.userPass}
                        helperText={error.userPass}
                      />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                      <InputField
                        label={"Confirm New Password"}
                        variant={"outlined"}
                        id={"confirmPassword"}
                        fullWidth={true}
                        type={"password"}
                        onChange={this.handleInput}
                        value={confirmPassword ? confirmPassword : ""}
                        error={error.confirmPassword}
                        helperText={error.confirmPassword}
                      />
                    </Grid>
                    <label className={`custom-input-label ${classes.p05}`}>
                      Use 8 or more characters with a mix of letters, numbers &amp;
                      symbols
                    </label>

                    <Grid container className={classes.btns_parent}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleConfirmNewPass}
                        disabled={isSignupButtonDisabled || confirmNewPasswordLoader}
                      >
                        Next
                    </Button>
                    </Grid>
                  </Grid>
                )
            }

            {
              forgotPasswordError && !isHideMessage ? (
                this.errorMessage(forgotPasswordError)
              ) : null
            }

            {
              confirmNewPasswordError && !isHideMessage ? (
                this.errorMessage(confirmNewPasswordError)
              ) : null
            }

          </Grid>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer: {
    forgotPassword,
    forgotPasswordError,
    authLoader,
    authError,
    isLoggedIn,
    confirmNewPassword,
    confirmNewPasswordError,
    confirmNewPasswordLoader
  } } = state;
  return {
    forgotPassword,
    forgotPasswordError,
    confirmNewPassword,
    confirmNewPasswordError,
    authLoader,
    authError,
    isLoggedIn,
    confirmNewPasswordLoader
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPasswordAction: (payload) => dispatch(authAction.forgotPassword(payload)),
    confirmNewPasswordAction: (payload) => dispatch(authAction.confirmNewPassword(payload)),
    isLoggedInAction: (payload) => dispatch(authAction.isLoggedIn(payload)),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(styles)(ForgotPassword)));
