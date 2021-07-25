<template>
  <div class="flex items-center px-5 py-3 space-x-10" @submit.prevent="submit">
    <div class="flex">
        <div><i class="fa fa-lock"></i></div>
        <div class="">
            <span class="text-green-500">{{ item.protocol }}</span>
            <span>{{ item.url }}</span>
        </div>

    </div>
    <div>
        <div class="px-2 py-1 font-bold text-green-500 bg-green-100" v-if="item.lastResponse">
            <span>{{ item.lastResponse.status }}</span>
            <span class="ml-1"> {{ item.lastResponse.message }}</span>
        </div>
    </div>
    <div class="w-1/2">
        <div class="flex items-center text-sm text-gray-400 uppercase">
            <span class="inline-block w-10">Uptime</span>
            <site-uptime :value="uptime" class="ml-5"/></div>
        <div class="flex items-center text-sm text-gray-400 uppercase">
            <span class="inline-block w-10">Apdex</span>
            <site-uptime :value="uptime" class="ml-5"/>
        </div>
    </div>
    <div>
        <span>10 min</span>
    </div>
    <div>
        <span> {{ uptimePercent }}%</span>
        <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import SiteUptime  from './SiteUptime.vue';

export interface SiteItemData {
    protocol: 'http://' | 'https://' | 'tcp://' | 'icmp://',
    url: string,
    title: string,
    contains: string,
    interval: number,
    apdex: number,
    httpRequest: {
        method: string,
        headers: { [key: string]: string },
    },
    notifiable: string[]
}

export default defineComponent({
    components: { SiteUptime },
    props: {
        item: {
            type: Object,
            required: true,            
        },
    },
    setup(props, { emit }) {
        const state = reactive({
            uptime: computed(() => {
                return props.item.responses ? props.item.responses.map((res) => res && res.status).length : [];
            }),
            uptimePercent: computed(() => {
                const percent = state.uptime / 24 * 100;
                return percent.toFixed(2);
            })
        })

        return {
            ...toRefs(state),
        }
    },
})
</script>


<style>

</style>