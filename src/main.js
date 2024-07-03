import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style/reset.css";
import "./assets/icons/iconfont/iconfont.css";
import vClickOutside from "v-click-outside";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(vClickOutside);
app.mount("#app");
