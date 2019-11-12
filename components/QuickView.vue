<template>
  <div class="quick-view">
    <div class="box">
      <img :src=picked alt />
      <button @click="close">close</button>
      <button @click="select">select</button>
    </div>
  </div>
</template>

<style>
.quick-view {
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
}

.quick-view img {
  display: block;
  margin-bottom: 20px;
  max-height: calc(90vh - 100px);
}

.box {
  margin: 2rem;
  background-color: #fff;
  padding: 20px;
  max-width: 90%;
  max-height: calc(100vh - 20px);
}

.close {
  position: absolute;
  z-index: 2;
  top: 40px;
  right: 40px;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>

<script>
export default {
  props: ['picked'],
  methods: {
    close: function() {
      this.$emit("close");
    },
    select: function() {
      this.$emit("select", this.picked);
    }
  }
};
</script>
