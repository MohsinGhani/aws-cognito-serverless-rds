import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Button from "@material-ui/core/Button";
import TopNav from './../common/TopNav'
import Location from './../common/Location'
import SelectCategory from './../SelectCategory'
import Icon from '@material-ui/core/Icon';
import "./index.css";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '10px 0 0 0',
  }
});

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      title: '',
      description: '',
      street: '',
      suggestions: [
        { label: 'Afghanistan' },
        { label: 'Aland Islands' },
        { label: 'Albania' },
        { label: 'Algeria' },
        { label: 'American Samoa' },
        { label: 'Andorra' },
        { label: 'Angola' },
        { label: 'Anguilla' },
        { label: 'Antarctica' },
        { label: 'Antigua and Barbuda' },
        { label: 'Argentina' },
        { label: 'Armenia' },
        { label: 'Aruba' },
        { label: 'Australia' },
        { label: 'Austria' },
        { label: 'Azerbaijan' },
        { label: 'Bahamas' },
        { label: 'Bahrain' },
        { label: 'Bangladesh' },
        { label: 'Barbados' },
        { label: 'Belarus' },
        { label: 'Belgium' },
        { label: 'Belize' },
        { label: 'Benin' },
        { label: 'Bermuda' },
        { label: 'Bhutan' },
        { label: 'Bolivia, Plurinational State of' },
        { label: 'Bonaire, Sint Eustatius and Saba' },
        { label: 'Bosnia and Herzegovina' },
        { label: 'Botswana' },
        { label: 'Bouvet Island' },
        { label: 'Brazil' },
        { label: 'British Indian Ocean Territory' },
        { label: 'Brunei Darussalam' },
      ],
      getLocation: false,
      isSelectCatModal: true
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    let { classes } = this.props;
    let { getLocation, isSelectCatModal, selectedCategory } = this.state;
    return (
      <div>
        <SelectCategory
          open={isSelectCatModal}
          handleClose={() => this.setState({ isSelectCatModal: false })}
        />
        <TopNav />
        <div className="container">
          <Grid container className={classes.root} spacing={16}>
            {/* <Hidden smDown> */}
            <Grid item md={5} sm={12} xs={12}>
              Should be image here
            </Grid>
            {/* </Hidden> */}
            <Grid item md={7} sm={12} xs={12}>
              <Grid item md={12} sm={12} xs={12}>
                <InputField
                  label={"Selected Category"}
                  variant={"outlined"}
                  id={"selectedCategory"}
                  value={selectedCategory ? selectedCategory.title : ''}
                  fullWidth={true}
                  onClick={() => this.setState({ isSelectCatModal: true })}
                />
              </Grid>

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
                <AutoSelectInputField
                  label={"Search Country"}
                  variant={"outlined"}
                  id={"country"}
                  fullWidth={true}
                  suggestions={this.state.suggestions}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <AutoSelectInputField
                  label={"State or Province"}
                  variant={"outlined"}
                  id={"province"}
                  fullWidth={true}
                  suggestions={this.state.suggestions}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <AutoSelectInputField
                  label={"Search City"}
                  variant={"outlined"}
                  id={"city"}
                  fullWidth={true}
                  suggestions={this.state.suggestions}
                />
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
              <Grid item md={12} sm={12} xs={12}>
                <Button onClick={() => this.setState({ getLocation: true })} fullWidth variant="contained" className={classes.margin}>
                  <Icon>location_on</Icon> Get Current Location
                </Button>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Button fullWidth variant="contained" color="primary" className={classes.margin}>
                  Submit
                </Button>
              </Grid>
              {getLocation ? <Location /> : ''}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AddProduct);
