import '@/assets/css/index.less';
import '@/router/RouteGuard';
import antdVue from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
const pinia = createPinia()
const app = createApp(App)
app.use(antdVue)
app.use(pinia)
app.use(router),
app.mount('#app')
