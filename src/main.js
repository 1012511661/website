import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import mText from "./styles/font/m-text";
Vue.component("m-text", mText);
Vue.use(ViewUI);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    beforeCreate() {
        Vue.prototype.bus = this;
    },
    render: h => h(App)
}).$mount("#app");
