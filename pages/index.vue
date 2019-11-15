<template>
  <div class="container">
    <header>
      <div class="logo">
        <a href>Gallery Manager</a>
        <span v-if="isSavedDrive">/ Selected</span>
      </div>
      <nav>
        <!-- TODO: upload from the local disc -->
        <!-- <div class="file">
          <label for="upload" class="btn">load local images</label>
          <input type="file" id="upload" ref="uploads" @change="upload" multiple />
        </div>-->
        <button v-if="isSavedDrive" @click="back">back</button>
        <button v-if="!isSavedDrive" @click="load('gallery1')">load dam #1</button>
        <button v-if="!isSavedDrive" @click="load('gallery2')">load dam #2</button>
        <button v-if="!isSavedDrive" @click="load('saved')">my list</button>
        <button v-if="!isSavedDrive" @click="drop" :disabled="!items.length">Drop Gallery</button>
        <button v-if="!isSavedDrive" @click="save" :disabled="!selected.length">save selected</button>
      </nav>
    </header>

    <section>
      <Gallery :items="items" :isSavedDrive="isSavedDrive" />
      <MyList v-if="!isSavedDrive" />
    </section>
  </div>
</template>

<script>
import Gallery from "~/components/Gallery.vue";
import MyList from "~/components/MyList.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    Gallery,
    MyList
  },
  data() {
    return {
      isRemoteFiles: true,
      isSavedDrive: false
    };
  },
  computed: mapGetters({
    items: "filteredItems",
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

<style>
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
  color: #333;
  font-weight: bold;
}

.logo a {
  color: #333;
}

.logo span {
  font-size: 20px;
  color: #666;
}

button {
  font-size: 11px;
  font-family: Arial;
  text-transform: uppercase;
  height: 30px;
  font-weight: 400;
  line-height: 30px;
  margin: 0;
  padding: 0 10px;
  background-color: #fff;
  background-image: none;
  background: linear-gradient(#ffffff, #ffffff);
  cursor: pointer;
  transition: 0.1s;
  outline: none;
}

a {
  color: #666;
  text-decoration: none;
}

button:disabled {
  cursor: default;
}

button:disabled:hover {
  border-color: #ccc;
}

button:hover {
  border-color: #a2a2a2;
}

section {
  display: flex;
  height: 60px;
}

section > div {
  background-color: #fff;
  height: calc(100vh - 80px);
  padding: 12px;
}

.hint {
  color: #777;
}

img {
  max-width: 100%;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.mb-20 {
  margin-bottom: 20px;
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
}

.btn:hover {
  border-color: #a2a2a2;
}

#upload {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
