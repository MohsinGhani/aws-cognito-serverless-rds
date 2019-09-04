import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ProductAction, authAction } from "../../store/actions";
import "./index.css";
import TopNav from "./../common/TopNav";
import ProductDetailModal from "./ProductDetailModal";
import ProductCard from "./productCard";
import ReactLoading from "react-loading";

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isOpenDetailDialog: false
    };
  }

  componentDidMount() {
    this.props.isLoggedInAction();
    this.props.getProductsAction();
  }

  handleLikeAndDislikeProduct = action => {
    const { user, match, likeProductAction } = this.props;
    if (user && user.user_id && match.params && match.params.product_id) {
      likeProductAction({
        user_id: user.user_id,
        product_id: match.params.product_id,
        action
      });
    } else {
      alert("you can't perform any action before authentication");
    }
  };

  render() {
    let {
      products,
      getProductsLoader,
      searchedProducts,
      searchLoader,
      user
    } = this.props;
    let { product, isOpenDetailDialog } = this.state;

    return (
      <div>
        {<TopNav />}
        <ProductDetailModal
          history={this.props.history}
          product_id={product ? product.product_id : null}
          open={isOpenDetailDialog}
          handleDetailDialog={action =>
            this.setState({ isOpenDetailDialog: action })
          }
        />

        {!getProductsLoader &&
          !searchLoader &&
          !searchedProducts &&
          products &&
          products.map((product, i) => {
            return (
              <ProductCard
                key={i}
                product={product}
                handleClick={product =>
                  this.setState({ product, isOpenDetailDialog: true })
                }
              />
            );
          })}

        {!getProductsLoader &&
          !searchLoader &&
          searchedProducts &&
          searchedProducts.map((product, i) => {
            return (
              <ProductCard
                key={i}
                product={product}
                handleClick={product =>
                  this.setState({ product, isOpenDetailDialog: true })
                }
              />
            );
          })}

        {(getProductsLoader || searchLoader) && (
          <div style={{ width: "50px", margin: "50px auto" }}>
            <ReactLoading
              type={"spin"}
              color={"#9e7339"}
              height={"100px"}
              width={"100px"}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    ProductReducer: {
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
    isLoggedInAction: () => dispatch(authAction.isLoggedIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({})(ProductsList));
