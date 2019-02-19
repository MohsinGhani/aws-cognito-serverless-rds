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
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import "./index.css";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '10px 0 0 0',
  }
});

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null
    }
  }

  componentDidMount() {
    this.props.getProductsAction()
  }

  render() {
    let { classes, products, getProductsLoader, getProductsError } = this.props;
    let { } = this.state;
    return (
      <div>
        <TopNav />
        <div>
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "70vh",
              width: "95vw",
              margin: '0 auto',
              marginBottom: '20px'
            }}
          >
            {
              !getProductsLoader && products && products.map((product) => {
                return (
                  <Marker
                    coordinates={[product.longitude, product.latitude]}
                    anchor="bottom"
                    onClick={()=>console.log(product)}
                  >
                    <img src={require('./../../assets/img/marker.png')} width='20px' height='25' />
                  </Marker>
                )
              })
            }
          </Map>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    ProductReducer: {
      categories, getCategoriesLoader, getCategoriesError,
      savedProduct, saveProductLoader, saveProductError,
      products, getProductsLoader, getProductsError,
    },
    authReducer: { user }
  } = state;
  return {
    categories, getCategoriesLoader, getCategoriesError,
    savedProduct, saveProductLoader, saveProductError,
    products, getProductsLoader, getProductsError,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsAction: () => dispatch(ProductAction.getProducts())
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(Products));
