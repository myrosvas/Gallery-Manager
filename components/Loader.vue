<template>
  <div v-if="isLoading" class="loading flex-center">
    <i></i>
    <span class="loading-text">
      Loading
      <b></b>
      <b></b>
      <b></b>
    </span>
  </div>
</template>

<style lang="scss">
@import "~/assets/css/vars";

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.2;
  }
}

.loading {
  font-size: 16px;
  color: $grey;
  padding-right: 21px;

  i {
    display: inline-block;
    position: relative;
    top: -2px;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 90%;
    margin-right: 5px;
    opacity: 0.6;
    background-image: url("~assets/icons/loading.svg");
  }

  &-text {
    position: relative;

    b {
      position: absolute;
      display: block;
      width: 3px;
      height: 3px;
      bottom: 3px;
      background-color: $grey;
      animation-name: blink;
      animation-duration: 1.4s;
      animation-iteration-count: infinite;
      letter-spacing: 1px;
      animation-fill-mode: both;
      padding: 0;
      margin: 0;
      display: inline-block;

      &:nth-child(1) {
        right: -7px;
      }

      &:nth-child(2) {
        animation-delay: 0.2s;
        right: -14px;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
        right: -21px;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    isLoading: Boolean
  }
};
</script>
