<template>
  <v-app id="app">
    <v-container class="fill-height" fluid>
      <router-view />
      <error-dialog
        :active="error.active"
        :title="error.title"
        :text="error.text"
        v-on:ok="onOk"
      ></error-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    onOk() {
      this.$store.commit("setError", {
        active: false,
        title: "",
        text: "",
      });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
