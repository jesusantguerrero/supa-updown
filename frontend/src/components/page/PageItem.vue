<template>
<div  class="flex justify-between px-5 py-2 text-gray-500 cursor-pointer">
    <div>
    <h4 class="font-bold">
        <a :href="`/status/${page.id}`" target="_blank">{{ page.title }}</a>
    </h4>
    {{ page.description }}
    </div>
    <div class="space-x-2">
    <n-popconfirm
        @positive-click="$emit('delete', page.id)"
    >
        <template #trigger>
            <at-button 
                class="text-red-500 border border-red-500 bg-red-50"
            >
                <i class="fa fa-trash"></i>
            </at-button>
        </template>
        Are you sure you want to remove this status page?
    </n-popconfirm>
    <at-button 
        class="text-green-500 border border-green-500 bg-green-50"
        @click="$emit('edit', page)"
    >
        <i class="fa fa-edit"></i>
    </at-button>
    </div>
</div>
</template>

<script setup>
import { AtButton } from "atmosphere-ui";
import { NPopconfirm } from "naive-ui";

defineProps({
    page: {
        type: Object,
        required: true,
    }
})

defineEmits(['edit', 'remove'])
</script>