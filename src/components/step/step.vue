/**
 * 作者：yeshengqiang
 * 时间：2018-06-20
 * 描述：步骤
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .steps-panel {
        @include wh(100%, auto);
        position: relative;
        z-index: 1;
        .steps__line_panel {
            position: absolute;
            top: 0;
            left: 30px;
            font-size: 0;
            @include wh(1px, 100%);
            background-color: transparent;
            .circle {
                display: inline-block;
                position: absolute;
                z-index: 1;
                left: -7px;
                @include wh(15px, 15px);
                border: 1px solid #BFC5CC;
                border-radius: 100%;
                &.start {
                    top: 0;
                    margin-top: -15px;
                }
                &.start.active {
                    border-color: #DE4041;
                }
                &.end {
                    bottom: 0;
                    margin-bottom: -15px;
                }
            }
            .steps__line {
                position: absolute;
                top: 0;
                left: 0;
                @include wh(1px, 100%);
                overflow: hidden;
                background-color: #BFC5CC;
                .steps__line_active {
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    @include wh(1px, 100%);
                    background-color: #DE4041;
                }
            }
        }
        .steps__list {
            padding-left: 60px;
            position: relative;
            .arrow {
                position: absolute;
                top: 0;
                left: 30px;
                font-size: 26px;
                transform: translate(-50%, -50%);
                display: inline-block;
            }
        }
    }
</style>
<template>
    <div class="steps-panel">
        <!-- 线 -->
        <div class="steps__line_panel">
            <em class="circle start active"></em>
            <em class="circle end"></em>
            <div class="steps__line">
                <div class="steps__line_active" :style="lineStyles"></div>
            </div>
        </div>
        <dl class="steps__list">
            <slot></slot>
            <a class="arrow" ref="arrow" :style="styles" href="javascript:void(0);">
                <svg-icon :type="iconType"></svg-icon>
            </a>
        </dl>
    </div>
</template>
<script>
    import Count from '../animate.js';

    export default {
        name: 'Step',
        props: {
            value: [Number, String],
            iconType: String
        },
        data () {
            return {
                mapChildOffset: [],            // 子集的offset
                duration: 3000,
                startValue: 0,
                endValue: 0,
                activeIndex: 0,
                top: 0,
                lineTop: 0
            };
        },
        computed: {
            lineStyles () {
                return {
                    transform: `translate(0, ${this.lineTop}px)`
                };
            },
            styles () {
                return {
                    transform: `translate(-50%, ${this.top}px)`
                };
            }
        },
        mounted () {
            this.$nextTick(() => {
                this._countup = new Count(this.startValue, this.endValue, this.duration, (val) => {
                    const mapChild = this.mapChildOffset.filter(item => val >= item.offset);
                    mapChild.forEach(item => {
                        item.vNode.active = true;
                    });
                    this.lineTop = val;
                    this.top = val - this.$refs.arrow.offsetHeight / 2;
                });
            });
            this.updateIndex();
        },
        methods: {
            findChild () {
                return this.$children.filter(item => item.$options.name === 'StepItem');
            },
            updateIndex () {
                this.$nextTick(() => {
                    const childs = this.findChild();
                    childs.forEach((item, index) => {
                        this.mapChildOffset[index] = {
                            offset: childs[index].$el.offsetTop + childs[index].$refs.title.offsetHeight / 2,
                            vNode: item
                        };
                        if (item.label === this.value) {
                            this.activeIndex = index;
                        }
                    });
                    if (this.activeIndex < 0) {
                        this.activeIndex = 0;
                    } else if (this.activeIndex > childs.length - 1) {
                        this.activeIndex = childs.length - 1;
                    }
                    const val = this.mapChildOffset[this.activeIndex].offset;
                    this._countup.update(val);
                });
            }
        },
        beforeDestroy () {
            this._countup.reset();
        },
        watch: {
            value () {
                this.updateIndex();
            }
        }
    };
</script>
