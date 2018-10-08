/**
 * 作者：yeshengqiang
 * 时间：2018-03-29
 * 描述：getters.js
 */
 import { getStore } from '@/libs/utils';

 export default {
    getToken (state) {
        return state.userInfo.token || getStore('token');
    },
    getLoginInfo (state) {
        return state.loginInfo || JSON.parse(getStore('loginInfo') || null);
    },
    appointInfoState: state => state.appointInfoState,
    cacheList: state => state.cache.cacheList
 };
