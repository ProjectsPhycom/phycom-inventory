import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";
import StorageService from "./storage.service";

/**
 * Login request to server
 * @param {object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */
export async function loginService(payload) {
  const url = BASE_URL + routes.LOGIN;
  const payloadData = {
    email: payload.email,
    password: payload.password,
    appVersion: process.env.VUE_APP_VERSION,
  };
  const response = await ApiServcie.postApi(url, payloadData);
  StorageService.saveToken(response.data.data.token);
  return response.data.data;
}

/**
 * Logout request to the server
 */
export async function logoutService() {
  const url = BASE_URL + routes.LOGOUT;
  const response = await ApiServcie.postApi(url, {});
  StorageService.removeToken();
  return response.data.data;
}

/**
 * Get data from the user logged in
 */
export async function getUserDataService() {
  const url = BASE_URL + routes.GET_USER_DATA;
  const response = await ApiServcie.getApi(url, {});
  return response.data.data;
}
