import "whatwg-fetch";
import Promise from "promise-polyfill";
import { requestUrl } from "../config/";
if (!Promise) {
	window.Promise = Promise;
}
const METHODS = ["get", "delete"];
const BODY_METHODS = ["post", "put", "patch"];
function parseJSON(response) {
	return response.json();
}
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
}
function request(method, url, params = {}, header = {}) {
	const headers = {
		"Content-Type": "application/json",
		Accept: "*/*",
		...header
	};

	let _url = requestUrl + url;
	let body;
	if (METHODS.includes(method)) {
		const _params = [];

		for (let key in params) {
			_params.push(`${key}=${params[key]}`);
		}

		if (_params.length) {
			_url += "?";
			_url += _params.join("&");
		}
	} else {
		body = JSON.stringify(params);
	}
	return fetch(_url, {
		method,
		body,
		headers
	})
		.then(checkStatus)
		.then(parseJSON);
}
const methods = {};

[...METHODS, ...BODY_METHODS].forEach(method => {
	methods[method] = ({ url, params, header }, isLocal) =>
		request(method, url, params, header, isLocal);
});

export default methods;
