/**
 * 作者：yeshengqiang
 * 时间：2018-07-17
 * 描述：新增线路管理
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .page-panel {
        @include wh(100%, 100%);
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
        /deep/ .weui-cell__ft {
            padding-right: 13px;
        }
        /deep/ .weui-input {
            color: #999999;
        }
    }
    .mb-25 {
        margin-bottom: 25px;
    }
    .toolbox {
        width: 80%;
        margin: px2rem(50) auto 0;
    }
    .label {
        position: relative;
        width: 5em;
        margin-right: 2em;
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
</style>
<template>
    <div class="page-panel">
        <!-- 头部 -->
        <hy-header :title="`${title}${$route.meta.title}`" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <view-box ref="viewBox">
            <!-- 搜索部分 -->
            <div class="search-container" v-show="showSearch">
                <search-group focus v-model="searchModel" :showPanel="showPanel" @change="getResult" :showSearch="showSearch" @onCancel="handleCancel"
                    placeholder="请输入地址">
                    <div class="search-list">
                        <div class="search-item" v-for="item in list" :key="item.id" @click="resultClick(item)">
                            <div class="search-item-content">
                                <span class="title">{{item.name}}</span>
                                <p class="value">{{item.district}}{{item.address | address}}</p>
                            </div>
                        </div>
                    </div>
                </search-group>
                <div class="mask" @click="handleCancel"></div>
            </div>
            <group label-width="5em" label-margin-right="2em">
                <x-input :show-clear="false" text-align="right" placeholder-align="right" placeholder="如:武汉-长沙" :max="18" v-model="addInfo.lineName">
                    <div class="label" slot="label"><span class="required">*</span><span>线路名称</span></div>
                </x-input>
                <x-input :show-clear="false" text-align="right" placeholder-align="right" placeholder="请输入" :max="50" v-model="addInfo.lineCode">
                    <div class="label" slot="label"><span class="required">&nbsp;</span><span>线路编码</span></div>
                </x-input>
                <cell @click.native="handleChoose('start')" is-link value-align="left" :value="addInfo.startAddress">
                    <div class="label" slot="title"><span class="required">*</span><span>出发地</span></div>
                </cell>
                <cell title="目的地" @click.native="handleChoose('end')" is-link value-align="left" :value="addInfo.endAddress">
                    <div class="label" slot="title"><span class="required">*</span><span>目的地</span></div>
                </cell>
            </group>
            <div class="toolbox">
                <x-button type="warn" @click.native="handleSave()">保存</x-button>
            </div>
        </view-box>
    </div>
</template>
<script>
    import regMap from '@/libs/regMap';
    import initMap from '@/libs/amap.js';
    import { searchGroup } from '@/components';
    import { getCurrentLocation } from '@/libs/location';
    import { lineCreate, lineUpdate, lineDetail } from '@/services/lineManage/lineManage';
    import { ViewBox, Group, Cell, debounce, XInput, PopupPicker, Datetime, XButton, Popup } from 'vux';

    export default {
        components: { ViewBox, searchGroup, Group, Cell, XInput, PopupPicker, Datetime, XButton, Popup },
        data () {
            return {
                type: '',
                regionData: [],
                showSearch: false,
                showPanel: false,
                searchModel: '',
                list: [],
                pickerValue: [],
                addInfo: {}
            };
        },
        computed: {
            title () {
                return this.$route.query.id
                                ? '编辑'
                                : '新增';
            }
        },
        created () {
            this._initMap();
            if (this.$route.query.id) {
                this._getDetail();
            }
            this.getResult = debounce(this.handleChange, 500);
        },
        methods: {
            async _initMap () {
                try {
                    await initMap.load();
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            async handleChange (val) {
                if (!val) {
                    this.list = [];
                    return;
                }
                if (!this.autoComplete) {
                    // 获取城市code
                    const result = await this._getCityCode();
                    this.autoComplete = new window.AMap.Autocomplete({
                        city: result.regeocode.addressComponent.citycode
                    });
                }
                this.autoComplete.search(val, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        this.list = result.tips;
                        this.showPanel = true;
                    } else {
                        this.$toast({
                            message: '未查询到数据！',
                            position: 'bottom'
                        });
                    }
                });
            },
            // 获取当前城市
            _getCityCode () {
                return new Promise(async (resolve, reject) => {
                    const pos = await getCurrentLocation();
                    const geocoder = new window.AMap.Geocoder();
                    geocoder.getAddress([pos.longitude, pos.latitude], (status, result) => {
                        if (status === 'complete' && result.info === 'OK') {
                            resolve(result);
                        } else {
                            alert(1);
                        }
                    });
                });
            },
            handleChoose (str) {
                this.type = str;
                this.showSearch = true;
                this.list = [];
                this.searchModel = this.addInfo[`${this.type}Address`] || '';
            },
            resultClick (item) {
                let address = '';
                if (item.address instanceof Array) {
                    address = '';
                } else {
                    address = item.address;
                }
                this.addInfo[`${this.type}Address`] = item.district + address;
                this.addInfo[`${this.type}Lat`] = item.location.lat;
                this.addInfo[`${this.type}Lng`] = item.location.lng;
                this.handleCancel();
            },
            handleCancel () {
                this.showSearch = false;
                this.searchModel = '';
                this.showPanel = false;
                this.list = [];
            },
            // 查询详情
            async _getDetail (param) {
                try {
                    const result = await lineDetail({id: this.$route.query.id});
                    this.addInfo = result.data;
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            async handleSave () {
                if (!this.addInfo.lineName) {
                    this.$toast({
                        message: '请输入线路名称',
                        position: 'bottom'
                    });
                    return;
                }
                if (!this.addInfo.startAddress) {
                    this.$toast({
                        message: '请输入出发地',
                        position: 'bottom'
                    });
                    return;
                }
                if (!this.addInfo.endAddress) {
                    this.$toast({
                        message: '请输入目的地',
                        position: 'bottom'
                    });
                    return;
                }
                if (regMap.emoji.test(this.addInfo.lineName) || regMap.emoji.test(this.addInfo.lineCode)) {
                    this.$toast({
                        message: '不允许输入表情',
                        position: 'bottom'
                    });
                    return;
                }
                try {
                    this.$indicator.open('正在保存');
                    let fn = null;
                    if (this.$route.query.id) {
                        fn = lineUpdate;
                    } else {
                        fn = lineCreate;
                    }
                    await fn(this.addInfo);
                    this.$toast({
                        message: '保存成功',
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
            }
        },
        filters: {
            address (val) {
                if (val instanceof Array) {
                    return '';
                }
                return val;
            }
        }
    };
</script>
