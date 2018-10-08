/**
 * 作者：yeshengqiang
 * 时间：2018-04-18
 * 描述：历史轨迹
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .history-panel {
        flex: 1;
        overflow: hidden;
        position: relative;
        z-index: 1;
        @include flex(stretch, column nowrap);
        .map {
            flex: 1;
        }
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
        .color-panel {
            padding: 10px;
            background-color: $white;
            position: absolute;
            bottom: 100%;
            left: px2rem(15);
            margin-bottom: px2rem(10);
            border-radius: 5px;
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.125);
            .color-panel-item {
                font-size: px2rem(24);
                color: #666666;
                vertical-align: middle;
                .color-part {
                    @include wh(1em, 1em);
                    display: inline-block;
                    border-radius: 4px;
                    vertical-align: text-top;
                    margin-right: 5px;

                    &.part1 {
                        background-color: #86D9EE;
                    }
                    &.part2 {
                        background-color: #828CC1;
                    }
                    &.part3 {
                        background-color: #575EBC;
                    }
                    &.part4 {
                        background-color: #C86373;
                    }
                    &.part5 {
                        background-color: #C24651;
                    }
                }
            }
        }
        .expend-panel {
            @include wh(100%, auto);
            background-color: transparent;
            position: absolute;
            z-index: 1000;
            bottom: 0;
            .taggle-panel {
                position: absolute;
                right: px2rem(15);
                color: #666666;
                border-radius: 5px;
                @include wh(#{px2rem(80)}, #{px2rem(80)});
                line-height: px2rem(80);
                bottom: 100%;
                margin-bottom: px2rem(10);
                text-align: center;
                background-color: $white;
                box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.125);
                cursor: pointer;
                &:active {
                    box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, 0.125);
                }
            }
            .toolBar-box {
                background-color: $white;
                margin: px2rem(10);
                padding: px2rem(15);
                box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.125);
                .toolBar-panel-tips {
                    text-align: center;
                    font-size: px2rem(26);
                    color: #A0A0A0;
                    padding-bottom: px2rem(20);
                    margin: px2rem(20) 0;
                    @include border-1px(rgba(238,238,238,1));
                }
                .toolBar-panel {
                    display: flex;
                    display: -webkit-flex;
                    -webkit-align-items: center;
                    -webkit-flex-flow: row nowrap;
                    align-items: center;
                    flex-flow: row nowrap;
                    margin-bottom: px2rem(15);
                    .start-time,
                    .end-time {
                        position: relative;
                        font-size: px2rem(28);
                        flex: 1;
                        -webkit-flex: 1;
                        color: #A0A0A0;
                        text-align: center;
                        padding: px2rem(10);
                        span {
                            display: inline-block;
                            position: relative;
                            z-index: 1;
                            &::before {
                                content: '';
                                position: absolute;
                                top: 50%;
                                left: px2rem(-20);
                                width: px2rem(10);
                                height: px2rem(10);
                                background-color: #67B2B6;
                                border-radius: 100%;
                                transform: translate3d(0, -50%, 0);
                            }
                            &.start::before {
                                background-color: #67B2B6;
                            }
                            &.end::before {
                                background-color: #DE4041;
                            }
                        }
                    }
                    .end-time {
                        padding-left: 20px;
                    }
                    .start-time::after {
                        content: '';
                        position: absolute;
                        display: block;
                        width: 1px;
                        height: 16px;
                        z-index: 2;
                        left: 100%;
                        top: 50%;
                        transform: translate3d(0, -50%, 0);
                        background-color: #DCDCDC;
                    }
                }
                .toolBar-footer {
                    margin-bottom: 10px;
                    text-align: center;
                }
            }
            .time-stamp-box {
                background-color: $white;
                margin: px2rem(10);
                padding: px2rem(15);
                box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.125);
                .gears {
                    width: 100%;
                    text-align: center;
                    padding-bottom: 15px;
                    @include border-1px(rgba(238,238,238,1));
                }
                .time-progress-box {
                    padding: px2rem(40) 0;
                    @include flex(center, row nowrap);
                    .btn-pause,
                    .btn-stop {
                        padding: px2rem(15);
                        font-size: 35px;
                        color: #666666;
                    }
                    .btn-pause {
                        margin-right: px2rem(25);
                    }
                    .btn-stop {
                        margin-left: px2rem(25);
                    }
                    .progress-box {
                        padding-top: 25px;
                        position: relative;
                        flex: 1;
                        @include flex(stretch, row nowrap);
                        .start-icon,
                        .end-icon {
                            position: absolute;
                            top: -8px;
                            @include wh(20px, 25px);
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: 100%;
                        }
                        .start-icon {
                            left: 0;
                            transform: translate(-50%, 0);
                            margin-right: 15px;
                            background-image: url('../../../../assets/images/start_location@2x.png');
                        }
                        .end-icon {
                            right: 0;
                            transform: translate(50%, 0);
                            margin-left: 15px;
                            background-image: url('../../../../assets/images/end_location@2x.png');
                        }
                    }
                }
            }
        }
    }
    // 动画
    .slideFadeDown-enter-active,
    .slideFadeDown-leave-active {
        transition: all 0.5s ease;
    }
    .slideFadeDown-enter,
    .slideFadeDown-leave-to {
        transform: translate3d(0, 100%, 0);
    }

    .slideFadeRight-enter-active,
    .slideFadeRight-leave-active {
        transition: all 0.5s ease;
    }
    .slideFadeRight-enter,
    .slideFadeRight-leave-to {
        transform: translate3d(-100%, 0, 0);
        opacity: 0;
    }

    .gears-item {
        border: 1px solid #ececec;
        padding: 5px 15px;
        font-size: 14px;
    }
    .gears-item-selected {
        border: 1px solid #DE4041;
    }
</style>
<template>
    <div class="history-panel">
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
        <div class="map" ref="map"></div>
        <!-- 拓展面板 -->
        <div class="expend-panel">
            <!-- 速度面板 -->
            <transition name="slideFadeRight">
                <div class="color-panel" v-show="colorPanel">
                    <p class="color-panel-item">
                        <span class="color-part part1"></span>0~30km/h</p>
                    <p class="color-panel-item">
                        <span class="color-part part2"></span>31~60km/h</p>
                    <p class="color-panel-item">
                        <span class="color-part part3"></span>61~80km/h</p>
                    <p class="color-panel-item">
                        <span class="color-part part4"></span>81~100km/h</p>
                    <p class="color-panel-item">
                        <span class="color-part part5"></span>>100km/h</p>
                </div>
            </transition>
            <transition name="fade">
                <a href="javascript: void(0);" @click="taggleBtn" v-show="mapInfo.points && mapInfo.points.length" class="taggle-panel">
                    <svg-icon type="switchover"></svg-icon>
                </a>
            </transition>
            <transition name="slideFadeDown" mode="out-in" @before-leave="beforeLeave" @after-enter="afterEnter">
                <div class="toolBar-box" key="toolBar" v-if="showSearch">
                    <div class="toolBar-panel-tips">时间范围限定为5天</div>
                    <div class="toolBar-panel">
                        <div class="start-time" @click="handleSelect('startTime')">
                            <span class="start">{{startText}}</span>
                        </div>
                        <div class="end-time" @click="handleSelect('endTime')">
                            <span class="end">{{endText}}</span>
                        </div>
                    </div>
                    <div class="toolBar-footer">
                        <x-button type="warn" mini @click.native="_getSearch">查询</x-button>
                    </div>
                </div>
                <div class="time-stamp-box" key="time-stamp" v-else>
                    <div class="gears">
                        <checker v-model="gearsModel" @on-change="gearsModelChange" default-item-class="gears-item" selected-item-class="gears-item-selected">
                            <checker-item :value="75">1X</checker-item>
                            <checker-item :value="60">2X</checker-item>
                            <checker-item :value="45">3X</checker-item>
                            <checker-item :value="30">4X</checker-item>
                            <checker-item :value="10">5X</checker-item>
                        </checker>
                    </div>
                    <div class="time-progress-box">
                        <!-- 暂停/恢复 -->
                        <div class="btn-pause" @click="pause">
                            <svg-icon :type="isPlay ? 'pause' : 'play'"></svg-icon>
                        </div>
                        <div class="progress-box">
                            <div class="start-icon"></div>
                            <vue-progress ref="vueProgress" @on-change="progressChange" :duration="this.gearsModel * 1000"></vue-progress>
                            <div class="end-icon"></div>
                        </div>
                        <!-- 停止 -->
                        <div class="btn-stop" @click="stop">
                            <svg-icon type="stop"></svg-icon>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    // import AMap from 'AMap';
    import initMap from '@/libs/amap.js';
    import { XButton, XInput, debounce, Checker, CheckerItem } from 'vux';
    import { searchGroup, vueProgress } from '@/components';
    import { formateDate, dateToTimeStamp } from '@/libs/utils';
    import userInfo from '@/mixins/userInfo';
    import { vehicleSelect } from '@/services/carMonitoring/positioning/positioningService';
    import { getHistoricalRouteByVin, getHistoricalRouteByPlateNo } from '@/services/carMonitoring/carMonitoring';

    export default {
        mixins: [ userInfo ],
        components: { XButton, XInput, searchGroup, vueProgress, Checker, CheckerItem },
        data () {
            return {
                gearsModel: 75,
                currentPlateNo: '',
                showPanel: false,
                plateNoList: [],
                mapInfo: {},
                startTime: '',
                endTime: '',
                speed: 0,               // 运动的速度
                colorPanel: false,      // 展示colorPanel
                showSearch: true,       // 展示搜索面板
                progressStatus: 'stop'  // 默认为禁止
            };
        },
        computed: {
            startText () {
                return this.startTime || '开始时间';
            },
            endText () {
                return this.endTime || '结束时间';
            },
            isPlay () {
                return this.progressStatus === 'start' || this.progressStatus === 'resume';
            }
        },
        created () {
            this.getResult = debounce(this.handleChange, 500);
        },
        async mounted () {
            this._initMap();
            if (!this.userInfo.type) {
                await this.getUserInfo();
            }
            if (this.userInfo.type === 'driver') {
                const date = new Date();
                this.endTime = formateDate(date, 'yyyy-MM-dd hh:mm');
                date.setDate(date.getDate() - 2);
                this.startTime = formateDate(date, 'yyyy-MM-dd hh:mm');
                this._getSearch();
            }
        },
        methods: {
            async _initMap () {
                try {
                    await initMap.load();
                    this.map = new window.AMap.Map(this.$refs.map, {
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
            // 切换面板
            taggleBtn () {
                if (this.isPlay) {
                    this.$toast({
                        message: '轨迹正在播放不可切换',
                        position: 'bottom'
                    });
                    return;
                }
                if (this.progressStatus !== 'stop') {
                    this.stop();
                }
                this.showSearch = !this.showSearch;
            },
            // 动画离开之前
            beforeLeave () {
                if (this.showSearch) {
                    this.colorPanel = false;
                }
            },
            // 动画end
            afterEnter () {
                if (!this.showSearch) {
                    this.colorPanel = true;
                }
            },
            // 选择开始时间
            handleSelect (str) {
                const now = formateDate(new Date(), 'yyyy-MM-dd HH:mm');
                let scope = this;
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM-DD HH:mm',
                    value: scope[str] || now,
                    onConfirm (val) {
                        scope[str] = val;
                    }
                });
            },
            gearsModelChange (val) {
                this.marker.stopMove();
                this.speed = this.polylineLen / val * 3.6;
            },
            // 进度条状态
            progressChange (val) {
                this.progressStatus = val;
            },
            // 暂停
            pause () {
                if (this.progressStatus === 'stop') {
                    this.initPolyline(this.mapInfo.path);
                    this.$refs.vueProgress.start();
                    this.marker.moveAlong(this.mapInfo.path, this.speed);
                } else if (this.progressStatus === 'start' || this.progressStatus === 'pause' || this.progressStatus === 'resume') {
                    if (this.progressStatus === 'pause') {
                        this.marker.resumeMove();
                    } else {
                        this.marker.pauseMove();
                    }
                    this.$refs.vueProgress.pause();
                }
            },
            // 停止
            stop () {
                this.$refs.vueProgress && this.$refs.vueProgress.stop();
                this.marker && this.marker.stopMove();
            },
            // 校验时间
            checkTime () {
                if (!this.startTime || !this.endTime) {
                    this.$toast({
                        message: '请选择时间',
                        position: 'bottom'
                    });
                    return false;
                }
                if (dateToTimeStamp(this.startTime) >= dateToTimeStamp(this.endTime)) {
                    this.$toast({
                        message: '结束日期需大于开始日期',
                        position: 'bottom'
                    });
                    return false;
                }
                const dayMillis = 5 * 24 * 3600 * 1000;
                if (dateToTimeStamp(this.endTime) - dateToTimeStamp(this.startTime) > dayMillis) {
                    this.$toast({
                        message: '时间范围限制为5天',
                        position: 'bottom'
                    });
                    return false;
                }
                return true;
            },
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
                    if (!this.currentPlateNo) {
                        this.$toast({
                            message: '请输入车牌号',
                            position: 'bottom'
                        });
                        return;
                    }
                    if (!this.checkTime()) return;
                    let param = {
                        plateNo: this.currentPlateNo,
                        beginDate: this.startTime,
                        endDate: this.endTime
                    };
                    const result = await getHistoricalRouteByPlateNo(param);
                    this.reset();
                    if (!result.data) {
                        this.$toast({
                            message: '暂无数据',
                            position: 'bottom'
                        });
                        return;
                    }
                    this.mapInfo = result.data;
                    if (this.mapInfo.points && this.mapInfo.points.length) {
                        this.mapInfo = this.locationFormat(this.mapInfo);
                        this.initPolyline(this.mapInfo.path);
                    } else {
                        this.$toast({
                            message: '暂无数据',
                            position: 'bottom'
                        });
                        return;
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 清除地图
            clearMap () {
                this.map && this.map && this.map.clearMap();
            },
            // 轨迹数据格式化
            locationFormat (opt) {
                let path = [];
                opt.points.forEach(item => {
                    path[path.length] = [item.lng.toFixed(6), item.lat.toFixed(6)];
                });
                return {
                    ...opt,
                    path
                };
            },
            // 获取线条颜色
            getStrokeColor (speed) {
                let color = '';
                if (speed > 0 && speed <= 30) {
                    color = '#86D9EE';
                } else if (speed > 30 && speed <= 60) {
                    color = '#828CC1';
                } else if (speed > 60 && speed <= 80) {
                    color = '#575EBC';
                } else if (speed > 80 && speed <= 100) {
                    color = '#C86373';
                } else {
                    color = '#C24651';
                }
                return color;
            },
            // 初始化轨迹
            initPolyline (path) {
                this.clearMap();
                this.showSearch = false;
                let marker = this.marker = new window.AMap.Marker({
                    map: this.map,
                    position: path[0],
                    offset: new window.AMap.Pixel(-10, -8),
                    icon: new window.AMap.Icon({
                        image: require('../../../../assets/images/truch.png')
                    }),
                    autoRotation: true
                });
                // 起点
                /* eslint-disable no-new */
                new window.AMap.Marker({
                    map: this.map,
                    position: path[0],
                    offset: new window.AMap.Pixel(-12, -30),
                    icon: new window.AMap.Icon({
                        image: require('../../../../assets/images/start_location@2x.png'),
                        size: new window.AMap.Size(24, 30)
                    })
                });
                // 终点
                /* eslint-disable no-new */
                new window.AMap.Marker({
                    map: this.map,
                    position: path[path.length - 1],
                    offset: new window.AMap.Pixel(-12, -30),
                    icon: new window.AMap.Icon({
                        image: require('../../../../assets/images/end_location@2x.png'),
                        size: new window.AMap.Size(24, 30)
                    })
                });
                // 绘制轨迹
                /* eslint-disable no-new */
                let polyline = new window.AMap.Polyline({
                    map: this.map,
                    path: path,
                    strokeColor: '#AAAAAA',  // 线颜色
                    strokeOpacity: 1,        // 线透明度
                    strokeWeight: 3          // 线宽
                });

                // 计算速度m/s
                this.polylineLen = polyline.getLength();
                this.speed = this.polylineLen / this.gearsModel * 3.6;

                let info = {
                    plateNumber: this.mapInfo.plateNumber,
                    lng: path[0].lng,
                    lat: path[0].lat,
                    speed: this.mapInfo.points[0].speed,
                    collectTime: this.mapInfo.points[0].collectTime
                };

                let passedPolyline = new window.AMap.Polyline({
                    map: this.map,
                    strokeColor: this.getStrokeColor(+info.speed),  // 线颜色
                    strokeOpacity: 1,     // 线透明度
                    strokeWeight: 3       // 线宽
                });

                // 信息窗口
                let infoWindow = new window.AMap.InfoWindow();
                infoWindow.setContent(`<div style="font-size: 14px; color: #333;">车牌号：${info.plateNumber}<br> 速度: ${info.speed}km/h <br> 时间：${info.collectTime}</div>`);
                infoWindow.setOffset(new window.AMap.Pixel(3, -12));
                infoWindow.open(this.map, marker.getPosition());

                marker.on('click', (e) => {
                    infoWindow.open(this.map, marker.getPosition());
                });
                // 经过的路径
                let prevIndex = 0;
                // 添加moving
                marker.on('moving', (e) => {
                    let len = e.passedPath.length;
                    let ii = path.length;
                    // 当前marker坐标
                    let location = e.passedPath[len - 1];
                    let index = -1;
                    for (let i = 0; i < ii; i++) {
                        if (path[i].toString() === location.toString()) {
                            index = i;
                            break;
                        }
                    }
                    passedPolyline.setPath(e.passedPath.slice(prevIndex, len));
                    if (~index) {
                        prevIndex = len - 1;
                        info.speed = this.mapInfo.points[index].speed;
                        info.collectTime = this.mapInfo.points[index].collectTime;
                        if (index > 0) {
                            passedPolyline = new window.AMap.Polyline({
                                map: this.map,
                                strokeColor: this.getStrokeColor(+info.speed),  // 线颜色
                                strokeOpacity: 1,     // 线透明度
                                strokeWeight: 3       // 线宽
                            });
                        }
                    }

                    infoWindow.setContent(`<div style="font-size: 14px; color: #333;">车牌号：${info.plateNumber} <br> 速度: ${info.speed}km/h <br> 时间：${info.collectTime}</div>`);
                    infoWindow.setPosition([location.lng, location.lat]);
                });
                // 运动完成
                marker.on('moveend', (e) => {
                    const location = path[path.length - 1];
                    this.map.panTo([location.lng, location.lat]);
                });
                this.map.setCenter([path[0].lng, path[0].lat]);
            },
            _getSearch () {
                if (this.userInfo.type === 'fleet') {
                    this.search();
                } else {
                    this._getHistoricalRouteByVin();
                }
            },
            reset () {
                this.showSearch = true;
                this.map && this.map.clearMap();
            },
            // 获取历史轨迹记录
            async _getHistoricalRouteByVin () {
                try {
                    if (!this.checkTime()) return;
                    if (!this.userInfo.defaultVin) {
                        await this.getUserInfo();
                    }
                    const dayMillis = 24 * 60 * 60 * 1000;
                    if ((new Date(this.endTime.replace(/-/g, '/')).getTime() -
                        new Date(this.startTime.replace(/-/g, '/')).getTime()) / dayMillis > 5) {
                        this.$toast({
                            message: '时间范围限制为5天',
                            position: 'bottom'
                        });
                        return;
                    }
                    let param = {
                        vin: this.userInfo.defaultVin,
                        beginDate: this.startTime,
                        endDate: this.endTime
                    };
                    const result = await getHistoricalRouteByVin(param);
                    this.mapInfo = result.data;
                    this.reset();
                    if (!result.data) {
                        this.$toast({
                            message: '暂无数据',
                            position: 'bottom'
                        });
                        return;
                    }
                    if (this.mapInfo.points && this.mapInfo.points.length) {
                        this.mapInfo = this.locationFormat(this.mapInfo);
                        this.initPolyline(this.mapInfo.path);
                    } else {
                        this.$toast({
                            message: '暂无数据',
                            position: 'bottom'
                        });
                        return;
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            }
        },
        beforeDestroy () {
            this.stop();
        },
        beforeRouteLeave (to, from, next) {
            this.$vux.datetime.hide();
            next();
        }
    };
</script>
