export function setItems(state, payload) {
  state.items = payload.items;
  state.count = payload.count;
}

export function setSelectedItem(state, payload) {
  state.selectedItem = payload;
}

export function clearSelectedItem(state) {
  state.selectedItem = {
    name: "",
    model: "",
    description: "",
    onLoan: "",
    total: "",
    image: "",
    id: null,
  };
}
