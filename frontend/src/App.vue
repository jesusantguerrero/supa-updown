<template>
  <app-header v-if="supabaseState.user.email" />
  <router-view />
</template>


<script setup>
  import AppHeader from './components/AppHeader.vue';
  import { supabaseState, useSupabase } from './utils/useSupabase';
  import { avoidLoginRoutes } from  './router';
  import { useRoute } from 'vue-router';  
  const { initSupabase } = useSupabase();


  initSupabase(avoidLoginRoutes.bind(null, useRoute()));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>