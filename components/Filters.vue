<template>
  <div class="filter-wrapper flex-center">
    <span>Filter by:</span>
    <select v-model="filterType">
      <option v-for="value in filtersEnum" :key="value">{{ value }}</option>
    </select>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import { filtersEnum } from '../config/gallery.config';

  export default {
    data: () => {
      return {
        filtersEnum
      }
    },
    computed: {
      filterType: {
        get () {
          return this.$store.state.filterType
        },
        set (value) {
          this.resetGridView();
          this.changeFilterType(value);
        }
      }
    },
    props: ["resetGridView"],
    methods: {
      ...mapMutations({
        changeFilterType: "changeFilterType"
      })
    }
  }
</script>

<style lang="scss" scoped>
@import "~/assets/css/vars";

  .filter-wrapper {
    select {
      height: 25px;
      margin-left: 5px;
    }

    span {
      color: $grey;
      font-size: 13px;
    }
  }
</style>
