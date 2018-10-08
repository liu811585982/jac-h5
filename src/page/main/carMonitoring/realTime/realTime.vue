/**
 * 作者：yeshengqiang
 * 时间：2018-04-18
 * 描述：实时数据
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .real-time-panel {
        flex: 1;
        padding-top: px2rem(20);
        background-color: #f9f9f9;
        @include flex(center);
        .dial-box {
            width: 100%;
            flex: 1;
            -webkit-flex: 1;
            @include flex;
            .dial-panel {
                width: 100%;
                height: 50%;
                flex: 1;
                -webkit-flex: 1;
            }
        }
        .real-time-footer {
            width: 100%;
            background-color: $white;
            .real-time-item {
                padding: px2rem(30) 0;
                text-align: center;
                .item-title {
                    font-size: 14px;
                    margin-bottom: 10px;
                    color: #A2A2A2;
                    span {
                        vertical-align: middle;
                    }
                }
                .item-content {
                    font-size: 16px;
                    color: #333333;
                    font-weight: bold;
                }
            }
        }
    }
</style>
<template>
    <div class="real-time-panel">
        <!-- 表盘 -->
        <div class="dial-box" ref="panel"></div>
        <!-- footer -->
        <div class="real-time-footer">
            <hy-grid :list="list">
                <template slot-scope="scope">
                    <div class="real-time-item">
                        <p class="item-title">
                            <svg-icon :type="scope.row.icon"></svg-icon>
                            <span>{{scope.row.label}}</span>
                        </p>
                        <p class="item-content" v-content="`${scope.row.value},${scope.row.unit}`"></p>
                    </div>
                </template>
            </hy-grid>
        </div>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import { hyGrid } from '@/components';
    import { toNumber } from '@/libs/utils';
    import userInfo from '@/mixins/userInfo';
    import { getRtDataByVin } from '@/services/carMonitoring/carMonitoring';

    // echarts 配置信息
    const optionFirst = {
        toolbox: {
            show: false
        },
        series: [
            {
                name: '速度',
                type: 'gauge',
                min: 0,
                max: 240,
                splitNumber: 12, // 仪表盘刻度的分割段数。
                center: ['50%', '25%'],
                radius: '50%',
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    formatter: function (value) {
                        value = (value + '').split('.');
                        value.length < 2 && (value.push('00'));
                        return ('00' + value[0]).slice(-2) + '.' + (value[1] + '00').slice(0, 2);
                    },
                    fontSize: 12,
                    color: '#4c4c4e'
                },
                data: [{value: 0, name: 'km/h'}],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 6
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 3
                }
            },
            {
                name: '转速',
                type: 'gauge',
                min: 0,
                max: 8,
                splitNumber: 8, // 仪表盘刻度的分割段数。
                center: ['50%', '75%'],
                radius: '50%',
                detail: {
                    fontSize: 12,
                    color: '#4c4c4e'
                },
                data: [{value: 0, name: 'x1000 rpm'}],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 6
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 3
                }
            }
        ]
    };

    export default {
        mixins: [ userInfo ],
        components: { hyGrid },
        data () {
            return {
                timer: null,
                detailInfo: {},
                list: [
                    {
                        icon: 'totalMileage',
                        label: '累计总里程',
                        value: 'mileage',
                        unit: 'km'
                    },
                    // {
                    //     icon: 'lifeMileage',
                    //     label: '续航里程',
                    //     value: 'remainingFuelMileage',
                    //     unit: 'km'
                    // },
                    // {
                    //     icon: 'gears',
                    //     label: '挡位',
                    //     value: 'gear',
                    //     unit: ''
                    // },
                    // {
                    //     icon: 'Fuel',
                    //     label: '瞬时油耗',
                    //     value: 'instantFuel',
                    //     unit: 'L/100km'
                    // },
                    {
                        icon: 'Fuel',
                        label: '平均油耗',
                        value: 'avgFuel',
                        unit: 'L/100km'
                    },
                    {
                        icon: 'Fuel',
                        label: '燃油液位',
                        value: 'fuelLevel',
                        unit: '%'
                    }
                ],
                firstChart: {},
                secondChart: {}
            };
        },
        mounted () {
            this._getRtDataByVin();
            this.timer = setInterval(() => {
                this._getRtDataByVin();
            }, 10000);
            // 初始化echarts
            this.$nextTick(() => {
                this.firstChart = this._initEcharts(this.$refs.panel);
                this.firstChart.setOption(optionFirst, true);
            });
        },
        methods: {
            // 初始化echarts
            _initEcharts (el) {
                try {
                    return echarts.init(el);
                } catch (e) {}
            },
            // 根据vin 获取实时数据
            async _getRtDataByVin () {
                try {
                    if (!this.userInfo.defaultVin) {
                        await this.getUserInfo();
                    }
                    const result = await getRtDataByVin({vin: this.userInfo.defaultVin});
                    this.detailInfo = result.data || {};

                    // 车速
                    let speed = this.detailInfo.speed || 0;
                    optionFirst.series[0].data[0].value = ((speed / 100).toFixed(2)) * 100 - 0;
                    // 转速
                    let engineSpeed = this.detailInfo.engineSpeed || 0;
                    optionFirst.series[1].data[0].value = (engineSpeed / 1000).toFixed(2) - 0;

                    this.firstChart.setOption(optionFirst, true);
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            }
        },
        beforeDestroy () {
            clearInterval(this.timer);
            this.timer = null;
        },
        directives: {
            content (el, { value }, { context }) {
                let list = value.split(',');
                let unit = list[1];
                unit = unit ? `\0${unit}` : '';
                let val = context.detailInfo[list[0]] || '';
                val = toNumber(val);
                val = typeof val === 'number' ? val.toFixed(2) : val;
                el.innerHTML = `${val}${unit}`;
            }
        }
    };
</script>
