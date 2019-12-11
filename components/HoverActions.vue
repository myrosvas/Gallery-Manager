<template>
  <div class="hover-actions" :style="style" :class="{ active: isVisible }">
    <span class="icon see" title="open" @click="$emit('pick')"></span>
    <span v-if="!isSavedDrive" class="icon plus" title="select" @click="$emit('select')"></span>
    <span v-if="isSavedDrive" class="icon cross" title="remove" @click="$emit('remove')"></span>
  </div>
</template>

<style lang="scss">
@import "~/assets/css/vars";

.hover-actions {
  display: flex;
  z-index: 3;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $grey-rgba-5;
  opacity: 0;
  visibility: hidden;

  &.active {
    visibility: visible;
    opacity: 1;
    // transition: opacity 0.02s 0.09s;
    // transition: opacity .05s .1s;
  }
}
</style>

<script>
export default {
  props: {
    isSavedDrive: Boolean,
    data: Object
  },
  computed: {
    style() {
      if (!this.isVisible) return {};

      const { width, height, offsetTop, offsetLeft } = this.data;

      return {
        width: width + "px",
        height: height + "px",
        top: offsetTop + "px",
        left: offsetLeft + "px"
      };
    },
    isVisible() {
      return !!this.data;
    }
  }
};
</script>
