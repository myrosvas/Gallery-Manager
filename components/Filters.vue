<template>
  <div class="filter-wrapper">
    <span>Filter by:</span>
    <select v-model="selectedFilter" :change="onFilterChange()">
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
        selectedFilter: 'date',
        filtersEnum
      }
    },
    props: ["resetGridView"],
    methods: {
      ...mapMutations({
        changeFilterType: "changeFilterType"
      }),
      onFilterChange() {
        this.resetGridView();
        this.changeFilterType(this.selectedFilter);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .filter-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    width: 130px;

    select {
      height: 25px;
    }
  }
</style>
