/**
 * 作者：yeshengqiang
 * 时间：2018-05-03
 * 描述：油耗详情
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        display: flex;
        display: -webkit-flex;
        -webkit-align-items: stretch;
        -webkit-flex-flow: column nowrap;
        align-items: stretch;
        flex-flow: column nowrap;
        overflow: hidden;
        .section-body {
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: stretch;
            -webkit-flex-flow: column nowrap;
            align-items: stretch;
            flex-flow: column nowrap;
            overflow: auto;
            background-color: $body_bg;
            .fuel-body-header {
                padding: $font-size-5 $font-size-10 0;
                margin-bottom: $font-size-10;
                background-color: $white;
                .list-box-item {
                    padding: px2rem(15);
                    margin-bottom: px2rem(15);
                    background-color: $white;
                    line-height: px2rem(56);
                    .list-item-title {
                        font-size: px2rem(30);
                        border-bottom: 1px solid #ebeef5;
                        span {
                            font-weight: 500;
                            color: #000000;
                        }
                        .fr {
                            float: right;
                        }
                        .color-unfinished {
                            color: #FD585D;
                        }
                        .color-finished {
                            color: #80C792;
                        }
                        .color-refuse {
                            color: #FD585D;
                        }
                        .color-processed  {
                            color: #FB9900;
                        }
                    }
                    .list-item-content {
                        font-size: px2rem(28);
                        display: flex;
                        display: -webkit-flex;
                        -webkit-align-items: center;
                        -webkit-flex-flow: row nowrap;
                        flex-flow: row nowrap;
                        align-items: flex-start;
                        .content-left {
                            padding-top: px2rem(15);
                            margin-right: px2rem(30);
                            .mark {
                                width: px2rem(107);
                                height: px2rem(107);
                                line-height: px2rem(107);
                                text-align: center;
                                font-size: px2rem(36);
                                color: #ffffff;
                                border-radius: px2rem(10);
                                background-color: #F87E4F;
                            }

                        }
                        .content-right {
                            flex: 1;
                            font-size: px2rem(28);
                            color: #6D7C8B;
                            .right-item {
                                .value {
                                    color: #212121;
                                    font-weight: 500;
                                }
                            }
                        }
                        .mark-content {
                            flex: 1;
                            display: flex;
                            display: -webkit-flex;
                            color: #6D7C8B;
                            line-height: px2rem(44);
                            .value {
                                flex: 1;
                                display: inline-block;
                                word-break: break-all;
                            }
                        }
                    }
                }
                .body-header-title {
                    font-size: $font-size-16;
                    font-weight: 500;
                    padding: $font-size-10 0;
                    color: #333333;
                    border-bottom: 1px dashed #EEEEEE;
                    span {
                        color: #666666;
                        font-weight: normal;
                        &.back-right {
                            display: block;
                            float: right;
                            .icon-icon-plate {
                                display: inline-block;
                                width: $font-size-18;
                                height: $font-size-18;
                                line-height: $font-size-18;
                                text-align: center;
                                font-size: $font-size-12;
                                color: $white;
                                vertical-align: top;
                                margin-right: $font-size-5;
                                background-color: #F39901;
                            }
                        }
                    }
                }
                .body-header-content {
                    font-size: $font-size-16;
                    display: flex;
                    display: -webkit-flex;
                    -webkit-align-items: center;
                    -webkit-flex-flow: row nowrap;
                    align-items: center;
                    flex-flow: row nowrap;
                    .content-p {
                        flex: 1;
                        -webkit-flex: 1;
                        padding: $font-size-10 0;
                        color: #666666;
                        @include ellipsis;
                        .icon-icon {
                            display: inline-block;
                            width: $font-size-18;
                            height: $font-size-18;
                            line-height: $font-size-18;
                            text-align: center;
                            font-size: $font-size-12;
                            color: $white;
                            vertical-align: middle;
                        }
                    }
                }
            }
            .fuel-body-content {
                padding: $font-size-10;
                flex: 1;
                -webkit-flex: 1;
                background-color: $white;
                display: flex;
                display: -webkit-flex;
                align-items: stretch;
                -webkit-align-items: stretch;
                flex-flow: column nowrap;
                -webkit-flex-flow: column nowrap;
                .fuel-line-header {
                    padding: $font-size-5 $font-size-10;
                    font-size: $font-size-14;
                    span {
                        display: inline-block;
                        position: relative;
                        margin-right: $font-size-15;
                        &.average {
                            color: #34C8A1;
                        }
                        &.everyday {
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
                .fuel-line-body {
                    flex: 1;
                    -webkit-flex: 1;
                    .line-body-content {
                        @include wh(100%, 250px);
                    }
                }
            }
            .fuel-footer {
                padding: $font-size-10;
                // background-color: $white;
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
    }
</style>
<template>
    <div class="section-panel fuel-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-body">
            <div class="fuel-body-header">
                <div class="list-box-item">
                    <h3 class="list-item-title">
                        <span>{{detailInfo.plateNo}}</span>
                        <span class="fr clearfix">{{detailInfo.statisticsTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                    </h3>
                    <div class="list-item-content">
                        <div class="content-left">
                            <div class="mark">{{detailInfo.fuelType}}</div>
                        </div>
                        <div class="content-right">
                            <p class="right-item">
                                <span classs="title">VIN码:</span>
                                <span class="value">{{detailInfo.vin}}</span>
                            </p>
                            <p class="right-item">
                                <span classs="title">当日油耗：</span>
                                <span class="value">{{detailInfo.fuelConsumption}}L</span>
                            </p>
                            <p class="right-item">
                                <span classs="title">平均油耗：</span>
                                <span class="value">{{detailInfo.fuelConsumptionAvg}}L/km</span>
                            </p>
                            <p class="right-item">
                                <span classs="title">行驶里程：</span>
                                <span class="value">{{detailInfo.mileage}}km</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fuel-body-content">
                <div class="fuel-line-header">
                    <span class="everyday">每日油耗</span>
                    <span class="average">历史油耗</span>
                    <!-- <span :class="item.vehicleModel | vehicleModel" v-for="(item, index) in vehicleRate" :key="index">{{item.vehicleModel}}</span> -->
                </div>
                <div class="fuel-line-body">
                    <div class="line-body-content">
                        <echarts type="line" :options="lineConfig"></echarts>
                    </div>
                </div>
                <!-- 脚步 -->
                <div class="fuel-footer">
                    <span>油耗统计</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import { Echarts } from '@/components';
    import { getFuelConsumptionDetails } from '@/services/reportService/reportService';

    export default {
        components: { Echarts },
        data () {
            return {
                detailInfo: {},
                lineConfig: {}
            };
        },
        created () {
            this._getData();
        },
        methods: {
            formatColor (list) {
                return list.map(item => {
                    let res = '';
                    switch (item.label) {
                        case 'dailyList':
                            res = '#F5545D';
                            break;
                        case 'historyList':
                            res = '#34C8A1';
                            break;
                    }
                    return res;
                });
            },
            // 获取详情
            async _getData () {
                try {
                    const result = await getFuelConsumptionDetails({vin: this.$route.query.vin});
                    this.keys = [];
                    let series = [];
                    let xAxis = [];
                    Object.keys(result.data).forEach((item, index) => {
                        if (!(result.data[item] instanceof Array)) {
                            this.detailInfo[item] = result.data[item];
                            return;
                        };
                        let mapKeys = {};
                        let data = [];
                        mapKeys.label = item;
                        result.data[item].forEach((im, i) => {
                            if (index === 0) {
                                xAxis.push(im.date);
                            }
                            data.push(im.fuelConsumption);
                        });
                        this.keys.push(mapKeys);
                        series.push({
                            name: mapKeys.label,
                            type: 'line',
                            data
                        });
                    });
                    this.lineConfig = {
                        legend: {
                            show: false
                        },
                        color: this.formatColor(this.keys),
                        xAxis: {
                            type: 'category',
                            data: xAxis
                        },
                        yAxis: [{
                            name: '油耗（L）',
                            type: 'value'
                        }],
                        series: series
                    };
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            }
        }
    };
</script>
