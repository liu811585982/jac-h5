/**
 * 作者：yeshengqiang
 * 时间：2018-04-27
 * 描述：reportService.js
 */

 import { fetch, apiFormat } from '../baseService.js';

 // 【车队】获取里程统计
 const getMileageStatisticsApi = '/api/app/statistical-statement/getMileageStatistics';

 // 【车队】分页查询油耗统计
 const queryPageableDataToDriverApi = '/api/app/statistical-statement/queryPageableDataToDriver/{pageNo}/{pageSize}';

 // 【车队】获取油耗统计
 const getFuelConsumptionDetailsApi = '/api/app/statistical-statement/getFuelConsumptionDetails';

 // 【车队】驾驶时长
 const getDrivingTimeApi = '/api/app/statistical-statement/getDrivingTime';

 // 【车队】行程统计
 const getTripStatisticsApi = '/api/app/statistical-statement/getTripStatistics';

 // 【车队】获取里程统计
 export const getMileageStatistics = (opt) => fetch.get(getMileageStatisticsApi, { params: opt });

 // 【车队】分页查询油耗统计
 export const queryPageableDataToDriver = (opt) => fetch.post(apiFormat(queryPageableDataToDriverApi, opt), opt);

 // 【车队】获取油耗统计
 export const getFuelConsumptionDetails = (opt) => fetch.get(getFuelConsumptionDetailsApi, { params: opt });

 // 【车队】驾驶时长
 export const getDrivingTime = (opt) => fetch.get(getDrivingTimeApi, { params: opt });

  // 【车队】事件统计
  export const getTripStatistics = (opt) => fetch.get(getTripStatisticsApi, { params: opt });
