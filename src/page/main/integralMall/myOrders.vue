<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .section-body {
            flex: 1;
            overflow: hidden;
            .section-scroller-body {
                @include wh(100%, 100%);
                overflow: auto;
                .list-box {
                    padding: px2rem(15) 0;
                    overflow: hidden;
                    .list-content {
                        margin-bottom: px2rem(15);
                        .list-content-title {
                            font-size: px2rem(32);
                            padding: px2rem(28) px2rem(20);
                            border-bottom: 1px solid #EEEEEE;
                            .right {
                                float: right;
                                &.success {
                                    color: red;
                                }
                                &.fail {
                                    color: #7F8C9A;
                                }
                            }
                        }
                        .list-content-body {
                            border-bottom: 1px solid #EEEEEE;
                            @include flex(stretch, row nowrap);
                            .body-left {
                                padding: px2rem(25) px2rem(24) px2rem(28) px2rem(27);
                                .card-zone {
                                    @include wh(#{px2rem(166)}, #{px2rem(166)});
                                    border: 1px solid #EEEEEE;
                                    border-radius: px2rem(10);
                                    .card-zone-image {
                                        @include wh(100%, 100%);
                                    }
                                    .goods-body-item__inner {
                                        margin: 0 auto;
                                        @include wh(#{px2rem(166)}, #{px2rem(166)});
                                        line-height: px2rem(166);
                                        background: url('../../../assets/images/goods.png') no-repeat center center;
                                        background-size: 100% 100%;
                                        text-align: center;
                                        .goods_text {
                                            display: inline-block;
                                            vertical-align: middle;
                                            padding-top: px2rem(21);
                                            font-weight: 600;
                                            font-size: px2rem(30);
                                            color: $white;
                                        }
                                    }
                                    .zone-body-item__inner {
                                        margin: 0 auto;
                                        @include flex(center, row nowrap);
                                        @include wh(#{px2rem(171)}, #{px2rem(96)});
                                        margin-bottom: px2rem(90);
                                        background: url('../../../assets/images/discount.png') no-repeat center center;
                                        background-size: 100% 100%;
                                        -webkit-box-reflect: below px2rem(5) -webkit-linear-gradient(top, rgba(250,250,250,0), rgba(250,250,250,.0) 30%, rgba(250,250,250,0.3));
                                        .item__inner_left {
                                            padding: 0 px2rem(5);
                                            text-align: center;
                                            @include wh(#{px2rem(39)}, auto);
                                            .inner_left_text {
                                                display: inline-block;
                                                font-size: px2rem(24);
                                                line-height: 1.2;
                                                transform: scale(0.8, 0.8);
                                                vertical-align: middle;
                                                color: $white;
                                            }
                                        }
                                        .item__inner_right {
                                            flex: 1;
                                            color: $white;
                                            text-align: center;
                                            .inner_right_text {
                                                display: inline-block;
                                                font-size: px2rem(46);
                                                vertical-align: middle;
                                                small {
                                                    vertical-align: middle;
                                                    font-size: 60%;
                                                    margin-left: 2px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            .body-right {
                                position: relative;
                                flex: 1;
                                padding-top: px2rem(30);
                                .content-p {
                                    font-size: px2rem(28);
                                    margin-bottom: px2rem(16);
                                    @include ellipsis;
                                    &:first-child {
                                        color: #7F8C9A;
                                    }
                                    &:last-child {
                                        margin-bottom: 0;
                                    }
                                }
                                .icon-link {
                                    position: absolute;
                                    top: 50%;
                                    right: px2rem(26);
                                    transform: translateY(-50%);
                                }
                            }
                        }
                        .list-content-footer {
                            padding: px2rem(39) px2rem(24) px2rem(30) px2rem(20);
                            font-size: px2rem(28);
                            .clock {
                                font-size: px2rem(30);
                                color: #FADF75;
                            }
                            .time {
                                color: #7F8C9A;
                            }
                            .right {
                                float: right;
                                .number {
                                    color: red;
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
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <screen class="screen-bar" @on-change="screenChange" v-model="screenValue" :screen-list="['兑换成功', '兑换失败']"></screen>
            <div class="section-scroller-body">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                          @on-pulldown-loading="refresh"
                          :pulldown-config="$store.state.pulldownDefaultConfig"
                          :pullup-config="$store.state.pullupDefaultConfig"
                          ref="scroller" height="100%">
                    <div class="list-box">
                        <swipeout>
                            <swipeout-item  v-for="(item, index) in list" :key="index" transition-mode="follow">
                                <div slot="content" @click="handleDetail(item)" class="list-content">
                                    <div class="list-content-title">
                                        <span class="left">订单号：{{item.orderId}}</span>
                                        <span class="right success clearfix">{{item.orderState | orderState}}</span>
                                    </div>
                                    <div class="list-content-body">
                                        <div class="body-left">
                                            <div class="card-zone">
                                                <!--<div class="goods-body-item__inner">
                                                    <span class="goods_text">100M</span>
                                                </div>-->
                                                <img class="card-zone-image" :src="item.imagerUrl|avatarFormat" alt="img" />
                                            </div>
                                        </div>
                                        <div class="body-right">
                                            <div class="content-p">{{item.name}}</div>
                                            <div class="content-p">{{item.synopsis}}</div>
                                            <div class="icon-link">
                                                <svg-icon type="right_arrow"></svg-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-content-footer">
                                        <svg-icon type="clock" class="clock"></svg-icon>
                                        <span class="time">{{item.createTime}}</span>
                                        <span class="right clearfix">共1件商品，实付：<span class="number">{{item.sumIntegral}}</span>积分</span>
                                    </div>
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
            </div>
        </div>
    </div>
</template>

<script>
    import list from '@/mixins/list';
    import { Screen } from '@/components';
    import { orderList } from '@/services/integralMall/integralMallService';
    import { Scroller, Spinner, Swipeout, XButton, XInput, SwipeoutItem, SwipeoutButton } from 'vux';
    import { imgHttp } from '@/libs/config';

    export default {
        name: 'myOrders',
        mixins: [ list ],
        components: { Scroller, Screen, XInput, XButton, Spinner, Swipeout, SwipeoutItem, SwipeoutButton },
        data () {
            return {
                screenValue: '兑换成功',
                searchData: {
                    orderState: 'SUCCEED'
                }
            };
        },
        methods: {
            async _getList () {
                const result = await orderList(this.searchData);
                return result.data;
            },
            screenChange (val) {
                this.searchData.pageNo = 1;
                this.list = [];
                this.searchData.orderState = this.screenValue === '兑换成功' ? 'SUCCEED' : 'FAILD';
                this.loadMore();
            },
            handleDetail (item) {
                this.$router.push({path: '/main/integralMall/pointCenter/myOrders/detail', query: {orderId: item.orderId}});
            }
        },
        filters: {
            orderState (val) {
                switch (val) {
                    case 'SUCCEED':
                        return '兑换成功';
                    case 'FAILD':
                        return '兑换失败';
                }
            },
            avatarFormat (val) {
                let url = '';
                if (val && val !== 'string') {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/goods.png');
                }
                return url;
            }
        }
    };
</script>
