import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from './../common/TopNav'
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import "./index.css";
import ReactMapboxGl from "react-mapbox-gl";
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
    let { products, getProductsLoader, getProductsError } = this.props;
    // let { } = this.state;
    return (
      <div>
        <TopNav />
        <div>
          <Map
            style={"mapbox://styles/mapbox/streets-v9"}
            containerStyle={{
              height: "80vh",
              width: "95vw",
              margin: '0 auto'
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
                    <img src={require('./../../assets/img/marker.png')} alt="marker" width='20px' height='25' />
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
