<template>
  <div class="gallery">
    <div class="gallery-nav">
      <div class="hint align-left" v-if="!items.length">Gallery is empty</div>
      <div class="hint align-left" v-if="items.length">
        Count:
        <b>{{items.length}}</b>
      </div>
      <div class="align-right">
        <select v-if="items.length" v-model="size" @change="changeSize">
          <option v-for="item of sizes" :key="item">{{item}}</option>
        </select>
      </div>
    </div>

    <div class="gallery-grid" :class="size">
      <!-- <div
      class="gallery-grid"
      v-infinite-scroll="append"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="100"
      :class="size"
      >-->
      <div
        v-masonry
        transition-duration="0.3s"
        item-selector=".elem"
        column-width=".elem"
        gutter="5"
        fit-width="true"
        class="masonry-container"
      >
        <img
          class="elem item"
          v-for="(item, index) of items"
          :key="index"
          v-masonry-tile
          v-bind:src="item.url"
          alt
        />
        <!-- <div class="elem item" v-for="item of items" :key="item.path" v-masonry-tile>
          <img v-masonry-tile v-bind:src="item.url" alt />
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
        </div>-->
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
      size: "large"
    };
  },
  props: ["items", "isSavedDrive"],
  methods: {
    ...mapActions(["removeFromSaved"]),
    ...mapMutations({
      selectItem: "selected/select",
      changeInterval: "changeInterval"
    }),
    pick(item) {
      this.selected = item;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    changeSize() {
      console.log(this.$redrawVueMasonry);
      this.$redrawVueMasonry();
    },
    append() {
      this.busy = true;
      this.changeInterval();
      setTimeout(() => {
        this.busy = false;
      }, 300);
    }
  }
};
</script>

<style lang="scss">
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

.masonry-container {
  // margin: 0 auto;
}

.item {
  float: left;
  margin: 0 5px 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover .over {
    visibility: visible;
    opacity: 1;
  }
}

.over {
  display: flex;
  visibility: hidden;
  opacity: 0;
  // transition: opacity 0.02s 0.09s;
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

.see {
  background-image: url("~assets/icons/look.svg");
  background-size: 65%;
}

.plus {
  background-image: url("~assets/icons/plus.svg");
}

.cross {
  background-image: url("~assets/icons/cross.svg");
}

.item {
  .small & {
    max-width: 100px;
  }

  .medium & {
    max-width: 150px;
  }

  .large & {
    max-width: 200px;
  }
}
</style>
