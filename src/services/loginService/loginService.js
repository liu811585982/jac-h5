/**
 * 作者：yeshengqiang
 * 时间：2018-03-28
 * 描述：loginService.js
 */

import { querystring } from 'vux';
import { fetch } from '../baseService.js';

// login
const loginApi = '/api/app/pub-resource/login';

// register 注册
const registerApi = '/api/app/pub-resource/register';

// forgetPassword 忘记密码
const forgetPasswordApi = '/api/app/pub-resource/find/password';

// getCode 获取验证码
const getCodeApi = '/api/plat/sys-sms/getVerificationCode';

// 验证token
const getCheckTokenApi = '/api/app/pub-resource/token/isExpired';

// 司机注册
const registeredDriverApi = '/api/app/pub-resource/registeredDriver';

// 上传从业资格证
const uploadFileToCertificaterApi = '/api/app/pub-resource/uploadFileToCertificate';

// 上传驾照图片
const uploadFileToDrivingLicenseApi = '/api/app/pub-resource/uploadFileToDrivingLicense';

// 验证手机号是否注册
const checkMobileApi = '/api/app/pub-resource/checkMobile';

// 登录
export const login = (payload) => fetch.post(loginApi, querystring.stringify(payload), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

// 注册
export const register = (payload) => fetch.post(registerApi, payload);

// 忘记密码
export const forgetPassword = (payload) => fetch.post(forgetPasswordApi, payload);

// 获取验证码
export const getCode = (opt) => fetch.get(getCodeApi, {params: opt});

// 验证token
export const getCheckToken = (opt) => fetch.get(getCheckTokenApi, {params: opt});

// 司机注册
export const registeredDriver = (payload) => fetch.post(registeredDriverApi, payload);

// 车队与司机解绑
export const uploadFileToCertificater = (payload) => fetch.post(uploadFileToCertificaterApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 修改司机信息
export const uploadFileToDrivingLicense = (payload) => fetch.post(uploadFileToDrivingLicenseApi, payload, {headers: {'Content-Type': 'multipart/form-data'}});

// 验证手机号
export const checkMobile = (payload) => fetch.post(checkMobileApi, querystring.stringify(payload), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
