import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from './../common/TopNav'
import { connect } from 'react-redux';
import { ProductAction, authAction } from './../../store/actions'
import "./index.css";
import Button from '@material-ui/core/Button';
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'
import ProductDetailModal from './ProductDetailModal'
import Location from './../common/Location'
// import green from '@material-ui/core/colors/green';

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '10px 0 0 0',
    backgroundColor: '#946638	',
    color: 'white',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  }
});
// const theme = createMuiTheme({
//   palette: {
//     primary: '#9e7339',
//   },
//   typography: {
//     useNextVariants: true,
//   },
// });
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      product: null,
      isOpenDetailDialog: false,
      latitude: null,
      longitude: null
    }
  }

  componentDidMount() {
    this.props.isLoggedIn()
    this.props.getProductsAction()
  }

  render() {
    let { products, getProductsLoader, searchedProducts, searchLoader } = this.props;
    let { product, isOpenDetailDialog, latitude, longitude } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Location handleLocation={(latitude, longitude) => { this.setState({ latitude, longitude }) }} />
        <ProductDetailModal
          product_id={product ? product.product_id : null}
          open={isOpenDetailDialog}
          handleDetailDialog={(action) => this.setState({ isOpenDetailDialog: action })}
        />
        <TopNav />
        <div>
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "89vh",
              width: "100%",

            }}
            movingMethod={'jumpTo'}
            center={[longitude, latitude]}
            zoom={[12]}
          >
            <div className="mainBodyButtons">
              <Button variant="contained" className={classes.margin}>
                <i class="material-icons">
                  local_phone
              </i> Join With Phone
              </Button>
              <br />
              <Button variant="contained" className={classes.margin}>
                Continue with e-mail
        </Button>
              <br />
              <Button variant="contained" className={classes.margin}>
                Continue with Google
        </Button>
              <br />
              <Button variant="contained" className={classes.margin}>
                Continue with Facebook
        </Button>
            </div>
            {/* current location pointer */}
            <Marker
              coordinates={[longitude, latitude]}
              anchor="bottom"
            >
              <img className="c-p" title="your current location" src={require('./../../assets/img/current-location.png')} alt="marker" width='20px' height='25' />
            </Marker>

            {
              !getProductsLoader && !searchLoader && !searchedProducts && products && products.map((product, i) => {
                return (
                  <Marker
                    coordinates={[product.longitude, product.latitude]}
                    anchor="bottom"
                    onClick={() => this.setState({ product, isOpenDetailDialog: true })}
                    key={i}
                  >
                    <img className="c-p" title={product.title} src={require('./../../assets/img/marker.png')} alt="marker" width='12px' height='12px' />
                  </Marker>
                )
              })
            }

            {
              !getProductsLoader && !searchLoader && searchedProducts && searchedProducts.map((product, i) => {
                return (
                  <Marker
                    coordinates={[product.longitude, product.latitude]}
                    anchor="bottom"
                    onClick={() => this.setState({ product, isOpenDetailDialog: true })}
                    key={i}
                  >
                    <img className="c-p" src={require('./../../assets/img/marker.png')} alt="marker" width='12px' height='12px' />
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
      searchedProducts, searchLoader, searchError
    },
    authReducer: { user }
  } = state;
  return {
    categories, getCategoriesLoader, getCategoriesError,
    savedProduct, saveProductLoader, saveProductError,
    products, getProductsLoader, getProductsError,
    searchedProducts, searchLoader, searchError,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsAction: () => dispatch(ProductAction.getProducts()),
    isLoggedIn: () => dispatch(authAction.isLoggedIn()),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(Products));
