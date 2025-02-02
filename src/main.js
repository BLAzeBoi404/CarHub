import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bulma/css/bulma.css'; // Подключение стилей Bulma
import '/src/assets/style.css'; // Пользовательские стили

const app = createApp(App);

const pinia = createPinia();
app.use(pinia); // Подключаем Pinia
app.use(router);

app.mount('#app');
