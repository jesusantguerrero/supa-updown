<template>
    <div class="mt-10">
        <incident-state :incident="incident" v-if="incident" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from 'vue-router';
import incidentState from '../../components/incidents/State.vue';
import { useIncidentApi } from '../../utils/useApi';

const { get, getUpdates } = useIncidentApi();

const incident = ref(null);
const { params } = useRoute();
get(params.id).then(async ( data ) => {
    incident.value = data;
    incident.value.updates = await getUpdates(params.id);
});
</script>