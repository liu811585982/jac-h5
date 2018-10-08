<style lang='scss' scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .position-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            @include flex(stretch, column nowrap);
            flex: 1;
            .search-list {
                width: 100%;
                max-height: 100%;
                overflow: auto;
                .search-item {
                    padding: px2rem(30) px2rem(15);
                    border-bottom: 1px solid #EEEEEE;
                    .search-item-title {
                        font-size: px2rem(28);
                        color: #333333;
                        margin-bottom: px2rem(20);
                        p {
                            line-height: px2rem(36);
                        }
                    }
                    .search-item-content {
                        @include flex(center, row nowrap);
                        font-size: px2rem(26);
                        color: #6D7C8B;
                        margin-bottom: px2rem(20);
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .left {
                            flex: 1;
                            p {
                                line-height: px2rem(36);
                            }
                            .mark {
                                padding: 0 px2rem(10);
                                font-size: px2rem(22);
                                border: 1px solid #13D9C9;
                                border-radius: px2rem(15);
                                color: #13D9C9;
                            }
                        }
                    }
                }
            }
            .map-container {
                flex: 1;
            }
            .info-box {
                position: fixed;
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
                    padding: px2rem(30);
                    background: #fff;
                    box-shadow: 1px 0px 18px rgba(196, 196, 196, 0.36);
                    .info-content {
                        text-align: left;
                        line-height: px2rem(46);
                        color: #6D7C8B;
                        .info-title {
                            color: #333333;
                            font-size: px2rem(30);
                        }
                        .info-item {
                            font-size: px2rem(28);
                            .value {
                                color: #333333;
                            }
                        }
                    }
                    .list-item-center {
                        position: relative;
                        flex: 1;
                        -webkit-flex: 1;
                        padding: px2rem(5) 0;
                        overflow: hidden;
                        text-align: left;
                        .center-title {
                            position: relative;
                            font-size: px2rem(30);
                            font-weight: 500;
                            margin-bottom: px2rem(25);
                            padding-right: px2rem(100);
                            .title-left {
                                @include flex(center, row nowrap);
                                width: 100%;
                                .value {
                                    display: inline-block;
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
                                transform: translateY(-50%);
                            }
                        }
                        .center-item {
                            @include ellipsis;
                            font-size: px2rem(28);
                            vertical-align: middle;
                            margin-bottom: px2rem(20);
                            &.last-child {
                                margin-bottom: 0;
                            }
                            .title {
                                color: #6D7C8B;
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
</style>
<style lang="scss">
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .map-marker {
        width: px2rem(61);
        height: px2rem(69);
        line-height: px2rem(61);
        background: url('../../../../assets/images/marker.png') no-repeat;
        background-size: 100% 100%;
        font-size: px2rem(26);
        text-align: center;
        color: #F87E4F;
    }
    .map-marker-active {
        width: px2rem(61);
        height: px2rem(69);
        line-height: px2rem(61);
        background: url('../../../../assets/images/marker-active.png') no-repeat;
        background-size: 100% 100%;
        font-size: px2rem(26);
        text-align: center;
        color: #13D9C9;
    }
    .hide {
        display: none;
    }
</style>
<template>
    <div class="position-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <search-group v-model="searchData.orgServiceStationName" :showPanel="showPanel" @change="getResult" @onCancel="handleCancel">
                <div class="search-list">
                    <div class="search-item" v-for="item in list" :key="item.id" @click="resultClick(item)">
                        <div class="search-item-title">
                            <p>{{item.serviceName}}</p>
                        </div>
                        <div class="search-item-content">
                            <div class="left">
                                <p>{{item.serviceAddr}}</p>
                            </div>
                            <div class="right"><svg-icon type="coords"></svg-icon></div>
                        </div>
                        <div class="search-item-content">
                            <div class="left">
                                <span class="mark">维修</span> <span class="mark">保养</span>
                            </div>
                        </div>
                    </div>
                </div>
            </search-group>
            <div class='map-container' ref='mapContainer'></div>
            <div class="info-box" v-show="currentStation.id">
                <div class="trapezoid" @click="toggleInfoBox" :class="{'triangle-rotate': !infoShow }">
                    <span class="title">{{infoShow ? '收起' : '展开'}}</span>
                    <span class="triangle">
                        <svg-icon type="triangle"></svg-icon>
                    </span>
                </div>
                <div class="info-panel">
                    <div class="list-item-center" v-show="infoShow">
                        <h3 class="center-title">
                            <div class="title-left">
                                <div class="value">{{currentStation.serviceName}}</div>
                                <div class="card">
                                    <svg-icon type="mine"></svg-icon>{{currentStation.leaderName}}
                                </div>
                            </div>
                            <div class="title-right" @click="handleDetail">
                                详情<svg-icon type="right_arrow"></svg-icon>
                            </div>
                        </h3>
                        <p class="center-item">
                            <span class="title">地址:</span>
                            <span class="value">{{currentStation.serviceAddr}}</span>
                        </p>
                        <p class="center-item">
                            <span class="title">联系电话:</span>
                            <span>{{currentStation.hotline}}</span>
                        </p>
                        <p class="center-item last-child">
                            <span class="title">服务品牌:</span>
                            <span class="value">{{currentStation.brandType|brandType}}</span>
                        </p>
                    </div>
                    <div class="info-sign" v-show="!infoShow">
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import AMap from 'AMap';
    import initMap from '@/libs/amap.js';
    import { ViewBox, Group, Cell, CellBox, PopupPicker, Search, debounce } from 'vux';
    import { stationList, stationNearbyList } from '@/services/serviceStation/serviceStationService';
    import { searchGroup } from '@/components';
    import { getCurrentLocation } from '@/libs/location';

    export default {
        components: { ViewBox, Group, Cell, CellBox, PopupPicker, Search, searchGroup },
        data () {
            return {
                searchData: {
                    orgServiceStationName: ''
                },
                list: [],
                nearbyList: [],
                results: [],
                map: {},
                markers: [],
                fontSize: 0,
                infoShow: false,
                currentStation: {},
                showPanel: false
            };
        },
        created () {
            this.getResult = debounce(this.handleChange, 500);
        },
        async mounted () {
            await this._initMap();
            this._getGeolocation();
        },
        methods: {
            handleChange (val) {
                this.currentStation = {};
                this._getList(val);
            },
            async _getList (val) {
                if (!val) {
                    this.list = [];
                    return;
                }
                try {
                    const result = await stationList(this.searchData);
                    this.list = result.data || [];
                    this.showPanel = true;
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 获取手机定位经纬度
            async _getGeolocation () {
                try {
                    const pos = await getCurrentLocation();
                    this._getNearbyList(pos);
                } catch (e) {
                    this.$toast({
                        message: '定位服务不可用',
                        position: 'bottom'
                    });
                }
            },
            // 通过手机经纬度获取附近服务站
            async _getNearbyList (res) {
                try {
                    const param = {
                        distance: 10, // 范围大小: 默认10KM ,
                        longitude: res.longitude,
                        latitude: res.latitude
                    };
                    const result = await stationNearbyList(param);
                    this.nearbyList = result.data || [];
                    this.fontSize = parseFloat(document.documentElement.style.fontSize.replace('px', ''));
                    this.markers = [];
                    if (this.nearbyList.length > 0) {
                        this.infoShow = true;
                        this.currentStation = this.nearbyList[0];
                    }
                    for (let i = 0; i < this.nearbyList.length; i++) {
                        this.addMarker(this.nearbyList[i], i + 1);
                    }
                    this.addLocation(res);
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleDetail () {
                this.$router.push({path: '/main/serviceStation/detail', query: { id: this.currentStation.id }});
            },
            // 初始化地图
            async _initMap () {
                try {
                    await initMap.load();
                    this.map = new window.AMap.Map(this.$refs.mapContainer, {
                        resizeEnable: true,
                        touchZoomCenter: 1
                    });
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            resultClick (item) {
                this.searchData.orgServiceStationName = item.serviceName;
                this.removeMarker();
                this.markers = [];
                this.fontSize = parseFloat(document.documentElement.style.fontSize.replace('px', ''));
                this.currentStation = item;
                this.addMarker(item, 1);
                this.infoShow = true;
                this.map.panTo([item.longitude, item.latitude]);
                this.showPanel = false;
            },
            handleCancel () {
                this.searchData.orgServiceStationName = '';
                this.showPanel = false;
                this.list = [];
            },
            addLocation (geo) {
                const location = new window.AMap.Marker({
                    map: this.map,
                    icon: new window.AMap.Icon({
                        size: [30, 30],
                        image: require('../../../../assets/images/circle_location.png')
                    }),
                    offset: new window.AMap.Pixel(-15, -15),
                    position: [geo.longitude, geo.latitude]
                });
                this.map.setZoom(10);
                this.map.panTo(location.getPosition());
            },
            addMarker (item, index) {
                const marker = new window.AMap.Marker({
                    position: [item.longitude, item.latitude],
                    map: this.map,
                    content: item.id === this.currentStation.id
                        ? `<div class="map-marker-active">${index}</div>` : `<div class="map-marker">${index}</div>`,
                    offset: new window.AMap.Pixel(-0.64 * this.fontSize, -1.472 * this.fontSize)
                });
                marker.station = item;
                marker.index = index;
                this.markers.push(marker);
                marker.on('click', this.markerClick);
            },
            removeMarker () {
                this.markers.forEach((marker) => {
                    this.map.remove(marker);
                });
            },
            markerClick (e) {
                e.target.setContent(`<div class="map-marker-active">${e.target.index}</div>`);
                this.map.panTo(e.target.getPosition());
                this.currentStation = e.target.station;
                this.infoShow = true;
                this.markers.forEach(item => {
                    if (item !== e.target) {
                        item.setContent(`<div class="map-marker">${item.index}</div>`);
                    }
                });
            },
            toggleInfoBox () {
                this.infoShow = !this.infoShow;
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
            }
        }
    };
</script>
