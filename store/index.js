import { uniq } from "underscore";

export const state = () => ({
  items: [],
  list: [],
  prevItems: [],
  end: 40,
})

export const actions = {
  async loadItems({ commit, state }, { drive, isSavedDrive }) {
    const items = await this.$axios.$get(`/api/load?drive=${drive}`);

    if (state.items.length) {
      commit('changeInterval');
    }

    return isSavedDrive
      ? commit('addSaved', items)
      : commit('add', items);
  },
  async removeFromSaved({ state, commit }, { path, name }) {
    try {
      await this.$axios.$post("/api/remove", { path });
    } catch (e) {
      return this.$toast.error("Server Error");
    }

    commit('remove', path);
    commit('selected/remove', name);
    this.$toast.success("REMOVED");
  },
  append() {

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
  },
  changeInterval(state) {
    state.end = state.end + 10;
  }
}

export const getters = {
  filteredItems(state) {
    return uniq(state.items, item => item.path);
  },
  limited(state) {
    const next = state.items.slice(0, state.end);

    return state.list.concat(next);
  }
}
