<template>
  <div id="app">
    <!--
        Even when routes use the same component, treat them
        as distinct and create the component again.
        -->
    <RouterView :key="$route.fullPath" />
  </div>
</template>
