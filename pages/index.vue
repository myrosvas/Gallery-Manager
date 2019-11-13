<template>
  <div class="container">
    <header>
      <div class="logo">Gallery Manager</div>
      <nav>
        <span v-if="isSaved" class="success">saved!</span>
        <span v-if="isAdded" class="success">added!</span>
        <!-- <div class="file">
          <label for="upload" class="btn">load local images</label>
          <input type="file" id="upload" ref="uploads" @change="upload" multiple />
        </div> -->
        <button @click="load('gallery1')">load dam #1</button>
        <button @click="load('gallery2')">load remote dam #2</button>
        <button @click="load('saved')">Load Saved</button>
        <button @click="drop" :disabled="!images.length">Drop Gallery</button>
        <button @click="save" :disabled="!selected.length">save selected</button>
      </nav>
    </header>

    <section>
      <Gallery v-bind:images="images" @select="select" />
      <MyList v-bind:selected="selected" />
    </section>
  </div>
</template>

<script>
import Gallery from "~/components/Gallery.vue";
import MyList from "~/components/MyList.vue";
import { saveAs } from "file-saver";

export default {
  components: {
    Gallery,
    MyList
  },
  data: () => ({
    images: [],
    selected: [],
    isSaved: false,
    isRemoteFiles: true,
    isAdded: false
  }),
  methods: {
    upload: function() {
      const images = this.images;
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
              path: null,
              jobId: null,
              astraId: null
            };
            images.push(model);
          };
        })(item);

        // Read in the image file as a data URL.
        reader.readAsDataURL(item);
      }
      this.showMsg("add");
    },
    load: function(drive) {
      // this.isRemoteFiles = true;
      this.$axios.$get(`/api/load?drive=${drive}`).then(response => {
        this.images = this.images.concat(response);
        this.showMsg("add");
      });
    },
    save: function() {
      return this.isRemoteFiles ? this.saveToRemote() : this.saveToLocalDrive();
    },
    saveToRemote: function() {
      const selected = this.selected.map(({ url }) => url);

      this.$axios.$post("/api/save", { selected }).then(response => {
        this.showMsg("save");
      });
    },
    saveToLocalDrive: function() {
      this.selected.forEach(({ url, name }) => saveAs(url, name));
    },
    drop: function() {
      this.images = [];
    },
    select: function(image) {
      this.selected = this.selected.concat(image);
    },
    showMsg: function(type) {
      if (type === "add") {
        this.isAdded = true;
      } else {
        this.isSaved = true;
      }
      setTimeout(() => {
        if (type === "add") {
          this.isAdded = false;
        } else {
          this.isSaved = false;
        }
      }, 2000);
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

.success {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #46ad7e;
  padding-right: 10px;
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
