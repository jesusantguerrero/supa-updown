<template>
  <div class="flex justify-between px-10 py-4">
    <h1 class="font-bold text-gray-700"> SupaUp</h1>
    <div>
        {{ userName }}
        <at-button class="bg-green-500" @click="logout">Logout</at-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { supabaseState, useSupabase } from "../utils/useSupabase";
import { AtButton } from "atmosphere-ui/dist/atmosphere-ui.es";
    
const userName = computed(() => {
    return supabaseState.user.email
})

const { logout } = useSupabase();

</script>

<style>

</style>