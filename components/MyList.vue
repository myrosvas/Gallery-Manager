<template>
  <div class="list">
    <div class="hint" v-if="!selected.length">No selected items</div>
    <div
      class="selected"
      v-for="item of selected"
      :key="item.lastModifed">
      <img v-bind:src="item.url" alt />
    </div>
  </div>
</template>

<style>
.list {
  margin-left: 20px;
  flex: 0 0 340px;
  overflow-y: auto;
}

.selected {
  float: left;
  margin: 4px;
  width: 150px;
}
</style>

<script>
export default {
  props: ["selected"]
};
</script>
