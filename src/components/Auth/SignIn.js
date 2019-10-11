import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField, InputFieldWithEndAdornment } from "./../MaterialUI";
import "./index.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import { authAction } from "./../../store/actions";
import ReactLoading from "react-loading";
import TopNav from "./../common/TopNav";
import TextModal from './../common/TextModal'


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
      email: "",
      password: "",
      latitude: 36.778259,
      longitude: -119.417931,
      openTextModal: false,
      textModalTitle: '',
      textModalText: ''
    };
    this.login = this.login.bind(this);
  }

  goto = path => {
    this.props.history.push(path);
  };

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  login = () => {
    let { email, password } = this.state;

    this.props.signInAction({
      email, password
    });
  };

  closeTextModal = () => {
    this.setState({ openTextModal: false })
  }
  componentDidMount() {
    this.props.isLoggedInAction();
    if (this.props.isLoggedIn) {
      this.goto("/add-product");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggedIn) {
      this.goto("/add-product");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { authError } = this.props;
    if (prevProps.authError !== authError && authError !== null) {
      this.setState({ openTextModal: true, textModalTitle: "Login Failed!", textModalText: 'Please enter correct email and password or create an account using email or Facebook or Google' })
    }
  }

  render() {
    let { classes, authLoader } = this.props;
    let { email, password, textModalText, textModalTitle, openTextModal } = this.state;
    let isDisableBtn = email && password
    return (
      <div style={{ backgroundImage: 'url(' + require("./../../assets/img/map-image.jpg") + ')', height: "100vh", backgroundRepeat: 'no', backgroundSize: 'cover' }}>
        <TopNav />
        <TextModal
          open={openTextModal}
          handleClose={this.closeTextModal}
          title={textModalTitle}
          text={textModalText}
        />
        <br />
        <Card className="signip-container">
          <Grid container spacing={16}>
            <Grid item md={12} sm={12} xs={12}>
              <h1 className={`title center ${classes.p05}`}> Sign In </h1>{" "}
              <h3 className={`sub-title center ${classes.p05}`}>
                By continuing you accept our<a onClick={()=>this.goto('/privacy')} style={{ cursor: "pointer", color: "blue", paddingLeft: '5px' }}> Policies</a>{" "}
              </h3>{" "}

              <Grid container>
                <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                  <InputField
                    label={"Email address"}
                    variant={"outlined"}
                    id={"email"}
                    name={"email"}
                    fullWidth={true}
                    onChange={this.handleInput}
                  />{" "}
                </Grid>{" "}
              </Grid>{" "}
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
                  />{" "}
                </Grid>{" "}
              </Grid>{" "}
              <Grid container className={classes.login_btn_parent}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  fullWidth
                  onClick={this.login}
                  disabled={!isDisableBtn || authLoader}
                >
                  {" "}
                  {authLoader ? (
                    <div>
                      <ReactLoading
                        type={"spin"}
                        color={"#fff"}
                        height={"25px"}
                        width={"25px"}
                      />{" "}
                    </div>
                  ) : (
                      "Login"
                    )}{" "}
                </Button>{" "}
              </Grid>{" "}
              <Divider />
              <Grid container className={classes.btns_parent}>
                <Button
                  onClick={() => this.goto("/signup")}
                  color="primary"
                  className={classes.button}
                >
                  Create account{" "}
                </Button>{" "}
                <Button
                  onClick={() => this.goto("/forgot-password")}
                  color="primary"
                  className={classes.button}
                >
                  Forgot password ?
                  </Button>{" "}
              </Grid>{" "}
              <SignInWithGoogle history={this.props.history} /> <br />
              <SignInWithFacebook history={this.props.history} />{" "}
            </Grid>{" "}
          </Grid>{" "}
        </Card>{" "}
      </div >
    );
  }
}

const mapStateToProps = state => {
  const {
    authReducer: { signupUser, authLoader, authError, isLoggedIn }
  } = state;
  return {
    signupUser,
    authLoader,
    authError,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signInAction: payload => dispatch(authAction.signIn(payload)),
    isLoggedInAction: payload => dispatch(authAction.isLoggedIn(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SignIn)));
