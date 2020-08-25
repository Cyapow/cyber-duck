<template>
  <div id="app">
    <!--
        Even when routes use the same component, treat them
        as distinct and create the component again.
        -->
    <vue-snotify></vue-snotify>
    <RouterView :key="$route.fullPath" />
  </div>
</template>
