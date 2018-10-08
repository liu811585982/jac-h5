/**
 *  货源信息
 */
import { fetch, apiFormat } from '@/services/baseService';

const canSignApi = '/api/app/third-cargo/canSign';              // 查询是否已有带审批数据存在 method 'get'

const queryOneApi = '/api/app/third-cargo/queryOne';            // 查询状态 method 'get'

const signApi = '/api/app/third-cargo/sign';                    // 申请接口 method 'post'

const cargoInfoListApi = '/api/app/third-cargo/cargoInfoList/{pageSize}/{pageNo}'; // 货源信息列表 method 'post'

const cargoInfoApi = '/api/app/third-cargo/cargoInfo';                             // 查询单条货源信息

const mapCityCountApi = '/api/app/third-cargo/mapCityCount';         // 查询某个地区货源总量 method 'get'

export const canSign = () => fetch.get(canSignApi);

export const queryOne = () => fetch.get(queryOneApi);

export const sign = (payload) => fetch.post(signApi, payload);

export const cargoInfoList = (opt) => fetch.post(apiFormat(cargoInfoListApi, opt), opt);

export const cargoInfo = (opt) => fetch.get(cargoInfoApi, {params: opt});

export const mapCityCount = (opt) => fetch.get(mapCityCountApi, {params: opt});
