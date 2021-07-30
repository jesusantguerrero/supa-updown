<template>
  <div class="flex justify-between px-10 py-4">
    <h1 class="font-bold text-gray-700"> 
      <router-link :to="{name: 'dashboard'}">
        SupaUp
      </router-link>
    </h1>
    <div class="space-x-3">
        <router-link :to="{name: 'account'}">
            {{ userName }}
        </router-link> 
        <at-button class="bg-green-500" @click="logout">Logout</at-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { supabaseState, useSupabase } from "../utils/useSupabase";
import { AtButton } from "atmosphere-ui";
    
const userName = computed(() => {
    return supabaseState.user.email
})

const { logout } = useSupabase();

</script>