
import {
    SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE,
    SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    POST_SIGNUP, POST_SIGNUP_SUCCESS, POST_SIGNUP_FAILURE,
    POST_SOCIAL_AUTH, POST_SOCIAL_AUTH_SUCCESS, POST_SOCIAL_AUTH_FAILURE,
    CONFIRM_SIGNUP, CONFIRM_SIGNUP_SUCCESS, CONFIRM_SIGNUP_FAILURE,
    POST_CONFIRM, POST_CONFIRM_SUCCESS, POST_CONFIRM_FAILURE,
    RESEND_SIGNUP, RESEND_SIGNUP_SUCCESS, RESEND_SIGNUP_FAILURE,
    IS_LOGGED_IN, IS_LOGGED_IN_SUCCESS, IS_LOGGED_IN_FAILURE,
    GET_USER_BY_ID, GET_USER_BY_ID_SUCCESS, GET_USER_BY_ID_FAILURE,
    LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
    FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
    CONFIRM_NEW_PASSWORD, CONFIRM_NEW_PASSWORD_SUCCESS, CONFIRM_NEW_PASSWORD_FAILURE,
    UPLOAD_PROFILE_IMAGE, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_FAILURE,
} from './../constants'

export class authAction {

    static postSocialAuth(payload) {
        return {
            type: POST_SOCIAL_AUTH,
            payload
        }
    }

    static postSocialAuthSuccess(payload) {
        return {
            type: POST_SOCIAL_AUTH_SUCCESS,
            payload
        }
    }

    static postSocialAuthFailure(error) {
        return {
            type: POST_SOCIAL_AUTH_FAILURE,
            error
        }
    }

    ///////////////
    static uploadProfileImage(payload) {
        return {
            type: UPLOAD_PROFILE_IMAGE,
            payload
        }
    }

    static uploadProfileImageSuccess(payload) {
        return {
            type: UPLOAD_PROFILE_IMAGE_SUCCESS,
            payload
        }
    }

    static uploadProfileImageFailure(error) {
        return {
            type: UPLOAD_PROFILE_IMAGE_FAILURE,
            error
        }
    }
    
    ///////////////
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
    static forgotPassword(payload) {
        return {
            type: FORGOT_PASSWORD,
            payload
        }
    }

    static forgotPasswordSuccess(payload) {
        return {
            type: FORGOT_PASSWORD_SUCCESS,
            payload
        }
    }

    static forgotPasswordFailure(error) {
        return {
            type: FORGOT_PASSWORD_FAILURE,
            error
        }
    }
    
    /////////////
    static confirmNewPassword(payload) {
        return {
            type: CONFIRM_NEW_PASSWORD,
            payload
        }
    }

    static confirmNewPasswordSuccess(payload) {
        return {
            type: CONFIRM_NEW_PASSWORD_SUCCESS,
            payload
        }
    }

    static confirmNewPasswordFailure(error) {
        return {
            type: CONFIRM_NEW_PASSWORD_FAILURE,
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