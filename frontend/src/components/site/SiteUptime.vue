<template>
  <div class="grid w-full mt-2 bg-gray-50 h-9 grid-cols-60 place-items-end">
    <div v-for="response in responses" :key="response" class="w-full h-full cursor-pointer active">
        <n-popover placement="bottom" trigger="hover">
            <template #trigger>
                <div  :class="progressClass(response)" class="w-full h-full bg-green-500 bg-opacity-75 cursor-pointer hover:bg-gray-500 bg-op" />
            </template>
            <p class="font-bold text-gray-500">12 Aug 2021</p>
            Hola mundo como estamos?
        </n-popover>
    </div>
  </div>
</template>

<script setup>
    import { NPopover } from "naive-ui"
    const props = defineProps({
        max: {
            type: Number,
            default: 24
        },
        responses: {
            type: Array,
            default() {
                return []
            }
        }
    })


    const progressClass = (response) => {
        return response.status >= 400 ? 'bg-red-500' : 'bg-green-400';
    };
</script>
