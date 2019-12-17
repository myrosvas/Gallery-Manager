<template>
  <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search image..."/>
  </div>
</template>

<script>
import { debounce } from "underscore";
import { mapMutations } from "vuex";

export default {
  data: () => {
    return {
      search: ''
    }
  },
  watch: {
    search: debounce(
      function (value) {
      this.findItems(value);
    }, 500)
  },
  methods: {
    ...mapMutations({
      findItems: "findItems"
    })
  }
}
</script>

<style lang="scss">
@import "~/assets/css/vars";
@import "~/assets/css/mixins";

.search-wrapper {
  position: relative;

  label {
    @include blackOpacity(color, 0.5);
    position: absolute;
    font-size: 12px;
    top: 8px;
    left: 12px;
    z-index: -1;
    transition: .15s all ease-in-out;
  }

  input {
    @include blackOpacity(color, 0.7);
    padding: 4px 12px;
    border: 1px solid rgba(0,0,0,.12);
    transition: .15s all ease-in-out;
    background: $white;
  }

  &::-webkit-input-placeholder {
    @include blackOpacity(color, 0.5);
    font-size: 12px;
    font-weight: 100;
  }
}
</style>