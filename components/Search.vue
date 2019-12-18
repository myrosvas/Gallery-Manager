<template>
  <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search image..."/>
    <button @click="nullifySearchResults()">&#10005;</button>
  </div>
</template>

<script>
import { debounce } from "underscore";
import { mapMutations } from "vuex";

export default {
  watch: {
    search: debounce(
      function (value) {
      this.saveSearchInput(value);
    }, 500)
  },
  computed: {
    search: {
      get () {
        return this.$store.state.searchInput
      },
      set (value) {
        this.saveSearchInput(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      saveSearchInput: "saveSearchInput",
      nullifySearchResults: "nullifySearchResults"
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
    padding: 4px 25px 4px 12px;
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