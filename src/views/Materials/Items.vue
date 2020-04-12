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
            <v-btn outlined color="indigo" @click="search()">
              <v-icon>fa-search</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Items -->
    <v-card class="mt-5">
      <v-card-text>
        <v-list three-line>
          <template v-for="item in items">
            <v-list-item :key="'item-' + item.id" @click="goToItem(item)">
              <v-list-item-avatar width="60" height="60">
                <p
                  class="quantity"
                  :class="getQuantityClass(item.total, item.onLoan)"
                >
                  {{ item.total - item.onLoan }}
                </p>
              </v-list-item-avatar>
              <v-list-item-avatar width="60" height="60" class="mr-5">
                <v-img :src="item.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="text-justify">
                <v-list-item-title>
                  {{ item.name }} -
                  <v-chip
                    class="ma-2"
                    :color="getChipColor(item.status)"
                    outlined
                    small
                  >
                    {{ item.status | parseStatus }}
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="'divider-' + item.id"></v-divider>
          </template>
        </v-list>
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
    this.getItems(
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
          value: "total",
          text: "Cantidad",
          iconAsc: "fa-sort-numeric-up",
          iconDesc: "fa-sort-numeric-down",
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
    };
  },
  methods: {
    search() {
      this.skip = 0;
      this.page = 1;
      this.getItems(
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
      this.getItems(
        this.limit,
        skip,
        this.searchText,
        this.sort.value,
        this.sortOrientation,
      );
    },
    getItems(limit, skip, searchText, orderBy, orderDirection) {
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
      this.$store.dispatch("items/getItemsAction", payload);
    },
    getChipColor(value) {
      switch (value) {
        case "NEW":
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
    goToItem(item) {
      this.$store.commit("items/setSelectedItem", item);
      this.$router.push({ name: "checkMaterial" });
    },
  },
  computed: {
    items() {
      return this.$store.getters["items/items"];
    },
    total() {
      return this.$store.getters["items/count"];
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
