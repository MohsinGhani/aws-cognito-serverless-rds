import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ProductAction, authAction } from "../../store/actions";
import "./index.css";
import TopNav from "./../common/TopNav";
import ProductDetailModal from "./../Products/ProductDetailModal";
import ProductCard from "./../common/productCard";
import ReactLoading from "react-loading";
import TextError from "./../common/TextError";
import AddPostBottomNav from "./../common/AddPostBottomNav";

class MyProducts extends Component {
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

  renderNotProductError = () => {
    const {
      getProductsLoader,
      products,
      user,
      searchLoader,
      searchedQuery,
      searchedProducts
    } = this.props;
    let condition =
      products &&
      products.filter(
        product => user && user.user_id === product.creator_id
      )[0];
    let searchedCondition =
      searchedProducts &&
      searchedProducts.filter(
        product => user && user.user_id === product.creator_id
      )[0];
    if (!condition && !getProductsLoader && !searchLoader) {
      return (
        <TextError text={"Product Not Fount! You don't have any product."} />
      );
    } else if (!searchedCondition && searchedQuery) {
      return (
        <TextError
          text={"Product Not Fount! Please search for different keywords."}
        />
      );
    }
  };

  render() {
    let {
      products,
      getProductsLoader,
      searchedProducts,
      searchLoader,
      user,
      searchedQuery,
      history
    } = this.props;
    let { product, isOpenDetailDialog } = this.state;

    return (
      <div>
        <TopNav />
        <ProductDetailModal
          history={this.props.history}
          product_id={product ? product.product_id : null}
          open={isOpenDetailDialog}
          handleDetailDialog={action =>
            this.setState({ isOpenDetailDialog: action })
          }
        />
        <AddPostBottomNav history={history} />

        <div className="product-card-container">
          {!getProductsLoader &&
            !searchLoader &&
            !searchedQuery &&
            products &&
            products.map((product, i) => {
              if (user && user.user_id !== product.creator_id) return;
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
              if (user && user.user_id !== product.creator_id) return;
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
                height={"50px"}
                width={"50px"}
              />
            </div>
          )}

          {this.renderNotProductError()}
        </div>
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
      searchError,
      searchedQuery
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
    searchedQuery,
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
)(withStyles({})(MyProducts));
