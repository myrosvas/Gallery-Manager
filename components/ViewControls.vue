<template>
  <div class="view-controls flex-center">
    <div
      class="icon-grid"
      @click="activateGridView"
      :class="{active: isGridView}"
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
      @click="activateListView"
      :class="{active: isListView}"
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

<script>
  export default {
    props: [
      "activateGridView",
      "activateListView",
      "isGridView",
      "isListView",
      "active"
    ]
  }
</script>