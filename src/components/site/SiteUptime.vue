<template>
  <div class="grid w-full h-1 bg-gray-200 grid-cols-24">
    <div class="w-full h-full bg-opacity-75 active" ref="progress" :class="progressClass(response)" v-for="response in responses" :key="response"></div>
  </div>
</template>

<script lang="ts" setup>
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


<style>

</style>