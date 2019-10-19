import { combineEpics } from 'redux-observable';
import authEpic from './authEpic'
import ProductEpic from './ProductEpic'

const rootEpic = combineEpics(
    authEpic.signIn,
    authEpic.signUp,
    authEpic.confirmSignUp,
    authEpic.resendSignUp,
    authEpic.postSignUp,
    authEpic.postSocialAuth,
    authEpic.postConfirm,
    authEpic.isLoggedIn,
    authEpic.getUserById,
    authEpic.logout,
    authEpic.forgotPassword,
    authEpic.confirmNewPassword,
    authEpic.uploadProfileImage,

    ProductEpic.getCategories,
    ProductEpic.saveProduct,
    ProductEpic.getProducts,
    ProductEpic.getProductById,
    ProductEpic.likeProduct,
    ProductEpic.reverseGeoCoding,
    ProductEpic.doCommentOnProduct,
    ProductEpic.search,
    ProductEpic.sendFeedback,
    ProductEpic.actionOnComment
);

export default rootEpic;