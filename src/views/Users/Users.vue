<template>
  <div>
    <!-- Search fields -->
    <v-card>
      <v-card-text class="py-1">
        <v-row align="center">
          <v-col cols="12" sm="12" md="12" lg="6" class="py-3">
            <v-text-field
              outlined
              dense
              hide-details
              label="Búsqueda"
              v-model="searchText"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="12" lg="2" class="py-3">
            <v-select
              dense
              hide-details
              label="Ordenar por"
              v-model="sort"
              :items="sortOptions"
              :prepend-icon="
                sortOrientation === 'ASC' ? sort.iconAsc : sort.iconDesc
              "
              return-object
            ></v-select>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="12" lg="2" class="py-3">
            <v-select
              dense
              hide-details
              label="Orientación"
              v-model="sortOrientation"
              :items="sortOrientationOptions"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="2" class="py-3">
            <v-btn
              outlined
              color="indigo"
              :loading="loading"
              :disabled="loading"
              @click="search()"
            >
              <v-icon>fa-search</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Users -->
    <v-card class="mt-5">
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombres</th>
                <th class="text-left">Apellidos</th>
                <th class="text-left">Email</th>
                <th class="text-left">Rol</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="text-left">{{ user.name }}</td>
                <td class="text-left">{{ user.lastName }}</td>
                <td class="text-left">{{ user.email }}</td>
                <td class="text-left">{{ user.role.name }}</td>
                <td class="text-left">
                  <v-chip :color="getChipColor(user.status)" outlined small>
                    {{ user.status | parseStatus }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-pagination
      v-if="total > limit"
      class="mt-5"
      :length="Math.ceil(total / limit)"
      v-model="page"
      @input="onInput"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getUsers(
      this.limit,
      this.skip,
      this.searchText,
      this.sort.value,
      this.sortOrientation,
    );
  },
  data() {
    return {
      searchText: "",
      showMenu: false,
      sort: {
        value: "name",
        text: "Nombre",
        iconAsc: "fa-sort-alpha-up",
        iconDesc: "fa-sort-alpha-down",
      },
      sortOrientation: "ASC",
      sortOptions: [
        {
          value: "name",
          text: "Nombre",
          iconAsc: "fa-sort-alpha-up",
          iconDesc: "fa-sort-alpha-down",
        },
        {
          value: "lastName",
          text: "Apellido",
          iconAsc: "fa-sort-alpha-up",
          iconDesc: "fa-sort-alpha-down",
        },
        {
          value: "email",
          text: "Email",
          iconAsc: "fa-sort-alpha-up",
          iconDesc: "fa-sort-alpha-down",
        },
      ],
      sortOrientationOptions: [
        {
          value: "ASC",
          text: "Menor a mayor",
        },
        {
          value: "DESC",
          text: "Mayor a menor",
        },
      ],

      limit: 12,
      skip: 0,
      page: 1,
      loading: false,
    };
  },
  methods: {
    search() {
      this.skip = 0;
      this.page = 1;
      this.getUsers(
        this.limit,
        this.skip,
        this.searchText,
        this.sort.value,
        this.sortOrientation,
      );
    },
    /** Controls page change */
    onInput(param) {
      const skip = (param - 1) * this.limit;
      this.getUsers(
        this.limit,
        skip,
        this.searchText,
        this.sort.value,
        this.sortOrientation,
      );
    },
    async getUsers(limit, skip, searchText, orderBy, orderDirection) {
      try {
        this.loading = true;
        const payload = { limit, skip };
        if (searchText && searchText !== "") {
          payload.searchText = searchText;
        }
        if (
          orderBy &&
          orderBy !== "" &&
          orderDirection &&
          orderDirection !== ""
        ) {
          payload.orderBy = orderBy;
          payload.orderDirection = orderDirection;
        }
        await this.$store.dispatch("users/getUsersAction", payload);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    getChipColor(value) {
      switch (value) {
        case "ACTIVE":
          return "primary";
        default:
          return "";
      }
    },
    getQuantityClass(total, onLoan) {
      const percentage = onLoan / total;
      if (percentage === 1) {
        return "red--text";
      } else if (percentage > 0.75) {
        return "orange--text";
      } else if (percentage > 0.5) {
        return "yellow--text";
      } else {
        return "green--text";
      }
    },
  },
  computed: {
    users() {
      return this.$store.getters["users/users"];
    },
    total() {
      return this.$store.getters["users/count"];
    },
  },
};
</script>

<style lang="css" scoped>
.quantity {
  font-size: larger;
  font-weight: 600;
}
</style>
