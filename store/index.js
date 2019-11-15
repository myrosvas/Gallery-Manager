import { uniq } from "underscore";

export const state = () => ({
  items: [],
  prevItems: []
})

export const actions = {
  async loadItems({ commit }, { drive, isSavedDrive }) {
    const items = await this.$axios.$get(`/api/load?drive=${drive}`);

    return isSavedDrive
      ? commit('addSaved', items)
      : commit('add', items);
  },
  async removeFromSaved({ state, commit }, { path }) {
    try {
      await this.$axios.$post("/api/remove", { path });
      commit('remove', path);
      this.$toast.success("REMOVED");
    } catch (e) {
      this.$toast.error("Server Error");
    }
  }
}

export const mutations = {
  add(state, items) {
    state.items = state.items.concat(items);
    this.$toast.success('ADDED');
  },
  addSaved(state, items) {
    state.prevItems = state.items;
    state.items = items;
  },
  drop(state) {
    state.items = [];
  },
  revert(state) {
    state.items = state.prevItems;
  },
  remove(state, path) {
    state.items = state.items.filter(item => item.path !== path);
  }
}

export const getters = {
  filteredItems: state => uniq(state.items, item => item.path)
}
