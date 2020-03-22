<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12 px-5 pb-5">
          <v-img contain height="250px" :src="logo"></v-img>
          <v-card-text>
            <v-form ref="form" v-model="formValid">
              <v-text-field
                label="Email"
                name="login"
                prepend-icon="fa-user"
                type="text"
                v-model="email"
                :rules="emailRules"
              />
              <v-text-field
                id="password"
                label="Password"
                name="password"
                prepend-icon="fa-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                :rules="passwordRules"
              />
              <v-row>
                <v-col class="pa-0 pr-3">
                  <a class="float-right">Olvidé mi contraseña</a>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              block
              :loading="loading"
              :disabled="disabled"
              @click="login"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      logo:
        "https://s3.eu-west-1.amazonaws.com/picker-bkt/production/user/original_97GYVhZoTw1584807625319.jfif",
      showPassword: false,
      loading: false,
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [v => !!v || "Password is required"],
      formValid: false,
    };
  },
  computed: {
    disabled() {
      return this.loading || !this.formValid;
    },
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const payload = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("user/loginAction", payload);
        this.$router.push({ name: "materials" });
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
  },
};
</script>
