<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
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
                    .list-content {
                        @include flex(stretch, row nowrap, center);
                        margin-bottom: px2rem(15);
                        .list-item-left {
                            flex: 0 0 px2rem(180);
                            @include flex(center, column nowrap, center);
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
                            overflow: hidden;
                            padding: px2rem(10);
                            .center-title {
                                font-size: px2rem(30);
                                font-weight: 500;
                                @include ellipsis;
                                padding: 0 px2rem(15);
                                line-height: px2rem(56);
                            }
                            .center-content {
                                @include flex(center, row nowrap);
                                font-size: px2rem(26);
                                background: #F9F9F9;
                                padding: 0 px2rem(15);
                                .content-item {
                                    flex: 1;
                                    p {
                                        /*margin-bottom: px2rem(15);
                                        &:last-child {
                                            margin-bottom: 0;
                                        }*/
                                        line-height: px2rem(42);
                                        .item-icon {
                                            margin-right: px2rem(5);
                                        }
                                        &.title {
                                            color: #6D818B;
                                        }
                                    }
                                }
                            }
                            .center-footer {
                                display: flex;
                                display: -webkit-flex;
                                font-size: px2rem(26);
                                padding: 0 px2rem(15);
                                line-height: px2rem(56);
                                .footer-item {
                                    flex: 1;
                                }
                            }
                            .center-item {
                                margin-bottom: $font-size-10;
                                @include ellipsis;
                                vertical-align: middle;
                                &:last-child {
                                    margin-bottom: 0;
                                }
                                .center-text {
                                    position: relative;
                                    overflow: visible;
                                    .center-default {
                                        box-sizing: border-box;
                                        position: absolute;
                                        top: 50%;
                                        left: 100%;
                                        display: inline-block;
                                        background-color: #E3E9F0;
                                        font-size: $font-size-12;
                                        transform: translateY(-50%) scale(0.7, 0.7);
                                        border-radius: 2px;
                                        border: 1px solid #9BA1A7;
                                        padding: 5px 10px;
                                        &::after {
                                            content: '';
                                            @include wh(8px, 8px);
                                            border-radius: 8px;
                                            position: absolute;
                                            z-index: 10;
                                            top: 50%;
                                            left: -4px;
                                            margin-top: -4px;
                                            background-color: #9BA1A7;
                                        }
                                        &::before {
                                            content: '';
                                            @include wh(14px, 14px);
                                            border-radius: 14px;
                                            position: absolute;
                                            z-index: 9;
                                            top: 50%;
                                            left: -7px;
                                            margin-top: -7px;
                                            background-color: $white;
                                        }
                                    }
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
    .title-right {
        font-size: px2rem(30);
        padding: px2rem(40);
        text-align: center;
        color: #9A9A9A;
        .mb10 {
            margin-bottom: px2rem(15);
        }
        .right-input {
            text-align: left;
            vertical-align: middle;
            position: relative;
            display: inline-block;
            padding-left: px2rem(10);
            background: #f5f5f5;
            width: px2rem(392);
            height: px2rem(54);
            line-height: px2rem(54);
            border-radius: px2rem(4);
            .triangle {
                position: absolute;
                right: px2rem(10);
                top: 50%;
                font-size: px2rem(22);
                margin-top: 1px;
                transform: translate3d(0, -50%, 0) rotate(180deg);
                .triangle-icon {
                    fill: currentColor;
                }
            }
        }
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
        </hy-header>
        <!-- 搜索 -->
        <search-bar v-model="searchModel" ref="searchBar" model-able-click @tab-change="handleChange">
            <search-item label="全部" closed></search-item>
            <search-item label="车型" @onCancel="handleCancel" @onConfirm="handleSearch">
                <ul class="search-ul-panel">
                    <li class="search-li-item" :class="searchObj.modelId === item.id ? 'active':''" v-for="(item, index) in vehicleModels" :key="index">
                        <a href="javascript: void(0);" @click="handleChoose(item.id)">
                            <svg-icon v-show="searchObj.modelId === item.id" type="selected"></svg-icon>
                            <span :class="{'mt-5': searchObj.modelId === item.id}">{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </search-item>
            <search-item label="时间" @onCancel="handleCancel" @onConfirm="handleSearch('time')">
                <div class="title-right">
                    <div class="mb10">
                        开始时间：
                        <span class="right-input" @click="chooseTime('startTime')">
                            {{searchObj.startTime ? searchObj.startTime : '开始时间'}}
                            <span class="triangle">
                                <svg-icon type="triangle" class="triangle-icon"></svg-icon>
                            </span>
                        </span>
                    </div>
                    <div class="mb10">
                        结束时间：
                        <span class="right-input" @click="chooseTime('endTime')">
                            {{searchObj.endTime ? searchObj.endTime : '结束时间'}}
                            <span class="triangle">
                                <svg-icon type="triangle"></svg-icon>
                            </span>
                        </span>
                    </div>
                </div>
            </search-item>
        </search-bar>
        <!-- 内容 -->
        <section class="section-body">
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
                                        <h2 class="left-title">{{item.plateNo.substr(0, 2)}}</h2>
                                        <div class="left-body">{{item.plateNo | plateNo}}</div>
                                    </div>
                                    <div class="list-item-center">
                                        <h3 class="center-title">{{item.plateNo}}[{{item.modelName}}]</h3>
                                        <div class="center-content">
                                            <div class="content-item">
                                                <p class="title"><svg-icon type="mileage" class="item-icon"></svg-icon>运营里程</p>
                                                <p class="desc">{{item.mileage}}km</p>
                                            </div>
                                            <div class="content-item">
                                                <p class="title"><svg-icon type="oil" class="item-icon"></svg-icon>运营油耗</p>
                                                <p class="desc">{{item.fuelConsumption}}L</p>
                                            </div>
                                            <div class="content-item">
                                                <p class="title"><svg-icon type="avgOil" class="item-icon"></svg-icon>平均油耗</p>
                                                <p class="desc">{{item.fuelConsumptionAvg}}L/100km</p>
                                            </div>
                                        </div>
                                        <div class="center-footer">
                                            <div class="footer-item">报警次数：{{item.alarmCount}}</div>
                                            <div class="footer-item">故障数量：{{item.faultCount}}</div>
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
        </section>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import userInfo from '@/mixins/userInfo';
    import { searchBar, searchItem } from '@/components';
    import { formateDate } from '@/libs/utils';
    import { fleetReportList, vehicleModels } from '@/services/fleetReport/fleetReportService';
    import { Scroller, XButton, XInput, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux';
    import * as cityData from '../carManagement/city_data.json';
    const startTime = formateDate(+new Date() - 7 * 24 * 3600 * 1000, 'yyyy-MM-dd hh:mm:ss');
    const endTime = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
    export default {
        mixins: [ list, userInfo ],
        components: { searchBar, searchItem, Scroller, XButton, XInput, Swipeout, SwipeoutItem, SwipeoutButton },
        data () {
            return {
                currentSearch: '',
                searchObj: {
                    modelId: '',
                    startTime,
                    endTime
                },
                searchModel: '全部',
                vehicleModels: []
            };
        },
        computed: {
            // 是否是车队
            isFleet () {
                return this.userInfo.type === 'fleet';
            }
        },
        mounted () {
          this.getVehicleModels();
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
                const result = await fleetReportList(opt, payload);
                return result.data;
            },
            async getVehicleModels () {
                try {
                    const result = await vehicleModels();
                    this.vehicleModels = result.data || [];
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleChoose (id) {
                this.searchObj.modelId = id;
            },
            // 搜索
            handleSearch (type) {
                if (type === 'time' && (!this.searchObj.startTime || !this.searchObj.endTime)) {
                    this.$toast({
                        message: '请选择时间',
                        position: 'bottom'
                    });
                    return;
                }
                const startTime = new Date(this.searchObj.startTime.replace(/-/, '/')).getTime();
                const endTime = new Date(this.searchObj.endTime.replace(/-/, '/')).getTime();
                if (startTime >= endTime) {
                    this.$toast({
                       message: '开始时间不能大于或等于结束时间',
                       position: 'bottom'
                    });
                    return;
                }
                this.searchData = Object.assign(this.searchData, this.searchObj);
                for (const key in this.searchData) {
                    if (!this.searchData[key]) {
                        delete this.searchData[key];
                    }
                }
                this.list = [];
                this.loadMore();
                this.$refs.searchBar.close();
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
            handleChange (str) {
                if (str === '全部') {
                    this.list = [];
                    const searchData = {
                        pageNo: this.searchData.pageNo,
                        pageSize: this.searchData.pageSize
                    };
                    this.searchObj = {
                        startTime: '',
                        endTime: '',
                        modelId: ''
                    };
                    this.searchData = Object.assign({}, searchData);
                    console.log(this.searchData);
                    this.loadMore();
                }
            }
        },
        filters: {
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
