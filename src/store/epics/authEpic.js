import {
    SIGNIN,
    SIGNUP,
    POST_SIGNUP,
    CONFIRM_SIGNUP,
    RESEND_SIGNUP,
    POST_CONFIRM,
    IS_LOGGED_IN,
    GET_USER_BY_ID,
    POST_SOCIAL_AUTH,
    LOGOUT
} from './../constants'
import { Observable } from 'rxjs/Rx';
import { authAction } from './../actions/index'
import { HttpService } from '../../services/http';
import path from './../../config/path'
import { login, signup, confirm, isLoggedIn, logout, signupWithPhone } from "../../services/AuthService";
import store from './../store'

export default class authEpic {
    static signIn = (action$) =>
        action$.ofType(SIGNIN)
            .switchMap(({ payload }) => {
                const { email, password } = payload
                return Observable.fromPromise(login(email, password))
                    .catch((err) => {
                        return Observable.of(
                            authAction.signInFailure(err)
                        )
                    })
                    .switchMap((res) => {
                        if (res.type && res.type === 'SIGNIN_FAILURE') {
                            return Observable.of(
                                authAction.signInFailure(res.error)
                            )
                        } else {
                            return Observable.of(
                                authAction.signInSuccess(res),
                                authAction.getUserById({ user_id: res.username })
                            );
                        }
                    })
            })

    static signUp = (action$) =>
        action$.ofType(SIGNUP)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(payload.isPhoneVerificationEnable ? signupWithPhone(payload) : signup(payload))
                    .catch((err) => {
                        return Observable.of(authAction.signUpFailure(err.message))
                    })
            })
            .switchMap((res) => {
                if (res.type && res.type === 'SIGNUP_FAILURE') {
                    return Observable.of(authAction.signUpFailure(res.error))
                } else {
                    return Observable.of(
                        authAction.signUpSuccess(res),
                        authAction.postSignUp(res)
                    )
                }
            });

    static logout = (action$) =>
        action$.ofType(LOGOUT)
            .switchMap(({ }) => {
                return Observable.fromPromise(logout())
                    .catch((err) => {
                        return Observable.of(authAction.logoutFailure(err.message))
                    })
            })
            .switchMap((res) => {
                if (res.type && res.type === 'LOGOUT_FAILURE') {
                    return Observable.of(authAction.logoutFailure(res.error))
                } else {
                    return Observable.of(
                        authAction.logoutSuccess(res)
                    )
                }
            });

    static isLoggedIn = (action$) =>
        action$.ofType(IS_LOGGED_IN)
            .switchMap(() => {
                return Observable.fromPromise(isLoggedIn())
                    .catch((err) => {
                        return Observable.of(authAction.isLoggedInFailure(err))
                    })
                    .switchMap((res) => {
                        if (res.type && res.type === 'IS_LOGGED_IN_FAILURE') {
                            return Observable.of(authAction.isLoggedInFailure(res))
                        } else {
                            return Observable.of(
                                authAction.isLoggedInSuccess(res),
                                authAction.getUserById({ user_id: res.username ? res.username : res.id })
                            )
                        }
                    })
            });

    static confirmSignUp = (action$) =>
        action$.ofType(CONFIRM_SIGNUP)
            .switchMap(({ payload }) => {
                let { user, code } = payload
                return Observable.fromPromise(confirm(user, code))
                    .catch((error) => {
                        return Observable.of(authAction.confirmSignUpFailure(error))
                    })
                    .switchMap((res) => {
                        let { email, password } = store.getState().authReducer["signupUser"]
                        if (res.type && res.type === 'CONFIRM_SIGNUP_FAILURE') {
                            return Observable.of(authAction.confirmSignUpFailure(res.error))
                        } else {
                            return Observable.of(
                                authAction.confirmSignUpSuccess(res),
                                authAction.postConfirm({ user_id: res.user_id }),
                                authAction.signIn({ email, password })

                            )
                        }
                    })
            });

    static postSignUp = (action$) =>
        action$.ofType(POST_SIGNUP)
            .switchMap(({ payload }) => {
                let { email, user_id, verified, firstname, lastname, phone, password } = payload
                return HttpService.post(path.POST_SIGNUP, { email, user_id, verified, firstname, lastname, phone })
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.postSignUpSuccess({ ...response.data, password })
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.postSignUpFailure(`${err}`))
                    })
            })

    static postSocialAuth = (action$) =>
        action$.ofType(POST_SOCIAL_AUTH)
            .switchMap(({ payload }) => {
                let { email, user_id, firstname, lastname } = payload
                return HttpService.post(path.POST_SOCIAL_AUTH, { email, user_id, firstname, lastname })
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.postSocialAuthSuccess({ ...response.data })
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.postSocialAuthFailure(`${err}`))
                    })
            })

    static postConfirm = (action$) =>
        action$.ofType(POST_CONFIRM)
            .switchMap(({ payload }) => {
                return HttpService.put(`${path.POST_CONFIRMATION}/${payload.user_id}`)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.postConfirmSuccess(response.data),
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.postConfirmFailure(`${err}`))
                    })
            })

    static resendSignUp = (action$) =>
        action$.ofType(RESEND_SIGNUP)
            .switchMap(({ payload }) => {
                return HttpService.get(``)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.resendSignUpSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.resendSignUpFailure(``))
                    })
            })

    static getUserById = (action$) =>
        action$.ofType(GET_USER_BY_ID)
            .switchMap(({ payload }) => {
                return HttpService.get(`${path.GET_USER_BY_ID}/${payload.user_id}`)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.getUserByIdSuccess(response.data)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.getUserByIdFailure({ error: err.message }))
                    })
            })
}