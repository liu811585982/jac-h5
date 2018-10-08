/**
 * 作者：yeshengqiang
 * 时间：2018-05-02
 * 描述：柱状图(用于报表统计-事件统计)
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .histogram-panel {
        @include wh(100%, 100%);
        .histogram-panel-body {
            @include wh(100%, 100%);
            padding: $font-size-15;
            position: relative;
            z-index: 1;
            display: flex;
            display: -webkit-flex;
            align-items: stretch;
            -webkit-align-items: stretch;
            flex-flow: row nowrap;
            -webkit-flex-flow: row nowrap;
        }
        .noData {
            font-size: 0.64rem;
            line-height: 2rem;
            color: #A8A8A8;
            text-align: center;
        }
        .histogram-panel-left {
            flex: 0 0 80px;
            border-right: 0.5px solid #D2D2D2;
        }
        .histogram-panel-center {
            padding: $font-size-10 0;
            flex: 1;
            -webkit-flex: 1;
            display: flex;
            display: -webkit-flex;
            align-items: stretch;
            -webkit-align-items: stretch;
            flex-flow: column nowrap;
            -webkit-flex-flow: column nowrap;
            justify-content: center;
            -webkit-justify-content: center;
            .histogram-panel-center__item {
                flex: 1;
                -webkit-flex: 1;
                display: flex;
                display: -webkit-flex;
                align-items: center;
                -webkit-align-items: center;
                flex-flow: row nowrap;
                -webkit-flex-flow: row nowrap;
                justify-content: center;
                -webkit-justify-content: center;
                .right__item_progress {
                    flex: 1;
                    -webkit-flex: 1;
                    height: $font-size-20;
                    line-height: $font-size-20;
                    position: relative;
                    background-color: #EBEBEB;
                    &::before {
                        position: absolute;
                        right: 100%;
                        top: 50%;
                        display: block;
                        white-space: nowrap;
                        color: #333333;
                        content: attr(data-label);
                        font-size: $font-size-15;
                        padding: 0 $font-size-10;
                        transform: translate(0, -50%) skew(15deg,0);
                        transform-origin: center center;
                    }
                    &::after {
                        position: absolute;
                        left: 100%;
                        top: 50%;
                        display: block;
                        content: attr(data-value);
                        font-size: $font-size-15;
                        padding: 0 $font-size-5;
                        color: #333333;
                        transform: translate(0, -50%);
                    }
                    .progress_inner {
                        overflow: hidden;
                        @include wh(0%, 100%);
                        font-size: $font-size-12;
                        color: $white;
                        text-align: right;
                        &.kanglList {
                            background-color: #FFC100;
                        }
                        &.junlList {
                            background-color: #34C8A1;
                        }
                        &.shuailList {
                            background-color: #F5545D;
                        }
                    }
                }
            }
        }
        .histogram-panel-right {
            flex: 0 0 50px;
        }
    }
</style>
<template>
    <div class="histogram-panel">
        <div class="histogram-panel-body" v-if="result.length">
            <div class="histogram-panel-left"></div>
            <div class="histogram-panel-center">
                <div class="histogram-panel-center__item" v-for="(item, index) in result" :key="index">
                    <div :data-label="item.vehicleModel" :data-value="`1:${item.tripCount}`" class="right__item_progress">
                        <Progress :startValue="0" :endValue="item.usageRate" class="progress_inner" :class="item.vehicleModel | vehicleModel"></Progress>
                    </div>
                </div>
            </div>
            <div class="histogram-panel-right"></div>
        </div>
        <div class="noData" v-else>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import Progress from './progress.js';

    export default {
        name: 'Histogram',
        components: { Progress },
        props: {
            result: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        filters: {
            vehicleModel (val) {
                let classres = '';
                switch (val) {
                    case '帅铃':
                        classres = 'shuailList';
                        break;
                    case '骏铃':
                        classres = 'junlList';
                        break;
                    case '康铃':
                        classres = 'kanglList';
                        break;
                }
                return classres;
            }
        }
    };
</script>
