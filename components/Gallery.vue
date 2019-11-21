<template>
  <div class="gallery">
    <div class="gallery-nav">
      <div class="hint align-left" v-if="!items.length && !isLoading">Gallery is empty</div>
      <div class="hint align-left" v-if="isLoading">Loading...</div>
      <div class="hint align-left" v-if="items.length && !isLoading">
        Count:
        <b>{{count}}</b>
      </div>
      <div class="align-right">
        <select v-if="items.length" v-model="size">
          <option v-for="item of sizes" :key="item">{{item}}</option>
        </select>
      </div>
    </div>

    <!-- <div class="gallery-grid" :class="size"> -->
    <div
      class="gallery-grid"
      v-infinite-scroll="append"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="400"
      :class="size"
    >
      <masonry ref="masonry" :cols="columns" :gutter="{default: '5px'}">
        <div class="item" v-for="(item, index) of items" :key="index" :style="getStyle(item)">
          <v-lazy-image :src="item.url" />
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
      </masonry>
    </div>
    <QuickView v-if="isOpen" :selected="selected" :isSavedDrive="isSavedDrive" @close="close" />
  </div>
</template>

<script>
import QuickView from "~/components/QuickView.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    QuickView
  },
  data: () => {
    return {
      isOpen: false,
      selected: null,
      sizes: ["small", "medium", "large"],
      size: "medium",
      grid: {
        compact: {
          small: {
            cols: { default: 8, 1000: 7, 700: 6 },
            limit: 50,
            step: 20
          },
          medium: {
            cols: { default: 6, 1000: 5, 700: 4 },
            limit: 40,
            step: 20
          },
          large: {
            cols: { default: 4, 1000: 3, 700: 2 },
            limit: 30,
            step: 15
          }
        },
        extend: {
          small: {
            cols: { default: 10, 1000: 8, 700: 7 },
            limit: 60,
            step: 20
          },
          medium: {
            cols: { default: 8, 1000: 7, 700: 5 },
            limit: 50,
            step: 20
          },
          large: {
            cols: { default: 6, 1000: 4, 700: 3 },
            limit: 40,
            step: 15
          }
        }
      }
    };
  },
  props: ["items", "isSavedDrive", "isLoading"],
  computed: {
    ...mapGetters({
      count: "count"
    }),
    columns() {
      return this.isSavedDrive
        ? this.grid.extend[this.size].cols
        : this.grid.compact[this.size].cols;
    }
  },
  mounted() {
    this.reset();
  },
  watch: {
    isSavedDrive: function() {
      this.reset();
    }
  },
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
    append() {
      this.busy = true;
      this.changeInterval();
      setTimeout(() => {
        this.busy = false;
      }, 150);
    },
    reset() {
      const limit = this.isSavedDrive
        ? this.grid.extend[this.size].limit
        : this.grid.compact[this.size].limit;
      const step = this.isSavedDrive
        ? this.grid.extend[this.size].step
        : this.grid.compact[this.size].step;
      this.changeInterval({ limit, step });
    },
    getStyle({ height, width, url }) {
      return {
        "padding-bottom": `${(height / width) * 100}%`
        // "background-image": `url(${url})`
      };
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/css/vars";

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
  padding-right: 12px;
}

// .masonry-container {
// margin: 0 auto;
// }

.item {
  // float: left;
  // margin: 0 5px 5px 0;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: 100%;
  background-color: #f1f1f1;

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    min-height: 1px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s;

    &.v-lazy-image-loaded {
      visibility: visible;
      opacity: 1;

      & + .over {
        display: flex;
      }
    }
  }

  &:hover .over {
    visibility: visible;
    opacity: 1;
  }
}

.over {
  display: none;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.02s 0.09s;
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
    // max-width: 100px;
  }

  .medium & {
    // max-width: 150px;
  }

  .large & {
    // max-width: 200px;
  }
}
</style>
