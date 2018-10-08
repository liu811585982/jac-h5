/**
 * 作者：yeshengqiang
 * 时间：2018-04-02
 * 描述：表盘
 */
<style lang="scss" scoped>
    canvas {
        margin: 0 auto;
        background: #FFFFFF;
    }
</style>
<template>
    <div>
        <canvas ref="dial" width="300" height="300"></canvas>
    </div>
</template>
<script>
    import Draw from './dial.js';

    export default {
        name: 'hyDial',
        data () {
            return {
                ctx: null
            };
        },
        mounted () {
            if (!this.ctx) {
                this.ctx = new Draw(this.$refs.dial);
            }
            this.ctx.drawBg();
            this.ctx.drawScale();
            this.ctx.drawText();
            // this.ctx = new Draw(this.$refs.dial);
            // this.drawBg();
        },
        methods: {
            // 初始化画板
            resetCanvas () {
                const wrap = this.$refs.dial;
                this.ctx.clearRect(0, 0, wrap.width, wrap.height);
            },
            // 绘制圆盘
            drawBg () {
                const ctx = this.ctx;
                const wrap = this.$refs.dial;
                if (!ctx) return;
                // 配置
                const clientX = wrap.width / 2;          // 起点
                const clientY = wrap.height / 2;         // 起点
                const radius = 100;                      // 半径
                ctx.translate(clientX, clientY);

                // 画圆
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                ctx.arc(0, 0, radius, 0.15 * Math.PI, 0.85 * Math.PI, true);
                ctx.strokeStyle = '#BFBFBF';
                ctx.stroke();
                // 画表盘
                ctx.beginPath();
                ctx.font = 'bold 16px Arial';
                ctx.lineWidth = 3;
                let splitNum = 1;
                const uniform = (360 - 0.7 * 180) / splitNum;
                while (splitNum--) {
                    ctx.moveTo(0, 0);
                    let start = uniform * splitNum * Math.PI / 180 + 0.1 * Math.PI;
                    let end = uniform * (splitNum + 1) * Math.PI / 180;
                    console.log(start, end);
                    ctx.arc(0, 0, radius, start, end, true);
                }
                ctx.stroke();
                // ctx.closePath();
                // ctx.closePath();
            }
        }
    };
</script>