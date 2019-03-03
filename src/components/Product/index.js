import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from './../common/TopNav'
import { connect } from 'react-redux';
import { ProductAction, authAction } from './../../store/actions'
import CommentModal from './CommentModal'
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import "./index.css";


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCommentModal: false
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
    const { product } = this.props;
    const { showCommentModal } = this.state;
    return (
      <div>
        <CommentModal
          open={showCommentModal}
          handleClose={() => this.setState({ showCommentModal: false })}
        />
        <TopNav />
        <div className="product-detail-modal-body">
          <div className="product-image-container">
            <img src={require('./../../assets/img/c15.jpg')} alt="product" className="product-image" />
          </div>
          {
            product ?
              <List>
                <ListItem button>
                  <ListItemText primary={'Product Title'} secondary={product.title} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary={'Product Description'} secondary={product.description} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary={'Country'} secondary={product.country} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary={'City'} secondary={product.city} />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(true) }}>
                  <ListItemText primary={'Like'} secondary={product._like} />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => { this.handleLikeAndDislikeProduct(false) }}>
                  <ListItemText primary={'Dislike'} secondary={product._dislike} />
                </ListItem>
                <Divider />
                {
                  (() => {
                    if (product && product._comments) {
                      return product._comments.map((comment, i) => {
                        return (
                          <ListItem key={i}>
                            <ListItemText secondary={comment.comment} />
                          </ListItem>
                        )
                      })
                    }
                  })()
                }
                <Divider />
                <ListItem button onClick={() => { this.setState({ showCommentModal: true }) }}>
                  <ListItemText secondary={'Add Comment'} />
                </ListItem>
              </List>
              : ''
          }
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
