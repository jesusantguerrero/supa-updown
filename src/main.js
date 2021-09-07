import { createApp } from 'vue'
import App from './App.vue'

import "./assets/styles/main.css";
import "atmosphere-ui/dist/style.css"
import router from "./router";
import { AuthState } from './utils/lumiere';


const app = createApp(App)
app.provide('AuthState', AuthState)
app.use(router)
app.mount('#app')
