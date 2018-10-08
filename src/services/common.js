/**
 * 作者：yeshengqiang
 * 时间：2018-04-16
 * 描述：common service
 */

 import { fetch } from './baseService.js';

 // 获取车队列表
 const fleetSelectApi = '/api/app/pub-resource/fleetSelect';

 // 车长、厢型、车型选择列表
 const vehicleDictSelectApi = '/api/app/jac-motorcade-vehicle/vehicleDictSelect';

// 获取一键救援电话
const rescueCallApi = '/api/app/pub-resource/getRescueCall';

// 获取30天以内的推送信息
const getAllMessageApi = '/api/app/mqtt/getAllMessage';

// 获取车队列表
export const fleetSelect = () => fetch.get(fleetSelectApi);

// 车长、厢型、车型选择列表 （MODEL：车型，VAN：厢型，LENGTH：车长）
export const vehicleDictSelect = (opt) => fetch.get(vehicleDictSelectApi, {params: opt});

// 获取一键救援电话
export const rescueCall = () => fetch.get(rescueCallApi);

// 获取30天以内的推送信息
export const getAllMessage = () => fetch.get(getAllMessageApi);
