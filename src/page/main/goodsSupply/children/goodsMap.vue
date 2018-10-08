<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .goods-map-panel {
        @include wh(100%, 100%);
        @include flex(stretch);
        .section-body {
            flex: 1;
            @include flex(stretch);
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
            .section-scroller-body {
                position: relative;
                flex: 1;
                .map-container {
                    position: absolute;
                    @include wh(100%, 100%);
                }
                .info-box {
                    position: absolute;
                    width: 100%;
                    bottom: 0;
                    z-index: 1000;
                    padding: px2rem(10);
                    text-align: center;
                    .trapezoid {
                        position: relative;
                        display: inline-block;
                        text-align: center;
                        //background: #fff;
                        padding: 0 px2rem(15);
                        height: px2rem(50);
                        line-height: px2rem(46);
                        font-size: px2rem(24);
                        color: #505050;
                        border-bottom: px2rem(50) solid #fff;
                        border-left: px2rem(20) solid transparent;
                        border-right: px2rem(20) solid transparent;
                        //box-shadow:1px 0px 18px rgba(196,196,196,0.36);
                        .triangle {
                            transition: transform 0.3s;
                            margin-left: 2px;
                            display: inline-block;
                            vertical-align: middle;
                            font-size: px2rem(24);
                            color: currentColor;
                            transform: rotate(180deg);
                        }
                        &.triangle-rotate {
                            .triangle {
                                transform: rotate(0deg);
                            }
                        }
                    }
                    .info-panel {
                        padding: px2rem(30) px2rem(20);
                        background: #fff;
                        box-shadow: 1px 0px 18px rgba(196, 196, 196, 0.36);
                        .list-content {
                            max-height: px2rem(800);
                            overflow: auto;
                            .list-content-item {
                                padding: px2rem(30) 0;
                                &.first {
                                    padding-top: 0;
                                }
                                &.last {
                                    padding-bottom: 0;
                                }
                                @include flex(strech, row nowrap);
                                border-bottom: 1px solid #EEEEEE;
                                &:last-child {
                                    border-bottom: none;
                                }
                                .item-left {
                                    flex: 0 0 px2rem(50);
                                    .find-goods {
                                        @include wh(px2rem(40), px2rem(40));
                                        border-radius: px2rem(40);
                                        line-height: px2rem(40);
                                        font-size: px2rem(28);
                                        border: 2px solid  $white;
                                        background: #F87E4F;
                                    }
                                }
                                .item-center {
                                    flex: 1;
                                    font-size: px2rem(30);
                                    font-weight: 600;
                                    color: #333333;
                                    line-height: $base_line_height;
                                    text-align: left;
                                    white-space: normal;
                                    word-break: break-all;
                                }
                                .item-right {
                                    flex: 0 0 px2rem(100);
                                    font-size: px2rem(30);
                                    color: #1296DB;
                                }
                            }
                        }
                        .info-sign {
                            position: relative;
                            .bar {
                                position: absolute;
                                width: px2rem(262);
                                height: px2rem(10);
                                border-radius: px2rem(5);
                                background: #787979;
                                left: 50%;
                                transform: translate(-50%, -50%);
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .amap-marker_inner {
        position: relative;
        @include wh(px2rem(300), px2rem(300));
        text-align: center;
        .img-icon {
            display: inline-block;
            width: 100%;
            height: 100%;
            content: url('../../../../assets/images/goods_count@2x.png');
        }
        .content {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: px2rem(28);
            color: $white;
            transform: translate(-50%, -50%);
        }
    }
</style>

<template>
    <div class="goods-map-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header_nav_inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
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
            <div class="section-scroller-body">
                <div class="map-container" ref="mapContainer"></div>
                <div class="info-box" v-show="list.length > 0 && !showPicker">
                    <div class="trapezoid" @click="toggleInfoBox" :class="{'triangle-rotate': !infoShow }">
                        <span class="title">{{infoShow ? '收起' : '展开'}}</span>
                        <span class="triangle">
                        <svg-icon type="triangle"></svg-icon>
                    </span>
                    </div>
                    <div class="info-panel" :class="{'no-show': !infoShow}">
                        <div class="list-content" v-show="infoShow" ref="goodsList">
                            <div class="list-content-item" :class="{first: index === 0, last: index === list.length - 1}" v-for="(item, index) in list" :key="item.id">
                                <div class="item-left">
                                    <div class="find-goods">
                                        <svg-icon type="find_goods"></svg-icon>
                                    </div>
                                </div>
                                <div class="item-center">{{item.detail|formatTitle}}</div>
                                <div class="item-right" @click="handleDetail(item.id)">
                                    详情<svg-icon type="right_arrow"></svg-icon>
                                </div>
                            </div>
                        </div>
                        <div class="info-sign" v-show="!infoShow">
                            <div class="bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <popup-picker title="选择城市" :data="provinceAndCityData" v-model="pickerValue" :columns="2" ref="picker" :showCell="false" :show="showPicker" @on-hide="handlePickerHide"></popup-picker>
    </div>
</template>

<script>
    import initMap from '@/libs/amap.js';
    import { XInput, PopupPicker } from 'vux';
    import { mapCityCount, cargoInfoList } from '@/services/goodsSupply/goodsSupplyService';
    import { getCurrentLocation } from '@/libs/location';
    import * as regionData from '../PCA_Data.json';
    import * as provinceAndCityData from '../PC_Data.json';
    export default {
        name: 'goodsMap',
        components: {XInput, PopupPicker},
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
                map: {},
                regionData: regionData, // 省市区三级数据
                pickerValue: [],
                showPicker: false,
                goodsData: {},
                searchData: {
                    fromAreaCode: ''
                },
                list: [],
                infoShow: false,
                byMoving: false
            };
        },
        computed: {
            provinceAndCityData () {
                if (this.searchIndex === 0) {
                    return provinceAndCityData;
                } else {
                    const arr = [
                        {value: 'null', name: '全部', parent: 0},
                        {value: '', name: '全部', parent: 'null'}
                    ];
                    return arr.concat(provinceAndCityData);
                }
            }
        },
        created () {
            const mapSearch = JSON.parse(window.localStorage.getItem('list/mapSearch'));
            if (mapSearch) {
                this.fromCity.value = mapSearch.fromCity || '';
                this.toCity.value = mapSearch.toCity || '';
                if (this.fromCity.value) {
                    const arr = this.findArea(this.fromCity.value);
                    this.fromCity = Object.assign({}, arr[1]);
                    this.pickerValue = [arr[0].value, arr[1].value];
                }
                if (this.toCity.value) {
                    const arr = this.findArea(this.toCity.value);
                    this.toCity = Object.assign({}, arr[1]);
                }
            }
        },
        mounted () {
            this._initMap();
            // this.getAddress(114.406728, 30.477141);
        },
        methods: {
            // 初始化地图
            async _initMap () {
                try {
                    await initMap.load();
                    this.map = new window.AMap.Map(this.$refs.mapContainer, {
                        resizeEnable: true,
                        touchZoomCenter: 1,
                        zoom: 9
                    });
                    this.map.on('moveend', (mapsEvent) => {
                        if (this.byMoving) {
                            const center = this.map.getCenter();
                            this.getAddress(center.lng, center.lat);
                        } else {
                            this.byMoving = true;
                        }
                    });
                    if (this.fromCity.value || this.toCity.value) {
                        this.handleSearch();
                    } else {
                        this.getCurrentAddress();
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleClick (index, key) {
                this.infoShow = false;
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
            async getCurrentAddress () {
                try {
                    const pos = await getCurrentLocation();
                    this.byMoving = true;
                    this.map.setCenter([pos.longitude, pos.latitude]);
                } catch (e) {
                    this.$toast({
                       message: e.message,
                       position: 'bottom'
                    });
                }
            },
            getAddress (lng, lat) {
                window.AMap.service('AMap.Geocoder', () => {
                    let geocoder = new window.AMap.Geocoder();
                    geocoder.getAddress([lng, lat], (status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            const regeocode = result.regeocode;
                            const arr = this.findArea(regeocode.addressComponent.adcode);
                            this.pickerValue = [arr[0].value, arr[1].value];
                            this.fromCity = Object.assign({}, arr[1]);
                            this.handleSearch([lng, lat]);
                        } else {
                            this.map && this.map.clearMap();
                            this.$toast({
                                message: '获取地址失败',
                                position: 'bottom'
                            });
                        }
                    });
                });
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
            handlePickerHide (closeType) {
                this.showPicker = false;
                if (!closeType) {
                    return;
                }
                if (this.pickerValue.length > 0) {
                    if (!this.pickerValue[1]) {
                        this.toCity.value = '';
                        this.toCity.name = '目的城市';
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
            async handleSearch (lnglat) {
                try {
                    const opt = {
                        fromAreaCode: this.fromCity.value || null,
                        toAreaCode: this.toCity.value || null
                    };
                    this.$indicator.open();
                    const result = await mapCityCount(opt);
                    this.goodsData = result.data || {};
                    this.getList();
                    if (lnglat && lnglat.length > 0) {
                        this.addMarker(lnglat);
                    } else {
                        if (!this.goodsData.lon || !this.goodsData.lan) {
                            return;
                        }
                        this.byMoving = false;
                        this.addMarker([this.goodsData.lon, this.goodsData.lan]);
                    }
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            async getList () {
                try {
                    const opt = {
                        pageNo: 1,
                        pageSize: this.goodsData.count || 10,
                        fromAreaCode: this.fromCity.value || null,
                        toAreaCode: this.toCity.value || null
                    };
                    opt.pageSize = Math.min(opt.pageSize, 200);
                    const result = await cargoInfoList(opt);
                    this.list = result.data.dataList || [];
                    this.$indicator.close();
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                       message: e.message,
                       position: 'bottom'
                    });
                }
            },
            addMarker (lnglat) {
                this.map && this.map.clearMap();
                const marker = new window.AMap.Marker({
                    map: this.map,
                    position: lnglat,
                    offset: new window.AMap.Pixel(-75, -75),
                    content: `<div class="amap-marker_inner"><span class="img-icon"></span>
                            <div class="content"><p>${this.fromCity.name}</p><p>${this.goodsData.count}</p></div>
                        </div>`
                });
                marker.on('click', () => {
                   this.infoShow = true;
                   this.$nextTick(() => {
                      this.$refs.goodsList.scrollTop = 0;
                   });
                });
                if (!this.byMoving) {
                    this.map.setCenter(lnglat);
                }
            },
            toggleInfoBox () {
                this.infoShow = !this.infoShow;
                if (this.infoShow) {
                    this.$nextTick(() => {
                        this.$refs.goodsList.scrollTop = 0;
                    });
                }
            },
            // 查看详情
            handleDetail (id) {
                this.$router.push({
                    path: '/main/goodsSupply/list/map/detail',
                    query: {
                        id: id,
                        from: 'list/map',
                        fromCity: this.fromCity.value,
                        toCity: this.toCity.value
                    }
                });
            }
        },
        beforeDestroy () {
            window.localStorage.removeItem(`list/mapSearch`);
        },
        filters: {
            formatTitle (val) {
                return (val || '').length > 30 ? val.substr(0, 30) + '...' : val;
            }
        }
    };
</script>
