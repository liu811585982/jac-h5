<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .search-bar {
            overflow: hidden;
            position: relative;
            height: px2rem(82);
            background-color: #FFFFFF;
            z-index: 1;
            .search-group {
                @include wh(100%, auto);
                padding: 0 px2rem(10);
                position: absolute;
                z-index: 1000;
                top: 0;
                left: 0;
                .weui-cell {
                    height: px2rem(80);
                    background-color: #FFF;
                    color: #A5A5A5;
                    padding: 0;
                    font-size: px2rem(26);
                    /deep/ .weui-input {
                        background: #F4F4F4;
                        height: px2rem(60);
                        border-radius: 0;
                    }
                    .search-icon {
                        font-size: px2rem(28);
                        padding: 0 px2rem(10);
                        margin-left: px2rem(10);
                        background: #F4F4F4;
                        height: px2rem(60);
                        line-height: px2rem(60);
                    }
                    .search-btn {
                        color: #333333;
                        position: relative;
                        padding: 0 px2rem(15);
                        vertical-align: middle;
                    }
                }
            }
        }
        .section-body {
            flex: 1;
            -webkit-flex: 1;
            position: relative;
            overflow: hidden;
            .section-body-scroller {
                position: absolute;
                @include wh(100%, 100%);
                overflow: auto;
                .list-box {
                    padding: px2rem(15) px2rem(10);
                    overflow: hidden;
                    font-size: px2rem(28);
                    .list-content {
                        @include flex(center, row nowrap, center);
                        margin-bottom: px2rem(15);
                        .list-item-left {
                            padding-left: px2rem(8);
                            @include wh(#{px2rem(181)}, #{px2rem(195)});
                            margin-right: px2rem(25);
                            .photo {
                                @include wh(100%, 100%);
                            }
                        }
                        .list-item-center {
                            position: relative;
                            flex: 1;
                            padding: px2rem(10) 0;
                            overflow: hidden;
                            .center-title {
                                position: relative;
                                font-size: px2rem(30);
                                font-weight: 500;
                                padding-right: px2rem(30);
                                margin-bottom: px2rem(15);
                                .title-left {
                                    @include flex(center, row nowrap);
                                    width: 100%;
                                    .value {
                                        flex: 1;
                                        margin-right: px2rem(5);
                                        @include ellipsis;
                                    }
                                    .card {
                                        display: inline-block;
                                        position: relative;
                                        padding: 0 px2rem(5);
                                        color: #FF9C00;
                                        border: 1px solid #FF9C00;
                                        border-radius: px2rem(5);
                                        font-size: px2rem(23);
                                        background: #FEF4E3;
                                        white-space: nowrap;
                                        &:before {
                                            content: '';
                                            position: absolute;
                                            top: 50%;
                                            left: px2rem(-5);
                                            width: px2rem(10);
                                            height: px2rem(10);
                                            border-radius: px2rem(10);
                                            border: px2rem(2) solid #ffffff;
                                            background: #FEC03C;
                                            transform: translateY(-50%);
                                        }
                                    }
                                }
                                .title-right {
                                    position: absolute;
                                    top: 50%;
                                    right: 0;
                                    font-size: px2rem(26);
                                    color: #6D7C8B;
                                    transform: translateY(-50%);
                                }
                            }
                            .center-item {
                                @include ellipsis;
                                font-size: px2rem(28);
                                vertical-align: middle;
                                margin-bottom: px2rem(10);
                                &.last-child {
                                    margin-bottom: 0;
                                }
                                .title {
                                    color: #6D7C8B;
                                }
                            }
                            .phone-icon {
                                position: absolute;
                                right: px2rem(22);
                                bottom: px2rem(24);
                                @include wh(px2rem(56), px2rem(56));
                                border-radius: px2rem(56);
                                line-height: px2rem(56);
                                text-align: center;
                                border: 1px solid currentColor;
                                font-size: px2rem(28);
                                color: #43bd48;
                            }
                        }
                    }
                }
            }
        }
        .search-ul-panel {
            @include wh(100%, auto);
            overflow: auto;
            max-height: 200px;
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-flow: row wrap;
            align-items: center;
            flex-flow: row wrap;
            font-size: 16px;
            text-align: center;
            .search-li-item {
                width: 50%;
                padding: 15px;
                a:link,
                a:hover,
                a:visited,
                a:active {
                    color: #9A9A9A;
                }
            }
        }
    }
    .rotate {
        display: inline-block;
        transform: rotate(-180deg);
    }
    .pullup-arrow {
        transition: all linear 0.2s;
        color: #666;
        font-size: 25px;
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
                <span class="nav_type" @click="handlePosition">
                    <svg-icon type="navigation"></svg-icon>
                </span>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-panel">
            <div class="search-bar">
                <div class="search-group">
                    <x-input v-model="searchData.stationName" :show-clear="false" placeholder="站名搜索">
                        <div slot="label" class="search-icon">
                            <svg-icon type="header_search"></svg-icon>
                        </div>
                        <div slot="right" class="search-btn" @click="handleSearch">
                            搜索
                        </div>
                    </x-input>
                </div>
            </div>
            <div class="section-body">
                <div class="section-body-scroller">
                    <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                        @on-pulldown-loading="refresh"
                        :pulldown-config="$store.state.pulldownDefaultConfig"
                        :pullup-config="$store.state.pullupDefaultConfig"
                        ref="scroller" height="100%">
                        <div class="list-box">
                            <swipeout>
                                <swipeout-item v-for="(item, index) in list" :key="index" transition-mode="follow">
                                    <div slot="content" class="list-content">
                                        <div class="list-item-left">
                                            <img class="photo" v-if="item.stationFilePath" :src="item.stationFilePath|avatarFormat" alt="" >
                                            <no-picture v-if="!item.stationFilePath"></no-picture>
                                        </div>
                                        <div class="list-item-center" @click="handleDetail(item.id)">
                                            <h3 class="center-title">
                                                <div class="title-left">
                                                    <div class="value">{{item.serviceName}}</div>
                                                    <div class="card">
                                                        <svg-icon type="mine"></svg-icon>{{item.leaderName}}
                                                    </div>
                                                </div>
                                                <div class="title-right">
                                                    <svg-icon type="right_arrow" class="right-arrow"></svg-icon>
                                                </div>

                                            </h3>
                                            <p class="center-item">
                                                <span class="title">地址:</span>
                                                <span class="value">{{item.serviceAddr}}</span>
                                            </p>
                                            <p class="center-item">
                                                <span class="title">联系电话:</span>
                                                <span>{{item.hotline}}</span>
                                            </p>
                                            <p class="center-item last-child">
                                                <span class="title">服务品牌:</span>
                                                <span class="value">{{item.brandType|brandType}}</span>
                                            </p>
                                            <!-- <p class="center-item last-child">
                                                <span class="title">距离:</span>
                                                <span class="value">{{item.distance}}</span>
                                            </p> -->
                                            <div class="phone-icon" @click="call($event, item)">
                                                <svg-icon type="phone"></svg-icon>
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
                <actionsheet
                    v-model="actionModel"
                    :menus="actionMenu"
                    theme="android"
                    @on-click-menu="handleCall">
                </actionsheet>
            </div>
        </section>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import { Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group, Cell, Actionsheet } from 'vux';
    import { searchBar, searchItem, noPicture } from '@/components';
    import userInfo from '@/mixins/userInfo';
    import { stationNearbyListByPage } from '@/services/serviceStation/serviceStationService';
    import { imgHttp } from '@/libs/config';
    // import qs from 'qs';
    import { plusready } from '@/libs/plus';
    import { getCurrentLocation } from '@/libs/location';

    export default {
        mixins: [list, userInfo],
        components: { Scroller, Spinner, searchBar, searchItem, Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group, Cell, noPicture, Actionsheet },
        data () {
            return {
                actionModel: false,
                actionMenu: {},
                searchData: {
                    distance: 1000
                },
                searchModel: '全部'
            };
        },
        methods: {
            // 获取列表
            async _getList () {
                const pos = await getCurrentLocation();
                if (pos && pos.latitude && pos.longitude) {
                    this.searchData.latitude = pos.latitude;
                    this.searchData.longitude = pos.longitude;
                    const result = await stationNearbyListByPage(this.searchData);
                    return result.data;
                }
            },
            // 搜索
            handleSearch () {
                this.list = [];
                this.loadMore();
            },
            // 定位
            handlePosition () {
                this.$router.push('/main/serviceStation/position');
            },
            // 详情
            handleDetail (id) {
                this.$router.push({path: '/main/serviceStation/detail', query: { id }});
            },
            urlFormat (url) {
                return imgHttp + url;
            },
            call (event, item) {
                event.stopPropagation();
                const phoneList = item.hotline.split(',');
                if (phoneList.length === 1) {
                    this.handleCall('menu1', phoneList[0]);
                    return;
                }
                phoneList.forEach((item, index) => {
                    this.actionMenu[`menu${index + 1}`] = item;
                });
                this.actionModel = true;
            },
            handleCall (label, val) {
                this.$messagebox.confirm(val, '').then(() => {
                    plusready((plus) => {
                        plus.device.dial(val, true);
                    });
                }).catch(e => {});
            }
        },
        filters: {
            brandType (val) {
                switch (val) {
                    case 'ALL':
                        return '江淮全系';
                    case 'SHUAIL':
                        return '帅铃';
                    case 'JUNL':
                        return '骏铃';
                    case 'KANGL':
                        return '康铃 ';
                }
            },
            avatarFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/no_picture.png');
                }
                return url;
            }
        }
    };
</script>
