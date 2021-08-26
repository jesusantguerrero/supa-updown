<template>
  <div class="py-2 mt-10 mb-20 px-52">
    <incidents-form
      v-if="pages.length"
      :pages="pages"
      @submit="addIncident"
    />
  </div>
</template>

<script setup>
import { reactive, nextTick } from 'vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import IncidentsForm from '../components/incidents/Form.vue';
import { useIncidentApi, usePageApi } from '../utils/useApi';

const  { getAll } = usePageApi();
const  { add, update } = useIncidentApi();

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const pages = reactive([]);

getAll().then((pageData) => {
  pages.push(...pageData);
});

const message = useMessage();
const { push } = useRouter();

const addIncident = (incident) => {
  const saveMethod = incident.id ? update : add;
  const saveMessage = incident.id ? 'Incident updated' : 'Incident created';
  saveMethod(incident).then(() => {
    message.info(saveMessage);
    nextTick(() => {
      push('/dashboard');
    });
  }).catch((error) => {
    message.error(error.description || error.message);
  });
}
</script>
