import React from "react";
import { withStyles } from "@material-ui/core/styles";
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

class ForgotPassword extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    let { classes } = this.props;
    return (
      <Card className="signip-container">
        <Grid container spacing={16}>
          <Grid item md={12} sm={12} xs={12}>
            <h1 className={`title center ${classes.p05}`}>Account recovery</h1>

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
        </Grid>
      </Card>
    );
  }
}

export default withStyles(styles)(ForgotPassword);
