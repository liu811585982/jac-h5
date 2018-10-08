/**
 * 作者：yeshengqiang
 * 时间：2018-05-29
 * 描述：头部重写
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .header-nav-panel {
        // background-color: $global_color;
        color: $white;
        height: px2rem(100);
        box-sizing: content-box;
        padding-right: px2rem(20);
        padding-left: px2rem(20);
        border-bottom: 0;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        @include flex(stretch, row nowrap, center);
        &.is-fixed {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
        }
        .header-nav-icon {
            flex: 0.5;
            font-size: px2rem(40);
            vertical-align: middle;
            position: relative;
            line-height: px2rem(100);
            z-index: 20;
            cursor: pointer;
            padding: 0 px2rem(20);
            &:active {
                opacity: .3;
            }
            &.header-nav-left {
                margin-left: px2rem(-20);
            }
            &.header-nav-right {
                margin-right: px2rem(-20);
            }
        }
        .header-nav-title {
            flex: 1;
            font-size: px2rem(36);
            text-align: center;
            line-height: px2rem(100);
            @include ellipsis;
        }
    }
</style>
<template>
    <header class="header-nav-panel" :class="{'is-fixed': fixed}" :style="style">
        <a class="header-nav-icon header-nav-left">
            <slot name="left">
                <svg-icon type="back"></svg-icon>
            </slot>
        </a>
        <h1 class="header-nav-title">{{title}}</h1>
        <a class="header-nav-icon header-nav-right">
            <slot name="right"></slot>
        </a>
    </header>
</template>
<script>
    export default {
        name: 'hyHeader',
        props: {
            title: [String],
            fixed: [Boolean],
            bgColor: {
                default: '#DC3F3E',
                type: String
            }
        },
        computed: {
            style () {
                const style = {};
                if (this.bgColor) {
                    style.backgroundColor = this.bgColor;
                } else {
                    style.backgroundColor && delete style.backgroundColor;
                }
                return style;
            }
        }
    };
</script>
