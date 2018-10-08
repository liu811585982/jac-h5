// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import './libs/rem';
import Vue from 'vue';
import App from './App';
import '@/filters/common';
import store from './store';
import '@/directives/common';
import '@/components/common';
import MintUI from 'mint-ui';
import router from './router';
import svgIcon from './icons';
import FastClick from 'fastclick';
import { indicatorPlugin, enlargePlugin } from '@/plugin';
import { LoadingPlugin, ConfirmPlugin, DatetimePlugin, AlertPlugin } from 'vux';

// mock
// import '@/mock';

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole';

Vue.config.productionTip = false;

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
};

Vue.use(svgIcon);
Vue.use(MintUI);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DatetimePlugin);
Vue.use(AlertPlugin);
Vue.use(indicatorPlugin);
Vue.use(enlargePlugin);

/* eslint-disable no-new */
new Vue({
    el: '#app',
	router,
    store,
    components: { App },
    template: '<App />'
});
