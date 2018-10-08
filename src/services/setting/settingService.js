/**
 *  系统设置service
 */
import {fetch, apiFormat} from '@/services/baseService';

const appVersionApi = '/api/app/app-version/latestAppVersion/{versionType}';            // 获取app最新版本 method 'get'

// 获取app最新版本
export const appVersion = (opt) => fetch.get(apiFormat(appVersionApi, opt));
