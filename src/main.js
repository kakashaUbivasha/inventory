import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import {createVfm} from "vue-final-modal";
import 'vue-final-modal/style.css'
const vfm = createVfm()
const app = createApp((App))
app.use(vfm)
app.mount('#app')
