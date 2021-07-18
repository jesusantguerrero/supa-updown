<template>
    <div class="flex justify-between">
        <div> 
            <input type="search" class="focus:outline-none px-3 py-1" placeholder="Search 4 checks">
        </div>
        <div> 
            <label for="" class="text-gray-400">Order:</label>
            <select class="focus:outline-none px-3 py-1">
                <option value="">Frequency</option> 
                <option value="">Status</option> 
                <option value="">Alias</option> 
                <option value="">URL</option> 
            </select>
        </div>
    </div>
    <div class="border shadow-lg divide-y divide-gray-200">
        <site-item :item="site" v-for="site in sites" :key="site.title" />
        <site-item-form @submit="$emit('submit', $event)"></site-item-form>
    </div>
</template>

<script lang="ts" setup>
import SiteItem from './SiteItem.vue';
import SiteItemForm from './SiteItemForm.vue';
import { reactive } from "@vue/reactivity";

const props = defineProps({
    sites: {
        type: Array,
        default: () => [],
    }
});

</script>


<style>

</style>