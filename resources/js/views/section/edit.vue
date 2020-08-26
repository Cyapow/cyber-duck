<template>
  <Layout>
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-gray-700 text-3xl font-medium">
          Edit {{ sectionData.title }}
        </h3>
        <div class="mt-4">
          <div class="p-6 bg-white rounded-md shadow-md">
            <ValidationObserver v-slot="{ handleSubmit }">
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
                v-if="error"
              >
                <span class="block sm:inline">{{ error }}</span>
              </div>
              <form @submit.prevent="handleSubmit(submitForm)">
                <div v-for="item in sectionData.fields" class="mb-4">
                  <ValidationProvider
                    v-if="item.type === 'file'"
                    tag="div"
                    :rules="item.validation"
                    :name="item.title"
                    v-slot="{ validate, errors }"
                  >
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="`input-${item.column}`"
                      >{{ item.title }}</label
                    >
                    <p class="text-gray-900 whitespace-no-wrap">
                      <a
                        :href="`/storage/logos/${object[item.column]}`"
                        target="_blank"
                        class="text-indigo-600 hover:text-indigo-900"
                        v-if="object[item.column] !== ''"
                        >View file</a
                      >
                    </p>
                    <input
                      type="file"
                      :class="[
                        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                        { 'border-red-500': errors[0] }
                      ]"
                      @change="
                        File_onFileChanged($event, item.column, validate)
                      "
                      :id="`input-${item.column}`"
                    />
                    <p class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                  </ValidationProvider>
                  <ValidationProvider
                    v-else-if="item.editable !== false"
                    tag="div"
                    :rules="item.validation"
                    :name="item.title"
                    v-slot="{ errors }"
                  >
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="`input-${item.column}`"
                      >{{ item.title }}</label
                    >
                    <input
                      type="text"
                      :class="[
                        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                        { 'border-red-500': errors[0] }
                      ]"
                      :id="`input-${item.column}`"
                      v-model="editData[item.column]"
                    />
                    <p class="text-red-500 text-xs italic">{{ errors[0] }}</p>
                  </ValidationProvider>
                  <div v-else>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="`input-${item.column}`"
                      >{{ item.title }}</label
                    >
                    <input
                      type="text"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      :id="`input-${item.column}`"
                      v-model="editData[item.column]"
                      disabled
                    />
                  </div>
                </div>

                <div class="flex justify-end mt-4">
                  <button
                    class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
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
      error: "",
      editData: {},
      object: this.$route.meta.object
    };
  },
  computed: {
    sectionData() {
      return this.$route.meta.sectionData;
    }
  },
  created() {
    this.sectionData.fields.map(field => {
      this.editData[field.column] = this.object[field.column];
    });
  },
  methods: {
    async File_onFileChanged(e, column, validate) {
      const { valid } = await validate(e);
      if (valid) {
        this.editData[column] = e.target.files[0];
      }
    },
    submitForm() {
      const data = new FormData();
      this.sectionData.fields.map(field => {
        const editable = field.editable !== false;
        if (editable) {
          if (field.type === "file") {
            if (typeof this.editData[field.column] == "object") {
              data.set(
                field.column,
                this.editData[field.column],
                this.editData[field.column].name
              );
            }
          } else {
            data.set(field.column, this.editData[field.column]);
          }
        }
      });

      store
        .dispatch("section/updateItem", {
          route: this.sectionData.route,
          id: this.$route.meta.object.id,
          data: data
        })
        .then(() => {
          store
            .dispatch("section/fetchItem", {
              route: this.sectionData.route,
              id: this.$route.meta.object.id
            })
            .then(response => {
              this.object = response.data;
            });
          this.$snotify.success(
            `${this.sectionData.title} successfully saved!`,
            "Saved",
            {
              timeout: 2000,
              showProgressBar: false
            }
          );
        })
        .catch(() => {
          this.$snotify.error(
            `Error saving ${this.sectionData.title} please try again`,
            "Error",
            {
              timeout: 2000,
              showProgressBar: false
            }
          );
        });
    }
  }
};
</script>
