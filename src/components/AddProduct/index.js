import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TopNav from './../common/TopNav'
import "./index.css";

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      street: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    let { classes } = this.props;
    return (
      <div>
        <TopNav />
        <div className="container">
          <Grid container className={classes.root} spacing={16}>
            <Grid item md={12} sm={12} xs={12}>
              <InputField
                label={"Title"}
                variant={"outlined"}
                id={"title"}
                fullWidth={true}
                onChange={this.handleInput}
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <InputField
                label={"Description"}
                variant={"outlined"}
                id={"description"}
                fullWidth={true}
                onChange={this.handleInput}
                multiline={true}
                rowsMax={'4'}
                rows={'4'}
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <AutoSelectInputField />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <InputField
                label={"Street Address"}
                variant={"outlined"}
                id={"street"}
                fullWidth={true}
                onChange={this.handleInput}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddProduct);
