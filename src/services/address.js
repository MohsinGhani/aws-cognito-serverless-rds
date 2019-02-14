import path from '../config/path';

export class Address {
    static getCountries() {
        return fetch(path.countries, {
            method: 'GET',
        })
    }
    static GetState(countryCode) {
        return fetch(path.state + countryCode, {
            method: 'GET'
        })
    }
    static GetCities(countryCode, StateCode) {
        return fetch(path.city + countryCode + path.city1 + StateCode, {
            mehtod: 'GET'
        })
    }
}