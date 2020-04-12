<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col cols="12" xs="12" sm="12" md="6" lg="6">
            <image-input
              :src="image"
              @error="onImageError"
              @imageUploaded="onImageUploaded"
            ></image-input>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="6" lg="6">
            <v-form ref="newItemForm" v-model="formValid">
              <v-row>
                <v-col xs="12" class="py-2">
                  <v-text-field
                    label="Nombre del producto"
                    v-model="name"
                    :counter="100"
                    :rules="rules.item.name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" xs="12" md="6" class="py-2">
                  <v-text-field
                    label="Modelo"
                    v-model="model"
                    :rules="rules.item.model"
                    :counter="50"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" xs="12" md="6" class="py-2">
                  <v-select
                    label="Estado"
                    v-model="status"
                    :items="statuses"
                    :rules="rules.item.status"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="12" class="py-2">
                  <v-textarea
                    label="Descripción"
                    v-model="description"
                    auto-grow
                    :rows="3"
                    :counter="255"
                    :rules="rules.item.description"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col xs="6" class="py-2">
                  <v-text-field
                    label="Cantidad"
                    min="0"
                    max="1000"
                    type="number"
                    v-model="total"
                    required
                    :rules="rules.item.quantity"
                  ></v-text-field>
                </v-col>
                <v-col xs="6" class="py-2">
                  <v-text-field
                    label="En préstamo"
                    min="0"
                    max="1000"
                    type="number"
                    v-model="onLoan"
                    required
                    :rules="rules.item.quantity"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-1">
                  <v-btn color="error" class="float-left" @click="goBack"
                    >Regresar</v-btn
                  >
                  <v-btn
                    color="primary"
                    class="float-right"
                    :disabled="disabled"
                    :loading="loading"
                    @click="edit"
                    >Editar</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="successDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline text-center mx-auto"
          >Material editado</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="text-left py-3">
          El material <b>{{ name }}</b> ha sido editado correctamente.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="goBack">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormMixin from "../../mixins/FormMixin";

import ImageInput from "@/components/ImageInput.vue";

import { updateItemService } from "../../services/item.service";
export default {
  mounted() {
    const selectedItem = this.$store.getters["items/selectedItem"];
    if (!selectedItem.id) {
      this.$router.push({ name: "materials" });
    }
    this.initForm(selectedItem);
  },
  data() {
    return {
      name: "",
      model: "",
      status: "NEW",
      description: "",
      total: 0,
      onLoan: 0,
      image: "",
      itemID: null,

      statuses: [
        {
          value: "NEW",
          text: "Nuevo",
        },
        {
          value: "USED",
          text: "Usado",
        },
      ],
      formValid: false,
      loading: false,

      successDialog: false,
    };
  },
  computed: {
    disabled() {
      return this.loading || !this.formValid;
    },
  },
  methods: {
    initForm(item) {
      this.name = item.name;
      this.model = item.model;
      this.status = item.status;
      this.description = item.description;
      this.total = item.total;
      this.onLoan = item.onLoan;
      this.image = item.image;
      this.itemID = item.id;
    },
    // BUTTON HANDLERS
    async edit() {
      try {
        this.loading = true;
        const valid = this.$refs.newItemForm.validate();
        if (!valid) {
          this.loading = false;
          const errorPayload = {
            active: true,
            title: "Error",
            text: "Llene correctamente todos los datos del formulario",
          };
          this.$store.commit("setError", errorPayload);
          return false;
        }
        const payload = {
          name: this.name,
          model: this.model,
          status: this.status,
          description: this.description,
          total: this.total,
          onLoan: this.onLoan,
          image: this.image,
          itemID: this.itemID,
        };
        await updateItemService(payload);
        this.loading = false;
        this.successDialog = true;
      } catch (error) {
        this.loading = false;
        const errorPayload = {
          active: true,
          title: "Error",
          text: error.message,
        };
        this.$store.commit("setError", errorPayload);
        console.error(error);
      }
    },
    goBack() {
      this.successDialog = false;
      this.$store.commit("items/clearSelectedItem");
      this.$router.push({ name: "materials" });
    },
    // IMAGE COMPONENT HANDLERS
    onImageUploaded(link) {
      this.image = link;
    },
    /**
     * @param {object} error
     * @param {string} error.title
     * @param {string} error.text
     */
    onImageError(error) {
      this.$store.commit("setError", {
        active: true,
        title: error.title,
        text: error.text,
      });
    },
  },
  components: {
    ImageInput,
  },
  mixins: [FormMixin],
};
</script>
