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
          <div
            class="tag"
            :class="{'disabled': !tag.isEditable}"
            v-for="tag in filteredTags"
            :key="tag.key"
          >
            <b>{{tag.label}}:</b>
            <span>
              <i v-if="!tag.edit">
                <template v-if="tag.filter === 'date'">{{tag.value | date}}</template>
                <template v-else-if="tag.filter === 'px'">{{tag.value | px}}</template>
                <template v-else>{{tag.value}}</template>
              </i>
              <input
                :ref="tag.key"
                v-if="tag.isEditable && tag.edit"
                v-model="tag.value"
                v-on:keyup="onPress(tag, $event)"
              />
              <button v-if="tag.isEditable && !tag.edit" class="edit" @click.prevent="edit(tag)"></button>
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

<script>
import { mapActions, mapMutations } from "vuex";
import { piexif } from 'piexifjs';
import { all } from 'q';
import { metadataMixin } from "~/mixins/metadataMixin";
import { metadataConfig } from "~/config/metadata.config";
import { ExifTags } from '../config/exifTags.config';
import { convertFileToDataURL } from '../helpers/convertFileToDataURL';
import { flattenObject } from '../helpers/flattenObject';

export default {
  data() {
    return {
      filteredTags: []
    };
  },
  props: ["selected", "isSavedDrive"],
  mixins: [metadataMixin],
  computed: {
    hasTags() {
      return Object.keys(this.filteredTags).length;
    }
  },
  methods: {
    ...mapActions(["removeFromSaved"]),
    ...mapMutations({
      selectItem: "selected/select"
    }),
    onLoad() {
      const imageSrc = this.$refs.img.$el.src;

      this.selected.tagsToChange = [];

      const convertTagIdIntoName = (obj) => {
        const keyValues = Object.keys(obj).map(key => {
          const newKey = ExifTags[key];

          return { [newKey]: obj[key] };
        });

        return Object.assign({}, ...keyValues);
      }

      const filterTags = (convertedTags) => {
        this.filteredTags = Object.keys(convertedTags)
          .filter(key => metadataConfig[key])
          .map(key => ({
            key,
            label: metadataConfig[key].label,
            isEditable: metadataConfig[key].isEditable,
            filter: metadataConfig[key].filter,
            value: convertedTags[key],
            edit: false
          }));
      }

      const getExifData = (data) => {
        const allImageData = piexif.load(data);
        const allTags = flattenObject(allImageData);
        const convertedTags = convertTagIdIntoName(allTags);

        filterTags(convertedTags);
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
    },
    edit(tag) {
      tag.edit = true;
      this.selected.tagsToChange.push(tag);
      this.$nextTick(() => {
        this.$refs[tag.key][0].focus();
      });

      // setTimeout(() => {
      //   debugger;
      // }, 1000);
    },
    onPress(tag, event) {
      if (event.keyCode === 13 || event.keyCode === 27) {
        tag.edit = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/css/vars";
@import "~/assets/css/mixins";

.quick-view {
  @include blackOpacity(background-color, 0.5);
  z-index: 3;

  .img-data {
    display: flex;
    margin-bottom: 10px;
  }

  .img-container {
    min-height: 100px;
    flex: 1;
    position: relative;
  }

  .img-metadata {
    flex: 0 0 350px;
    max-height: $box-height;
    margin-left: 10px;
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
    max-height: $box-height;
    opacity: 1;
  }

  .v-lazy-image-loaded + .img-loader {
    display: none;
  }
}

.img-loader {
  z-index: 2;
  display: block;
  background: $white url("~assets/icons/preloader.gif") no-repeat center;
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

.tag {
  display: flex;
  margin-bottom: 5px;
  line-height: 18px;
  font-size: 14px;

  input {
    width: 100%;
  }

  i {
    font-style: normal;
  }

  &.disabled {
    color: $dark-grey;
  }

  span {
    position: relative;
    display: flex;
    flex: 1;
    margin-left: 5px;
  }

  .edit {
    height: 18px;
    width: 18px;
    margin-left: 5px;
    background: $black;
    background-image: url("~assets/icons/edit.svg");
    background-repeat: no-repeat;
    background-size: 60%;
    background-position: center;
    border: none;
  }
}
</style>