<template>
    <div class="search-group">
        <div class="search-bar">
            <div class="search-model">
                <span class="search-icon" :class="{'is-active': isActive}" @click="handleFocus">
                    <svg-icon type="header_search"></svg-icon><span v-show="!isActive">{{placeholder}}</span>
                </span>
                <span class="clear-icon" @click="handleClear" v-show="currentValue">
                        <svg-icon type="clear_icon"></svg-icon>
                    </span>
                <input type="text" ref="input" @focus="handleFocus" v-model="currentValue" />
            </div>
            <div class="search-btn" :class="{'is-active': isActive}" v-if="isActive"  @click="handleCancel">取消</div>
        </div>
        <transition name="slide-in-top">
            <div class="search-panel" v-show="showPanel">
                <div class="search-panel-content" ref="panel" :style="style">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {isDOMContains} from '@/libs/utils';
    export default {
        name: 'searchGroup',
        props: {
            focus: {
                type: Boolean,
                default: false
            },
            value: {
                required: true,
                type: String
            },
            showSearch: {
                type: Boolean,
                default: true
            },
            showPanel: {
                required: true,
                type: Boolean
            },
            placeholder: {
                type: String,
                default: '搜索'
            }
        },
        data () {
          return {
              isActive: false,
              height: 0
          };
        },
        mounted () {
            if (this.showSearch) {
                this.$nextTick(() => {
                    const rect = this.$el.getBoundingClientRect();
                    this.height = document.documentElement.clientHeight - rect.bottom - 50;
                });
            }
        },
        computed: {
            currentValue: {
                get () {
                    return this.value;
                },
                set (val) {
                    this.$emit('input', val);
                    this.$emit('change', val);
                }
            },
            style () {
                return {maxHeight: `${this.height}px`};
            }
        },
        watch: {
            value (val) {
                if ((val === '' || val === null || val === undefined) && !this.isFocus) {
                    this.handleBlur();
                } else {
                    this.handleFocus();
                }
            },
            showSearch (val) {
                if (val) {
                    window.document.addEventListener('touchmove', this.handleTouchMove, true);
                    if (!this.focus) {
                        this.handleBlur();
                    } else {
                        this.autoFocus();
                    }
                    this.$nextTick(() => {
                        const rect = this.$el.getBoundingClientRect();
                        this.height = document.documentElement.clientHeight - rect.bottom - 50;
                    });
                } else {
                    window.document.removeEventListener('touchmove', this.handleTouchMove, true);
                }
            },
            showPanel (val) {
                if (val) {
                    this.$nextTick(() => {
                        this.$refs.panel.scrollTop = 0;
                    });
                }
            }
        },
        methods: {
            autoFocus () {
                this.$nextTick(() => {
                    this.$refs.input.focus();
                    this.$refs.input.click();
                });
            },
            handleFocus () {
                this.isFocus = true;
                this.$refs.input.focus();
                this.isActive = true;
            },
            handleBlur () {
                this.isFocus = false;
                this.$refs.input.blur();
                if (this.value) {
                    this.isActive = true;
                } else {
                    this.isActive = false;
                }
            },
            handleCancel () {
                this.$refs.input.blur();
                this.isActive = false;
                this.$emit('onCancel');
            },
            handleClear () {
                this.currentValue = '';
            },
            handleTouchMove (event) {
                if (isDOMContains(this.$refs.panel, event.target)) {
                    event.stopPropagation();
                } else {
                    event.preventDefault();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    ::-webkit-scrollbar {display:none}
    .search-group {
        position: relative;
        width: 100%;
        font-size: px2rem(26);
        touch-action: none;
        .search-bar {
            position: relative;
            @include flex(center, row nowrap);
            width: 100%;
            height: px2rem(82);
            padding: px2rem(10) px2rem(20);
            background: #FFFFFF;
            z-index: 10000;
            .search-model {
                position: relative;
                flex: 1;
                height: 100%;
                .search-icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    font-size: px2rem(28);
                    transition: all 0.2s;
                    transform: translate(-50%, -50%);
                    color: #B8B8B8;
                    &.is-active {
                        transform: translate(0, -50%);
                        left: px2rem(10);
                    }
                }
                .clear-icon {
                    position: absolute;
                    top: 50%;
                    right: px2rem(10);
                    font-size: px2rem(28);
                    transform: translateY(-50%);
                    color: #B8B8B8;
                }
                input {
                    @include wh(100%, 100%);
                    padding: 0 px2rem(50);
                    color: #333333;
                    background: #F4F4F4;
                    border-radius: 0;
                }
            }
            .search-btn {
                text-align: right;
                white-space: nowrap;
                &.is-active {
                    flex: 0 0 px2rem(70);
                }
            }
        }
        .search-panel {
            position: absolute;
            width: 100%;
            top: 100%;
            left: 0;
            padding: px2rem(20) px2rem(10);
            // transform: translate(0, -100%);
            // transition: transform 0.3s;
            z-index: 9999;
            /*&.is-active {
                transform: translate(0, 0);
            }*/
            .search-panel-content {
                width: 100%;
                background: #fff;
                border-radius: px2rem(10);
                overflow-y: auto;
            }
        }
    }
    .slide-in-top-enter-active,
    .slide-in-top-leave-active {
        opacity: 1;
        transform: scaleY(1);
        transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
        transform-origin: center top;
    }
    .slide-in-top-enter,
    .slide-in-top-leave-active {
        opacity: 0;
        transform: scaleY(0);
    }
</style>
