<template>
  <div class="py-2 mt-10 mb-20 px-52">
    <incidents-form
      v-if="state.pages.length"
      :pages="state.pages"
      :incidents="state.incidents"
      @submit="addIncident"
    />
  </div>
</template>

<script setup>
import { reactive, nextTick, computed } from 'vue';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
import IncidentsForm from '../../components/incidents/Form.vue';
import { useIncidentApi, usePageApi } from '../../utils/useApi';

const  { getAll: getPages } = usePageApi();
const  { add, update, getAll: getIncidents } = useIncidentApi();

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  pages: [],
  incidents: [],
  loading: {
    pages: true,
    incidents: true,
    all: computed(() => state.loading.pages && state.loading.incidents)
  },
});

getPages().then((pageData) => {
  state.pages.push(...pageData);
});

getIncidents('opened').then((incidents) => {
  state.incidents.push(...incidents);
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
