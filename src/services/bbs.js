/**
 * 作者：yeshengqiang
 * 时间：2018-04-16
 * 描述：bbs
 */

import { fetch } from './baseService.js';

// 获取车队列表
const bbsLoginApi = '/api/app/discuz/verifyToken';

// bbs login
export const bbsLogin = (opt) => fetch.get(bbsLoginApi, {params: opt});
