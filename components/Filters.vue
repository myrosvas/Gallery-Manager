<template>
  <div class="filter-wrapper">
    <span>Filter by:</span>
    <select v-model="selectedFilter" :change="changeFilterType(selectedFilter)">
      <option value="date">date</option>
      <option value="name">name</option>
      <option value="size">size</option>
    </select>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";

  export default {
    data: () => {
      return {
        selectedFilter: 'date'
      }
    },
    methods: {
      ...mapMutations({
        changeFilterType: "changeFilterType"
      })
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
