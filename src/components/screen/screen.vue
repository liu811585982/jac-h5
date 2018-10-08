/**
 * 作者：yeshengqiang
 * 时间：2018-07-18
 * 描述：筛选
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .screen-panel {
        position: relative;
        @include flex(stretch, row nowrap);
        background-color: $white;
        box-shadow: 0px 1px 0px 0px rgba(120, 120, 120, 0.13);
        .screen-item {
            flex: 1;
            text-align: center;
            .screen-item-link {
                display: inline-block;
                padding: px2rem(22);
                font-size: px2rem(30);
                font-weight: normal;
                font-stretch: normal;
                color: #333333;
                &.screen-item-active * {
                    color: #de4041 !important;
                }
            }
        }
        .screen-slider {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 4px;
            background-color: #de4041;
            transition: all 0.3s;
        }
    }
</style>
<template>
    <div class="screen-panel">
        <div class="screen-item" @click="handleScreen($event, item)" v-for="(item, index) in screenList" :key="index">
            <a href="javascript: void(0);" class="screen-item-link" :class="{'screen-item-active': currentValue === (prop ? item[prop] : item)}">
                <slot :row="item">{{item}}</slot>
            </a>
        </div>
        <div class="screen-slider" :style="styles"></div>
    </div>
</template>
<script>

    export default {
        name: 'Screen',
        props: {
            prop: [String],
            value: {
                type: [String, Number],
                required: true
            },
            screenList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                width: 0,
                left: 0
            };
        },
        computed: {
            currentValue: {
                get () {
                    return this.value;
                },
                set (val) {
                    this.$emit('input', val);
                }
            },
            styles () {
                return {
                    width: `${this.width}px`,
                    transform: `translate(${this.left}px, 0)`
                };
            }
        },
        mounted () {
            this.initScreen();
        },
        methods: {
            calcStyle (el) {
                this.$nextTick(() => {
                    let rect = el.getBoundingClientRect();
                    this.width = rect.width;
                    this.left = rect.left - this.$el.getBoundingClientRect().left;
                });
            },
            initScreen () {
                this.$nextTick(() => {
                    this.calcStyle(this.$el.getElementsByClassName('screen-item-active')[0]);
                });
            },
            handleScreen (ev, item) {
                const val = this.prop ? item[this.prop] : item;
                if (this.currentValue === val) return;
                this.calcStyle(this.$el.getElementsByClassName('screen-item-active')[0]);
                this.currentValue = val;
                this.$emit('on-change', val, item);
            }
        },
        watch: {
            value () {
                this.initScreen();
            }
        }
    };
</script>
