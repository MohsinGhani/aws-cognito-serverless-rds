import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from './../common/TopNav'
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import "./index.css";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'
import ProductDetailModal from './ProductDetailModal'

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
      map: null,
      product: null,
      isOpenDetailDialog: false
    }
  }

  componentDidMount() {
    this.props.getProductsAction()
  }

  render() {
    let { products, getProductsLoader, getProductsError } = this.props;
    let { product, isOpenDetailDialog } = this.state;
    return (
      <div>
        <ProductDetailModal
          product={product}
          open={isOpenDetailDialog}
          handleDetailDialog={(action) => this.setState({ isOpenDetailDialog: action })}
        />
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
              !getProductsLoader && products && products.map((product, i) => {
                return (
                  <Marker
                    coordinates={[product.longitude, product.latitude]}
                    anchor="bottom"
                    onClick={() => this.setState({ product, isOpenDetailDialog: true })}
                    key={i}
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
