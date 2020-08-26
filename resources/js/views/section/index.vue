<template>
  <Layout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <div class="flex justify-between items-center">
          <h3 class="text-gray-700 text-3xl font-medium">
            {{ sectionData.titlePlural }}
          </h3>
          <router-link
            :to="`/${sectionData.route}/add`"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add new
          </router-link>
        </div>

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
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="object in data.data">
                    <td
                      v-for="item in sectionData.fields"
                      class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                    >
                      <p
                        class="text-gray-900 whitespace-no-wrap"
                        v-if="item.type === 'text'"
                      >
                        {{ object[item.column] }}
                      </p>
                      <p
                        class="text-gray-900 whitespace-no-wrap"
                        v-else-if="item.type === 'file'"
                      >
                        <a
                          :href="`/storage/logos/${object[item.column]}`"
                          target="_blank"
                          class="text-indigo-600 hover:text-indigo-900"
                          v-if="object[item.column] !== ''"
                          >View file</a
                        >
                      </p>
                      <p
                        class="text-gray-900 whitespace-no-wrap"
                        v-else-if="item.type === 'relationship'"
                      >
                        <a
                          :href="`/${item.section}/edit/${object[item.column]}`"
                          target="_blank"
                          class="text-indigo-600 hover:text-indigo-900"
                          v-if="object[item.column] !== ''"
                          >{{ getRelationshipValue(item.viewValue, object) }}</a
                        >
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
                        @click="showDeleteModal(object.id)"
                        class="ml-10 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
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
                  >
                    Prev
                  </button>
                  <button
                    v-if="data.next_page_url"
                    @click="loadPage(data.next_page_url)"
                    class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <t-modal v-model="showModal" name="delete-modal" variant="danger">
        <template v-slot:header>
          <div class="icon-box text-red-700">
            <font-awesome-icon :icon="['far', 'times-circle']" size="10x" />
          </div>
          <h4 class="mt-10 text-4xl">Are you sure?</h4>
        </template>
        <div class="text-gray-500 text-center px-20">
          <p>
            Do you really want to delete this record? This process cannot be
            undone.
          </p>
        </div>
        <template v-slot:footer>
          <button
            type="button"
            class="bg-gray-400 text-white px-10 py-3 mr-2 hover:bg-gray-600 text-lg rounded-md"
            @click="showModal = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="bg-red-700 text-white px-10 py-3 ml-2 hover:bg-red-900 text-lg rounded-md"
            @click="DeleteItem"
          >
            Delete
          </button>
        </template>
      </t-modal>
    </main>
  </Layout>
</template>

<script>
import Layout from "../../layouts/dashboard";
import store from "../../store";

export default {
  name: "index",
  components: { Layout },
  data() {
    return {
      data: this.$store.getters["section/data"](
        this.$route.meta.sectionData.route
      ),
      showModal: false,
      deleting: 0,
      loadedUrl: false
    };
  },
  computed: {
    sectionData() {
      return this.$route.meta.sectionData;
    }
  },
  methods: {
    getRelationshipValue(viewValue, obj) {
      return viewValue.split(".").reduce((o, i) => o[i], obj);
    },
    loadPage(url) {
      this.loadedUrl = url;
      store
        .dispatch("section/fetchPaginated", {
          route: this.sectionData.route,
          url
        })
        .then(() => {
          this.data = this.$store.getters["section/data"](
            this.$route.meta.sectionData.route
          );
        });
    },
    showDeleteModal(id) {
      this.deleting = id;
      this.$modal.show("delete-modal");
    },
    DeleteItem() {
      store
        .dispatch("section/deleteItem", {
          id: this.deleting,
          route: this.sectionData.route
        })
        .then(() => {
          this.reloadItems();

          this.$modal.hide("delete-modal");
          this.$snotify.success(
            `${this.sectionData.title} successfully deleted!`,
            "Deleted",
            {
              timeout: 2000,
              showProgressBar: false
            }
          );
        })
        .catch(() => {
          this.$snotify.error(
            `Error deleting ${this.sectionData.title} please try again`,
            "Error",
            {
              timeout: 2000,
              showProgressBar: false
            }
          );
        });
    },
    reloadItems() {
      if (this.loadedUrl) {
        this.loadPage(this.loadedUrl);
      } else {
        store
          .dispatch("section/fetchIndex", {
            route: this.sectionData.route
          })
          .then(() => {
            this.data = this.$store.getters["section/data"](
              this.$route.meta.sectionData.route
            );
          });
      }
    }
  }
};
</script>
