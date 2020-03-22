import {
  loginService,
  logoutService,
} from "../../../services/authentication.service";

export async function loginAction({ commit }, payload) {
  try {
    const data = await loginService(payload);
    commit("setUser", data);
    return data;
  } catch (error) {
    const errorPayload = {
      active: true,
      title: "Error",
      text: error.message,
    };
    commit("setError", errorPayload, { root: true });
    throw error;
  }
}

/**
 * Logout from the application
 * @description
 * Request logout to server and clear user data from store.
 */
export async function logoutAction({ commit }) {
  await logoutService();
  commit("clearUser");
}
