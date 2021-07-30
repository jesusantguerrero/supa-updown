<template>
  <app-header v-if="supabaseState.user.email" />
  <router-view />
</template>


<script setup>
  import { useRouter } from 'vue-router';
  import AppHeader from './components/AppHeader.vue';
  import { useSupabase, supabaseState } from './utils/useSupabase';

  const { supabase } = useSupabase();
   const { push } = useRouter();

  supabase.auth.onAuthStateChange((_, session) => {
    supabaseState.user = session.user;
    if (session.user) {
      push({ name: 'dashboard'});
    }
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