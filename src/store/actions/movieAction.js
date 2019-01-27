
import {
    GET_MOVIES, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE,
    GET_FEATURE_MOVIES, GET_FEATURE_MOVIES_SUCCESS, GET_FEATURE_MOVIES_FAILURE,
    SEARCH_MOVIES, SEARCH_MOVIES_SUCCESS, SEARCH_MOVIES_FAILURE,
} from './../constants'

export class movieAction {

    static getMovies(payload) {
        return {
            type: GET_MOVIES,
            payload
        }
    }

    static getMoviesSuccess(payload) {
        return {
            type: GET_MOVIES_SUCCESS,
            payload
        }
    }

    static getMoviesFailure(error) {
        return {
            type: GET_MOVIES_FAILURE,
            error
        }
    }

    static getFeatureMovies(payload) {
        return {
            type: GET_FEATURE_MOVIES,
            payload
        }
    }

    static getFeatureMoviesSuccess(payload) {
        return {
            type: GET_FEATURE_MOVIES_SUCCESS,
            payload
        }
    }

    static getFeatureMoviesFailure(error) {
        return {
            type: GET_FEATURE_MOVIES_FAILURE,
            error
        }
    }
    
    static searchMovies(payload) {
        return {
            type: SEARCH_MOVIES,
            payload
        }
    }

    static searchMoviesSuccess(payload) {
        return {
            type: SEARCH_MOVIES_SUCCESS,
            payload
        }
    }

    static searchMoviesFailure(error) {
        return {
            type: SEARCH_MOVIES_FAILURE,
            error
        }
    }
}