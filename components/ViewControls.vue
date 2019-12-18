<template>
  <div class="view-controls flex-center">
    <div
      class="icon-grid"
      @click="changeView('grid')"
      :class="{active: (viewType === 'grid')}"
      title="grid view"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div
      class="icon-list"
      @click="changeView('list')"
      :class="{active: (viewType === 'list')}"
      title="list view"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/assets/css/vars";

.view-controls {
  margin-left: 10px;

  div {
    height: 24px;
    border: 1px solid $grey-border-medium;
    background-color: $white;
    cursor: pointer;
    position: relative;

    &:hover {
      span {
        background-color: $dark-grey;
      }
    }

    &.active {
      cursor: default;
      background-color: $white;
      span {
        background-color: $black;
      }
    }

    span {
      display: block;
      position: absolute;
      width: 5px;
      height: 4px;
      background-color: $dark-grey2;
      transition: background-color ease 0.1s;
    }
  }
}
</style>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    viewType: String
  },
  methods: {
    ...mapMutations({
      changeViewType: "changeViewType"
    }),
    changeView(type) {
      if (this.viewType === type) return;
      this.$cookies.set("viewType", type);
      this.changeViewType(type);
    }
  }
};
</script>
