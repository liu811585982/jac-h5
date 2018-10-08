/**
 * 作者：yeshengqiang
 * 时间：2018-04-18
 * 描述：tabBar
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .group-tab-panel {
        position: relative;
        @include wh(100%, auto);
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-flex-flow: row nowrap;
        -webkit-align-items: center;
        flex-flow: row nowrap;
        text-align: center;
        font-size: px2rem(30);
        font-weight: 500;
        justify-content: center;
        background-color: $white;
        @include border-b-1px(#D2D2D2);
        .group-tab-item {
            flex: 1;
            height: px2rem(72);
            line-height: px2rem(72);
            &.group-tab-selected .group-tab-a:link{
                color: $global_color;
            }
            .group-tab-a:link {
                display: block;
                width: 100%;
                height: 100%;
                color: #000000;
            }
        }
        // 滑块
        .group-tab-slider {
            @include wh(auto, 2px);
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            transition: transform 0.3s;
            background-color: $global_color;
        }
    }
</style>
<template>
    <ul class="group-tab-panel">
        <li class="group-tab-item" :class="{ 'group-tab-selected': currentValue === item.label }" v-for="(item, index) in list" :key="index">
            <a class="group-tab-a" @click="handleChoose(item)" href="javascript: void(0);">{{item.label}}</a>
        </li>
        <div class="group-tab-slider" :style="styles"></div>
    </ul>
</template>
<script>
    import { toNumber } from '@/libs/utils';

    export default {
        name: 'tabBar',
        props: {
            value: String,
            list: {
                type: Array,
                default () {
                    return [];
                }
            },
            strokeHeight: [Number, String]
        },
        data () {
            return {
                offset: 0                  // 偏移
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
                let style = {};
                let len = this.list.length;
                let width = len && (100 / len);
                if (this.strokeHeight) {
                    style.height = typeof this.strokeHeight === 'number'
                                                ? `${this.strokeHeight}px`
                                                : `${toNumber(this.strokeHeight)}px`;
                }
                style.width = `${width}%`;
                style.transform = `translate3d(${this.offset * 100}%, 0, 0)`;
                return style;
            }
        },
        mounted () {
            let index = this.findIndex(this.currentValue, this.list);
            if (index !== null) {
                this.offset = index;
            }
        },
        methods: {
            findIndex (label, arr) {
                let index = -1;
                arr.forEach((item, key) => {
                    if (label === item.label) {
                        index = key;
                    }
                });
                return index > -1 ? index : null;
            },
            handleChoose (item) {
                this.currentValue = item.label;
            }
        },
        watch: {
            list (val) {
                let index = this.findIndex(this.currentValue, val);
                if (index !== null) {
                    this.offset = index;
                }
            },
            currentValue (val) {
                let index = this.findIndex(val, this.list);
                if (index !== null) {
                    this.offset = index;
                    this.$emit('tab-change', this.list[index]);
                };
            }
        }
    };
</script>
