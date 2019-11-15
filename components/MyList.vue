<template>
  <div class="list">
    <div class="hint" v-if="!selected.length">No selected items</div>
    <div class="selected" v-for="item of selected" :key="item.path">
      <div class="remove" @click="remove(item)" title="remove">&times</div>
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
  position: relative;
}

.remove {
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 16px;
  top: 5px;
  right: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e1192b;
  cursor: pointer;
  font-size: 24px;
}
</style>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: mapGetters({
    selected: "selected/filtered"
  }),
  methods: {
    ...mapMutations({
      removeItem: "selected/remove"
    }),
    remove({ path }) {
      this.removeItem(path);
    }
  }
};
</script>
