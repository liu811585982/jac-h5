/**
 * 作者：yeshengqiang
 * 时间：2017-11-13
 * 描述：loading
 */
import Vue from 'vue';
import Indicator from './indicator.vue';
const Transfr = Vue.extend(Indicator);

export const $indicator = (() => {
    const instance = new Transfr().$mount();
    document.body.appendChild(instance.$el);
    return instance;
})();
