<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .position-panel {
        flex: 1;
        overflow: hidden;
        @include flex(stretch, column nowrap);
        .search-bar {
            // overflow: hidden;
            position: relative;
            height: px2rem(82);
            background-color: #FFFFFF;
            z-index: 1;
            .result-item {
                padding: px2rem(20);
                @include border-1px(#{$grid_border});
            }
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
        .position-body {
            overflow: hidden;
            position: relative;
            flex: 1;
            .maker {
                position: absolute;
                display: block;
                z-index: 999;
                width: 60px;
                height: 60px;
            }
            .position-map {
                position: absolute;
                @include wh(100%, 100%);
                left: 0;
                top: 0;
            }
            .position-btn {
                position: absolute;
                z-index: 1000;
                bottom: 20px;
                color: $white;
                line-height: $base_line_height;
                font-size: 16px;
                border-radius: 4px;
                transition: all 0.3s ease;
                &.left-btn {
                    @include wh(40px, 40px);
                    background-color: $white;
                    box-shadow: 2px 2px 6px #cccccc;
                    left: px2rem(30);
                    line-height: 40px;
                    text-align: center;
                    font-size: 20px;
                    color: #333333;
                    &:active {
                        box-shadow: inset 2px 2px 6px #cccccc;
                    }
                }
                &.center-btn {
                    display: inline-block;
                    padding: 6px 12px;
                    height: 40px;
                    border-radius: 40px;
                    background-color: $global_color;
                    left: 50%;
                    vertical-align: middle;
                    transform: translateX(-50%);
                    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.125);
                    &:active {
                        box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.125);
                    }
                    .icon {
                        display: inline-block;
                        font-size: 20px;
                    }
                }
                &.right-btn {
                    @include wh(40px, 40px);
                    background-color: $white;
                    box-shadow: 2px 2px 6px #cccccc;
                    right: px2rem(30);
                    line-height: 40px;
                    text-align: center;
                    font-size: 20px;
                    color: #333333;
                    &:active {
                        box-shadow: inset 2px 2px 6px #cccccc;
                    }
                }
                &.in {
                    display: block;
                }
                &.fade {
                    display: none;
                }
                &._effect_up {
                    bottom: 140px;
                    color: #3c8bff;
                }
            }
            .position-section {
                transition: all 0.3s ease;
                position: absolute;
                z-index: 1000;
                left: 10px;
                bottom: 10px;
                right: 10px;
                height: 120px;
                padding: 10px;
                font-size: 16px;
                color: #6b6b6b;
                background-color: $white;
                .position-section-title {
                    font-size: 20px;
                    color: #000000;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
            }
        }
        /deep/ .info-box {
            font-size: 0;
            max-width: 240px;
            .plateNo {
                font-size: $font-size-14;
                color: #dd4a3b;
            }
            .address {
                font-size: $font-size-14;
                color:#3a3a3a
            }
        }
    }
    // 动画
    .slide_Up-enter,
    .slide_Up-leave-to {
        transform: translate3d(0, 100%, 0);
        opacity: 0;
    }
</style>
<template>
    <div class="position-panel">
        <div class="search-bar" v-if="userInfo.type==='fleet'">
            <search-group v-model="currentPlateNo" placeholder="请输入车牌号" :showPanel="showPanel" @change="getResult" @onCancel="handleCancel">
                <div class="search-list">
                    <div class="search-item" v-for="item in plateNoList" :key="item.id" @click="resultClick(item)">
                        <p class="result-item">{{item.plateNo}}</p>
                    </div>
                </div>
            </search-group>
            <!-- <div class="search-group">
                <x-input v-model="currentSearch" :show-clear="false" placeholder="请输入车牌号">
                    <div slot="label" class="search-icon">
                        <svg-icon type="header_search"></svg-icon>
                    </div>
                    <div slot="right" class="search-btn" @click="search">
                        搜索
                    </div>
                </x-input>
            </div> -->
        </div>
        <div class="position-body">
            <div class="position-map" ref="container"></div>
            <!-- 导航，定位，车辆位置 -->
            <transition name="fade">
                <a class="position-btn left-btn" ref="mine" v-show="loading" @click="handlePosition('mine')" href="javascript: void(0);">
                    <svg-icon type="positioning"></svg-icon>
                </a>
            </transition>
            <transition name="fade">
                <a class="position-btn center-btn" ref="nav" v-show="loading" @click="handlePosition('nav')" href="javascript: void(0);">
                    <span class="icon"><svg-icon type="route"></svg-icon></span>
                    导航
                </a>
            </transition>
            <transition name="fade">
                <a class="position-btn right-btn" ref="car" v-show="loading" @click="handlePosition('car')" href="javascript: void(0);">
                    <svg-icon type="van"></svg-icon>
                </a>
            </transition>
            <transition name="slide_Up">
                <div class="position-section" v-show="activeType">
                    <h3 class="position-section-title">{{tipsInfo.title}}</h3>
                    {{tipsInfo.address}}
                </div>
            </transition>
        </div>
        <actionsheet v-model="showActionSheet" :menus="menus" @on-click-menu="clickMenu"></actionsheet>
    </div>
</template>
<script>
// import AMap from 'AMap';
import initMap from '@/libs/amap.js';
import { XInput, Actionsheet, debounce } from 'vux';
import { searchGroup } from '@/components';
import { getRtLocationByVin, getRtLocationByPlateNo, vehicleSelect } from '@/services/carMonitoring/positioning/positioningService';
import { AmapKey } from '@/libs/config';
import userInfo from '@/mixins/userInfo';
import { geoConv } from '@/libs/geoConv';
import { plusready } from '@/libs/plus';
import { getCurrentLocation } from '@/libs/location';

export default {
    mixins: [ userInfo ],
    components: { XInput, searchGroup, Actionsheet },
    data () {
        return {
            loading: false,
            activeType: '',
            tipsInfo: {},
            currentPlateNo: '',
            plateNoList: [],
            showPanel: false,
            showActionSheet: false,
            map: '',
            menus: [],
            realInfo: {},
            lnglatXY: [] // 经纬度
        };
    },
    computed: {
        // 是否是车队
        isFleet () {
            return this.userInfo.type === 'fleet';
        }
    },
    created () {
        this.getResult = debounce(this.handleChange, 500);
    },
    async mounted () {
        if (!this.userInfo.id) {
            await this.getUserInfo();
        }
        this._initMap();
    },
    methods: {
        // 初始化地图
        async _initMap () {
            try {
                await initMap.load();
                this.map = new window.AMap.Map(this.$refs.container, {
                    zoom: 10,
                    resizeEnable: true
                });
                this.loading = true;
                const plateNo = this.$route.query.plateNo;
                if (plateNo) {
                    this.currentPlateNo = plateNo;
                    this.search();
                } else {
                    this._getRtLocationByVin();
                }
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        // 通过vin获取实时定位数据
        _getRtLocationByVin () {
            if (this.isFleet) return;
            let param = {
                vin: this.userInfo.defaultVin
            };
            getRtLocationByVin(param).then((result) => {
                this.realInfo = result.data;
                this._getAddress([result.data.lng, result.data.lat]);
            }).catch((e) => {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            });
        },
        // 获取搜索条件
        async handleChange (val) {
            if (!val) {
                this.plateNoList = [];
                return;
            }
            try {
                if (val === '' || val === null || val === undefined) {
                    this.handleCancel();
                    return;
                }
                let result = await vehicleSelect({plateNo: val});
                this.plateNoList = result.data;
                if (this.plateNoList.length) {
                    this.showPanel = true;
                } else {
                    this.showPanel = false;
                }
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        resultClick (item) {
            this.handleCancel();
            this.currentPlateNo = item.plateNo;
            this.search();
        },
        // 取消搜索
        handleCancel () {
            this.showPanel = false;
            this.plateNoList.length = 0;
            this.currentPlateNo = '';
        },
        // 搜索
        async search () {
            try {
                if (!this.currentPlateNo) return;
                const result = await getRtLocationByPlateNo({ plateNo: this.currentPlateNo });
                this.realInfo = result.data;
                if (result.data && result.data.lng && result.data.lat) {
                    this._getAddress([result.data.lng, result.data.lat]);
                } else {
                    this.$toast({
                       message: '暂无车辆位置信息',
                       position: 'bottom'
                    });
                }
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        // 通过经纬度获取地址
        async _getAddress (lnglatXY = [], isMine = false) {
            try {
                if (lnglatXY.length === 2) {
                    let result = await geoConv({key: AmapKey, coordsys: 'gps', locations: lnglatXY.join(',')});
                    let locations = this.lnglatXY = result.locations.split(',');
                    this.map && this.map.clearMap();
                    let marker = new window.AMap.Marker({
                        map: this.map,
                        icon: new window.AMap.Icon({
                            size: isMine ? [20, 40] : [32, 16],
                            image: isMine
                                                ? require('../../../../assets/images/location@2x.png')
                                                : require('../../../../assets/images/truch.png')
                        }),
                        angle: isMine ? 0 : -90,
                        offset: isMine ? new window.AMap.Pixel(-5, -30) : new window.AMap.Pixel(0, -3),
                        position: [locations[0], locations[1]]
                    });
                    this.map.panTo(marker.getPosition());
                    let geocoder = new window.AMap.Geocoder();
                    geocoder.getAddress(marker.getPosition(), (status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            // 获得了有效的地址信息:
                            marker.on('click', () => {
                                this._infoWindow(result.regeocode.formattedAddress);
                            });
                            this._infoWindow(result.regeocode.formattedAddress);
                        } else if (status === 'no_data') {
                            this.$toast({
                                message: '暂未获取到位置信息',
                                position: 'bottom'
                            });
                        } else {
                            // 获取地址失败
                            this.$toast({
                                message: '获取地址失败',
                                position: 'bottom'
                            });
                        }
                    });
                } else {
                    this.$toast({
                        message: '暂无坐标信息',
                        position: 'bottom'
                    });
                }
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        // 获取当前人的位置
        async _getCurrentPos (type) {
            try {
                if (type === 'mine') {
                    const pos = await getCurrentLocation();
                    if (pos && pos.latitude && pos.longitude) {
                        this._getAddress([pos.longitude, pos.latitude], true);
                    }
                } else {
                    this._getAddress([this.realInfo.lng, this.realInfo.lat], false);
                }
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        },
        // 信息框
        _infoWindow (address) {
            // let content = `<div class="info-box">
            //                 <div class="plateNo">${this.realInfo && this.realInfo.plateNo ? this.realInfo.plateNo : ''}</div>
            //                 <div class="address">${address}</div>
            //             </div>`;
            let content = `<div class="info-box">`;
            if (this.activeType === 'car') {
                content += `<div class="address">车牌号：${this.realInfo.plateNo ? this.realInfo.plateNo : ''}</div>
                            <div class="address">速度：${this.realInfo.speed ? this.realInfo.speed : ''}km/h</div>
                            <div class="address">时间：${this.realInfo.collectTime ? this.realInfo.collectTime : ''}</div>`;
            }
            content += `<div class="address">地址：${address}</div>
                        </div>`;
            if (this.activeType) {
                this.tipsInfo = {
                    title: this.activeType === 'car' ? '车的位置' : '我的位置',
                    address: address
                };
            }
            let infoWindow = new window.AMap.InfoWindow({
                content: content,
                offset: new window.AMap.Pixel(0, -33)
            });
            infoWindow.open(this.map, this.lnglatXY);
        },
        // 车辆定位
        handlePosition (type) {
            if ((!this.realInfo.lng || !this.realInfo.lat) && type !== 'mine') {
                this.$toast({
                    message: this.isFleet && !this.currentPlateNo ? '请输入车牌号' : '未获取到车辆信息',
                    position: 'bottom'
                });
                return;
            }
            switch (type) {
                case 'mine':
                case 'car':
                    this.activeType = type;
                    this._getCurrentPos(type);
                    if (this.$refs[type].classList.contains('_effect_up')) {
                        this.activeType = '';
                        ['mine', 'nav', 'car'].forEach(item => {
                            this.$refs[item].classList.remove('fade');
                        });
                        this.$refs[type].classList.remove('_effect_up');
                    } else {
                        ['mine', 'nav', 'car'].forEach(item => {
                            this.$refs[item].classList.add('fade');
                        });
                        this.$refs[type].classList.remove('fade');
                        this.$refs[type].classList.add('_effect_up');
                    }
                    break;
                case 'nav':
                    this.activeType = '';
                    this.mapNavigation();
                    break;
            }
        },
        mapNavigation () {
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
                        url = 'androidamap://navi?sourceApplication=jacApp&lat=' + this.realInfo.lat + '&lon=' + this.realInfo.lng + '&dev=1&style=2';
                    } else {
                        url = 'iosamap://navi?sourceApplication=jacApp&lat=' + this.realInfo.lat + '&lon=' + this.realInfo.lng + '&dev=1&style=2';
                    }
                    this.openThirdMap(url);
                    break;
                case 'baidumap':
                    url = 'baidumap://map/navi?location=' + this.realInfo.lat + ',' + this.realInfo.lng;
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
                const dst = new plus.maps.Point(this.realInfo.lng, this.realInfo.lat);
                const src = new plus.maps.Point(pos.longitude, pos.latitude);
                plus.maps.openSysMap(dst, '江淮', src);
            } catch (e) {
                this.$toast({
                    message: e.message,
                    position: 'bottom'
                });
            }
        }
    }
};
</script>
