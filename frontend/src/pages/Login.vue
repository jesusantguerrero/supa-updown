<template>
  <at-auth-box>
    <at-auth-form 
        :form-data="formData"
        app-name="SupaUp"
        :is-loading="isLoading"
        :mode="mode"
        @submit="onSubmit"
        @link-pressed="onLinkPressed"
        btn-class="bg-green-500"
    />
  </at-auth-box>
</template>

<script setup>
    import { reactive, ref } from '@vue/reactivity';
    import { AtAuthBox, AtAuthForm } from 'atmosphere-ui';
    import { useRouter } from 'vue-router';
    import { useSupabase } from '../utils/useSupabase';
    
    const props = defineProps({
        mode: {
            type: String,
            default: 'login'
        }
    });

    const formData = reactive({
        email: '',
        password: ''
    });

    const isLoading = ref(false);
    const { supabase } = useSupabase();

    const { push } = useRouter();
    
    const onLinkPressed = (mode) => {
        const route = mode == 'login' ? 'register' : 'login';
        push(route);
    }

    const authMethods = {
        login: 'signIn',
        register: 'signUp'
    };

    const onSubmit = async (formData) => { 
       if (isLoading.value) return;
       try {
           isLoading.value = true;
           const { user, session, error } = await supabase.auth[authMethods[props.mode]]({ email : formData.email, password: formData.password })
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