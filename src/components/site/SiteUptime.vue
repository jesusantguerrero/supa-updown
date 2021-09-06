<template>
  <div class="grid w-full mt-2 bg-gray-50 h-9 md:grid-cols-16 lg:grid-cols-60 place-items-end">
    <div v-for="response in responses" :key="response" class="w-full h-full cursor-pointer active">
        <n-popover placement="bottom" trigger="hover">
            <template #trigger>
                <div  :class="progressClass(response)" class="w-full h-full bg-green-500 bg-opacity-75 rounded-md cursor-pointer hover:bg-gray-500 bg-op" />
            </template>
            <p class="font-bold text-gray-500">{{ getResponseDate(response.date)}}</p>
            No downtime reported
        </n-popover>
    </div>
  </div>
</template>

<script setup>
    import format from "date-fns/format";
    import { NPopover } from "naive-ui"
    import { reactive, toRefs } from "vue-demi";
    
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

    const getResponseDate = (dateString) => {
        const dateSplits = dateString.split('-');
        const date = new Date(dateSplits[0], dateSplits[1] - 1, dateSplits[2]);
        return format(date, "MMM dd, yyyy");
    };
</script>
