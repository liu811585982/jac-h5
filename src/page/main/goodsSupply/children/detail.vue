<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            @include flex(stretch, column nowrap);
            @include wh(100%, 100%);
            overflow: auto;
            flex: 1;
        }
        .section-scroller-title {
            padding: px2rem(10) px2rem(10) 0 px2rem(10);
            background-color: #F4F4F4;
            .list-item-content {
                @include flex(stretch, row nowrap);
                padding: px2rem(25) px2rem(15);
                font-size: px2rem(28);
                background: $white;
                .list-item-left {
                    flex: 0 0 px2rem(127);
                    .mark {
                        position: relative;
                        width: px2rem(107);
                        height: px2rem(107);
                        line-height: px2rem(107);
                        text-align: center;
                        font-size: px2rem(36);
                        font-weight: 600;
                        color: #ffffff;
                        font-weight: 600;
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
                .list-item-center {
                    //padding-top: px2rem(10);
                    flex: 1;
                    font-size: px2rem(30);
                    font-weight: 600;
                    color: #333333;
                    line-height: px2rem(56);
                    white-space: normal;
                    word-break: break-all;
                }
            }
        }
        .section-scroller-body /deep/{
            @include flex(strech, column nowrap);
            flex: 1;
            .cell-append {
                padding: px2rem(15);
                .map-container {
                    width: 100%;
                    height: px2rem(240);
                }
                .no-navigation {
                    position: relative;
                    width: 100%;
                    height: px2rem(240);
                    background: #F4F4F4;
                    .not-found {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        font-size: px2rem(100);
                        transform: translate(-50%, -50%);
                        p {
                            font-size: px2rem(28);
                            color: #7F8C9A;
                        }
                    }
                }
            }
            .toolbox {
                width: 100%;
                padding: px2rem(10);
                background: $white;
                .weui-btn {
                    border-radius: 0;
                }
            }
            .navigation {
                font-size: px2rem(28);
                span {
                    color: #F67400;
                }
            }
            .weui-cells__title {
                color: #9E9E9E;
                font-size: px2rem(26);
            }
            .vux-label {
                color: #7F8C9A;
                font-size: px2rem(28);
            }
            .weui-cell__ft {
                color: #212121;
                font-size: px2rem(28);
            }
            .weui-cell-box {
                &.weui-cell {
                    padding-top: 0;
                    padding-bottom: 0;
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" @click="back">
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <div class="section-body">
            <div class="section-scroller-title">
                <div class="list-item-content">
                    <div class="list-item-left">
                        <div class="mark">
                            找货
                            <div class="find-goods">
                                <svg-icon type="find_goods"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div class="list-item-center">
                        {{goodsInfo.detail|formatTitle}}
                    </div>
                </div>
            </div>
            <div class="section-scroller-body">
                <group title="基本信息" label-width="5rem">
                    <cell title="详情" value-align="left" :value="goodsInfo.detail" align-items="flex-start">
                    </cell>
                    <cell title="货主" :value="goodsInfo.cargoOwner" value-align="left"></cell>
                    <cell title="联系人" :value="goodsInfo.contact" value-align="left"></cell>
                    <cell title="联系电话" :value="goodsInfo.contactNumber" value-align="left"></cell>
                    <cell title="货主类型" :value="goodsInfo.cargoOwnerType" value-align="left"></cell>
                    <cell title="车长要求" :value="goodsInfo.vehicleLengthRequire|valueFormat('米')" value-align="left"></cell>
                    <cell title="车型要求" :value="goodsInfo.vehicleModelRequire" value-align="left"></cell>
                    <cell title="发布时间" :value="goodsInfo.publishTime" value-align="left"></cell>
                </group>
                <group title="货物信息" label-width="5rem">
                    <cell title="货物体积" :value="goodsInfo.volume|valueFormat('立方米')" value-align="left"></cell>
                    <cell title="货物重量" :value="goodsInfo.load1|valueFormat('吨')" value-align="left"></cell>
                    <cell title="货物类型" :value="goodsInfo.cargoType" value-align="left"></cell>
                    <cell title="长度" :value="goodsInfo.length|valueFormat('米')" value-align="left"></cell>
                    <cell title="失效时间" :value="goodsInfo.expireTime" value-align="left"></cell>
                </group>
                <group title="线路信息" label-width="5rem">
                    <cell title="起点城市" :value="fromCity" value-align="left"></cell>
                    <!--<cell title="装货地全称" :value="goodsInfo.fromAddress" value-align="left" align-items="flex-start">
                        <div slot="child" class="navigation" @click="mapNavigation">
                            <span>导航</span><svg-icon type="right_arrow"></svg-icon>
                        </div>
                    </cell>-->
                    <!--<div class="cell-append">
                        <div class="map-container" ref="mapContainer" v-if="goodsInfo.longtitude"></div>
                        <div class="no-navigation" v-else>
                            <no-picture type="location"></no-picture>
                        </div>
                    </div>-->
                    <cell title="终点城市" :value="toCity" value-align="left"></cell>
                    <!--<cell title="目的地全称" :value="goodsInfo.toAddress" value-align="left"></cell>
                    <cell title="里程" :value="goodsInfo.distance|valueFormat('公里')" value-align="left"></cell>-->
                </group>
                <div class="toolbox">
                    <x-button type="warn" @click.native="call">联系货主</x-button>
                </div>
            </div>
        </div>
        <actionsheet v-model="showActionSheet" :menus="menus" @on-click-menu="clickMenu"></actionsheet>
    </div>
</template>
<script>
    // import AMap from 'AMap';
    // import AMapUI from 'AMapUI';
    import initMap from '@/libs/amap.js';
    import { Cell, CellBox, Group, XButton, Scroller, Actionsheet } from 'vux';
    import { cargoInfo } from '@/services/goodsSupply/goodsSupplyService';
    import { plusready } from '@/libs/plus';
    import { getCurrentLocation } from '@/libs/location';
    import { noPicture } from '@/components';
    import * as regionData from '../PCA_Data.json';

    export default {
        name: 'goodsDetail',
        components: { Cell, CellBox, Group, XButton, Scroller, Actionsheet, noPicture },
        data () {
            return {
                goodsInfo: {},
                showActionSheet: false,
                menus: [],
                map: null,
                regionData: regionData
            };
        },
        computed: {
            fromCity () {
                return this.recursiveMatching(this.goodsInfo.fromAreaCode);
            },
            toCity () {
                return this.recursiveMatching(this.goodsInfo.toAreaCode);
            }
        },
        async mounted () {
            await this.getGoodsInfo();
        },
        methods: {
            async getGoodsInfo () {
                try {
                    this.$indicator.open();
                    const result = await cargoInfo({id: this.$route.query.id});
                    this.$indicator.close();
                    this.goodsInfo = result.data || {};
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            back () {
                const query = this.$route.query;
                window.localStorage.setItem(`${query.from}Search`, JSON.stringify({
                    fromCity: query.fromCity,
                    toCity: query.toCity
                }));
                this.$router.back();
            },
            // 初始化地图
            async _initMap () {
                try {
                    await initMap.load();
                    this.map = new window.AMap.Map(this.$refs.mapContainer, {
                        zoom: 10,
                        resizeEnable: false,
                        dragEnable: false,
                        doubleClickZoom: false,
                        touchZoom: false
                    });
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            addMarker (goods) {
                const _this = this;
                window.AMapUI.loadUI(['overlay/SvgMarker'], function (SvgMarker) {
                    const marker = new SvgMarker(
                        new SvgMarker.Shape.IconFont({
                            symbolJs: './static/font/iconfont.js',
                            icon: 'icon-dingwei',
                            size: 26,
                            offset: [-12, -24],
                            fillColor: '#1296DB'
                        }), {
                            position: [goods.longitude, goods.latitude]
                        }
                    );
                    marker.setMap(_this.map);
                    _this.map.setFitView();
                });
            },
            mapNavigation () {
                if (!this.goodsInfo.longitude || !this.goodsInfo.latitude) {
                    return;
                }
                const osName = plus.os.name;
                if (osName === 'Android') {
                    this.menus = [
                        {type: 'amap', label: '高德地图'},
                        {type: 'baidumap', label: '百度地图'}
                    ];
                } else {
                    this.menus = [
                        {type: 'default', label: '苹果自带地图'},
                        {type: 'amap', label: '高德地图'},
                        {type: 'baidumap', label: '百度地图'}
                    ];
                }
                this.showActionSheet = true;
            },
            clickMenu (menuKey, menuItem) {
                const osName = plus.os.name;
                let url = '';
                switch (menuItem.type) {
                    case 'default':
                        this.openSystemMap();
                        break;
                    case 'amap':
                        if (osName === 'Android') {
                            url = 'androidamap://navi?sourceApplication=jacApp&lat=' + this.goodsInfo.latitude + '&lon=' + this.goodsInfo.longitude + '&dev=1&style=2';
                        } else {
                            url = 'iosamap://navi?sourceApplication=jacApp&lat=' + this.goodsInfo.latitude + '&lon=' + this.goodsInfo.longitude + '&dev=1&style=2';
                        }
                        this.openThirdMap(url);
                        break;
                    case 'baidumap':
                        url = 'baidumap://map/navi?location=' + this.goodsInfo.latitude + ',' + this.goodsInfo.longitude;
                        this.openThirdMap(url);
                        break;
                }
            },
            // 跳到第三方地图
            openThirdMap (url) {
                plusready((plus) => {
                    plus.runtime.openURL(url, () => {
                        this.$toast({
                            message: '未找到该软件',
                            position: 'bottom'
                        });
                    });
                });
            },
            // 跳到地图进行导航
            async openSystemMap () {
                try {
                    const pos = await getCurrentLocation();
                    const dst = new plus.maps.Point(this.stationInfo.longitude, this.stationInfo.latitude);
                    const src = new plus.maps.Point(pos.longitude, pos.latitude);
                    plus.maps.openSysMap(dst, this.stationInfo.serviceName, src);
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            call () {
                this.$messagebox.confirm(this.goodsInfo.contactNumber, '').then(() => {
                    plusready((plus) => {
                        plus.device.dial(String(this.goodsInfo.contactNumber), true);
                    });
                }).catch(e => {});
            },
            recursiveMatching (target) {
                const find = this.regionData.find(item => item.value === target);
                if (find === undefined) {
                    return '';
                }
                if (find.parent === 0) {
                    return find.name;
                } else {
                    return this.recursiveMatching(find.parent) + find.name;
                }
            }
        },
        filters: {
            valueFormat (val, unit) {
                let result = '';
                if (isNaN(Number(val))) {
                    result = val;
                } else {
                    result = val + unit;
                }
                return result;
            },
            formatTitle (val) {
                return (val || '').length > 30 ? val.substr(0, 30) + '...' : val;
            }
        }
    };
</script>
