import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.scss';
import "atmosphere-ui/dist/style.css"
import router from  './router';
import { useSupabase } from './utils/useSupabase';
const { initSupabase } = useSupabase();

initSupabase();

createApp(App)
.use(router)
.mount('#app');
