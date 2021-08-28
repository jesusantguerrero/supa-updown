<template>
    <div class="mt-5 text-left">
        <h4 class="text-xl font-bold text-gray-500"> Past incidents </h4> 
        <div class="pt-5 space-y-2">
            <div v-for="month in orderedIncidents">
                <h4 class="pb-2 mb-5 text-2xl font-bold border-b"> {{ month.label }}</h4>
                <div class="space-y-5">
                    <div 
                        v-for="incident in month.incidents" 
                        class="px-2 py-1 cursor-pointer hover:shadow-md"
                        @click="goTo(incident.id)"
                    >
                      <h4 class="font-bold">{{ incident.title }}</h4>
                      <p>{{ incident.description }}</p>
                      <small class="font-bold"> {{ formatDate(incident.date) }}</small>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script setup>
import { computed } from 'vue';
import { format } from "date-fns"
import { useRouter } from "vue-router";

const props = defineProps({
    incidents: {
        type: Array,
        default: () => []
    }
});

const orderedIncidents = computed(() => {
    const orderedIncidents = props.incidents.sort((a, b) => a.date < b.date ? 1 : -1);
    return orderedIncidents.reduce((acc, incident) => {
        const date = format(new Date(incident.date), 'MMMM yyyy');
        if (acc[date]) {
            acc[date].incidents.push(incident);
        } else {
            acc[date] = {
                label: date,
                incidents: [incident],
            }
        }
        return acc;
    }, {});
});

const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, HH:mm');
}

const { push } = useRouter();
const goTo = (id) => {
    push({
        name: 'view-incident',
        params: {
            id
        }
    });
}
</script>