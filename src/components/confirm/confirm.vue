/**
* 确认提示框
*/
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .confirm-box {
        .confirm-mask {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.6);
        }
        .confirm-content {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 10001;
            background: $white;
            transform: translate(-50%, -50%);
            border-radius: px2rem(15);
            .confirm-body {
                padding: px2rem(46) px2rem(40);
            }
            .confirm-footer {
                @include flex(center, row nowrap);
                border-top: 1px solid #EEEEEE;
                min-width: px2rem(607);
                .confirm-box-btn {
                    flex: 1;
                    font-size: px2rem(36);
                    line-height: px2rem(89);
                    text-align: center;
                    border-right: 1px solid #EEEEEE;
                    &:last-child {
                        border-right: none;
                    }
                }
                .confirm-box-btn-default {
                    color: #399EFF;
                }
                .confirm-box-btn-disabled {
                    color: #949FAA;
                }
            }
        }
    }
    .confirm-fade-enter, .confirm-fade-leave-to {
        transform: scale(0);
    }
    .confirm-fade-enter-active {
        animation: bounce-in .5s;
    }
    .confirm-fade-leave-active {
        animation: bounce-out .5s;
    }
    @keyframes bounce-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes bounce-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>

<template>
    <div class="confirm-box" tabindex="-1" role="dialog"  aria-labelledby="bombConfirmLabel" aria-hidden="false">
        <div class="confirm-mask" v-show="show"></div>
        <transition name="confirm-fade">
            <div class="confirm-content" v-show="show">
                <div class="confirm-title">
                    <slot name="title"></slot>
                </div>
                <div class="confirm-body">
                    <slot name="body"></slot>
                </div>
                <div class="confirm-footer">
                    <span class="confirm-box-btn confirm-box-btn-default" @click="handleCancel" v-if="showCancelBtn">{{cancelText}}</span>
                    <span class="confirm-box-btn" :class="`confirm-box-btn-${confirmType}`" @click="handleConfirm" v-if="showConfirmBtn">{{confirmText}}</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'confirm',
        props: {
            value: {
                type: Boolean,
                required: true
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            confirmText: {
                type: String,
                default: '确认'
            },
            confirmType: {
                type: String,
                default: 'default'
            },
            confirmBtnDisabled: {
                type: Boolean,
                default: false
            },
            showCancelBtn: {
                type: Boolean,
                default: true
            },
            showConfirmBtn: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                show: false
            };
        },
        watch: {
            value (val) {
                this.show = val;
            }
        },
        methods: {
            handleCancel () {
                this.show = false;
                this.$emit('input', false);
            },
            handleConfirm () {
                if (this.confirmType === 'disabled') {
                    return;
                }
                this.show = false;
                this.$emit('input', false);
                this.$emit('on-confirm');
            }
        }
    };
</script>
