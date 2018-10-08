/**
 * 作者：yeshengqiang
 * 时间：2018-03-28
 * 描述：loginService.js
 */

import { fetch, apiFormat } from '../baseService.js';

// 退出
const logoutApi = '/api/app/jac-driver/logout';

// 修改用信息
const modifyPersonalInfoApi = '/api/app/jac-driver/modifyPersonalInfo';

// 获取用户信息
const getUserApi = '/api/app/jac-driver/personalInfo';

// 修改密码
const updatePasswordApi = '/api/app/jac-driver/driver-updatePassword';

// 获取总积分
const getTotalRecodeApi = '/api/app/jac-points/points';

// 查询某月积分记录
const getRecodeApi = '/api/app/jac-points/points/record';

// 获取（某月）签到记录
const getSignRecordApi = '/api/app/jac-points/sign/record';

// 查询（某月）积分记录
const getScoreRecordApi = '/api/app/jac-points/points/record';

// 上传签到积分
const updateSignScoreApi = '/api/app/jac-points/sign?point={point}';

// 上传头像
const uploadPhotoApi = '/api/app/jac-driver/uploadAvatar';

// 获取车队信息
const getMotorcadeApi = '/api/app/jac-motorcade-information/byId';

// 修改车队信息
const modifyMotorcadeApi = '/api/app/jac-motorcade-information/modify';

// 上传营业执照
const uploadFileToBusinessLicenseApi = '/api/app/jac-motorcade-information/uploadFileToBusinessLicense';

// 上传身份证正反面
const uploadFileToIdentityApi = '/api/app/jac-motorcade-information/uploadFileToIdentity';

// 获取积分记录
const getSignPointApi = '/api/app/pub-resource/getSignPoint';

// 退出
export const loginout = () => fetch.post(logoutApi);

// 修改用户信息
export const modifyPersonalInfo = (payload) => fetch.put(modifyPersonalInfoApi, payload);

// 获取用户信息
export const getUser = () => fetch.get(getUserApi);

// 修改密码
export const updatePassword = (payload) => fetch.put(updatePasswordApi, payload, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

// 获取总积分
export const getTotalRecode = () => fetch.get(getTotalRecodeApi);

// 获取当月积分记录
export const getRecode = (opt) => fetch.get(getRecodeApi, {params: opt});

// 获取（某月）签到记录
export const getSignRecord = (opt) => fetch.get(getSignRecordApi, {params: opt});

// 查询（某月）积分记录
export const getScoreRecord = (opt) => fetch.get(getScoreRecordApi, {params: opt});

// 上传签到积分
export const updateSignScore = (payload) => fetch.post(apiFormat(updateSignScoreApi, payload));

// 上传签到积分
export const uploadPhoto = (payload) => fetch.post(uploadPhotoApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 修改车队信息
export const getMotorcade = (opt) => fetch.get(getMotorcadeApi, {params: opt});

// 修改车队信息
export const modifyMotorcade = (payload) => fetch.post(modifyMotorcadeApi, payload);

// 上传营业执照
export const uploadFileToBusinessLicense = (payload) => fetch.post(uploadFileToBusinessLicenseApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 上传身份证(正反面)
export const uploadFileToIdentity = (payload) => fetch.post(uploadFileToIdentityApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 获取积分记录
export const getSignPoint = () => fetch.get(getSignPointApi);
