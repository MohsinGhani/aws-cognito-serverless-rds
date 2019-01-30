import { SIGNIN, SIGNUP, CONFIRM_SIGNUP, RESEND_SIGNUP } from './../constants'
import { Observable } from 'rxjs/Rx';
import { authAction } from './../actions/index'
import { HttpService } from '../../services/http';

export default class authEpic {
    static signIn = (action$) =>
        action$.ofType(SIGNIN)
            .switchMap(({ payload }) => {
                return HttpService.get(``)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.signInSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.signInFailure(`Error in Getting Movies!`))
                    })
            })

    static signUp = (action$) =>
        action$.ofType(SIGNUP)
            .switchMap(({ payload }) => {
                return HttpService.get(``)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.signUpSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.signUpFailure(`Error in Getting Movies!`))
                    })
            })

    static confirmSignUp = (action$) =>
        action$.ofType(CONFIRM_SIGNUP)
            .switchMap(({ payload }) => {
                return HttpService.get(``)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                authAction.confirmSignUpSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(authAction.confirmSignUpFailure(`Error in Getting Movies!`))
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
                        return Observable.of(authAction.resendSignUpFailure(`Error in Getting Movies!`))
                    })
            })
}