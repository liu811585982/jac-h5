/**
 * 作者：yeshengqiang
 * 时间：2018-04-23
 * 描述：alarmManagement.js
 */

import { fetch, apiFormat } from '../baseService.js';

// 【司机】分页查询报警记录
const alarmListApi = '/api/app/jac-alarm-record/queryPageableData/{pageNo}/{pageSize}';

// 【司机】 报警统计
const alarmDataAnalysisApi = '/api/app/jac-alarm-record/alarmDataAnalysis';

// 查询报警详情
const alarmDetailApi = '/api/app/jac-alarm-record/getDetailById';

// 【司机】分页查询报警记录
export const alarmList = (opt) => fetch.post(apiFormat(alarmListApi, opt), opt);

// 【司机】报警统计
export const alarmDataAnalysis = (payload) => fetch.post(alarmDataAnalysisApi, payload);

// 查询报警详情
export const alarmDetail = (opt) => fetch.get(alarmDetailApi, {params: opt});
