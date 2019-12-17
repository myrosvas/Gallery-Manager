<template>
  <div class="filter-wrapper">
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    width: 130px;
    margin-left: 10px;

    select {
      height: 25px;
    }

    span {
      color: $grey;
    }
  }
</style>
