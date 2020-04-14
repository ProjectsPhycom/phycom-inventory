import {
  loginService,
  logoutService,
  getUserDataService,
} from "../../../services/authentication.service";

export async function loginAction({ commit }, payload) {
  try {
    const data = await loginService(payload);
    commit("setUser", data);
    commit("setIsLoggedIn", true, { root: true });
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
  commit("setIsLoggedIn", false, { root: true });
}

export async function getUserDataAction({ commit }) {
  try {
    const data = await getUserDataService();
    commit("setUser", data);
    commit("setIsLoggedIn", true, { root: true });
    return data;
  } catch (error) {
    const errorPayload = {
      active: true,
      title: "Error",
      text: error.message,
    };
    commit("setError", errorPayload, { root: true });
    commit("setIsLoggedIn", false, { root: true });
    throw error;
  }
}
