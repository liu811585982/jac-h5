/**
 * 作者：aicong
 * 时间：2018-04-23
 * appointService.js
 */

import { fetch, apiFormat } from '../baseService.js';

// 查询预约保养维修集合订单
const queryAppointListApi = '/api/app/driver-appoint/queryAppointList/{driverId}/{pageNo}/{pageSize}';

// 查询当前司机拥有车辆
const infoForAddApi = '/api/app/driver-appoint/infoForAdd/{driverId}';

// 添加预约
const addAppointApi = '/api/app/driver-appoint/addAppoint/{driverId}';

// 维保项目数据
const aqueryAppointItemsApi = '/api/app/driver-appoint/queryAppointDetails/{appointId}';

// 按照用户定位坐标获由近及远获取附近服务站点
const queryServiceApi = '/api/plat/jac-communal/queryService';

// 查询预约保养维修集合订单
export const queryAppointList = (opt) => fetch.post(apiFormat(queryAppointListApi, opt), opt);

// 查询当前司机拥有车辆
export const infoForAdd = (opt) => fetch.get(apiFormat(infoForAddApi, opt));

// 添加预约
export const addAppoint = (opt) => fetch.post(apiFormat(addAppointApi, opt), opt);

// 维保项目数据
export const aqueryAppointItems = (opt) => fetch.get(apiFormat(aqueryAppointItemsApi, opt));

// 按照用户定位坐标获由近及远获取附近服务站点
export const queryService = (payload) => fetch.post(queryServiceApi, payload);