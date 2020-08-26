<script>
import Layout from "../layouts/main.vue";
import { authMethods } from "../store/helpers";

export default {
  page: {
    title: "Log in"
  },
  components: { Layout },
  data() {
    return {
      email: "",
      password: "",
      authError: null,
      tryingToLogIn: false
    };
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the email
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true;
      // Reset the authError if it existed.
      this.authError = null;
      return this.logIn({
        email: this.email,
        password: this.password
      })
        .then(token => {
          this.tryingToLogIn = false;

          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: "home" });
        })
        .catch(error => {
          this.tryingToLogIn = false;
          this.authError = "These credentials do not match our records.";
        });
    }
  }
};
</script>

<template>
  <Layout>
    <div class="container mx-auto mt-20">
      <div class="w-full max-w-xs mx-auto">
        <ValidationObserver v-slot="{ handleSubmit }">
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
            v-if="authError"
          >
            <span class="block sm:inline">{{ authError }}</span>
          </div>
          <form
            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            @submit.prevent="handleSubmit(tryToLogIn)"
          >
            <ValidationProvider
              tag="div"
              class="mb-4"
              rules="required|email"
              name="Email"
              v-slot="{ errors }"
            >
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="input-email"
                >Email</label
              >
              <input
                type="email"
                :class="[
                  'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                  { 'border-red-500': errors[0] }
                ]"
                id="input-email"
                v-model="email"
              />
              <p class="text-red-500 text-xs italic">{{ errors[0] }}</p>
            </ValidationProvider>
            <ValidationProvider
              tag="div"
              class="mb-6"
              rules="required|min:6"
              name="Password"
              v-slot="{ errors }"
            >
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="input-password"
                >Password</label
              >
              <input
                type="password"
                :class="[
                  'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                  { 'border-red-500': errors[0] }
                ]"
                id="input-password"
                v-model="password"
              />
              <p class="text-red-500 text-xs italic">{{ errors[0] }}</p>
            </ValidationProvider>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                :disabled="tryingToLogIn"
              >
                Log in
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </Layout>
</template>
