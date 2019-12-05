<template>
  <div class="l-item" :style="style">
    <div class="l-img">
      <img v-if="isNativeLoading" :src="item.thumbUrl" loading="lazy" />
      <v-lazy-image v-if="!isNativeLoading" :src="item.thumbUrl" />
    </div>
    <div class="l-info">
      <div class="l-name">
        <b>name:</b>
        {{item.name}}
      </div>
      <div class="l-size">
        <b>size:</b>
        {{item.size | kb}} KB
      </div>
      <div class="l-mtime">
        <b>last modified:</b>
        {{item.mtime | date}}
      </div>
    </div>

    <div class="l-controls">
      <span class="icon see" title="open" @click="$emit('pick', item)"></span>
      <span v-if="!isSavedDrive" class="icon plus" title="select" @click="$emit('select', item)"></span>
      <span v-if="isSavedDrive" class="icon cross" title="remove" @click="$emit('remove', item)"></span>
    </div>
  </div>
</template>

<style lang="scss">
.l-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 2px 0;

  img {
    position: absolute;
    width: 110px;
    // top: 50%;
    // transform: translateY(-50%);
    align-self: flex-start;
  }
}

.l-img {
  position: relative;
  width: 110px;
  height: 100%;
}

.l-info {
  flex: 1;
  margin-left: 20px;

  div {
    margin: 5px 0;
  }
}

.l-controls {
  display: flex;
  flex: 0;
}

.l-item + .l-item {
  border-top: 1px dashed #f0f0f0;
}
</style>

<script>
export default {
  props: {
    isSavedDrive: Boolean,
    isNativeLoading: Boolean,
    minHeight: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => ({
        url: "",
        width: 0,
        height: 0,
        name: "",
        thumbUrl: "",
        size: 0,
        mtime: ""
      })
    }
  },
  computed: {
    style() {
      const h = Math.ceil(110 * this.item.height / this.item.width) + 6;

      return h < this.minHeight
        ? { height: this.minHeight + "px" }
        : { height: h + "px" };
    }
  },
  filters: {
    date(time) {
      return new Date(time).toLocaleString();
    },
    kb(size) {
      return Math.ceil(size / 1024);
    }
  }
};
</script>
