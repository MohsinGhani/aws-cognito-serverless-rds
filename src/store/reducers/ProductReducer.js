import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
    SAVE_PRODUCT, SAVE_PRODUCT_SUCCESS, SAVE_PRODUCT_FAILURE,
    GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
    GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
    LIKE_DISLIKE_PRODUCT, LIKE_DISLIKE_PRODUCT_SUCCESS, LIKE_DISLIKE_PRODUCT_FAILURE,
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

    product: null,
    getProductByIdLoader: false,
    getProductByIdError: null,

    liked: null,
    likeProductLoader: false,
    likeProductError: null,
}

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        ///////////////////////
        case LIKE_DISLIKE_PRODUCT:
            return {
                ...state,
                liked: null,
                likeProductLoader: true,
                likeProductError: null
            }

        case LIKE_DISLIKE_PRODUCT_SUCCESS:
            return {
                ...state,
                liked: action.payload,
                likeProductLoader: false,
                likeProductError: null
            }

        case LIKE_DISLIKE_PRODUCT_FAILURE:
            return {
                ...state,
                liked: null,
                likeProductLoader: false,
                likeProductError: action.error
            }

        ////////////////////
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

        //////////////
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                product: null,
                getProductByIdLoader: true,
                getProductByIdError: null
            }

        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                product: action.payload,
                getProductByIdLoader: false,
                getProductByIdError: null
            }

        case GET_PRODUCT_BY_ID_FAILURE:
            return {
                ...state,
                product: null,
                getProductByIdLoader: false,
                getProductByIdError: action.error
            }

        default:
            return state
    }

}