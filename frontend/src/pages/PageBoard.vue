<template>
  <div class="p-5 font-bold text-white bg-green-500">
    Create a new page
  </div>
  <div class="py-2 px-52">
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
