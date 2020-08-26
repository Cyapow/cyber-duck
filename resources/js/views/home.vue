<script>
import Layout from "../layouts/dashboard.vue";

export default {
  page: {
    title: "Home"
  },
  components: { Layout },
  computed: {
    employeeCount() {
      return this.$store.getters["section/counter"]("employees");
    },
    companyCount() {
      return this.$store.getters["section/counter"]("companies");
    }
  }
};
</script>

<template>
  <Layout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>

        <div class="mt-4">
          <div class="flex flex-wrap -mx-6">
            <div class="w-full px-6 sm:w-1/2">
              <div
                class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
              >
                <div
                  class="p-3 rounded-full bg-indigo-600 bg-opacity-75 text-white"
                >
                  <font-awesome-icon icon="users" size="lg" />
                </div>

                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">
                    {{ employeeCount }}
                  </h4>
                  <div class="text-gray-500">Employees</div>
                </div>
              </div>
            </div>

            <div class="w-full mt-6 px-6 sm:w-1/2 sm:mt-0">
              <div
                class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
              >
                <div
                  class="p-3 rounded-full bg-orange-600 bg-opacity-75 text-white"
                >
                  <font-awesome-icon icon="building" size="lg" />
                </div>

                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">
                    {{ companyCount }}
                  </h4>
                  <div class="text-gray-500">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Layout>
</template>
