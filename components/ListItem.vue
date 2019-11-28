<template>
  <div class="list-item">
    <img :src="item.thumbUrl" />
    <div>{{item.name}}</div>
  </div>
</template>

<style lang="scss">
.list-item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 0;

  img {
    max-height: 100%;
  }
}

.list-item + .list-item {
  border-top: 1px dashed #f0f0f0;
}
</style>

<script>
export default {
  props: {
    height: {
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
  }
};
</script>
