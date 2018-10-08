/**
 * 作者：yeshengqiang
 * 时间：2018-04-18
 * 描述：carMonitoring.js
 */

import { fetch } from '../baseService.js';

// 根据车VIN查看实时数据
const getRtDataByVinApi = '/api/app/vehicle-monitor/getRtDataByVin';

// 根据车牌号查询单车历史轨迹
const getHistoricalRouteByPlateNoApi = '/api/app/vehicle-monitor/getHistoricalRouteByPlateNo';

// 历史轨迹
const getHistoricalRouteByVinApi = '/api/app/vehicle-monitor/getHistoricalRouteByVin';

// 根据车VIN查看实时数据
export const getRtDataByVin = (opt) => fetch.get(getRtDataByVinApi, { params: opt });

// 根据车牌号查询单车历史轨迹
export const getHistoricalRouteByPlateNo = (opt) => fetch.get(getHistoricalRouteByPlateNoApi, { params: opt });

// 历史轨迹
export const getHistoricalRouteByVin = (opt) => fetch.get(getHistoricalRouteByVinApi, { params: opt });
