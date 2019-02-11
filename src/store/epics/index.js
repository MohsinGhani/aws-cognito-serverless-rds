import { combineEpics } from 'redux-observable';
import authEpic from './authEpic'

const rootEpic = combineEpics(
    authEpic.signIn,
    authEpic.signUp,
    authEpic.confirmSignUp,
    authEpic.resendSignUp,
    authEpic.postSignUp,
    authEpic.postConfirm,
    authEpic.isLoggedIn,
);

export default rootEpic;