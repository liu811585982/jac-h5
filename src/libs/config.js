/**
 * 作者：yeshengqiang
 * 时间：2018-05-07
 * 描述：config.js
 */

import { _eval, getStore } from './utils.js';
import EventMsg from './event.js';
import { addPushMessage } from './websql.js';
import mqttInit from './mqtt-init.js';
import { push } from './plus.js';
const env = process.env.SERVER_ENV;
const serverConf = {
    'prod': {
        baseURL: 'http://220.178.49.218:10041',
        imgHttp: 'http://220.178.49.218:10041',
        mqtt: 'ws://220.178.49.218:1884/mqtt',
        AOTA: 'https://www.pgyer.com/KO66',
        IOTA: 'https://www.pgyer.com/hh26'
    },
    '120': {
        baseURL: 'http://101.207.139.52:30041',
        imgHttp: 'http://101.207.139.52:30501',
        mqtt: 'ws://101.207.139.52:38083/mqtt',
        AOTA: 'https://www.pgyer.com/4FYi',
        IOTA: 'https://www.pgyer.com/XLpM'
    },
    'uat': {
        baseURL: 'http://211.145.49.225:10041',
        imgHttp: 'http://211.145.49.225:10041',
        mqtt: 'ws://211.145.49.225:1884/mqtt',
        AOTA: 'https://www.pgyer.com/4FYi',
        IOTA: 'https://www.pgyer.com/XLpM'
    },
    'test': {
        baseURL: 'http://10.0.11.22:10042',
        imgHttp: 'http://demo.jac.incarcloud.com:30501',
        mqtt: 'ws://52.83.166.175:8083/mqtt',
        AOTA: 'https://www.pgyer.com/4FYi',
        IOTA: 'https://www.pgyer.com/XLpM'
    }
};

// ota 升级配置
export const OtaConf = {
    AOTA: serverConf[env].AOTA,
    IOTA: serverConf[env].IOTA
};

const production = process.env.NODE_ENV === 'production';

// 高德地图key
export const AmapKey = '09fc21a01b861edccad8027462452966';

export const baseURL = production
                            ? serverConf[env]['baseURL']
                            : serverConf['test']['baseURL'];

// 订阅主题
export const HOLIDAY_TOPIC = 'JAC_MQTT_HOLIDAY';        // 节日慰问
export const SYSTEM_TOPIC = 'JAC_MQTT_SYSTEM';          // 系统消息

// bbs地址
export const bbsUrl = 'http://10.0.11.22:8081';

// 图片服务器地址
// export const imgHttp = baseURL;
export const imgHttp = production
                            ? serverConf[env]['imgHttp']
                            : serverConf['test']['imgHttp'];

// mqtt配置
export const mqttConfig = {
    host: production
            ? serverConf[env]['mqtt']
            : serverConf['test']['mqtt'],     // text
    options: {
        username: 'admin',
        password: 'public'
    },
    // 订阅主题列表
    subscribe: [
        {
            name: HOLIDAY_TOPIC,               // 节日慰问
            qos: 0                             // 订阅级别 （0：最多接收一次， 1：至少接收一次， 2：仅接收一次）
        },
        {
            name: SYSTEM_TOPIC,                // 系统消息
            qos: 0                             // 订阅级别 （0：最多接收一次， 1：至少接收一次， 2：仅接收一次）
        }
    ]
};

// 订阅消息
export const eventMsg = new EventMsg();

// echartsConfig
export const echartsConfig = {
    // 饼状图
    pie: {
        legend: {
            x: 'center',
            y: 'bottom',
            textStyle: {
                color: '#949494'
            },
            data: []
        },
        color: [],
        calculable: true,
        series: []
    },
    // 折线图
    line: {
        legend: {
            x: 'center',
            y: 'top',
            textStyle: {
                color: '#949494'
            },
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: []
    }
};

// 全局信息
export const globalConfig = {
    clientMqtt: mqttInit(mqttConfig.host, mqttConfig.options, function (topic, message, packet) {
        message = _eval(message.toString());
        addPushMessage({
            title: message.title,
            pid: message.id,
            content: message.content,
            issueName: message.issueName,
            issueTime: message.issueTime,
            overview: message.overview,                      // 没有预览消息以三个点展示
            mobile: JSON.parse(getStore('loginInfo')).mobile,
            type: topic,
            status: 'unread'
        }, function (response) {
            if (response.result === 0) {
                console.log(`新增数据${response.responseData.insertId}成功`);
                push.add(message.title, response.responseData.insertId, (msg) => {
                    eventMsg.$emit('routeToMessageDetail', msg);
                });
                eventMsg.$emit('messageEvent', topic, message);
            }
        });
    })
};
