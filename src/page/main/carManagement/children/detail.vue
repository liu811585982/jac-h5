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
        }
        .section-scroller-title {
            font-size: $font-size-16;
            .list-content {
                background-color: $white;
                margin: px2rem(15) px2rem(10);
                @include flex(stretch, row nowrap, center);
                .list-item-left {
                    flex: 0 0 px2rem(180);
                    @include flex(center, column nowrap, center);
                    overflow: hidden;
                    text-align: center;
                    color: $white;
                    background-color: $global_color;
                    .left-title {
                        display: inline-block;
                        font-size: px2rem(66);
                        line-height: px2rem(100);
                        @include ellipsis;
                        border-bottom: 1px solid rgba(255,255,255, 0.4);
                    }
                    .left-body {
                        width: 100%;
                        font-size: px2rem(26);
                        line-height: px2rem(56);
                        color: rgba(255,255,255, 0.8);
                        @include ellipsis;
                    }
                }
                .list-item-center {
                    position: relative;
                    flex: 1;
                    -webkit-flex: 1;
                    padding: px2rem(15) px2rem(20);
                    overflow: hidden;
                    .center-title {
                        font-size: px2rem(32);
                        font-weight: 500;
                        @include ellipsis;
                        margin-top: px2rem(10);
                        margin-bottom: px2rem(20);
                    }
                    .center-item {
                        @include ellipsis;
                        vertical-align: middle;
                        font-size: px2rem(28);
                        color: #6D7C8B;
                        margin-bottom: px2rem(23);
                        &:last-child {
                            margin-bottom: 0;
                        }
                    }
                    .default-mark {
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                }
                .list-item-right {
                    position: relative;
                    flex: 0 0 2rem;
                    @include flex(center, column nowrap, flex-end);
                    .default-mark {
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                    .carInfo-icon {
                        @include wh(px2rem(56), px2rem(56));
                        border-radius: px2rem(56);
                        line-height: px2rem(56);
                        color: #1296DB;
                        font-size: px2rem(28);
                        text-align: center;
                        margin-bottom: px2rem(15);
                        border: 1px solid currentColor;
                        &.phone {
                            color: #43bd48;
                        }
                    }
                }
            }
        }
        .section-scroller-body /deep/{
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
            .slide {
                .credit {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
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
                    <div class="list-item-left">
                        <h2 class="left-title">{{detailInfo.plateNo.substring(0,2)}}</h2>
                        <div class="left-body">{{detailInfo.plateNo | plateNo}}</div>
                    </div>
                    <div class="list-item-center">
                        <h3 class="center-title">{{detailInfo.plateNo}}[{{detailInfo.modelName}}]</h3>
                        <p class="center-item" v-if="detailInfo.length && detailInfo.van">{{detailInfo.length}}米 | {{detailInfo.van}}</p>
                        <p class="center-item" v-if="isFleet">
                            司机：{{detailInfo.defaultDriverName|nullFormat}}
                        </p>
                        <p class="center-item" v-else>
                            车主：{{detailInfo.ownerName|nullFormat}}
                        </p>
                        <p class="center-item" v-if="isFleet">
                            电话：{{detailInfo.defaultDriverPhone|nullFormat}}
                        </p>
                        <p class="center-item" v-else>
                            电话：{{detailInfo.ownerPhone}}
                        </p>
                    </div>
                    <div class="list-item-right" v-if="userInfo.type !== 'driver' || detailInfo.vin === userInfo.defaultVin">
                        <div class="carInfo-icon" @click="coords($event, detailInfo)">
                            <svg-icon type="coords"></svg-icon>
                        </div>
                        <div class="carInfo-icon phone" @click="call($event, detailInfo)">
                            <svg-icon type="phone"></svg-icon>
                        </div>
                        <div class="default-mark" v-if="detailInfo.vin === userInfo.defaultVin && userInfo.type === 'driver'">
                            <default-badge desc="使用中"></default-badge>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-scroller-body">
                <group title="基础信息" label-width="10em">
                    <cell title="VIN码" :value="detailInfo.vin"></cell>
                    <cell title="车牌号" :value="detailInfo.plateNo"></cell>
                    <cell title="车主" :value="detailInfo.ownerName"></cell>
                    <cell title="车主电话" :value="detailInfo.ownerPhone"></cell>
                    <cell title="品牌" :value="detailInfo.brandName"></cell>
                    <cell title="工厂" :value="detailInfo.factoryName"></cell>
                    <cell title="车系" :value="detailInfo.seriesName"></cell>
                    <cell title="车型" :value="detailInfo.modelName"></cell>
                    <cell title="车长" :value="`${detailInfo.length || ''}m`"></cell>
                    <cell title="厢型" :value="detailInfo.van"></cell>
                    <cell title="最高车速" :value="`${detailInfo.maxSpeed || ''}km/h`"></cell>
                    <cell title="首款年度" :value="detailInfo.firstYear"></cell>
                    <cell title="油箱大小" :value="`${detailInfo.oilBoxSize || ''}L`"></cell>
                    <cell title="百公里油耗（实际）" :value="`${detailInfo.oilWearReal || ''}L/100KM`"></cell>
                    <cell title="百公里油耗（工况）" :value="`${detailInfo.oilWearReport || ''}L/100KM`"></cell>
                    <cell title="准载人数" :value="detailInfo.passengersNumber"></cell>
                    <cell title="整备质量" :value="`${detailInfo.curbWeight || ''}kg`"></cell>
                    <cell title="发动机名称" :value="detailInfo.engineNameCn"></cell>
                    <cell title="发动机-型号" :value="detailInfo.engineModel"></cell>
                    <cell title="车辆用途" :value="detailInfo.vehicleUse"></cell>
                    <cell title="所属车队" :value="detailInfo.motorcadeName"></cell>
                    <!-- <cell title="车辆编号" :value="detailInfo.vehicleNumber"></cell> -->
                </group>
                <group title="线路" label-width="8em">
                    <cell title="线路名称" align-items="flex-start">
                        <slot>
                            <div class="text-left">{{detailInfo.lineName}}</div>
                        </slot>
                    </cell>
                </group>
                <group title="司机" label-width="8em" v-if="isFleet">
                    <cell title="授权司机" :value="detailInfo.defaultDriverName"></cell>
                    <cell title="所有司机" :value="detailInfo.driverList | driverList"></cell>
                </group>
                <group title="日期" label-width="8em">
                    <cell title="销售日期" :value="detailInfo.saleDate | dateFormat('yyyy-MM-dd')"></cell>
                    <cell title="出库日期" :value="detailInfo.exWarehouseDate | dateFormat('yyyy-MM-dd')"></cell>
                    <!-- <cell title="生产年份" :value="detailInfo.productionDate     | dateFormat('yyyy-MM-dd')"></cell> -->
                </group>
                <group title="证件信息" label-width="12em">
                    <cell title="行驶证有效截止日期" :value="detailInfo.driveExpireTime"></cell>
                    <cell
                        title="行驶证"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent ? 'up' : 'down'"
                        @click.native="showContent = !showContent"></cell>
                    <div class="slide" :class="showContent?'animate':''">
                        <div class="upload_img vux-1px">
                            <img v-if="detailInfo.runLicense" :src="detailInfo.runLicense|avatarFormat" alt="" class="credit">
                            <no-picture v-else></no-picture>
                        </div>
                    </div>
                    <cell title="运输许可证有效截止日期" :value="detailInfo.transportationExpireTime"></cell>
                    <cell
                        title="运输许可证"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent2 ? 'up' : 'down'"
                        @click.native="showContent2 = !showContent2"></cell>
                    <div class="slide" :class="showContent2?'animate':''">
                        <div class="upload_img vux-1px">
                            <img v-if="detailInfo.transportLicense" :src="detailInfo.transportLicense|avatarFormat" alt="" class="credit">
                            <no-picture v-else></no-picture>
                        </div>
                    </div>
                    <cell title="保险单有效截止日期" :value="detailInfo.policyExpireTime | dateFormat('yyyy-MM-dd')"></cell>
                    <cell
                        title="保险单"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent3 ? 'up' : 'down'"
                        @click.native="showContent3 = !showContent3"></cell>
                    <div class="slide" :class="showContent3?'animate':''">
                        <div class="upload_img vux-1px">
                            <img v-if="detailInfo.policy" :src="detailInfo.policy|avatarFormat" alt="" class="credit">
                            <no-picture v-else></no-picture>
                        </div>
                    </div>
                </group>
            </div>
        </div>
    </div>
</template>
<script>
    import { Cell, Group, XButton, Scroller, CellFormPreview } from 'vux';
    import { getById, getVehicleInfoByVin } from '@/services/carManagement/carManagement';
    import { defaultBadge, noPicture } from '@/components';
    import userInfo from '@/mixins/userInfo';
    import { phoneFormat } from '@/libs/utils';
    import { plusready } from '@/libs/plus';
    import * as cityData from '../city_data.json';
    import { imgHttp } from '@/libs/config';

    export default {
        name: 'hyDetail',
        mixins: [userInfo],
        components: { Cell, Group, XButton, Scroller, CellFormPreview, defaultBadge, noPicture },
        data () {
            return {
                detailInfo: {
                    plateNo: ''
                },
                showContent: false,
                showContent2: false,
                showContent3: false
            };
        },
        mounted () {
            // this.$nextTick(() => {
            //     // this.$refs.scroller.reset({top: 0});
            // });
            if (this.$route.query.id) {
                this._getDetail();
            }
        },
        computed: {
          isFleet () {
              return this.userInfo.type === 'fleet';
          }
        },
        methods: {
            // 获取详情
            async _getDetail () {
                try {
                    const result = await getById({id: this.$route.query.id});
                    this.detailInfo = result.data;
                    const res = await getVehicleInfoByVin({vin: result.data.vin});
                    for (let i in res.data) {
                        this.detailInfo[i] = res.data[i];
                    }
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            coords (event, item) {
                event.stopPropagation();
                this.$router.push({path: '/main/carMonitoring/positioning', query: {plateNo: item.plateNo}});
            },
            call (event, item) {
                event.stopPropagation();
                let str = '车主';
                let phone = item.ownerPhone;
                if (this.isFleet) {
                    str = '司机';
                    phone = item.defaultDriverPhone;
                }
                if (!phone) {
                    this.$messagebox.alert(`暂无默认${str}`);
                    return;
                }
                const phoneStr = phoneFormat(phone, '-');
                this.$messagebox({
                    title: '',
                    message: phoneStr,
                    showCancelButton: true,
                    confirmButtonText: `呼叫${str}`
                }).then((action) => {
                    if (action === 'confirm') {
                        plusready((plus) => {
                            plus.device.dial(phone, true);
                        });
                    }
                });
            }
        },
        filters: {
            driverList (val) {
                let res = '';
                if (val) {
                    val.forEach(item => {
                        res += `${item.name},`;
                    });
                    res = res.replace('/,$/', '');
                }
                return res;
            },
            nullFormat (val) {
                if (!val) {
                    return '--';
                }
                return val;
            },
            plateNo (val) {
                const result = cityData.filter(item => item.code === val.substr(0, 2));
                if (result[0]) {
                    return `${result[0].province} | ${result[0].city}`;
                } else {
                    return '--';
                }
            },
            avatarFormat (val) {
                let url = '';
                if (val) {
                    url = imgHttp + val;
                } else {
                    url = require('@/assets/images/credit.png');
                }
                return url;
            }
        }
    };
</script>
