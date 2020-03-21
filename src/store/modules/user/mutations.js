export function setUser(state, payload) {
  state.name = payload.name;
  state.lastName = payload.lastName;
  state.email = payload.email;
}