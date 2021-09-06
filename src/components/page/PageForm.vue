<template>
 <avatar v-model:path="form.logo" />
 <at-field label="Title">
    <at-input v-model="form.title" placeholder="Title" />
 </at-field>
 <at-field label="Slug">
    <at-input v-model="form.slug" placeholder="Slug" @input="slugTouched = true"/>
 </at-field>
 <at-field label="Description">
    <at-input v-model="form.description" placeholder="Description" />
 </at-field>
 <div class="flex justify-between">
    <at-field label="Available pages" class="w-full">
        <div v-for="site in form.sites" :key="site.title" class="flex items-center w-full">
            <at-switch v-model="site.selected" />
            <site-item :item="site"  class="w-full" />
        </div>
    </at-field>
 </div>
 <at-button @click="onSubmit" type="success">Submit</at-button>
</template>

<script setup>
import { reactive, watch, watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import { AtField, AtInput, AtTextarea, AtButton, AtSwitch } from "atmosphere-ui";
import { usePageApi, useForm } from "../../utils";
import Avatar from "../Avatar.vue";
import SiteItem  from "../site/SiteItem.vue";

const props = defineProps({
    sites: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['submit']);

const form = useForm({
    id: null,
    slug: "",
    logo: "",
    title: "",
    description: "",
    sites: props.sites || []
});

const { params } = useRoute();
const { get } = usePageApi();

const setForm = (page) => {
    const selected = page.page_sites.map(pSite => pSite.site_id);
    form.id = page.id;
    form.slug = page.slug;
    form.logo = page.logo;
    form.title = page.title;
    form.description = page.description;
    form.sites = form.sites.map(site => ({
        ...site,
        selected: selected.includes(site.id),
    })).sort((a, b) => b.selected - a.selected);
}
const slugTouched = ref(false);
watch(form, () => {
    if (!form.id && form.title && !slugTouched.value) {
        form.slug = form.title.toLowerCase().replace(/\s/g, '-');
    } else if (form.slug) {
        slugTouched.value = false;
    }
}, { deep: true, immediate: true });

watch(params.id, (value) => {
    if (params.id) {
        get(params.id).then(setForm);
    } else {
        form.reset();
    }
}, { immediate : true })

const onSubmit = () => {
    form.sites = form.sites.filter(site => site.selected);
    const formData = form.data()
    if (!formData.id) delete formData.id;
    emit('submit', formData)
}
</script>