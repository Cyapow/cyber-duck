<template>
  <div
    :class="
      sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
    "
    class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center justify-center mt-8">
      <div class="flex items-center">
        <span class="text-white text-2xl mx-2 font-semibold">Dashboard</span>
      </div>
    </div>

    <nav class="mt-10">
      <router-link
        v-for="item in links"
        :to="item.link"
        class="flex items-center mt-4 py-2 px-6 border-l-4"
        :key="item.link"
        :class="[
          {
            'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100':
              currentPage === item.link,
          },
          {
            'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100':
              currentPage !== item.link,
          },
        ]"
      >
        <span class="mx-4">{{ item.name }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['sidebarOpen', 'toggleSidebar'],
  data() {
    return {
      links: [
        { link: '/', name: 'Dashboard' },
        { link: '/companies/index', name: 'Companies' },
        { link: '/employees/index', name: 'Employees' },
      ],
    }
  },
  computed: {
    currentPage() {
      return this.$route.path
    },
  },
}
</script>
