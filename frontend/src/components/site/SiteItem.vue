<template>
  <div class="flex flex-col px-5 py-3 md:space-x-10 md:items-center md:flex-row md:flex" @submit.prevent="submit">
    <div class="flex items-center justify-between md:w-3/12">
        <div class="flex">
            <img
                :src="getFavicon(value)"
                alt="favicon"
                srcset=""
                class="w-5 h-5 mr-1"
            />
            <div class="text-green-500">
                <ILock class="w-5 mr-1 fill-current" />
            </div>
            <div class="">
                <span class="text-green-500">{{ item.protocol }}</span>
                <span>{{ item.url }}</span>
            </div>
        </div>

        <div>
            <div class="w-12 px-2 py-1 ml-5 font-bold rounded-md" :class="state.statusColors" v-if="item.lastResponse">
                <span>{{ item.lastResponse.status }}</span>
                <span class="ml-1"> {{ item.lastResponse.message }}</span>
            </div>
        </div>
    </div>
    <div class="w-full md:w-6/12">
        <div class="flex items-center text-sm text-gray-400 uppercase">
            <span class="hidden w-16 md:inline-block">Uptime</span>
            <site-uptime :responses="item.responses" class="gap-0.5 md:ml-5 opacity-60"/>
        </div>
    </div>
    <div class="flex items-center justify-between w-full mt-2 md:w-3/12 md:justify-end md:mt-0 md:space-x-2">
        <div>
            <span class="font-bold text-gray-500"> <i class="mr-1 fa fa-clock" />{{ item.interval}} min</span>
        </div>
        <span class="block"> {{ state.uptimePercent }}%</span>
        <span class="font-bold text-green-500"> Operational</span>
        <n-popconfirm
            @positive-click="$emit('delete', item.id)"
            v-if="showControls"
        >
            <template #trigger>
                <at-button 
                    class="text-red-500 border border-red-500 bg-red-50"
                >
                    <i class="fa fa-trash"></i>
                </at-button>
            </template>
            Are you sure you want to remove this site?
        </n-popconfirm>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, reactive, toRefs } from "vue"
import SiteUptime  from "./SiteUptime.vue";
import ILock from "../icons/i-lock.svg";
import { AtButton } from "atmosphere-ui";
import { NPopconfirm } from "naive-ui";

const props = defineProps({
    item: {
        type: Object,
        required: true,            
    },
    showControls: {
        type: Boolean,
        default: false,
    }
});

defineEmits(['delete'])

const state = reactive({
    uptime: computed(() => {
        return props.item.responses ? props.item.responses.reduce((dailyResponse, response) => {
            dailyResponse.calls = sum(dailyResponse.calls,  response.calls);
            dailyResponse.success = sum(dailyResponse.success, response.success);
            return dailyResponse;
        }, {calls: 0, success: 0 }) : { calls: 0, success: 0 };
    }),
    uptimePercent: computed(() => {
        const percent = (state.uptime.success / state.uptime.calls * 100) || 0;
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

const sum = (number1, number2) => {
    return Number(number1) + Number(number2)
}

const getFavicon = () => {
    const url = props.item.protocol + props.item.url;
    return url && `https://www.google.com/s2/favicons?domain=${url}`;
}      
</script>