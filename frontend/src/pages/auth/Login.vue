<template>
  <at-auth-box>
    <link-sent v-if="isLinkSent" class="font-display">
         <div class="w-full transform scale-125 font-display">
            <supaup-logo class="block w-full text-white fill-current h-92" />
        </div>
    </link-sent>
    <at-auth-form 
        v-else
        :form-data="formData"
        app-name="Supa Up"
        :is-loading="isLoading"
        :mode="mode"
        submit-label="Send me the link"
        @submit="onSubmit"
        @link-pressed="onLinkPressed"
        btn-class="mb-2 font-bold border-2 border-green-400 rounded-md bg-gradient-to-br from-green-400 to-cyan-500"
    >
      <template #brand>
        <div class="w-full transform scale-150">
            <supaup-logo class="block w-full text-white fill-current h-92" />
        </div>
      </template>
    </at-auth-form>
  </at-auth-box>
</template>

<script setup>
    import { reactive, ref } from '@vue/reactivity';
    import { AtAuthBox, AtAuthForm } from 'atmosphere-ui';
    import { useRouter } from 'vue-router';
    import { useSupabase } from '../../utils/useSupabase';
    import SupaupLogo from "../../assets/default.svg"
    import LinkSent from '../../components/LinkSent.vue'
    
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

    const isLinkSent = ref(false);
    const onSubmit = async (formData) => { 
       if (isLoading.value) return;
       try {
           isLoading.value = true;
           const { user, session, error } = await supabase.auth[authMethods[props.mode]]({ email : formData.email, password: formData.password })
           if (error) throw error;
           isLinkSent.value = true;
       } catch (error) {
           alert(error.description || error.message);
        } finally {
            isLoading.value = false;
        }
    }
</script>

<style>

</style>