import StorageService from "../services/storage.service.js";
import store from "../store";

const generalGuard = async (to, from, next) => {
  try {
    const accessToken = StorageService.getToken();
    const isLoggedIn = store.getters.isLoggedIn;

    if (to.matched.some(record => record.meta.requiresLogin)) {
      if (!accessToken) {
        next({ name: "login" });
      } else if (!isLoggedIn) {
        await store.dispatch("user/getUserDataAction");
        next();
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.public)) {
      if (!accessToken) {
        next();
      } else {
        if (!isLoggedIn) {
          await store.dispatch("user/getUserDataAction");
          next({ name: "materials" });
        }
      }
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    StorageService.removeToken();
    next({ name: "login" });
  }
};

export default {
  generalGuard,
};
