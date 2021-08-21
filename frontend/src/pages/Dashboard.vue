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
        <page-item  
          v-for="page in state.pages" 
          :key="page.id" 
          :page="page"
          @edit="onEditPage" 
          @delete="onDeletePage" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { AtButton } from "atmosphere-ui";
import { useMessage } from "naive-ui";
import { useSiteApi, usePageApi } from '../utils/useApi';
import SiteDashboard from '../components/site/SiteDashboard.vue';
import PageItem from '../components/page/PageItem.vue';

const  { add, getAll } = useSiteApi();
const  { getAll: getPages, remove: removePage } = usePageApi();

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

// pages
getPages().then((pageData) => {
  state.pages.push(...pageData);
});

const onEditPage = (page) => {
}

const message = useMessage();
const onDeletePage = async (pageId) => {
  const { data, error } = await removePage(pageId);
  if (error) {
    return
  }
  state.pages = state.pages.filter((page) => page.id !== pageId);
  message.success('Page deleted');
}

</script>

