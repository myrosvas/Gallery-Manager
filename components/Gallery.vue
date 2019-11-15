<template>
  <div class="gallery">
    <div class="hint" v-if="!items.length">Gallery is empty</div>
    <div class="item" v-for="item of items" :key="item.path" @click="pick(item)">
      <img v-bind:src="item.url" alt />
    </div>
    <QuickView
      v-if="isOpen"
      :selected="selected"
      :isSavedDrive="isSavedDrive"
      @close="close"
    />
  </div>
</template>

<style>
.gallery {
  flex: 1;
  overflow-y: auto;
}

.item {
  float: left;
  height: 280px;
  margin: 5px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item img {
  transition: 0.1s;
  max-height: 280px;
}

.item:hover img {
  transform: scale(1.1);
}
</style>

<script>
import QuickView from "~/components/QuickView.vue";

export default {
  components: {
    QuickView
  },
  data: () => {
    return {
      isOpen: false,
      selected: null
    };
  },
  props: ["items", "isSavedDrive"],
  methods: {
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
