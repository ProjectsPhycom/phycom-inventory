const FormMixin = {
  data() {
    return {
      rules: {
        login: {
          email: [
            v => !!v || "Email is required",
            v => /.+@.+\..+/.test(v) || "Email must be valid",
          ],
          password: [v => !!v || "Password is required"],
        },
        item: {
          name: [
            v => !!v || "Item name is required",
            v => {
              const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+/gm;
              return (
                !regex.test(v) || "Name can only contain letters and numbers"
              );
            },
            v => v.length <= 100 || "Name can only contain 100 characters",
          ],
          model: [
            v => !!v || "Item model is required",
            v => {
              const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+/gm;
              return (
                !regex.test(v) || "Model can only contain letters and numbers"
              );
            },
            v => v.length <= 50 || "Model can only contain 50 characters",
          ],
          status: [v => !!v || "Item status is required"],
          description: [
            v => !!v || "Item description is required",
            v => {
              const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+/gm;
              return (
                !regex.test(v) ||
                "Description can only contain letters and numbers"
              );
            },
            v =>
              v.length <= 255 || "Description can only contain 255 characters",
          ],
          quantity: [
            v => {
              return v >= 0 || "Quantity cannot be less than 0";
            },
            v => {
              return v <= 1000 || "Quantity cannot be more than 1000";
            },
          ],
        },
      },
    };
  },
};

export default FormMixin;
