<template>
  <at-auth-box>
    <at-auth-form 
        :form-data="formData"
        app-name="SupaUp"
        :is-loading="isLoading"
        @submit="onSubmit"
        btn-class="bg-green-500"
    />
  </at-auth-box>
</template>

<script setup>
    import { reactive, ref } from '@vue/reactivity';
    import { AtAuthBox, AtAuthForm } from 'atmosphere-ui';
    import { useSupabase } from '../utils/useSupabase';
    const formData = reactive({
        email: '',
        password: ''
    });

    const isLoading = ref(false);
    const { supabase } = useSupabase();

    const onSubmit = async (formData) => { 
       if (isLoading.value) return;
       try {
           isLoading.value = true;
           const { error } = await supabase.auth.signIn({ email : formData.email })
           if (error) throw error;
           alert('Login Success, check your email for the link');
       } catch (error) {
           alert(error.description || error.message);
        } finally {
            isLoading.value = false;
        }
    }
</script>

<style>

</style>