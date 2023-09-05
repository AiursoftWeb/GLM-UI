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

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
createApp(App).use(ElementPlus).mount('#app')
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}