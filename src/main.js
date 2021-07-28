import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import VueAxios from "vue-axios";

library.add(fas);
createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
