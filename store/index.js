import { uniq } from "underscore";

export const state = () => ({
  items: [],
  list: [],
  prevItems: [],
  limit: 0,
  step: 0,
})

export const actions = {
  async loadItems({ commit, state }, { drive, isSavedDrive }) {
    if (isSavedDrive) {
      commit('save');
    }
    const items = await this.$axios.$get(`/api/load?drive=${drive}`);

    if (state.items.length) {
      commit('changeInterval');
    }
    commit('add', items);
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
  }
}

export const mutations = {
  add(state, items) {
    state.items = state.items.concat(items);
    setTimeout(() => this.$toast.success('LOADED'), 400);
  },
  save(state) {
    state.prevItems = state.items;
    state.items = [];
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
  changeInterval(state, payload) {
    if (payload) {
      const { limit, step } = payload;

      state.limit = limit;
      state.step = step;
    } else {
      state.limit = state.limit + state.step;
    }
  }
}

export const getters = {
  filteredItems(state) {
    return uniq(state.items, item => item.path);
  },
  count: (state, getters) => getters.filteredItems.length,
  limited(state) {
    const next = state.items.slice(0, state.limit);

    return state.list.concat(next);
  }
  // limited: (state, getters) => getters.filteredItems,
}
