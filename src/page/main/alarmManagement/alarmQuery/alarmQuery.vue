/**
 * 作者：yeshengqiang
 * 时间：2018-04-23
 * 描述：报警查询
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        flex: 1;
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
                    .list-box-item {
                        padding: px2rem(15);
                        margin-bottom: px2rem(15);
                        background-color: $white;
                        border: 1px solid #EEEEEE;
                        line-height: px2rem(56);
                        .list-item-title {
                            font-size: px2rem(30);
                            border-bottom: 1px dashed #EEEEEE;
                            span {
                                font-weight: 700;
                                color: #000000;
                                &:last-child {
                                    float: right;
                                }
                            }
                        }
                        .list-item-content {
                            font-size: px2rem(28);
                            display: flex;
                            display: -webkit-flex;
                            -webkit-align-items: center;
                            -webkit-flex-flow: row nowrap;
                            align-items: center;
                            flex-flow: row nowrap;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .content-p {
                                display: flex;
                                display: -webkit-flex;
                                flex: 1;
                                -webkit-flex: 1;
                                color: #6D7C8B;
                                @include ellipsis;
                                .title {
                                    .word {
                                        margin-right: px2rem(14);
                                        &:last-child {
                                            margin-right: 0;
                                        }
                                    }
                                }
                                .value {
                                    flex: 1;
                                    word-wrap: normal;
                                    white-space: normal;
                                    word-break: break-all;
                                    color: #212121;
                                    &.error {
                                        color: $global_color;
                                    }
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
        .right-search-item {
            display: flex;
            text-align: center;
            margin-bottom: px2rem(30);
            height: px2rem(56);
            line-height: px2rem(56);
            &:last-child {
                margin-bottom: 0;
            }
            .label {
                display: inline-block;
                width: px2rem(150);
                color: #333333;
                margin-right: px2rem(10);
                text-align: right;
            }
            .model-group {
                flex: 1;
                position: relative;
                width: px2rem(469);
                height: px2rem(54);
                .model {
                    @include wh(100%, 100%);
                    padding-left: px2rem(10);
                    background: #f5f5f5;
                    &::placeholder {
                        color: rgba(51,51,51,0.8);
                    }
                    padding-right: px2rem(40);
                }
                .clear-icon {
                    position: absolute;
                    color: rgba(51,51,51,0.8);
                    top: 0;
                    right: px2rem(5);
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
    <div class="section-panel alarm-query-panel">
        <!-- 搜索 -->
        <search-bar v-model="searchModel" ref="searchBar" model-able-click @tab-change="handleChange" @onCancel="handleCancel">
            <search-item label="全部" closed></search-item>
            <search-item v-if="isFleet" label="车牌号" @onCancel="handleCancel" @onConfirm="handleSearch">
                <div class="title-right">
                    <div class="right-search-item">
                        <span class="label">车牌号：</span>
                        <div class="model-group">
                            <input class="model" type="text" placeholder="车牌号" v-model="searchObj.plateNo ">
                            <div class="clear-icon" v-show="searchObj.plateNo" @click="searchObj.plateNo = ''">
                                <svg-icon type="i-clear"></svg-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </search-item>
            <search-item label="报警类型" @onCancel="handleCancel" @onConfirm="handleSearch">
                <ul class="search-ul-panel">
                    <li class="search-li-item" :class="searchObj.alarmTypeList.indexOf(item.value) > -1 ? 'active':''" v-for="(item, index) in allModelList" :key="index">
                        <!--<a href="javascript: void(0);" @click="handleChoose(item.value)">
                            <svg-icon v-show="searchObj.alarmType === item.value" type="selected"></svg-icon>
                            <span :class="{'mt-5': searchObj.alarmType === item.value}">{{item.name}}</span>
                        </a>-->
                        <a href="javascript: void(0);" @click="handleChoose(item.value)">
                            <svg-icon v-show="searchObj.alarmTypeList.indexOf(item.value) > -1" type="selected"></svg-icon>
                            <span :class="{'mt-5': searchObj.alarmTypeList.indexOf(item.value) > -1}">{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </search-item>
            <search-item label="报警时间段" @onCancel="handleCancel" @onConfirm="handleSearch('time')">
                <div class="title-right">
                    <div class="mb10">
                        开始时间：
                        <span class="right-input" @click="chooseTime('startTime')">
                            {{searchObj.startTime ? searchObj.startTime : '开始时间'}}
                            <span class="triangle">
                                <svg-icon type="triangle"></svg-icon>
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
        <section class="section-body">
            <div class="section-body-scroller">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                    @on-pulldown-loading="refresh"
                    :pulldown-config="$store.state.pulldownDefaultConfig"
                    :pullup-config="$store.state.pullupDefaultConfig"
                    ref="scroller" height="100%">
                    <ul class="list-box">
                        <li class="list-box-item" v-for="(item, index) in list" :key="index" @click="handleDetail(item.id)">
                            <h3 class="list-item-title">
                                <span class="title">{{item.plateNo}}</span>
                                <span class="value">{{item.alarmStartTime}}</span>
                            </h3>
                            <div class="list-item-content">
                                <p class="content-p">
                                    <span class="title">报警类型：</span>
                                    <span class="value error">{{item.alarmType | alarmType}}</span>
                                </p>
                            </div>
                            <div class="list-item-content">
                                <p class="content-p">
                                    <span class="title">报警内容：</span>
                                    <span class="value">{{item.alarmContent}}</span>
                                </p>
                            </div>
                            <div class="list-item-content">
                                <p class="content-p" v-if="item.alarmStartTime && item.alarmEndTime">
                                    <span class="title"><span class="word">时</span><span class="word">间</span><span class="word">段</span>：</span>
                                    <span class="value">{{item.alarmStartTime}}~{{item.alarmEndTime}}</span>
                                </p>
                            </div>
                            <div class="list-item-content">
                                <p class="content-p">
                                    <span class="title">报警时长：</span>
                                    <span class="value">{{item.alarmDuration}}</span>
                                </p>
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
        </section>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import userInfo from '@/mixins/userInfo';
    import { searchBar, searchItem } from '@/components';
    import { formateDate, deepCopy } from '@/libs/utils';
    import { alarmList } from '@/services/alarmManagement/alarmManagement';
    import { Scroller, XButton, XInput } from 'vux';

    export default {
        mixins: [ list, userInfo ],
        components: { searchBar, searchItem, Scroller, XButton, XInput },
        data () {
            return {
                currentSearch: '',
                searchModel: '全部',
                searchObj: {
                    startTime: '',
                    endTime: '',
                    plateNo: '',
                    alarmTypeList: ['OVERSPEED', 'TIMEOUT', 'FATIGUE', 'OFFLINE', 'FUEL']
                },
                allModelList: [
                    {
                        value: 'OVERSPEED',
                        name: '超速报警'
                    },
                    {
                        value: 'TIMEOUT',
                        name: '超时停车报警'
                    },
                    {
                        value: 'FATIGUE',
                        name: '疲劳驾驶报警'
                    },
                    {
                        value: 'OFFLINE',
                        name: '离线报警'
                    },
                    {
                        value: 'FUEL',
                        name: '油耗异常报警'
                    }
                ]
            };
        },
        computed: {
            // 是否是车队
            isFleet () {
                return this.userInfo.type === 'fleet';
            }
        },
        methods: {
            // 获取列表
            async _getList () {
                if (!this.searchData.alarmTypeList) {
                    this.searchData.alarmTypeList = ['OVERSPEED', 'TIMEOUT', 'FATIGUE', 'OFFLINE', 'FUEL'];
                }
                const result = await alarmList(this.searchData);
                return result.data;
            },
            handleChoose (type) {
                let index = -1;
                index = this.searchObj.alarmTypeList.indexOf(type);
                if (index > -1) {
                    this.searchObj.alarmTypeList.splice(index, 1);
                } else {
                    this.searchObj.alarmTypeList.push(type);
                }
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
                this.searchData = Object.assign(this.searchData, deepCopy(this.searchObj));
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
                const searchData = deepCopy(this.searchData);
                delete searchData.pageNo;
                delete searchData.pageSize;
                this.searchObj = Object.assign(this.searchObj, searchData);
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
            // 请输入车牌号
            handlePlateNo () {
                if (!this.searchData.plateNo) return;
                this.list = [];
                this.loadMore();
                this.$refs.searchBar.close();
            },
            handleChange (str) {
                if (str === '全部') {
                    this.list = [];
                    const searchData = {
                        pageNo: this.searchData.pageNo,
                        pageSize: this.searchData.pageSize
                    };
                    this.searchObj = {
                        alarmTypeList: ['OVERSPEED', 'TIMEOUT', 'FATIGUE', 'OFFLINE', 'FUEL'],
                        startTime: '',
                        endTime: '',
                        plateNo: ''
                    };
                    this.searchData = Object.assign({}, searchData);
                    this.loadMore();
                }
            },
            handleDetail (id) {
                this.$router.push({path: '/main/alarmManagement/alarmQuery/detail', query: {id: id}});
            }
        },
        filters: {
            alarmType (val) {
                let res = '';
                switch (val) {
                    case 'OVERSPEED':
                        res = '超速报警';
                        break;
                    case 'TIMEOUT':
                        res = '超时停车报警';
                        break;
                    case 'FATIGUE':
                        res = '疲劳驾驶报警';
                        break;
                    case 'OFFLINE':
                        res = '离线报警';
                        break;
                    case 'FUEL':
                        res = '油耗异常报警 ';
                        break;
                }
                return res;
            }
        }
    };
</script>
