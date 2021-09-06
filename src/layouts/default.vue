<template>
    <Header title="Lumiere"  :user="AuthState.user" @logout="signOut" />
    <main class="px-10 mt-10">
        <NMessageProvider>
            <slot />
        </NMessageProvider>
    </main>
</template>

<script setup>
    import { AuthState, useAuth } from '@utils/lumiere';
    import Header from '../components/core/Header.vue';
    import { useRouter } from 'vue-router';
    import { NMessageProvider } from "naive-ui"

    const { push } = useRouter();
    const { logout } = useAuth();
    const goToHome = () => {
        push({ name: 'landing' })
    };
    
    const signOut = () => {
        logout(goToHome);
    }
</script>