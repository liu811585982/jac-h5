<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .panel {
        @include wh(100%, 100%);
        display: flex;
        display: -webkit-flex;
        overflow: hidden;
        background: $white;
        -webkit-align-items: stretch;
        -webkit-flex-flow: column nowrap;
        align-items: stretch;
        flex-flow: column nowrap;
        padding-top: 2rem;
        .hd-panel {
            width: 100%;
            height: px2rem(310);
            padding: px2rem(25);
            @include bg-image('../../../../assets/images/score_header');
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            color: $white;
            .title {
                display: flex;
                display: -webkit-flex;
                height: 100%;
                padding: px2rem(5);
                font-size: px2rem(44);
                align-items: center;
                span {
                    font-size: px2rem(68);
                    font-weight: bold;
                }
            }
        }
        .bd-panel {
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: stretch;
            -webkit-flex-flow: column nowrap;
            align-items: stretch;
            flex-flow: column nowrap;
            font-size: px2rem(30);
            font-weight: 800;
            .hd {
                // height: 1.92rem;
                // line-height: 1.92rem;
                padding: 0 px2rem(30);
                background-color: #f9f9f9;
                color: #484848;
                display: flex;
                display: -webkit-flex;
                -webkit-justify-content:space-between;
                justify-content:space-between;
                .month {
                    width: 100%;
                    padding: px2rem(15) 0;
                    display: flex;
                    display: -webkit-flex;
                    align-items: center;
                    flex-flow: row nowrap;
                    -webkit-align-items: center;
                    -webkit-flex-flow: row nowrap;
                    font-size: px2rem(30);
                    .month-left {
                        flex: 1;
                        -webkit-flex: 1;
                    }
                    .month-right {
                        flex: 1;
                        -webkit-flex: 1;
                        padding: px2rem(5) px2rem(10);
                        .score-detail {
                            color: #6D7C8B;
                            span {
                                color: #F39802;
                            }
                        }
                        .calender {
                            float: right;
                        }
                    }
                }
                .total {
                    color: #9E9E9E;
                }
            }
            .bd {
                flex: 1;
                -webkit-flex: 1;
                overflow: auto;
            }
            .item {
                padding: px2rem(26) px2rem(30);
                @include border-1px(#EEEEEE);
                div {
                    font-size: px2rem(30);
                    display: flex;
                    display: -webkit-flex;
                    -webkit-justify-content:space-between;
                    justify-content:space-between;
                    .item-name {
                        color: #585858;
                    }
                    .item-score {
                        color: #000000;
                    }
                }
                .date {
                    margin-top: px2rem(26);
                    font-size: px2rem(22);
                    color:#A4A4A4;
                }
            }
            .noData {
                color: #A4A4A4;
                font-size: 100%;
                text-align: center;
            }
        }
    }

</style>
<template>
  <div class="panel">
        <!-- 头部 -->
        <hy-header fixed :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="hd-panel">
            <div class="title">
                我的积分：<span class="scroe">{{totalRecode}}</span>
            </div>
        </div>
        <div class="bd-panel">
            <div class="hd">
                <div class="month">
                    <div class="month-left">
                        <h3 class="month-title">{{monthTitle}}</h3>
                    </div>
                    <div class="month-right" @click="selectDate">
                        <span class="score-detail">获取：<span>{{sumScore}}</span></span>
                        <svg-icon type="calendar" class="calender"></svg-icon>
                    </div>
                </div>
                <!-- <div class="total">
                    <div class="get-score">
                        本月总积分：<span>{{currentMonthScore}}</span>
                    </div>
                    <div class="use-score">
                        使用积分：<span>{{currentConsumePoint}}</span>
                    </div>
                </div> -->
            </div>
            <div class="bd">
                <div class="item border-1px" v-for="(item, index) in list" :key="index">
                    <div>
                        <span class="item-name">{{item.item}}</span>
                        <span class="item-score">+{{item.point}}</span>
                    </div>
                    <div class="date">{{item.createTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</div>
                </div>
                <div class="item border-1px noData" v-show="!list.length">
                    暂无数据
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { toISOString, formateDate } from '@/libs/utils';
    import { getScoreRecord } from '@/services/userCenter/userCenter';

    export default {
        data () {
            return {
                changeValue: formateDate(new Date(), 'yyyy-MM'),
                currentValue: formateDate(new Date(), 'yyyy-MM'),
                list: [],
                sumScore: 0
            };
        },
        computed: {
            ...mapState([
                'totalRecode'
            ]),
            monthTitle () {
                let nowMonth = new Date().getMonth() + 1;
                if (nowMonth < 10) {
                    nowMonth = '0' + nowMonth;
                } else {
                    nowMonth = '' + nowMonth;
                }
                let month = this.changeValue.replace(/(?:.*?)(\d+)$/, '$1');
                return nowMonth === month
                            ? '本月'
                            : this.changeValue;
            },
            // 消费积分
            currentConsumePoint () {
                if (!this.list.length) return 0;
                return this.list[0].consumePoint;
            },
            // 当月总积分
            currentMonthScore () {
                if (!this.list.length) return 0;
                return this.list[0].totalPoint;
            }
        },
        mounted () {
            if (!this.totalRecode) {
                this.getTotalRecode();
            }
            this.getScoreRecord();
        },
        methods: {
            ...mapActions([
                'getTotalRecode'
            ]),
            // 获取积分记录
            async getScoreRecord (param) {
                try {
                    const result = await getScoreRecord(param || null);
                    this.list = result.data;
                    this.sumScore = 0;
                    for (const score of this.list) {
                        this.sumScore += score.point;
                    }
                } catch (e) {
                    this.$toast({
                        message: e.message,
                        position: 'bottom'
                    });
                }
            },
            // 选择时间
            selectDate () {
                this.$vux.datetime.show({
                    cancelText: '取消',
                    confirmText: '确定',
                    format: 'YYYY-MM',
                    value: this.currentValue,
                    onConfirm: this.handleChange
                });
            },
            handleChange (val) {
                this.changeValue = val;
                this.getScoreRecord({queryDate: toISOString(val)});
            }
        }
    };
</script>
