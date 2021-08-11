<template>
  <div class="flex justify-between p-5 px-20 font-bold text-gray-700">
    <h1 class="text-3xl text-gray-600"> Up and running </h1> 
    <div class="text-right">
      Status Page
      <small class="block"> {{ formattedDate }} </small>
    </div>
  </div>
  <div class="py-2 text-center px-52">
    <h2 class="text-3xl font-bold text-gray-500"> Zenlabs </h2>
    <h3 class="mt-3 mb-10 text-lg font-bold text-gray-600"> List of our services</h3>
    <site-dashboard 
      :sites="sites"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import SiteDashboard from './site/SiteDashboard.vue';
import { useSiteApi } from '../utils/useApi';
import { reactive } from '@vue/reactivity';
import { useNow } from "@vueuse/core";
import { format } from "date-fns";
import { computed } from 'vue-demi';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const  { getAll } = useSiteApi();
const sites = reactive([]);

getAll().then((siteData) => {
  sites.push(...siteData)
});

const now = useNow();

const formattedDate = computed(() => format(now.value, 'iiii dd, MMMM yyyy, h:mm:ss a'))
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
