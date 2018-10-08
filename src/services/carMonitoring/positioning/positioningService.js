/**
 * 作者：aicong
 * 时间：2018-04-18
 * 描述：driverService.js
 */

import { fetch } from '../../baseService.js';

// 根据车VIN查看实时定位
const getRtLocationByVinApi = '/api/app/vehicle-monitor/getRtLocationByVin';

// 根据车牌号查看实时定位
const getRtLocationByPlateNoApi = '/api/app/vehicle-monitor/getRtLocationByPlateNo';

// 根据车牌号搜索下拉框
const vehicleSelectApi = '/api/app/vehicle-monitor/vehicleSelect';

// 获取司机信息
export const getRtLocationByVin = (opt) => fetch.get(getRtLocationByVinApi, {params: opt});

// 根据车牌号查看实时定位
export const getRtLocationByPlateNo = (opt) => fetch.get(getRtLocationByPlateNoApi, {params: opt});

// 根据车牌号搜索下拉框
export const vehicleSelect = (opt) => fetch.get(vehicleSelectApi, {params: opt});
