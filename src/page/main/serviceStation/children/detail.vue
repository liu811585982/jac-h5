<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .detail-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            @include wh(100%, 100%);
            overflow: auto;
            flex: 1;
        }
        .section-scroller-panel {
            @include wh(100%, 100%);
            .info-content {
                background: #ffffff;
                padding: px2rem(30) px2rem(20);
                font-size: px2rem(30);
                margin-bottom: px2rem(10);
                &:last-child {
                    margin-bottom: 0;
                }
                .content-title {
                    display: flex;
                    display: -webkit-flex;
                    margin-bottom: px2rem(27);
                }
                .content-item {
                    display: flex;
                    display: -webkit-flex;
                    font-size: px2rem(28);
                    margin-bottom: px2rem(22);
                    &.last-child {
                        margin-bottom: 0;
                    }
                    color: #8995A1;
                    .value {
                        flex: 1;
                        word-wrap: normal;
                        white-space: normal;
                        word-break: break-all;
                    }
                    .append {
                        .desc {
                            color: #F67400;
                        }
                    }
                }
                .map-wrapper {
                    margin-top: px2rem(10);
                    margin-bottom: px2rem(5);
                    height: px2rem(285);
                }
                .img-wrapper {
                    width: px2rem(416);
                    height: px2rem(250);
                    margin: 0 auto;
                }
            }
            .phone-content {
                position: relative;
                background: #ffffff;
                // margin: px2rem(40) px2rem(20);
                height: px2rem(96);
                line-height: px2rem(96);
                font-size: px2rem(32);
                padding: 0 px2rem(20);
                .carInfo-icon {
                    position: absolute;
                    @include wh(px2rem(56), px2rem(56));
                    top: 50%;
                    right: px2rem(20);
                    border-radius: px2rem(56);
                    line-height: px2rem(56);
                    color: #43bd48;
                    font-size: px2rem(28);
                    text-align: center;
                    border: 1px solid currentColor;
                    transform: translateY(-50%);
                }
            }
        }
    }
</style>
<template>
    <div class="detail-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <view-box ref="viewBox" class="section-body">
            <div class="section-scroller-panel">
                <div class="info-content">
                    <div class="content-title">
                        <p class="title">服务站名称：</p>
                        <p class="value">{{stationInfo.serviceName}}</p>
                    </div>
                    <div class="content-item">
                        <span class="title">负责人：</span>
                        <span class="value">{{stationInfo.leaderName}}</span>
                    </div>
                    <div class="content-item">
                        <span class="title">服务品牌：</span>
                        <span class="value">{{stationInfo.brandType|brandType}}</span>
                    </div>
                    <div class="content-item">
                        <span class="title">服务站代码：</span>
                        <span class="value">{{stationInfo.serviceCode}}</span>
                    </div>
                    <div class="content-item last-child">
                        <span class="title">服务站地址：</span>
                        <span class="value">{{stationInfo.serviceAddr}}</span>
                        <span class="append" @click="mapNavigation">
                            <span class="desc">导航</span><svg-icon type="right_arrow"></svg-icon>
                        </span>
                    </div>
                    <div class="map-wrapper" ref="mapContainer">
                    </div>
                </div>
                <div class="info-content">
                    <div class="content-item">
                        <span class="title">店铺图片：</span>
                    </div>
                    <div class="img-wrapper">
                        <img class="previewer-demo-img" width="100%" height="100%" v-if="stationInfo.stationFilePath" v-for="(item, index) in imgList" :key="index" :src="item.src" @click="show(index)">
                        <no-picture v-else></no-picture>
                        <div v-transfer-dom>
                            <previewer :list="imgList" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                        </div>
                    </div>
                </div>
                <div class="phone-content">
                    <h3 class="title">服务电话：{{stationInfo.hotline}}</h3>
                    <div class="carInfo-icon" @click="call">
                        <svg-icon type="phone"></svg-icon>
                    </div>
                </div>
            </div>
        </view-box>
        <actionsheet
            v-model="actionModel"
            :menus="actionMenu"
            theme="android"
            @on-click-menu="handleCall">
        </actionsheet>
        <actionsheet v-model="showActionSheet" :menus="menus" @on-click-menu="clickMenu"></actionsheet>
    </div>
</template>
<script>
    // import AMap from 'AMap';
    // import AMapUI from 'AMapUI';
    import initMap from '@/libs/amap.js';
    import { stationById } from '@/services/serviceStation/serviceStationService';
    import { ViewBox, Group, Cell, CellBox, PopupPicker, Previewer, TransferDom, Actionsheet } from 'vux';
    import { noPicture } from '@/components';
    import { imgHttp } from '@/libs/config';
    import { plusready } from '@/libs/plus';
    import { getCurrentLocation } from '@/libs/location';
    // import { mapGetters } from 'vuex';

    export default {
        directives: {
            TransferDom
        },
        components: { ViewBox, Group, Cell, CellBox, PopupPicker, Previewer, Actionsheet, noPicture },
        data () {
            return {
                map: null,
                actionModel: false,
                actionMenu: {},
                stationInfo: {},
                imgList: [
                    {
                        msrc: '',
                        src: ''
                    }
                ],
                options: {
                    getThumbBoundsFn (index) {
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        let rect = thumbnail.getBoundingClientRect();
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                    }
                },
                showActionSheet: false,
                menus: []
            };
        },
        async mounted () {
            // 获取服务站信息
            await this.getById();
            this._initMap();
        },
        methods: {
            async getById () {
                const param = {orgServiceStationId: this.$route.query.id};
                if (!param.orgServiceStationId) {
                    this.$toast({
                        message: '获取详情失败',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open();
                    let result = await stationById(param);
                    this.stationInfo = result.data;
                    this.imgList[0].msrc = imgHttp + this.stationInfo.stationFilePath;
                    this.imgList[0].src = imgHttp + this.stationInfo.stationFilePath;
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            logIndexChange (arg) {
                console.log(arg);
            },
            show (index) {
                this.$refs.previewer.show(index);
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
                    if (this.stationInfo.longitude && this.stationInfo.latitude) {
                        this.addMarker(this.stationInfo);
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            addMarker (station) {
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
                            position: [station.longitude, station.latitude]
                        }
                    );
                    marker.setMap(_this.map);
                    _this.map.setFitView();
                });
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
                            url = 'androidamap://navi?sourceApplication=jacApp&lat=' + this.stationInfo.latitude + '&lon=' + this.stationInfo.longitude + '&dev=1&style=2';
                        } else {
                            url = 'iosamap://navi?sourceApplication=jacApp&lat=' + this.stationInfo.latitude + '&lon=' + this.stationInfo.longitude + '&dev=1&style=2';
                        }
                        this.openThirdMap(url);
                        break;
                    case 'baidumap':
                        url = 'baidumap://map/navi?location=' + this.stationInfo.latitude + ',' + this.stationInfo.longitude;
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
                const phoneList = this.stationInfo.hotline.split(',');
                if (phoneList.length === 1) {
                    this.handleCall('menu1', phoneList[0]);
                    return;
                }
                phoneList.forEach((item, index) => {
                    this.actionMenu[`menu${index + 1}`] = item;
                });
                this.actionModel = true;
            },
            handleCall (label, val) {
                this.$messagebox.confirm(val, '').then(() => {
                    plusready((plus) => {
                        plus.device.dial(val, true);
                    });
                }).catch(e => {});
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
