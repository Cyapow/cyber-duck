<template>
  <Layout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-gray-700 text-3xl font-medium">
          {{ sectionData.titlePlural }}
        </h3>

        <div class="mt-8">
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div
              class="inline-block min-w-full shadow rounded-lg overflow-hidden"
            >
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      v-for="item in sectionData.fields"
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {{ item.title }}
                    </th>
                    <th
                      class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      colspan="2"
                    >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="object in data.data">
                    <td
                      v-for="item in sectionData.fields"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p class="text-gray-900 whitespace-no-wrap">
                        {{ object[item.column] }}
                      </p>
                    </td>
                    <td
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                      <router-link
                        :to="`/${sectionData.route}/edit/${object.id}`"
                        class="text-indigo-600 hover:text-indigo-900"
                        >Edit</router-link
                      >
                      <button
                        type="button"
                        @click="delete object.id"
                        class="ml-10 text-red-600 hover:text-red-900"
                        >Delete</button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
              >
                <span
                  class="text-xs xs:text-sm text-gray-900"
                  v-if="data.data.length > 0"
                  >Showing {{ data.from }} to {{ data.to }} of
                  {{ data.total }} Entries</span
                >
                <span class="text-xs xs:text-sm text-gray-900" v-else
                  >No {{ sectionData.titlePlural }} found.</span
                >

                <div class="inline-flex mt-2 xs:mt-0">
                  <button
                    v-if="data.prev_page_url"
                    class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                    @click="loadPage(data.prev_page_url)"
                    >Prev</button
                  >
                  <button
                    v-if="data.next_page_url"
                    @click="loadPage(data.next_page_url)"
                    class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                    >Next</button
                  >
                </div>
              </div>
            </div>
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
  data() {
    return {
      data: this.$store.getters['section/data'](
        this.$route.meta.sectionData.route
      ),
    }
  },
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
