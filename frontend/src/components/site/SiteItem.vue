<template>
  <div class="flex items-center px-5 py-3 space-x-10" @submit.prevent="submit">
    <div class="flex w-2/12">
        <div><i class="fa fa-lock"></i></div>
        <div class="">
            <span class="text-green-500">{{ item.protocol }}</span>
            <span>{{ item.url }}</span>
        </div>
    </div>
    <div class="w-1/12">
        <div class="w-12 px-2 py-1 font-bold rounded-md" :class="statusColors" v-if="item.lastResponse">
            <span>{{ item.lastResponse.status }}</span>
            <span class="ml-1"> {{ item.lastResponse.message }}</span>
        </div>
    </div>
    <div class="w-6/12">
        <div class="flex items-center text-sm text-gray-400 uppercase">
            <span class="inline-block w-16">Uptime</span>
            <site-uptime :responses="item.responses" class="h-5 ml-5 opacity-60"/>
        </div>
        <div class="flex items-center text-sm text-gray-400 uppercase">
            <span class="inline-block w-16">Apdex</span>
            <site-uptime :responses="item.responses" class="gap-1 ml-5 opacity-60"/>
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

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import SiteUptime  from './SiteUptime.vue';

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
            }),
            statusColors: computed(() => {
                const colors = {
                    500: 'bg-red-100 text-red-500',
                    200: 'bg-green-100 text-green-500',
                }
                return colors[props.item.lastResponse.status] || colors[500];
            })
        })



        return {
            ...toRefs(state),
        }
    },
})
</script>