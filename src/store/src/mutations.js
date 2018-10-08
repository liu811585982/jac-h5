/**
 *  作者：yeshengqiang
 *  时间：2017-06-04
 *  描述：定义mutations
 */

import { setStore, removeStore, isEmptyObj, toArray, getStore } from '@/libs/utils';
import { globalConfig, mqttConfig, eventMsg } from '@/libs/config';
import { getAllPushMessage, addPushMessage } from '@/libs/websql';

 // 导入 types
import {
	LOGIN_OUT,
    LOGIN_IN,
    SAVE_LOGIN_INFO,
    GET_USERINFO,
    CHECK_TOKEN,
    MODIFY_USERINFO,
    GET_TOTAL_RECODE,
    GET_ALL_DIVER_LIST,
    GET_CAR_MODEL_LIST,
    GET_CAR_LENGTH_LIST,
    GET_CAR_VAN_LIST,
    SET_APPOINT_INFO,
    SET_IS_UPDATE,
    SET_MORE_SEARCH,
    SET_TRANSITION,
    SET_AD_LIST,
    SET_RESCUE_CALL,
    SET_GOODS_SUPPLY_STATE,
    SAVE_PUSH_MESSAGE
} from './mutation-types';

const _compare = (target, exclude, mobile, callback) => {
    let temp = {};
    let results = [];
    const excludeLen = exclude.length;
    const targetLen = target.length;
    if (!excludeLen) {
        callback(target);
        return;
    }
    for (let i = 0; i < excludeLen; i++) {
        const src = exclude[i];
        let type = src.type;
        if (src.type === mobile) type = 'appoint';
        temp[type + src.pid] = true;
    };
    for (let i = 0; i < targetLen; i++) {
        const src = target[i];
        if (!temp[src.type + src.id]) {
            results.push(src);
        };
    };
    callback(results);
};

export default {
	// 退出登录
	[LOGIN_OUT] (state) {
        // 取消订阅
        let unsubscribeList = [];
        mqttConfig.subscribe.forEach(item => {
            unsubscribeList.push(item.name);
        });
        unsubscribeList.push(state.userInfo.mobile);
        globalConfig.clientMqtt && globalConfig.clientMqtt.unsubscribe(unsubscribeList, () => {
            console.log('取消全部订阅');
        });
        state.userInfo = {};
        state.loginInfo = {};
        state.totalRecode = 0;
        state.tokenOverdue = true;
        state.goodsSupplyState = '';
        removeStore('token');
        removeStore('loginInfo');
    },
    [SAVE_LOGIN_INFO] (state, res) {
        state.loginInfo = res;
        setStore('loginInfo', JSON.stringify(res), {expires: 30});
    },
	// 登录
	[LOGIN_IN] (state, res) {
        state.userInfo = res;
        setStore('token', res.token, {expires: 30});
    },
    // 获取用户信息
    [GET_USERINFO] (state, res) {
        if (!isEmptyObj(state.userInfo) && (state.userInfo.token !== res.token)) {
			return;
        };
		if (res) {
			state.userInfo = {...res};
		} else {
			state.userInfo = {};
		}
    },
    // 修改用户信息
    [MODIFY_USERINFO] (state, res) {
        state.userInfo = Object.assign({}, state.userInfo, res);
    },
    // 登录是否过期
	[CHECK_TOKEN] (state, res) {
        state.tokenOverdue = res;
    },
    // 用户总积分
	[GET_TOTAL_RECODE] (state, res) {
        if (res) {
            state.totalRecode = (state.totalRecode || 0) + res.totalPoint;
        } else {
            state.totalRecode = 0;
        }
    },
    // 所有车队列表
    [GET_ALL_DIVER_LIST] (state, res) {
        state.allDiverList = res;
    },
    // 所有车型列表
    [GET_CAR_MODEL_LIST] (state, res) {
        state.allCarModelList = res;
    },
    // 所有车长列表
    [GET_CAR_LENGTH_LIST] (state, res) {
        state.allCarLengthList = res;
    },
    // 所有厢型列表
    [GET_CAR_VAN_LIST] (state, res) {
        state.allCarVanList = res;
    },
    // 维保详情
    [SET_APPOINT_INFO] (state, res) {
        state.appointInfoState = res;
    },
    // 设置是否加测过更新
    [SET_IS_UPDATE] (state, isUpdate) {
	    state.isUpdate = isUpdate;
    },
    // 设置是否展开搜索面板
    [SET_MORE_SEARCH] (state, moreSearch) {
	    state.moreSearch = moreSearch;
    },
    // 切换动画
    [SET_TRANSITION] (state, res) {
        state.transition = res;
    },
    [SET_AD_LIST] (state, res) {
        state.adList = res;
    },
    [SET_GOODS_SUPPLY_STATE] (state, res) {
        state.goodsSupplyState = res;
    },
    [SET_RESCUE_CALL] (state, res) {
        state.rescuePhone = res;
    },
    [SAVE_PUSH_MESSAGE] (state, res) {
        const mobile = state.userInfo.mobile || JSON.parse(getStore('loginInfo')).mobile;
        getAllPushMessage({}, (result) => {
            const rows = toArray(result.responseData.rows);
            _compare(res, rows, mobile, (data) => {
                const status = rows.length ? 'unread' : 'read';
                data.forEach(message => {
                    let type = message.type;
                    if (message.type === 'appoint') {
                        type = mobile;
                    }
                    addPushMessage({
                        title: message.title,
                        pid: message.id,
                        content: message.content,
                        issueName: message.issueName,
                        issueTime: message.issueTime,
                        mobile: mobile,
                        overview: message.overview,                      // 没有预览消息以三个点展示
                        type,
                        status
                    }, function (response) {
                        if (response.result === 0) {
                            console.log(`新增数据${response.responseData.insertId}成功`);
                            eventMsg.$emit('messageEvent', type, message);
                        }
                    });
                });
            });
        });
    }
}
;
