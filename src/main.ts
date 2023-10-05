import { createApp } from "vue";

import App from "./App.vue";

import router from "./router";
import { createPinia } from "pinia";

import "@/assets/scss/style.scss";

const app = createApp(App);
app.use(router).use(createPinia());

router.isReady().then(() => {
  app.mount("#app");
});
