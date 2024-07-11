import * as Vue from "vue";
import "./style.css";
import axios from "axios";
import store from './store';
import VueAxios from "vue-axios";
import router from "./router/router.js";
import App from "./App.vue";

const app = Vue.createApp(App);

app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.mount("#app");
