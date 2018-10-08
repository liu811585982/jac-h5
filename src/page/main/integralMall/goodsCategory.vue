/**
 * 作者：yeshengqiang
 * 时间：2018-07-02
 * 描述：商品分类
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .goodsCategory-toolbar {
            background-color: $white;
            @include flex(center, row nowrap);
            .goodsCategory-toolbar-item {
                flex: 1;
                text-align: center;
                .toolbar-item-link {
                    display: block;
                    font-size: px2rem(28);
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #333333;
                    padding: px2rem(23) 0;
                    &.active-link {
                        color: #de4041;
                    }
                    .triangle {
                        display: inline-block;
                        @include wh(0, px2rem(5));
                        background-color: transparent;
                        position: relative;
                        vertical-align: middle;
                        top: px2rem(-4);
                        &::before,
                        &::after {
                            position: absolute;
                            @include wh(0, 0);
                            left: 0;
                            content: '';
                            display: block;
                            border: px2rem(6) solid transparent;
                        }
                        &::after {
                            top: 100%;
                            border-top: px2rem(10) solid #333333;
                        }
                        &::before {
                            bottom: 100%;
                            border-bottom: px2rem(10) solid #333333;
                        }
                        &.up {
                            color: #dc3f3e;
                            &::after {
                                border-top: px2rem(10) solid currentcolor;
                            }
                        }
                        &.down {
                            color: #dc3f3e;
                            &::before {
                                border-bottom: px2rem(10) solid currentcolor;
                            }
                        }
                    }
                }
            }
        }
        .section-body-panel {
            flex: 1;
            overflow: hidden;
            position: relative;
            background-color: $white;
            .section-body-scroller {
                position: absolute;
                @include wh(100%, 100%);
                overflow: auto;
            }
            .figure-panel {
                padding: px2rem(26) 0;
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
                    margin-bottom: px2rem(70);
                    background: url('../../../assets/images/discount.png') no-repeat center center;
                    background-size: 100% 100%;
                    -webkit-box-reflect: below px2rem(5) -webkit-linear-gradient(top, rgba(250,250,250,0), rgba(250,250,250,.0) 45%, rgba(250,250,250,0.3));
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
                        font-size: px2rem(22);
                        color: rgba(150,150,150,1);
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        margin-bottom: px2rem(10);
                    }
                    p.item__text_tips {
                        font-size: px2rem(25);
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: rgba(89,89,89,1);
                        margin-bottom: px2rem(18);
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
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <ul class="goodsCategory-toolbar">
            <li class="goodsCategory-toolbar-item">
                <a class="toolbar-item-link" :class="{'active-link': !sortType}" href="javascript: void(0);" @click="totalClick">全部</a>
            </li>
            <li class="goodsCategory-toolbar-item">
                <a class="toolbar-item-link" :class="{'active-link': !!sortType}" href="javascript: void(0);" @click="toggleSort">
                    积分
                    <span class="triangle" :class="{up: sortType === 1, down: sortType === 2}"></span>
                </a>
            </li>
        </ul>
        <div class="section-body-panel">
            <div class="section-body-scroller">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                      @on-pulldown-loading="refresh"
                      :pulldown-config="$store.state.pulldownDefaultConfig"
                      :pullup-config="$store.state.pullupDefaultConfig"
                      ref="scroller" height="100%">
                    <hy-grid :list="list" :row-number="2" @tab-change="handleChange">
                        <template slot-scope="scope">
                            <figure class="figure-panel">
                                <!-- <div class="zone-body-item__inner">
                                    <div class="item__inner_left">
                                        <span class="inner_left_text">快车券</span>
                                    </div>
                                    <div class="item__inner_right">
                                        <span class="inner_right_text">9<small>.0折</small></span>
                                    </div>
                                </div>
                                <figcaption class="zone-body-item__text">
                                    <h3>江淮快车券</h3>
                                    <p class="item__text_tips">1元快车券</p>
                                    <p class="item__text">
                                        <span>99</span>
                                        积分
                                    </p>
                                </figcaption> -->
                                <div class="maintenance-body-item__inner">
                                    <img :src="scope.row.imagerUrl | avatarFormat" alt="maintenance_inner" />
                                </div>
                                <div class="zone-body-item__text">
                                    <h3>{{scope.row.name}}</h3>
                                    <p class="item__text_tips">{{scope.row.synopsis|strFilter(30)}}</p>
                                    <p class="item__text">
                                        <span>{{scope.row.needIntegral}}</span>
                                        积分
                                    </p>
                                </div>
                            </figure>
                        </template>
                    </hy-grid>
                </scroller>
            </div>
        </div>
    </div>
</template>
<script>
    import { hyGrid } from '@/components';
    import list from '@/mixins/list';
    import { activityOrGoodsArea } from '@/services/integralMall/integralMallService';
    import { Scroller, Spinner, XButton, XInput } from 'vux';
    import { imgHttp } from '@/libs/config';

    export default {
        name: 'goodsCategory',
        mixins: [ list ],
        components: {hyGrid, Scroller, XInput, XButton, Spinner},
        data () {
            return {
                sortType: null     // 1根据价格倒序  2 根据价格顺序
            };
        },
        methods: {
            handleChange (item) {
                this.$router.push({path: '/main/integralMall/goodsCategory/detail', query: {id: item.id}});
            },
            async _getList () {
                const opt = {
                    pageNo: this.searchData.pageNo,
                    pageSize: this.searchData.pageSize
                };
                if (this.$route.query.activity !== undefined) {
                    this.searchData.activity = this.$route.query.activity;
                }
                if (this.$route.query.type !== undefined) {
                    this.searchData.type = this.$route.query.type;
                }
                this.searchData.sortType = this.sortType || null;
                const result = await activityOrGoodsArea(opt, this.searchData);
                return result.data;
            },
            handleSearch () {
                this.list = [];
                this.loadMore();
            },
            totalClick () {
                this.sortType = null;
                this.handleSearch();
            },
            toggleSort () {
                this.sortType = !this.sortType ? 2 : this.sortType === 1 ? 2 : 1;
                this.handleSearch();
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
