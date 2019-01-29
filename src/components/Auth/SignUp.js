import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField, InputFieldWithEndAdornment } from "./../MaterialUI";
import "./index.css";
import Hidden from "@material-ui/core/Hidden";
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
    marginTop: "15px"
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    let { classes } = this.props;
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
            <Grid container>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"First name"}
                  variant={"outlined"}
                  id={"firstname"}
                  fullWidth={true}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputField
                  label={"Last name"}
                  variant={"outlined"}
                  id={"lastname"}
                  fullWidth={true}
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
                  helperText={"You can use letters, numbers & periods"}
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
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12} className={classes.p05}>
                <InputFieldWithEndAdornment
                  label={"Confirm"}
                  variant={"outlined"}
                  id={"confirm"}
                  fullWidth={true}
                  type={"password"}
                />
              </Grid>
              <label className={`custom-input-label ${classes.p05}`}>
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </label>
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

export default withStyles(styles)(SignUp);
