<template>
  <app-header v-if="supabaseState.user.email" />
  <router-view />
</template>


<script setup>
  import AppHeader from './components/AppHeader.vue';
  import { supabaseState } from './utils/useSupabase';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>