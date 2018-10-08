<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .search-bar {
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-flow: row nowrap;
            align-items: center;
            flex-flow: row nowrap;
            background-color: $white;
            overflow: hidden;
            @include border-b-1px(#DDDDDD);
            a.search-btn {
                position: relative;
                flex: 1;
                display: flex;
                display: -webkit-flex;
                -webkit-align-items: center;
                -webkit-justify-content: center;
                -webkit-flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                flex-flow: row nowrap;
                height: px2rem(72);
                line-height: px2rem(72);
                vertical-align: middle;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size: px2rem(28);
                text-align: center;
                color: rgba(51,51,51,0.8);
                .triangle {
                    transition: transform 0.3s;
                    margin-left: px2rem(5);
                    display: inline-block;
                    vertical-align: middle;
                    font-size: px2rem(10);
                    color: currentColor;
                    transform: rotate(180deg);
                }
                &.search-selected {
                    color: #EB8C8D;
                }
                &.search-rotate {
                    .triangle {
                        transform: rotate(0deg);
                    }
                }
            }
        }
        .section-body {
            flex: 1;
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
                        padding: px2rem(20) px2rem(15);
                        margin-bottom: px2rem(15);
                        background: $white;
                        .list-item-content {
                            @include flex(stretch, row nowrap);
                            .list-item-center {
                                flex: 1;
                                @include flex(stetch, row nowrap);
                                padding-bottom: px2rem(30);
                                border-bottom: 1px solid #EEEEEE;
                                .sign-card {
                                    flex: 0 0 px2rem(125);
                                    .mark {
                                        position: relative;
                                        width: px2rem(105);
                                        height: px2rem(105);
                                        line-height: px2rem(105);
                                        text-align: center;
                                        font-size: px2rem(36);
                                        font-weight: 600;
                                        color: #ffffff;
                                        border-radius: px2rem(10);
                                        background-color: #F87E4F;
                                        .find-goods {
                                            position: absolute;
                                            bottom: px2rem(-10);
                                            right: px2rem(-10);
                                            @include wh(px2rem(40), px2rem(40));
                                            border-radius: px2rem(40);
                                            line-height: px2rem(40);
                                            font-size: px2rem(28);
                                            border: 2px solid  $white;
                                            background: #F87E4F;
                                        }
                                    }
                                }
                                .content {
                                    flex: 1;
                                    font-size: px2rem(30);
                                    font-weight: 600;
                                    color: #333333;
                                    line-height: px2rem(56);
                                    white-space: normal;
                                    word-wrap: break-word;
                                }
                            }
                            .list-item-right {
                                flex: 0 0 2rem;
                                position: relative;
                                .phone-icon {
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    @include wh(px2rem(56), px2rem(56));
                                    border-radius: px2rem(56);
                                    line-height: px2rem(56);
                                    color: #43bd48;
                                    font-size: px2rem(28);
                                    text-align: center;
                                    border: 1px solid currentColor;
                                    transform: translate(-50%, -50%);
                                }
                            }
                        }
                        .list-item-bottom {
                            color: #6D7C8B;
                            .content-p {
                                padding: px2rem(20) 0;
                                font-size: px2rem(28);
                                line-height: $base_line_height;
                                white-space: normal;
                                word-break: break-all;
                            }
                            .content-tag {
                                .clock {
                                    font-size: px2rem(28);
                                    color: #FADF75;
                                }
                                font-size: px2rem(26);
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
        <div class="search-bar">
            <a class="search-btn" :class="{ 'search-selected': fromCity.value, 'search-rotate': searchIndex === 0 && this.showPicker }" href="javascript: void(0);" @click="handleClick(0, 'fromCity')">
                {{fromCity.name}}
                <span class="triangle">
                    <svg-icon type="triangle"></svg-icon>
                </span>
            </a>
            <a class="search-btn" :class="{ 'search-selected': toCity.value, 'search-rotate': searchIndex === 1 && this.showPicker }" href="javascript: void(0);" @click="handleClick(1, 'toCity')">
                {{toCity.name}}
                <span class="triangle">
                    <svg-icon type="triangle"></svg-icon>
                </span>
            </a>
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
                                <div slot="content" @click="handleDetail(item.id)" class="list-content">
                                    <div class="list-item-content">
                                        <div class="list-item-center">
                                            <div class="sign-card">
                                                <div class="mark">
                                                    找货
                                                    <div class="find-goods">
                                                        <svg-icon type="find_goods"></svg-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="content">
                                                {{item.detail|formatTitle(30)}}
                                            </div>
                                        </div>
                                        <div class="list-item-right">
                                            <div class="phone-icon" @click="call($event, item)">
                                                <svg-icon type="phone"></svg-icon>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="list-item-bottom">
                                        <div class="content-p">
                                            {{item.detail|formatTitle(50)}}
                                        </div>
                                        <div class="content-tag">
                                            <svg-icon type="clock" class="clock"></svg-icon> {{item.publishTime}}
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
        <popup-picker title="选择城市" :data="provinceAndCityData" v-model="pickerValue" :columns="3" ref="picker" :showCell="false" :show="showPicker" @on-hide="handlePickerHide"></popup-picker>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import initMap from '@/libs/amap.js';
    import userInfo from '@/mixins/userInfo';
    import { Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group, Cell, PopupPicker } from 'vux';
    import { cargoInfoList } from '@/services/goodsSupply/goodsSupplyService';
    import { plusready } from '@/libs/plus';
    import * as regionData from '../PCA_Data.json';
    import * as provinceAndCityData from '../PC_Data.json';
    import { getCurrentLocation } from '@/libs/location';
    const arr = [{value: 'null', name: '全部', parent: 0}, {value: '', name: '全部', parent: 'null'}];
    const provinceAndCity = arr.concat(provinceAndCityData);

    export default {
        mixins: [ list, userInfo ],
        components: { Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XInput, Group, Cell, PopupPicker },
        data () {
            return {
                searchIndex: 0,
                fromCity: {
                    name: '发货城市',
                    value: '',
                    parent: ''
                },
                toCity: {
                    name: '目的城市',
                    value: '',
                    parent: ''
                },
                regionData: regionData, // 省市区三级数据
                provinceAndCityData: provinceAndCity,
                showPicker: false,
                pickerValue: [],
                matchArray: [],
                firstEnter: true
            };
        },
        created () {
            const listSearch = JSON.parse(window.localStorage.getItem('listSearch'));
            if (listSearch) {
                this.firstEnter = false;
                this.fromCity.value = listSearch.fromCity || null;
                this.toCity.value = listSearch.toCity || null;
                if (this.fromCity.value) {
                    let matchArray = [];
                    matchArray = this.findArea(this.fromCity.value);
                    this.fromCity = Object.assign({}, matchArray[1]);
                    this.pickerValue = [matchArray[0].value, matchArray[1].value];
                }
                if (this.toCity.value) {
                    let matchArray = [];
                    matchArray = this.findArea(this.toCity.value);
                    this.toCity = Object.assign({}, matchArray[1]);
                }
            }
        },
        methods: {
            // 获取列表
            async _getList () {
                if (!this.fromCity.value && this.firstEnter) {
                    this.firstEnter = false;
                    const regeocode = await this.getCurrentAddress();
                    let matchArray = [];
                    matchArray = this.findArea(regeocode.addressComponent.adcode);
                    this.fromCity = Object.assign({}, matchArray[1]);
                    this.pickerValue = [matchArray[0].value, matchArray[1].value];
                }
                this.searchData.fromAreaCode = this.fromCity.value || null;
                this.searchData.toAreaCode = this.toCity.value || null;
                const result = await cargoInfoList(this.searchData);
                return result.data;
            },
            findArea (target) {
                const find = this.regionData.find(item => item.value === target);
                if (find === undefined) {
                    return [];
                }
                if (find.parent === 0) {
                    return [find];
                } else {
                    return this.findArea(find.parent).concat([find]);
                }
            },
            async getCurrentAddress () {
                return new Promise(async (resolve, reject) => {
                    try {
                        if (!window.AMap) {
                            await initMap.load();
                        }
                        const pos = await getCurrentLocation();
                        let geocoder = new window.AMap.Geocoder();
                        geocoder.getAddress([pos.longitude, pos.latitude], (status, result) => {
                            if (status === 'complete' && result.info === 'OK') {
                                const regeocode = result.regeocode;
                                resolve(regeocode);
                            } else {
                                reject(new Error('获取地址失败'));
                            }
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            },
            handleClick (index, key) {
                this.searchIndex = index;
                if (this[key].value) {
                    const city = this.regionData.find(item => item.value === this[key].value);
                    const province = this.regionData.find(item => item.value === city.parent);
                    this.pickerValue = [province.value, city.value];
                } else {
                    this.pickerValue = [null, null];
                }
                this.showPicker = true;
            },
            handlePickerHide (closeType) {
                this.showPicker = false;
                if (!closeType) {
                    return;
                }
                if (this.pickerValue.length > 0) {
                    if (!this.pickerValue[1]) {
                        if (this.searchIndex === 0) {
                            this.fromCity.value = '';
                            this.fromCity.name = '发货城市';
                        } else {
                            this.toCity.value = '';
                            this.toCity.name = '目的城市';
                        }
                    } else {
                        const find = this.regionData.find(item => item.value === this.pickerValue[1]);
                        if (this.searchIndex === 0) {
                            this.fromCity = find;
                        } else {
                            this.toCity = find;
                        }
                    }
                    this.handleSearch();
                }
            },
            handleSearch () {
                this.list = [];
                this.loadMore();
            },
            // 查看详情
            handleDetail (id) {
                this.$router.push({
                    path: '/main/goodsSupply/list/detail',
                    query: {
                        id: id,
                        from: 'list',
                        fromCity: this.fromCity.value,
                        toCity: this.toCity.value
                    }
                });
            },
            call (event, item) {
                event.stopPropagation();
                if (!item.contactNumber) {
                    return;
                }
                const number = item.contactNumber.split(',')[0];
                this.$messagebox.confirm(number, '').then(() => {
                    plusready((plus) => {
                        plus.device.dial(String(number), true);
                    });
                }).catch(e => {});
            }
        },
        beforeDestroy () {
            window.localStorage.removeItem(`listSearch`);
        },
        filters: {
            formatTitle (val, size) {
                return (val || '').length > size ? val.substr(0, size) + '...' : val;
            }
        }
    };
</script>
