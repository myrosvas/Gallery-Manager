import { uniq } from "underscore";
import { viewTypeEnum, filtersEnum } from "../config/gallery.config";

export const state = () => ({
  items: [],
  prevItems: [],
  limit: 0,
  step: 0,
  viewType: viewTypeEnum.grid,
  filterType: 'date'
})

export const actions = {
  async loadItems({ commit, state }, { drive, isSavedDrive }) {
    if (isSavedDrive) {
      commit('save');
    }

    let items = [];

    const t0 = performance.now();
    try {
      items = await this.$axios.$get(`/api/load?drive=${drive}`);
    } catch (e) {
      return e && e.response && e.response.data
        ? this.$toast.error(e.response.data)
        : this.$toast.error('Server Error');
    }
    const t1 = performance.now();
    console.log(`load items took: ${t1 - t0} milliseconds`);

    if (!items.length) {
      return this.$toast.info("no items to add");
    };
    if (state.items.length) {
      commit('changeInterval');
    }
    commit('add', items);
  },
  async removeFromSaved({ state, commit }, { url, name }) {
    try {
      await this.$axios.$post("/api/remove", { url });
    } catch (e) {
      return this.$toast.error("Server Error");
    }

    commit('remove', url);
    commit('selected/remove', name);
    this.$toast.success("Removed from the list");
  }
}

export const mutations = {
  add(state, items) {
    state.items = state.items.concat(items);
    setTimeout(() => this.$toast.success('Added to the gallery'), 200);
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
  remove(state, url) {
    state.items = state.items.filter(item => item.url !== url);
  },
  changeInterval(state, payload) {
    if (payload) {
      const { limit, step } = payload;

      state.step = step;
      state.limit = limit;
    } else {
      state.limit = state.limit + state.step;
    }
  },
  changeViewType(state, payload) {
    if (payload) {
      state.viewType = payload;
    }
  },
  changeFilterType(state, payload) {
    if (payload) {
      state.filterType = payload;
    }
  }
}

export const getters = {
  uniqueItems(state) {
    return uniq(state.items, item => item.url);
  },
  filteredItems(state, getters) {
    const { uniqueItems } = getters;

    switch (state.filterType) {
      case filtersEnum.size:
        return uniqueItems.sort((prevEl, nextEl) => {
          return prevEl.size - nextEl.size;
        });
      case filtersEnum.name:
        return uniqueItems.sort((prevEl, nextEl) => {
          const prevName = prevEl.name.toUpperCase();
          const nextName = nextEl.name.toUpperCase();
          const isPrevLetterBigger = (prevName > nextName) ? 1 : 0;
      
          return (prevName < nextName) ? -1 : isPrevLetterBigger;
        });
      case filtersEnum.date:
        return uniqueItems.sort((prevEl, nextEl) => {
          return new Date(prevEl.mtime) - new Date(nextEl.mtime);
        })
      default:
        return uniqueItems;
    }
  },
  count: (state, getters) => getters.filteredItems.length,
  limited(state, getters) {
    return getters.filteredItems.slice(0, state.limit);
  },
  viewType: (state) => state.viewType,
  filterType: (state) => state.filterType
  // limited: (state, getters) => getters.filteredItems,
}
