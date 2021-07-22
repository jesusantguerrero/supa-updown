<template>
  <div class="p-5 font-bold text-white bg-green-500">
    Up and running
  </div>
  <div class="py-2 px-52">
    <site-dashboard 
      :sites="sites"
      @submit="addSite"
    />
  </div>
</template>

<script lang="ts" setup>
import SiteDashboard from './site/SiteDashboard.vue';
import { useSiteApi } from '../utils/useApi';
import { reactive } from '@vue/reactivity';
const  { add, getAll } = useSiteApi();

const sites = reactive(getAll());
const addSite = (site) => {
  add(site).then(() => {
    sites.push(site);
  });
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
