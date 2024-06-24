import { createApp } from "vue";
import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import "./style/reset.css";
import "./assets/icons/iconfont/iconfont.css";

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
