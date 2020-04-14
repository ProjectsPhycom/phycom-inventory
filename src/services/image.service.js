import { routes } from "./routes";

import ApiService from "./api.service";

const clientId = process.env.VUE_APP_IMGUR_CLIENT_ID;

export async function uploadImage(image) {
  try {
    const url = routes.UPLOAD_IMAGE;

    const formData = new FormData();
    formData.set("image", image);

    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Client-ID ${clientId}`,
      },
    };

    const response = await ApiService.postApi(url, formData, options);
    return response.data.data;
  } catch (error) {
    console.error(error);
    if (error.body && error.body.data && error.body.data.error) {
      return Promise.reject(error.body.data.error);
    } else {
      return Promise.reject(error);
    }
  }
}
