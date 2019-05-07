import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField, InputFieldWithEndAdornment } from "./../MaterialUI";
import "./index.css";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { authAction } from './../../store/actions'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
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
    marginTop: "15px"
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'flex'
  },
  root: {
    backgroundColor: "transparent",
    width: '100%',
    height: "90%",
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
    // backgroundColor: 'white',
    // boxShadow: theme.shadows[50],
    width: theme.spacing.unit * 50,
    margin: '20px',
    padding: '10px 0px',
    position: 'relative',
    borderRadius: '20px',
    marginTop: '-200px',
    textAlign: 'center',
  },
  errorModel: {
    backgroundColor: 'red',
    opacity: '0px',
    fontSize: '40px',
    border: '10px solid 	#E8E8E8',
    borderTop: '20px solid 	#E8E8E8',
  },
  confirmModel: {
    backgroundColor: 'green',
    opacity: '0px',
    fontSize: '40px',
    border: '10px solid 	#E8E8E8',
    borderTop: '20px solid 	#E8E8E8',
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      isPhoneVerificationEnable: false,
      open: false,
      error: {
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        confirmPassword: null,
        phone: null
      },
      isSignupButtonDisabled: true
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
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.firstname !== this.state.firstname || prevState.lastname !== this.state.lastname || prevState.password !== this.state.password || prevState.confirmPassword !== this.state.confirmPassword) {
      this.validateSignupForm()
    }

    if (prevProps.authLoader && !this.props.authLoader && !this.props.authError && this.props.signupUser) {
      this.goto('/confirm-signup')
    }
  }

  validateSignupForm = () => {
    let { firstname, lastname, email, password, confirmPassword, error } = this.state
    if (firstname.length >= 3 && lastname.length >= 3 && confirmPassword.length >= 8 && password.length >= 8 && confirmPassword === password && email) {
      error = { firstname: null, lastname: null, email: null, password: null, confirmPassword: null }
      this.setState({ isSignupButtonDisabled: false, error })
    }
    else if (confirmPassword && password && confirmPassword !== password) {
      error.confirmPassword = 'Confirm Password do not match'
      this.setState({ isSignupButtonDisabled: true, error })
    }
    else if (confirmPassword.length < 8 && password.length < 8) {
      error.password = "password does not meet the requirements"
      this.setState({ isSignupButtonDisabled: true, error })
    }
    else {
      error = { firstname: null, lastname: null, email: null, password: null, confirmPassword: null }
      this.setState({ isSignupButtonDisabled: true, error })
    }
  }

  handleSignUp = () => {
    this.setState({ open: true });
    let { firstname, lastname, email, phone, password, isPhoneVerificationEnable } = this.state
    this.props.signUpAction({ firstname, lastname, email, phone, password, isPhoneVerificationEnable })
  }

  componentDidMount() {
    this.props.isLoggedInAction()
    if (this.props.isLoggedIn) {
      this.goto('/add-product')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn) {
      setTimeout(() => {
        this.goto('/add-product')
      }, 500)
    }
  }

  handleVerificationOption = (e) => {
    debugger
  }

  render() {
    let { classes, authLoader, authError } = this.props;
    return (
      <Card className="signup-container">
        <Grid container spacing={16}>
          <Grid item md={7} sm={12} xs={12}>
            <h1 className={`title ${classes.p05}`}>
              Create your Productmania Account
            </h1>
            <h3 className={`sub-title ${classes.p05}`}>
              Continue to Productmania
            </h3>
            {
              authError ? (
                <div>
                  <p>sorry</p>
                  <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    style={{ backgroundColor: 'red' }}
                    className={classes.errorModel}
                    onClose={this.handleClose}
                    BackdropProps={{
                      classes: {
                        root: classes.root
                      }
                    }
                    }
                    PaperProps={{
                      classes: {
                        root: classes.paper
                      }
                    }}
                  >
                    <div>
                      <DialogTitle variant="h1" id="dialogTitle">Oops!</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="dialogText">
                          {authError}
                        </DialogContentText>
                      </DialogContent>
                      <Typography>
                        <Button onClick={this.handleClose} id="closeButton">
                          OK
                    </Button>
                      </Typography>
                    </div>
                  </Dialog>
                </div>
              ) : setTimeout(() => (
                <div>
                  <p>sorry</p>
                  <Dialog
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    className={classes.confirmModel}
                    onClose={this.handleClose}
                    BackdropProps={{
                      classes: {
                        root: classes.root
                      }
                    }
                    }
                    PaperProps={{
                      classes: {
                        root: classes.paper
                      }
                    }}
                  >
                    <div>
                      <DialogTitle variant="h1" id="dialogTitle">Thank You!</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="dialogText">
                          You have succesfully submitted the form
                    </DialogContentText>
                      </DialogContent>
                      <Typography>
                        <Button onClick={this.handleClose} id="closeButton">
                          OK
                        </Button>
                      </Typography>
                    </div>
                  </Dialog>
                </div>), 3000)
            }

            <Grid container>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"First name"}
                  variant={"outlined"}
                  id={"firstname"}
                  fullWidth={true}
                  value={this.state.firstname}
                  onChange={this.handleInput}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"Last name"}
                  variant={"outlined"}
                  id={"lastname"}
                  fullWidth={true}
                  value={this.state.lastname}
                  onChange={this.handleInput}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"Email address"}
                  variant={"outlined"}
                  id={"email"}
                  fullWidth={true}
                  value={this.state.email}
                  onChange={this.handleInput}
                  helperText={"You can use letters, numbers & periods"}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"Phone Number"}
                  variant={"outlined"}
                  id={"phone"}
                  fullWidth={true}
                  value={this.state.phone}
                  onChange={this.handleInput}
                  helperText={"Phone number must be in E.164 format"}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputFieldWithEndAdornment
                  label={"Password"}
                  variant={"outlined"}
                  id={"password"}
                  fullWidth={true}
                  type={"password"}
                  onChange={this.handleInput}
                  value={this.state.password}
                  error={this.state.error.password}
                  helperText={this.state.error.password}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputFieldWithEndAdornment
                  label={"Confirm Password"}
                  variant={"outlined"}
                  id={"confirmPassword"}
                  fullWidth={true}
                  type={"password"}
                  onChange={this.handleInput}
                  value={this.state.confirmPassword}
                  error={this.state.error.confirmPassword}
                  helperText={this.state.error.confirmPassword}
                />
              </Grid>
              <label className={`custom-input-label ${classes.p05}`}>
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </label>
            </Grid>
            {/* <hr />
            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Radio
                      checked={!this.state.isPhoneVerificationEnable}
                      onChange={() => this.setState({ isPhoneVerificationEnable: false })}
                      value="Email"
                      name="radio-button-demo"
                      aria-label="Email"
                    />
                    <FormLabel style={{ textAlign: 'center' }} component="legend">Verify by Email</FormLabel>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Radio
                      checked={this.state.isPhoneVerificationEnable}
                      onChange={() => this.setState({ isPhoneVerificationEnable: true })}
                      value="Phone"
                      name="radio-button-demo"
                      aria-label="Phone"
                    />
                    <FormLabel style={{ textAlign: 'center' }} component="legend">Verify by Phone</FormLabel>
                  </div>
                </div>
              </Grid>
            </Grid> */}
            <hr />
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
                disabled={this.state.isSignupButtonDisabled || authLoader}
                onClick={this.handleSignUp}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item md={5}>
              <figure className="vertical-center">
                <center>
                  <img
                    src={require("./../../assets/img/account.svg")}
                    alt="Signup"
                    height="244"
                    width="244"
                  />
                  <figcaption className="figcaption">
                    One account. All of Productmania working for you.
                  </figcaption>
                </center>
              </figure>
            </Grid>
          </Hidden>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer: { signupUser, authLoader, authError, isLoggedIn } } = state;
  return {
    signupUser, authLoader, authError, isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpAction: (payload) => dispatch(authAction.signUp(payload)),
    isLoggedInAction: (payload) => dispatch(authAction.isLoggedIn(payload)),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(styles)(SignUp)));
