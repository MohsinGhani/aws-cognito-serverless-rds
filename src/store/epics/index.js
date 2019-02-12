import { combineEpics } from 'redux-observable';
import authEpic from './authEpic'
import ProductEpic from './ProductEpic'

const rootEpic = combineEpics(
    authEpic.signIn,
    authEpic.signUp,
    authEpic.confirmSignUp,
    authEpic.resendSignUp,
    authEpic.postSignUp,
    authEpic.postConfirm,
    authEpic.isLoggedIn,
    authEpic.getUserById,

    ProductEpic.getCategories
);

export default rootEpic;