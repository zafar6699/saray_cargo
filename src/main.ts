import { createApp } from "vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
pinia.use(piniaPluginPersistedstate);
import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);

import { naiveMigrate } from "./plugins/naive";
naiveMigrate(app);
import { registerComponents } from "./plugins/components";
registerComponents(app);
app.use(pinia);
app.use(router);

app.mount("#app");
