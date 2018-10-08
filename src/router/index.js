/**
 * 作者：yeshengqiang
 * 时间：2017-08-14
 * 描述：路由文件
 */
import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import routes from './router.js';
import { Toast } from 'mint-ui';
import { closeSplashscreen } from '@/libs/plus';

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes,
    strict: process.env.NODE_ENV !== 'production'
});

// 需要忽略的路由
const ignoreList = [
    'forgetPassword',
    'login/driverRegister',
    'main/driver',
    'main/userCenter',
    'login/password',
    'login/driverRegister',
    'selectRole'
];

// 路由拦截
router.beforeEach((to, from, next) => {
    // const cacheList = store.state.cache.cacheList;
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    const isFirstCome = from.path === '/';
    const isLoginPage = to.path === '/login';
    const isInIgnore = ignoreList.some(item => `/${item}` === to.path);
    let transition = toDepth < fromDepth
                ? 'slide_right_effect--50'
                : 'slide_left_effect--50';
    // if (cacheList.length && (cacheList.indexOf(to.name) === cacheList.length - 1)) {
    //     transition = 'slide_right_effect--50';
    //     // 后退
    //     // setTimeout(item => {
    //         store.commit('cache/DEL_CACHE_LIST', to.name);
    //     // }, 3000);
    // } else {
    //     // 前进
    //     transition = 'slide_left_effect--50';
    //     store.commit('cache/ADD_CACHE_LIST', from.name || '/');
    // }
    if (isFirstCome) {
        transition = 'fade';
    }
    store.commit('SET_TRANSITION', transition);
    // 4ms延迟 保证动画应用正确
    setTimeout(async () => {
        if (store.getters.getToken) {
            if (isLoginPage) {
                try {
                    // 首次进入验证token
                    if (isFirstCome) {
                        await store.dispatch('checkToken');
                        // 拉取未读消息
                        store.dispatch('getAllMessage');
                        next('/main');
                        // 关闭启动界面
                        closeSplashscreen();
                    } else {
                        next();
                    }
                } catch (e) {
                    Toast({
                        message: '登录已失效，请重新登录',
                        position: 'middle'
                    });
                    store.commit('LOGIN_OUT');
                    next();
                }
            } else {
                next();
            }
        } else {
            if (isLoginPage || isInIgnore) {
                next();
            } else {
                if (!isFirstCome) {
                    Toast({
                        message: '暂无登录信息，请登录',
                        position: 'middle'
                    });
                    next('/login');
                }
            }
        }
    });
});

export default router;
