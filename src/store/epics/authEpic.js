import { SIGNIN, SIGNUP, CONFIRM_SIGNUP, RESEND_SIGNUP } from './../constants'
import { Observable } from 'rxjs/Rx';
import { authAction } from './../actions/index'
import { HttpService } from '../../services/http';
import { login, signup, confirm } from "../../services/AuthService";

export default class authEpic {
    static signIn = (action$) =>
        action$.ofType(SIGNIN)
            .switchMap(({ payload }) => {
                const { email, password } = payload
                return Observable.fromPromise(login(email, password))
                    .catch((err) => {
                        debugger
                        return Observable.of(
                            authAction.signInFailure(err)
                        )
                    })
                    .switchMap((res) => {
                        debugger
                        if (res.type && res.type === 'SIGNIN_FAILURE') {
                            return Observable.of(
                                authAction.signInFailure(res.error)
                            )
                        } else {
                            return Observable.of(
                                authAction.signInSuccess(res)
                            );
                        }
                    })
                // return HttpService.get(``)
                //     .switchMap((response) => {
                //         if (response.status === 200) {
                //             return Observable.of(
                //                 authAction.signInSuccess(response.response.results)
                //             )
                //         }
                //     }).catch((err) => {
                //         return Observable.of(authAction.signInFailure(`Error in Getting Movies!`))
                //     })
            })

    static signUp = (action$) =>
        action$.ofType(SIGNUP)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(signup(payload))
                    .catch((err) => {
                        return Observable.of(
                            authAction.signUpFailure(err.message)
                        )
                    })
            })
            .switchMap((res) => {
                if (res.type && res.type === 'SIGNUP_FAILURE') {
                    return Observable.of(
                        authAction.signUpFailure(res.error)
                    )
                } else {
                    return Observable.of(authAction.signUpSuccess(res))
                }
            });

    static confirmSignUp = (action$) =>
        action$.ofType(CONFIRM_SIGNUP)
            .switchMap(({ payload }) => {
                let { user, code } = payload
                return Observable.fromPromise(confirm(user, code))
                    .catch((err) => {
                        return Observable.of(authAction.confirmSignUpFailure(err.message))
                    })
                    .switchMap((res) => {
                        if (res.type && res.type === 'CONFIRM_SIGNUP_FAILURE') {
                            return Observable.of(authAction.confirmSignUpFailure(res.payload))
                        } else {
                            return Observable.of(
                                authAction.confirmSignUpSuccess(res),
                                // authAction.signIn(res.payload)
                            )
                        }
                    })
            });

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
                        return Observable.of(authAction.resendSignUpFailure(`Error in Getting Movies!`))
                    })
            })
}