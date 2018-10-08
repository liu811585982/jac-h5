/**
 * 作者：yeshengqiang
 * 时间：2018-04-24
 * 描述：故障详情
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .faultDetail-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            @include flex(stretch, column nowrap);
            flex: 1;
            -webkit-flex: 1;
            overflow: auto;
            background-color: #FFFFFF;
            .list-box {
                background: #F4F4F4;
                padding: px2rem(10);
                .list-box-item {
                    padding: px2rem(15);
                    background-color: $white;
                    border: 1px solid #EEEEEE;
                    .list-item-title {
                        font-size: px2rem(30);
                        font-weight: 500;
                        padding: px2rem(10) 0 px2rem(15) 0;
                        margin-bottom: px2rem(20);
                        color: #000000;
                        border-bottom: 1px solid #EEEEEE;
                        span {
                            &.back-right {
                                display: block;
                                float: right;
                            }
                        }
                    }
                    .list-item-content {
                        font-size: px2rem(28);
                        margin-bottom: px2rem(10);
                        &:last-child {
                            margin-bottom: 0;
                        }
                        @include flex(center, row nowrap);
                        .content-p {
                            flex: 1;
                            -webkit-flex: 1;
                            color: #6D7C8B;
                            @include ellipsis;
                            span {
                                vertical-align: middle;
                            }
                            .value {
                                color: #333333;
                                font-weight: 500;
                            }
                            .vin-color {
                                color: #DE4041;
                                font-weight: 500;
                            }
                            .color-origin {
                                color: #F39901;
                            }
                        }
                    }
                }
            }
            .fault-list-panel {
                @include flex(stretch, column nowrap);
                flex: 1;
                .title-bar {
                    width: 100%;
                    height: px2rem(50);
                    padding: 0 px2rem(25);
                    line-height: px2rem(50);
                    font-size: px2rem(28);
                    color: #6D7C8B;
                    background: #F4F4F4;
                }
                .content-box {
                    flex: 1;
                    width: 100%;
                    .content-list-item {
                        padding: px2rem(25);
                        font-size: px2rem(28);
                        @include flex(middle, row nowrap);
                        border-bottom: 1px solid #EEEEEE;
                        .item-left {
                            flex: 0 0 px2rem(100);
                            .index {
                                width: px2rem(40);
                                height: px2rem(40);
                                text-align: center;
                                line-height: px2rem(40);
                                color: #fff;
                                border-radius: px2rem(4);
                                background: $global_color;
                            }
                        }
                        .item-right {
                            flex: 1;
                            .content-p {
                                @include flex(middle, row nowrap);
                                margin-bottom: px2rem(10);
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .title {
                                    flex: 0 0 px2rem(130);
                                }
                                .value {
                                    flex: 1;
                                    text-align: right;
                                    color: #6D7C8B;
                                    word-wrap: normal;
                                    white-space: normal;
                                    word-break: break-all;
                                    .text-left {
                                        float: right;
                                        text-align: left;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="faultDetail-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-body">
            <div class="list-box">
                <div class="list-box-item">
                    <h3 class="list-item-title">
                        {{detailInfo.plateNo}}
                        <span class="back-right">{{detailInfo.phyExamTime}}</span>
                    </h3>
                    <div class="list-item-content">
                        <p class="content-p">
                            <span>故障数量:</span>
                            <span class="vin-color">{{detailInfo.faultCount}}</span>
                        </p>
                    </div>
                    <div class="list-item-content">
                        <p class="content-p">
                            <span>诊断时间:</span>
                            <span class="value">{{detailInfo.phyExamTime}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <ul class="fault-list-panel">
                <div class="title-bar">报警显示</div>
                <div class="content-box">
                    <div class="content-list-item" v-for="(item, index) in detailInfo.faults" :key="index">
                        <div class="item-left">
                            <div class="index">{{index + 1}}</div>
                        </div>
                        <div class="item-right">
                            <div class="content-p">
                                <span class="title">故障码</span>
                                <span class="value">{{item.faultCode}}</span>
                            </div>
                            <div class="content-p" v-show="item.faultTime">
                                <span class="title">故障时间</span>
                                <span class="value">{{item.faultTime}}</span>
                            </div>
                            <div class="content-p">
                                <span class="title">故障内容</span>
                                <span class="value">
                                    <span class="text-left">{{item.faultDesc}}</span>
                                    <div class="clearfix"></div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </section>
    </div>
</template>
<script>
    // import { getDetailByVin } from '@/services/carCheckup/carCheckup';
    import { getStore } from '@/libs/utils';

    export default {
        data () {
            return {
                detailInfo: {},
                currentDate: ''
            };
        },
        mounted () {
            this._getDetail();
        },
        methods: {
            // 获取详情
            _getDetail (vin) {
                try {
                    // const result = await getDetailByVin({vin});
                    this.detailInfo = JSON.parse(getStore('fault__detail'));
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
