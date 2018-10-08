/**
 * 作者：yeshengqiang
 * 时间：2018-08-06
 * 描述：进度条
 */
<style lang="scss" scoped>
    @import 'src/scss/mixins';
    $baseColor: #dba8af !default;
    .progress-panel {
        @include wh(100%, auto);
        .progress__bar {
            @include wh(100%, 13px);
            position: relative;
            margin-bottom: 5px;
            background-color: #EBEBEB;
            .progress__inner_bar {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background-color: transparent;
                .inner__bar {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background-color: $baseColor;
                }
            }
            .progress__inner_tips {
                position: absolute;
                top: 50%;
                left: 0;
                margin: -11px 0 0 -17.5px;
                .progress__tips {
                    width: 25px;
                    height: 25px;
                    border-radius: 100%;
                    background-color: $baseColor;
                    border: 5px solid #FFFFFF;
                    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.125);
                }
            }
        }
        .time-tips {
            text-align: right;
            font-size: 16px;
            color: #333333;
            .time-start {
                color: $baseColor;
            }
            .time-end {
                color: currentColor;
            }
        }
    }
</style>
<template>
    <div class="progress-panel">
        <div class="progress__bar" ref="progress">
            <div class="progress__inner_bar">
                <div class="inner__bar" :style="styles"></div>
            </div>
            <!-- 提示球 -->
            <div class="progress__inner_tips" :style="styles">
                <div class="progress__tips"></div>
            </div>
        </div>
        <div class="time-tips">
            <span class="time-start">{{now | timeFormat}}</span> / <span class="time-end">{{duration | timeFormat}}</span>
        </div>
    </div>
</template>
<script>
    import Count from '../animate.js';
    import { to2Num } from '@/libs/utils';

    export default {
        name: 'vueProgress',
        props: {
            duration: {
                type: Number,
                default: 3000,
                required: true
            },
            percent: {
                type: Number,
                validator (val) {
                    return val >= 0 && val <= 100;
                },
                default: 0
            }
        },
        data () {
            return {
                now: 0,
                width: 0
            };
        },
        computed: {
            styles () {
                let style = {};
                style.transform = `translate(${this.width}px, 0)`;
                return style;
            }
        },
        mounted () {
            this.$nextTick(() => {
                const clientRectWidth = this.$refs.progress.getBoundingClientRect().width;
                this._countup = new Count(0, 100, this.duration, (val, time) => {
                    this.now = ~~time;
                    this.width = val;
                    this.width = (val / 100) * clientRectWidth;
                    if (val === 100) {
                        this.$emit('on-change', 'complete');
                    }
                }, 'Linear');
            });
        },
        methods: {
            start () {
                this.$emit('on-change', 'start');
                this._countup.start();
            },
            // 停止
            stop () {
                this.$emit('on-change', 'stop');
                this._countup.reset();
            },
            // 暂停/恢复
            pause () {
                this._countup.pause();
                if (this._countup.isPause) {
                    this.$emit('on-change', 'pause');
                } else {
                    this.$emit('on-change', 'resume');
                }
            }
        },
        filters: {
            timeFormat (mss) {
                const hours = ~~((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = ~~((mss % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = ~~((mss % (1000 * 60)) / 1000);
                return `${to2Num(hours)}:${to2Num(minutes)}:${to2Num(seconds)}`;
            }
        },
        watch: {
            duration (val) {
                this.stop();
                this._countup.updateDuration(val);
            }
        },
        beforeDestroy () {
            this._countup.reset();
        }
    };
</script>
