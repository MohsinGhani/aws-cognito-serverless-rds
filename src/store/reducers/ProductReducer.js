import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
    SAVE_PRODUCT, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE,
    GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
} from './../constants'

const initialState = {
    categories: null,
    getCategoriesLoader: false,
    getCategoriesError: null,

    savedProduct: null,
    saveProductLoader: false,
    saveProductError: null,

    products: null,
    getProductsLoader: false,
    getProductsError: null,
}

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: null,
                getCategoriesLoader: true,
                getCategoriesError: null
            }

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                getCategoriesLoader: false,
                getCategoriesError: null
            }

        case GET_CATEGORIES_FAILURE:
            return {
                ...state,
                categories: null,
                getCategoriesLoader: false,
                getCategoriesError: action.error
            }

        //////////////
        case SAVE_PRODUCT:
            return {
                ...state,
                savedProduct: null,
                saveProductLoader: true,
                saveProductError: null
            }

        case SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                savedProduct: action.payload,
                saveProductLoader: false,
                saveProductError: null
            }

        case SAVE_PRODUCT_FAILURE:
            return {
                ...state,
                savedProduct: null,
                saveProductLoader: false,
                saveProductError: action.error
            }

        //////////////
        case GET_PRODUCTS:
            return {
                ...state,
                products: null,
                getProductsLoader: true,
                getProductsError: null,

                savedProduct: null,
                saveProductLoader: false,
                saveProductError: null
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                getProductsLoader: false,
                getProductsError: null
            }

        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                products: null,
                getProductsLoader: false,
                getProductsError: action.error
            }

        default:
            return state
    }

}