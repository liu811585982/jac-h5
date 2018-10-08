/**
 * 作者：yeshengqiang
 * 时间：2018-06-21
 * 描述：stepItem
 */
<style lang="scss" scoped>
    @import 'src/scss/mixins';

    .steps__list_item {
        position: relative;
        .steps__dd_title {
            position: relative;
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            padding: 5px 15px 5px 0;
            .steps__dd__pointer {
                display: inline-block;
                position: absolute;
                left: -35px;
                cursor: pointer;
                top: 50%;
                transform: translateY(-50%);
                @include wh(11px, 11px);
                border-radius: 100%;
                background-color: #BFC5CC;
                transition: all 0.3s ease;
                &.active {
                    background-color: #DE4041;
                }
            }
        }
    }
</style>
<template>
    <dd class="steps__list_item">
        <h3 class="steps__dd_title" ref="title">
            <em class="steps__dd__pointer" :class="{'active': active}"></em>
            <slot name="title">{{title}}</slot>
        </h3>
        <slot></slot>
    </dd>
</template>
<script>
    export default {
        name: 'StepItem',
        props: {
            label: [String, Number],
            title: String
        },
        data () {
            return {
                active: false
            };
        },
        computed: {
            hasParent () {
                return this.$parent.$options.name === 'Step';
            }
        },
        methods: {
            updateIndex () {
                if (this.hasParent) {
                    this.$parent.updateIndex();
                }
            }
        },
        watch: {
            label () {
                this.updateIndex();
            }
        }
    };
</script>
