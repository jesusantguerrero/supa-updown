<template>
  <div class="bg-gray-200 w-full h-1">
    <div class="active bg-green-500 h-full" ref="progress" :style="progressClass"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "@vue/runtime-core"

    const props = defineProps({
        max: {
            type: Number,
            default: 24
        },
        value: {
            type: Number,
            default: 0
        }
    })

    const activePercent = computed(() => {
        return props.value / props.max * 100;
    })

    const progressClass = computed(() => {
        return `width: ${activePercent.value}%`
    });
</script>


<style>

</style>