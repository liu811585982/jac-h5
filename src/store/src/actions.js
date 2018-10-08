/**
 *  作者：yeshengqiang
 *  时间：2017-06-04
 *  描述：定义actions
 */
import { getUser, getTotalRecode, loginout } from '@/services/userCenter/userCenter';
import { getCheckToken } from '@/services/loginService/loginService';
import { fleetSelect, vehicleDictSelect, getAllMessage } from '@/services/common';
import { latestAdList } from '@/services/advertiseService/advertiseService';
import { queryOne } from '@/services/goodsSupply/goodsSupplyService';

import {
    GET_USERINFO,
    CHECK_TOKEN,
    GET_TOTAL_RECODE,
    GET_ALL_DIVER_LIST,
    GET_CAR_MODEL_LIST,
    GET_CAR_LENGTH_LIST,
    GET_CAR_VAN_LIST,
    LOGIN_OUT,
    SET_AD_LIST,
    SET_GOODS_SUPPLY_STATE,
    SAVE_PUSH_MESSAGE
} from './mutation-types.js';

export default {
    // 获取用户信息
    async getUserInfo ({
		commit,
		state
	}) {
        try {
            let res = await getUser();
            // 保存用户信息
            commit(GET_USERINFO, res.data);
        } catch (e) {
            console.error(e);
        }
    },
    // 检查token
    checkToken ({
        commit,
        getters
    }) {
        return new Promise(async (resolve, reject) => {
            try {
                await getCheckToken({token: getters.getToken});
                resolve();
                commit(CHECK_TOKEN, false);
            } catch (e) {
                if (typeof e === 'object' && 'code' in e) {
                    reject(e);
                    commit(CHECK_TOKEN, true);
                } else {
                    resolve();
                }
            }
        });
    },
    // 获取总积分
    async getTotalRecode ({
        commit
    }) {
        try {
            let res = await getTotalRecode();
            // 保存用户信息
            commit(GET_TOTAL_RECODE, res.data);
        } catch (e) {
            console.error(e);
        }
    },
    // 获取所有车队
    async getAllDiverList ({
        commit
    }) {
        try {
            let res = await fleetSelect();
            // 保存车队信息
            commit(GET_ALL_DIVER_LIST, res.data);
        } catch (e) {
            console.error(e);
        }
    },
    // 获取所有搜索条件
    getAllSearchList ({
        commit
    }) {
        const map = ['MODEL', 'VAN', 'LENGTH']; // 车型， 厢型， 车长
        let str = '';
        map.forEach(async (item) => {
            try {
                let res = await vehicleDictSelect({type: item});
                switch (item) {
                    case 'MODEL':
                        str = GET_CAR_MODEL_LIST;
                        break;
                    case 'LENGTH':
                        str = GET_CAR_LENGTH_LIST;
                        break;
                    case 'VAN':
                        str = GET_CAR_VAN_LIST;
                        break;
                }
                // 保存车队信息
                commit(str, res.data);
            } catch (e) {
                console.error(e);
            }
        });
    },
    // 登出
    async logout ({ commit }) {
        try {
            await loginout();
            commit(LOGIN_OUT);
        } catch (e) {
            console.error(e);
        }
    },
    async getLatestAdList ({ commit }) {
        try {
            const result = await latestAdList();
            commit(SET_AD_LIST, result.data);
        } catch (e) {
            console.error(e);
        }
    },
    // 获取货源申请状态
    async getApplyState ({ commit }) {
        try {
            const result = await queryOne();
            let state = '';
            if (!result.data) {
                state = 'NOTOPEN';
            } else {
                state = result.data.state;
            }
            commit(SET_GOODS_SUPPLY_STATE, state);
        } catch (e) {
            console.error(e);
        }
    },
    // 获取遗漏消息
    async getAllMessage ({ commit }) {
        try {
            const result = await getAllMessage();
            commit(SAVE_PUSH_MESSAGE, result.data);
        } catch (e) {
            console.error(e);
        }
    }
};
