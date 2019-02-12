
import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    POST_SIGNUP, POST_SIGNUP_SUCCESS, POST_SIGNUP_FAILURE,
    CONFIRM_SIGNUP, CONFIRM_SIGNUP_SUCCESS, CONFIRM_SIGNUP_FAILURE,
    POST_CONFIRM, POST_CONFIRM_SUCCESS, POST_CONFIRM_FAILURE,
    RESEND_SIGNUP, RESEND_SIGNUP_SUCCESS, RESEND_SIGNUP_FAILURE,
    IS_LOGGED_IN, IS_LOGGED_IN_SUCCESS, IS_LOGGED_IN_FAILURE,
    GET_USER_BY_ID, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE,
} from './../constants'

export class authAction {

    static signIn(payload) {
        return {
            type: SIGNIN,
            payload
        }
    }

    static signInSuccess(payload) {
        return {
            type: SIGNIN_SUCCESS,
            payload
        }
    }

    static signInFailure(error) {
        return {
            type: SIGNIN_FAILURE,
            error
        }
    }

    /////////////
    static signUp(payload) {
        return {
            type: SIGNUP,
            payload
        }
    }

    static signUpSuccess(payload) {
        return {
            type: SIGNUP_SUCCESS,
            payload
        }
    }

    static signUpFailure(error) {
        return {
            type: SIGNUP_FAILURE,
            error
        }
    }

    /////////////
    static postSignUp(payload) {
        return {
            type: POST_SIGNUP,
            payload
        }
    }

    static postSignUpSuccess(payload) {
        return {
            type: POST_SIGNUP_SUCCESS,
            payload
        }
    }

    static postSignUpFailure(error) {
        return {
            type: POST_SIGNUP_FAILURE,
            error
        }
    }

    /////////////
    static confirmSignUp(payload) {
        return {
            type: CONFIRM_SIGNUP,
            payload
        }
    }

    static confirmSignUpSuccess(payload) {
        return {
            type: CONFIRM_SIGNUP_SUCCESS,
            payload
        }
    }

    static confirmSignUpFailure(error) {
        return {
            type: CONFIRM_SIGNUP_FAILURE,
            error
        }
    }

    /////////////
    static postConfirm(payload) {
        return {
            type: POST_CONFIRM,
            payload
        }
    }

    static postConfirmSuccess(payload) {
        return {
            type: POST_CONFIRM_SUCCESS,
            payload
        }
    }

    static postConfirmFailure(error) {
        return {
            type: POST_CONFIRM_FAILURE,
            error
        }
    }

    /////////////
    static isLoggedIn(payload) {
        return {
            type: IS_LOGGED_IN,
            payload
        }
    }

    static isLoggedInSuccess(payload) {
        return {
            type: IS_LOGGED_IN_SUCCESS,
            payload
        }
    }

    static isLoggedInFailure(error) {
        return {
            type: IS_LOGGED_IN_FAILURE,
            error
        }
    }

    /////////////
    static resendSignUp(payload) {
        return {
            type: RESEND_SIGNUP,
            payload
        }
    }

    static resendSignUpSuccess(payload) {
        return {
            type: RESEND_SIGNUP_SUCCESS,
            payload
        }
    }

    static resendSignUpFailure(error) {
        return {
            type: RESEND_SIGNUP_FAILURE,
            error
        }
    }

    /////////////
    static getUserById(payload) {
        return {
            type: GET_USER_BY_ID,
            payload
        }
    }

    static getUserByIdSuccess(payload) {
        return {
            type: GET_USER_BY_ID_SUCCESS,
            payload
        }
    }

    static getUserByIdFailure(error) {
        return {
            type: GET_USER_BY_ID_FAILURE,
            error
        }
    }

    /////////////
    static logout(payload) {
        return {
            type: LOGOUT,
            payload
        }
    }

    static logoutSuccess(payload) {
        return {
            type: LOGOUT_SUCCESS,
            payload
        }
    }

    static logoutFailure(error) {
        return {
            type: LOGOUT_FAILURE,
            error
        }
    }

}