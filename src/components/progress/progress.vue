/**
*  进度条
*/
<style lang="scss" scoped>
    @import 'src/scss/vars';
    @import 'src/scss/mixins';
    .progress-wrapper {
        @include wh(100%, 100%);
        #circleProgress {
            @include wh(100%, 100%);
        }
    }
</style>
<template>
    <div class="progress-wrapper">
        <canvas id="circleProgress" ref="canvas" width="200%" height="200%">您的浏览器不支持canvas组件请升级</canvas>
    </div>
</template>

<script>
    export default {
        name: 'circleProgress',
        props: {
            foreColor: {
                type: String,
                default: '#DC3F3E'
            },
            bgColor: {
                type: String,
                default: '#f1f1f1'
            },
            percent: {
                type: Number,
                required: true,
                validator: val => val >= 0 && val <= 100
            },
            startAngle: {
                type: Number,
                default: -1 / 2 * Math.PI
            },
            arcLength: {
                type: Number,
                default: 2 * Math.PI
            }
        },
        data () {
            return {
            };
        },
        mounted () {
            this.drawMain(this.$refs.canvas, this.percent, this.foreColor, this.bgColor);
        },
        watch: {
            percent (val) {
                this.drawMain(this.$refs.canvas, val, this.foreColor, this.bgColor);
            }
        },
        methods: {
            drawMain (canvas, percent, foreColor, bgColor) {
                const context = canvas.getContext('2d');
                const cW = canvas.width;
                const cH = canvas.height;
                const r = cW / 2;
                const startAngle = this.startAngle; // 起始点
                const endAngle = this.startAngle + this.arcLength;
                const rad = this.arcLength / 100;
                let speed = 0;

                // 绘制背景圆圈
                function backgroundCircle () {
                    context.save();
                    context.beginPath();
                    context.lineWidth = 8;
                    const radius = r - context.lineWidth;
                    context.lineCap = 'round';
                    context.strokeStyle = bgColor;
                    context.arc(r, r, radius, startAngle, endAngle, false);
                    context.stroke();
                    context.closePath();
                    context.restore();
                }

                function foregroundCircle (n) {
                    context.save();
                    context.strokeStyle = foreColor;
                    context.lineWidth = 8;
                    context.lineCap = 'round';
                    var radius = r - context.lineWidth;
                    context.beginPath();
                    context.arc(r, r, radius, startAngle, startAngle + n * rad, false);
                    context.stroke();
                    context.closePath();
                    context.restore();
                }

                function text (n) {
                    context.save();
                    context.fillStyle = foreColor;
                    const fontSize = 40;
                    context.font = fontSize + 'px Helvetica';
                    context.textAlign = 'center';
                    // var textWidth = context.measureText(n.toFixed(0) + '%').width;
                    context.fillText(n.toFixed(0) + '分', r, r + fontSize / 2);
                    context.restore();
                }

                (function drawFrame () {
                    window.requestAnimationFrame(drawFrame);
                    context.clearRect(0, 0, cW, cH);
                    backgroundCircle();
                    text(speed);
                    foregroundCircle(speed);
                    if (speed >= percent) return;
                    speed += 1;
                }());
            }
        }
    };
</script>
