import React from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
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
  }
});

class ConfirmSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationCode: ''
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

  confirmCodeHandler = () => {
    let { signupUser } = this.props
    let { confirmationCode } = this.state
    this.props.confirmSignUpAction({ user: signupUser, code: confirmationCode })
  }

  componentDidMount() {
    let { signupUser } = this.props
    if (!signupUser) {
      this.goto('/signup')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.confirmSignupLoader && !this.props.confirmSignupLoader && !this.props.confirmSignupError && this.props.confirmSignup) {
      this.goto('/signin')
    }
  }

  render() {
    let { classes, confirmSignupLoader, confirmSignupError } = this.props;
    return (
      <Card className="signip-container">
        <Grid container spacing={16}>
          <Grid item md={12} sm={12} xs={12}>
            <h1 className={`title center ${classes.p05}`}>Confirm SignUp</h1>
            {confirmSignupError ? JSON.stringify(confirmSignupError) : ''}
            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"Confirmation Code"}
                  variant={"outlined"}
                  id={"confirmationCode"}
                  fullWidth={true}
                  type={"number"}
                  onChange={this.handleInput}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.btns_parent}>
              <Button
                onClick={() => this.goto("/signup")}
                color="primary"
                className={classes.button}
              >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.confirmCodeHandler}
                disabled={confirmSignupLoader}
              >
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer: { signupUser, confirmSignup, confirmSignupLoader, confirmSignupError } } = state;
  return {
    signupUser, confirmSignup, confirmSignupLoader, confirmSignupError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    confirmSignUpAction: (payload) => dispatch(authAction.confirmSignUp(payload))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(withStyles(styles)(ConfirmSignUp)));
