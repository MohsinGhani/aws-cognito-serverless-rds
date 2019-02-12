import credentials from './credentials';

export default class path {
    static POST_SIGNUP = `${credentials.BASE_URL}/post-signup`;
    static POST_CONFIRMATION = `${credentials.BASE_URL}/post-confirmation`;
    static GET_USER_BY_ID = `${credentials.BASE_URL}/get-user`;
    // products
    static GET_CATEGORIES = `${credentials.BASE_URL}/getCategory`;
}