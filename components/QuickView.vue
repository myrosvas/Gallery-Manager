<template>
  <div class="quick-view">
    <div class="box">
      <img :src="picked.url" alt />
      <div class="metadata">
        <div class="text-left">
          <div v-if="picked.name">
            <b>name:</b>
            {{picked.name}}
          </div>
          <div v-if="picked.lastModified">
            <b>last modified:</b>
            {{picked.lastModified | date}}
          </div>
          <div>
            <b>path:</b>
            {{picked.path}}
          </div>
        </div>
        <div class="text-right">
          <div>
            <b>jobId:</b>
            {{picked.jobId ? picked.jobId : 'TBD'}}
          </div>
          <div>
            <b>astraId:</b>
            {{picked.astraId ? picked.astraId : 'TBD'}}
          </div>
          <div v-if="picked.type">
            <b>type:</b>
            {{picked.type}}
          </div>
          <div v-if="picked.size">
            <b>size:</b>
            {{picked.size | kb }} KB
          </div>
        </div>
      </div>
      <button @click="close">close</button>
      <button v-if="isSavedDrive" @click="remove">remove</button>
      <button v-if="!isSavedDrive" @click="select">select</button>
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
  margin-bottom: 10px;
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
.metadata {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 18px;
}
</style>

<script>
export default {
  props: ["picked", "isSavedDrive"],
  methods: {
    close: function() {
      this.$emit("close");
    },
    select: function() {
      this.$emit("select", this.picked);
    },
    remove: function() {
      this.$emit("remove", this.picked);
    }
  },
  filters: {
    date: function(time) {
      return new Date(time).toLocaleString();
    },
    kb: function(size) {
      return Math.ceil(size / 1024);
    }
  }
};
</script>
