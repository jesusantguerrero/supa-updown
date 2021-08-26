<template>
<div>
  <div class="flex justify-between p-5 font-bold text-white bg-gray-700 pb-14 md:px-52">
    <h1 class="text-lg text-white md:text-3xl"> Supa up </h1> 
    <div class="text-right">
      Status Page
      <small class="block"> {{ formattedDate }} </small>
    </div>
  </div>

  <!-- status page header -->
  <div class="px-5 py-2 mt-10 text-center md:px-52">
    <div class="flex flex-col justify-between md:flex-row md:flex">
      <div class="flex text-left">
        <Avatar 
          v-model:path="page.logo" 
          size="100px" 
          class="mr-5"
          v-if="page.logo"
          :disabled="true"
        />          
        <div class="{'ml-5'">
          <h2 class="text-lg font-bold text-gray-500 md:text-3xl"> {{ page.title }}</h2>
          <h3 class="mt-1 text-lg font-bold text-gray-600"> {{ page.description }}</h3>
        </div>
      </div>
      <div class="mt-5 md:mt-0">
        <at-button class="font-bold text-green-500 bg-green-100 border border-green-400"> Subscribe to updates </at-button>
      </div>
    </div>

    <!-- sites -->
    <div class="mt-10">
      <site-dashboard
        :sites="page.sites"
        :disabled="true"
      />
    </div>

    <!--  incidents -->
    <div class="mt-5 text-left">
      <h4 class="text-xl font-bold text-gray-500"> Past incidents </h4> 
      <div class="pt-5 space-y-2">
        <div v-for="incident in page.incidents">
          <h4 class="font-bold">{{ incident.title }}</h4>
          <p>{{ incident.description }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import SiteDashboard from '../components/site/SiteDashboard.vue';
import Avatar from "../components/Avatar.vue";
import { usePageApi } from '../utils/useApi';
import { reactive } from '@vue/reactivity';
import { useNow } from "@vueuse/core";
import { format } from "date-fns";
import { computed, onMounted } from 'vue-demi';
import { AtButton } from 'atmosphere-ui';
import { useRoute } from 'vue-router';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const  { get, getSites, getIncidents } = usePageApi();

const page = reactive({
  logo: '',
  title: '',
  description: '',
  date: '',
  sites: []
});

const { params } = useRoute();
get(params.page).then( async pageData => {
  page.logo = pageData.logo;
  page.title = pageData.title;
  page.description = pageData.description;
  page.sites = await getSites(params.page);
  page.incidents = await getIncidents(params.page);
});


const now = useNow();
const formattedDate = computed(() => format(now.value, 'iiii dd, MMMM yyyy, h:mm:ss a'))
</script>
