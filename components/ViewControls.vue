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
    margin-left: 20px;

    div {
      height: 24px;
      border: 1px solid #dadada;
      background-color: #fff;
      cursor: pointer;
      position: relative;

      &:hover {
        span {
          background-color: #999;
        }
      }

      &.active {
        cursor: default;
        background-color: #fff;
        span {
          background-color: #000;
        }
      }

      span {
        display: block;
        position: absolute;
        width: 5px;
        height: 4px;
        background-color: #b7b7b7;
        transition: background-color ease 0.1s;
      }
    }
  }
</style>

<script>
  export default {
    props: [
      "changeView",
      "viewType"
    ]
  }
</script>