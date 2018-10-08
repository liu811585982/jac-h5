/**
 * 作者：yeshengqiang
 * 时间：2018-05-07
 * 描述：mqtt.js
 */
import { globalConfig, mqttConfig, eventMsg } from '@/libs/config';

export default {
    mounted () {
        this.addSubscribe();
        eventMsg.$on('routeToMessageDetail', (msg) => {
            this.$router.push({path: '/main/message/detail', query: {id: msg.payload}});
        });
    },
    methods: {
        // 初始化mqtt
        async addSubscribe () {
            try {
                if (!this.userInfo.id) {
                    await this.getUserInfo();
                }
                // 初始化订阅配置 添加维保
                let subscribe = [{
                    name: this.userInfo.mobile,
                    qos: 0
                }].concat(mqttConfig.subscribe);
                let unsubscribeList = [];
                subscribe.forEach(item => {
                    unsubscribeList.push(item.name);
                });
                // 取消订阅
                globalConfig.clientMqtt.unsubscribe(unsubscribeList, () => {
                    // 添加订阅
                    subscribe.forEach(item => {
                        globalConfig.clientMqtt.subscribe(item.name, {qos: item.qos});
                    });
                });
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        }
    }
};
