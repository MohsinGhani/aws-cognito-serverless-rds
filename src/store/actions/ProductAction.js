
import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
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
}