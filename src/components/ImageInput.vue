<template>
  <div>
    <v-hover v-slot:default="{ hover }">
      <section id="imageContainer">
        <v-img
          ref="vImg"
          :src="imageSrc"
          aspect-ratio="1"
          class="grey lighten-2 mx-auto"
          :contain="true"
          :max-height="maxHeight"
          @load="onImageLoad"
          @error="onImageError"
        ></v-img>
        <section class="absolute-center" v-if="loading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </section>
        <section id="imageControls" v-if="hover">
          <v-btn icon @click="selectImage">
            <v-icon>fa-camera</v-icon>
          </v-btn>
        </section>
      </section>
    </v-hover>
    <input
      type="file"
      ref="fileInput"
      accept="image/*"
      hidden
      @change="onInputChange"
    />
  </div>
</template>

<script>
import { uploadImage } from "../services/image.service";
export default {
  props: {
    src: String,
    maxWidth: {
      type: Number,
      default: () => {
        return 500;
      },
    },
    maxHeight: {
      type: Number,
      default: () => {
        return 300;
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    imageSrc() {
      if (this.src && this.src !== "") {
        return this.src;
      }
      return "";
    },
  },
  methods: {
    async onInputChange(event) {
      try {
        if (event.target.files && event.target.files.length > 0) {
          this.loading = true;
          const file = event.target.files[0];
          // Validate image size
          const MAX_SIZE = 1;
          if (file.size / 1024 / 1024 > MAX_SIZE) {
            this.loading = false;
            this.$refs.fileInput.value = "";
            const error = {
              title: "File size validation",
              text: `File size limit of ${MAX_SIZE} mb exceeded.`,
            };
            this.$emit("error", error);
          }
          // Upload image to imgur
          this.$emit("imageUploaded", "");
          const data = await uploadImage(file);
          this.$emit("imageUploaded", data.link);
        }
      } catch (error) {
        console.error(error);
        this.$emit("error", error);
        this.loading = false;
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    onImageLoad() {
      this.loading = false;
    },
    onImageError() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#imageContainer {
  // min-height: 200px;
  // min-width: 400px;
  border: 1px dashed #aba5a5;
  // margin: auto;
  position: relative;
  #imageControls {
    position: absolute;
    bottom: 0%;
    left: 0%;
    background-color: rgba(141, 145, 142, 0.5);
  }
}
</style>
