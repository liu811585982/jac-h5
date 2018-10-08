/**
 * 作者：yeshengqiang
 * 时间：2018-06-11
 * 描述：故障历史
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .faultHistory-panel {
        flex: 1;
        @include flex(stretch);
        overflow: hidden;
        .section-body {
            flex: 1;
            -webkit-flex: 1;
            position: relative;
            overflow: hidden;
            .section-body-scroller {
                position: absolute;
                @include wh(100%, 100%);
                overflow: auto;
                .list-box {
                    padding: px2rem(15) px2rem(10);
                    .list-box-item {
                        padding: px2rem(15);
                        margin-bottom: px2rem(15);
                        background-color: $white;
                        border: 1px solid #EEEEEE;
                        .list-item-title {
                            font-size: px2rem(30);
                            font-weight: 500;
                            padding-top: px2rem(10);
                            padding-bottom: px2rem(15);
                            margin-bottom: px2rem(20);
                            color: #000000;
                            border-bottom: 1px solid #EEEEEE;
                            span {
                                &.back-right {
                                    display: block;
                                    float: right;
                                    // transform: rotate(180deg);
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
                            .content-p {
                                flex: 1;
                                -webkit-flex: 1;
                                color: #6D7C8B;
                                @include ellipsis;
                                span {
                                    vertical-align: middle;
                                }
                                .vin-color {
                                    color: #DE4041;
                                    font-weight: 500;
                                }
                                .color-origin {
                                    color: #F39901;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="faultHistory-panel">
        <section class="section-body">
            <div class="section-body-scroller">
                <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore"
                    @on-pulldown-loading="refresh"
                    :pulldown-config="$store.state.pulldownDefaultConfig"
                    :pullup-config="$store.state.pullupDefaultConfig"
                    ref="scroller" height="100%">
                    <ul class="list-box">
                        <li class="list-box-item" @click="handleDetail(item)" v-for="(item, index) in list" :key="index">
                            <h3 class="list-item-title">
                                {{item.plateNo}}
                                <span class="back-right">
                                    <span>{{item.phyExamTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                                </span>
                            </h3>
                            <div class="list-item-content">
                                <p class="content-p">
                                    <span>故障数量:</span>
                                    <span class="vin-color">{{item.faultCount}}</span>
                                </p>
                            </div>
                        </li>
                        <transition name="fade">
                            <li v-show="!list.length" class="no-data-tip">
                                <div class="text">暂无数据</div>
                            </li>
                        </transition>
                    </ul>
                </scroller>
            </div>
        </section>
    </div>
</template>
<script>
    import list from '@/mixins/list';
    import userInfo from '@/mixins/userInfo';
    import { Scroller } from 'vux';
    import { setStore } from '@/libs/utils';
    import { getFaultsHistory } from '@/services/carCheckup/carCheckup';

    export default {
        mixins: [ list, userInfo ],
        components: { Scroller },
        methods: {
            // 详情
            handleDetail (item) {
                setStore('fault__detail', JSON.stringify(item));
                this.$router.push('/main/carCheckup/faultQuery/faultDetail');
            },
            async _getList () {
                if (this.userInfo.defaultVin) {
                    await this.getUserInfo();
                }
                const result = await getFaultsHistory({...this.searchData, vin: this.userInfo.defaultVin});
                return result.data;
            }
        }
    };
</script>
