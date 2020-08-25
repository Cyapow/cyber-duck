<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600"
  >
    <div class="flex items-center">
      <button
        @click="toggleSidebar(true)"
        class="text-gray-500 focus:outline-none lg:hidden"
      >
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          @click="toggleDropdown(!dropdownOpen)"
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
        >
          <img
            class="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
            alt="Your avatar"
          />
        </button>

        <div
          @click="toggleDropdown(false)"
          class="fixed inset-0 h-full w-full z-10"
          :style="dropdownOpen ? '' : 'display: none;'"
        ></div>

        <div
          class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
          :style="dropdownOpen ? '' : 'display: none;'"
        >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            @click.prevent="logout"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  props: ["sidebarOpen", "toggleSidebar"],
  data() {
    return {
      dropdownOpen: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logOut").then(() => {
        this.$router.push("/login");
      });
    },
    toggleDropdown(value) {
      this.dropdownOpen = value;
    }
  }
};
</script>
