/**
 * @param {*} state
 * @param {object} payload
 * @param {object[]} payload.users Users list
 * @param {number} payload.count Total amount of users in the database
 */
export function setUsers(state, payload) {
  state.users = payload.users;
  state.count = payload.count;
}
