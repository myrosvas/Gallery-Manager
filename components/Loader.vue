<template>
  <div v-if="isLoading" class="loading flex-center">
    <i class="loading"></i>
    <span>Loading...</span>
  </div>
</template>

<script>
  export default {
    props: {
      isLoading: Boolean
    }
  };
</script>