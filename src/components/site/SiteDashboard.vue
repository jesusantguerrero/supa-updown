<template>
    <div class="flex justify-between mb-2" v-if="!disabled">
        <div class=""> 
            <input v-model="state.search" type="search" class="h-8 px-3 py-1 focus:outline-none" :placeholder="state.searchLabel">
        </div>
    </div>
    <div class="border divide-y divide-gray-200 shadow-lg">
        <site-item 
            v-for="site in state.filteredSites" 
            :key="site.title" 
            :item="site" 
            :show-controls="!disabled" 
            @delete="$emit('delete', $event)"
        />
        <site-item-form @submit="$emit('submit', $event)" v-if="!disabled" />
    </div>
</template>

<script setup>
import SiteItem from './SiteItem.vue';
import SiteItemForm from './SiteItemForm.vue';
import { reactive, computed } from "@vue/reactivity";

const props = defineProps({
    sites: {
        type: Array,
        default: () => [],
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});

defineEmits(['delete']);

const state = reactive({
    searchLabel: computed(() => {
        return  `Search ${props.sites.length} check(s)`;
    }),
    search: "",
    filteredSites: computed(() => {
        return props.sites.filter(site => {
            return site.url.toLowerCase().indexOf(state.search) > -1;
        });
    })
})

</script>