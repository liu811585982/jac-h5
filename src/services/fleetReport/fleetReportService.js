/**
 *  车队报表
 */
import { fetch, apiFormat } from '@/services/baseService';

const vehicleModelsApi = '/api/app/jac-motorcade-statement/getVehicleModels';           // 获取车型 method 'get'
const fleetReportListApi = '/api/app/jac-motorcade-statement/queryPageableData/{pageNum}/{pageSize}'; // 获取列表 method 'post'

export const vehicleModels = () => fetch.get(vehicleModelsApi);

export const fleetReportList = (opt, payload) => fetch.post(apiFormat(fleetReportListApi, opt), payload);
