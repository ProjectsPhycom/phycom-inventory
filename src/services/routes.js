/**
 * URI
 */
export const BASE_URL = process.env.VUE_APP_API_URL;

/**
 * Server endpoints
 */
export const routes = {
  LOGIN: "/api/login",
  LOGOUT: "/api/logout",

  CREATE_ITEM: "/api/items/createItem",
  GET_ITEMS: "/api/items/getItems",
  UPDATE_ITEM: "/api/items/updateItem",

  UPLOAD_IMAGE: "https://api.imgur.com/3/image",
};
