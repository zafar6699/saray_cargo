import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.scss";

const app = createApp(App);

import { naiveMigrate } from "./plugins/naive";
naiveMigrate(app);
import { registerComponents } from "./plugins/components";
registerComponents(app);
app.use(createPinia());
app.use(router);

app.mount("#app");
