<template>
  <div class="container">
    <header>
      <div class="logo">
        <a href>Gallery Manager</a>
        <span v-if="isSavedDrive">/ Saved</span>
      </div>
      <nav>
        <!-- TODO: upload from the local disc -->
        <!-- <div class="file">
          <label for="upload" class="btn">load local images</label>
          <input type="file" id="upload" ref="uploads" @change="upload" multiple />
        </div>-->
        <button v-if="isSavedDrive" @click="back">back</button>
        <button v-if="!isSavedDrive" @click="load('gallery1')">Load from Adobe</button>
        <button v-if="!isSavedDrive" @click="load('gallery2')">Load from Xinet</button>
        <button v-if="!isSavedDrive" @click="load('gallery3')">Load from Aprimo</button>
        <button v-if="!isSavedDrive" @click="load('saved')">My List</button>
        <button v-if="!isSavedDrive" @click="drop" :disabled="!items.length">Drop Gallery</button>
        <button v-if="!isSavedDrive" @click="save" :disabled="!selected.length">Save Selected</button>
        <button v-if="!isSavedDrive" @click="save" :disabled="!selected.length">Commit Selected</button>
      </nav>
    </header>

    <section>
      <Gallery :items="items" :isSavedDrive="isSavedDrive" />
      <Selected v-if="!isSavedDrive" />
    </section>
  </div>
</template>

<script>
import Gallery from "~/components/Gallery.vue";
import Selected from "~/components/Selected.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    Gallery,
    Selected
  },
  data() {
    return {
      isRemoteFiles: true,
      isSavedDrive: false
    };
  },
  computed: mapGetters({
    items: "limited",
    selected: "selected/filtered"
  }),
  methods: {
    ...mapActions({
      loadItems: "loadItems",
      saveToRemoteDrive: "selected/saveToServer",
      saveToLocalDrive: "selected/saveToDrive"
    }),
    ...mapMutations(["drop", "revert"]),
    upload() {
      const images = this.items;
      const files = this.$refs.uploads.files;
      // this.isRemoteFiles = false;

      for (let i = 0, item; (item = files[i]); i++) {
        if (!item.type.match("image.*")) {
          continue;
        }

        const reader = new FileReader();

        reader.onload = (function({ name, lastModified, type, size }) {
          return function(e) {
            const model = {
              url: e.target.result,
              name,
              lastModified,
              type,
              size,
              path: e.target.result,
              jobId: null,
              astraId: null
            };
            images.push(model);
          };
        })(item);

        // Read in the image file as a data URL.
        reader.readAsDataURL(item);
      }
      this.$toast.success("ADDED");
    },
    async load(drive) {
      // this.isRemoteFiles = true;
      if (this.isSavedDrive) {
        this.drop();
      }
      this.isSavedDrive = drive === "saved";
      try {
        await this.loadItems({ drive, isSavedDrive: this.isSavedDrive });
      } catch (e) {
        console.log(e);
      }
    },
    save() {
      return this.isRemoteFiles
        ? this.saveToRemoteDrive()
        : this.saveToLocalDrive();
    },
    back() {
      this.revert();
      this.isSavedDrive = false;
    }
  }
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 2rem;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 26px;
  font-weight: bold;

  span {
    font-size: 20px;
    color: #666;
  }
}

section {
  display: flex;
}

section > div {
  background-color: #fff;
  height: calc(100vh - 80px);
}

.file {
  display: inline-block;
}

.btn {
  font-size: 11px;
  display: inline-block;
  cursor: pointer;
  text-transform: uppercase;
  height: 30px;
  line-height: 30px;
  margin: 0;
  padding: 0 10px;
  background-color: #fff;
  cursor: pointer;
  transition: 0.1s;
  outline: none;
  border: 1px solid #d1d1d1;
  border-bottom: 1px solid #bababa;

  &:hover {
    border-color: #a2a2a2;
  }
}

#upload {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
