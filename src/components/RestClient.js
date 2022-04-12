import { isDefined } from "../util/predicates";

class RestClient {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._headers = {
            "authorization": token,
            "Content-Type": "application/json; charset=utf-8"
        };
    }

    create(resource, data) {
        return this._callApi('POST', resource, data);
    }

    read(resource) {
        return this._callApi('GET', resource);
    }

    updatePartially(resource, data) {
        return this._callApi('PATCH', resource, data);
    }

    update(resource, data) {
        return this._callApi('PUT', resource, data);
    }

    delete(resource) {
        return this._callApi('DELETE', resource);
    }

    _callApi(method, resource, data) {
        const request = { method: method, headers: this._headers }

        if (isDefined(data)) {
            request.body = JSON.stringify(data);
        }

        return fetch(`${this._baseUrl}/${resource}`, request)
            .then(this._getAsJson)
            .catch(this._rejectWithError);
    }

    _getAsJson(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`ERROR: code=${response.status} msg=${response.statusText}`);
    }

    _rejectWithError(error) {
        return Promise.reject(`ERROR: ${error}`)
    }

}

export { RestClient };