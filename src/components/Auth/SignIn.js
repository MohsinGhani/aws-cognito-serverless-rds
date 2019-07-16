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
import credentials from "../../config/credentials";
import ReactMapboxGl from "react-mapbox-gl";
import Location from "./../common/Location";
import swal from "sweetalert";

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

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
      longitude: -119.417931
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

    !email && !password
      ? swal("", "email & password are required fields!", "error")
      : !email || !password
      ? !email
        ? swal("", "email is required!", "error")
        : swal("", "password is required!", "error")
      : this.props.signInAction({
          email,
          password
        });
  };

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

  render() {
    let { classes, authError, authLoader } = this.props;
    let { latitude, longitude } = this.state;
    return (
      <div>
        <Location
          handleLocation={(latitude, longitude) => {
            this.setState({
              latitude,
              longitude
            });
          }}
        />{" "}
        <TopNav />
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "89vh",
            width: "100%"
          }}
          movingMethod={"jumpTo"}
          center={[longitude, latitude]}
          zoom={[12]}
          // onClick={(map, e) => { this.props.reverseGeoCodingAction(e.lngLat) }}
        >
          <br />
          <Card className="signip-container">
            <Grid container spacing={16}>
              <Grid item md={12} sm={12} xs={12}>
                <h1 className={`title center ${classes.p05}`}> Sign In </h1>{" "}
                <h3 className={`sub-title center ${classes.p05}`}>
                  to continue to Productmania{" "}
                </h3>{" "}
                {authError ? (
                  <p className="text-alert"> {JSON.stringify(authError)} </p>
                ) : (
                  ""
                )}{" "}
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
                    disabled={authLoader}
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
        </Map>{" "}
      </div>
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
