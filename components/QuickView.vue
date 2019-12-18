<template>
  <div class="quick-view fixed flex-center text-center">
    <div class="box">
      <div class="img-container">
        <v-lazy-image :src="selected.url" />
        <span class="img-loader absolute"></span>
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
@import "~/assets/css/vars";
@import "~/assets/css/mixins";

.quick-view {
  @include blackOpacity(background-color, 0.5);
  z-index: 3;

  .img-container {
    min-height: 100px;
    position: relative;
    margin-bottom: 10px;
  }

  img {
    opacity: 0;
    min-height: 100px;
    max-height: 100px;
    transition: .25s;
  }

  .v-lazy-image-loaded {
    max-height: calc(100vh - 180px);
    opacity: 1;
  }

  .v-lazy-image-loaded + .img-loader {
    display: none;
  }
}

.img-loader {
  z-index: 2;
  display: block;
  background: #fff url("~assets/icons/preloader.gif") no-repeat center;
  background-size: 45px;
}

.box {
  margin: 2rem;
  background-color: $white;
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
