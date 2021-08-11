<template>
  <form @submit.prevent="updateProfile" class="max-w-6xl mx-auto">
    <h4 class="mb-4 text-xl font-bold"> Profile </h4>
    <avatar v-model:path="formData.avatar_url" @upload="updateProfile" />
    <at-field label="Email">
      <at-input id="email" type="text" :value="supabaseState.user.email" disabled />
    </at-field>
    <at-field label="Username">
      <at-input id="username" type="text" v-model="formData.username" />
    </at-field>
    <at-field label="Website">
      <at-input id="website" type="website" v-model="formData.website" />
    </at-field>

    <div class="flex justify-end w-full">
      <at-button
        type="success"
        class="block button primary"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Loading ...' : 'Update' }}
      </at-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { supabaseState, useSupabase } from "../utils/useSupabase";
import Avatar from "../components/Avatar.vue";
import { AtField, AtInput, AtButton } from "atmosphere-ui";

const formData = reactive({
    username: "",
    website: "",
    avatar_url: "",
})

const isLoading = ref(false);
const { supabase, getProfile } = useSupabase();

getProfile().then( user => {
  formData.username = user.username;
  formData.website = user.website;
  formData.avatar_url = user.avatar_url;
}).catch( err => {
  console.error(err);
})

const updateProfile = async () => {
try {
  isLoading.value = true;
  const { error } = await supabase.from("profiles").upsert({
    id: supabaseState.user.id,
    username: formData.username,
    website: formData.website,
    avatar_url: formData.avatar_url,
    updated_at: new Date(),
  }, { returning: false })
  } catch (error) {
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
}
</script>