<template>
    <div class="max-w-md mx-auto text-center">
        <h1 class="text-3xl font-bold text-red-500"> {{ incident.title }} </h1> 
        <div class="mt-5 text-xl text-left"> {{ incident.description }} </div>
        
        <div class="flex justify-center mt-4 text-left" v-for="update in incident.updates">
            <div class="w-1/2">
                {{ update.status }}
            </div>
            <div class="w-1/2">
                <div class="font-bold">
                    {{ update.title }}
                </div>
                <div class="mt-2">
                    {{ update.description }}
                </div>
                <small> {{ update.date }}</small>
            </div>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        incident: {
            type: Object,
            required: true,
        }
    })
</script>