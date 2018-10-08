/**
 * 作者：yeshengqiang
 * 时间：2018-06-07
 * 描述：cache.js
 */

 export default {
    state: {
        lastStatus: '',            // 前进|后退 [forward, back]
        cacheList: []              // 缓存列表（router）
    },
    mutations: {
        // 添加缓存
        ADD_CACHE_LIST (state, res) {
            if (!state.cacheList.some(item => item === res)) {
                state.lastStatus = 'forward';
                state.cacheList.push(res);
            }
        },
        // 删除缓存
        DEL_CACHE_LIST (state, res) {
            state.lastStatus = 'back';
            state.cacheList = state.cacheList.filter(item => item !== res);
        },
        // 清空缓存
        CLEAR_CACHE_LIST (state) {
            state.cacheList = [];
        }
    }
 };
