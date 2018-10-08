/**
 * 作者：yeshengqiang
 * 时间：2018-07-09
 * 描述：我的优惠券
 */
<style lang="scss" scoped>
@import "src/scss/vars";
@import "src/scss/mixins";

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
            padding: px2rem(18);
            .list-item {
                @include flex(stretch, row nowrap);
                margin-bottom: px2rem(15);
                background-color: $white;
                .list-item-left {
                    flex: 1;
                    @include flex(stretch, row nowrap);
                    padding: px2rem(26) px2rem(30);
                    .left__inner {
                        @include wh(#{px2rem(160)}, #{px2rem(160)});
                        //background: url("../../../assets/images/goodsCate_bg.png") no-repeat center center;
                        background-size: 100%;
                        .left__inner_img {
                            @include wh(100%, 100%);
                        }
                        .zone-body-item__inner {
                            margin: 0 auto;
                            margin-top: px2rem(34);
                            @include flex(center, row nowrap);
                            @include wh(#{px2rem(121)}, #{px2rem(66)});
                            margin-bottom: px2rem(40);
                            background: url("../../../assets/images/discount.png") no-repeat
                            center center;
                            background-size: 100% 100%;
                            -webkit-box-reflect: below px2rem(5) -webkit-linear-gradient(top, rgba(250, 250, 250, 0), rgba(250, 250, 250, 0) 50%, rgba(250, 250, 250, 0.3));
                            .item__inner_left {
                                text-align: center;
                                @include wh(#{px2rem(28)}, auto);
                                .inner_left_text {
                                    display: inline-block;
                                    font-size: px2rem(24);
                                    line-height: 1.2;
                                    transform: scale(0.6, 0.6);
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
                                    font-size: px2rem(36);
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
                    .right__inner {
                        flex: 1;
                        padding: px2rem(10) 0 px2rem(10) px2rem(11);
                        .right__inner_title {
                            font-size: px2rem(30);
                            font-weight: normal;
                            font-stretch: normal;
                            color: #333333;
                            margin-bottom: px2rem(14);
                        }
                        .right_inner_p {
                            @include flex(stretch, row nowrap);
                            font-size: px2rem(24);
                            // padding: px2rem(10) 0;
                            font-weight: normal;
                            font-stretch: normal;
                            color: #949faa;
                            .label {
                                flex: 0 0 px2rem(120);
                            }
                            .value {
                                flex: 1;
                                word-break: break-all;
                            }
                        }
                    }
                }
                .list-item-right {
                    position: relative;
                    flex: 0 0 px2rem(178);
                    padding: px2rem(26) px2rem(30);
                    border-left: 1px dashed #e8e8ea;
                    text-align: center;
                    .list-item-right__inner {
                        text-align: center;
                        font-size: px2rem(36);
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: -1px;
                        color: #de4041;
                        .right__inner {
                            font-size: px2rem(24);
                        }
                    }
                    .list-item-right__btn {
                        font-size: px2rem(24);
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: -1px;
                        color: #ffffff;
                        text-align: center;
                        background-color: #de4041;
                        padding: px2rem(8) px2rem(24);
                        border-radius: px2rem(40);
                    }
                    &::before,
                    &::after {
                        content: "";
                        position: absolute;
                        display: inline-block;
                        background-color: $body_bg;
                        border-radius: 100%;
                        left: -1px;
                        @include wh(#{px2rem(18)}, #{px2rem(18)});
                    }
                    &::before {
                        top: 0;
                        transform: translate(-50%, -50%);
                    }
                    &::after {
                        bottom: 0;
                        transform: translate(-50%, 50%);
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
            <div class="section-scroller-body">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                          @on-pulldown-loading="refresh"
                          :pulldown-config="$store.state.pulldownDefaultConfig"
                          :pullup-config="$store.state.pullupDefaultConfig"
                          ref="scroller" height="100%">
                    <div class="list-box">
                        <swipeout>
                            <swipeout-item v-for="(item, index) in list" :key="index" transition-mode="follow">
                                <div slot="content" class="list-item">
                                    <div class="list-item-left">
                                        <div class="left__inner">
                                            <!--<div class="zone-body-item__inner">
                                                    <div class="item__inner_left">
                                                        <span class="inner_left_text">快车券</span>
                                                    </div>
                                                    <div class="item__inner_right">
                                                        <span class="inner_right_text">9<small>.0折</small></span>
                                                    </div>
                                            </div>-->
                                            <img class="left__inner_img" :src="item.imageUrl|avatarFormat" alt="">
                                        </div>
                                        <div class="right__inner">
                                            <h3 class="right__inner_title">{{item.name}}</h3>
                                            <div class="right_inner_p">
                                                <div class="label">兑换码:</div>
                                                <div class="value">{{item.redeem}}</div>
                                            </div>
                                            <div class="right_inner_p">
                                                <div class="label">使用期限：</div>
                                                <div class="value">{{item.endTime|dateFormat('yyyy-MM-dd')}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-item-right">
                                        <p class="list-item-right__inner"><small class="right__inner">￥</small>{{item.deduction || 0}}</p>
                                        <a class="list-item-right__btn" href="javascript: void(0);">{{item.state|stateFormat}}</a>
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
import { imgHttp } from '@/libs/config';
import { Scroller, Spinner, Swipeout, XButton, XInput, SwipeoutItem, SwipeoutButton } from 'vux';
import { couponList } from '@/services/integralMall/integralMallService';
export default {
    name: 'myCoupons',
    mixins: [list],
    components: { Scroller, XInput, XButton, Spinner, Swipeout, SwipeoutItem, SwipeoutButton },
    data () {
        return {
        };
    },
    methods: {
        async _getList () {
            const result = await couponList(this.searchData);
            console.log(result);
            return result.data;
        }
    },
    filters: {
        stateFormat (val) {
            switch (val) {
                case 'UNUSED':
                    return '未使用';
                case 'USE':
                    return '使用';
            }
            return '';
        },
        avatarFormat (val) {
            let url = '';
            if (val && val !== 'string') {
                url = imgHttp + val;
            } else {
                url = require('@/assets/images/goodsCateDetail.png');
            }
            return url;
        }
    }
};
</script>
