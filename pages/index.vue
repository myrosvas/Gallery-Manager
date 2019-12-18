<template>
  <div class="container">
    <header>
      <Logo />
      <nav>
        <!-- TODO: upload from the local disc -->
        <!-- <div class="file">
          <label for="upload" class="btn">load local images</label>
          <input type="file" id="upload" ref="uploads" @change="upload" multiple />
        </div>-->
        <button v-if="isSavedDrive" @click="back">back</button>
        <select
          class="location"
          v-if="!isSavedDrive"
          v-model="location"
          :class="{disabled: isLoading}"
          :disabled="isLoading"
        >
          <option
            v-for="(item, index) in locations"
            :key="item.path"
            :value="item.path"
            :disabled="index === 0"
          >{{item.name}}</option>
        </select>
        <button v-if="!isSavedDrive" @click="load(myListLocation)">My List</button>
        <button v-if="!isSavedDrive" @click="drop" :disabled="!count">Drop Gallery</button>
        <button v-if="!isSavedDrive" @click="save" :disabled="!selected.length">Save Selected</button>
        <button v-if="!isSavedDrive" @click="save" :disabled="!selected.length">Commit Selected</button>
      </nav>
    </header>

    <section>
      <Gallery :limited="limited" :isSavedDrive="isSavedDrive" :isLoading="isLoading" />
      <Selected v-if="!isSavedDrive" />
    </section>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Gallery from "~/components/Gallery.vue";
import Selected from "~/components/Selected.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { locations, myListLocation } from "~/config/locations.config";

export default {
  components: {
    Logo,
    Gallery,
    Selected
  },
  data() {
    return {
      isRemoteFiles: true,
      isSavedDrive: false,
      isLoading: false,
      location: null,
      myListLocation,
      locations: [{ name: "choose location", path: null }, ...locations]
    };
  },
  watch: {
    location(path) {
      if (path) {
        this.load(path);
      }
    },
    count(value) {
      if (!value && !this.isSavedDrive) {
        this.location = null;
      }
    }
  },
  computed: mapGetters({
    count: "count",
    items: "filteredItems",
    limited: "limited",
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
              mtime: lastModified,
              type,
              size,
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
      this.isLoading = true;
      if (this.isSavedDrive) {
        this.drop();
      }
      this.isSavedDrive = drive === "saved";
      try {
        await this.loadItems({ drive, isSavedDrive: this.isSavedDrive });
        this.isLoading = false;
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
@import "~/assets/css/vars";

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

section {
  display: flex;
}

section > div {
  background-color: $white;
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
  background-color: $white;
  cursor: pointer;
  transition: 0.1s;
  outline: none;
  border: 1px solid $grey-border-btn;
  border-bottom: 1px solid $dark-grey3;

  &:hover {
    border-color: $grey-border-dark;
  }
}

#upload {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.location {
  height: 30px;
  margin-right: 15px;

  &.disabled {
    color: $grey;
    cursor: default;
    border-color: $grey-border-light;

    &:hover {
      border-color: $grey-border-light;
    }
  }
}
</style>
