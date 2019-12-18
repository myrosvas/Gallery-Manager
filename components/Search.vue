<template>
  <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search image..."/>
    <button v-if="search.length" @click="clearSearch()">&#10005;</button>
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
      get () {
        return this.$store.state.search
      },
      set (value) {
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
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/vars";
@import "~/assets/css/mixins";

.search-wrapper {
  position: relative;
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 150px;

  input {
    @include blackOpacity(color, 0.7);
    width: 150px;
    padding: 4px 25px 4px 6px;
    border: 1px solid rgba(0,0,0,.12);
    background: $white;
    font-size: 12px;
    transition: .15s all ease-in-out;
  }

  &::-webkit-input-placeholder {
    @include blackOpacity(color, 0.5);
    font-size: 12px;
    font-weight: 100;
  }

  button {
    position: absolute;
    top: -2px;
    right: 5px;
    display: flex;
    align-content: center;
    width: 25px;
    height: 25px;
    font-size: 15px;
    font-weight: bold;
    background: transparent;
    border: none;
  }
}
</style>