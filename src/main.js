import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { contentRenderer } from "./contentRenderer.js";
const app = createApp(App);
app.config.globalProperties.$filters = {
  renderContent: (content) => contentRenderer.render(content),
};
app.use(ElementPlus).mount("#app");
