/**
 * 作者：yeshengqiang
 * 时间：2018-04-09
 * 描述：新增/修改车辆信息
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .modify-panel {
        @include wh(100%, 100%);
        @include flex(stretch, column nowrap);
        overflow: hidden;
        .section-body {
            position: relative;
            @include wh(100%, 100%);
            flex: 1;
            overflow: hidden;
            .search-container {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 999;
                @include wh(100%, 100%);
                .mask {
                    @include wh(100%, 100%);
                    background: rgba(0,0,0,0.3);
                }
                .search-list {
                    width: 100%;
                    max-height: 100%;
                    overflow: auto;
                    .search-item {
                        padding: px2rem(30) px2rem(15);
                        border-bottom: 1px solid #EEEEEE;
                        white-space: normal;
                        word-break: break-word;
                        .search-item-content {
                            font-size: px2rem(28);
                            .title {
                                color: #282828;
                                margin-right: px2rem(30);
                            }
                            .value {
                                color: #949FAA;
                            }
                        }
                    }
                }
            }
            .section-scroller {
                position: absolute;
                top: 0;
                left: 0;
                @include wh(100%, 100%);
                overflow: auto;
                .section-title {
                    display: flex;
                    display: -webkit-flex;
                    padding: 10px 15px;
                    -webkit-align-items: center;
                    align-items: center;
                    align-items: center;
                    background-color: $white;
                    line-height: 1.41176471;
                    font-size: 17px;
                    .section-title-left {
                        flex: 1;
                        -webkit-flex: 1;
                    }
                    .section-title-right {
                        text-align: right;
                        color: #999;
                    }
                }
                .driver-list {
                    width: 100%;
                    padding: 0 px2rem(20);
                    .driver-item {
                        @include flex(center, row nowrap);
                        height: px2rem(78);
                        line-height: px2rem(78);
                        border-bottom: 1px solid #EEEEEE;
                        color: #7B7B7B;
                        &:last-child {
                            border-bottom: none;
                        }
                        .item-left {
                            flex: 0 0 px2rem(36);
                        }
                        .item-center {
                            flex: 1;
                            padding: 0 px2rem(60);
                            text-align: left;
                            @include ellipsis;
                            span {
                                margin-right: px2rem(15);
                                &:last-child{
                                    margin-right: 0;
                                }
                                &.authorization {
                                    font-size: px2rem(24);
                                }
                                .icon {
                                    color: #00A2FF;
                                    font-size: px2rem(30);
                                }
                            }
                        }
                        .item-right {
                            flex: 0 0 px2rem(36);
                        }
                    }
                }
                .toolbox {
                    width: 80%;
                    margin: px2rem(50) auto;
                }
            }
        }
        & /deep/ .weui-btn_mini {
            margin: 0;
        }
    }
    .radio-item-default-box {
        display: flex;
        display: -webkit-flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        text-align: right;
    }
    .driver-icon {
        font-size: px2rem(36);
        color: $global_color;
        &.bind {
            color: #B1B1B1;
        }
    }

    .section-scroller /deep/ {
        .weui-input {
            color: #999999;
        }
        .weui-cell__ft {
            padding-right: px2rem(20);
        }
        .label {
            position: relative;
            padding-left: px2rem(15);
            &.auto-width {
                width: 100%;
            }
            .required {
                position: absolute;
                top: px2rem(5);
                left: 0;
                color: $global_color;
            }
        }
        .weui-label {
            padding-left: px2rem(15);
        }
        .vux-label {
            padding-left: px2rem(15);
        }
        .is-cell {
            .vux-label {
                padding-left: 0;
            }
        }
    }

</style>
<template>
    <div class="modify-panel">
        <!-- 头部 -->
        <hy-header :title="`${title}${$route.meta.title}`" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="search-container" v-show="showSearch">
                <search-group focus v-model="searchModel" :showPanel="showPanel" @change="getResult" :showSearch="showSearch" @onCancel="handleCancel"
                    :placeholder="placeHolder">
                    <div class="search-list">
                        <div class="search-item" v-for="item in list" :key="item.id" @click="resultClick(item)">
                            <div class="search-item-content" v-show="type === 'vin'">
                                <span class="title">{{item.vin}}</span>
                                <span class="value">{{item.plateNo}}</span>
                            </div>
                            <div class="search-item-content" v-show="type === 'driver'">
                                <span class="title">{{item.name}}</span>
                                <span class="value">{{item.phone}}</span>
                            </div>
                            <div class="search-item-content" v-show="type === 'line'">
                                <span class="title">{{type === 'vin' ? item.vin : item.name}}</span>
                                <span class="value">{{type === 'vin' ? item.plateNo: item.phone}}</span>
                            </div>
                        </div>
                    </div>
                </search-group>
                <div class="mask" @click="handleCancel"></div>
            </div>
            <div class="section-scroller">
                <div class="section-title">
                    <div class="section-title-left">所属车队</div>
                    <div class="section-title-right">{{userInfo.fleetName}}</div>
                </div>
                <group title="基本信息" label-width="10em">
                    <cell @click.native="handleChoose('vin')" :value="addInfo.vin" is-link class="is-cell">
                        <div class="label" slot="title"><span class="required">*</span><span>VIN</span></div>
                    </cell>
                    <x-input title="车牌号" placeholder="请输入车牌号" text-align="right" placeholder-align="right" v-model="addInfo.plateNo" :show-clear="false">
                        <div class="label" slot="label"><span class="required">*</span><span>车牌号</span></div>
                    </x-input>
                    <cell title="品牌" :value="addInfo.brandName"></cell>
                    <cell title="工厂" :value="addInfo.factoryName"></cell>
                    <cell title="车系" :value="addInfo.seriesName"></cell>
                    <cell title="车型" :value="addInfo.modelName"></cell>
                    <cell title="车长" :value="`${addInfo.length || ''}m`"></cell>
                    <cell title="厢型" :value="addInfo.van"></cell>
                    <cell title="最高车速" :value="`${addInfo.maxSpeed || ''}km/h`"></cell>
                    <cell title="首款年度" :value="addInfo.firstYear"></cell>
                    <cell title="油箱大小" :value="`${addInfo.oilBoxSize || ''}L`"></cell>
                    <cell title="百公里油耗（实际）" :value="`${addInfo.oilWearReal || ''}L/100KM`"></cell>
                    <cell title="百公里油耗（工况）" :value="`${addInfo.oilWearReport || ''}L/100KM`"></cell>
                    <cell title="准载人数" :value="addInfo.passengersNumber"></cell>
                    <cell title="整备质量" :value="`${addInfo.curbWeight || ''}kg`"></cell>
                    <cell title="发动机名称" :value="addInfo.engineNameCn"></cell>
                    <cell title="发动机型号" :value="addInfo.engineModel"></cell>
                    <cell title="车辆用途" :value="addInfo.vehicleUse"></cell>
                    <!--<cell title="车主" :value="addInfo.ownerName" @click.native="handleInput(addInfo.ownerName)" is-link></cell>-->
                    <x-input title="车主姓名" placeholder="请输入车主姓名" text-align="right" placeholder-align="right" v-model.trim="addInfo.ownerName" :show-clear="false" :min="2" :max="5">
                        <div class="label" slot="label"><span class="required">*</span><span>车主姓名</span></div>
                    </x-input>
                    <x-input placeholder="请输入车主手机号" text-align="right" placeholder-align="right" v-model.trim="addInfo.ownerPhone" :show-clear="false" :min="11" :max="11">
                        <div class="label" slot="label"><span class="required">*</span><span>车主手机号</span></div>
                    </x-input>
                    <!--<cell
                        title="司机"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showOwnerName ? 'up' : 'down'"
                        @click.native="handleToggle('showOwnerName')">
                        <x-button mini @click.native.stop="handleChoose('defaultDriverName')" type="warn">
                            添加
                        </x-button>
                    </cell>
                    <template v-if="showOwnerName">
                        <group-radio v-model="addInfo.defaultDriverId">
                            <radio-item :label="item.id" v-for="(item, index) in addInfo.driverList" :key="index">
                                <div class="radio-item-default-box">
                                    {{item.name}}
                                    <x-button mini @click.native.stop="handleDel(item)" type="warn">
                                        删除
                                    </x-button>
                                </div>
                            </radio-item>
                        </group-radio>
                    </template>-->
                </group>
                <group label-width="5em">
                    <cell @click.native="handleChoose('line')" is-link class="is-cell">
                        <div class="label" slot="title"><span class="required">&nbsp;</span><span>线路</span></div>
                        <slot>
                            <div class="text-left">{{addInfo.lineName}}</div>
                        </slot>
                    </cell>
                    <cell title="司机">
                        <div slot="child" class="driver-icon" @click="handleChoose('driver')">
                            <svg-icon type="plus"></svg-icon>
                        </div>
                    </cell>
                    <cell-box v-if="addInfo.driverList.length > 0">
                        <div class="driver-list">
                            <div class="driver-item" v-for="item in addInfo.driverList" :key="item.id">
                                <div class="item-left driver-icon" @click="handleRemove(item)">
                                    <svg-icon type="minus"></svg-icon>
                                </div>
                                <div class="item-center">
                                    <span class="title">{{item.name}}</span>
                                    <span>{{item.phone}}</span>
                                    <span class="authorization" v-if="item.id === addInfo.defaultDriverId"><svg-icon type="right" style="color:#00A2FF;"></svg-icon>已授权</span>
                                </div>
                                <div class="item-right driver-icon" :class="{bind: item.id === addInfo.defaultDriverId}" @click="handleAuthority(item)">
                                    <svg-icon type="circle_bind"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </cell-box>
                </group>
                <!-- 证件信息 -->
                <group title="证件信息">
                    <datetime
                        title="行驶证有效截止日期"
                        v-model="addInfo.driveExpireTime"
                        :display-format="formatValueFunction">
                        <div class="label auto-width" slot="title"><span class="required">*</span><span>行驶证有效截止日期</span></div>
                    </datetime>
                    <cell
                        title="行驶证照"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent1 ? 'up' : 'down'"
                        @click.native="showContent1 = !showContent1"></cell>
                    <div class="slide" :class="showContent1?'animate':''">
                        <upload-img :imageUrl="runLicense" svg="upload_img" @result="getRunLicense"></upload-img>
                    </div>

                    <datetime
                        title="运输许可证有效截止日期"
                        :display-format="formatValueFunction"
                        v-model="addInfo.transportationExpireTime">
                        <div class="label auto-width" slot="title"><span class="required">*</span><span>运输许可证有效截止日期</span></div>
                    </datetime>
                    <cell
                        title="运输许可证照"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent2 ? 'up' : 'down'"
                        @click.native="showContent2 = !showContent2"></cell>
                    <div class="slide" :class="showContent2?'animate':''">
                        <upload-img :imageUrl="transportLicense" svg="upload_img" @result="getTransportLicense"></upload-img>
                    </div>

                    <datetime
                        title="保险单有效截止日期"
                        v-model="addInfo.policyExpireTime"
                        :display-format="formatValueFunction">
                        <div class="label auto-width" slot="title"><span class="required">*</span><span>保险单有效截止日期</span></div>
                    </datetime>
                    <cell
                        title="保险单"
                        is-link
                        :border-intent="false"
                        :arrow-direction="showContent3 ? 'up' : 'down'"
                        @click.native="showContent3 = !showContent3"></cell>
                    <div class="slide" :class="showContent3?'animate':''">
                        <upload-img :imageUrl="policy" svg="upload_img" @result="getPolicy"></upload-img>
                    </div>
                </group>
                <div class="toolbox">
                    <x-button type="warn" @click.native="save()">确认</x-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import userInfo from '@/mixins/userInfo';
    import { GroupRadio, RadioItem, uploadImg, searchGroup } from '@/components';
    import { ViewBox, PopupPicker, Cell, Group, Radio, XButton, Scroller, Search, debounce, Datetime, CellBox, XInput } from 'vux';
    import { getById, getByVin, getVehicleInfoByVin, queryDriverList, modifyVehicle, addVehicle, uploadFileToPolicy, uploadFileToRunLicense, uploadFileToTransportLicense, getLineList } from '@/services/carManagement/carManagement';
    import { imgHttp } from '@/libs/config';
    import { formateDate } from '@/libs/utils';
    import regMap from '@/libs/regMap';

    export default {
        mixins: [ userInfo ],
        components: { ViewBox, PopupPicker, Cell, Group, Radio, XButton, Scroller, Search, RadioItem, GroupRadio, uploadImg, Datetime, searchGroup, CellBox, XInput },
        data () {
            return {
                showSearch: false,
                searchModel: '',
                showPanel: false,
                list: [],
                addInfo: {
                    ownerName: '',
                    driverList: [],
                    defaultDriverId: null,
                    defaultDriverName: '',
                    defaultDriverPhone: ''
                },
                currentValue: '',
                results: [],
                props: '',
                type: '',   // 'vin'选择vin码 'driver'选择司机
                driverList: [],
                value: '',
                showOwnerName: false,
                showContent1: true,
                showContent2: true,
                showContent3: true,
                formatValueFunction (val) {
                    return formateDate(val, 'yyyy-MM-dd');
                }
            };
        },
        computed: {
            title () {
                return this.$route.query.id ? '修改' : '新增';
            },
            placeholder () {
                return `请输入`;
            },
            driverListAll () {
                return this.addInfo.driverList.map(item => {
                    return {
                        key: item.id,
                        value: item.name
                    };
                });
            },
            runLicense () {
                return imgHttp + this.addInfo.runLicense;
            },
            transportLicense () {
                return imgHttp + this.addInfo.transportLicense;
            },
            policy () {
                return imgHttp + this.addInfo.policy;
            },
            placeHolder () {
                switch (this.type) {
                    case 'vin':
                        return '请输入vin码搜索';
                    case 'driver':
                        return '请输入姓名或手机号搜索';
                    case 'line':
                        return '请输入线路名称搜索';
                }
            }
        },
        created () {
            if (this.$route.query.id) {
                this._getDetail();
            }
            // this._queryDriverList();
            this.getResult = debounce(this.handleChange, 500);
        },
        methods: {
            // 获取详情
            async _getDetail () {
                try {
                    const result = await getById({id: this.$route.query.id});
                    this.addInfo = result.data;
                    if (!this.addInfo.driverList) {
                        this.addInfo.driverList = [];
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 获取司机信息
            async _queryDriverList () {
                try {
                    const result = await queryDriverList();
                    this.driverList = result.data;
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 保存
            async save () {
                // 日期格式处理
                this.addInfo.driveExpireTime && (this.addInfo.driveExpireTime = formateDate(this.addInfo.driveExpireTime, 'yyyy-MM-dd hh:mm:ss'));
                this.addInfo.transportationExpireTime && (this.addInfo.transportationExpireTime = formateDate(this.addInfo.transportationExpireTime, 'yyyy-MM-dd hh:mm:ss'));
                this.addInfo.policyExpireTime && (this.addInfo.policyExpireTime = formateDate(this.addInfo.policyExpireTime, 'yyyy-MM-dd hh:mm:ss'));
                this.addInfo.driverIdList = [];
                this.addInfo.motorcadeId = this.userInfo.fleetId;
                for (const driver of this.addInfo.driverList) {
                    this.addInfo.driverIdList.push(driver.id);
                }
                if (!this.addInfo.vin) {
                    this.$toast({
                        message: 'VIN码不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.addInfo.plateNo) {
                    this.$toast({
                        message: '车牌号不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.addInfo.ownerName) {
                    this.$toast({
                        message: '车主姓名不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.addInfo.ownerPhone) {
                    this.$toast({
                        message: '车主手机号不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.addInfo.driveExpireTime) {
                    this.$toast({
                        message: '行驶证有效截止日期不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.addInfo.transportationExpireTime) {
                    this.$toast({
                        message: '运输许可证有效截止日期不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!this.addInfo.policyExpireTime) {
                    this.$toast({
                        message: '保险单有效截止日期不能为空',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.plateNo.test(this.addInfo.plateNo)) {
                    this.$toast({
                        message: '车牌号格式错误',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.chineseName.test(this.addInfo.ownerName)) {
                    this.$toast({
                        message: '请输入正确的中文姓名',
                        position: 'bottom'
                    });
                    return false;
                }
                if (!regMap.phone.test(this.addInfo.ownerPhone)) {
                    this.$toast({
                        message: '车主手机号格式错误',
                        position: 'bottom'
                    });
                    return false;
                }
                try {
                    let fn = () => {};
                    let str = '';
                    if (this.$route.query.id) {
                        fn = modifyVehicle;
                        str = '修改';
                    } else {
                        fn = addVehicle;
                        delete this.addInfo.id;
                        str = '新增';
                    }
                    await fn(this.addInfo);
                    this.$toast({
                        message: `${str}成功`,
                        position: 'bottom'
                    });
                    this.$router.back();
                    this.$indicator.close();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    this.$indicator.close();
                }
            },
            // 刷新滚动
            resetScroller () {
                this.$nextTick(() => {
                    this.$refs.scroller.reset();
                });
            },
            // 选择编辑
            handleChoose (res) {
                if (res === 'vin' && this.$route.query.id) return;
                this.props = res;
                this.type = res;
                this.showSearch = true;
                this.list = [];
                this.searchModel = '';
                // this.handleChange(res);
            },
            // 弹出输入
            handleInput (val) {
                const vm = this;
                this.$vux.confirm.prompt('请填写车主', {
                    title: '车主',
                    inputAttrs: {
                        type: 'text'
                    },
                    onShow () {
                        vm.$vux.confirm.setInputValue(val);
                    },
                    onConfirm (val) {
                        vm.$set(vm.addInfo, 'ownerName', val);
                    }
                });
            },
            // 选择 vin码
            async resultClick (item) {
                if (this.type === 'vin') {
                    let result = await getVehicleInfoByVin({vin: item.vin});
                    this.searchModel = item.vin;
                    this.addInfo.plateNo = item.plateNo || '';
                    for (let i in result.data) {
                        this.addInfo[i] = result.data[i];
                    }
                } else if (this.type === 'driver') {
                    this.addInfo.driverList.push(item);
                } else {
                    this.addInfo.lineName = item.name;
                    this.addInfo.lineId = item.id;
                }
                this.showPanel = false;
                this.showSearch = false;
            },
            async handleChange () {
                if (!this.searchModel) {
                    this.list = [];
                    return;
                }
                try {
                    let result = {};
                    if (this.type === 'vin') {
                        result = await getByVin({vin: this.searchModel});
                    } else if (this.type === 'driver') {
                        result = await queryDriverList({customerId: this.userInfo.fleetId, nameOrPhone: this.searchModel});
                    } else {
                        result = await getLineList({lineName: this.searchModel});
                    }
                    this.list = result.data || [];
                    this.filterList();
                    this.showPanel = true;
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleRemove (item) {
                this.addInfo.driverList.forEach((child, index) => {
                   if (child.id === item.id) {
                       this.addInfo.driverList.splice(index, 1);
                       if (this.addInfo.defaultDriverId === child.id) {
                           this.addInfo.defaultDriverId = null;
                           this.addInfo.defaultDriverName = '';
                           this.addInfo.defaultDriverPhone = '';
                       }
                   }
                });
            },
            handleAuthority (item) {
                if (item.id === this.addInfo.defaultDriverId) {
                    return;
                }
                this.addInfo.defaultDriverId = item.id;
                this.addInfo.defaultDriverName = item.name;
                this.addInfo.defaultDriverPhone = item.phone;
            },
            handleCancel () {
                this.showSearch = false;
                this.searchModel = '';
                this.showPanel = false;
                this.list = [];
                if (this.type === 'line') {
                    this.addInfo.lineName = '';
                }
            },
            handleToggle (target) {
                this[target] = !this[target];
            },
            // search 取消
            onCancel () {
                this.showSearch = false;
                this.$refs.search.setBlur();
            },
            // 获取行驶证
            getRunLicense (file, next) {
                this.uploadService('runLicense', file, next);
            },
            // 获取运输许可证
            getTransportLicense (file, next) {
                this.uploadService('transportLicense', file, next);
            },
            // 获取保单
            getPolicy (file, next) {
                this.uploadService('policy', file, next);
            },
            async uploadService (type, file, next) {
                try {
                    let result = '';
                    let formData = new FormData();
                    formData.append('file', file);
                    switch (type) {
                        case 'policy':
                            result = await uploadFileToPolicy(formData);
                            this.addInfo.policy = result.data.filePath;
                            break;
                        case 'runLicense':
                            result = await uploadFileToRunLicense(formData);
                            this.addInfo.runLicense = result.data.filePath;
                            break;
                        case 'transportLicense':
                            result = await uploadFileToTransportLicense(formData);
                            this.addInfo.transportLicense = result.data.filePath;
                            break;
                    }
                    next();
                    console.log('文件上传', result);
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                    next();
                }
            },
            filterList () {
                this.list = this.list.filter(item => {
                    if (this.type === 'vin') {
                        return item.vin !== this.addInfo.vin;
                    } else if (this.type === 'driver') {
                        return this.addInfo.driverList.find(child => child.id === item.id) === undefined;
                    } else {
                        return this.addInfo.lineName !== item.name;
                    }
                });
            }
        }
    };
</script>
