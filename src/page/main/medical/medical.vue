/**
 * 作者：yeshengqiang
 * 时间：2018-07-11
 * 描述：体检下发
 */
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';

    .section-panel {
        background-color: $white;
        .section-body {
            .body-panel-top {
                .canvas-panel {
                    @include wh(100%, 260px);
                    background-image: linear-gradient(0deg, #ef6354 0%, #e03e3c 71%);
                }
            }
            .medical-list-panel {
                padding: px2rem(20) 0;
                .medical-list-title {
                    padding: 0 px2rem(31);
                    font-size: px2rem(32);
                    font-weight: 600;
                    font-stretch: normal;
                    color: #000000;
                    small {
                        font-size: px2rem(28);
                        font-weight: normal;
                    }
                }
                .medical-list-body {
                    padding: px2rem(18) px2rem(15);
                    .medical-list-item {
                        @include flex(center, row nowrap);
                        font-size: px2rem(28);
                        font-weight: normal;
                        font-stretch: normal;
                        color: #6d7c8b;
                        padding: px2rem(18) px2rem(16);
                        vertical-align: middle;
                        border-bottom: 1px solid #eeeeee;
                        .list-item_icon {
                            display: inline-block;
                            color: $white;
                            border-radius: 4px;
                            text-align: center;
                            font-size: px2rem(24);
                            line-height: px2rem(40);
                            background-color: #ff7778;
                            @include wh(#{px2rem(40)}, #{px2rem(40)});
                        }
                        .list-item-plateNo {
                            display: inline-block;
                            height: px2rem(40);
                            line-height: px2rem(40);
                            padding: 0 px2rem(70);
                            vertical-align: middle;
                        }
                        .list-item-body {
                            flex: 1;
                        }
                    }
                }
            }
            .medical-btn {
                width: 80%;
                margin: 0 auto;
                .btn_check {
                    height: px2rem(85);
                    background-color: #de4041;
                    border-radius: px2rem(42);
                }
            }
        }
    }
</style>
<template>
    <div class="section-panel">
        <!-- 头部 -->
        <hy-header :title="$route.meta.title" class="v-immersed">
            <span class="header-nav__inner" slot="left" v-go-back>
                <svg-icon type="back"></svg-icon>
            </span>
        </hy-header>
        <div class="section-body">
            <div class="body-panel-top">
                <canvas class="canvas-panel" ref="canvas"></canvas>
            </div>
            <div class="medical-list-panel">
                <h3 class="medical-list-title">
                    诊断结果
                    <small>（共检测235项，发现故障8页）</small>
                </h3>
                <ul class="medical-list-body">
                    <li class="medical-list-item" v-for="(item, index) in 9" :key="index">
                        <span class="list-item_icon">{{index + 1}}</span>
                        <span class="list-item-plateNo">PO534</span>
                        <div class="list-item-body">
                            冷气系统有冷媒泄漏
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="medical-btn">
                <x-button class="btn_check" type="warn">开始诊断</x-button>
            </div> -->
        </div>
    </div>
</template>
<script>
    import { XButton } from 'vux';

    export default {
        components: { XButton },
        mounted () {
            this._initCanvas();
        },
        methods: {
            _initCanvas () {
                const canvas2d = this.$refs.canvas;
                const ctx = canvas2d.getContext('2d');
                const clientRect = canvas2d.getBoundingClientRect();
                const width = canvas2d.width = clientRect.width;
                const height = canvas2d.height = clientRect.height;
                    ctx.beginPath();
                    ctx.arc(width / 2, height / 2, 60, 0, 360 * Math.PI / 180);
                    ctx.lineWidth = '4';
                    ctx.strokeStyle = '#ffc8c8';
                    ctx.stroke();
                    ctx.closePath();
                    for (var i = 0; i < 36; i++) {
                        ctx.beginPath();
                        ctx.arc(Math.cos((i * 10) / 180 * Math.PI) * 67 + width / 2, (-Math.sin((i * 10) / 180 * Math.PI) * 67 + height / 2), 2.5, 0, 360 * Math.PI / 180);
                        ctx.fillStyle = '#ffc8c8';
                        ctx.fill();
                        ctx.closePath();
                    }
                    ctx.beginPath();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 70px "Times New Roman", Times, serif';
                    ctx.fillStyle = '#ffc8c8';
                    ctx.fillText('!', width / 2, height / 2);
            }
        }
    };
</script>
