<template>
  <div class="user">
    <button
      class="user-btn"
      @click="toggleMenu"
      :style="{ backgroundImage: `url(${user.avatarImg})`}"
    />
    <div class="user-menu" v-if="isMenuOpen" v-on-clickaway="toggleMenu">
      <ul class="nav-menu-list">
        <li class="nav-menu-list-item">
          <span class="name">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
        </li>
        <hr class="grey-border">
        <li class="nav-menu-list-item">
          <button class="menu-btn" @click="load(myListLocation)">
            My list
          </button>
        </li>
        <hr class="grey-border">
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
  import { directive as onClickaway } from 'vue-clickaway';
  import { myListLocation } from "~/config/locations.config";
  import defaultAvatar from '~/assets/default/user.svg';

  export default {
    directives: {
      onClickaway,
    },
    props: {
      load: Function
    },
    data: () => {
      return {
        isMenuOpen: false,
        myListLocation,
        user: {
          avatarImg: defaultAvatar,
          email: 'john.doe@macys.com',
          name: 'John Doe'
        },
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

  .user {
    position: relative;

    &-btn {
      position: relative;
      width: 35px;
      height: 35px;
      margin-left: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 50%;
    }

    &-menu {
      position: absolute;
      top: 40px;
      right: 6px;
      padding: 5px 0;
      min-width: 180px;
      background-color: $white;
      border: 1px solid $medium-grey;
      border-radius: 3%;
      z-index: 2;
      box-shadow: 0 4px 10px -3px $box-shadow-color;

      &:after {
        display: block;
        content: '';
        position: absolute;
        right: 6px;
        top: -4px;
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
      }
    }
  }

  .grey-border {
    display: block;
    height: 1px;
    background-color: $medium-grey;
    border: none;
    margin: 2px 0;
  }

  .nav-menu-list {
    padding: 0;
    font-size: 12px;
    text-align: center;

    &-item {
      padding: 0 10px;
      text-align: left;
      list-style: none;

      &:first-of-type {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        font-size: 14px;
        padding: 5px 10px;
      }
    }
  }

  .menu-btn {
    display: flex;
    align-content: center;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    font-size: 14px;
    text-transform: none;
  }

  .name {
    font-weight: bold;
  }

  .email {
    margin: 5px 0;
    font-size: 12px;
    color: $grey-border-dark;
  }

  .disabled {
    color: $grey-border-dark;
    cursor: default;
  }
</style>
