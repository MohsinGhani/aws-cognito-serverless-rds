import {
    GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE,
    GET_FEATURE_MOVIES, GET_FEATURE_MOVIES_SUCCESS, GET_FEATURE_MOVIES_FAILURE,
    SEARCH_MOVIES, SEARCH_MOVIES_SUCCESS, SEARCH_MOVIES_FAILURE,
} from './../constants'

const initialState = {
    movies: null,
    getMoviesLoader: false,
    getMoviesError: null,
}

export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MOVIES:
            return {
                ...state,
                movies: null,
                getMoviesLoader: true,
                getMoviesError: null
            }

        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                getMoviesLoader: false,
                getMoviesError: null
            }

        case GET_MOVIES_FAILURE:
            return {
                ...state,
                movies: null,
                getMoviesLoader: false,
                getMoviesError: action.error
            }

        case GET_FEATURE_MOVIES:
            return {
                ...state,
                movies: null,
                getMoviesLoader: true,
                getMoviesError: null
            }

        case GET_FEATURE_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                getMoviesLoader: false,
                getMoviesError: null
            }

        case GET_FEATURE_MOVIES_FAILURE:
            return {
                ...state,
                movies: null,
                getMoviesLoader: false,
                getMoviesError: action.error
            }

        case SEARCH_MOVIES:
            return {
                ...state,
                movies: null,
                getMoviesLoader: true,
                getMoviesError: null
            }

        case SEARCH_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload,
                getMoviesLoader: false,
                getMoviesError: null
            }

        case SEARCH_MOVIES_FAILURE:
            return {
                ...state,
                movies: null,
                getMoviesLoader: false,
                getMoviesError: action.payload
            }

        default:
            return state
    }

}