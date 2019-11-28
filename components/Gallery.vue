<template>
  <div class="gallery">
    <div class="gallery-nav">
      <div class="hint align-left" v-if="!items.length && !isLoading">Gallery is empty</div>
      <div class="hint align-left" v-if="items.length && !isLoading">
        Count:
        <b>{{count}}</b>
      </div>
      <div class="loading align-right flex-center" v-if="isLoading">
        <i class="loading"></i>
        <span>Loading...</span>
      </div>
      <!-- <div class="align-right">
        <select v-if="items.length" v-model="size">
          <option v-for="item of sizes" :key="item">{{item}}</option>
        </select>
      </div>-->
    </div>

    <div v-if="0" class="gallery-list" ref="list">
      <virtual-list :size="list.height" :remain="list.remain" :bench="list.bench">
        <ListItem
          v-for="item in items"
          :key="item.thumbUrl"
          :item="item"
          :style="{ height: item.height + 'px' }"
        />
      </virtual-list>
    </div>

    <div
      v-if="1"
      class="gallery-grid"
      v-infinite-scroll="append"
      infinite-scroll-disabled="busy"
      infinite-scroll-immediate-check="true"
      infinite-scroll-distance="400"
      :class="size"
      @mouseleave="hideActions"
    >
      <div @mouseover="showActions">
        <masonry ref="masonry" :cols="columns" :gutter="{default: '5px'}">
          <GridItem
            v-for="(item, index) in items"
            :key="index"
            :item="item"
            :isNativeLoading="isNativeLoading"
            :style="{ 'padding-bottom': (item.height / item.width * 100) + '%' }"
          />
        </masonry>
      </div>

      <HoverActions
        :isSavedDrive="isSavedDrive"
        :data="picked"
        @pick="pick()"
        @select="select()"
        @remove="remove()"
      />
    </div>
    <QuickView v-if="isOpen" :selected="selected" :isSavedDrive="isSavedDrive" @close="close" />
  </div>
</template>

<script>
import QuickView from "~/components/QuickView.vue";
import ListItem from "~/components/ListItem.vue";
import GridItem from "~/components/GridItem.vue";
import HoverActions from "~/components/HoverActions.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
// import { debounce } from "underscore";

export default {
  components: {
    QuickView,
    ListItem,
    GridItem,
    HoverActions
  },
  data: () => {
    return {
      isOpen: false,
      isNativeLoading:
        typeof window !== "undefined"
          ? "loading" in window.HTMLImageElement.prototype
          : false,
      selected: null,
      sizes: ["small", "medium", "large"],
      size: "small",
      list: {
        remain: 8,
        height: 0,
        initialHeight: 110,
        bench: 30
      },
      // debounceActions: () => {},
      picked: null,
      grid: {
        compact: {
          small: {
            cols: { default: 8, 1000: 7, 700: 6 },
            limit: 80,
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
            limit: 70,
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
  beforeMount() {
    // this.debounceActions = debounce(this.showActions.bind(this), 10);
  },
  mounted() {
    this.reset();
    this.calcListItemsToShow();
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
      if (item) {
        this.selected = item;
      } else {
        this.selected = this.items.find(
          ({ thumbUrl }) => thumbUrl === this.picked.url
        );
      }
      this.isOpen = true;
    },
    select() {
      const item = this.items.find(
        ({ thumbUrl }) => thumbUrl === this.picked.url
      );
      this.selectItem(item);
    },
    remove() {
      const item = this.items.find(
        ({ thumbUrl }) => thumbUrl === this.picked.url
      );
      this.removeFromSaved(item);
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
    calcListItemsToShow() {
      if (this.$refs.list) {
        const height = this.$refs.list.offsetHeight;

        this.list.remain = Math.floor(height / this.list.initialHeight);
        this.list.height =
          this.list.initialHeight +
          Math.floor(
            (height - this.list.remain * this.list.initialHeight) /
              this.list.remain
          );
      }
    },
    showActions(e) {
      const $target = e.target;

      if (
        $target.tagName === "SPAN" ||
        $target.classList.contains("hover-actions")
      ) {
        return false;
      }

      if ($target.tagName === "IMG") {
        const url = $target.getAttribute("src");
        const { width, height } = $target;
        const { offsetTop, offsetLeft } = $target.parentNode;
        this.picked = {
          url,
          width,
          height,
          offsetTop,
          offsetLeft
        };
      } else {
        this.picked = null;
      }
    },
    hideActions() {
      this.picked = null;
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

  &-list {
    flex: 1;
    overflow: hidden;

    & > div {
      padding-right: 12px;
    }
  }
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
  position: relative;

  & > div {
    height: 100%;
  }
}
</style>
