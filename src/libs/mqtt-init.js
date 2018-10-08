/**
 * 作者：yeshengqiang
 * 时间：2018-05-07
 * 描述：mqtt-init.js
 */

import mqtt from 'mqtt';

// mqtt 配置文件
export const mqServerCfg = {
    keepalive: 10,
    protocolId: 'MQTT',
    clientId: Symbol('clientId'),
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 3000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false
};

const mqttInit = (host, options, callback) => {
    const client = mqtt.connect(host, Object.assign({}, mqServerCfg, options));

    // 错误
    client.on('error', function (err) {
        console.log(err);
        client.end();
    });

    // 连接成功
    client.on('connect', function () {
        console.log('mqtt连接成功');
        // 取消订阅订阅
        client.unsubscribe('#');
    });

    // 获取消息
    client.on('message', callback);

    // 断开连接
    client.on('close', function () {
        console.log('断开连接');
    });
    return client;
};

export default mqttInit;
