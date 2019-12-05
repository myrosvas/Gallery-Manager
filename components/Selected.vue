<template>
  <div class="list">
    <div class="hint" v-if="!selected.length">No selected items</div>
    <div class="selected-grid" v-if="selected.length">
      <div class="selected" v-for="item of selected" :key="item.path">
        <div class="remove" @click="remove(item)" title="remove">&times</div>
        <img v-bind:src="item.url" alt />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list {
  margin-left: 20px;
  flex: 0 0 330px;
  padding: 14px 0 9px 12px;
}

.selected {
  margin: 0 5px 5px 0;
  width: 150px;
  position: relative;
  float: left;
}

.selected-grid {
  overflow-y: auto;
  padding-right: 8px;
  height: 100%;
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
