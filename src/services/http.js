import { ajax } from 'rxjs/ajax';

export class HttpService {
    //Get request HTTP service
    static get(url, headers = {}) {
        return ajax({
            url,
            method: 'GET',
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }

    //Post request HTTP service
    static post(url, body, headers = { 'Content-Type': 'application/json' }) {
        return ajax({
            url,
            method: 'POST',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }

    //Post request HTTP service
    static put(url, body, headers = { 'Content-Type': 'application/json' }) {
        return ajax({
            url,
            method: 'PUT',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    }
}