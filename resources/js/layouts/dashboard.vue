<template>
  <div>
    <div class="flex h-screen bg-gray-200">
      <div
        :class="sidebarOpen ? 'block' : 'hidden'"
        @click="toggleSidebar(false)"
        class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      ></div>
      <Sidebar :sidebarOpen="sidebarOpen" :toggleSidebar="toggleSidebar" />
      <div class="flex-1 flex flex-col overflow-hidden">
        <AppHeader :sidebarOpen="sidebarOpen" :toggleSidebar="toggleSidebar" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/sidebar";
import AppHeader from "../components/AppHeader";
export default {
  name: "loggedIn",
  components: { Sidebar, AppHeader },
  data() {
    return {
      sidebarOpen: false
    };
  },
  methods: {
    toggleSidebar(value) {
      this.sidebarOpen = value;
    }
  }
};
</script>
