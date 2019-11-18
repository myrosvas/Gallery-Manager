<template>
  <div class="gallery">
    <div class="gallery-nav">
      <div class="hint align-left" v-if="!items.length">Gallery is empty</div>
      <div class="hint align-left" v-if="items.length">
        Count:
        <b>{{items.length}}</b>
      </div>
      <div class="align-right">
        <select v-if="items.length" v-model="size">
          <option v-for="item of sizes" :key="item">{{item}}</option>
        </select>
      </div>
    </div>

    <div class="gallery-grid" :class="size">
      <div class="item" v-for="item of items" :key="item.path">
        <img v-bind:src="item.url" alt />
        <div class="over">
          <span class="icon see" title="open" @click="pick(item)"></span>
          <span v-if="!isSavedDrive" class="icon plus" title="select" @click="selectItem(item)"></span>
          <span
            v-if="isSavedDrive"
            class="icon cross"
            title="remove"
            @click="removeFromSaved(item)"
          ></span>
        </div>
      </div>
    </div>
    <QuickView v-if="isOpen" :selected="selected" :isSavedDrive="isSavedDrive" @close="close" />
  </div>
</template>

<script>
import QuickView from "~/components/QuickView.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  components: {
    QuickView
  },
  data: () => {
    return {
      isOpen: false,
      selected: null,
      sizes: ["small", "medium", "large"],
      size: "medium"
    };
  },
  props: ["items", "isSavedDrive"],
  methods: {
    ...mapActions(["removeFromSaved"]),
    ...mapMutations({
      selectItem: "selected/select"
    }),
    pick(item) {
      this.selected = item;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    }
  }
};
</script>

<style>
.gallery {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 7px 12px;
}

.gallery-nav {
  flex: 0 0 46px;
  display: flex;
  padding-right: 12px;
  align-items: center;
}

.gallery-grid {
  overflow-y: auto;
  flex: 1;
}

.item {
  float: left;
  margin: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.over {
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition: opacity .02s .09s;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
}

.item:hover .over {
  visibility: visible;
  opacity: 1;
}

.icon {
  display: block;
  width: 36px;
  height: 36px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 70%;
  background-color: rgba(0, 0, 0, 0.9);
  margin: 5px;
  cursor: pointer;
}

.see {
  background-image: url("~assets/look.svg");
}

.plus {
  background-image: url("~assets/plus.svg");
  background-size: 50%;
}

.cross {
  background-image: url("~assets/cross.svg");
  background-size: 50%;
}

.small .item {
  max-width: 100px;
}

.small .item img {
  max-width: 100px;
}

.medium .item {
  max-width: 150px;
}

.medium .item img {
  max-width: 150px;
}

.large .item {
  max-width: 200px;
}

.large .item img {
  max-width: 200px;
}

.item:hover {
}

select {
  font-size: 14px;
  font-weight: normal;
  font-family: Arial, sans-serif;
  color: #333;
  outline: none;
}
</style>
