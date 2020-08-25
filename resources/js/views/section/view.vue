<template>
  <Layout> </Layout>
</template>

<script>
import Layout from "../../layouts/dashboard.vue";

export default {
  name: "edit",
  components: { Layout },
  data() {
    return {
      email: "",
      password: "",
      authError: null,
      tryingToLogIn: false,
      selectedFiles: false
    };
  },
  methods: {
    tryToLogIn(e) {
      console.log(this);
    },
    async Images_onFileChanged(e, validate) {
      const { valid } = await validate(e);
      console.log(valid);
      if (valid) {
        this.selectedFiles = e.target.files[0];
      }
    }
  }
};
</script>
