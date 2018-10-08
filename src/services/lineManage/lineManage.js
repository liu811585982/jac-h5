/**
 * 作者：yeshengqiang
 * 时间：2018-07-18
 * 描述：线路管理
 */

import { fetch, apiFormat } from '../baseService.js';

// 分页查询线路信息
const queryPageableDataApi = '/api/app/jac-line/queryPageableData/{pageNo}/{pageSize}';

// 启用或禁用线路
const setStatusApi = '/api/app/jac-line/setStatus/{id}/{status}';

// 查询线路详情
const lineDetailApi = '/api/app/jac-line/byId';

// 新增线路
const lineCreateApi = '/api/app/jac-line/create';

// 编辑线路
const lineUpdateApi = '/api/app/jac-line/update';

// 分页查询线路信息
export const queryPageableData = (opt, payload) => fetch.post(apiFormat(queryPageableDataApi, opt), payload);

// 启用或禁用线路
export const setStatus = (opt) => fetch.post(apiFormat(setStatusApi, opt));

// 查询线路详情
export const lineDetail = (opt) => fetch.get(lineDetailApi, {params: opt});

// 新增线路
export const lineCreate = (payload) => fetch.post(lineCreateApi, payload);

// 编辑线路
export const lineUpdate = (payload) => fetch.post(lineUpdateApi, payload);
