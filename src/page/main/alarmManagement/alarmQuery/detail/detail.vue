<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            @include wh(100%, 100%);
            overflow: auto;
            flex: 1;
            background: #fff;
        }
        .section-scroller-title {
            background: #F4F4F4;
            padding: px2rem(10) px2rem(15);
            .list-content {
                padding: px2rem(15);
                background: #fff;
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
        .section-scroller-body /deep/{
            .title-bar {
                width: 100%;
                height: px2rem(50);
                padding: 0 px2rem(30);
                line-height: px2rem(50);
                font-size: px2rem(28);
                color: #6D7C8B;
                background: #F4F4F4;
            }
            .content-box {
                width: 100%;
                height: px2rem(600);
                padding: px2rem(10);
                .map-container {
                    @include wh(100%, 100%);
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
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <!-- 内容 -->
        <div class="section-body">
            <div class="section-scroller-title">
                <div class="list-content">
                    <h3 class="list-item-title">
                        <span class="title">{{alarmInfo.plateNo}}</span>
                        <span class="value">{{alarmInfo.alarmStartTime}}</span>
                    </h3>
                    <div class="list-item-content">
                        <p class="content-p">
                            <span class="title">报警类型：</span>
                            <span class="value error">{{alarmInfo.alarmType|alarmType}}</span>
                        </p>
                    </div>
                    <div class="list-item-content">
                        <p class="content-p">
                            <span class="title">报警内容：</span>
                            <span class="value">{{alarmInfo.alarmContent}}</span>
                        </p>
                    </div>
                    <div class="list-item-content">
                        <p class="content-p" v-if="alarmInfo.alarmStartTime && alarmInfo.alarmEndTime">
                            <span class="title"><span class="word">时</span><span class="word">间</span><span class="word">段</span>：</span>
                            <span class="value">{{alarmInfo.alarmStartTime}}~{{alarmInfo.alarmEndTime}}</span>
                        </p>
                    </div>
                    <div class="list-item-content">
                        <p class="content-p">
                            <span class="title">报警时长：</span>
                            <span class="value">{{alarmInfo.alarmDuration}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="section-scroller-body">
                <div class="title-bar">报警显示</div>
                <div class="content-box">
                    <div class="map-container" ref="mapContainer">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import AMap from 'AMap';
    // import AMapUI from 'AMapUI';
    import initMap from '@/libs/amap.js';
    import { alarmDetail } from '@/services/alarmManagement/alarmManagement';

    export default {
        name: 'alarmDetail',
        data () {
            return {
                alarmInfo: ''
            };
        },
        mounted () {
            this._initMap();
            this.getAlarmDetail();
        },
        methods: {
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
            async getAlarmDetail () {
                const result = await alarmDetail({id: this.$route.query.id});
                this.alarmInfo = result.data || {};
                if (this.alarmInfo.coordinateList && this.alarmInfo.coordinateList.length > 0) {
                    this.addMarker(this.alarmInfo.coordinateList[0]);
                }
            },
            addMarker (position) {
                if (!position.lat || !position.lng) {
                    return;
                }
                const _this = this;
                window.AMapUI.loadUI(['overlay/SvgMarker'], function (SvgMarker) {
                    const marker = new SvgMarker(
                        new SvgMarker.Shape.IconFont({
                            symbolJs: './static/font/iconfont.js',
                            icon: 'icon-dian',
                            size: 26,
                            offset: [-12, -24],
                            fillColor: '#DC3F3E'
                        }), {
                            position: [position.lng, position.lat]
                        }
                    );
                    marker.setMap(_this.map);
                    _this.map.setFitView();
                });
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
