/**
 * 作者：yeshengqiang
 * 时间：2018-07-09
 * 描述：积分商城
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .section-body-panel {
            flex: 1;
            padding: px2rem(28) 0;
            background-color: $white;
            @include flex(stretch, column nowrap);
            .section-body-title {
                padding: 0 px2rem(28);
                .title__inner_top {
                    position: relative;
                    text-align: center;
                    padding-bottom: px2rem(25);
                    .ball {
                        position: relative;
                        display: inline-block;
                        @include wh(#{px2rem(183)}, #{px2rem(183)});
                        border-radius: 100%;
                        // line-height: px2rem(91);
                        background-color: #f87e4f;
                        font-size: px2rem(26);
                        font-weight: normal;
                        font-stretch: normal;
                        color: #ffffff;
                        .ball-text {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            display: inline-block;
                            vertical-align: middle;
                            transform: translate(-50%, -50%);
                        }
                        p {
                            font-size: px2rem(46);
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                    }
                    .title__inner_link {
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: px2rem(24);
                        font-weight: normal;
                        font-stretch: normal;
                        color: #808080;
                    }
                }
                .title__inner_bottom {
                    position: relative;
                    font-size: px2rem(24);
                    font-weight: normal;
                    font-stretch: normal;
                    color: #656565;
                    text-align: center;
                    padding-bottom: px2rem(44);
                    border-bottom: 1px solid #e9e9e9;
                    margin-bottom: px2rem(24);
                    &::after {
                        position: absolute;
                        content: attr(data-title);
                        left: 50%;
                        bottom: 0;
                        color: #c7c7c7;
                        font-size: px2rem(24);
                        font-weight: normal;
                        font-stretch: normal;
                        background-color: $white;
                        padding: 0 px2rem(5);
                        transform: translate(-50%, 50%);
                    }
                    .inner_bottom_item {
                        margin: 0 px2rem(13);
                        display: inline-block;
                        @include wh(#{px2rem(171)}, #{px2rem(56)});
                        line-height: px2rem(56);
                        text-align: center;
                        font-size: px2rem(24);
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #656565;
                        border-radius: px2rem(6);
	                    border: solid 1px #eeeeee;
                    }
                }
            }
            .body-body {
                flex: 1;
                overflow: auto;
                .list-box {
                    padding: 0 px2rem(28);
                    overflow: hidden;
                    .body-body-item {
                        padding: px2rem(18) px2rem(100) px2rem(18) 0;
                        position: relative;
                        border-bottom: 1px solid #e9e9e9;
                        .body-body-title {
                            font-size: px2rem(28);
                            font-weight: 600;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #525252;
                        }
                        .body-body-tips {
                            font-size: px2rem(24);
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #949faa;
                        }
                        .tips {
                            position: absolute;
                            top: 50%;
                            right: 0;
                            font-size: px2rem(30);
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #39aa5b;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body-panel">
            <div class="section-body-title">
                <div class="title__inner_top">
                    <div class="ball">
                        <span class="ball-text">
                            积分
                            <p>{{this.userInfo.totalPoint}}</p>
                        </span>
                    </div>
                    <a class="title__inner_link" href="javascript: void(0);" @click="goIntegralRules">
                        <svg-icon type="rules"></svg-icon>
                        积分规则</a>
                </div>
                <div class="title__inner_bottom" data-title="积分明细">
                    <a href="javascript: void(0);" class="inner_bottom_item" @click="goIntegralHome">
                        <svg-icon type="goodsMall"></svg-icon>
                        积分商城
                    </a>
                    <a href="javascript: void(0);" class="inner_bottom_item" @click="goExchangeRecord">
                        <svg-icon type="goodsRecord"></svg-icon>
                        兑换记录
                    </a>
                    <a href="javascript: void(0);" class="inner_bottom_item" @click="goMyOrders">
                        <svg-icon type="goods_Order"></svg-icon>
                        我的订单
                    </a>
                </div>
            </div>
            <div class="body-body">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                          @on-pulldown-loading="refresh"
                          :pulldown-config="$store.state.pulldownDefaultConfig"
                          :pullup-config="$store.state.pullupDefaultConfig"
                          ref="scroller" height="100%">
                    <div class="list-box">
                        <swipeout>
                            <swipeout-item v-for="(item, index) in list" :key="index" transition-mode="follow">
                                <div slot="content" class="body-body-item">
                                    <h3 class="body-body-title">{{item.item + (item.orderId ? '：' + item.orderId : '')}}</h3>
                                    <p class="body-body-tips">{{item.createTime}}</p>
                                    <div class="tips">{{(item.pointType === 'MINUS' ? '-' : '+') + item.point}}</div>
                                </div>
                            </swipeout-item>
                        </swipeout>
                        <transition name="fade">
                            <div v-show="!list.length" class="no-data-tip">
                                <div class="text">暂无数据</div>
                            </div>
                        </transition>
                    </div>
                </scroller>
                <!--<div class="body-body-item" v-for="(item, index) in 10" :key="index">
                    <h3 class="body-body-title">商城订单：5131B123123fadfa</h3>
                    <p class="body-body-tips">2018-08-20 17:11:00</p>
                    <div class="tips">-99</div>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import userInfo from '@/mixins/userInfo';
    import { Scroller, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
    import { integralConsumingRecord } from '@/services/integralMall/integralMallService';
    export default {
        name: 'integralMall',
        mixins: [list, userInfo],
        components: { Scroller, Swipeout, SwipeoutItem, SwipeoutButton },
        data () {
            return {

            };
        },
        mounted () {
            if (this.userInfo.id) {
                this.getUserInfo();
            }
        },
        methods: {
            async _getList () {
                const result = await integralConsumingRecord(this.searchData);
                return result.data;
            },
            goIntegralRules () {
                this.$router.push('/main/integralMall/pointCenter/integralRules');
            },
            goIntegralHome () {
                this.$router.push('/main/integralMall');
            },
            goExchangeRecord () {
                this.$router.push('/main/integralMall/pointCenter/exchangeRecord');
            },
            goMyOrders () {
                this.$router.push('/main/integralMall/pointCenter/myOrders');
            }
        }
    };
</script>
