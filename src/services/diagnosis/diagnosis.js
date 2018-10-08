/**
 * 作者：yeshengqiang
 * 时间：2018-07-18
 * 描述：diagnosis
 */

import { fetch } from '../baseService.js';

// 体检下发
const checkupApi = '/api/app/jac-vehicle/checkup';

// 根据记录ID查询下发诊断指令结果
const getRemoteDiagnoseApi = '/api/app/jac-vehicle/getRemoteDiagnose';

// 体检下发
export const checkup = (opt) => fetch.get(checkupApi, { params: opt });

// 根据车牌号查询单车历史轨迹
export const getRemoteDiagnose = (opt) => fetch.get(getRemoteDiagnoseApi, { params: opt });
