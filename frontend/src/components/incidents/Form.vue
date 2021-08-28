<template>
 <div class="max-w-md mx-auto text-center" v-if="!form.page">
    <h2 class="mb-5 text-2xl font-bold text-gray-500"> Select a page for the incident </h2>
    <div class="space-y-2">
        <template v-for="page in pages" :key="page.id">
            <div 
                class="py-3 mx-5 bg-white border shadow-md cursor-pointer" 
                @click="selectPage(page)"
            >
                {{ page.title }}
            </div>
            <div class="pb-5 mx-5">
                <div v-for="incident in incidents" class="transition cursor-pointer hover:font-bold" @click="selectIncident(incident, page)">
                    <span class="text-gray-500">{{ incident.title }}</span>
                </div>
            </div>
        </template>
    </div>
 </div>
 <form v-else @submit.prevent="onSubmit">
    <at-field label="Title">
        <at-input v-model="form.title" placeholder="Title" />
    </at-field>
    <at-field label="Status">
        <at-input v-model="form.status" placeholder="Status" />
    </at-field>
    <at-field label="Message">
        <at-textarea v-model="form.description" placeholder="Description" class="px-2 py-1 border-2 border-gray-200 rounded-md focus:outline-none" />
    </at-field>
    <at-field-check label="Notify subscribers" v-model="form.notify" />
    <div class="flex justify-between">
        <at-field label="Affected sites" class="w-full">
            <div v-for="site in form.sites" :key="site.title" class="flex items-center justify-between w-full">
                <at-switch v-model="site.selected" />
                <site-item :item="site"  class="w-full" />
                <div class="w-2/12 text-right" v-if="site.selected">
                    <select v-model="site.status">
                        <option v-for="status in state.siteStatus" :value="status">{{ status }}</option>
                    </select>
                </div>
            </div>
        </at-field>
    </div>
    <div class="mt-10 text-right">
        <at-button type="success">Submit</at-button>
    </div>
 </form>
</template>

<script setup>
import { reactive, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { AtField, AtInput, AtTextarea, AtButton, AtSwitch, AtFieldCheck } from "atmosphere-ui";
import { usePageApi, useForm } from "../../utils";
import Avatar from "../Avatar.vue";
import SiteItem  from "../site/SiteItem.vue";

const props = defineProps({
    pages: {
        type: Array,
        default: () => [],
    },
    incidents: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['submit']);
const state = reactive({
    siteStatus: ["OPERATIONAL", "DEGRADED", "PARTIAL", "MAJOR", "MAINTENANCE"],
});

const form = useForm({
    id: null,
    logo: "",
    title: "",
    status: "investigating",
    description: "",
    page: null,
    incident: null,
    sites: props.sites || []
});

// pages
const selectPage = (page) => {
    form.page = page;
    form.sites = page.page_sites.map(site => ({
        ...site.sites,
    }));
}

const selectIncident = (incident, page) => {
    form.page = page;
    form.sites = page.page_sites.map(site => ({
        ...site.sites,
    }));
    form.incident = incident;
    form.title = incident.title;
    form.description = incident.description;
    form.status = incident.status;
}

const { params } = useRoute();
const { get } = usePageApi();

const setForm = (page) => {
    const selected = page.page_sites.map(pSite => pSite.site_id);
    form.id = page.id;
    form.logo = page.logo;
    form.title = page.title;
    form.description = page.description;
    form.sites = form.sites.map(site => ({
        ...site,
        selected: selected.includes(site.id),
    })).sort((a, b) => b.selected - a.selected);
}

watch(params.id, (value) => {
    if (params.id) {
        get(params.id).then(setForm);
    } else {
        form.reset();
    }
}, { immediate : true })

const onSubmit = () => {
    const formData = form
    .transform((data) => {
        return {
            incident_id: data.incident?.id,
            page_id: data.page.id,
            title: data.title,
            description: data.description,
            status: data.status,
            sites: data.sites,
            notify_listeners: data.notify_listeners
        }
    })
    .submit(emit, {
        onSuccess: () => form.reset(),
    });
}
</script>