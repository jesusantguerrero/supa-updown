<template>
    <div class="flex justify-between mb-2" v-if="!disabled">
        <div class=""> 
            <input type="search" class="h-8 px-3 py-1 focus:outline-none" :placeholder="state.searchLabel">
        </div>
    </div>
    <div class="border divide-y divide-gray-200 shadow-lg">
        <site-item :item="site" v-for="site in sites" :key="site.title" :show-controls="!disabled" />
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

const state = reactive({
    searchLabel: computed(() => {
        return  `Search ${props.sites.length} check(s)`;
    })
})

</script>


<style>

</style>