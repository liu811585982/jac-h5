/**
 * 作者：yeshengqiang
 * 时间：2018-04-28
 * 描述：行程统计
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .report-body {
        flex: 1;
        background-color: $white;
        padding: $font-size-10;
        @include flex(stretch, column nowrap);
        .search-bar {
            position: relative;
            padding-bottom: $font-size-10;
            @include flex(stretch, row nowrap);
            margin-bottom: $font-size-10;
            .input-left,
            .input-right {
                position: relative;
                flex: 1;
                -webkit-flex: 1;
                font-size: $font-size-14;
                border: 1px solid #CCCCCC;
                .weui-cell {
                    position: relative;
                    padding: 6px 12px;
                    border-radius: 3px;
                    .ml5 {
                        margin-left: 5px;
                    }
                }
            }
            .input-left {
                margin-right: $font-size-20;
                &::after {
                    position: absolute;
                    left: 100%;
                    top: 50%;
                    transform: translate3d(0, -50%, 0) scale(0.5);
                    -webkit-transform: translate3d(0, -50%, 0) scale(0.5);
                    content: '';
                    width: $font-size-20;
                    height: 4px;
                    background-color: #CCCCCC;
                }
            }
            .search_btn_btn {
                padding: 6px 12px;
                margin-left: $font-size-10;
                line-height: 1.41176471;
                font-size: $font-size-14;
            }
            &:after {
                position: absolute;
                content: '';
                width: 100%;
                border-bottom: 1px dashed #B8B8B8;
                top: 100%;
                left: 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                z-index: 1;
            }
        }
        .report-content {
            flex: 1;
            -webkit-flex: 1;
            @include flex(stretch, column nowrap);
            .report-line-header {
                padding: $font-size-5 $font-size-10;
                font-size: $font-size-14;
                span {
                    display: inline-block;
                    position: relative;
                    margin-right: $font-size-15;
                    &.kanglList {
                        color: #FFC100;
                    }
                    &.junlList {
                        color: #34C8A1;
                    }
                    &.shuailList {
                        color: #F5545D;
                    }
                    &::before {
                        position: absolute;
                        left: -$font-size-10;
                        top: 50%;
                        content: '';
                        display: inline-block;
                        background-color: currentColor;
                        @include wh($font-size-5, $font-size-5);
                        border-radius: 100%;
                        -webkit-border-radius: 100%;
                        transform: translate3d(0, -50%, 0);
                    }
                }
            }
            .report-line-body {
                flex: 1;
                -webkit-flex: 1;
                @include flex(stretch, column nowrap);
            }
            .report-body-content {
                flex: 1;
                -webkit-flex: 1;
                position: relative;
                .echarts-panel {
                    position: absolute;
                }
            }
        }
        .report-footer {
            padding: $font-size-10;
            text-align: center;
            span {
                position: relative;
                color: #A8A8A8;
                font-size: $font-size-16;
                display: inline-block;
                padding: 0 $font-size-5;
                background-color: $white;
                &::after,
                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    @include wh(50%, 1px);
                    background-color: #AAAAAA;
                    transform: translateY(-50%) scale(0.5);
                    -webkit-transform: translateY(-50%) scaleY(0.5);
                    transform-origin: 0 0;
                }
                &::after {
                    left: 100%;
                }
                &::before {
                    right: 100%;
                }
            }
        }
    }
</style>
<template>
    <div class="report-body">
        <!-- 搜索部分 -->
        <div class="search-bar">
            <div class="input-left">
                <x-input readonly v-model.trim="searchData.startTime" @click.native="selectTime('startTime')" placeholder="开始时间" :show-clear="false">
                    <span class="ml5" slot="right">
                        <svg-icon type="calendar"></svg-icon>
                    </span>
                </x-input>
            </div>
            <div class="input-right">
                <x-input readonly v-model.trim="searchData.endTime" @click.native="selectTime('endTime')" placeholder="结束时间" :show-clear="false">
                    <span class="ml5" slot="right">
                        <svg-icon type="calendar"></svg-icon>
                    </span>
                </x-input>
            </div>
            <x-button mini type="warn" @click.native="_getData" class="search_btn_btn">查询</x-button>
        </div>
        <!-- 内容部分 -->
        <div class="report-content">
            <!-- <div class="report-line-header">
                <span :class="item.vehicleModel | vehicleModel" v-for="(item, index) in vehicleRate" :key="index">{{item.vehicleModel}}</span>
            </div> -->
            <div class="report-line-body">
                <!-- 车次比 -->
                <!-- <div class="report-body-content">
                    <Histogram class="echarts-panel" :result="vehicleRate">暂无数据</Histogram>
                </div> -->
                <!-- 线状图 -->
                <div class="report-body-content">
                    <echarts type="pie" class="echarts-panel" :options="pieConfig"></echarts>
                </div>
            </div>
        </div>
        <!-- 脚步 -->
        <div class="report-footer">
            <span>行程统计</span>
        </div>
    </div>
</template>
<script>
    import { Echarts, Histogram } from '@/components';
    import { XInput, XButton } from 'vux';
    import { formateDate, _toFixed, dateToTimeStamp } from '@/libs/utils';
    import { getTripStatistics } from '@/services/reportService/reportService';

    export default {
        components: { XInput, XButton, Echarts, Histogram },
        data () {
            return {
                vehicleRate: [],
                pieConfig: {},
                searchData: {
                    startTime: formateDate(+new Date() - 24 * 3 * 60 * 60 * 1000, 'yyyy-MM-dd'),
                    endTime: formateDate(new Date(), 'yyyy-MM-dd')
                }
            };
        },
        mounted () {
            this._getData();
        },
        methods: {
            formatColor (num) {
                return this.$store.state.colorList.slice(-num);
            },
            // 获取数据
            async _getData () {
                try {
                    const startTime = dateToTimeStamp(this.searchData.startTime);
                    const endTime = dateToTimeStamp(this.searchData.endTime);
                    if (startTime > endTime) {
                        this.$toast({
                            message: '开始日期大于结束日期',
                            position: 'bottom'
                        });
                        return;
                    }
                    // 10天
                    if (endTime - startTime > 10 * 24 * 3600 * 1000) {
                        this.$toast({
                            message: '时间选择范围超过10天',
                            position: 'bottom'
                        });
                        return;
                    }
                    const result = await getTripStatistics(this.searchData);
                    let total = 0;
                    let legend = [];
                    let series = result.data.map(item => {
                        let name = item.vehicleModel;
                        legend.push(name);
                        total += item.tripCount;
                        return {
                            name,
                            value: item.tripCount
                        };
                    });
                    series = series.map(item => {
                        let percent = total === 0 ? '0%' : _toFixed((item.value / total) * 100) + '%';
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
                        color: this.formatColor(legend.length),
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
            // 选择时间
            selectTime (property) {
                let scope = this;
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM-DD',
                    value: scope.searchData[property],
                    onConfirm (val) {
                        scope.searchData[property] = val;
                    }
                });
            }
        },
        filters: {
            vehicleModel (val) {
                let classres = '';
                switch (val) {
                    case '帅铃':
                        classres = 'shuailList';
                        break;
                    case '骏铃':
                        classres = 'junlList';
                        break;
                    case '康铃':
                        classres = 'kanglList';
                        break;
                }
                return classres;
            }
        }
    };
</script>
