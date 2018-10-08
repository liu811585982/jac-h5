/**
 * 作者：yeshengqiang
 * 时间：2018-03-27
 * 描述：日历控件
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    $calendar_color: #7F8C9A;

    .hy-calendar-panel {
        padding-top: px2rem(40);
        .hy-calendar-title {
            color: #000000;
            font-size: px2rem(36);
            line-height: px2rem(56);
            font-weight: 600;
            text-align: center;
        }
        .hy-calendar-body {
            margin-bottom: px2rem(80);
            .hy-calendar-table {
                padding: 0 px2rem(10);
                margin: 0 auto;
                .hy-calendar-row {
                    .hy-calendar-col {
                        padding: px2rem(15);
                        .hy-calendar-item {
                            @include wh(px2rem(64), px2rem(64));
                            text-align: center;
                            line-height: px2rem(64);
                            font-size: px2rem(28);
                            color: $calendar_color;
                            background-color: transparent;
                            @include borderRadius(100%);
                            &.on {
                                color: $white;
                                background-color: $global_color;
                            }
                            &.empty {
                                background-color: transparent;
                            }
                        }
                    }
                }
            }
        }
        .hy-calendar-footer {
            .footer-tips {
                text-align: center;
                span {
                    position: relative;
                    display: inline-block;
                    background-color: $global_color;
                    color: $white;
                    padding: px2rem(10) px2rem(100);
                    font-size: px2rem(30);
                    border-radius: px2rem(32);
                    img.sign-logo {
                        position: absolute;
                        display: inline-block;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: px2rem(64);
                        height: px2rem(64);
                        border-radius: 100%;
                        border: 1px solid $global_color;
                    }
                }
                a.button {
                    color: $white;
                    display: inline-block;
                    background-color: $global_color;
                    font-size: px2rem(30);
                    padding: px2rem(16) px2rem(30);
                    @include borderRadius(px2rem(10));
                }
            }
        }
    }
</style>
<template>
    <div class="hy-calendar-panel">
        <h3 class="hy-calendar-title">{{calendarTitle}}</h3>
        <div class="hy-calendar-body">
            <table class="hy-calendar-table" cellspacing="0" cellpadding="0">
                <tr class="hy-calendar-row" v-for="row in rowNumber" :key="row">
                    <td class="hy-calendar-col" v-for="(col, index) in dayList[row - 1]" :key="index">
                        <div class="hy-calendar-item" :class="classes(col)">{{col}}</div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="hy-calendar-footer">
            <div class="footer-tips">
                <span class="sign-title" v-show="isSign">
                    您已经连续签到{{continuous}}天
                    <img class="sign-logo" src="../../assets/images/logo.png" alt="logo" />
                </span>
                <a @click="handlerMark" class="button" v-show="!isSign" href="javascript: void(0);">{{signText}}</a>
            </div>
        </div>
    </div>
</template>
<script>
    import { unique, compare, maxContinuousLengthformEnd } from '@/libs/utils';

    export default {
        name: 'hyCalendar',
        data () {
            return {
                colNumber: 7,           // 一排展示7个
                blankSpace: 2,          // 起始空格数
                currentList: [],
                isSign: false           // 是否已经签到
            };
        },
        props: {
            yearFormat: [String, Number],
            monthFormat: [String, Number],
            markList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        computed: {
            date () {
                const now = new Date();
                const year = this.yearFormat || now.getFullYear();
                const month = this.monthFormat || (now.getMonth() + 1);
                const date = new Date(year, month - 1, 1, 0, 0, 0, 0);
                return date;
            },
            calendarTitle () {
                return `${this.date.getFullYear()}年${this.date.getMonth() + 1}月`;
            },
            // 当前月天数
            m_days () {
                const date = this.date;
                const totalDays = [31, 28 + this.is_leap(date.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                return totalDays[date.getMonth()];
            },
            // 多少排
            rowNumber () {
                return Math.ceil((this.m_days + this.blankSpace) / this.colNumber);
            },
            dayList () {
                let list = [];
                let i = 0;
                let markIndex = 0;
                // 生成二维数组
                i = this.rowNumber;
                while (i--) {
                    list[i] = new Array(this.colNumber);
                }
                // 第一行
                i = this.blankSpace;
                while (i < this.colNumber) {
                    list[0][i] = ++i - this.blankSpace;
                    markIndex++;
                }
                // 其他行
                for (i = 1; i < this.rowNumber; i++) {
                    for (let j = 0; j < this.colNumber; j++) {
                        if (markIndex++ < this.m_days) {
                            list[i][j] = markIndex;
                        }
                    }
                }
                return list;
            },
            // 总共多少天
            total () {
                return this.currentList.length;
            },
            // 连续多少天
            continuous () {
                return maxContinuousLengthformEnd(this.currentList);
            },
            // 签到积分 第一天3分，第二天5分，后面连续都是7分
            getScore () {
                let score = 0;
                if (!this.continuous) return 0;
                switch (this.continuous) {
                    case 1 :
                        score = 3;
                        break;
                    case 2:
                        score = 5;
                        break;
                    default :
                        score = 7;
                        break;
                }
                return score;
            },
            // 签到字体
            signText () {
                return !this.isSign ? '签到' : '已签到';
            }
        },
        mounted () {
            this.updateList();
        },
        methods: {
            // 是否是闰年
            is_leap (year) {
                return year % 100 === 0
                            ? (year % 400 === 0 ? 1 : 0)
                            : (year % 4 === 0 ? 1 : 0);
            },
            classes (val) {
                if (!val) return 'empty';
                if (this.currentList.some(item => +item === val)) return 'on';
            },
            updateList () {
                this.currentList = unique(this.markList.concat([])).sort(compare());
                this.isSign = +this.currentList[this.currentList.length - 1] === new Date().getDate();
            },
            // 签到
            handlerMark () {
                if (this.isSign) return;
                let now = new Date().getDate();
                let dateList = this.currentList = this.currentList.concat([now]);
                this.$emit('update:markList', dateList);
                this.$emit('signChange', this.continuous, this.handlerNext);
            },
            // 下一步
            handlerNext () {
                this.isSign = true;
            }
        },
        watch: {
            markList: {
                deep: true,
                handler: function (val) {
                    this.updateList();
                }
            }
        }
    };
</script>
