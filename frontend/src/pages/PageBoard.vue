<template>
  <div class="py-2 mt-10 px-52">
    <page-form 
      :sites="sites"
      @submit="addPage"
    />
  </div>
</template>

<script setup>
import PageForm from '../components/page/PageForm.vue';
import { useSiteApi, usePageApi } from '../utils/useApi';
import { reactive } from '@vue/reactivity';
const  { getAll } = useSiteApi();
const  { add } = usePageApi();

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const sites = reactive([]);

getAll().then((siteData) => {
  sites.push(...siteData)
});

const addPage = (page) => {
  add(page).then(() => {
    alert('Page created');
  }).catch((error) => {
    alert(error.description || error.message);
  });
}
</script>
