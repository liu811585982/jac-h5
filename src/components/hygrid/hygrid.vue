/**
 * 作者：yeshengqiang
 * 时间：2018-03-21
 * 描述：用于main的网格
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .hy-grid {
        @include wh(100%, auto);
        @include flex(stretch, row wrap);
        box-sizing: border-box;
        border-right: 1px solid $grid_border;
        font-size: 1em;
        .hy-grid-panel {
            position: relative;
            height: auto;
            text-align: center;
            border: 1px solid $grid_border;
            border-right: none;
            margin-top: -1px;
            .figure {
                position: absolute;
                @include wh(100%, 100%);
                @include flex(center, column nowrap, center);
                .icon-panel {
                    display: block;
                    @include wh(50%, auto);
                    margin-bottom: $font-size-10;
                    font-size: 1.4rem;
                    @include flex(center, column nowrap);
                    color: $white;
                    @include borderRadius(100%);
                    .icon-box {
                        // -webkit-box-flex: 1;
                        -webkit-flex: 1;
                        flex: 1;
                    }
                    img.icon-img {
                        width: 100%;
                        display: block;
                    }
                }
                figcaption {
                    font-weight: 500;
                    color: $grid_font_color;
                }
            }
            &.hy-grid-lastBorder {
                position: relative;
                z-index: 1;
                &::after {
                    content: '';
                    position: absolute;
                    @include wh(100%, 100%);
                    top: 0;
                    z-index: -1;
                    border-right: 1px solid $grid_border;
                    left: 1px;
                }
            }
        }
    }
</style>
<template>
    <div class="hy-grid" :style="{height: height}">
        <div class="hy-grid-panel" :class="classes(index)" @click="handleClick(item)" :style="styles" v-for="(item, index) in list" :key="index">
            <slot :row="item">
                <figure class="figure">
                    <span class="icon-panel">
                        <img class="icon-img" :src="requireUrl(item.icon)" alt="icon" />
                    </span>
                    <figcaption>{{item.label}}</figcaption>
                </figure>
            </slot>
        </div>
    </div>
</template>
<script>
    import { _typeOf } from '@/libs/utils';

    export default {
        name: 'hyGrid',
        props: {
            list: [Array, Number],
            rowNumber: {
                type: Number,
                default: 3
            },
            height: [Number, String]
        },
        computed: {
            styles () {
                let style = {};
                style.flex = `0 0 ${100 / this.rowNumber}%`;
                return style;
            },
            len () {
                return _typeOf(this.list) === 'array' ? this.list.length : +this.list;
            }
        },
        methods: {
            handleClick (item) {
                this.$emit('tab-change', item);
            },
            requireUrl (url) {
                if (this.$scopedSlots.default) return;
                return require(`@/assets/images/${url}`);
            },
            classes (index) {
                return {
                    'hy-grid-lastBorder': !!(this.len % this.rowNumber) && (this.len - 1 === index)
                };
            }
        }
    };
</script>
