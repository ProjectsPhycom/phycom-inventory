import { loginService } from "../../../services/authentication.service";

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
