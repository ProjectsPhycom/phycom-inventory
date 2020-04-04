<template>
  <div>
    <sidenav :active="drawer"></sidenav>
    <v-app-bar color="primary" dark dense clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Phycom Inventory App</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="12" md="12" lg="10">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Sidenav from "./Sidenav";
export default {
  data() {
    return {
      drawer: false,
    };
  },
  components: {
    Sidenav,
  },
};
</script>
