import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from './../common/TopNav'
import { connect } from 'react-redux';
import { ProductAction, authAction } from './../../store/actions'
import CommentModal from './CommentModal'
import ProductDetailModal from './../Products/ProductDetailModal'
import "./index.css";


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentModal: false,
      isOpenDetailDialog: true,
    }
  }

  componentDidMount() {
    this.props.isLoggedIn()
    let { match, getProductByIdAction } = this.props
    if (match.params && match.params.product_id) getProductByIdAction({ product_id: match.params.product_id })
  }

  handleLikeAndDislikeProduct = (action) => {
    const { user, match, likeProductAction } = this.props
    if (user && user.user_id && match.params && match.params.product_id) {
      likeProductAction({
        user_id: user.user_id,
        product_id: match.params.product_id,
        action
      })
    }
    else {
      alert("you can't perform any action before authentication")
    }
  }

  render() {
    const { match } = this.props;
    const { showCommentModal, isOpenDetailDialog } = this.state;
    return (
      <div>
        <CommentModal
          open={showCommentModal}
          handleClose={() => this.setState({ showCommentModal: false })}
        />
        {/* <TopNav /> */}
        <div className="product-detail-modal-body">
          <ProductDetailModal
            history={this.props.history}
            product_id={match.params ? match.params.product_id : null}
            open={isOpenDetailDialog}
            handleDetailDialog={action =>{
              this.setState({ isOpenDetailDialog: action })
              this.props.history.push('/')
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    ProductReducer: {
      product, getProductByIdLoader, getProductByIdError,
      liked, likeProductLoader, likeProductError
    },
    authReducer: { user }
  } = state;
  return {
    product, getProductByIdLoader, getProductByIdError,
    liked, likeProductLoader, likeProductError,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductByIdAction: (payload) => dispatch(ProductAction.getProductById(payload)),
    likeProductAction: (payload) => dispatch(ProductAction.likeProduct(payload)),
    isLoggedIn: () => dispatch(authAction.isLoggedIn()),
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles({})(Product));
