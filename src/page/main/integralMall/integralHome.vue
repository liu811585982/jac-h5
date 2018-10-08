/**
 * 作者：yeshengqiang
 * 时间：2018-06-28
 * 描述：积分首页
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .header-nav__right {
            font-size: px2rem(30);
            left: auto;
            right: 0;
        }
        .section-body-panel {
            flex: 1;
            overflow: auto;
            .info-panel {
                margin: px2rem(12);
                background-color: $white;
                .info-panel__top {
                    position: relative;
                    @include flex(center, row nowrap);
                    font-size: px2rem(30);
                    color: #333333;
                    padding: px2rem(24) px2rem(28);
                    border-bottom: 1px dashed #EEEEEE;
                    .info-logo {
                        display: inline-block;
                        @include wh(#{px2rem(80)}, #{px2rem(80)});
                        border-radius: 100%;
                        overflow: hidden;
                        //background-color: $global_color;
                        margin-right: px2rem(21);
                        .info-logo__inner {
                            border-radius: 100%;
                        }
                    }
                    .info-panel__top__right {
                        flex: 1;
                        text-align: right;
                        .info-panel__link {
                            height: px2rem(80);
                            line-height: px2rem(80);
                            color: #868686;
                            .info__inner_num,
                            .info__inner_text {
                                font-weight: normal;
                                font-size: px2rem(30);
                            }
                            .info__inner_num {
                                font-weight: 600;
                                color: #000000;
                            }
                            .info__inner_text {
                                color: #333333;
                                margin-right: px2rem(4);
                            }
                        }
                    }
                    &::before,
                    &::after {
                        content: '';
                        display: block;
                        position: absolute;
                        @include wh(#{px2rem(16)}, #{px2rem(16)});
                        background-color: $body_bg;
                        border-radius: 100%;
                        bottom: 0;
                    }
                    &::before {
                        left: 0;
                        transform: translate(-50%, 50%);
                    }
                    &::after {
                        right: 0;
                        transform: translate(50%, 50%);
                    }
                }
                .info-panel__classify {
                    @include flex(center, row nowrap);
                    position: relative;
                    padding: px2rem(22) 0;
                    .info__classify__part {
                        flex: 1;
                        text-align: center;
                        .info__classify_svg {
                            font-size: px2rem(80);
                            margin-bottom: px2rem(18);
                        }
                        figcaption {
                            font-size: px2rem(23);
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            color: #535353;
                        }
                    }
                    &::before,
                    &::after {
                        content: '';
                        display: block;
                        position: absolute;
                        @include wh(#{px2rem(16)}, #{px2rem(16)});
                        background-color: $body_bg;
                        border-radius: 100%;
                        top: 0;
                    }
                    &::before {
                        left: 0;
                        transform: translate(-50%, -50%);
                    }
                    &::after {
                        right: 0;
                        transform: translate(50%, -50%);
                    }
                }
            }
            .activity-panel {
                background-color: $white;
                margin-bottom: px2rem(15);
                padding: px2rem(38) px2rem(18);
                .activity-zone-title {
                    font-size: px2rem(34);
                    font-weight: 600;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #555555;
                    .active-zone-more {
                        float: right;
                        font-size: px2rem(25);
                        padding: px2rem(4.5) 0;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #7a7a7a;
                    }
                }
            }
            .activity-panel {
                .activity-zone-body {
                    @include flex(stretch, row wrap);
                    zoom: 1;
                    &:after {
                        content: '';
                        display: block;
                        clear: both;
                    }
                    .zone-body-item {
                        flex: 0 0 33.33%;
                        padding: px2rem(39.5) 0;
                        // width: 33.33%;
                        text-align: center;
                        &.underline {
                            border-bottom: 1px solid #eeeeee;
                        }
                        .goods-body-item__inner {
                            margin: 0 auto;
                            @include wh(#{px2rem(166)}, #{px2rem(166)});
                            line-height: px2rem(166);
                            background: url('../../../assets/images/goods.png') no-repeat center center;
                            background-size: 100% 100%;
                            text-align: center;
                            margin-bottom: px2rem(30);
                            .goods_text {
                                display: inline-block;
                                vertical-align: middle;
                                padding-top: px2rem(21);
                                font-weight: 600;
                                font-size: px2rem(30);
                                color: $white;
                            }
                        }
                        .maintenance-body-item__inner {
                            text-align: center;
                            margin: 0 auto;
                            @include wh(#{px2rem(166)}, #{px2rem(166)});
                            margin-bottom: px2rem(30);
                            img {
                                @include wh(100%, 100%);
                            }
                        }
                        .zone-body-item__inner {
                            margin: 0 auto;
                            @include flex(center, row nowrap);
                            @include wh(#{px2rem(171)}, #{px2rem(96)});
                            margin-bottom: px2rem(80);
                            background: url('../../../assets/images/discount.png') no-repeat center center;
                            background-size: 100% 100%;
                            -webkit-box-reflect: below px2rem(5) -webkit-linear-gradient(top, rgba(250,250,250,0), rgba(250,250,250,.0) 40%, rgba(250,250,250,0.3));
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
                        .zone-body-item__text {
                            margin: 0 auto;
                            @include wh(#{px2rem(171)}, auto);
                            text-align: left;
                            h3 {
                                font-size: px2rem(25);
                                font-weight: 600;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #595959;
                                margin-bottom: px2rem(10);
                            }
                            p.item__text_tips {
                                font-size: px2rem(22);
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #969696;
                                margin-bottom: px2rem(26);
                                white-space: normal;
                                word-break: break-all;
                            }
                            p.item__text {
                                font-size: px2rem(26);
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                span {
                                    color: #fe7c22;
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
            <span class="header-nav__inner" slot="left" @click="goBack">
                <svg-icon type="back"></svg-icon>
            </span>
            <span class="header-nav__inner header-nav__right" @click="goCoupons" slot="right">
                优惠券
            </span>
        </hy-header>
        <div class="section-body-panel">
            <!-- 头部 -->
            <div class="info-panel">
                <div class="info-panel__top" @click="goIntegralMall">
                    <span class="info-logo">
                        <!-- <img class="info-logo__inner" src="../../../assets/images/logo.png" alt="info-logo" /> -->
                        <img :src="userInfo.avatar|logoFormat" alt="" class="info-logo__inner">
                    </span>
                    {{userInfo.driverName}}
                     <div class="info-panel__top__right">
                        <a class="info-panel__link" href="javascript: void(0);">
                            <span class="info__inner_num">{{homeData.count}}</span>
                            <span class="info__inner_text">积分</span>
                            <svg-icon type="right_arrow"></svg-icon>
                        </a>
                    </div>
                </div>
                <div class="info-panel__classify">
                    <figure class="info__classify__part" v-for="item in classifyList" :key="item.type" @click="more('type', item.type)">
                        <svg-icon class="info__classify_svg" :type="item.iconType"></svg-icon>
                        <figcaption>{{item.des}}</figcaption>
                    </figure>
                </div>
            </div>
            <!-- 活动专区 -->
            <div class="activity-panel">
                <h3 class="activity-zone-title">
                    活动专区
                    <span class="active-zone-more" @click="more('activity', 1)" v-show="homeData.activityList && homeData.activityList.length > 3">
                        更多
                        <svg-icon type="right_arrow"></svg-icon>
                    </span>
                </h3>
                <ul class="activity-zone-body">
                    <li class="zone-body-item" v-for="(item, index) in homeData.activityList" :key="index" v-if="index < 3" @click="handleDetail(item)">
                        <!--<div class="zone-body-item__inner">
                            <div class="item__inner_left">
                                <span class="inner_left_text">快车券</span>
                            </div>
                            <div class="item__inner_right">
                                <span class="inner_right_text">9<small>.0折</small></span>
                            </div>
                        </div>
                        <div class="zone-body-item__text">
                            <h3>江淮快车券</h3>
                            <p class="item__text_tips">1元快车券</p>
                            <p class="item__text">
                                <span>99</span>
                                积分
                            </p>
                        </div>-->
                        <div class="maintenance-body-item__inner">
                            <img :src="item.imagerUrl|avatarFormat" alt="maintenance_inner" />
                        </div>
                        <div class="zone-body-item__text">
                            <h3>{{item.name}}</h3>
                            <p class="item__text_tips">{{item.synopsis|strFilter(30)}}</p>
                            <p class="item__text">
                                <span>{{item.needIntegral}}</span>
                                积分
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 商品兑换 -->
            <div class="activity-panel">
                <h3 class="activity-zone-title">
                    商品兑换
                    <span class="active-zone-more" @click="more('activity', 0)" v-show="homeData.discountList && homeData.discountList.length > 3">
                        更多
                        <svg-icon type="right_arrow"></svg-icon>
                    </span>
                </h3>
                <ul class="activity-zone-body">
                    <li class="zone-body-item" v-for="(item,index) in homeData.discountList" :key="index"
                        :class="{underline: index < 3 && homeData.discountList.length > 3}" @click="handleDetail(item)" v-if="index < 6">
                        <div class="maintenance-body-item__inner">
                            <img :src="item.imagerUrl|avatarFormat" alt="maintenance_inner" />
                        </div>
                        <div class="zone-body-item__text">
                            <h3>{{item.name}}</h3>
                            <p class="item__text_tips">{{item.synopsis|strFilter(30)}}</p>
                            <p class="item__text">
                                <span>{{item.needIntegral}}</span>
                                积分
                            </p>
                        </div>
                    </li>
                    <!--<li class="zone-body-item underline" v-for="item in 3" :key="item">
                        <div class="goods-body-item__inner">
                            <span class="goods_text">100M</span>
                        </div>
                        <div class="zone-body-item__text">
                            <h3>中国联通</h3>
                            <p class="item__text_tips">100M全国联通流量</p>
                            <p class="item__text">
                                <span>99</span>
                                积分
                            </p>
                        </div>
                    </li>
                    <li class="zone-body-item" v-for="item in [5, 6, 7]" :key="item">
                        <div class="maintenance-body-item__inner">
                            <img src="../../../assets/images/maintenance_inner.png" alt="maintenance_inner" />
                        </div>
                        <div class="zone-body-item__text">
                            <h3>中国联通</h3>
                            <p class="item__text_tips">100M全国联通流量</p>
                            <p class="item__text">
                                <span>99</span>
                                积分
                            </p>
                        </div>
                    </li>-->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import userInfo from '@/mixins/userInfo';
    import { homeOverViewData } from '@/services/integralMall/integralMallService';
    import { imgHttp } from '@/libs/config';

    export default {
        name: 'integralMall',
        mixins: [userInfo],
        data () {
            return {
                classifyList: [
                    {
                        type: 'FLOW',
                        iconType: 'info__classify__part1',
                        des: '流量包'
                    },
                    {
                        type: 'MAINTAIN',
                        iconType: 'info__classify__part2',
                        des: '保养券'
                    },
                    {
                        type: 'REPAIR',
                        iconType: 'info__classify__part3',
                        des: '维修券'
                    },
                    {
                        type: 'OTHER',
                        iconType: 'info__classify__part4',
                        des: '其他商品'
                    }
                ],
                homeData: {}
            };
        },
        created () {
            this.getHomeData();
        },
        methods: {
            more (key, value) {
                const query = {};
                query[key] = value;
                this.$router.push({path: '/main/integralMall/goodsCategory', query});
            },
            goCoupons () {
                this.$router.push('/main/integralMall/myCoupons');
            },
            async getHomeData () {
                try {
                    this.$indicator.open();
                    const result = await homeOverViewData();
                    this.$indicator.close();
                    this.homeData = result.data || {};
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleDetail (item) {
                this.$router.push({path: '/main/integralMall/goodsCategory/detail', query: {id: item.id}});
            },
            goIntegralMall () {
                this.$router.push('/main/integralMall/pointCenter');
            },
            goBack () {
                this.$router.push('/main');
            }
        },
        filters: {
            avatarFormat (val) {
                let url = '';
                if (val && val !== 'string') {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/maintenance_inner.png');
                }
                return url;
            },
            logoFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/logo.png');
                }
                return url;
            },
            strFilter (val, length) {
                if (!val) {
                    return '';
                }
                if (val.length <= length) {
                    return val;
                } else {
                    return val.substr(0, length) + '...';
                }
            }
        }
    };
</script>
