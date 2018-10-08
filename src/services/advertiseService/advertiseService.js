/**
 *  advertiseService
 */
import { fetch } from '@/services/baseService';

const latestAdListApi = '/api/app/advertisement/getLatestAdList';           // 查询最新发布的广告 method 'get'

const adByIdApi = '/api/app/advertisement/getById';                         // 查看广告详情 method 'get'

// 查询最新发布的广告
export const latestAdList = () => fetch.get(latestAdListApi);

// 查看广告详情
export const adById = (opt) => fetch.get(adByIdApi, {params: opt});
