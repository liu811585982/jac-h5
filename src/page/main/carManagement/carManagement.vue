/**
 * 作者：yeshengqiang
 * 时间：2018-04-09
 * 描述：车辆管理
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch);
        overflow: hidden;
        .section-body-panel {
            flex: 1;
            @include flex(stretch, column nowrap);
        }
        .search-bar {
            overflow: hidden;
            position: relative;
            height: px2rem(82);
            background-color: #FFFFFF;
            z-index: 0;
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
                    .event-icon {
                        font-size: px2rem(40);
                    }
                    .list-content {
                        display: flex;
                        display: -webkit-flex;
                        align-items: stretch;
                        flex-flow: row nowrap;
                        -webkit-align-items: stretch;
                        -webkit-justify-content: center;
                        justify-content: center;
                        margin-bottom: px2rem(15);
                        .list-item-left {
                            flex: 0 0 px2rem(180);
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            flex-flow: column nowrap;
                            -webkit-align-items: center;
                            -webkit-flex-flow: column nowrap;
                            justify-content: center;
                            -webkit-justify-content: center;
                            overflow: hidden;
                            text-align: center;
                            color: $white;
                            background-color: $global_color;
                            .left-title {
                                display: inline-block;
                                font-size: px2rem(66);
                                line-height: px2rem(100);
                                @include ellipsis;
                                border-bottom: 1px solid rgba(255,255,255, 0.4);
                            }
                            .left-body {
                                width: 100%;
                                font-size: px2rem(26);
                                color: rgba(255,255,255,0.8);
                                line-height: px2rem(56);
                                @include ellipsis;
                            }
                        }
                        .list-item-center {
                            flex: 1;
                            -webkit-flex: 1;
                            padding: px2rem(15) px2rem(20);
                            overflow: hidden;
                            .center-title {
                                font-size: px2rem(32);
                                font-weight: 500;
                                @include ellipsis;
                                margin-top: px2rem(10);
                                margin-bottom: px2rem(20);
                            }
                            .center-item {
                                @include ellipsis;
                                vertical-align: middle;
                                font-size: px2rem(28);
                                color: #6D7C8B;
                                margin-bottom: px2rem(22);
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                        .list-item-right {
                            position: relative;
                            flex: 0 0 2rem;
                            display: flex;
                            display: -webkit-flex;
                            align-items: center;
                            flex-flow: column nowrap;
                            -webkit-align-items: center;
                            -webkit-flex-flow: column nowrap;
                            justify-content: flex-end;
                            .default-mark {
                                position: absolute;
                                top: 0;
                                right: 0;
                            }
                            .carInfo-icon {
                                @include wh(px2rem(56), px2rem(56));
                                border-radius: px2rem(56);
                                line-height: px2rem(56);
                                color: #1296DB;
                                font-size: px2rem(28);
                                text-align: center;
                                margin-bottom: px2rem(15);
                                border: 1px solid currentColor;
                                &.phone {
                                    color: #43bd48;
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
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-flow: row wrap;
            align-items: center;
            flex-flow: row wrap;
            font-size: px2rem(26);
            text-align: center;
            padding: px2rem(20);
            .search-li-item {
                width: 50%;
                padding: px2rem(30);
                a:link,
                a:hover,
                a:visited,
                a:active {
                    color: rgba(51,51,51,0.8);
                }
            }
            .search-li-item.active {
                a {
                    color: #DC3F3E;
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
    .fleet-panel {
        padding: 15px;
        text-align: center;
        .weui-cell {
            border: 1px solid #ccc;
            font-size: 14px;
            margin-bottom: 10px;
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
            <span class="header-nav__inner is-right" v-if="userInfo.type === 'fleet'" slot="right">
                <span class="nav_type" @click="handleAdd">
                    <svg-icon type="header_add"></svg-icon>
                </span>
            </span>
        </hy-header>
        <!-- 内容 -->
        <section class="section-body-panel">
            <!-- 搜索栏杆 -->
            <search-bar v-model="searchModel" v-show="isFleet" ref="searchBar" model-able-click @tab-change="handleChange">
                <search-item label="全部" closed></search-item>
                <search-item label="车型" @onConfirm="handleSearch" @onCancel="handleCancel">
                    <ul class="search-ul-panel">
                        <li class="search-li-item" :class="searchObj.id === item.id ? 'active':''" v-for="(item, index) in allCarModelList" :key="index">
                            <a href="javascript: void(0);" @click="handleChoose(item.id, 'MODEL')">
                                <svg-icon v-show="searchObj.id === item.id" type="selected"></svg-icon>
                                <span :class="{'mt-5': searchObj.id === item.id}">{{item.name}}</span>
                            </a>
                        </li>
                    </ul>
                    <!-- <div class="search-btn">
                        <a href="javascript: void(0);">取消</a>
                        <a class="sure" href="javascript: void(0);">确定</a>
                    </div> -->
                </search-item>
                <!-- 司机 -->
                <!-- <search-item label="车长" @onConfirm="handleSearch" @onCancel="handleCancel">
                    <ul class="search-ul-panel">
                        <li class="search-li-item" :class="searchObj.id === item.id ? 'active':''" v-for="(item, index) in allCarLengthList" :key="index">
                            <a href="javascript: void(0);" @click="handleChoose(item.id, 'LENGTH')">{{item.name}}</a>
                        </li>
                    </ul>
                    <div class="search-btn">
                        <a href="javascript: void(0);">取消</a>
                        <a class="sure" href="javascript: void(0);">确定</a>
                    </div>
                </search-item>
                <search-item label="厢型" @onConfirm="handleSearch" @onCancel="handleCancel">
                    <ul class="search-ul-panel">
                        <li class="search-li-item" :class="searchObj.id === item.id ? 'active':''" v-for="(item, index) in allCarVanList" :key="index">
                            <a href="javascript: void(0);" @click="handleChoose(item.id, 'VAN')">{{item.name}}</a>
                        </li>
                    </ul>
                    <div class="search-btn">
                        <a href="javascript: void(0);">取消</a>
                        <a class="sure" href="javascript: void(0);">确定</a>
                    </div>
                </search-item> -->
            </search-bar>
            <div class="search-bar" v-show="isFleet">
                <div class="search-group">
                    <x-input v-model="searchObj.ownerNameOrPhone" :show-clear="false" placeholder="请输入车主姓名/电话进行搜索">
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
                                    <div slot="right-menu" v-if="userInfo.type !== 'driver'">
                                        <swipeout-button @click.native="handleEdit(item)" background-color="#D2D2D2">
                                            <svg-icon type="editor" class="event-icon"></svg-icon>
                                        </swipeout-button>
                                        <swipeout-button @click.native="handleDel(item)" type="warn">
                                            <svg-icon type="unbind" class="event-icon"></svg-icon>
                                        </swipeout-button>
                                    </div>
                                    <div slot="content" @click="handleDetail(item.id)" class="list-content">
                                        <div class="list-item-left">
                                            <h2 class="left-title">{{item.plateNo.substr(0, 2)}}</h2>
                                            <div class="left-body">{{item.plateNo | plateNo}}</div>
                                        </div>
                                        <div class="list-item-center">
                                            <h3 class="center-title">{{item.plateNo}}[{{item.modelName}}]</h3>
                                            <p class="center-item" v-if="item.length && item.van">{{item.length}}米 | {{item.van}}</p>
                                            <p class="center-item" v-if="isFleet">司机：{{item.defaultDriverName|nullFormat}}</p>
                                            <p class="center-item" v-else>车主：{{item.ownerName|nullFormat}}</p>
                                            <p class="center-item" v-if="isFleet">电话：{{item.defaultDriverPhone|nullFormat}}</p>
                                            <p class="center-item" v-else>电话：{{item.ownerPhone|nullFormat}}</p>
                                        </div>
                                        <div class="list-item-right" v-if="userInfo.type !== 'driver' || item.status === 1">
                                            <div class="carInfo-icon" @click="coords($event, item)">
                                                <svg-icon type="coords"></svg-icon>
                                            </div>
                                            <div class="carInfo-icon phone" @click="call($event, item)">
                                                <svg-icon type="phone"></svg-icon>
                                            </div>
                                            <div class="default-mark" v-if="item.status === 1 && userInfo.type === 'driver'">
                                                <default-badge desc="使用中"></default-badge>
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
    import { mapState, mapActions } from 'vuex';
    import list from '@/mixins/list';
    import { Scroller, Spinner, Swipeout, XButton, XInput, SwipeoutItem, SwipeoutButton } from 'vux';
    import { searchBar, searchItem, defaultBadge } from '@/components';
    import { motorcadeList, unbindVehicle } from '@/services/carManagement/carManagement';
    import userInfo from '@/mixins/userInfo';
    import { phoneFormat } from '@/libs/utils';
    import { plusready } from '@/libs/plus';
    import * as cityData from './city_data.json';

    export default {
        name: 'carManagement',
        mixins: [list, userInfo],
        components: { Scroller, XInput, XButton, Spinner, searchBar, searchItem, Swipeout, SwipeoutItem, SwipeoutButton, defaultBadge },
        data () {
            return {
                searchModel: '全部',
                searchObj: {
                    id: '',
                    type: ''
                }
            };
        },
        computed: {
            ...mapState([
                'allCarModelList',
                'allCarLengthList',
                'allCarVanList'
            ]),
            isFleet () {
                return this.userInfo.type === 'fleet';
            }
        },
        mounted () {
            // if (!this.allCarModelList.length || !this.allCarLengthList.length || !this.allCarVanList.length) {
            this.getAllSearchList();
            // }
        },
        methods: {
            ...mapActions([
                'getAllSearchList'
            ]),
            // 获取列表
            async _getList () {
                const result = await motorcadeList(this.searchData);
                return result.data;
            },
            handleChoose (id, type) {
                this.searchObj.id = id;
                this.searchObj.type = type;
            },
            // 搜索
            handleSearch () {
                this.searchData = Object.assign(this.searchData, this.searchObj);
                for (const key in this.searchData) {
                    if (!this.searchData[key]) {
                        delete this.searchData[key];
                    }
                }
                this.list = [];
                this.loadMore();
                this.$refs.searchBar.close();
                this.moreSearch = false;
            },
            handleCancel () {
                const searchObj = {};
                for (const key in this.searchObj) {
                    if (this.searchData[key]) {
                        searchObj[key] = this.searchData[key];
                    } else {
                        searchObj[key] = '';
                    }
                }
                this.searchObj = Object.assign({}, searchObj);
                this.$refs.searchBar.close();
                this.moreSearch = false;
            },
            handleChange (str) {
                if (str === '全部') {
                    this.list = [];
                    const searchData = {
                        pageNo: this.searchData.pageNo,
                        pageSize: this.searchData.pageSize
                    };
                    this.searchObj = {
                        id: '',
                        type: ''
                    };
                    this.searchData = Object.assign({}, searchData);
                    this.loadMore();
                }
            },
            // 新增
            handleAdd () {
                this.$router.push('/main/carManagement/modify');
            },
            // 编辑
            handleEdit (item) {
                this.$router.push({path: '/main/carManagement/modify', query: {id: item.id}});
            },
            handleDetail (id) {
                this.$router.push({path: '/main/carManagement/detail', query: { id }});
            },
            // 删除
            handleDel (item) {
                this.$messagebox.confirm('是否解绑?').then(async () => {
                    try {
                        this.$indicator.open();
                        await unbindVehicle({vehicleId: item.id});
                        this.$toast({
                            message: '解绑成功',
                            position: 'bottom'
                        });
                        this.refresh();
                        this.$indicator.close();
                    } catch (e) {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                        this.$indicator.close();
                    }
                });
            },
            coords (event, item) {
                event.stopPropagation();
                this.$router.push({path: '/main/carMonitoring/positioning', query: {plateNo: item.plateNo}});
            },
            call (event, item) {
                console.log(item);
                event.stopPropagation();
                let str = '车主';
                let phone = item.ownerPhone;
                if (this.isFleet) {
                    str = '司机';
                    phone = item.defaultDriverPhone;
                }
                if (!phone) {
                    this.$messagebox.alert('暂无授权司机');
                    return;
                }
                const phoneStr = phoneFormat(phone, '-');
                this.$messagebox({
                    title: '',
                    message: phoneStr,
                    showCancelButton: true,
                    confirmButtonText: `呼叫${str}`
                }).then((action) => {
                    if (action === 'confirm') {
                        plusready((plus) => {
                            plus.device.dial(phone, true);
                        });
                    }
                });
            }
        },
        filters: {
            nullFormat (val) {
                if (!val) {
                    return '--';
                }
                return val;
            },
            plateNo (val) {
                const result = cityData.filter(item => item.code === val.substr(0, 2));
                if (result[0]) {
                    return `${result[0].province} | ${result[0].city}`;
                } else {
                    return '--';
                }
            }
        }
    };
</script>
