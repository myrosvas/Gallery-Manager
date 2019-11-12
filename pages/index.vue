<template>
  <div class="container">
    <header>
      <div class="logo">Gallery Manager</div>
      <nav>
        <span v-if="isSaved" class="success">saved!</span>
        <button @click="load">Load Local Drive</button>
        <button @click="drop">Drop Gallery</button>
        <button @click="save">Save Selected Area</button>
      </nav>
    </header>

    <section>
      <Gallery v-bind:images="images" @select="select" />
      <MyList v-bind:selected="selected" />
    </section>
  </div>
</template>

<script>
import Gallery from "~/components/Gallery.vue";
import MyList from "~/components/MyList.vue";

export default {
  components: {
    Gallery,
    MyList
  },
  data: () => ({
    images: [],
    selected: [],
    isSaved: false
  }),
  methods: {
    load: function() {
      this.$axios.$get("/api/load").then(response => (this.images = response));
    },
    save: function() {
      this.$axios.$post("/api/save", { selected: this.selected }).then(response => {
        this.isSaved = true;
        setTimeout(() => {
          this.isSaved = false;
        }, 2000);
      });
    },
    drop: function() {
      this.images = [];
    },
    select: function(image) {
      this.selected = [...new Set(this.selected.concat(image))];
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 2rem;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 26px;
  color: #333;
  font-weight: bold;
}

button {
  text-transform: uppercase;
  height: 30px;
  font-weight: 400;
  line-height: 30px;
  margin: 0;
  padding: 0 10px;
  background-color: #fff;
  background-image: none;
  background: linear-gradient(#ffffff, #ffffff);
  cursor: pointer;
  transition: 0.1s;
  outline: none;
}

button:hover {
  border-color: #a2a2a2;
}

section {
  display: flex;
  height: 60px;
}

section > div {
  background-color: #fff;
  height: calc(100vh - 80px);
  padding: 12px;
}

.hint {
  color: #777;
}

img {
  max-width: 100%;
}

.success {
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #46ad7e;
  padding-right: 10px;
}
</style>
