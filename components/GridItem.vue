<template>
  <div class="grid-item">
    <img v-if="isNativeLoading" :src="item.thumbUrl" loading="lazy" />
    <v-lazy-image v-if="!isNativeLoading" :src="item.thumbUrl" />
    <!-- <div class="over">
      <span class="icon see" title="open" @click="pick(item)"></span>
      <span v-if="!isSavedDrive" class="icon plus" title="select" @click="selectItem(item)"></span>
      <span v-if="isSavedDrive" class="icon cross" title="remove" @click="removeFromSaved(item)"></span>
    </div>-->
  </div>
</template>

<style lang="scss">
.grid-item {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-size: 100%;
  background-color: #f1f1f1;

  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // opacity: 0;
    // visibility: hidden;
    // transition: opacity 0.15s;

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
  // display: none;
  display: flex;
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
</style>

<script>
export default {
  props: {
    isNativeLoading: {
      type: Boolean,
      default: false
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
  }
};
</script>
