import credentials from './credentials';

export default class path {
    static POST_SIGNUP = `${credentials.BASE_URL}/post-signup`;
    static POST_CONFIRMATION = `${credentials.BASE_URL}/post-confirmation`;
}