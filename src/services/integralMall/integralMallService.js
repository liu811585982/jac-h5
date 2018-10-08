/**
 *  积分商城 service
 */
import { fetch, apiFormat } from '@/services/baseService';

const homeOverViewDataApi = '/api/app/jacCommodityInfo/discount';          // 积分商城首页接口 method 'GET';
const activityOrGoodsAreaApi = '/api/app/jacCommodityInfo/queryList/{pageNo}/{pageSize}'; // 活动专区或商品专区 method 'POST'
const goodsDetailApi = '/api/app/jacCommodityInfo/detail/{id}';                            // 商品详情 method 'GET'
const exchangeApi = '/api/app/jacCommodityLog/add';  // 添加兑换记录 method 'POST'
const exchangeRecordApi = '/api/app/jacCommodityLog/conversionLog/{pageNo}/{pageSize}';     // 兑换记录接口 method 'GET'
const integralConsumingRecordApi = '/api/app/jacCommodityLog/pointLog/{pageNo}/{pageSize}'; // 积分消费记录 method 'GET'

const couponListApi = '/api/app/jacCommodityLog/list/{pageNo}/{pageSize}';                  // 我的优惠券 method 'GET'
const orderListApi = '/api/app/jacCommodityLog/order/{orderState}/{pageNo}/{pageSize}';        // App订单展示接口 method 'GET'

const orderDetailApi = '/api/app/jacCommodityLog/orderDetail/{orderId}';                    // App订单详情 method 'GET'
const orderGoodsDetailApi = '/api/app/jacCommodityLog/orderCommodityDetail/{commodityId}';  // App订单中商品详情

// 积分商城首页接口
export const homeOverViewData = () => fetch.get(homeOverViewDataApi);

// 活动专区或积分专区列表
export const activityOrGoodsArea = (opt, payload) => fetch.post(apiFormat(activityOrGoodsAreaApi, opt), payload);

// 商品详情
export const goodsDetail = (opt) => fetch.get(apiFormat(goodsDetailApi, opt));

// 添加兑换记录
export const exchange = (payload) => fetch.post(exchangeApi, payload);

// 兑换记录接口
export const exchangeRecord = (opt) => fetch.get(apiFormat(exchangeRecordApi, opt), {params: opt});

// 积分消费记录
export const integralConsumingRecord = (opt) => fetch.get(apiFormat(integralConsumingRecordApi, opt));

// 我的优惠券
export const couponList = (opt) => fetch.post(apiFormat(couponListApi, opt), opt);

// App订单列表
export const orderList = (opt) => fetch.get(apiFormat(orderListApi, opt));

// APP订单详情 (查询一个订单下多个商品)
export const orderDetail = (opt) => fetch.get(apiFormat(orderDetailApi, opt));

// App订单中商品详情
export const orderGoodsDetail = (opt) => fetch.get(apiFormat(orderGoodsDetailApi, opt));
