import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Button from "@material-ui/core/Button";
import TopNav from './../common/TopNav'
import Location from './../common/Location'
import SelectCategory from './../SelectCategory'
import Icon from '@material-ui/core/Icon';
import { Address } from "./../../services/address"

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
        { name: 'Afghanistan' },
        { name: 'Aland Islands' },
        { name: 'Albania' },
        { name: 'Algeria' },
        { name: 'American Samoa' },
        { name: 'Andorra' },
        { name: 'Angola' },
        { name: 'Anguilla' },
        { name: 'Antarctica' },
        { name: 'Antigua and Barbuda' },
        { name: 'Argentina' },
        { name: 'Armenia' },
        { name: 'Aruba' },
        { name: 'Australia' },
        { name: 'Austria' },
        { name: 'Azerbaijan' },
        { name: 'Bahamas' },
        { name: 'Bahrain' },
        { name: 'Bangladesh' },
        { name: 'Barbados' },
        { name: 'Belarus' },
        { name: 'Belgium' },
        { name: 'Belize' },
        { name: 'Benin' },
        { name: 'Bermuda' },
        { name: 'Bhutan' },
        { name: 'Bolivia, Plurinational State of' },
        { name: 'Bonaire, Sint Eustatius and Saba' },
        { name: 'Bosnia and Herzegovina' },
        { name: 'Botswana' },
        { name: 'Bouvet Island' },
        { name: 'Brazil' },
        { name: 'British Indian Ocean Territory' },
        { name: 'Brunei Darussalam' },
      ],
      getLocation: false,
      isSelectCatModal: true,
      countries: null
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  componentDidMount() {
    Address.getCountries()
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        let countries = []
        Object.keys(res.result).map((key, i) => {
          countries.push({ name: res.result[key], code: key })
        })
        this.setState({ countries })
      })
      .catch((err) => {
        console.log(err, "catch")
      })
  }

  onChangeCountry = (e) => {
    debugger
    let countryCode = e.target.value
    let address = this.state.address
    address.country = this.state.getCountriesData[countryCode]
    this.setState({
      countryCode: e.target.value,
      address
    })
    Address.GetState(countryCode)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.setState({
          getStateData: res.result
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onChangeState = (e) => {
    debugger
    let countryCode = this.state.countryCode
    let StateCode = e.target.value
    let address = this.state.address
    address.state = this.state.getStateData[StateCode]
    this.setState({
      address
    })
    Address.GetCities(countryCode, StateCode)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        this.setState({
          getCitiesData: res.result
        })
      })
  }

  onChangeCities = (e) => {
    let citiesKey = e.target.value
    let address = this.state.address
    address.city = this.state.getCitiesData[citiesKey]
    this.setState({
      address
    })
  }

  render() {
    let { classes } = this.props;
    let { getLocation, isSelectCatModal, selectedCategory, countries } = this.state;
    return (
      <div>
        <SelectCategory
          open={isSelectCatModal}
          handleClose={() => this.setState({ isSelectCatModal: false })}
          selectCategory={(cat) => this.setState({ selectedCategory: cat, isSelectCatModal: false })}
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
                  suggestions={countries}
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
