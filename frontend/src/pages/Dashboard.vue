<template>
  <div class="py-2 mt-10 px-52">
    <h2 class="px-2 text-xl font-bold"> Sites </h2>
    <site-dashboard 
      :sites="state.sites"
      :disabled="disabled"
      @submit="addSite"
    />

    <div class="mt-10">
      <h2 class="px-2 text-xl font-bold"> Pages </h2>
      <div class="mt-5 space-y-3 shadow-lg">
        <div v-for="page in state.pages" class="flex justify-between px-5 py-2 text-gray-500 cursor-pointer">
          <div>
            <h4 class="font-bold">
              <a :href="`/status/${page.id}`" target="_blank">{{ page.title }}</a>
            </h4>
            {{ page.description }}
          </div>
          <div class="space-x-2">
            <at-button type="danger">Remove</at-button>
            <at-button type="success">Edit</at-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SiteDashboard from '../components/site/SiteDashboard.vue';
import { useSiteApi, usePageApi } from '../utils/useApi';
import { AtButton } from "atmosphere-ui";
import { reactive } from 'vue';

const  { add, getAll } = useSiteApi();
const  { getAll: getPages } = usePageApi();

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  sites: [],
  pages: []
});

getAll().then((siteData) => {
  state.sites.push(...siteData)
});

const addSite = (site) => {
  add(site).then(() => {
    state.sites.push(site);
  }).catch((error) => {
    alert(error.description || error.message);
  });
}

getPages().then((pageData) => {
  state.pages.push(...pageData);
});

</script>

