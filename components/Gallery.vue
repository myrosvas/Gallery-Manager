<template>
  <div class="gallery">
    <div class="hint" v-if="!images.length">Gallery is empty</div>
    <div
      class="item"
      v-for="item of images"
      :key="item.lastModifed"
      @click="pick(item)">
      <img v-bind:src="item.url" alt />
    </div>

    <QuickView v-if="picked" v-bind:picked="picked" @close="close" @select="select" />
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

.item img{
  transition: .1s;
  max-height: 280px;
}

.item:hover img{
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
      picked: null
    };
  },
  props: ["images"],
  methods: {
    pick: function(image) {
      this.picked = image;
    },
    close: function() {
      this.picked = null;
    },
    select: function(image) {
      this.$emit('select', image);
      this.picked = null;
    }
  }
};
</script>
