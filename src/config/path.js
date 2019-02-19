import credentials from './credentials';

export default class path {
    static POST_SIGNUP = `${credentials.BASE_URL}/post-signup`;
    static POST_CONFIRMATION = `${credentials.BASE_URL}/post-confirmation`;
    static GET_USER_BY_ID = `${credentials.BASE_URL}/get-user`;
    // products
    static GET_CATEGORIES = `${credentials.BASE_URL}/getCategory`;
    static SAVE_PRODUCT = `${credentials.BASE_URL}/add-product`;
    static GET_PRODUCTS = `${credentials.BASE_URL}/get-products`;

    // ADDRESS
    static countries = "https://geodata.solutions/api/api.php?type=getCountries";
    static state = "https://geodata.solutions/api/api.php?type=getStates&countryId=";
    static city = "https://geodata.solutions/api/api.php?type=getCities&countryId="
    static city1 = "&stateId="
}