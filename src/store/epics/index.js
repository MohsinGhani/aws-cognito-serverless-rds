import { combineEpics } from 'redux-observable';
import authEpic from './authEpic'

const rootEpic = combineEpics(
    authEpic.signIn,
    authEpic.signUp,
    authEpic.confirmSignUp,
    authEpic.resendSignUp,
);

export default rootEpic;