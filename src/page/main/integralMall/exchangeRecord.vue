/**
* 兑换记录
*/
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        .section-body {
            position: relative;
            @include flex(stretch, column nowrap);
            flex: 1;
            overflow: hidden;
            .extend-search-panel {
                position: absolute;
                top: 0;
                z-index: 9999;
                @include wh(100%, 100%);
                background-color: transparent;
                .extend-search-body {
                    position: relative;
                    background-color: $white;
                    padding: px2rem(40) px2rem(80);
                    font-size: px2rem(30);
                    .extend-search-item {
                        display: flex;
                        align-items: center;
                        margin-bottom: px2rem(30);
                        height: px2rem(56);
                        line-height: px2rem(56);
                        .label {
                            color: #333333;
                            margin-right: px2rem(10);
                        }
                        .right-input {
                            position: relative;
                            text-align: left;
                            vertical-align: middle;
                            display: inline-block;
                            padding-left: px2rem(10);
                            background: #f5f5f5;
                            width: px2rem(392);
                            height: px2rem(54);
                            line-height: px2rem(54);
                            border-radius: px2rem(4);
                            color: #9A9A9A;
                            &.has-value {
                                color: #333333;
                            }
                            .icon {
                                position: absolute;
                                height: 100%;
                                padding: px2rem(0) px2rem(10);
                                right: px2rem(10);
                                top: 50%;
                                font-size: px2rem(28);
                                transform: translate(0, -50%);
                                color: #9A9A9A;
                            }
                        }
                    }
                    .submit-btn {
                        width: px2rem(147);
                        height: px2rem(56);
                        line-height: px2rem(56);
                        margin-top: px2rem(37);
                        background: $global_color;
                        font-size: px2rem(26);
                        color: $white;
                        border-radius: px2rem(5);
                    }
                }
                .extend-search-mask {
                    position: absolute;
                    z-index: -1;
                    @include wh(100%, 100%);
                    background-color: rgba(0, 0, 0, 0.3);
                }
            }
            .section-scroller-body {
                flex: 1;
                overflow: hidden;
                .list-box {
                    padding: px2rem(15) 0;
                    overflow: hidden;
                    .list-content {
                        margin-bottom: px2rem(15);
                        .list-content-title {
                            font-size: px2rem(30);
                            padding: px2rem(10) px2rem(20);
                            color: #7F8C9A;
                            background: #F4F4F4;
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
                            @include flex(stretch, row nowrap);
                            border-bottom: 1px solid #EEEEEE;
                            &:last-child {
                                border-bottom: none;
                            }
                            .body-left {
                                padding: px2rem(25) px2rem(24) px2rem(28) px2rem(27);
                                .goods-picture {
                                    margin: 0 auto;
                                    @include wh(#{px2rem(110)}, #{px2rem(110)});
                                    img {
                                        @include wh(100%, 100%);
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
                                    &.last-child {
                                        color: #7F8C9A;
                                        margin-bottom: 0;
                                    }
                                }
                                .point-zone {
                                    position: absolute;
                                    top: 50%;
                                    font-size: px2rem(32);
                                    right: px2rem(26);
                                    color: #43bd48;
                                    transform: translateY(-50%);
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
            <span class="header-nav__inner is-right" slot="right">
                <span class="nav_type" @click="toggleMoreSearch">
                    <svg-icon type="header_search"></svg-icon>
                </span>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="extend-search-panel" v-show="moreSearch">
                <div class="extend-search-body">
                    <div class="extend-search-item">
                        <span class="label">开始时间：</span>
                        <span class="right-input" @click="chooseTime('startTime')" :class="{'has-value': searchObj.startTime}">
                            {{searchObj.startTime ? searchObj.startTime : '开始时间'}}
                            <span class="icon" @click="handleClear($event, 'startTime')" v-show="searchObj.startTime">
                                <svg-icon type="clear_icon"></svg-icon>
                            </span>
                        </span>
                    </div>
                    <div class="extend-search-item">
                        <span class="label">结束时间：</span>
                        <span class="right-input" @click="chooseTime('endTime')" :class="{'has-value': searchObj.endTime}">
                            {{searchObj.endTime ? searchObj.endTime : '结束时间'}}
                            <span class="icon" @click="handleClear($event, 'endTime')" v-show="searchObj.endTime">
                                <svg-icon type="clear_icon"></svg-icon>
                            </span>
                        </span>
                    </div>
                    <x-button class="submit-btn" @click.native="handleSearch">搜索</x-button>
                </div>
                <div class="extend-search-mask" @click.self="closeMoreSearch"></div>
            </div>
            <div class="section-scroller-body">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                          @on-pulldown-loading="refresh"
                          :pulldown-config="$store.state.pulldownDefaultConfig"
                          :pullup-config="$store.state.pullupDefaultConfig"
                          ref="scroller" height="100%">
                    <div class="list-box">
                        <swipeout>
                            <swipeout-item v-for="(item, index) in list" :key="index" transition-mode="follow">
                                <div slot="content" class="list-content">
                                    <!--<div class="list-content-title">
                                        {{item.createTime|dateFormat('yyyy')}}年{{item.createTime|dateFormat('MM')}}月
                                    </div>-->
                                    <div class="list-content-body">
                                        <div class="body-left">
                                            <div class="goods-picture">
                                                <img :src="item.imageUrl|imageFormat" alt="">
                                            </div>
                                        </div>
                                        <div class="body-right">
                                            <div class="content-p">{{item.name}}</div>
                                            <div class="content-p last-child">{{item.synopsis}}</div>
                                            <div class="point-zone">
                                                {{'-' + item.needIntegral}}
                                            </div>
                                        </div>
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
    import { Scroller, Swipeout, SwipeoutItem, SwipeoutButton, XInput, XButton } from 'vux';
    import { exchangeRecord } from '@/services/integralMall/integralMallService';
    import { imgHttp } from '@/libs/config';
    import { formateDate } from '@/libs/utils';

    export default {
        name: 'exchangeRecord',
        mixins: [list],
        components: { Scroller, Swipeout, SwipeoutItem, SwipeoutButton, XInput, XButton },
        data () {
            return {
                moreSearch: false,
                searchObj: {
                    startTime: '',
                    endTime: ''
                }
            };
        },
        methods: {
            async _getList () {
                if (this.searchObj.startTime && this.searchObj.endTime && (this.searchObj.startTime >= this.searchObj.endTime)) {
                    this.$toast({
                        message: '开始时间不能大于或等于结束时间',
                        position: 'bottom'
                    });
                    return;
                }
                this.searchData.startTime = this.searchObj.startTime || null;
                this.searchData.endTime = this.searchObj.endTime || null;
                const result = await exchangeRecord(this.searchData);
                return result.data;
            },
            handleSearch () {
                this.moreSearch = false;
                this.list = [];
                this.loadMore();
            },
            toggleMoreSearch () {
                this.moreSearch = !this.moreSearch;
            },
            closeMoreSearch () {
                this.moreSearch = false;
                this.searchObj.startTime = this.searchData.startTime;
                this.searchObj.endTime = this.searchData.endTime;
            },
            // 时间搜索
            chooseTime (type) {
                let scope = this;
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM-DD HH:mm:00',
                    value: formateDate(new Date(), 'YYYY-MM-DD HH:mm'),
                    onConfirm (val) {
                        scope.searchObj[type] = val;
                    }
                });
            },
            handleClear (event, key) {
                event.stopPropagation();
                this.searchObj[key] = '';
            }
        },
        filters: {
            imageFormat (val) {
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
