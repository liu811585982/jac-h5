/**
 * 作者：yeshengqiang
 * 时间：2018-04-02
 * 描述：date.js
 */

import { formateDate } from '@/libs/utils';

const install = Vue => {
	Vue.filter('dateFormat', formateDate);
};

export default install;