
import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
    SAVE_PRODUCT, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE,
} from './../constants'

export class ProductAction {

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
}