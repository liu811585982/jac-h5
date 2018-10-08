/**
 * 作者：yeshengqiang
 * 时间：2018-04-24
 * 描述：故障统计
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .alarm-statistical-panel {
        flex: 1;
        padding: px2rem(15) px2rem(10);
        @include flex(stretch, column nowrap);
        text-align: center;
        .alarm-statistical {
            flex: 1;
            @include flex(stretch, column nowrap);
            text-align: center;
            background-color: $white;
            box-shadow: 0 0 px2rem(5) rgba(0, 0, 0, 0.125);
            -webkit-box-shadow: 0 0 px2rem(5) rgba(0, 0, 0, 0.125);
            &:first-child {
                margin-bottom: px2rem(15);
            }
            .alarm-statistical-title {
                @include flex(center, row nowrap);
                height: px2rem(80);
                padding: 0 px2rem(10);
                font-size: px2rem(28);
                font-weight: 500;
                margin-bottom: px2rem(20);
                box-shadow: 0 0 px2rem(5) rgba(0, 0, 0, 0.125);
                -webkit-box-shadow: 0 0 px2rem(5) rgba(0, 0, 0, 0.125);
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
                        &.font20 {
                            font-size: px2rem(40);
                        }
                    }
                }
                .title-right {
                    flex: 1;
                    -webkit-flex: 1;
                    padding-left: 5px;
                    color: #939393;
                    font-weight: normal;
                    text-align: right;
                    .right-input {
                        position: relative;
                        display: inline-block;
                        padding: 4px 22px 4px 6px;
                        border: 1px solid #CCCCCC;
                        .triangle {
                            position: absolute;
                            right: 5px;
                            top: 50%;
                            font-size: 12px;
                            margin-top: 1px;
                            transform: translate3d(0, -50%, 0) rotate(180deg);
                        }
                    }
                }
            }
            .alarm-statistical-body {
                flex: 1;
                position: relative;
                .echarts-panel {
                    position: absolute;
                    @include wh(100%, 100%);
                    top: 0;
                    left: 0;
                }
            }
        }
    }
</style>
<template>
    <div class="alarm-statistical-panel">
        <!-- 饼状图 -->
        <div class="alarm-statistical">
            <h3 class="alarm-statistical-title">
                <div class="title-left">
                    <!-- <span class="signal">
                        <svg-icon type="fan"></svg-icon>
                    </span> -->
                    故障类占比
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
                <echarts type="pie" class="echarts-panel" :options="pieConfig"></echarts>
            </div>
        </div>
        <!-- 线状图 -->
        <!-- <div class="alarm-statistical">
            <h3 class="alarm-statistical-title">
                <div class="title-left">
                    <span class="signal font20">
                        <svg-icon type="trend"></svg-icon>
                    </span>
                    故障走势
                </div>
            </h3>
            <echarts type="line" class="echarts-panel" :options="lineConfig"></echarts>
        </div> -->
    </div>
</template>
<script>
    import userInfo from '@/mixins/userInfo';
    import { Echarts } from '@/components';
    import { _toFixed, to2Num } from '@/libs/utils';
    import { pieChart, lineChart } from '@/services/carCheckup/carCheckup';
    const date = new Date();
    const now = date.getFullYear() + '-' + to2Num(date.getMonth());

    export default {
        mixins: [ userInfo ],
        components: { Echarts },
        data () {
            return {
                list: [],
                pieConfig: {},
                lineConfig: {},
                currentValue: now
            };
        },
        mounted () {
            this._getPieData();
            // this._getLineData();
        },
        methods: {
            colorFormat (num) {
                return this.$store.state.colorList.slice(-num);
            },
            // 获取饼状图
            async _getPieData () {
                try {
                    if (!this.userInfo.defaultVin) {
                        await this.getUserInfo();
                    }
                    let alarmTime = this.currentValue;
                    const result = await pieChart({month: alarmTime, vin: this.userInfo.defaultVin});
                    let legend = [];
                    let total = 0;
                    let series = result.data.map(item => {
                        let name = item.faultDesc;
                        legend.push(name);
                        total += item.faultCount;
                        return {
                            value: item.faultCount,
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
                        color: this.colorFormat(legend.length),
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
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 获取线状图
            async _getLineData () {
                try {
                    if (!this.userInfo.defaultVin) {
                        await this.getUserInfo();
                    }
                    let alarmTime = this.currentValue;
                    const result = await lineChart({month: alarmTime, vin: this.userInfo.defaultVin});
                    let legend = [];
                    let series = [];
                    let xAxis = [];
                    result.data.forEach((item, index) => {
                        let data = [];
                        let name = item.faultDesc;
                        legend.push(name);
                        item.monthFaultResponses.forEach(im => {
                            data.push(im.faultCount);
                            if (index === 0) {
                                xAxis.push(im.month);
                            }
                        });
                        series.push({
                            type: 'line',
                            data,
                            name
                        });
                    });
                    this.lineConfig = {
                        legend: {
                            data: legend
                        },
                        grid: {
                            left: '3%',
                            right: '10%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            data: xAxis
                        },
                        series
                    };
                } catch (e) {
                    this.$indicator.close();
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
                        scope._getPieData();
                    }
                });
            }
        }
    };
</script>
