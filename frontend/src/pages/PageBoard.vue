<template>
  <div class="py-2 mt-10 px-52">
    <page-form
      v-if="sites.length"
      :sites="sites"
      @submit="addPage"
    />
  </div>
</template>

<script setup>
import { reactive, nextTick } from 'vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import PageForm from '../components/page/PageForm.vue';
import { useSiteApi, usePageApi } from '../utils/useApi';

const  { getAll } = useSiteApi();
const  { add, update } = usePageApi();

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

const message = useMessage();
const { push } = useRouter();

const addPage = (page) => {
  const saveMethod = page.id ? update : add;
  const saveMessage = page.id ? 'page Updated' : 'Page created';
  saveMethod(page).then(() => {
    message.info(saveMessage);
    nextTick(() => {
      push('/dashboard');
    });
  }).catch((error) => {
    message.error(error.description || error.message);
  });
}
</script>
