<template>
  <div class="list">
    <div class="hint" v-if="!selected.length">No selected items</div>
    <div class="selected-grid" v-if="selected.length">
      <masonry :cols="2" :gutter="{default: '5px'}">
        <div class="selected" v-for="(item, index) of selected" :key="index">
          <div class="remove" @click="remove(item)" title="remove">&times</div>
          <img :src="item.thumbUrl" alt />
        </div>
      </masonry>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/assets/css/vars";

.list {
  margin-left: 20px;
  flex: 0 0 290px;
  padding: 14px 0 9px 12px;
  border-radius: 5px;
  box-shadow: 0 13px 20px -6px $box-shadow-color;
}

.selected {
  // margin: 0 5px 5px 0;
  margin-bottom: 5px;
  // width: 150px;
  position: relative;
  float: left;
}

.selected-grid {
  overflow-y: auto;
  padding-right: 12px;
  height: 100%;
}

.remove {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  line-height: 16px;
  top: 4px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $white;
  background-color: $black;
  cursor: pointer;
  font-size: 20px;
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
    remove({ url }) {
      this.removeItem(url);
    }
  }
};
</script>
