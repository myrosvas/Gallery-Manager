<template>
  <div class="quick-view fixed flex-center text-center">
    <div class="box">
      <div class="img-data">
        <div class="img-container">
          <v-lazy-image :src="selected.url" @load="onLoad" ref="img" />
          <span class="img-loader absolute"></span>
        </div>

        <div class="img-metadata">
          <div class="tag disabled">
            <b>name:</b>
            <span>{{selected.name}}</span>
          </div>
          <div class="tag disabled">
            <b>path:</b>
            <span>{{selected.url}}</span>
          </div>
          <div v-if="selected.size" class="tag disabled">
            <b>size:</b>
            <span>{{selected.size | kb }} KB</span>
          </div>
          <div v-if="selected.mtime" class="tag disabled">
            <b>last modified:</b>
            <span>{{selected.mtime | date}}</span>
          </div>

          <div class="exif-data">
            <span v-for="(value, name) in exifData" :key="name">
              <b>{{name}}</b>: 
              {{Array.isArray(value) ? value.toString().split(',').join(', ') : value}}
            </span>
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

  .img-data {
    display: flex;
  }

  .img-container {
    min-height: 100px;
    flex: 1;
    position: relative;
    margin-bottom: 10px;
  }

  .img-attrs {
    flex: 0 0 500px;
    max-height: calc(100vh - 160px);
    overflow-y: auto;
    text-align: left;
    padding: 10px;
    background-color: #eff0f1;
    border-radius: 5px;

    pre {
      font-size: 13px;
    }
  }

  img {
    opacity: 0;
    min-height: 100px;
    max-height: 100px;
    transition: 0.25s;
  }

  .v-lazy-image-loaded {
    max-height: calc(100vh - 160px);
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

.exif-data {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 420px;
  max-height: 900px;
  padding: 10px 20px;
  line-height: 25px;
  overflow: scroll;
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
import { piexif } from 'piexifjs';
import { ExifTags } from '../config/exifTags.config';

// Move this function to the helpers!!!
  const convertFileToDataURL = (url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      const reader = new FileReader();

      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

export default {
  data() {
    return {
      tags: "",
      exifData: {}
    };
  },
  props: ["selected", "isSavedDrive"],
  mixins: [metadataMixin],
  methods: {
    ...mapActions(["removeFromSaved"]),
    ...mapMutations({
      selectItem: "selected/select"
    }),
    onLoad() {
      const imageSrc = this.$refs.img.$el.src;

      const getExifData = (data) => {
        // const allImageData = piexif.load(data);
        const zeroth = piexif.load(data)['0th'];
        const exif = piexif.load(data)['Exif'];
        const GPS = piexif.load(data)['GPS'];
        const interop = piexif.load(data)['Interop'];
        const first = piexif.load(data)['1st'];

        const exifDataRaw = {...exifDataRaw, ...exif, ...GPS, ...interop, ...first};

        const renameKeys = (obj) => {
          const keyValues = Object.keys(obj).map(key => {
          const newKey = ExifTags[key];

          return { [newKey]: obj[key] };
          });

          return Object.assign({}, ...keyValues);
        }
        this.exifData = renameKeys(exifDataRaw);

        // piexif.dump(file) - Get exif as string to insert into JPEG.
        // piexif.insert(exifStr, jpegData) - Insert exif into JPEG. If jpegData is DataURL, returns JPEG as DataURL. Else if jpegData is binary as string, returns JPEG as binary as string.
      }

      convertFileToDataURL(imageSrc, getExifData);
    },
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
