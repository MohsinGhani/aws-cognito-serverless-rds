import {
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILURE,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  LIKE_DISLIKE_PRODUCT,
  LIKE_DISLIKE_PRODUCT_SUCCESS,
  LIKE_DISLIKE_PRODUCT_FAILURE,
  DO_COMMENT_ON_PRODUCT,
  DO_COMMENT_ON_PRODUCT_SUCCESS,
  DO_COMMENT_ON_PRODUCT_FAILURE,
  REVERSE_GEOCODING,
  REVERSE_GEOCODING_SUCCESS,
  REVERSE_GEOCODING_FAILURE,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SEND_FEEDBACK,
  SEND_FEEDBACK_SUCCESS,
  SEND_FEEDBACK_FAILURE,
  ACTION_ON_COMMENT,
  ACTION_ON_COMMENT_FAILURE,
  ACTION_ON_COMMENT_SUCCESS,
  CLEAR_SEARCH
} from "./../constants";

export class ProductAction {
  /////////////////
  static reverseGeoCoding(payload) {
    return {
      type: REVERSE_GEOCODING,
      payload
    };
  }

  static reverseGeoCodingSuccess(payload) {
    return {
      type: REVERSE_GEOCODING_SUCCESS,
      payload
    };
  }

  static reverseGeoCodingFailure(error) {
    return {
      type: REVERSE_GEOCODING_FAILURE,
      error
    };
  }

  /////////////////
  static search(payload) {
    return {
      type: SEARCH,
      payload
    };
  }

  static searchSuccess(payload) {
    return {
      type: SEARCH_SUCCESS,
      payload
    };
  }

  static searchFailure(error) {
    return {
      type: SEARCH_FAILURE,
      error
    };
  }

  /////////////////
  static clearSearch() {
    return {
      type: CLEAR_SEARCH
    };
  }

  /////////////////
  static doCommentOnProduct(payload) {
    return {
      type: DO_COMMENT_ON_PRODUCT,
      payload
    };
  }

  static doCommentOnProductSuccess(payload) {
    return {
      type: DO_COMMENT_ON_PRODUCT_SUCCESS,
      payload
    };
  }

  static doCommentOnProductFailure(error) {
    return {
      type: DO_COMMENT_ON_PRODUCT_FAILURE,
      error
    };
  }

  /////////////////
  static likeProduct(payload) {
    return {
      type: LIKE_DISLIKE_PRODUCT,
      payload
    };
  }

  static likeProductSuccess(payload) {
    return {
      type: LIKE_DISLIKE_PRODUCT_SUCCESS,
      payload
    };
  }

  static likeProductFailure(error) {
    return {
      type: LIKE_DISLIKE_PRODUCT_FAILURE,
      error
    };
  }

  /////////////////
  static getCategories(payload) {
    return {
      type: GET_CATEGORIES,
      payload
    };
  }

  static getCategoriesSuccess(payload) {
    return {
      type: GET_CATEGORIES_SUCCESS,
      payload
    };
  }

  static getCategoriesFailure(error) {
    return {
      type: GET_CATEGORIES_FAILURE,
      error
    };
  }

  //////////////////
  static saveProduct(payload) {
    return {
      type: SAVE_PRODUCT,
      payload
    };
  }

  static saveProductSuccess(payload) {
    return {
      type: SAVE_PRODUCT_SUCCESS,
      payload
    };
  }

  static saveProductFailure(error) {
    return {
      type: SAVE_PRODUCT_FAILURE,
      error
    };
  }

  //////////////////
  static getProducts(payload) {
    return {
      type: GET_PRODUCTS,
      payload
    };
  }

  static getProductsSuccess(payload) {
    return {
      type: GET_PRODUCTS_SUCCESS,
      payload
    };
  }

  static getProductsFailure(error) {
    return {
      type: GET_PRODUCTS_FAILURE,
      error
    };
  }

  //////////////////
  static getProductById(payload) {
    return {
      type: GET_PRODUCT_BY_ID,
      payload
    };
  }

  static getProductByIdSuccess(payload) {
    return {
      type: GET_PRODUCT_BY_ID_SUCCESS,
      payload
    };
  }

  static getProductByIdFailure(error) {
    return {
      type: GET_PRODUCT_BY_ID_FAILURE,
      error
    };
  }

  //////////////////
  static sendFeedback(payload) {
    return {
      type: SEND_FEEDBACK,
      payload
    };
  }

  static sendFeedbackSuccess(payload) {
    return {
      type: SEND_FEEDBACK_SUCCESS,
      payload
    };
  }

  static sendFeedbackFailure(error) {
    return {
      type: SEND_FEEDBACK_FAILURE,
      error
    };
  }

  //////////////////
  static actionOnComment(payload) {
    return {
      type: ACTION_ON_COMMENT,
      payload
    };
  }

  static actionOnCommentSuccess(payload) {
    return {
      type: ACTION_ON_COMMENT_SUCCESS,
      payload
    };
  }

  static actionOnCommentFailure(error) {
    return {
      type: ACTION_ON_COMMENT_FAILURE,
      error
    };
  }
}
