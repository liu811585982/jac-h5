/**
 * 作者：yeshengqiang
 * 时间：2018-04-28
 * 描述：折线图
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .hy-line-panel {
        @include wh(100%, 100%);
        .hy-echarts-panel {
            @include wh(100%, 100%);
        }
        & p.noData {
            font-size: $font-size-16;
            line-height: 2rem;
            color: #A8A8A8;
            text-align: center;
        }
    }
</style>
<template>
    <div class="hy-line-panel">
        <div class="hy-echarts-panel" ref="echarts" v-show="hasData"></div>
        <P v-show="!hasData" class="noData">暂无数据</P>
    </div>
</template>
<script>
    import echarts from 'echarts';
    import { debounce } from '@/libs/utils';
    import { echartsConfig } from '@/libs/config';
    import { addResizeListener, removeResizeListener } from '@/libs/resize-event';
    function oneOf (val, arr) {
        let item = arr.filter(item => item === val);
        return !!item.length;
    }

    export default {
        name: 'Echarts',
        props: {
            options: {
                type: Object,
                default () {
                    return {};
                }
            },
            type: {
                type: String,
                validator (val) {
                    return oneOf(val, ['line', 'pie']);
                },
                default: 'line'
            }
        },
        data () {
            return {
                hasData: false
            };
        },
        mounted () {
            this._initEcharts();
        },
        methods: {
            // 初始化echarts
            _initEcharts () {
                let defaultOpt = Object.assign({}, JSON.parse(JSON.stringify(echartsConfig[this.type])), this.options);
                if (this.isContinue(defaultOpt.series)) {
                    this.hasData = false;
                    this.myChart && this.myChart.clear();
                    return;
                };
                this.hasData = true;
                this.$nextTick(() => {
                    // 基于准备好的dom，初始化echarts实例
                    if (!this.myChart) {
                        this.myChart = echarts.init(this.$refs.echarts);
                    }
                    this.myChart.setOption(defaultOpt, true);
                    this.__outSideResize__ = debounce(500, this.myChart.resize);
                    addResizeListener(this.$refs.echarts, this.__outSideResize__);
                });
            },
            // 是否继续
            isContinue (list) {
                let status = false;
                switch (this.type) {
                    case 'pie':
                        status = !(list.length && list[0].data.length);
                        break;
                    case 'line':
                        status = !list.length;
                        break;
                }
                return status;
            }
        },
        watch: {
            options: {
                deep: true,
                handler: function () {
                    this._initEcharts();
                }
            }
        },
        beforeDestroy () {
            removeResizeListener(this.$refs.echarts, this.__outSideResize__);
            this.$el.remove();
        }
    };
</script>
