import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Button from "@material-ui/core/Button";
import TopNav from "./../common/TopNav";
import Location from "./../common/Location";
import SelectCategory from "./../SelectCategory";
import { Address } from "./../../services/address";
import uuidv1 from "uuid/v1";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { ProductAction } from "./../../store/actions";
import MapToSelectLocation from "./MapToSelectLocation";
import ReactLoading from "react-loading";

import "./index.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: " 2",
    position: "absolute",
    margin: "auto"
  },
  input: {
    display: "none"
  },
  cameraIcon: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: "6px"
  }
});

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      title: null,
      description: null,
      street: null,
      city: null,
      province: null,
      country: null,
      getLocation: false,
      isSelectCatModal: true,
      countries: [],
      selectedCountry: "",
      countriesOrignalObj: null,
      states: [],
      statesOrignalObj: null,
      selectedState: "",
      cities: [],
      citiesOrignalObj: null,
      selectedCity: "",
      latitude: 36.778259,
      longitude: -119.417931,
      location: null,
      isSaveButtonDisable: true,
      selectedImage: {},
      isLocationModalOpen: false,
      isGeolocationEnabled: false,
      hideTool: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  componentDidMount() {
    Address.getCountries()
      .then(res => {
        return res.json();
      })
      .then(res => {
        let countries = [];
        Object.keys(res.result).map((key, i) => {
          countries.push({ name: res.result[key], code: key });
        });
        this.setState({ countries, countriesOrignalObj: res.result });
      })
      .catch(err => {
        console.log(err, "catch");
      });
  }

  onChangeCountry = countryCode => {
    Address.GetState(countryCode)
      .then(res => {
        return res.json();
      })
      .then(res => {
        let states = [];
        Object.keys(res.result).map((key, i) => {
          states.push({ name: res.result[key], code: key });
        });
        this.setState({ states, statesOrignalObj: res.result });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChangeState = (countryCode, StateCode) => {
    Address.GetCities(countryCode, StateCode)
      .then(res => {
        return res.json();
      })
      .then(res => {
        let cities = [];
        Object.keys(res.result).map((key, i) => {
          cities.push({ name: res.result[key], code: key });
        });
        this.setState({ cities, citiesOrignalObj: res.result });
      });
  };

  onChangeCities = e => {
    if (typeof e.target.value === "string") {
      let citiesKey = e.target.value;
      let address = this.state.address;
      address.city = this.state.getCitiesData[citiesKey];
      this.setState({
        address
      });
    }
  };

  getKeyByValue(object, value) {
    return Object.keys(object ? object : {}).find(key => object[key] === value);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedCountry !== this.state.selectedCountry &&
      this.state.selectedCountry
    ) {
      // handle selectedCountry onChange
      let key = this.getKeyByValue(
        this.state.countriesOrignalObj,
        this.state.selectedCountry
      );
      if (key) this.onChangeCountry(key);
    }

    if (
      prevState.selectedState !== this.state.selectedState &&
      this.state.selectedState
    ) {
      // handle selectedState onChange
      let countryCode = this.getKeyByValue(
        this.state.countriesOrignalObj,
        this.state.selectedCountry
      );
      let stateCode = this.getKeyByValue(
        this.state.statesOrignalObj,
        this.state.selectedState
      );
      if (countryCode && stateCode) this.onChangeState(countryCode, stateCode);
    }

    if (this.state && this.state.isSaveButtonDisable) {
      if (this.validateSaveButton())
        this.setState({ isSaveButtonDisable: false });
    }
    // savedProduct, saveProductLoader, saveProductError,
    if (
      this.props.savedProduct &&
      !this.props.saveProductLoader &&
      prevProps.saveProductLoader
    ) {
      this.goto("/");
    }

    if (
      (prevState.street !== this.state.street && this.state.street === "") ||
      (prevState.title !== this.state.title && this.state.title === "") ||
      (prevState.description !== this.state.description &&
        this.state.description === "")
    ) {
      this.setState({ isSaveButtonDisable: true });
    }

    if (this.state && this.state.isSaveButtonDisable) {
      if (this.validateSaveButton())
        this.setState({ isSaveButtonDisable: false });
    }
    // savedProduct, saveProductLoader, saveProductError,
    if (
      this.props.savedProduct &&
      !this.props.saveProductLoader &&
      prevProps.saveProductLoader
    ) {
      this.goto("/");
    }

    if (
      this.props.reversedGeoCoding !== prevProps.reversedGeoCoding &&
      this.props.reversedGeoCoding
    ) {
      if (this.props.reversedGeoCoding.length >= 3) {
        let street = this.props.reversedGeoCoding[0].text;
        let location = this.props.reversedGeoCoding[0].place_name;
        let city = this.props.reversedGeoCoding.filter(
          item => item.place_type[0] === "place"
        )[0].text;
        let province = this.props.reversedGeoCoding.filter(
          item => item.place_type[0] === "region"
        )[0].text;
        let country = this.props.reversedGeoCoding.filter(
          item => item.place_type[0] === "country"
        )[0].text;

        if (
          this.props.reversedGeoCoding.filter(
            item => item.place_type[0] === "address"
          ).length !== 0
        ) {
          street = this.props.reversedGeoCoding.filter(
            item => item.place_type[0] === "address"
          )[0].text;
        }

        this.setState({
          street,
          city,
          province,
          location,
          country,
          longitude: this.props.reversedGeoCoding[0].center[0],
          latitude: this.props.reversedGeoCoding[0].center[1]
        });
      } else {
        this.setState({
          street: null,
          city: null,
          province: null,
          country: null,
          location: null
        });
      }
    }
  }

  onSaveProduct = () => {
    const {
      selectedCategory,
      title,
      description,
      selectedCountry,
      selectedState,
      selectedCity,
      latitude,
      longitude,
      selectedImage
    } = this.state;
    const { user, saveProductAction } = this.props;
    saveProductAction({
      product_id: uuidv1(),
      title,
      description,
      category_id: selectedCategory.category_id,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      latitude,
      longitude,
      creator_id: user.user_id,
      product_img: JSON.stringify(selectedImage)
    });
  };

  validateSaveButton = () => {
    const {
      selectedCategory,
      title,
      description,
      country,
      selectedCountry,
      province,
      selectedState,
      city,
      selectedCity,
      latitude,
      longitude,
      selectedImage,
      street
    } = this.state;
    return (
      title &&
      title.length >= 3 &&
      (description && description.length >= 3) &&
      selectedCategory &&
      (country || selectedCountry) &&
      (province || selectedState) &&
      (city || selectedCity) &&
      (street && street.length > 0) &&
      latitude &&
      longitude &&
      selectedImage &&
      selectedImage.base64 &&
      selectedImage.name &&
      selectedImage.type &&
      this.props.user &&
      this.props.user.user_id
    );
  };

  goto = path => {
    this.props.history.push(path);
  };

  handleImageChange = event => {
    // funciton for get file and save in state
    if (event.target.files && event.target.files[0]) {
      let file = {
        name: event.target.files[0].name,
        size: event.target.files[0].size,
        type: event.target.files[0].type
      };
      this.setState({ selectedImage: file });

      let reader = new FileReader();
      reader.onload = e => {
        this.setState({
          selectedImage: {
            ...this.state.selectedImage,
            base64: e.target.result
          }
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  pickLocation = () => {
    const { isGeolocationEnabled, latitude, longitude } = this.state;
    // if isGeolocationEnabled is true then don't need to open map directly get current location
    if (isGeolocationEnabled) {
      this.props.reverseGeoCodingAction({ lng: longitude, lat: latitude });
    } else {
      this.setState({ getLocation: true, isLocationModalOpen: true });
    }
  };

  render() {
    let { classes, saveProductLoader } = this.props;
    let {
      isSelectCatModal,
      selectedCategory,
      street,
      city,
      province,
      country,
      location,
      isSaveButtonDisable,
      selectedImage,
      title,
      description,
      isLocationModalOpen,
      countries,
      states,
      selectedCountry,
      selectedState,
      cities,
      longitude,
      latitude
    } = this.state;

    return (
      <div className="add-product">
        <TopNav />
        <p
          className="add-product-title"
          style={{ fontSize: 30, fontWeight: "bold" }}
        >
          Add Product
        </p>
        <SelectCategory
          open={isSelectCatModal}
          handleClose={() => this.setState({ isSelectCatModal: false })}
          selectCategory={cat =>
            this.setState({ selectedCategory: cat, isSelectCatModal: false })
          }
        />

        <Location
          temp={isGeolocationEnabled => {
            this.setState({ isGeolocationEnabled });
          }}
          handleLocation={(latitude, longitude) => {
            this.setState({ latitude, longitude });
          }}
        />

        <MapToSelectLocation
          open={isLocationModalOpen}
          handleClose={() => this.setState({ isLocationModalOpen: false })}
          selectedLocation={address => this.setState({ address })}
          position={{ lng: longitude, lat: latitude, zoom: 12 }}
          location={location}
        />

        <div className="container">
          <Grid container className={classes.root} spacing={16}>
            {/* <Hidden smDown> */}
            <Grid item md={5} sm={12} xs={12}>
              <input
                accept="image/*"
                Style={{ display: "none" }}
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={event => {
                  this.handleImageChange(event);
                  event.target.value = null;
                  this.setState({
                    hideTool: true
                  });
                }}
              />
              <label htmlFor="icon-button-file" className={classes.cameraIcon}>
                {selectedImage.base64 ? (
                  ""
                ) : (
                  <IconButton
                    color="primary"
                    className={classes.button}
                    component="span"
                  >
                    <PhotoCamera id="photocamera" />
                  </IconButton>
                )}

                <div className="productPicture">
                  {selectedImage && selectedImage.base64 ? (
                    <img
                      src={selectedImage.base64}
                      alt="product"
                      className="productImage"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </label>
            </Grid>
            {/* </Hidden> */}
            <Grid item md={7} sm={12} xs={12}>
              <Grid item md={12} sm={12} xs={12}>
                <InputField
                  label={"Selected Category"}
                  variant={"outlined"}
                  color={" #f9f2ec"}
                  id={"selectedCategory"}
                  value={selectedCategory ? selectedCategory.title : ""}
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
                  value={title ? title : ""}
                  maxLength={300}
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
                  rowsMax={"4"}
                  rows={"4"}
                  value={description ? description : ""}
                  maxLength={1000}
                />
              </Grid>

              {country ? (
                <Grid item md={12} sm={12} xs={12}>
                  <InputField
                    type="string"
                    label={"Country"}
                    variant={"outlined"}
                    id={"selectedCountry"}
                    fullWidth={true}
                    value={country ? country : ""}
                    isAddon={true}
                    onClickAdornment={() => this.setState({ country: "" })}
                  />
                </Grid>
              ) : (
                <Grid item md={12} sm={12} xs={12}>
                  <AutoSelectInputField
                    type="string"
                    label={"Search Country"}
                    variant={"outlined"}
                    id={"selectedCountry"}
                    fullWidth={true}
                    suggestions={countries}
                    onSelect={this.handleInput}
                  />
                </Grid>
              )}

              {province ? (
                <Grid item md={12} sm={12} xs={12}>
                  <InputField
                    type="string"
                    label={"State or Province"}
                    variant={"outlined"}
                    id={"selectedState"}
                    fullWidth={true}
                    value={province ? province : ""}
                    isAddon={true}
                    onClickAdornment={() => this.setState({ province: "" })}
                  />
                </Grid>
              ) : (
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
              )}

              {city ? (
                <Grid item md={12} sm={12} xs={12}>
                  <InputField
                    label={"City"}
                    variant={"outlined"}
                    id={"selectedCity"}
                    fullWidth={true}
                    value={city ? city : ""}
                    isAddon={true}
                    onClickAdornment={() => this.setState({ city: "" })}
                  />
                </Grid>
              ) : (
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
              )}

              <Grid container spacing={8}>
                <Grid item md={10} sm={10} xs={9}>
                  <InputField
                    label={"Street"}
                    variant={"outlined"}
                    id={"street"}
                    value={street ? street : ""}
                    fullWidth={true}
                    onChange={this.handleInput}
                  />
                </Grid>
                <Grid item md={2} sm={2} xs={2}>
                  <Button
                    onClick={this.pickLocation}
                    fullWidth
                    variant="contained"
                    className={classes.margin}
                    id="location-button"
                  >
                    <i className="material-icons place">place</i>
                  </Button>
                </Grid>
              </Grid>

              <Button
                fullWidth
                onClick={this.onSaveProduct}
                disabled={isSaveButtonDisable}
                style={{ opacity: isSaveButtonDisable ? 0.6 : 1 }}
                variant="contained"
                color="primary"
                id="submit-button"
              >
                {saveProductLoader ? (
                  <ReactLoading
                    type={"spin"}
                    color={"#fff"}
                    height={"25px"}
                    width={"25px"}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    ProductReducer: {
      categories,
      getCategoriesLoader,
      getCategoriesError,
      savedProduct,
      saveProductLoader,
      saveProductError,
      reversedGeoCoding
    },
    authReducer: { user }
  } = state;
  return {
    categories,
    getCategoriesLoader,
    getCategoriesError,
    savedProduct,
    saveProductLoader,
    saveProductError,
    user,
    reversedGeoCoding
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reverseGeoCodingAction: payload =>
      dispatch(ProductAction.reverseGeoCoding(payload)),
    saveProductAction: payload => dispatch(ProductAction.saveProduct(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddProduct));
console.clear();
