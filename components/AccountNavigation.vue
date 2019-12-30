<template>
  <div class="account-navigation">
    <button class="account-navigation-btn" @click="toggleMenu" />
    <div v-if="isMenuOpen" class="account-navigation-menu">
      <ul class="nav-menu-list">
        <li class="nav-menu-list-item">
          <button class="menu-btn" @click="load(myListLocation)">
            My list
          </button>
        </li>
        <li class="nav-menu-list-item">
          <button class="menu-btn disabled">
            Log out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { myListLocation } from "~/config/locations.config";

  export default {
    props: {
      load: Function
    },
    data: () => {
      return {
        isMenuOpen: false,
        myListLocation,
      }
    },
    methods: {
      toggleMenu: function () {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/css/vars";

  .account-navigation {
    position: relative;

    &-btn {
      position: relative;
      width: 35px;
      height: 35px;
      background-image: url("../assets/default/user-image.png");
      background-size: contain;
      background-repeat: no-repeat;
      border: 1px solid $grey-border-btn;
      border-radius: 50%;

      &:hover {
        border-color: $grey-border-dark;
      }
    }

    &-menu {
      position: absolute;
      top: 35px;
      right: 5px;
      width: 80px;
      padding: 5px 10px;
      background-color: $white;
      border: 1px solid $grey-border-btn;
      border-radius: 5%;
      z-index: 2;
    }
  }

  .nav-menu-list {
    padding: 0;
    font-size: 12px;
    text-align: center;

    &-item {
      list-style: none;
      text-align: left;
      text-transform: uppercase;
    }
  }

  .menu-btn {
    height: 25px;
    padding: 0;
    margin: 0;
    background: none;
    border: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .disabled {
    color: $grey-border-dark;
  }
</style>