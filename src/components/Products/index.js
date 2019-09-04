import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from "./../common/TopNav";
import { connect } from "react-redux";
import { ProductAction, authAction } from "./../../store/actions";
import "./index.css";
import Button from "@material-ui/core/Button";
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from "../../config/credentials";
import ProductDetailModal from "./ProductDetailModal";
import Location from "./../common/Location";
import SignInWithGoogle from "./../Auth/SignInWithGoogle";
import SignInWithFacebook from "./../Auth/SignInWithFacebook";
import ReactLoading from "react-loading";

const Map = ReactMapboxGl({
  accessToken: credentials.MAP_ACCESS_TOCKEN
});

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: "5px 0 0 0",
    backgroundColor: "#946638	",
    color: "white",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "15px"
  },
  signinBtn: {
    margin: "5px",
    backgroundColor: "#946638	",
    color: "white",
    width: "50vh",
    justifyContent: "inherit",
    zIndex: 1001
  }
});
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      product: null,
      isOpenDetailDialog: false,
      latitude: 36.778259,
      longitude: -119.417931
    };
  }

  componentDidMount() {
    this.props.isLoggedInAction();
    this.props.getProductsAction();
  }

  componentDidUpdate(prevProps) {
    const { searchedProducts } = this.props
    if(searchedProducts && searchedProducts.length){
      this.goto('/products-list')
    }
  }

  goto = path => this.props.history.push(path);

  render() {
    let {
      products,
      getProductsLoader,
      searchedProducts,
      searchLoader
    } = this.props;
    let { product, isOpenDetailDialog, latitude, longitude } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Location
          handleLocation={(latitude, longitude) => {
            this.setState({ latitude, longitude });
          }}
        />
        <ProductDetailModal
          history={this.props.history}
          product_id={product ? product.product_id : null}
          open={isOpenDetailDialog}
          handleDetailDialog={action =>
            this.setState({ isOpenDetailDialog: action })
          }
        />
        <TopNav />
        <div>
          {searchLoader ? (
            <div style={{ width: "100px", margin: "70px auto" }}>
              <ReactLoading
                type={"spin"}
                color={"#9e7339"}
                height={"100px"}
                width={"100px"}
              />
            </div>
          ) : (
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: "89vh",
                  width: "100%"
                }}
                movingMethod={"jumpTo"}
                center={[longitude, latitude]}
                zoom={[12]}
              // onClick={(map, e) => { this.props.reverseGeoCodingAction(e.lngLat) }}
              >
                {!this.props.isLoggedIn && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative"
                    }}
                  >
                    <div className="mainBodyButtons">
                      <Button
                        onClick={() => this.goto("/signin")}
                        variant="contained"
                        className={classes.signinBtn}
                      >
                        <i
                          class="fa fa-envelope"
                          aria-hidden="true"
                          style={{ marginRight: 10, position: "relative" }}
                        />
                        Continue with e-mail
                    </Button>
                      <br />
                      <SignInWithGoogle btnStyle={classes.signinBtn} />
                      <br />
                      <SignInWithFacebook btnStyle={classes.signinBtn} />
                    </div>
                  </div>
                )}

                {/* current location pointer */}
                <Marker
                  coordinates={[longitude, latitude]}
                  anchor="bottom"
                // style={{ position: "absolute" }}
                >
                  <img
                    className="c-p"
                    title="your current location"
                    src={require("./../../assets/img/current-location.png")}
                    alt="marker"
                    // style={{ position: "absolute", zIndex: -1 }}
                    width="20px"
                    height="25"
                  />
                </Marker>

                {!getProductsLoader &&
                  !searchLoader &&
                  !searchedProducts &&
                  products &&
                  products.map((product, i) => {
                    return (
                      <Marker
                        coordinates={[product.longitude, product.latitude]}
                        anchor="bottom"
                        //  style={{ position: "absolute"}}
                        onClick={() =>
                          this.setState({ product, isOpenDetailDialog: true })
                        }
                        key={i}
                      >
                        <img
                          className="c-p"
                          // style={{ position: "absolute" }}
                          title={product.title}
                          src={require("./../../assets/img/marker.png")}
                          alt="marker"
                          width="12px"
                          height="12px"
                        />
                      </Marker>
                    );
                  })}

                {!getProductsLoader &&
                  !searchLoader &&
                  searchedProducts &&
                  searchedProducts.map((product, i) => {
                    return (
                      <Marker
                        coordinates={[product.longitude, product.latitude]}
                        anchor="bottom"
                        //  style={{ position: "absolute"}}
                        onClick={() =>
                          this.setState({ product, isOpenDetailDialog: true })
                        }
                        key={i}
                      >
                        <img
                          className="c-p"
                          // style={{ position: "absolute" }}
                          title={product.title}
                          src={require("./../../assets/img/marker.png")}
                          alt="marker"
                          width="12px"
                          height="12px"
                        />
                      </Marker>
                    );
                  })}
              </Map>
            )}
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
      products,
      getProductsLoader,
      getProductsError,
      searchedProducts,
      searchLoader,
      searchError
    },
    authReducer: { user, isLoggedIn }
  } = state;
  return {
    categories,
    getCategoriesLoader,
    getCategoriesError,
    savedProduct,
    saveProductLoader,
    saveProductError,
    products,
    getProductsLoader,
    getProductsError,
    searchedProducts,
    searchLoader,
    searchError,
    user,
    isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsAction: () => dispatch(ProductAction.getProducts()),
    reverseGeoCodingAction: payload =>
      dispatch(ProductAction.reverseGeoCoding(payload)),
    isLoggedInAction: () => dispatch(authAction.isLoggedIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Products));
