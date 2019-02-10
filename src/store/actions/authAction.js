
import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    POST_SIGNUP, POST_SIGNUP_SUCCESS, POST_SIGNUP_FAILURE,
    CONFIRM_SIGNUP, CONFIRM_SIGNUP_SUCCESS, CONFIRM_SIGNUP_FAILURE,
    RESEND_SIGNUP, RESEND_SIGNUP_SUCCESS, RESEND_SIGNUP_FAILURE,
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

}