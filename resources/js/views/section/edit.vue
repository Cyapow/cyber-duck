<template>
  <Layout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-gray-700 text-3xl font-medium">
          Edit {{ sectionData.title }}
        </h3>
        <div class="mt-4">
          <div class="p-6 bg-white rounded-md shadow-md">
            <h2 class="text-lg text-gray-700 font-semibold capitalize"
              >Account settings</h2
            >

            <form>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div>
                  <label class="text-gray-700" for="username">Username</label>
                  <input
                    class="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                    type="text"
                  />
                </div>

                <div>
                  <label class="text-gray-700" for="emailAddress"
                    >Email Address</label
                  >
                  <input
                    class="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                    type="email"
                  />
                </div>

                <div>
                  <label class="text-gray-700" for="password">Password</label>
                  <input
                    class="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                    type="password"
                  />
                </div>

                <div>
                  <label class="text-gray-700" for="passwordConfirmation"
                    >Password Confirmation</label
                  >
                  <input
                    class="form-input w-full mt-2 rounded-md focus:border-indigo-600"
                    type="password"
                  />
                </div>
              </div>

              <div class="flex justify-end mt-4">
                <button
                  class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  >Save</button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '../../layouts/dashboard'
import store from '../../store'

export default {
  name: 'index',
  components: { Layout },
  computed: {
    sectionData() {
      return this.$route.meta.sectionData
    },
  },
  methods: {
    loadPage(url) {
      store
        .dispatch('section/fetchPaginated', {
          route: this.sectionData.route,
          url,
        })
        .then(() => {
          this.data = this.$store.getters['section/data'](
            this.$route.meta.sectionData.route
          )
        })
    },
  },
}
</script>
