<template>
  <div class="flex justify-between px-10 border-b-4 border-green-400 shadow-md">
    <h1 class="font-bold text-gray-700"> 
      <router-link :to="{name: 'dashboard'}" class="inline-block font-bold">
        <div class="w-full transform scale-75 font-display">
          <supaup-logo class="block w-full text-gray-700 fill-current h-92" />
        </div>
      </router-link>
    </h1>
    <div class="flex items-center space-x-3">
        <AtDropdown>
          <template #trigger>
            <at-button class="font-bold text-green-500">
              Add New
            </at-button>
          </template>
          <template #content>
            <div class="flex flex-col space-y-2">
              <router-link 
                v-for="link in newButtonLinks"
                :to="{ name: link.name }"
                class="block px-5 py-2 text-green-500 hover:bg-gray-100"
              >
                {{ link.label }}
              </router-link>
            </div>
          </template>
        </AtDropdown>
        <router-link :to="{name: 'account'}">
            {{ userName }}
        </router-link> 
        <at-button type="success" @click="signOut">Logout</at-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { supabaseState, useSupabase } from "../utils/useSupabase";
import { AtButton, AtDropdown } from "atmosphere-ui";
import { useRouter } from "vue-router"
import SupaupLogo from "../assets/default.svg"
const userName = computed(() => {
    return supabaseState.user.email
})

const { logout } = useSupabase();
const { push } = useRouter();

const newButtonLinks = [
  {
    label: "Create page",
    name: "create-page",
  },
  {
    label: "Create incident",
    name: "create-incident",
  },
  {
    label: "Create update",
    name: "create-update",
  }
]
const signOut = async () => {
  console.log('hello')
    await logout()
    push({ name: 'login' })
}

</script>