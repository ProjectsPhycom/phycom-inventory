<template>
  <v-navigation-drawer v-model="active" app clipped>
    <v-list dense>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.name }} {{ user.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="route in routes" :key="route.href" :href="route.href">
        <v-list-item-content>
          <v-list-item-title>{{ route.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-content>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    active: Boolean,
  },
  data() {
    return {
      routes: [
        {
          title: "Materiales",
          href: "/panel/materials",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logoutAction");
    },
  },
};
</script>
