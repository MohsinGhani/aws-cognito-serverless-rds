
import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
    SAVE_PRODUCT, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE,
    GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
    GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
    LIKE_DISLIKE_PRODUCT, LIKE_DISLIKE_PRODUCT_SUCCESS, LIKE_DISLIKE_PRODUCT_FAILURE,
} from './../constants'

export class ProductAction {
    /////////////////
    static likeProduct(payload) {
        return {
            type: LIKE_DISLIKE_PRODUCT,
            payload
        }
    }

    static likeProductSuccess(payload) {
        return {
            type: LIKE_DISLIKE_PRODUCT_SUCCESS,
            payload
        }
    }

    static likeProductFailure(error) {
        return {
            type: LIKE_DISLIKE_PRODUCT_FAILURE,
            error
        }
    }

    /////////////////
    static getCategories(payload) {
        return {
            type: GET_CATEGORIES,
            payload
        }
    }

    static getCategoriesSuccess(payload) {
        return {
            type: GET_CATEGORIES_SUCCESS,
            payload
        }
    }

    static getCategoriesFailure(error) {
        return {
            type: GET_CATEGORIES_FAILURE,
            error
        }
    }

    //////////////////
    static saveProduct(payload) {
        return {
            type: SAVE_PRODUCT,
            payload
        }
    }

    static saveProductSuccess(payload) {
        return {
            type: SAVE_PRODUCT_SUCCESS,
            payload
        }
    }

    static saveProductFailure(error) {
        return {
            type: SAVE_PRODUCT_FAILURE,
            error
        }
    }

    //////////////////
    static getProducts(payload) {
        return {
            type: GET_PRODUCTS,
            payload
        }
    }

    static getProductsSuccess(payload) {
        return {
            type: GET_PRODUCTS_SUCCESS,
            payload
        }
    }

    static getProductsFailure(error) {
        return {
            type: GET_PRODUCTS_FAILURE,
            error
        }
    }

    //////////////////
    static getProductById(payload) {
        return {
            type: GET_PRODUCT_BY_ID,
            payload
        }
    }

    static getProductByIdSuccess(payload) {
        return {
            type: GET_PRODUCT_BY_ID_SUCCESS,
            payload
        }
    }

    static getProductByIdFailure(error) {
        return {
            type: GET_PRODUCT_BY_ID_FAILURE,
            error
        }
    }
}