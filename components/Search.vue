<template>
  <div class="search flex-center">
    <div class="search-wrapper flex-center">
      <input type="text" v-model="search" placeholder="Search image..." />
      <button v-if="search.length" @click="clearSearch()" title="clear">&#10005;</button>
    </div>
  </div>
</template>

<script>
import { debounce } from "underscore";
import { mapMutations } from "vuex";
import { config } from "../config/gallery.config";

export default {
  created() {
    this.updateInput = debounce(this.updateSearch, config.searchDebounce);
  },
  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },
      set(value) {
        this.updateInput(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      updateSearch: "updateSearch",
      clearSearch: "clearSearch"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/css/vars";
@import "~/assets/css/mixins";

.search {
  flex: 1;
  margin-left: 10px;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 0 20px;

  input {
    padding: 4px 24px 4px 6px;
  }

  &::-webkit-input-placeholder {
    @include blackOpacity(color, 0.5);
    font-size: 12px;
    font-weight: 100;
  }

  button {
    position: absolute;
    top: 3px;
    right: 2px;
    display: flex;
    align-content: center;
    justify-content: center;
    width: 20px;
    height: 19px;
    font-size: 14px;
    font-weight: bold;
    background: transparent;
    line-height: 18px;
    border-color: transparent;

    &:focus {
      background-color: #000;
      color: #fff;
    }
  }
}
</style>
