/**
 * 作者：yeshengqiang
 * 时间：2018-03-28
 * 描述：车辆列表Service.js
 */

import { fetch, apiFormat } from '../baseService.js';

// 分页查询车辆信息（司机）list
const carListApi = '/api/app/jac-motorcade-vehicle/queryPageableDataToDriver/{pageNo}/{pageSize}';

// 分页查询车辆信息（车队）list
const motorcadeListApi = '/api/app/jac-motorcade-vehicle/queryPageableDataToDriver/{pageNo}/{pageSize}';

// 解绑车辆和车队关系
const unbindVehicleApi = '/api/app/jac-motorcade-vehicle/unbindVehicle?vehicleId={vehicleId}';

// 根据Id获取车辆信息
const getByIdApi = '/api/app/jac-motorcade-vehicle/byId';

// 根据Vin码查询车辆信息
const getByVinApi = '/api/app/jac-motorcade-vehicle/vehicleSelectList';

// 根据车vin查询车辆信息详情
const getVehicleInfoByVinApi = '/api/app/jac-motorcade-vehicle/getVehicleInfoByVin?vin={vin}';

// 下拉框选择司机
const queryDriverListApi = '/api/app/jac-motorcade-vehicle/queryDriverList?customerId={customerId}&nameOrPhone={nameOrPhone}';

// 新增车辆信息
const addVehicleApi = '/api/app/jac-motorcade-vehicle/create';

// 编辑车辆信息
const modifyVehicleApi = '/api/app/jac-motorcade-vehicle/modify';

// 上传保险单图片
const uploadFileToPolicyApi = '/api/app/jac-motorcade-vehicle/uploadFileToPolicy';

// 上传行驶证图片
const uploadFileToRunLicenseApi = '/api/app/jac-motorcade-vehicle/uploadFileToRunLicense';

// 上传运输许可证图片
const uploadFileToTransportLicenseApi = '/api/app/jac-motorcade-vehicle/uploadFileToTransportLicense';

// 线路选择下拉列表
const getLineListApi = '/api/app/jac-motorcade-vehicle/getLineList';

// 车队列表api
export const carList = (opt) => fetch.post(apiFormat(carListApi, opt));

// 车辆列表api
export const motorcadeList = (opt) => fetch.post(apiFormat(motorcadeListApi, opt), opt);

// 解绑车辆和车队关系
export const unbindVehicle = (opt) => fetch.post(apiFormat(unbindVehicleApi, opt));

// 根据Id获取车辆信息
export const getById = (opt) => fetch.get(getByIdApi, {params: opt});

// 根据Vin码查询车辆信息
export const getByVin = (opt) => fetch.get(getByVinApi, {params: opt});

// 根据车vin查询车辆信息详情
export const getVehicleInfoByVin = (opt) => fetch.get(apiFormat(getVehicleInfoByVinApi, opt));

// 下拉框选择司机
export const queryDriverList = (opt) => fetch.get(apiFormat(queryDriverListApi, opt));

// 新增车辆信息
export const addVehicle = (payload) => fetch.post(addVehicleApi, payload);

// 编辑车辆信息
export const modifyVehicle = (payload) => fetch.post(modifyVehicleApi, payload);

// 修改司机信息
export const uploadFileToPolicy = (payload) => fetch.post(uploadFileToPolicyApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 修改司机信息
export const uploadFileToRunLicense = (payload) => fetch.post(uploadFileToRunLicenseApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 修改司机信息
export const uploadFileToTransportLicense = (payload) => fetch.post(uploadFileToTransportLicenseApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 线路选择下拉列表
export const getLineList = (opt) => fetch.get(getLineListApi, {params: opt});
