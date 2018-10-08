/**
 * 作者：yeshengqiang
 * 时间：2017-08-30
 * 描述：滑门
 */
<style lang="scss" scoped>
    .hy-slide {
        width: 100%;
        height: 100%;
        background: transparent;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        &.hy-slide--fixed {
            position: fixed;
        }
        &.hy-slide--absolute {
            position: absolute;
        }
        .hy-slide-main {
            position: absolute;
            z-index: 3001;
            width: 100%;
            background: #FFF;
            &.hy-slide_right,
            &.hy-slide_left,
            &.hy-slide_top {
                top: 0;
            }
            &.hy-slide_right {
                right: 0;
                height: 100%;
            }
            &.hy-slide_left {
                left: 0;
                height: 100%;
            }
            &.hy-slide_top {
                height: auto;
            }
            &.hy-slide_bottom {
                bottom: 0;
                height: auto;
            }
            .hy-slide-header {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                line-height: 1;
                white-space: nowrap;
                cursor: pointer;
                background: #5faee3;
                margin: 0;
                font-size: 14px;
                height: 45px;
                padding: 15px;
                color: #FFFFFF;
            }
            .hy-slide-body {
                width: 100%;
                height: 100%;
            }
        }
    }
    button.closed {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        font-size: 26px;
        font-weight: 500;
        line-height: 1;
        color: #FFFFFF;
        text-shadow: 0 1px 0 #000;
        filter: alpha(opacity=60);
        opacity: .6;
        -webkit-appearance: none;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
        &:hover {
            color: #FFFFFF;
            text-decoration: none;
            cursor: pointer;
            filter: alpha(opacity=80);
            opacity: .8;
        }
    }
    // 遮罩层
    .hy-slide-modal {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3000;
        background: rgba(0, 0, 0, 0.3);
    }
</style>
<template>
    <transition name="fade">
        <div :class="classes" v-show="value" key="modal">
            <div class="hy-slide-modal" v-if="modalAble" @click.self="handlerCancel()"></div>
            <transition :name="transition">
                <div :class="[`${prefixCls}-main`, `${prefixCls}_${placement}`]" :style="styles" v-show="slideShow" key="main">
                    <slot name="header"></slot>
                    <div class="hy-slide-body">
                        <slot>
                            <!-- 内容部分 -->
                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
    const prefixCls = 'hy-slide';
    function oneOf (val, arr) {
        let item = arr.filter(item => item === val);
        return !!item.length;
    }

    export default {
        name: 'hySlide',
        data () {
            return {
                prefixCls: prefixCls,
                slideShow: false
            };
        },
        props: {
            value: Boolean,
            fixed: {
                type: Boolean,
                default: true
            },
            modalAble: {
                type: Boolean,
                default: true
            },
            modalCloseAble: {
                type: Boolean,
                default: true
            },
            placement: {
                validator (val) {
                    return oneOf(val, ['right', 'left', 'top', 'bottom']);
                },
                default: 'right'
            },
            transition: String,
            styles: {
                type: Object,
                default () {
                    return {};
                }
            }
        },
        mounted () {
            if (!this.fixed) {
                this.$el.parentNode.style.position = 'relative';
            }
            this.$nextTick(() => {
                this.slideShow = this.value;
            });
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}--fixed`]: this.fixed,
                        [`${prefixCls}--absolute`]: !this.fixed
                    }
                ];
            }
        },
        watch: {
            value (val) {
                this.slideShow = val;
                if (!val) {
                    this.$emit('close');
                }
            }
        },
        methods: {
            handlerClose () {
                this.$emit('input', false);
            },
            handlerCancel () {
                if (!this.modalCloseAble) return;
                this.handlerClose();
            }
        }
    };
</script>
