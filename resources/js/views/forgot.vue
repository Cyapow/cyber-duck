<script>
import Layout from '../layouts/main.vue'
import { authMethods } from '../store/helpers'

export default {
  page: {
    title: 'Forgot Password',
  },
  components: { Layout },
  data() {
    return {
      email: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
    }
  },
  methods: {
    ...authMethods,
  },
}
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
                  { 'border-red-500': errors[0] },
                ]"
                id="input-email"
                v-model="email"
              />
              <p class="text-red-500 text-xs italic">{{ errors[0] }}</p>
            </ValidationProvider>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                :disabled="tryingToLogIn"
              >
                Send
              </button>
              <router-link
                to="/login"
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Login
              </router-link>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </Layout>
</template>
