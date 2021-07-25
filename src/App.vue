<template>
  <app-header v-if="supabaseState.user.email" />
  <router-view />
</template>


<script setup>
  import runBackground from '../script';
  import AppHeader from './components/AppHeader.vue';
  import { useSupabase, supabaseState } from './utils/useSupabase';

  const { supabase } = useSupabase();

  supabase.auth.onAuthStateChange((_, session) => {
    supabaseState.user = session.user;
    runBackground()
  })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
