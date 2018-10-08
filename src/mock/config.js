/**
 * 作者：yeshengqiang
 * 时间：2018-03-23
 * 描述：mock 配置文件
 */
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
export const mockApi = new MockAdapter(axios);
export const MockJS = require('mockjs');
export const loginInfo = {
    phone: '123',
    password: '123'
};