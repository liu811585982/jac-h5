/**
 * 作者：yeshengqiang
 * 时间：2018-04-17
 * 描述：searchItem
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .search-item {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: $white;
        .search-btn {
            display: flex;
            display: -webkit-flex;
            -webkit-align-items: center;
            -webkit-flex-flow: row nowrap;
            align-items: center;
            flex-flow: row nowrap;
            font-size: px2rem(30);
            @include border-t-1px(#DDDDDD);
            text-align: center;
            a:link,
            a:hover,
            a:visited,
            a:active {
                height: px2rem(89);
                line-height: px2rem(89);
                display: inline-block;
                width: 50%;
                text-decoration: none;
                color: rgba(51,51,51,0.8);
                &.sure {
                    background-color: $global_color;
                    color: $white;
                }
            }
        }
    }
</style>
<template>
    <div class="search-item" v-show="visiable">
        <slot></slot>
        <div class="search-btn">
            <a href="javascript: void(0);" @click="handleCancel">取消</a>
            <a class="sure" href="javascript: void(0);" @click="handleConfirm">确定</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'searchItem',
        props: {
            label: String,
            closed: Boolean
        },
        data () {
            return {
                visiable: false
            };
        },
        computed: {
            // 是否parent
            hasParent () {
                return this.$parent.$options.name === 'searchBar';
            }
        },
        mounted () {
            if (!this.hasParent) {
                console.error(`${this.$options.name}不可单独使用`);
            }
            this.updateStatus();
        },
        methods: {
            // 更新状态
            updateStatus () {
                if (this.hasParent) {
                    this.$parent.updateStatus();
                }
            },
            handleCancel () {
                this.$emit('onCancel');
            },
            handleConfirm () {
                this.$emit('onConfirm');
            }
        },
        watch: {
            label () {
                this.updateStatus();
            },
            closed () {
                this.updateStatus();
            }
        }
    };
</script>
