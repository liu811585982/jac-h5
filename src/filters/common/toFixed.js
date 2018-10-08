/**
 * 作者：yeshengqiang
 * 时间：2018-04-28
 * 描述：toFix.js
 */

const install = Vue => {
	Vue.filter('tofix', function (val, num) {
        return val.toFixed(num);
    });
};

export default install;
