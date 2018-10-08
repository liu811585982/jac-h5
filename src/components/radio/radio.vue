/**
 * 作者：yeshengqiang
 * 时间：2018-04-12
 * 描述：radio
 */
<style lang="scss" scoped>
    .radio-item-panel {
        padding: 10px 15px;
        position: relative;
        z-index: 1;
        color: currentColor;
        font-size: 1em;
        display: flex;
        display: -webkit-flex;
        -webkit-align-items: center;
        align-items: center;
        &:active {
            background-color: #ececec;
        }
        &.radio-item-left {
            flex-flow: row nowrap;
            text-align: left;
        }
        &.radio-item-right {
            flex-flow: row-reverse nowrap;
            text-align: right;
        }
        .radio-item-input {
            position: absolute;
            z-index: -1;
            opacity: 0;
            width: 0;
            height: 0;
            outline: none;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
        }
        &.radio-item-disabled {
            cursor: not-allowed;
            &:active {
                background-color: transparent;
            }
        }
        &.radio-item-selected .radio-item-inner {
            border-color: #2d8cf0;
        }
        .radio-item-content {
            flex: 1;
            line-height: 1.41176471;
            vertical-align: middle;
            font-size: 17px;
            overflow: hidden;
            position: relative;
        }
        .radio-item-inner {
            text-align: center;
            flex: 0 0 50px;
        }
    }
</style>
<template>
    <div class="radio-item-panel" :class="classes" @click="handleClick">
        <div class="radio-item-content">
            <slot>{{label}}</slot>
        </div>
        <div class="radio-item-inner">
            <svg-icon type="selected" v-show="currentValue"></svg-icon>
        </div>
    </div>
</template>
<script>
    function oneOf (val, arr) {
        let item = arr.filter(item => item === val);
        return !!item.length;
    }

    export default {
        name: 'RadioItem',
        props: {
            value: Boolean,
            label: [String, Number],
            placement: {
                validator (val) {
                    return oneOf(val, ['right', 'left']);
                },
                default: 'left'
            },
            disabled: Boolean
        },
        data () {
            return {
                currentValue: this.value
            };
        },
        computed: {
            hasParent () {
                return this.$parent.$options.name === 'GroupRadio';
            },
            classes () {
                return {
                    'radio-item-selected': this.currentValue,
                    'radio-item-disabled': this.disabled,
                    [`radio-item-${this.placement}`]: !!this.placement
                };
            }
        },
        mounted () {
            this.updateStatus();
        },
        methods: {
            updateStatus () {
                if (this.hasParent) {
                    this.$parent.updateStatus();
                }
            },
            updateValue (val) {
                if (this.hasParent) {
                    this.$parent.updateValue(val);
                }
            },
            // 更新本地currentValue
            updateCurrentValue (val) {
                if (!this.hasParent) {
                    this.currentValue = val;
                }
            },
            handleClick () {
                if (this.disabled) return;
                if (this.hasParent) {
                    this.updateValue(this.label);
                } else {
                    this.currentValue = true;
                }
            }
        },
        watch: {
            value (val) {
                this.updateCurrentValue(val);
            },
            currentValue (val) {
                if (!this.hasParent) {
                    this.$emit('input', val);
                }
            },
            label (val) {
                this.updateValue(val);
            }
        }
    };
</script>
