<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .section-panel {
        @include wh(100%, 100%);
        @include flex(stretch);
        .section-body {
            flex: 1;
            @include flex(stretch, column nowrap);
            .search-bar {
                display: flex;
                display: -webkit-flex;
                -webkit-align-items: center;
                -webkit-flex-flow: row nowrap;
                align-items: center;
                flex-flow: row nowrap;
                background-color: $white;
                overflow: hidden;
                @include border-b-1px(#DDDDDD);
                a.search-btn {
                    position: relative;
                    flex: 1;
                    display: flex;
                    display: -webkit-flex;
                    -webkit-align-items: center;
                    -webkit-justify-content: center;
                    -webkit-flex-flow: row nowrap;
                    align-items: center;
                    justify-content: center;
                    flex-flow: row nowrap;
                    height: px2rem(72);
                    line-height: px2rem(72);
                    vertical-align: middle;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: px2rem(28);
                    text-align: center;
                    color: rgba(51,51,51,0.8);
                    .triangle {
                        transition: transform 0.3s;
                        margin-left: px2rem(5);
                        display: inline-block;
                        vertical-align: middle;
                        font-size: px2rem(10);
                        color: currentColor;
                        transform: rotate(180deg);
                    }
                    &.search-selected {
                        color: #EB8C8D;
                    }
                    &.search-rotate {
                        .triangle {
                            transform: rotate(0deg);
                        }
                    }
                }
            }
            .section-scroller-body {
                flex: 1;
                overflow: hidden;
                .list-box {
                    padding: px2rem(15) px2rem(10);
                    overflow: hidden;
                    .list-content {
                        @include flex(stetch, row nowrap);
                        padding: px2rem(20) px2rem(15);
                        margin-bottom: px2rem(15);
                        background: $white;
                        .list-content-left {
                            flex: 0 0 px2rem(125);
                            .mark {
                                width: px2rem(105);
                                height: px2rem(105);
                                line-height: px2rem(105);
                                text-align: center;
                                font-size: px2rem(70);
                                border-radius: px2rem(10);
                                background-color: #F87E4F;
                            }
                        }
                        .list-content-right {
                            flex: 1;
                            padding-top: px2rem(10);
                            font-size: px2rem(28);
                            .content-p {
                                margin-bottom: px2rem(15);
                                &:first-child {
                                    font-weight: 600;
                                }
                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                            .label {
                                color: #6D7C8B;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header_nav_inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="search-bar">
                <a class="search-btn" :class="{ 'search-selected': searchData.year, 'search-rotate': searchIndex === 'year' && this.showPicker }" href="javascript: void(0);" @click="handleClick('year')">
                    {{searchData.year}}
                    <span class="triangle">
                    <svg-icon type="triangle"></svg-icon>
                </span>
                </a>
                <a class="search-btn" :class="{ 'search-selected': searchData.month, 'search-rotate': searchIndex === 'month' && this.showPicker }" href="javascript: void(0);" @click="handleClick('month')">
                    {{searchData.month}}
                    <span class="triangle">
                    <svg-icon type="triangle"></svg-icon>
                </span>
                </a>
            </div>
            <div class="section-scroller-body">
                <scroller lock-x scrollbar-y ref="scroller" height="100%">
                    <div class="list-box">
                        <swipeout>
                            <swipeout-item v-for="(item, index) in list" :key="index" transition-mode="follow">
                                <div slot="content"  class="list-content" @click="handleDetail">
                                    <div class="list-content-left">
                                        <div class="mark">
                                            <svg-icon type="truck_icon"></svg-icon>
                                        </div>
                                    </div>
                                    <div class="list-content-right">
                                        <div class="content-p">{{item.plateNo}}</div>
                                        <div class="content-p">
                                            <span class="label">月报时间：</span>
                                            <span class="value">{{item.reportTime}}</span>
                                        </div>
                                    </div>
                                </div>
                            </swipeout-item>
                        </swipeout>
                        <transition name="fade">
                            <div v-show="!list.length" class="no-data-tip">
                                <div class="text">暂无数据</div>
                            </div>
                        </transition>
                    </div>
                </scroller>
            </div>
        </div>
        <popup-picker :data="pickerData" v-model="pickerValue" ref="picker" :showCell="false" :show="showPicker" @on-hide="handlePickerHide" @on-change="handleChange"></popup-picker>
    </div>
</template>

<script>
    import { Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XInput, PopupPicker } from 'vux';
    import userInfo from '@/mixins/userInfo';
    import { getVehicleInfoByVin } from '@/services/carManagement/carManagement';

    export default {
        name: 'goodsMap',
        mixins: [userInfo],
        components: {Scroller, Spinner, Swipeout, SwipeoutItem, SwipeoutButton, XInput, PopupPicker},
        data () {
            return {
                searchIndex: 'month',
                searchData: {},
                pickerValue: [],
                showPicker: false,
                yearArray: [],
                list: [],
                vehicle: {},
                currentDate: ''
            };
        },
        computed: {
            pickerData () {
                switch (this.searchIndex) {
                    case 'year':
                        return this.yearArray;
                    case 'month':
                        return [['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']];
                }
            }
        },
        async created () {
            if (!this.userInfo.id) {
                await this.getUserInfo();
            }
            await this.getVehicleInfo(this.userInfo.defaultVin);
            this.generateYearArray();
        },
        methods: {
            generateYearArray () {
                const date = new Date();
                date.setMonth(date.getMonth() - 1);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const yearArray = [];
                this.searchData.year = String(year);
                this.searchData.month = month < 10 ? '0' + month : String(month);
                this.currentDate = this.searchData.year + '-' + this.searchData.month;
                for (let i = 0; i < 20; i++) {
                    yearArray.push(String(year - i));
                }
                this.yearArray = [yearArray];
                this._getList();
            },
            handleClick (index) {
                this.searchIndex = index;
                this.pickerValue = [this.searchData[index]];
                this.showPicker = true;
            },
            handlePickerHide () {
                this.showPicker = false;
            },
            handleChange (value) {
                const tempData = JSON.parse(JSON.stringify(this.searchData));
                tempData[this.searchIndex] = value[0];
                const dateStr = tempData.year + '-' + tempData.month;
                if (dateStr > this.currentDate) {
                    this.$toast({
                        message: '日期不能超出上月时间',
                        position: 'bottom'
                    });
                    return;
                }
                this.searchData[this.searchIndex] = value[0];
                this._getList();
            },
            _getList () {
                const report = {
                    plateNo: this.vehicle.plateNo,
                    reportTime: this.searchData.year + '年' + parseInt(this.searchData.month) + '月'
                };
                this.list = [report];
            },
            async getVehicleInfo (vin) {
                try {
                    this.$indicator.open();
                    const result = await getVehicleInfoByVin({vin: vin});
                    this.$indicator.close();
                    this.vehicle = result.data || {};
                } catch (e) {
                    this.$indicator.close();
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            handleDetail () {
                this.$router.push({path: '/main/driveReport/detail', query: {vin: this.userInfo.defaultVin, date: this.searchData.year + '-' + this.searchData.month}});
            }
        }
    };
</script>
