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
                    .event-icon {
                        font-size: px2rem(40);
                    }
                    .list-content {
                        @include flex(stretch, row wrap, center);
                        line-height: px2rem(56);
                        padding: px2rem(10);
                        margin-bottom: px2rem(15);
                        .list-item-left {
                            @include flex(center, column nowrap, center);
                            overflow: hidden;
                            text-align: center;
                            background-size: 100% 100%;
                            color: $white;
                            margin-right: px2rem(30);
                            .photo {
                                @include wh(#{px2rem(107)}, #{px2rem(107)});
                            }
                        }
                        .list-item-center {
                            position: relative;
                            flex: 1;
                            -webkit-flex: 1;
                            overflow: hidden;
                            .center-title {
                                font-size: px2rem(30);
                                font-weight: 500;
                                @include ellipsis;
                            }
                            .center-item {
                                @include ellipsis;
                                vertical-align: middle;
                                font-size: px2rem(28);
                                .light {
                                    color: #6D7C8B;
                                }
                            }
                            .phone-icon {
                                position: absolute;
                                top: 50%;
                                right: px2rem(30);
                                @include wh(px2rem(56), px2rem(56));
                                border-radius: px2rem(56);
                                line-height: px2rem(56);
                                text-align: center;
                                border: 1px solid currentColor;
                                font-size: px2rem(28);
                                color: #43bd48;
                                transform: translateY(-50%);
                            }
                        }
                        .list-item-right {
                            flex: 0 0 2rem;
                            @include flex(center, column nowrap, flex-end);
                            .carInfo-icon {
                                @include wh(1.4rem, 1.4rem);
                                border-radius: 1.4rem;
                                line-height: 1.4rem;
                                color: #1296DB;
                                font-size: 0.9rem;
                                text-align: center;
                                margin-bottom: $font-size-10;
                                border: 1px solid currentColor;
                                &:last-child {
                                    font-size: $font-size-18;
                                    color: #F39802;
                                }
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
            @include flex(center, row wrap);
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
                <span class="nav_type" @click="handleAdd">
                    <svg-icon type="header_add"></svg-icon>
                </span>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-panel">
            <div class="search-bar">
                <div class="search-group">
                    <x-input v-model="nameOrPhone" :show-clear="false" placeholder="请输入姓名或手机号进行搜索">
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
                                    <div slot="right-menu">
                                        <swipeout-button @click.native="handleEdit(item)" background-color="#D2D2D2">
                                            <svg-icon type="editor" class="event-icon"></svg-icon>
                                        </swipeout-button>
                                        <swipeout-button @click.native="handleUnbind(item)" type="warn">
                                            <svg-icon type="unbind" class="event-icon"></svg-icon>
                                        </swipeout-button>
                                    </div>
                                    <div slot="content" class="list-content">
                                        <div class="list-item-left">
                                            <img class="photo" :src="item.avatar | avatarFormat" alt="">
                                        </div>
                                        <div class="list-item-center" @click="handleDetail(item.id)">
                                            <h3 class="center-title">{{item.driverName}}</h3>
                                            <p class="center-item">
                                                <span class="light">手机号：</span>{{item.mobile}}
                                            </p>
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
            </div>
        </section>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import { Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group, Cell } from 'vux';
    import { searchBar, searchItem } from '@/components';
    import userInfo from '@/mixins/userInfo';
    import { imgHttp } from '@/libs/config';
    import { driverList, unbindFleet } from '@/services/driverService/driverService';
    import { phoneFormat } from '@/libs/utils';
    import { plusready } from '@/libs/plus';
    const numberReg = /^\d+$/;
    export default {
        mixins: [list, userInfo],
        components: { Scroller, Spinner, searchBar, searchItem, Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group, Cell },
        data () {
            return {
                searchModel: '全部',
                nameOrPhone: ''
            };
        },
        mounted () {
        },
        methods: {
            // 获取列表
            async _getList () {
                const opt = {
                    pageNum: this.searchData.pageNo,
                    pageSize: this.searchData.pageSize
                };
                const payload = Object.assign({}, this.searchData);
                delete payload.pageNo;
                delete payload.pageSize;
                const result = await driverList(opt, payload);
                return result.data;
            },
            // 搜索
            handleSearch () {
                if (numberReg.test(this.nameOrPhone)) {
                    ('driverName' in this.searchData) && delete this.searchData.driverName;
                    this.searchData.mobile = this.nameOrPhone;
                } else {
                    ('mobile' in this.searchData) && delete this.searchData.mobile;
                    this.searchData.driverName = this.nameOrPhone;
                }
                this.list = [];
                this.loadMore();
            },
            // 新增
            handleAdd () {
                this.$router.push('/main/driver/driverEdit');
            },
            // 详情
            handleDetail (id) {
                this.$router.push({
                    path: '/main/driver/driverDetail',
                    query: {
                        driverId: id
                    }
                });
            },
            handleEdit (item) {
                this.$router.push({
                    path: '/main/driver/driverEdit',
                    query: {
                        driverId: item.id
                    }
                });
            },
            handleUnbind (item) {
                this.$messagebox.confirm(`是否解绑司机：${item.driverName}`).then(async () => {
                    try {
                        this.$indicator.open();
                        await unbindFleet({driverId: item.id});
                        this.$toast({
                            message: '解绑成功',
                            position: 'bottom'
                        });
                        this.$indicator.close();
                        this.refresh();
                    } catch (e) {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                        this.$indicator.close();
                    }
                });
            },
            call (event, item) {
                event.stopPropagation();
                const phoneStr = phoneFormat(item.mobile, '-');
                this.$messagebox({
                    title: '',
                    message: phoneStr,
                    showCancelButton: true,
                    confirmButtonText: '呼叫司机'
                }).then((action) => {
                    if (action === 'confirm') {
                        plusready((plus) => {
                            plus.device.dial(item.ownerPhone, true);
                        });
                    }
                });
            }
        },
        filters: {
            avatarFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/driver_photo@3x.png');
                }
                return url;
            }
        }
    };
</script>
