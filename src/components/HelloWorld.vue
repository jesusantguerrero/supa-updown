<template>
  <div class="bg-green-500 font-bold text-white p-5">
    Up and running
  </div>
  <div class="px-52 py-2">
    <site-dashboard 
      @submit="addSite"
    />
  </div>
</template>

<script lang="ts" setup>
import SiteDashboard from './site/SiteDashboard.vue';
import { useSiteApi } from '../utils/useApi';
const  { add } = useSiteApi();

const addSite = (site) => {
  add(site).then(() => {
    alert('Saved');
  })
}

</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
