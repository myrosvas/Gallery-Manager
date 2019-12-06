<template>
  <div class="quick-view">
    <div class="box">
      <div class="img-container">
        <v-lazy-image :src="selected.url" />
      </div>
      <div class="metadata">
        <div class="text-left">
          <div v-if="selected.name">
            <b>name:</b>
            {{selected.name}}
          </div>
          <div>
            <b>path:</b>
            {{selected.url}}
          </div>
          <div v-if="selected.mtime">
            <b>last modified:</b>
            {{selected.mtime | date}}
          </div>
        </div>
        <div class="text-right">
          <div v-if="selected.size">
            <b>size:</b>
            {{selected.size | kb }} KB
          </div>
          <div>
            <b>astraId:</b>
            {{selected.astraId ? selected.astraId : 'TBD'}}
          </div>
          <div>
            <b>jobId:</b>
            {{selected.jobId ? selected.jobId : 'TBD'}}
          </div>
        </div>
      </div>
      <button @click="close">close</button>
      <button v-if="isSavedDrive" @click="remove">remove</button>
      <button v-if="!isSavedDrive" @click="select">select</button>
    </div>
  </div>
</template>

<style lang="scss">
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

  .img-container {
    min-height: 100px;
    text-align: center;
  }

  img {
    margin-bottom: 10px;
    max-height: calc(100vh - 180px);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .v-lazy-image-loaded {
    opacity: 1;
  }
}

.box {
  margin: 2rem;
  background-color: #fff;
  padding: 20px;
  max-width: 90%;
  max-height: 100%;
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
import { mapActions, mapMutations } from "vuex";
import { metadataMixin } from "~/mixins/metadataMixin";

export default {
  props: ["selected", "isSavedDrive"],
  mixins: [metadataMixin],
  methods: {
    ...mapActions(["removeFromSaved"]),
    ...mapMutations({
      selectItem: "selected/select"
    }),
    close() {
      this.$emit("close");
    },
    select() {
      this.selectItem(this.selected);
      this.close();
    },
    remove() {
      this.removeFromSaved(this.selected);
      this.close();
    }
  }
};
</script>
