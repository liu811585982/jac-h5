/**
 * 作者：yeshengqiang
 * 时间：2018-04-28
 * 描述：油耗统计
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .report-body {
        flex: 1;
        position: relative;
        overflow: hidden;
        .section-body-scroller {
            position: absolute;
            @include wh(100%, 100%);
            overflow: auto;
            .list-box {
                padding: $font-size-10;
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
                    .border-b {
                        border-bottom: 1px solid #EEEEEE;
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
            }
        }
    }
</style>
<template>
    <div class="report-body">
        <div class="section-body-scroller">
            <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
            @on-pulldown-loading="refresh"
            :pulldown-config="$store.state.pulldownDefaultConfig"
            :pullup-config="$store.state.pullupDefaultConfig"
            ref="scroller" height="100%">
            <ul class="list-box">
                <li class="list-box-item"  @click="handleDetail(item)" v-for="(item, index) in list" :key="index">
                    <h3 class="list-item-title">
                        <span>{{item.plateNo}}</span>
                        <span class="fr clearfix">{{item.updateTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                    </h3>
                    <div class="list-item-content border-b">
                        <div class="content-left">
                            <div class="mark">{{item.fuelType}}</div>
                        </div>
                        <div class="content-right">
                            <p class="right-item">
                                <span classs="title">VIN码:</span>
                                <span class="value">{{item.vin}}</span>
                            </p>
                            <p class="right-item">
                                <span classs="title">当日油耗：</span>
                                <span class="value">{{item.fuelConsumption}}L</span>
                            </p>
                            <p class="right-item">
                                <span classs="title">平均油耗：</span>
                                <span class="value">{{item.fuelConsumptionAVG}}L/km</span>
                            </p>
                            <p class="right-item">
                                <span classs="title">行驶里程：</span>
                                <span class="value">{{item.mileage}}km</span>
                            </p>
                        </div>
                    </div>
                </li>
                <transition name="fade">
                    <li v-show="!list.length" class="no-data-tip">
                        <div class="text">暂无数据</div>
                    </li>
                </transition>
            </ul>
        </scroller>
        </div>
    </div>
</template>
<script>
    import { Scroller } from 'vux';
    import list from '@/mixins/list';
    import { queryPageableDataToDriver } from '@/services/reportService/reportService';

    export default {
        mixins: [ list ],
        components: { Scroller },
        methods: {
            // 获取数据
            async _getList () {
                const result = await queryPageableDataToDriver(this.searchData);
                return result.data;
            },
            handleDetail (item) {
                const query = {
                    plateNo: item.plateNo,
                    vin: item.vin
                };
                this.$router.push({path: '/main/report/FuelDetail', query: query});
            }
        }
    };
</script>
