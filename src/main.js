import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import VueClipboard from "vue-clipboard2";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(VueClipboard);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
