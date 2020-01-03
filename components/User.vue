<template>
  <div class="user">
    <button
      class="user-btn"
      @click="toggleMenu"
      :style="{ backgroundImage: `url(${user.avatarImg})`}"
    />
    <div v-if="isMenuOpen" class="user-menu" @blur="toggleMenu">
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
        console.log(this.isMenuOpen);
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
      margin-right: 20px;
      background-size: cover;
      background-repeat: no-repeat;
      border: 1px solid $grey-border-btn;
      border-radius: 50%;

      &:hover {
        border-color: $grey-border-dark;
      }

      &:after {
        content: "⌄";
        position: absolute;
        right: -25px;
        top: 0;
        font-weight: bold;
        font-size: 26px;
      }
    }

    &-menu {
      position: absolute;
      top: 55px;
      right: 10px;
      padding: 5px 0;
      background-color: $white;
      border: 1px solid $grey-border-btn;
      border-radius: 3%;
      z-index: 2;
      box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.30);
      -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.30);
      -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.30);
    }
  }

  .grey-border {
    border: 1px solid $grey-border-btn;
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
        height: 50px;
        font-size: 14px;
      }
    }
  }

  .menu-btn {
    display: flex;
    align-content: center;
    margin: 0;
    padding: 0;
    height: 40px;
    background: none;
    border: none;
    font-size: 14px;
    text-transform: none;

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