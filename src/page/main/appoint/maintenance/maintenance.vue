/**
 * 作者：aicong
 * 时间：2018-04-24
 * 描述：维保
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .maintenance-panel {
        flex: 1;
        @include flex(stretch, column nowrap);
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
                    align-conent: center;
                    margin-bottom: px2rem(30);
                    height: px2rem(56);
                    line-height: px2rem(56);
                    .label {
                        color: #333333;
                        margin-right: px2rem(10);
                    }
                    .model {
                        flex: 1;
                        height: px2rem(54);
                        background: #f5f5f5;
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
                    .list-box-item {
                        padding: px2rem(15);
                        margin-bottom: px2rem(15);
                        background-color: $white;
                        line-height: px2rem(56);
                        .list-item-title {
                            font-size: px2rem(30);
                            border-bottom: 1px solid #ebeef5;
                            color: #000000;
                            .fr {
                                float: right;
                            }
                            .color-unfinished {
                                color: #FD585D;
                            }
                            .color-finished {
                                color: #68CBCB;
                            }
                            .color-refuse {
                                color: #FD585D;
                            }
                            .color-processed  {
                                color: #FB9900;
                            }
                        }
                        .list-item-content {
                            font-size: px2rem(28);
                            display: flex;
                            display: -webkit-flex;
                            -webkit-align-items: center;
                            -webkit-flex-flow: row nowrap;
                            flex-flow: row nowrap;
                            align-items: flex-start;
                            .content-left {
                                padding-top: px2rem(15);
                                margin-right: px2rem(30);
                                .mark {
                                    width: px2rem(107);
                                    height: px2rem(107);
                                    line-height: px2rem(107);
                                    text-align: center;
                                    font-size: px2rem(36);
                                    color: #ffffff;
                                    border-radius: px2rem(10);
                                    background: #F87E4F;
                                }
                            }
                            .content-right {
                                flex: 1;
                                font-size: px2rem(28);
                                color: #6D7C8B;
                                .right-item {
                                    .value {
                                        color: #212121;
                                        font-weight: 500;
                                    }
                                }
                            }
                            .mark-content {
                                flex: 1;
                                display: flex;
                                display: -webkit-flex;
                                padding: 0 px2rem(15);
                                color: #6D7C8B;
                                line-height: px2rem(44);
                                .value {
                                    flex: 1;
                                    display: inline-block;
                                    word-break: break-all;
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
            font-size: $font-size-16;
            text-align: center;
            .search-li-item {
                width: 50%;
                padding: 10px;
                a:link,
                a:hover,
                a:visited,
                a:active {
                    color: #9A9A9A;
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
        .search-btn {
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-flow: row nowrap;
            align-items: center;
            flex-flow: row nowrap;
            font-size: 16px;
            @include border-t-1px(#DDDDDD);
            text-align: center;
            a:link,
            a:hover,
            a:visited,
            a:active {
                height: 36px;
                line-height: 36px;
                display: inline-block;
                width: 50%;
                text-decoration: none;
                color: #9A9A9A;
                &.sure {
                    background-color: $global_color;
                    color: $white;
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
    .bg-repair {
        background: #F87E4F;
    }
    .bg-maintain {
        background: #13D9C9;
    }
    .bg-all {
        background: #13D9C9;
    }
</style>
<template>
<!-- 内容 -->
    <section class="maintenance-panel">
        <div class="extend-search-panel" v-show="moreSearch">
            <div class="extend-search-body">
                <div class="extend-search-item">
                    <span class="label">车牌号：</span>
                    <x-input v-model.trim="searchObj.plateNo" placeholder="车牌号" class="model"></x-input>
                </div>
                <div class="extend-search-item">
                    <span class="label">服务站：</span>
                    <x-input v-model.trim="searchObj.appointServiceName" placeholder="服务站" class="model"></x-input>
                </div>
                <x-button class="submit-btn" @click.native="handleSearch">搜索</x-button>
            </div>
            <div class="extend-search-mask" @click.self="closeMoreSearch"></div>
        </div>
        <!-- 搜索栏杆 -->
        <search-bar v-model="searchModel" ref="searchBar" model-able-click @tab-change="handleChange">
            <search-item label="全部" closed></search-item>
            <search-item label="时间" @onCancel="handleCancel" @onConfirm="handleSearch('time')">
                <div class="title-right">
                    <div class="mb10">
                        开始时间：
                        <span class="right-input" @click="chooseTime('appointTimeStar')">
                            {{searchObj.appointTimeStar ? searchObj.appointTimeStar : '开始时间'}}
                            <span class="triangle">
                                <svg-icon type="triangle"></svg-icon>
                            </span>
                        </span>
                    </div>
                    <div class="mb10">
                        结束时间：
                        <span class="right-input" @click="chooseTime('appointTimeEnd')">
                            {{searchObj.appointTimeEnd ? searchObj.appointTimeEnd : '结束时间'}}
                            <span class="triangle">
                                <svg-icon type="triangle"></svg-icon>
                            </span>
                        </span>
                    </div>
                </div>
            </search-item>
            <search-item label="类型" @onCancel="handleCancel" @onConfirm="handleSearch">
                <div class="title-right">
                    <ul class="search-ul-panel">
                        <li class="search-li-item" :class="searchObj.appointType.indexOf(item.value) > -1?'active':''" v-for="(item, index) in typeList" :key="index">
                            <a href="javascript: void(0);" @click="handleChoose(item.value, 'type')">
                                <svg-icon v-show="searchObj.appointType.indexOf(item.value) > -1" type="selected"></svg-icon>
                                <span :class="{'mt-5': searchObj.appointType.indexOf(item.value) > -1}">{{item.name}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </search-item>
        </search-bar>
        <div class="section-body">
            <div class="section-body-scroller">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                    @on-pulldown-loading="refresh"
                    :pulldown-config="$store.state.pulldownDefaultConfig"
                    :pullup-config="$store.state.pullupDefaultConfig"
                    ref="scroller" height="100%">
                    <ul class="list-box">
                        <li class="list-box-item" v-for="(item, index) in list"  @click="_selectDetail(item)" :key="index">
                            <h3 class="list-item-title">
                                <span>{{item.plateNo}} <span class="mark" :class="getClass(item, 'color')">[{{item.state|stateFormat}}]</span></span>
                                <span class="fr clearfix">{{item.appointTime}}</span>
                            </h3>
                            <div class="list-item-content">
                                <div class="content-left">
                                    <div class="mark">{{item.appointType|appointTypeFormat}}</div>
                                </div>
                                <div class="content-right">
                                    <p class="right-item">
                                        <span classs="title">VIN码:</span>
                                        <span class="value">{{item.vin}}</span>
                                    </p>
                                    <p class="right-item">
                                        <span classs="title">工单号：</span>
                                        <span class="value">{{item.motorcadeName}}</span>
                                    </p>
                                    <p class="right-item">
                                        <span classs="title">维保费用：</span>
                                        <span class="value">{{item.actualCost ? item.actualCost + '元': ''}}</span>
                                    </p>
                                    <p class="right-item">
                                        <span classs="title">所属客户：</span>
                                        <span class="value">{{item.dealerName}}</span>
                                    </p>
                                    <p class="right-item">
                                        <span classs="title">维保服务站：</span>
                                        <span class="value">{{item.appointServiceName}}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                        <transition name="fade">
                            <li v-show="!list.length" class="no-data-tip">
                                <div class="text">暂无数据</div>
                            </li>
                        </transition>
                    </ul>
                </scroller>
            </div>
        </div>
    </section>
</template>
<script>
    import list from '@/mixins/list';
    import userInfo from '@/mixins/userInfo';
    import { Scroller, Spinner, Cell, Group, Flexbox, FlexboxItem, XButton, XInput } from 'vux';
    import { searchBar, searchItem } from '@/components';
    import { queryAppointList } from '@/services/appointService/appointService';
    import { formateDate, deepCopy } from '@/libs/utils';
    import { mapState, mapMutations } from 'vuex';

    export default {
        mixins: [ list, userInfo ],
        components: { Scroller, Spinner, searchBar, searchItem, Cell, Group, Flexbox, FlexboxItem, XButton, XInput },
        data () {
            return {
                searchModel: '全部',
                searchObj: {
                    appointTimeStar: '',
                    appointTimeEnd: '',
                    plateNo: '',
                    appointServiceName: '',
                    appointType: ['maintain', 'all', 'repair']
                },
                searchData: {
                    appointType: ['maintain', 'all', 'repair']
                },
                typeList: [
                    {
                        name: '保养',
                        value: 'maintain'
                    },
                    {
                        name: '维修',
                        value: 'repair'
                    },
                    {
                        name: '维保',
                        value: 'all'
                    }
                ]
            };
        },
        created () {
            this.SET_MORE_SEARCH(false);
        },
        computed: {
            ...mapState([
               'moreSearch'
            ])
        },
        methods: {
            ...mapMutations([
               'SET_MORE_SEARCH'
            ]),
            // 获取列表
            async _getList () {
                if (!this.userInfo.id) {
                    await this.getUserInfo();
                }
                this.searchData.driverId = this.userInfo.id;
                this.searchData.stateList = ['finished', 'processed'];        // 处理中，已完成
                const result = await queryAppointList(this.searchData);
                return result.data;
            },
            handleChoose (value, type) {
                let index = -1;
                switch (type) {
                    case 'type':
                        index = this.searchObj.appointType.indexOf(value);
                        if (index > -1) {
                            this.searchObj.appointType.splice(index, 1);
                        } else {
                            this.searchObj.appointType.push(value);
                        }
                        break;
                    case 'state':
                        index = this.searchObj.stateList.indexOf(value);
                        if (index > -1) {
                            this.searchObj.stateList.splice(index, 1);
                        } else {
                            this.searchObj.stateList.push(value);
                        }
                        break;
                }
            },
            handleSearch (type) {
                if (type === 'time' && (!this.searchObj.appointTimeStar || !this.searchObj.appointTimeEnd)) {
                    this.$toast({
                        message: '请选择时间',
                        position: 'bottom'
                    });
                    return;
                }
                const searchData = deepCopy(this.searchObj);
                this.searchData = Object.assign(this.searchData, searchData);
                this.list = [];
                this.loadMore();
                this.$refs.searchBar.close();
                this.SET_MORE_SEARCH(false);
            },
            handleCancel () {
                for (const key in this.searchObj) {
                    if (this.searchData[key]) {
                        this.searchObj[key] = this.searchData[key];
                    } else {
                        if (key === 'appointType' || key === 'stateList') {
                            this.searchObj[key] = [];
                        } else {
                            this.searchObj[key] = '';
                        }
                    }
                }
                this.$refs.searchBar.close();
            },
            closeMoreSearch () {
                this.SET_MORE_SEARCH(false);
                this.handleCancel();
            },
            // 时间搜索
            chooseTime (type) {
                let scope = this;
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM-DD HH:mm:00',
                    datetime: ['00', '15', '30', '45'],
                    value: formateDate(new Date(), 'YYYY-MM-DD HH:mm'),
                    onConfirm (val) {
                        scope.searchObj[type] = val;
                    }
                });
            },
            getClass (item, type) {
                if (type === 'bg') {
                    return type + '-' + item.appointType;
                } else {
                    return type + '-' + item.state;
                }
            },
            // 搜索
            handlerSearchByFilter () {
                this.list = [];
                this.loadMore();
                this.$refs.searchBar.close();
            },
            // 查询全部
            handleChange (str) {
                if (str === '全部') {
                    const searchData = {
                      pageNo: this.searchData.pageNo,
                      pageSize: this.searchData.pageSize
                    };
                    this.searchData = Object.assign({}, searchData);
                    this.searchObj = {
                        appointTimeStar: '',
                        appointTimeEnd: '',
                        plateNo: '',
                        appointServiceName: '',
                        appointType: []
                    };
                    this.handlerSearchByFilter();
                }
            },
            // 查看详情
            _selectDetail (item) {
                this.$router.push({
                    path: '/main/appoint/maintenance/detail',
                    query: {
                        id: item.id
                    }
                });
            }
        },
        filters: {
            // 预约类型过滤
            appointTypeFormat (val) {
                let str = '';
                switch (val) {
                    case 'maintain':
                        str = '保养';
                        break;
                    case 'repair':
                        str = '维修';
                        break;
                    case 'all':
                        str = '维保';
                        break;
                }
                return str;
            },
            // 状态过滤
            stateFormat (val) {
                let str = '';
                switch (val) {
                    case 'processed':
                        str = '处理中';
                        break;
                    case 'unfinished':
                        str = '未处理';
                        break;
                    case 'finished':
                        str = '已完成';
                        break;
                    case 'refuse':
                        str = '拒绝';
                        break;
                }
                return str;
            }
        }
    };
</script>
