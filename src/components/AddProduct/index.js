
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
import ProductDetailModal from "./../Products/ProductDetailModal";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { ProductAction } from "./../../store/actions";
import MapToSelectLocation from "./MapToSelectLocation";
import ReactLoading from "react-loading";
import "./index.css";
import TextModal from './../common/TextModal'
// import { timer } from "rxjs";

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
      isSelectImg: false,
      isLocationModalOpen: false,
      isGeolocationEnabled: false,
      hideTool: false,
      openTextModal: false,
      textModalTitle: '',
      textModalText: '',
      isOpenDetailDialog: false,
      product: null,
      addPostModalToMyPrdctI: ""
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
    // console.log("onChangeCountry");
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
    // console.log("onChangeState");
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
    // console.log(prevProps.selectedCountry, this.props.selectedCountry);
    if (!Number(prevProps.selectedCountry)) {
      if (
        prevState.selectedCountry !== this.state.selectedCountry &&
        this.state.selectedCountry
      ) {
        // handle selectedCountry onChange
        // console.log(" handle selectedCountry onChange");

        let key = this.getKeyByValue(
          this.state.countriesOrignalObj,
          this.state.selectedCountry
        );
        if (key) this.onChangeCountry(key);
      }
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

    // after saved product
    if (
      this.props.savedProduct &&
      !this.props.saveProductLoader &&
      prevProps.saveProductLoader
    ) {

      this.setState({
        openTextModal: true,
        textModalTitle: "Success",
        textModalText: "Successfully Post New Add!",
        product: this.props.savedProduct,
        addPostModalToMyPrdctI: "my-product"
      })
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
    const base64BrownImage = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wgARCAMgBQADAREAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAECBQMEB//EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAP1Ih5gpQCgoKUFAKClBQUFBQUAFAKCgAAoAAABQAAAAAAAAAAAAAAAAAAAAAAAAQAAAAgAAICAEABAQEBAQEICAEBCAgIAQgNmzxNmzyKAUApSgoBQUoKCgpQUAoBQUAAoAKAAAAACgAAAAAAAAAAAAAAAAAAAAAgAAAAAIACAAEBACAEBCAgICEBACAhCAEAIepk8wAewPMoBQaAKCgpQUoKCgoKAUFAKAUAAFAABQAAAAAAAAAAAAAAAAAAAAAAAAAAQAAEAABACAEBACAgICAhAQgICAGQQAhs0eJAAUpT1MGSgpQUFBSgpQUoKAUFKAUAoAKAUAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAQAgAIAQAhAQAgIQEICEBAQEICFPQ8zJCAFKAU2bPIpQUFBSgpQUoKCgpQCgoBQCgAoAAABQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAgAIAQAgIAQgICAhAQgIQEBAQh6EPMgBCA0AUA0epDBQUFKClBSgpQClBQUFBQAUAFAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAEABAAQEBAQEIAQgIQEICEBAQ0aPIyAQAyUoBQUFNnoeYBSgpQUpQUFKCgoKCgoAKACgAFAAAAABQAAAAAAAAAAAAAAAAAQAAAAAEAAIACAAgICAgICEBAQhAQgIQEPQwYICAgBCgFBQUoKehTBQUoNAoKClBSgpQCgFAKAUAoAAAAKAAAAAAAAAAAAAAAAAAAAAACAAAAAgBACAEAIAQgIQEICAgMghAQ0U8iAhAQEAAKAUpQUFNHoYBQaBQUpQUoKCgoKAUFBQACgAAFAAAAAAAAAAAAAAAAAAAAAAAAABAAACAAEBAQAgICAgIQEIQEBkEBs8zJAQEIQAgAKCg0CgoKU2aMFKUFKUFKClBQUFBQUAoAKAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIACAEBAQEBAQgIQEIQEIQ2Q8yEBAQGQQEAKCgpQUoKUpSnoQgKUpQUpQUFBSgoBQUAoAAKAAAAAACgAAAAAAAAAAAAAAAgAAAAAAIAACAEBACAhAQEBCEBCEIAaPMhCEICEBCAgIUApSgoKUoKUpTRsyClKClBSgpQUFBQUAFABQAAUAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAQAEBAQEBCAhAQgIQhDZkwQhCAhCAgIQgABQUpQUGgUpSlBT0BCgpSgpSgoKClAKAUAoABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAgBACAEICAgIQgIQgIUHmQEIQhAZBAQhAQAFKUFKClKUGgUpSlNkBSlBSlBQUoKAUFAKACgAAAAoAAAAAAAAAAAAAAAAAAAAIAAAACAAgBAQAgIQEBCEBCEBTJkhCEBkEIQgIQEIQAoNAoKUoKUpSlKUpQbKQoKUpQUoKCgoKAUAFAAAKAAAAAAAAAAAAAAAAAAAAAAAACAAAEABACAgICAhAQhCAhSGAQhCEIQhCAhCAgMghQUoKUFKUpSlBTQKUpSmwCgpSgoKUFBQCgAoABQAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAgAIAQEBCAgIQgIQpghCEIDJAQhCEIQEICEAKUFBSlKUGgUpSlKUpSlNFAKUoKUFBQUAoBQAUAAFAAAAAAAAAAAAAAAAAAAAAAABAAAQAEAIAQEBAQgIQgKZMkIQhCEIQhAZBCEIQEBCApSgoNApSlKUpSlKUpSlKU0AUoKUFBQUFAKAUAAFAAAAAAAAAAAAAAAAAAAAAAAAABAAAQAgBAQEBAQgIQAyQhCEIQhCEIQhCEIDIICEIUoKClKUoNFBTRSlKUpSlKDRSgpQUFBSgoBQCgAoAAAAAAKAAAAAAAAAAAAAACAAAAAAAgAIAQAgIQEBAQgIQyCEIQhCEIQyQEMghCEICAgKClBoFKUpSlKUpSlKaKUGgUpooBQUoKCgoBQAUAAAAoAAAAAAAAAAAAAAAAAAAAIAAAAQAEAICAgIQEAIZIQGQQhkhCEIQhCEIQhAZBCAhQUFKUpSlKUGilKUpSmgU0ClKUpSgoKUApQCgAoAAAKAAAAAAAAAAAAAAAAAAAAAACAAAAgAIAQgBCAgIQhCEIDJAZIQhCEIZBCEIQhCEBAAUoNApSlKUpSlNFKUpSlKUpoFKDRQClBQUAoAKAAUAAAAAAAAAAAAAAAAAAAAAAAAAEAAIACAEBAQgBDIIQGSEIQhCEIQyQhCEIQhCAyCEAKClKUoNFKDRSlKUpopSlKUpSlKUFNAFBQUAoBQACgAAAAoAAAAAAAAAAAAAAAAIAAAACAAEAIAQEBAQhAQhCEIQhCEIZIQhCEMghDIIQhCAgKUFKUpSlKUpTRSlKaKUpSlKUpSlBSlKAUFBQAUAoAAAAKAAAAAAAAAAAAAAAAAACAAAAAgBAAQEBACEIQEIQhCEIQhCGSEIQyQhCEIQhCEBCFBQaBSmigpopSlKaKUpTRSlKUpSlBSlBSgFBQCgAoAAKAAAAAAAAAAAAAAAAAAAAAACAAAgAIAQEAIQEIQEIQhCEIQyQhCGSEIQhkgIZIQGQQAFKUpSlKUpSlNFKU0UpSmilKUpSg0CgpQUFBQCgFAAAKAAAAAAAAAAAAAAAAAAAAAACAAAEAIAQEBAQgIDIIQhCEIZIQhDJCEMkIQhCEIQhCEAKClKUpSlKaKUpTRSlNFKUpSmgaBoFKClBQUFBQAUAAAAoAAAAAAAAAAAAAAAAAAAAIAAAAQAEBAQEBCAhAZBkGSEIQhDJCEMkIQhkhCEIQhCAgKDQNA0UpSlKaKUpopSlNFKUpSlKUpQUpQUFBQCgAoAAAAKAAAAAAAAAAAAAAAAAACAAAAAgAIAQEBAQhAQhCEIQhCEMkIQhkhCGSEIQhDIMgyCApSlKUpSlKaKUpTRSmilKaKUpSlKUoNApQUFBQAUAAoABQAAAAAAAAAAAAAAAAAAAAAQAAgABAAQEBAQgMghCEIQhCGSEIZIQyQhCGSEIQhCEIQgKUpSlKUpTRSlNFKaKUpopSlNFKUpQaBSgpQUAoAKCgAAoAAAAAAAAAAAAAAAAAAAAAAIAACAgAIAQEICEBkEIQhDJCEIZIQhkhDJCEMkIQhCEIQhQaBSlKUpopTRSlNFKaKU0UpSlNApSlKUFKCgoBQUAFAAAABQAAAAAAAAAAAAAAAAAQAAAAEABAQAgICEBCEIQgMkIQhDJCGSEMkIQyQhkhCEIQGQClKUGilKUpopSmilNFKaKUpopSlKUpSgpS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NFKaKUpopTRSmilKUpoFKUpSgpQUFAKCgAoAAAAKAAAAAAAAAAAAAAAAACAAAAAgAICAEBAQgIQhCEBkhCEIZIQyQhkhCGSEMkIQhCAyCFKUpSlKUpopSmilNFKU0UpSmilKUoNApQUoKAUAFBQAAUAAAAAAAAAAAAAAAAAAAAAAEAABAQAEAICEBCAyCEIQhkhCEMkIQyQhkhCGSEIQhCEIQFKUpSlKUpTRSlKaKU0UpTRSlKUpSlBoFKCgoKACgAFAAKAAAAAAAAAAAAAAAAAAAAACAAEAAIACAgICEBkEIQhCEIQyQhDJCGSEIQyQhCEIQhCEBQaBoGilKUpTRSlNFKUpopSlKUpSlKClKCgoKAUAFAAAABQAAAAAAAAAAAAAAAAAAQAAAAEABACAgICEICEIQhCEIQhkhCEMkIQyQhCEIZBkGQQFBSlKUpSlNFKUpopSmilKUpTQNA0ClBSgoKCgoAKAAAAUAAAAAAAAAAAAAAAAAAAAEAAAAIACAgICAhAQgMgyDJCEIQhkhCGSEIQyQhCEIQhAQApSlKUpSlKUpopSmilKU0UpSlKUGgUFKCgoKAUAoAABQAAAAAAAAAAAAAAAAAAAAAAQAAAgBACAgICEBAZBCEIQhDJCEIZIQhkhCEIQhCEIQgAKDQKU0UFNFKUpTRSlKaKUpSlKUoKUoKUAoKAUAFAABQAAAAAAAAAAAAAAAAAAAAAAQAAEABACAgBCAhCAhCEIQhCGSEIQyQhCEMkBDJCAyCAhSgpSlKUpSlKaKUpTRSlKUpSlKUoKUpQCgoKACgFAAAABQAAAAAAAAAAAAAAAAAAQAAAAEAIACAgIAQhCAhCEIQhCEIQyQhCGSEIQhCEIQgIQFBSlKUGilBopSlKU0UpSlKUpSlKClKCgoKAUAoABQAAAAUAAAAAAAAAAAAAAAAEAAAABAACAEAICAgIQgIQhCEIQhCEMkIQhCGQQhkEIQhAQApQaBSlKUpSlKaKUpSlKUpTQKUGgUFKCgoBQAUAAoAAAAAAAAAAAAAAAAAAAAAAAAAIAAQAEAICAhACGQQgMkIQhCEIQhkhCEIQhCEBkEIACgpSlKUpSg0UpSlKU0CmgUpSlKUFBSgFKAUAFAAABQAAAAAAAAAAAAAAAAAAAAAAQAAAEABACEAIQEBCEIQhAZIDJCEIQhDIIQhCEIQgICFBSg0ClKUpSlKUpSlNFKDQKU0UAoKUFBQUAoAKAAAAUAAAAAAAAAAAAAAAAAAAAEAAAAIACAEBAQEICAEMkIDIIQyQhCEIQhCEIQgMghAQFBQUpSlBooKaKUpSlKUpQaBoFKCgoKUFAKAUAFAAAAAABQAAAAAAAAAAAAAAQAAAAAAEABACAEBCAgICEBCGQQhCEIQhCGSAhkEIQhAQEIUpQUGgUpSlKUpSlKUpSlKU0QpQUoKCgoKAUAoAAKAAAAAAAAAAAAAAAAAAAAAAAAACAAAgBACAgICAhAQgBkhCEIQhCEIQhCEIQGQQEIQFKCgpSlKDQKUpSlKUpSlNkBSlBSgoKCg
    FAKACgAAoAAAAAAAAAAAAAAAAAAAAAAAIAACAAgBACAgICEBCEBTJkhCEIQhCEIDIIQhCAgIQApQUoKUpSlKCmgUpSlNgFBSlBQUoKCgFABQACgAAAAAAAAAAAAAAAAAAAAAAAAAAAgABAAQAgICEBAQhAQAwQhCEBkgIQhCEICEBCAhQaBQUpQUpSlKUpSg0aIUFKUoKUFBQUFAKACgAAFAAAAAAAAAAAAAAAAAAAAAAAABAAACAAgBAQEBAQgIQhAQpDAIQhCEIQhAQhAQGQQApSgpQUpSg0ClKUpsEKUoKUoKClBQCgoBQAUAAAAFAAAAAAAAAAAAAAAAAAAABAAAAAQAEAICAEBCAgIQgIQhQYIQhCAyCEIQEICEIACgpSgoNApSlKCmzRkoKUoKUoKCgpQCgFAKAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIAQAgBCAgICEICEICFIYICEIQgMggIQgIAAUpQUFKUFKUpTYIUpQUoKUFKCgoKCgAoAKAACgAAAAAAAAAAAAAAAAAAAAAAAAAgAAIACAAgICAgIQEICEBCEBowZIQhAQhAQEIQAhQUFKClBSlKD0BAUpSgpSgoKClBQCgoBQAAUAAAAAAFAAAAAAAAAAAAAAABAAAAAAAQAAEAICAEBCAgICEICEIQFKeQIQhAQgIQEBACgoNAoKClNmzAKUFKUFKClBQUFBQUAoAKAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAIACAEBAQEBAQgIQEIQEIDZgwQgICAyCAgAKAUpQUFKepkhQaBQUpQUoKCgoKAUFBQACgAAFAAAAAAAAAAAAAAAAAAAAAAAAABAAACAAEBAQAgICAgIQEIQEBkEKaPIhAQEIQAgABQUFKCmzZ5lBSg0CgoKUFKClAKAUAoBQCgAAAAoAAAAAAAAAAAAAAAAAAAAAAIAAAACAEAIAQAgBCAhAQgICAyCEBDZDzICEBAQAhQCgoKaPUwQFKClBSlBQUoKCgoKCgAoAKAAUAAAAAFAAAAAAAAAAAAAAAAABAAAAAAQAAgAIACAgICAgIQEBCEBCAhADZgwQEBACENAFAKepTzKCgpQUoKUFKAUoKCgoKACgAoAAAKAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAgAIACAgICAhACEBCAhAQgICGyniQAgBkFKAU0eh5go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`

    const {
      selectedCategory,
      title,
      description,
      selectedCountry,
      selectedState,
      selectedCity,
      country,
      province,
      city,
      latitude,
      longitude,
      selectedImage
    } = this.state;
    const { user, saveProductAction } = this.props;


    if (selectedImage && !selectedImage.base64) {
      const productImg = {
        name: "c2.jpg",
        size: 5782,
        type: "image/jpg",
        base64: base64BrownImage,
      }
      saveProductAction({
        product_id: uuidv1(),
        title,
        description,
        category_id: selectedCategory.category_id,
        country: selectedCountry ? selectedCountry : country,
        state: selectedState ? selectedState : province,
        city: selectedCity ? selectedCity : city,
        latitude,
        longitude,
        creator_id: user.user_id,
        product_img: JSON.stringify(productImg)
      })
    }
    else {
      saveProductAction({
        product_id: uuidv1(),
        title,
        description,
        category_id: selectedCategory.category_id,
        country: selectedCountry ? selectedCountry : country,
        state: selectedState ? selectedState : province,
        city: selectedCity ? selectedCity : city,
        latitude,
        longitude,
        creator_id: user.user_id,
        product_img: JSON.stringify(selectedImage)
      });
    }
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
      // selectedImage,
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
      // selectedImage &&
      // selectedImage.base64 &&
      // selectedImage.name &&
      // selectedImage.type &&
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
      this.setState({ selectedImage: file, isSelectImg: true });

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
  handleCountryChange = e => {
    this.setState({ country: "" });
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

  closeTextModal = () => {
    this.setState({ openTextModal: false })
    if (this.props.savedProduct) {
      this.setState({ isOpenDetailDialog: true })
    }
  }

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
      isSelectImg,
      title,
      description,
      isLocationModalOpen,
      countries,
      states,
      selectedCountry,
      selectedState,
      cities,
      longitude,
      latitude,
      openTextModal,
      textModalTitle,
      textModalText,
      product,
      isOpenDetailDialog
    } = this.state;

    return (
      <div className="add-product">
        <Location
          temp={isGeolocationEnabled => {
            this.setState({ isGeolocationEnabled });
          }}
          handleLocation={(latitude, longitude) => {
            this.setState({ latitude, longitude });
          }}
        />
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

        <TextModal
          open={openTextModal}
          handleClose={this.closeTextModal}
          title={textModalTitle}
          text={textModalText}
          isTimer={true}
        />

        <ProductDetailModal
          history={this.props.history}
          product_id={product ? product.product_id : null}
          open={isOpenDetailDialog}
          handleDetailDialog={action =>
            this.setState({ isOpenDetailDialog: action })
          }
          identifier={this.state.addPostModalToMyPrdctI}
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
              {
                (selectedImage && !selectedImage.base64) && <input
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
              }

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
              {isSelectImg &&
                <div className="input-editimg-btn-parent">
                  <Button
                    onClick={() => {
                      // this.handleChangeImagePopup();
                      var elem = document.getElementById("theFile");
                      if (elem && document.createEvent) {
                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("click", false, true);
                        elem.dispatchEvent(evt);
                      }
                    }}
                    className="input-editimg-btn"
                    color="primary"
                  >
                    Change Image
                <input
                      type="file"
                      id="theFile"
                      // display="hidden"
                      onChange={event => {
                        this.handleImageChange(event);
                        event.target.value = null;
                        this.setState({
                          hideTool: true
                        });
                      }}
                    />
                  </Button>
                </div>}
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
                  maxLength={500}
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
                  maxLength={15000}
                />
              </Grid>

              {country ? (
                <Grid item md={12} sm={12} xs={12}>
                  <InputField
                    type="string"
                    label={"Country"}
                    variant={"outlined"}
                    id={"selectedCountry"}
                    onChange={this.handleInput}
                    fullWidth={true}
                    value={country ? country : ""}
                    isAddon={true}
                    onClickAdornment={this.handleCountryChange}
                  />
                </Grid>
              ) : (
                  <Grid item md={12} sm={12} xs={12}>
                    <AutoSelectInputField
                      type="string"
                      label={"Search Country"}
                      variant={"outlined"}
                      onChange={this.handleInput}
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
                    // pattern="/^[A-Za-z]+$/"
                    value={street ? street : ""}
                    fullWidth={true}
                    onChange={this.handleInput}
                    maxLength={15000}
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
                style={{ opacity: isSaveButtonDisable ? 0.6 : 1, height: 45 }}
                variant="contained"
                color="primary"
                id="submit-button"
              >
                {saveProductLoader ? (
                  <ReactLoading
                    type={"spin"}
                    color={"#fff"}
                    height={"40px"}
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