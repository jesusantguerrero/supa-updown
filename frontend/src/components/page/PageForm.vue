<template>
 <avatar v-model:path="form.logo" />
 <at-field label="Title">
    <at-input v-model="form.title" placeholder="Title" />
 </at-field>
 <at-field label="Description">
    <at-input v-model="form.description" placeholder="Description" />
 </at-field>
 <div class="flex justify-between">
    <at-field label="Available pages" class="w-full">
        <div v-for="site in sites" :key="site.title" class="flex items-center">
            <at-switch v-model="site.selected" />
            <site-item :item="site"  />
        </div>
    </at-field>
 </div>
 <at-button @click="onSubmit" type="success">Submit</at-button>
</template>

<script setup>
import Avatar from "../Avatar.vue";
import { AtField, AtInput, AtTextarea, AtButton, AtSwitch } from "atmosphere-ui";
import { reactive } from "vue";
import SiteItem  from "../site/SiteItem.vue";

const props = defineProps({
    sites: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['submit']);

const form = reactive({
    logo: "",
    title: "",
    description: "",
    sites: [],
})

const onSubmit = () => {
    form.sites = props.sites.filter(site => site.selected);
    emit('submit', form)
}
</script>