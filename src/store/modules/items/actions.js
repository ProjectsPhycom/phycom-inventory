import { getItemsService } from "../../../services/item.service";

export async function getItemsAction({ commit }, payload) {
  const data = await getItemsService(payload);
  commit("setItems", { items: data.data, count: data.total });
}
