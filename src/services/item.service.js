import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";

/**
 * Logout request to the server
 * @param {object} payload
 * @param {string} payload.name
 * @param {string} payload.model
 * @param {string} payload.description
 * @param {string} payload.status
 * @param {number} payload.total
 * @param {number} payload.onLoan
 * @param {string} payload.image
 */
export async function createItemService(payload) {
  const url = BASE_URL + routes.CREATE_ITEM;
  const response = await ApiServcie.postApi(url, payload);
  return response.data.data;
}
