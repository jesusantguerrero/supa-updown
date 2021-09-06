<template>
  <div class="w-full h-1 bg-gray-200 grid grid-cols-[24]">
    <div class="h-full bg-green-300 active" :style="progressClass"></div>
  </div>
</template>

<script>
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
