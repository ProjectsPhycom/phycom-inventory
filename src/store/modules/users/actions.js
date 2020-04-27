import { getUsersService } from "../../../services/users.service";

export async function getUsersAction({ commit }, payload) {
  const data = await getUsersService(payload);
  commit("setUsers", { users: data.data, count: data.total });
}
