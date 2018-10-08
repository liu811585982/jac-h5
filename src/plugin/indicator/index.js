/**
 * 作者：yeshengqiang
 * 时间：2018-06-05
 * 描述：index.js
 */
 import { $indicator } from './indicator.js';

 const install = (Vue) => {
    Vue.prototype.$indicator = $indicator;
 };

 export default install;
