/**
 * 作者：yeshengqiang
 * 时间：2018-04-11
 * 描述：motorcade.js 车队管理
 */

 export default {
    state: {
        // 添加信息
        addInfo: {}
    },
    mutations: {
        'increment' (state, res) {
            state.addInfo = Object.assign({}, state.addInfo, res);
            console.log(state.addInfo);
        }
    }
 };
