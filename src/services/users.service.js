import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";

/**
 * Returns all users in the database
 * @param {object} payload
 * @param {string} payload.searchText
 * @param {string} payload.orderBy
 * @param {string} payload.orderDirection
 * @param {number} payload.limit
 * @param {number} payload.skip
 */
export async function getUsersService(payload) {
  const url = BASE_URL + routes.GET_USERS;
  const queryData = {
    params: payload,
  };
  const response = await ApiServcie.getApi(url, queryData);
  return response.data.data;
}
