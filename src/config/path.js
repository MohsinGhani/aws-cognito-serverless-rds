import credentials from './credentials';

export default class path {
    static POST_SIGNUP = `${credentials.BASE_URL}/post-signup`;
    static POST_CONFIRMATION = `${credentials.BASE_URL}/post-confirmation`;
    static GET_USER_BY_ID = `${credentials.BASE_URL}/get-user`;
    static UPLOAD_PROFILE_IMAGE = `${credentials.BASE_URL}/update-profile-image`;
    static POST_SOCIAL_AUTH = `${credentials.BASE_URL}/post-social-auth`;

    // products
    static GET_CATEGORIES = `${credentials.BASE_URL}/getCategory`;
    static SAVE_PRODUCT = `${credentials.BASE_URL}/add-product`;
    static GET_PRODUCTS = `${credentials.BASE_URL}/get-products`;
    static GET_PRODUCT = `${credentials.BASE_URL}/get-product`;
    static LIKE_OR_DISLIKE = `${credentials.BASE_URL}/like`;
    static DO_COMMENT_ON_PRODUCT = `${credentials.BASE_URL}/comment`;
    static SEARCH = `${credentials.BASE_URL}/search`;
    static REVERSE_GEOCODING = `https://api.mapbox.com/geocoding/v5/mapbox.places`;

    // ADDRESS
    static countries = "https://geodata.solutions/api/api.php?type=getCountries";
    static state = "https://geodata.solutions/api/api.php?type=getStates&countryId=";
    static city = "https://geodata.solutions/api/api.php?type=getCities&countryId="
    static city1 = "&stateId="
}