/**
 * 作者：aicong
 * 时间：2018-04-04
 * 描述：driverService.js
 */

import { fetch, apiFormat } from '../baseService.js';

// 车队添加司机
const addDriverApi = '/api/app/driver-manage/addDriver';

// 获取司机信息
const driverDetailApi = '/api/app/driver-manage/driverDetail';

// 查看司机列表
const driverListApi = '/api/app/driver-manage/driverList/{pageNum}/{pageSize}';

// 车队与司机解绑
const unbindFleetApi = '/api/app/driver-manage/unbindFleet';

// 修改司机信息
const updateDriverApi = '/api/app/driver-manage/updateDriver';

// 检测手机号是否是车队成员
const checkMobileApi = '/api/app/driver-manage/checkMobile?mobile={mobile}';

// 上传从业资格证
const uploadFileToCertificaterApi = '/api/app/driver-manage/uploadFileToCertificate';

// 上传驾照图片
const uploadFileToDrivingLicenseApi = '/api/app/driver-manage/uploadFileToDrivingLicense';

// 车队添加司机
export const addDriver = (payload) => fetch.post(addDriverApi, payload);

// 获取司机信息
export const driverDetail = (opt) => fetch.get(driverDetailApi, {params: opt});

// 查看司机列表
export const driverList = (opt, payload) => fetch.post(apiFormat(driverListApi, opt), payload);

// 车队与司机解绑
export const unbindFleet = (opt) => fetch.delete(unbindFleetApi, {params: opt});

// 修改司机信息
export const updateDriver = (payload) => fetch.post(updateDriverApi, payload);

// 上传从业资格证
export const uploadFileToCertificater = (payload) => fetch.post(uploadFileToCertificaterApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 上传驾照图片
export const uploadFileToDrivingLicense = (payload) => fetch.post(uploadFileToDrivingLicenseApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 检测手机号是否是车队成员
export const checkMobile = (opt) => fetch.get(apiFormat(checkMobileApi, opt));
