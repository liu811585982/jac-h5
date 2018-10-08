<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch);
        .section-body {
            flex: 1;
            @include flex(stretch);
            .section-scroller-body {
                flex: 1;
                background: #fff;
                overflow: auto;
                .report-item {
                    .title {
                        padding: px2rem(10) px2rem(25);
                        border-bottom: 1px solid #f2f2f2;
                        line-height: px2rem(56);
                        .sign {
                            display: inline-block;
                            width: px2rem(10);
                            height: px2rem(25);
                            background: $global_color;
                        }
                        .desc {
                            font-size: px2rem(30);
                            font-weight: 600;
                        }
                        .sub-desc {
                            margin-left: px2rem(5);
                            font-size: px2rem(26);
                            color: #6d7c8b;
                        }
                        .trend {
                            font-size: px2rem(26);
                            color: $global_color;
                        }
                    }
                    .composite-score {
                        padding: px2rem(20) px2rem(70);
                        @include flex(center, row nowrap);
                        .composite-score-left {
                            flex: 0 0 px2rem(250);
                            .progress {
                                @include wh(#{px2rem(180)}, #{px2rem(180)});
                            }
                        }
                        .composite-score-right {
                            flex: 1;
                            .content-p {
                                &:first-child {
                                    font-size: px2rem(26);
                                    margin-bottom: px2rem(15);
                                }
                                &:last-child {
                                    font-size: px2rem(28);
                                    font-weight: 600;
                                }
                                .strong {
                                    font-size: px2rem(28);
                                    font-weight: 600;
                                    color: $global_color;
                                }
                            }
                        }
                    }
                    .data-view {
                        padding: px2rem(20);
                        .data-grid {
                            @include flex(stretch, row nowrap);
                            margin-bottom: px2rem(20);
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .data-card {
                                position: relative;
                                @include flex(stretch, column nowrap);
                                flex: 1;
                                height: px2rem(152);
                                .data-item {
                                    flex: 1;
                                    width: 100%;
                                    font-size: px2rem(24);
                                    text-align: center;
                                    color: #6d7c8b;
                                    line-height: px2rem(49);
                                    @include ellipsis;
                                    overflow: hidden;
                                    span.strong {
                                        font-size: px2rem(26);
                                        color: #333333;
                                        font-weight: 600;
                                    }
                                    &.border-b-blue {
                                        border-bottom: 1px solid #a5cbfc;
                                    }
                                    &.border-b-gray {
                                        border-bottom: 1px solid #EEEEEE;
                                    }
                                }
                                .content-center {
                                    position: absolute;
                                    width: 100%;
                                    top: 50%;
                                    text-align: center;
                                    transform: translateY(-50%);
                                    .content-t {
                                        @include ellipsis;
                                        font-size: px2rem(28);
                                        color: $white;
                                    }
                                    .content-p {
                                        font-size: px2rem(26);
                                        &:first-child {
                                            color: #6d7c8b;
                                        }
                                        &:last-child {
                                            color: #333333;
                                            font-weight: 600;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .ranking-list {
                        padding: px2rem(10) px2rem(20);
                        .ranking-title {
                            line-height: px2rem(56);
                            text-align: center;
                            span {
                                font-size: px2rem(28);
                                font-weight: 600;
                            }
                            .strong {
                                color: $global_color;
                            }
                        }
                        .ranking-item {
                            @include flex(center, row nowrap);
                            padding: px2rem(15) px2rem(40);
                            font-size: px2rem(28);
                            color: #6d7c8b;
                            background: #f8f8f8;
                            border-bottom: 1px solid #EEEEEE;
                            .ranking-cell {
                                flex: 1;
                                text-align: center;
                                &:first-child {
                                    text-align: left;
                                }
                                &:last-child {
                                    text-align: right;
                                }
                            }
                        }
                    }
                    .analysis-table {
                        padding: px2rem(10) px2rem(20);
                        .table-item {
                            @include flex(stretch, row nowrap);
                            font-size: px2rem(28);
                            color: #6d7c8b;
                            .table-cell-label {
                                flex: 2;
                                padding: px2rem(15) 0;
                                margin-right: -1px;
                                margin-bottom: -1px;
                                @include ellipsis;
                                text-align: center;
                            }
                            .table-cell-value {
                                flex: 1;
                                padding: px2rem(15) 0;
                                margin-right: -1px;
                                margin-bottom: -1px;
                                @include ellipsis;
                                text-align: center;
                            }
                        }
                    }
                }
                .separate {
                    height: px2rem(15);
                    background: #f2f2f2;
                }
            }
        }
    }
    .mr15 {
        margin-right: px2rem(15);
    }
    .border-blue {
        border: 1px solid #a5cbfc;
    }
    .border-gray {
        border: 1px solid #EEEEEE;
    }
    .bgc-blue {
        background: #a5cbfc;
    }
    .bgc-orange {
        background: #ffcda9;
    }
    .calc_green {
        color: green;
    }
    .calc_red {
        color: red;
    }
</style>

<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header_nav_inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="section-scroller-body">
                <div class="report-item">
                    <div class="title">
                        <span class="sign"></span>
                        <span class="desc">综合评分<span class="sub-desc">(根据驾驶行为评分)</span></span>
                    </div>
                    <div class="composite-score">
                        <div class="composite-score-left">
                            <div class="progress">
                                <!--<div class="wrapper left">
                                    <div class="circleProgress leftCircle"></div>
                                </div>
                                <div class="wrapper right">
                                    <div class="circleProgress rightCircle"></div>
                                </div>
                                <div class="progress-text">
                                    75<span class="small">分</span>
                                </div>-->
                                <circle-progress :percent="driveReport.score"></circle-progress>
                            </div>
                        </div>
                        <div class="composite-score-right">
                            <div class="content-p">驾驶评分：<span class="strong">{{driveReport.score + '分'}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="separate"></div>
                <div class="report-item">
                    <div class="title">
                        <span class="sign"></span>
                        <span class="desc">数据一览</span>
                    </div>
                    <div class="data-view">
                        <div class="data-grid">
                            <div class="data-card bgc-blue">
                                <div class="content-center">
                                    <div class="content-t"><svg-icon type="mileage"></svg-icon>总里程</div>
                                    <div class="content-t">
                                        <span v-show="isNotExist(this.driveReport.mileage)" class="calc_red">--</span>
                                        {{this.driveReport.mileage|valFilter('km')}}</div>
                                </div>
                            </div>
                            <div class="data-card border-gray mr15">
                                <div class="data-item border-b-gray">
                                    日间：
                                    <span v-show="isNotExist(this.driveReport.daytimeMileage)" class="calc_red">--</span>
                                    <span class="strong">{{this.driveReport.daytimeMileage|valFilter('km')}}</span>
                                </div>
                                <div class="data-item border-b-gray">
                                    夜间：
                                    <span v-show="isNotExist(this.driveReport.nightMileage)" class="calc_red">--</span>
                                    <span class="strong">{{this.driveReport.nightMileage|valFilter('km')}}</span>
                                </div>
                                <div class="data-item">
                                    日均：
                                        <span v-show="isNotExist(this.driveReport.avgMileage)" class="calc_red">--</span>
                                        <span class="strong">{{this.driveReport.avgMileage|valFilter('km')}}</span>
                                </div>
                            </div>
                            <div class="data-card border-gray mr15">
                                <div class="content-center">
                                    <div class="content-p"><svg-icon type="avgOil"></svg-icon>总油耗</div>
                                    <div class="content-p">
                                        <span v-show="isNotExist(this.driveReport.fuel)" class="calc_red">--</span>
                                        {{this.driveReport.fuel|valFilter('L')}}
                                    </div>
                                </div>
                            </div>
                            <div class="data-card border-gray">
                                <div class="content-center">
                                    <div class="content-p"><svg-icon type="avgOil"></svg-icon>平均油耗</div>
                                    <div class="content-p">
                                        <span v-show="isNotExist(this.driveReport.avgFuel)" class="calc_red">--</span>
                                        {{this.driveReport.avgFuel|valFilter('L/100km')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="data-grid">
                            <div class="data-card bgc-orange">
                                <div class="content-center">
                                    <div class="content-t"><svg-icon type="run_time"></svg-icon>总时长</div>
                                    <div class="content-t">
                                        <span v-show="isNotExist(this.driveReport.drivingDuration)" class="calc_red">--</span>
                                        {{this.driveReport.drivingDuration|valFilter('h')}}
                                    </div>
                                </div>
                            </div>
                            <div class="data-card border-gray mr15">
                                <div class="data-item border-b-gray">
                                    日间：
                                    <span v-show="isNotExist(this.driveReport.daytimeDuration)" class="calc_red">--</span>
                                    <span class="strong">{{this.driveReport.daytimeDuration|valFilter('h')}}</span>
                                </div>
                                <div class="data-item border-b-gray">
                                    夜间：
                                    <span v-show="isNotExist(this.driveReport.nightDuration)" class="calc_red">--</span>
                                    <span class="strong">{{this.driveReport.nightDuration|valFilter('h')}}</span>
                                </div>
                                <div class="data-item">
                                    日均：
                                    <span v-show="isNotExist(this.driveReport.avgDuration)" class="calc_red">--</span>
                                    <span class="strong">{{this.driveReport.avgDuration|valFilter('h')}}</span>
                                </div>
                            </div>
                            <div class="data-card border-gray mr15">
                                <div class="content-center">
                                    <div class="content-p"><svg-icon type="run_time"></svg-icon>运营时长</div>
                                    <div class="content-p">
                                        <span v-show="isNotExist(this.driveReport.opTime)" class="calc_red">--</span>
                                        {{this.driveReport.opTime|valFilter('h')}}
                                    </div>
                                </div>
                            </div>
                            <div class="data-card border-gray">
                                <div class="content-center">
                                    <div class="content-p"><svg-icon type="run_time"></svg-icon>怠速时长</div>
                                    <div class="content-p">
                                        <span v-show="isNotExist(this.driveReport.idlingTime)" class="calc_red">--</span>
                                        {{this.driveReport.idlingTime|valFilter('h')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separate"></div>
                <div class="report-item">
                    <div class="title">
                        <span class="trend"><svg-icon type="ranking"></svg-icon></span>
                        <span class="desc">当月同车型油耗排行榜</span>
                    </div>
                    <div class="ranking-list" v-show="this.rank.rank">
                        <div class="ranking-title">
                            <span>第<span class="strong">{{this.rank.rank}}</span>名</span>
                        </div>
                        <div class="ranking-item" v-for="(item, index) in this.rank.top" :key="index" v-if="index < 5">
                            <span class="ranking-cell">第{{index + 1}}名</span>
                            <span class="ranking-cell">{{item.carLicensePlateNo}}</span>
                            <span class="ranking-cell">{{item.avgFuel|valFilter('L/100km')}}</span>
                        </div>
                    </div>
                </div>
                <div class="separate"></div>
                <div class="report-item">
                    <div class="title">
                        <span class="sign"></span>
                        <span class="desc">驾驶行为分析</span>
                    </div>
                    <div class="analysis-table">
                        <div class="table-item">
                            <div class="table-cell-label">分析内容</div>
                            <div class="table-cell-value">现状及趋势</div>
                            <div class="table-cell-value">标杆</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">最高使用里程</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.highestGearMileageRate[0])" class="calc_red">--</span>
                                {{driveReport.highestGearMileageRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.highestGearMileageRate[0], driveReport.highestGearMileageRate[1])" :class="calcColor(driveReport.highestGearMileageRate[0], driveReport.highestGearMileageRate[1])"
                                    :type="calcType(driveReport.highestGearMileageRate[0], driveReport.highestGearMileageRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.highestGearMileageRate[2])" class="calc_red">--</span>
                                {{driveReport.highestGearMileageRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">次高档使用里程</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.nextHighestGearMileageRate[0])" class="calc_red">--</span>
                                {{driveReport.nextHighestGearMileageRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.nextHighestGearMileageRate[0], driveReport.nextHighestGearMileageRate[1])" :class="calcColor(driveReport.nextHighestGearMileageRate[0], driveReport.nextHighestGearMileageRate[1])"
                                    :type="calcType(driveReport.nextHighestGearMileageRate[0], driveReport.nextHighestGearMileageRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.nextHighestGearMileageRate[2])" class="calc_red">--</span>
                                {{driveReport.nextHighestGearMileageRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">经济车速行驶里程</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.ecoSpeedMileateRate[0])" class="calc_red">--</span>
                                {{driveReport.ecoSpeedMileateRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.ecoSpeedMileateRate[0], driveReport.ecoSpeedMileateRate[1])" :class="calcColor(driveReport.ecoSpeedMileateRate[0], driveReport.ecoSpeedMileateRate[1])"
                                    :type="calcType(driveReport.ecoSpeedMileateRate[0], driveReport.ecoSpeedMileateRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.ecoSpeedMileateRate[2])" class="calc_red">--</span>
                                {{driveReport.ecoSpeedMileateRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">发动机经济行驶里程</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.ecoEngineSpeedMileageRate[0])" class="calc_red">--</span>
                                {{driveReport.ecoEngineSpeedMileageRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.ecoEngineSpeedMileageRate[0], driveReport.ecoEngineSpeedMileageRate[1])" :class="calcColor(driveReport.ecoEngineSpeedMileageRate[0], driveReport.ecoEngineSpeedMileageRate[1])"
                                    :type="calcType(driveReport.ecoEngineSpeedMileageRate[0], driveReport.ecoEngineSpeedMileageRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.ecoEngineSpeedMileageRate[2])" class="calc_red">--</span>
                                {{driveReport.ecoEngineSpeedMileageRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">刹车使用里程</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.brakingMileageRate[0])" class="calc_red">--</span>
                                {{driveReport.brakingMileageRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.brakingMileageRate[0], driveReport.brakingMileageRate[1])" :class="calcColor(driveReport.brakingMileageRate[0], driveReport.brakingMileageRate[1])"
                                    :type="calcType(driveReport.brakingMileageRate[0], driveReport.brakingMileageRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.brakingMileageRate[2])" class="calc_red">--</span>
                                {{driveReport.brakingMileageRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">带挡滑行</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.coastingWithGearMileageRate[0])" class="calc_red">--</span>
                                {{driveReport.coastingWithGearMileageRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.coastingWithGearMileageRate[0], driveReport.coastingWithGearMileageRate[1])" :class="calcColor(driveReport.coastingWithGearMileageRate[0], driveReport.coastingWithGearMileageRate[1])"
                                    :type="calcType(driveReport.coastingWithGearMileageRate[0], driveReport.coastingWithGearMileageRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.coastingWithGearMileageRate[2])" class="calc_red">--</span>
                                {{driveReport.coastingWithGearMileageRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">停车怠速时长</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.idlingDurationRate[0])" class="calc_red">--</span>
                                {{driveReport.idlingDurationRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.idlingDurationRate[0], driveReport.idlingDurationRate[1])" :class="calcColor(driveReport.idlingDurationRate[0], driveReport.idlingDurationRate[1])"
                                    :type="calcType(driveReport.idlingDurationRate[0], driveReport.idlingDurationRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.idlingDurationRate[2])" class="calc_red">--</span>
                                {{driveReport.idlingDurationRate[2]|valFilter('%')}}</div>
                        </div>
                        <div class="table-item">
                            <div class="table-cell-label border-gray">油门稳定行驶时长</div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.throttleStablingDurationRate[0])" class="calc_red">--</span>
                                {{driveReport.throttleStablingDurationRate[0]|valFilter('%')}}
                                <svg-icon v-show="isShow(driveReport.throttleStablingDurationRate[0], driveReport.throttleStablingDurationRate[1])" :class="calcColor(driveReport.throttleStablingDurationRate[0], driveReport.throttleStablingDurationRate[1])"
                                    :type="calcType(driveReport.throttleStablingDurationRate[0], driveReport.throttleStablingDurationRate[1])"></svg-icon>
                            </div>
                            <div class="table-cell-value border-gray">
                                <span v-show="isNotExist(driveReport.throttleStablingDurationRate[2])" class="calc_red">--</span>
                                {{driveReport.throttleStablingDurationRate[2]|valFilter('%')}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { CircleProgress } from '@/components';
    import { driveReportDetail } from '@/services/driveReport/driveReportService';

    export default {
        name: 'driveReportDetail',
        components: { CircleProgress },
        data () {
            return {
                driveReport: {
                    score: 0,
                    highestGearMileageRate: [],
                    nextHighestGearMileageRate: [],
                    ecoSpeedMileateRate: [],
                    ecoEngineSpeedMileageRate: [],
                    brakingMileageRate: [],
                    coastingWithGearMileageRate: [],
                    idlingDurationRate: [],
                    throttleStablingDurationRate: []
                },
                rank: {}
            };
        },
        created () {
            this.getDriveReport();
        },
        methods: {
            async getDriveReport () {
                try {
                    this.$indicator.open();
                    const opt = {
                        vin: this.$route.query.vin,
                        date: this.$route.query.date
                    };
                    const result = await driveReportDetail(opt);
                    this.$indicator.close();
                    if (result.data.tripMonthlyDTOList && result.data.tripMonthlyDTOList.length > 0) {
                        this.driveReport = result.data.tripMonthlyDTOList[0] || {};
                    }
                    this.rank = result.data.driveRanksDTO || {};
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                       message: e.message,
                       position: 'bottom'
                    });
                }
            },
            // 判断是否不存在
            isNotExist (val) {
                return !val && val !== 0 && val !== '0';
            },
            // 是否展示
            isShow (target, resource) {
                return !(target === undefined || target === null) && (resource === undefined || resource === null);
            },
            calcType (target, resource) {
                if (+target === +resource) return 'flat';
                return +target > +resource ? 'arrow_up' : 'arrow_down';
            },
            calcColor (target, resource) {
                return +target >= +resource ? 'calc_red' : 'calc_green';
            }
        },
        filters: {
            valFilter (val, unit) {
                if (!val && val !== 0 && val !== '0') {
                    return '';
                } else {
                    let number = Number(val);
                    number = number % 1 === 0 ? number : number.toFixed(1);
                    if (unit) {
                        return number + unit;
                    } else {
                        return number;
                    }
                }
            }
        }
    };
</script>
