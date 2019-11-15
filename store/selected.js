import { uniq } from "underscore";
import { saveAs } from "file-saver";

export const state = () => ({
  selected: []
});

export const actions = {
  async saveToServer({ getters }) {
    const selected = getters.filtered.map(({ url }) => url);

    try {
      await this.$axios.$post("/api/save", { selected });
      this.$toast.success("SAVED");
    } catch (e) {
      this.$toast.error("Server Error");
    }
  },
  saveToDrive({ getters }) {
    getters.filtered.forEach(({ url, name }) => saveAs(url, name));
  }
}

export const mutations = {
  select(state, item) {
    state.selected = state.selected.concat(item);
  },
  remove(state, path) {
    state.selected = state.selected.filter(item => item.path !== path);
  }
}

export const getters = {
  filtered: state => uniq(state.selected, item => item.path)
}
