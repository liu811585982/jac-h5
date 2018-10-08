/**
 *  serviceStationService
 */
import {fetch, apiFormat} from '@/services/baseService';

// 分页查询服务站信息 method 'post'
const stationPageableListApi = '/api/app/sys-org-service-station/queryPageableData/{pageNum}/{pageSize}';

// 查询服务站列表
const stationListApi = '/api/app/sys-org-service-station/getSysOrgServiceStationList';

// 根据服务站Id获取服务站信息
const stationByIdApi = '/api/app/sys-org-service-station/byId';

// 根据用户定位坐标获取附近服务点
const stationNearbyListByPageApi = '/api/plat/jac-communal/queryServiceByPage';

const stationNearbyListApi = '/api/plat/jac-communal/queryService';

// 分页查询服务站信息
export const stationPageableList = (opt, payload) => fetch.post(apiFormat(stationPageableListApi, opt), payload);

// 查询服务站列表
export const stationList = (payload) => fetch.get(stationListApi, {params: payload});

// 根据服务站Id获取服务站信息
export const stationById = (payload) => fetch.get(stationByIdApi, {params: payload});

// 根据用户定位坐标获取附近服务点 分页
export const stationNearbyListByPage = (payload) => fetch.post(stationNearbyListByPageApi, payload);

// 根据用户定位坐标获取附近服务点
export const stationNearbyList = (payload) => fetch.post(stationNearbyListApi, payload);
