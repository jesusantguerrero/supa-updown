<template>
  <div class="flex flex-wrap items-center px-5 py-3 border shadow-md">
    <div>
        <div class="flex">
            <n-select v-model:value="form.protocol" class="border-none focus:outline-none" :options="state.protocols" />
            <input type="text" placeholder="www.example.com" class="focus:outline-none" required v-model="form.url">
        </div>
        <small v-if="form.hasErrors && form.errors.url" class="pl-1 text-red-400"> {{ form.errors.url }}</small>
    </div>
    <div>
        <input type="text" placeholder="alias (optional)" class="focus:outline-none"  v-model="form.alias">
    </div>
    <div>
        <input type="text" class="focus:outline-none" placeholder="contains (optional)" v-model="form.contains">
    </div>
    <div class="flex items-center space-x-2 font-bold text-gray-500 w-42">
        <div class="flex items-center w-full space-x-2">
            <i class="fa fa-clock" />
            <div>check after</div> 
        </div>
        <n-select v-model:value="form.interval" name="" id="" :options="state.intervals"/>
    </div>
    <div class="w-full text-right">
        <at-button class="px-5 py-1 text-white bg-gray-600 rounded-md" @click="submit()"> Save </at-button>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, reactive, toRefs } from 'vue'
import useForm, { validators } from "../../utils/useForm";
import { supabaseState } from "../../utils/useSupabase"
import { NSelect, useMessage } from 'naive-ui';
import { AtButton } from "atmosphere-ui";

const emit = defineEmits(['submit']);
const state = reactive({
    protocols: ['https://', 'http://'].map(protocol => ({
        label: protocol,
        value: protocol
    })),
    intervals: [5, 15, 30, 60, 60*5].map(minutes => ({
        value: minutes,
        label: minutes + ' minutes'
    })),
    apdexes: [1.5, 0.5, 0.25, 0.1],
})

const form = useForm({
    protocol: 'https://',
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
    listeners: [supabaseState.user.email],
}).validationSchema({
    url: [
        validators.isRequired,
        validators.isUrl,
    ]
});

const message  = useMessage();
const submit = () => {
    if (form.validate()) {
        emit('submit', form.data());
        form.reset();
    } else {
        message.error('Please fill in all required fields');
    }
}
</script>