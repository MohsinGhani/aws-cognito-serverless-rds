import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField, InputFieldWithEndAdornment } from "./../MaterialUI";
import "./index.css";
import Divider from "@material-ui/core/Divider";
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

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  goto = path => {
    this.props.history.push(path);
  };

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
                  fullWidth={true}
                />
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={12} sm={12} xs={12} className={classes.p05}>
                <InputFieldWithEndAdornment
                  label={"Password"}
                  variant={"outlined"}
                  id={"password"}
                  fullWidth={true}
                  type={"password"}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.login_btn_parent}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
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
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(SignIn);
