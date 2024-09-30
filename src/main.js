import "./assets/main.css";

import { createApp } from "vue";
import router from "./routes/index";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import store from "./store/store";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ToastPlugin);
app.mount("#app");
