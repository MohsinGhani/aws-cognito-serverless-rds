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
      getLocation: false,
      isSelectCatModal: true,
      countries: [],
      selectedCountry: '',
      countriesOrignalObj: null,
      states: [],
      statesOrignalObj: null,
      selectedState: '',
      cities: [],
      citiesOrignalObj: null,
      selectedCity: ''
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
        this.setState({ countries, countriesOrignalObj: res.result })
      })
      .catch((err) => {
        console.log(err, "catch")
      })
  }

  onChangeCountry = (countryCode) => {
    Address.GetState(countryCode)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        let states = []
        Object.keys(res.result).map((key, i) => {
          states.push({ name: res.result[key], code: key })
        })
        this.setState({ states, statesOrignalObj: res.result })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onChangeState = (countryCode, StateCode) => {
    Address.GetCities(countryCode, StateCode)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        let cities = []
        Object.keys(res.result).map((key, i) => {
          cities.push({ name: res.result[key], code: key })
        })
        this.setState({ cities, citiesOrignalObj: res.result })
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

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCountry !== this.state.selectedCountry && this.state.selectedCountry) {
      // handle selectedCountry onChange
      let key = this.getKeyByValue(this.state.countriesOrignalObj, this.state.selectedCountry)
      if (key) this.onChangeCountry(key)
    }

    if (prevState.selectedState !== this.state.selectedState && this.state.selectedState) {
      // handle selectedState onChange
      let countryCode = this.getKeyByValue(this.state.countriesOrignalObj, this.state.selectedCountry)
      let stateCode = this.getKeyByValue(this.state.statesOrignalObj, this.state.selectedState)
      if (countryCode && stateCode) this.onChangeState(countryCode, stateCode)
    }
  }

  render() {
    let { classes } = this.props;
    let { getLocation, isSelectCatModal, selectedCategory, countries, states, selectedCountry, selectedState, cities, selectedCity } = this.state;
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
                  id={"selectedCountry"}
                  fullWidth={true}
                  suggestions={countries}
                  onSelect={this.handleInput}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <AutoSelectInputField
                  label={"State or Province"}
                  variant={"outlined"}
                  id={"selectedState"}
                  fullWidth={true}
                  suggestions={states}
                  onSelect={this.handleInput}
                  disabled={!selectedCountry}
                />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <AutoSelectInputField
                  label={"Search City"}
                  variant={"outlined"}
                  id={"selectedCity"}
                  fullWidth={true}
                  suggestions={cities}
                  onSelect={this.handleInput}
                  disabled={!selectedState}
                  />
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <InputField
                  label={"Street Address"}
                  variant={"outlined"}
                  id={"street"}
                  fullWidth={true}
                  onChange={this.handleInput}
                  disabled={!selectedCity}
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
