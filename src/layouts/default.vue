<template>
        <Header title=""  :user="AuthState.user" @logout="signOut" class="border-b-4 border-green-400">
            <div class="w-full transform scale-50 font-display">
                <supaup-logo class="block w-full text-gray-700 fill-current" />
            </div>
            <template #action>
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
            </template>
        </Header>
        <n-message-provider>
            <main class="px-10 mt-10">
                <slot />
            </main>
        </n-message-provider>
</template>

<script setup>
    import { AuthState, useAuth } from '@utils/lumiere';
    import Header from '../components/core/Header.vue';
    import { useRouter } from 'vue-router';
    import SupaupLogo from "../assets/default.svg"
    import { AtDropdown, AtButton } from "atmosphere-ui";

    const { push } = useRouter();
    const { logout } = useAuth();
    const goToHome = () => {
        push({ name: 'landing' })
    };
    
    const signOut = () => {
        logout(goToHome);
    }


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
</script>