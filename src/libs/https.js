/**
 * 作者：yeshengqiang
 * 时间：20117-07-31
 * 描述：http
 */
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { baseURL } from '@/libs/config';
import { checkNetWork } from '@/libs/plus';
import * as types from '@/store/src/mutation-types';

const production = process.env.NODE_ENV === 'production';

// 线上地址
if (production) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
}

// 拦截 发
axios.interceptors.request.use(async (config) => {
    if (production) {
        const result = await checkNetWork();
        if (result) {
            return Promise.reject(new Error('未连接网络，请检查网络！'));
        } else {
            return config;
        }
    } else {
        return config;
    }
}, function (error) {
    return Promise.reject(error);
});

// 收
axios.interceptors.response.use(function (response) {
    if (+response.data.code === 0) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response.data);
    }
}, function (error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                store.commit(types.LOGIN_OUT);
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                break;
            case 500:
            case 504:
                return Promise.reject(new Error('系统繁忙，请稍后再试！'));
        }
    }
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    // if (error.message === 'Network Error') {
    //     return Promise.reject(new Error('未连接网络，请检查网络！'));
    // }
    return Promise.reject(error);
});

export default axios;
