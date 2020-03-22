export function setUser(state, payload) {
  state.name = payload.name;
  state.lastName = payload.lastName;
  state.email = payload.email;
}

// eslint-disable-next-line no-unused-vars
export function clearUser(state) {
  state = {
    name: "",
    lastName: "",
    email: "",
    role: "",
  };
}
