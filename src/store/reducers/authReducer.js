import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    CONFIRM_SIGNUP, CONFIRM_SIGNUP_SUCCESS, CONFIRM_SIGNUP_FAILURE,
    RESEND_SIGNUP, RESEND_SIGNUP_SUCCESS, RESEND_SIGNUP_FAILURE,
} from './../constants'

const initialState = {
    signupUser: null,
    user: null,
    authLoader: false,
    authError: null,

    confirmSignup: null,
    confirmSignupLoader: null,
    confirmSignupError: null,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SIGNIN:
            return {
                ...state,
                user: null,
                authLoader: true,
                authError: null
            }

        case SIGNIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                authLoader: false,
                authError: null
            }

        case SIGNIN_FAILURE:
            return {
                ...state,
                user: null,
                authLoader: false,
                authError: action.error
            }

        //////////////////
        case SIGNUP:
            return {
                ...state,
                user: null,
                signupUser: null,
                authLoader: true,
                authError: null
            }

        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupUser: action.payload,
                authLoader: false,
                authError: null
            }

        case SIGNUP_FAILURE:
            return {
                ...state,
                signupUser: null,
                authLoader: false,
                authError: action.error
            }

        //////////////////
        case CONFIRM_SIGNUP:
        case RESEND_SIGNUP:
            return {
                ...state,
                confirmSignup: null,
                confirmSignupLoader: true,
                confirmSignupError: null
            }

        case CONFIRM_SIGNUP_SUCCESS:
        case RESEND_SIGNUP_SUCCESS:
            return {
                ...state,
                confirmSignup: action.payload,
                confirmSignupLoader: false,
                confirmSignupError: null
            }

        case CONFIRM_SIGNUP_FAILURE:
        case RESEND_SIGNUP_FAILURE:
            return {
                ...state,
                confirmSignup: null,
                confirmSignupLoader: false,
                confirmSignupError: action.error
            }

        default:
            return state
    }

}