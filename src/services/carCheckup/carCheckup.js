/**
 * 作者：yeshengqiang
 * 时间：2018-04-24
 * 描述：故障查询
 */

import { fetch, apiFormat } from '../baseService.js';

// 【司机】根据车牌号查询当前故障车辆
const faultListApi = '/api/app/fault/getFaultsByPlateNo/{pageNo}/{pageSize}';

// 【司机】根据VIN码查询当前故障车辆
const getFaultsByVinApi = '/api/app/fault/getFaults/{pageNo}/{pageSize}';

// 【车队】 根据车牌号查询当前故障车辆
const getFaultsByPlateNoApi = '/api/app/fault/getFaultsByPlateNo/{pageNo}/{pageSize}';

// 详情api
const getDetailByVinApi = '/api/app/fault/getDetailByVin';

// 【司机】 故障历史
const getFaultsHistoryApi = '/api/plat/jac-fault/getFaultsHistory/{pageNo}/{pageSize}';

// 【司机】 报警统计
const alarmDataAnalysisApi = '/api/app/jac-alarm-record/alarmDataAnalysis';

// 【司机】 饼状图
const pieChartApi = '/api/app/fault/pieChart';

// 【司机】 线状图
const lineChartApi = '/api/app/fault/lineChart';

// 【司机】根据车牌号查询当前故障车辆
export const faultList = (opt) => fetch.get(apiFormat(faultListApi, opt), { params: opt });

// 【司机】根据VIN码查询当前故障车辆
export const getFaultsByVin = (opt) => fetch.get(apiFormat(getFaultsByVinApi, opt), { params: opt });

// 【车队】 根据车牌号查询当前故障车辆
export const getFaultsByPlateNo = (opt) => fetch.get(apiFormat(getFaultsByPlateNoApi, opt), { params: opt });

// 详情api
export const getDetailByVin = (opt) => fetch.get(getDetailByVinApi, { params: opt });

// 【司机】 故障历史
export const getFaultsHistory = (opt) => fetch.get(apiFormat(getFaultsHistoryApi, opt), { params: opt });

// 【司机】报警统计
export const alarmDataAnalysis = (payload) => fetch.post(alarmDataAnalysisApi, payload);

// 【司机】 饼状图
export const pieChart = (opt) => fetch.get(pieChartApi, { params: opt });

// 【司机】 饼状图
export const lineChart = (opt) => fetch.get(lineChartApi, { params: opt });
