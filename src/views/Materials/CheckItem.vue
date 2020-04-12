<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="12" lg="6">
      <v-card>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="12"
              lg="12"
              id="imageContainer"
            >
              <section id="imageHeader">
                <h1>{{ selectedItem.name }}</h1>
              </section>
              <v-img
                ref="vImg"
                :src="selectedItem.image"
                aspect-ratio="1"
                class="grey lighten-2 mx-auto"
                :contain="true"
                :max-height="300"
              ></v-img>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="12" lg="12">
              <v-row>
                <v-col cols="12" xs="12" md="12" lg="12" class="py-1">
                  <label class="headline">
                    {{ selectedItem.model }} -
                    <v-chip
                      :color="getChipColor(selectedItem.status)"
                      outlined
                      medium
                    >
                      {{ selectedItem.status | parseStatus }}
                    </v-chip>
                  </label>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12" class="py-2">
                  <p class="text-justify">{{ selectedItem.description }}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="4" class="py-2">
                  <label>Total</label>
                  <p>{{ selectedItem.total }}</p>
                </v-col>
                <v-col xs="4" class="py-2">
                  <label>Prestado</label>
                  <p>{{ selectedItem.onLoan }}</p>
                </v-col>
                <v-col xs="4" class="py-2">
                  <label>Actual</label>
                  <p>{{ selectedItem.total - selectedItem.onLoan }}</p>
                </v-col>
              </v-row>
              <v-divider class="mb-4"></v-divider>
              <v-row>
                <v-col class="py-1">
                  <v-btn color="error" class="float-left" @click="goBack"
                    >Regresar</v-btn
                  >
                  <v-btn color="primary" class="float-right" @click="edit"
                    >Editar</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    if (!this.selectedItem.id) {
      this.$router.push({ name: "materials" });
    }
  },
  computed: {
    selectedItem() {
      return this.$store.getters["items/selectedItem"];
    },
  },
  methods: {
    getChipColor(value) {
      switch (value) {
        case "NEW":
          return "primary";
        default:
          return "";
      }
    },
    // BUTTON HANDLERS
    edit() {
      this.$router.push({ name: "editMaterial" });
    },
    goBack() {
      this.$store.commit("items/clearSelectedItem");
      this.$router.push({ name: "materials" });
    },
  },
};
</script>

<style lang="scss" scoped>
#imageContainer {
  position: relative;
  border: 1px dashed #aba5a5;
  padding: 0;
  #imageHeader {
    position: absolute;
    bottom: 0%;
    left: 0%;
    background-color: rgba(141, 145, 142, 1);
    color: white;
    z-index: 1;
    width: 100%;
    padding: 1%;
  }
}
</style>
