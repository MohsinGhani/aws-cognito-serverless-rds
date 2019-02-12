import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
} from './../constants'

const initialState = {
    categories: null,
    getCategoriesLoader: false,
    getCategoriesError: null,
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

        default:
            return state
    }

}