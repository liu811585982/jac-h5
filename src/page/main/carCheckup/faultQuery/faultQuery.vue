/**
 * 作者：yeshengqiang
 * 时间：2018-04-24
 * 描述：故障查询
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .faultQuery-panel {
        flex: 1;
        @include flex(stretch);
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
                padding: px2rem(40);
                font-size: px2rem(30);
                .extend-search-item {
                    display: flex;
                    text-align: center;
                    margin-bottom: px2rem(30);
                    height: px2rem(56);
                    line-height: px2rem(56);
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
                .extend-search-footer {
                    height: px2rem(56);
                    line-height: px2rem(56);
                    text-align: center;
                    .extend-btn {
                        font-size: px2rem(30);
                        color: $white;
                        background: $global_color;
                        width: px2rem(147);
                        height: px2rem(57);
                        border-radius: px2rem(4);
                    }
                }
            }
            .extend-search-mask {
                position: absolute;
                z-index: -1;
                @include wh(100%, 100%);
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
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
                    .list-box-item {
                        padding: px2rem(15);
                        margin-bottom: px2rem(15);
                        background-color: $white;
                        border: 1px solid #EEEEEE;
                        .list-item-title {
                            font-size: px2rem(30);
                            font-weight: 500;
                            padding-top: px2rem(10);
                            padding-bottom: px2rem(15);
                            margin-bottom: px2rem(20);
                            color: #000000;
                            border-bottom: 1px solid #EEEEEE;
                            span {
                                &.back-right {
                                    display: block;
                                    float: right;
                                    // transform: rotate(180deg);
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
                            margin-bottom: px2rem(10);
                            &:last-child {
                                margin-bottom: 0;
                            }
                            .content-p {
                                flex: 1;
                                -webkit-flex: 1;
                                color: #6D7C8B;
                                @include ellipsis;
                                span {
                                    vertical-align: middle;
                                }
                                .value {
                                    color: #333333;
                                    font-weight: 500;
                                }
                                .vin-color {
                                    color: #DE4041;
                                    font-weight: 500;
                                }
                                .color-origin {
                                    color: #F39901;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .fleet-panel {
        padding: $font-size-15;
        text-align: center;
        .weui-cell {
            border: 1px solid #ccc;
            font-size: $font-size-14;
            margin-bottom: $font-size-10;
        }
    }
</style>
<template>
    <div class="faultQuery-panel">
        <div class="extend-search-panel" v-show="moreSearch">
            <div class="extend-search-body">
                <div class="extend-search-item">
                    <span class="label">故障码：</span>
                    <div class="model-group">
                        <input class="model" type="text" placeholder="故障码" v-model="searchObj.faultCode ">
                        <div class="clear-icon" v-show="searchObj.faultCode" @click="searchObj.faultCode  = null">
                            <svg-icon type="i-clear"></svg-icon>
                        </div>
                    </div>
                </div>
                <div class="extend-search-item">
                    <span class="label">采集时间：</span>
                    <div class="model-group">
                        <input class="model" type="text" placeholder="采集时间" readonly v-model="searchObj.createTime" @click="chooseTime('createTime')">
                        <div class="clear-icon" v-show="searchObj.createTime" @click="searchObj.createTime = null">
                            <svg-icon type="i-clear"></svg-icon>
                        </div>
                    </div>
                </div>
                <div class="extend-search-item">
                    <span class="label">故障内容：</span>
                    <div class="model-group">
                        <input class="model" type="text" placeholder="故障内容" v-model="searchObj.faultDesc">
                        <div class="clear-icon" v-show="searchObj.faultDesc" @click="searchObj.faultDesc = null">
                            <svg-icon type="i-clear"></svg-icon>
                        </div>
                    </div>
                </div>
                <div class="extend-search-footer">
                    <button class="extend-btn" @click="handleSearch">搜索</button>
                </div>
            </div>
            <div class="extend-search-mask" @click.self="closeMoreSearch"></div>
        </div>
        <div class="search-bar" v-if="isFleet">
            <div class="search-group">
                <x-input v-model="searchData.plateNo" :show-clear="false" placeholder="请输入车牌号搜索">
                    <div slot="label" class="search-icon">
                        <svg-icon type="header_search"></svg-icon>
                    </div>
                    <div slot="right" class="search-btn" @click="handleSearch">
                        搜索
                    </div>
                </x-input>
            </div>
        </div>
        <section class="section-body">
            <div class="section-body-scroller">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                    @on-pulldown-loading="refresh"
                    :pulldown-config="$store.state.pulldownDefaultConfig"
                    :pullup-config="$store.state.pullupDefaultConfig"
                    ref="scroller" height="100%">
                    <ul class="list-box">
                        <li class="list-box-item" @click="handleDetail(item)" v-for="(item, index) in list" :key="index">
                            <h3 class="list-item-title">
                                {{item.plateNo}}
                                <span class="back-right">
                                    <span>{{item.phyExamTime}}</span>
                                </span>
                            </h3>
                            <div class="list-item-content">
                                <p class="content-p">
                                    <span>故障数量:</span>
                                    <span class="vin-color">{{item.faultCount}}</span>
                                </p>
                            </div>
                            <div class="list-item-content">
                                <p class="content-p">
                                    <span>诊断时间:</span>
                                    <span class="value">{{item.phyExamTime}}</span>
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
    import { isEmpty, formateDate, setStore } from '@/libs/utils';
    import userInfo from '@/mixins/userInfo';
    import { Scroller, XButton, XInput } from 'vux';
    import { searchBar, searchItem } from '@/components';
    import { getFaultsByVin, getFaultsByPlateNo } from '@/services/carCheckup/carCheckup';
    import { mapState, mapMutations } from 'vuex';
    export default {
        mixins: [ list, userInfo ],
        components: { Scroller, XButton, XInput, searchBar, searchItem },
        data () {
            return {
                searchObj: {
                    faultCode: null,
                    createTime: null,
                    faultDesc: null
                },
                searchData: {
                    plateNo: ''
                },
                currentDate: ''
            };
        },
        created () {
            this.SET_MORE_SEARCH(false);
        },
        computed: {
            ...mapState([
               'moreSearch'
            ]),
            // 是否是车队
            isFleet () {
                return this.userInfo.type === 'fleet';
            }
        },
        methods: {
            ...mapMutations([
               'SET_MORE_SEARCH'
            ]),
            async _getList () {
                if (this.userInfo.defaultVin) {
                    await this.getUserInfo();
                }
                this.currentDate = formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
                const fn = this.isFleet ? getFaultsByPlateNo : getFaultsByVin;
                const param = this.isFleet
                                    ? !isEmpty(this.searchData.plateNo) ? this.searchData : (delete this.searchData.plateNo, this.searchData)
                                    : {...this.searchData, vin: this.userInfo.defaultVin};
                const result = await fn(param);
                return result.data;
            },
            // 详情
            handleDetail (item) {
                setStore('fault__detail', JSON.stringify(item));
                this.$router.push('/main/carCheckup/faultQuery/faultDetail');
            },
            // 搜索
            handleSearch () {
                this.list = [];
                this.loadMore();
                this.SET_MORE_SEARCH(false);
            },
            closeMoreSearch () {
                this.searchObj = {
                    faultCode: null,
                    createTime: null,
                    faultDesc: null
                };
                this.SET_MORE_SEARCH(false);
            },
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
            }
        }
    };
</script>
