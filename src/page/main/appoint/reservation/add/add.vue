<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .page-panel {
        @include wh(100%, 100%);
        overflow: hidden;
        /deep/ .weui-cell__ft {
            padding-right: 13px;
        }
        .btn {
            width: 80%;
            margin: 1.5rem 0 0 10%;
        }
        .submit-btn {
            width: px2rem(448);
            height: px2rem(60);
            line-height: px2rem(60);
            margin-top: px2rem(83);
            background: $global_color;
            font-size: px2rem(26);
            color: $white;
            border-radius: px2rem(5);
        }
        .popup-service-station {
            @include wh(100%, 100%);
            font-size: px2rem(28);
            background-color: $white;
            .popup-map {
                @include wh(100%, 100%);
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
                            .phone {
                                color: #43bd48;
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
            .name {
                margin-bottom: 6px;
                color: #333;
            }
            .address {
                color: #a5a5a5
            }
            .icon {
                font-size: $font-size-22;
                color: #666;
                margin-right: $font-size-12;
            }
        }
    }
    .mb-25 {
        margin-bottom: 25px;
    }
</style>
<style lang="scss">
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .map-marker {
        width: px2rem(61);
        height: px2rem(69);
        line-height: px2rem(61);
        background: url('../../../../../assets/images/marker.png') no-repeat;
        background-size: 100% 100%;
        font-size: px2rem(26);
        text-align: center;
        color: #F87E4F;
    }
    .map-marker-active {
        width: px2rem(61);
        height: px2rem(69);
        line-height: px2rem(61);
        background: url('../../../../../assets/images/marker-active.png') no-repeat;
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
    <div class="page-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <view-box ref="viewBox">
            <group label-width="5em" label-margin-right="2em">
                <cell title="司机姓名" :value="userInfo.driverName"></cell>
                <!--<popup-picker title="车牌号" placeholder="请选择车牌号" :data="plateList" :columns="1"
                v-model="plateNo" @on-change="handleSelectPlatenoAndVin" show-name></popup-picker>-->
                <cell title="车牌号" :value="appointInfo.plateNo"></cell>
                <cell title="VIN码" :value="appointInfo.vin"></cell>
                <popup-picker title="预约类型" placeholder="请选择预约类型" :data="type"  :columns="1" v-model="serviceTypeValue" show-name @on-change="_getServiceStation"></popup-picker>
                <datetime title="预约时间" placeholder="请选择预约时间" v-model="appointInfo.appointTime" format="YYYY-MM-DD HH:mm"  :minute-list="minuteList"></datetime>
                <cell title="服务站点" :value="appointInfo.appointServiceName || '请选择服务站点'" is-link @click.native="chooseService"></cell>
                <x-textarea title="备注" v-model="appointInfo.note" :show-counter="false" :rows="3"  value-align="right"></x-textarea>
            </group>
            <x-button class="submit-btn" @click.native="handleSave">保存</x-button>
            <!-- 附近服务站 -->
            <div>
                <popup v-model="isShow" :height="serviceStationList.length > 0 ? '70%' : 'auto'">
                    <div class="popup-service-station">
                        <div class="popup-map" ref="popupMap" v-show="serviceStationList.length > 0">
                        </div>
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
                                        <div class="title-right" @click="handleChoose">
                                            确定<svg-icon type="right_arrow"></svg-icon>
                                        </div>
                                    </h3>
                                    <p class="center-item">
                                        <span class="title">地址:</span>
                                        <span class="value">{{currentStation.serviceAddr}}</span>
                                    </p>
                                    <p class="center-item">
                                        <span class="title">联系电话:</span>
                                        <span @click="call(currentStation.hotline)">{{currentStation.hotline}}&nbsp;&nbsp;<svg-icon type="phone" class="phone"></svg-icon></span>
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
                        <!-- <cell is-link v-for="(item, index) in serviceStationList"  :key="index" @click.native="selectServiceStation(item)">
                            <div slot="title">
                                <div class="name">{{item.serviceName}}</div>
                                <div class="address">{{item.serviceAddr}}</div>
                            </div>
                            <span class="icon" slot="icon">
                                <svg-icon type="location2"></svg-icon>
                            </span>
                        </cell> -->
                        <!-- 服务站数据为空 -->
                        <cell v-show="serviceStationList.length === 0" title="未查询到附近服务站点"></cell>
                    </div>
                </popup>
            </div>
        </view-box>
    </div>
</template>
<script>
    // import AMap from 'AMap';
    import initMap from '@/libs/amap.js';
    import userInfo from '@/mixins/userInfo';
    import { plusready } from '@/libs/plus';
    import { infoForAdd, addAppoint, queryService } from '@/services/appointService/appointService';
    import { ViewBox, Group, Cell, XTextarea, PopupPicker, Datetime, XButton, Popup } from 'vux';
    import { formateDate } from '@/libs/utils';
    import { getCurrentLocation } from '@/libs/location';

    export default {
        components: { ViewBox, Group, Cell, XTextarea, PopupPicker, Datetime, XButton, Popup },
        mixins: [ userInfo ],
        data () {
            return {
                geo: null,
                appointInfo: {
                    plateNo: '',
                    vin: ''
                },
                plateList: [],
                type: [
                    {
                        name: '维修',
                        value: 'repair'
                    },
                    {
                        name: '保养',
                        value: 'maintain'
                    },
                    {
                        name: '维保',
                        value: 'all'
                    }
                ],
                plateNo: [],
                serviceStationList: [],
                serviceTypeValue: [],
                serviceStationValue: [],
                location: null,
                map: null,
                markers: [],
                fontSize: 0,
                infoShow: false,
                currentStation: {},
                isShow: false,
                minuteList: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
                    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
                    '51', '52', '53', '54', '55', '56', '57', '58', '59']
            };
        },
        mounted () {
            this._getCarList();
            this._getGeolocation();
            this._initMap();
        },
        methods: {
            // 初始化地图
            async _initMap () {
                try {
                    await initMap.load();
                    this.map = new window.AMap.Map(this.$refs.popupMap, {
                        zoom: 10,
                        resizeEnable: true
                    });
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 查询车辆列表
            async _getCarList (param) {
                try {
                    // this.$indicator.open();
                    if (!this.userInfo.id) {
                        await this.getUserInfo();
                    }
                    let param = {driverId: this.userInfo.id};
                    let result = await infoForAdd(param);
                    if (result.data) {
                        // plate列表
                        /* this.plateList = result.data.jacMotorcadeVehicleDTOList.map((item) => {
                            return {
                                name: item.plateNo,
                                value: `${item.plateNo}|${item.vin}`
                            };
                        }); */
                        const find = result.data.jacMotorcadeVehicleDTOList.find(item => item.vin === this.userInfo.defaultVin);
                        if (find) {
                            this.appointInfo.plateNo = find.plateNo;
                            this.appointInfo.vin = find.vin;
                        }
                    }
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            // 选择服务站
            chooseService () {
                if (!this.serviceTypeValue.length) {
                    this.$toast({
                        message: '请先选择预约类型',
                        position: 'bottom'
                    });
                    return;
                }
                this.isShow = true;
                if (this.serviceStationList.length > 0) {
                    this.map && this.map.clearMap();
                    this.markers = [];
                    this.fontSize = parseFloat(document.documentElement.style.fontSize.replace('px', ''));
                    if (!this.currentStation.id) {
                        this.currentStation = this.serviceStationList[0];
                    }
                    for (let i = 0; i < this.serviceStationList.length; i++) {
                        this.addMarker(this.serviceStationList[i], i + 1);
                    }
                    this.infoShow = true;
                }
                this.$nextTick(() => {
                    this.addLocation();
                });
            },
            addLocation () {
                if (!this.geo) {
                    return;
                }
                this.location = new window.AMap.Marker({
                    map: this.map,
                    icon: new window.AMap.Icon({
                        size: [40, 40],
                        image: require('../../../../../assets/images/circle_location.png'),
                        imageSize: [40, 40]
                    }),
                    offset: new window.AMap.Pixel(-20, -20),
                    position: [this.geo.longitude, this.geo.latitude]
                });
                this.map.panTo(this.location.getPosition());
                this.map.setZoom(10);
            },
            // 添加地图标记
            addMarker (item, index) {
                if (item.id === this.appointInfo.appointServiceId) {
                    this.currentStation = item;
                }
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
            handleChoose () {
                this.appointInfo.appointServiceId = this.currentStation.id;
                this.appointInfo.appointServiceName = this.currentStation.serviceName;
                this.isShow = false;
            },
            toggleInfoBox () {
                this.infoShow = !this.infoShow;
            },
            // 通过手机经纬度获取附近服务站
            async _getServiceStation (val) {
                this.appointInfo.appointType = val[0];
                this.appointInfo.appointServiceId = null;
                this.appointInfo.appointServiceName = null;
                if (this.geo) {
                    try {
                        const type = val[0] === 'repair' ? 'MAINTAINCE' : val[0] === 'maintain' ? 'UPKEEP' : 'ALL';
                        const param = {
                            distance: 10, // 范围大小: 10KM ,
                            longitude: this.geo.longitude,
                            latitude: this.geo.latitude,
                            type: type
                        };
                        let result = await queryService(param);
                        this.serviceStationList = result.data;
                    } catch (e) {
                        this.$toast({
                            message: e.message,
                            position: 'bottom'
                        });
                    }
                } else {
                    this._getGeolocation(() => {
                       this._getServiceStation(val);
                    });
                }
            },
            // 获取手机定位经纬度
            async _getGeolocation (cb) {
                try {
                    const pos = await getCurrentLocation();
                    this.geo = pos;
                } catch (e) {
                    this.$toast({
                        message: '定位服务不可用',
                        position: 'bottom'
                    });
                }
            },
            // 选择vin
            handleSelectPlatenoAndVin (value) {
                let arry = value.toString().split('|');
                this.appointInfo.plateNo = arry[0];
                this.appointInfo.vin = arry[1];
            },
            // 选择服务器站点
            selectServiceStation (item) {
                // 服务器站
                this.appointInfo.appointServiceId = item.id;
                this.appointInfo.appointServiceName = item.serviceName;
                this.isShow = false;
            },
            async handleSave () {
                this.appointInfo.driverId = this.userInfo.id;
                this.appointInfo.driverName = this.userInfo.driverName;
                this.appointInfo.motorcadeId = this.userInfo.fleetId;
                this.appointInfo.motorcadeName = this.userInfo.fleetName;
                this.appointInfo.appointType = this.serviceTypeValue.toString();
                // 日期格式处理
                this.appointInfo.appointTime && (this.appointInfo.appointTime = formateDate(this.appointInfo.appointTime, 'yyyy-MM-dd hh:mm:ss'));
                if (!this.appointInfo.plateNo) {
                    this.$toast({
                        message: '车牌号不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.appointInfo.appointType) {
                    this.$toast({
                        message: '预约类型不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.appointInfo.appointTime) {
                    this.$toast({
                        message: '预约时间不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.appointInfo.appointServiceId) {
                    this.$toast({
                        message: '服务站点不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                const appointTime = new Date(this.appointInfo.appointTime.replace(/-/g, '/')).getTime();
                if (appointTime < new Date().getTime()) {
                    this.$toast({
                        message: '预约时间不能早于当前时间',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open();
                    await addAppoint(this.appointInfo);
                    this.$toast({
                        message: '保存成功',
                        position: 'bottom'
                    });
                    this.$indicator.close();
                    this.$router.back();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            call (hotline) {
                this.$messagebox.confirm(hotline, '').then(() => {
                    plusready((plus) => {
                        plus.device.dial(hotline, true);
                    });
                }).catch(e => {
                });
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
