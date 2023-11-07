import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';


createApp(App)
	.component('Button', Button)
	.component('Dialog', Dialog)
	.component('Textarea', Textarea)
	.component('Checkbox', Checkbox)
	.use(PrimeVue)
	.mount('#app');
