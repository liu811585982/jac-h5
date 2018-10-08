/**
 * 作者：yeshengqiang
 * 时间：2018-04-23
 * 描述：报警统计
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .alarm-statistical {
        flex: 1;
        @include flex(stretch, column nowrap);
        text-align: center;
        background-color: $white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.125);
        -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.125);
        .alarm-statistical-title {
            @include flex(center, row nowrap);
            height: px2rem(80);
            padding: 0 px2rem(10);
            font-size: px2rem(32);
            font-weight: 500;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.125);
            -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.125);
            .title-left {
                position: relative;
                vertical-align: middle;
                padding-left: px2rem(20);
                .signal {
                    position: absolute;
                    left: px2rem(10);
                    top: 50%;
                    z-index: 1;
                    display: inline-block;
                    font-size: px2rem(44);
                    transform: translate3d(0, -50%, 0);
                }
            }
            .title-right {
                flex: 1;
                -webkit-flex: 1;
                padding-left: px2rem(10);
                color: #939393;
                font-weight: normal;
                text-align: right;
                .right-input {
                    position: relative;
                    display: inline-block;
                    padding: px2rem(8) px2rem(44) px2rem(8) px2rem(12);
                    border: 1px solid #CCCCCC;
                    .triangle {
                        position: absolute;
                        right: px2rem(10);
                        top: 50%;
                        font-size: px2rem(24);
                        margin-top: 1px;
                        transform: translate3d(0, -50%, 0) rotate(180deg);
                    }
                }
            }
        }
        .alarm-statistical-body {
            flex: 1;
            @include flex(stretch, column nowrap);
            text-align: center;
            padding: px2rem(20) px2rem(30);
            .alarm-body-title-panel {
                margin-bottom: px2rem(30);
            }
            .alarm-body-content {
                flex: 1;
                position: relative;
                .echarts-panel {
                    position: absolute;
                }
            }
            .alarm-body-title {
                @include flex(center, row wrap);
                font-size: px2rem(28);
                margin-right: -1px;
                .body-title-item {
                    width: 50%;
                    position: relative;
                    padding: px2rem(10);
                    border: 1px solid #F1F1F1;
                    margin: -1px -1px 0 0;
                    @include flex(center, row nowrap, center);
                    &.title-item-bg {
                        background-color: #F7F7F7;
                    }
                    .item-color {
                        flex: 1;
                        position: relative;
                        display: inline-block;
                        text-align: left;
                        margin-left: px2rem(26);
                        &::before {
                            content: '';
                            display: block;
                            position: absolute;
                            @include wh(#{px2rem(16)}, #{px2rem(16)});
                            top: 50%;
                            left: px2rem(-26);
                            transform: translate3d(0, -50%, 0);
                        }
                        &.item-color-1 {
                            &::before {
                                background-color: #C33430;
                            }
                        }
                        &.item-color-2 {
                            &::before {
                                background-color: #FFC100;
                            }
                        }
                        &.item-color-3 {
                            &::before {
                                background-color: #34C8A1;
                            }
                        }
                        &.item-color-4 {
                            &::before {
                                background-color: #8EE3E8;
                            }
                        }
                        &.item-color-5 {
                            &::before {
                                background-color: #DDDDDD;
                            }
                        }
                    }
                    .text-right {
                        width: px2rem(150);
                        text-align: left;
                        padding: px2rem(0) px2rem(10);
                        display: inline-block;
                        color: #FE4646;
                        .svg-arrow {
                            color: currentColor;
                            font-size: px2rem(32);
                            display: inline-block;
                        }
                        &.roate {
                            color: #43bd48;
                            .svg-arrow {
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="alarm-statistical">
        <h3 class="alarm-statistical-title">
            <div class="title-left">
                <!-- <span class="signal">
                    <svg-icon type="signal"></svg-icon>
                </span> -->
                报警数据分析
            </div>
            <div class="title-right">
                时间:
                <span class="right-input" @click="chooseTime">
                    {{currentValue}}
                    <span class="triangle">
                        <svg-icon type="triangle"></svg-icon>
                    </span>
                </span>
            </div>
        </h3>
        <div class="alarm-statistical-body">
            <div class="alarm-body-title-panel">
                <ul class="alarm-body-title">
                    <li class="body-title-item" :class="{'title-item-bg': index === 0 || index === (list.length - 1)}" v-for="(item, index) in list" :key="index">
                        <span class="item-color" :class="[`item-color-${index + 1}`]">{{item.alarmType | alarmType}}</span>
                        <span class="text-right" :class="{'roate': +item.percent < 0}">
                            <span class="svg-arrow">
                                <svg-icon type="arrow"></svg-icon>
                            </span>
                            {{item.percent | percent}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="alarm-body-content">
                <echarts type="pie" class="echarts-panel" :options="pieConfig"></echarts>
            </div>
        </div>
    </div>
</template>
<script>
    import { Echarts } from '@/components';
    import { formateDate, _toFixed, toNumber } from '@/libs/utils';
    import { alarmDataAnalysis } from '@/services/alarmManagement/alarmManagement';

    export default {
        components: { Echarts },
        data () {
            return {
                list: [],
                pieConfig: {},
                currentValue: formateDate(new Date(), 'yyyy-MM')
            };
        },
        mounted () {
            this._getData();
        },
        methods: {
            colorFormat (list) {
                return list.map(item => {
                    let res = '';
                    switch (item) {
                        case '超速报警':
                            res = '#DE4041';
                            break;
                        case '超时停车':
                            res = '#FFC100';
                            break;
                        case '疲劳驾驶':
                            res = '#34C8A1';
                            break;
                        case '离线报警':
                            res = '#8EE3E8';
                            break;
                        case '油耗异常':
                            res = '#DDDDDD';
                            break;
                    }
                    return res;
                });
            },
            // 获取数据
            async _getData () {
                try {
                    let alarmTime = this.currentValue.replace('-', '');
                    const result = await alarmDataAnalysis({alarmTime});
                    if (!result.data.nowList) {
                        result.data.nowList = [];
                    }
                    if (!result.data.compareToMonth) {
                        result.data.compareToMonth = [];
                    }
                    if (!result.data.compareToLastMonth) {
                        result.data.compareToLastMonth = [];
                    }
                    this.list = result.data.compareToLastMonth;
                    let legend = [];
                    let total = 0;
                    let series = result.data.nowList.map(item => {
                        let name = this.$options.filters.alarmType(item.alarmType);
                        legend.push(name);
                        total += item.alarmCount;
                        return {
                            value: item.alarmCount,
                            name
                        };
                    });
                    series = series.map(item => {
                        let percent = _toFixed((item.value / total) * 100) + '%';
                        return {
                            ...item,
                            percent
                        };
                    });
                    this.pieConfig = {
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: legend
                        },
                        color: this.colorFormat(legend),
                        formatter: function (param) {
                            let filter = series.filter(item => item.name === param)[0];
                            return `${param}(${filter.percent})`;
                        },
                        series: [{
                            type: 'pie',
                            radius: [50, 80],
                            center: ['50%', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'inner',
                                    formatter: function (param) {
                                        return `${param.percent}%`;
                                    }
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: series
                        }]
                    };
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 选择日期
            chooseTime () {
                let scope = this;
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM',
                    value: scope.currentValue,
                    onConfirm (val) {
                        scope.currentValue = val;
                        scope._getData();
                    }
                });
            }
        },
        filters: {
            alarmType (val) {
                let res = '';
                switch (val) {
                    case 'OVERSPEED':
                        res = '超速报警';
                        break;
                    case 'TIMEOUT':
                        res = '超时停车';
                        break;
                    case 'FATIGUE':
                        res = '疲劳驾驶';
                        break;
                    case 'OFFLINE':
                        res = '离线报警';
                        break;
                    case 'FUEL':
                        res = '油耗异常';
                        break;
                }
                return res;
            },
            percent (val) {
                return `${toNumber(Math.abs(val))}%`;
            }
        }
    };
</script>
