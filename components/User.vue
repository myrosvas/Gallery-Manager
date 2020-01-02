<template>
  <div class="user">
    <button
      class="user-btn"
      @click="toggleMenu"
      :style="{ backgroundImage: `url(${user.avatarImg})`}"
    />
    <div v-if="isMenuOpen" class="user-menu">
      <ul class="nav-menu-list">
        <li class="nav-menu-list-item">
          <span class="name">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
        </li>
        <hr>
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
  import defaultAvatar from '~/assets/default/default-user-image.png';

  export default {
    props: {
      load: Function
    },
    data: () => {
      return {
        isMenuOpen: false,
        myListLocation,
        user: {
          avatarImg: defaultAvatar,
          email: 'andriii.tereshchuk@macys.com',
          name: 'Andrii Tereshchuk'
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
      text-align: left;
      list-style: none;

      &:first-of-type {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 50px;
        font-size: 14px;
      }
    }
  }

  .menu-btn {
    height: 25px;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    font-size: 12px;

    &:hover {
      text-decoration: underline;
    }
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
  }
</style>