<template>
  <div class="flex items-center px-5 py-3 border shadow-md">
    <div class="flex">
        <select v-model="form.protocol" class="focus:outline-none">
            <option :value="protocol" v-for="protocol in protocols" :key="protocol">
                {{ protocol }}
            </option>
        </select>
        <input type="text" placeholder="www.example.com" class="focus:outline-none" required v-model="form.url">
    </div>
    <div>
        <input type="text" placeholder="alias (optional)" class="focus:outline-none"  v-model="form.alias">
    </div>
    <div>
        <input type="text" placeholder="contains (optional)" v-model="form.contains">
    </div>
    <div>
        <select name="" id="">
            <option :value="interval" v-for="interval in intervals" :key="interval">
                {{ interval }}
            </option>
        </select>
    </div>
    <div>
        <select name="" id="">
            <option :value="apdex" v-for="apdex in apdexes" :key="apdex">
                {{ apdex }}
            </option>
        </select>
    </div>
    <div class="w-full text-right">
        <button class="px-5 py-1 text-white bg-gray-600 rounded-md" @click="submit()"> Save </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import useForm from "../../utils/useForm";

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
    setup(props, { emit }) {
        const state = reactive({
            protocols: ['https://', 'http://', 'tcp://', 'icmp://'],
            intervals: [15, 30, 60, 60*5],
            apdexes: [1.5, 0.5, 0.25, 0.1],
        })

        const form = useForm({
            protocol: 'http://',
            url: '',
            title: '',
            contains: '',
            interval: 5,
            apdex: 0.5,
            httpRequest: {
                method: 'GET',
                headers: {},
            },
            lastResponse: {},
            responses: [],
        });

        const submit = () => {
            emit('submit', form.data());
            form.reset();
        }

        return {
            ...toRefs(state),
            form,
            submit,
        }
    },
})
</script>


<style>

</style>